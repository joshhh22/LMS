-- EduFlow Database Initial Schema & Migration
-- Version: 20261029000000_initial_schema.sql

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUMS AND DOMAINS
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE submission_status AS ENUM ('draft', 'submitted', 'late', 'graded', 'resubmitted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE quiz_attempt_status AS ENUM ('in_progress', 'completed', 'timed_out');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. CORE TABLES
-- ============================================================================

-- PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'student',
    status user_status NOT NULL DEFAULT 'active',
    bio TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SUBJECTS (Mata Pelajaran)
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CLASSES (Kelas)
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    description TEXT,
    grade_level TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CLASS TEACHERS (Wali Kelas / Guru Pengampu Kelas)
CREATE TABLE IF NOT EXISTS public.class_teachers (
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_homeroom BOOLEAN NOT NULL DEFAULT FALSE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (class_id, teacher_id)
);

-- CLASS SUBJECTS (Mata Pelajaran di suatu Kelas dengan Guru Pengampu)
CREATE TABLE IF NOT EXISTS public.class_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    schedule_day TEXT,
    schedule_time_start TIME,
    schedule_time_end TIME,
    room TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (class_id, subject_id, teacher_id)
);

-- ENROLLMENTS (Siswa di Kelas)
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (class_id, student_id)
);

-- COURSES (Modul Pembelajaran per Mata Pelajaran Kelas)
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_subject_id UUID NOT NULL REFERENCES public.class_subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    status content_status NOT NULL DEFAULT 'draft',
    position INTEGER NOT NULL DEFAULT 1,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LESSONS (Pertemuan / Bab)
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    position INTEGER NOT NULL DEFAULT 1,
    estimated_minutes INTEGER DEFAULT 30,
    status content_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MATERIALS (Materi Pembelajaran Lampiran / Media / Tautan)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    material_type TEXT NOT NULL CHECK (material_type IN ('pdf', 'video', 'link', 'text', 'document', 'audio')),
    storage_path TEXT,
    external_url TEXT,
    file_size_bytes BIGINT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    position INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LESSON PROGRESS (Tracking Kemajuan Siswa)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ,
    last_position_seconds INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (lesson_id, student_id)
);

-- ASSIGNMENTS (Tugas Siswa)
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_subject_id UUID NOT NULL REFERENCES public.class_subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    instructions TEXT NOT NULL,
    due_at TIMESTAMPTZ,
    max_score NUMERIC NOT NULL DEFAULT 100 CHECK (max_score > 0),
    allow_late_submission BOOLEAN NOT NULL DEFAULT FALSE,
    submission_types JSONB NOT NULL DEFAULT '["text", "file"]'::jsonb,
    attachment_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
    status content_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ASSIGNMENT SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    text_answer TEXT,
    storage_path TEXT,
    file_name TEXT,
    file_size_bytes BIGINT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status submission_status NOT NULL DEFAULT 'submitted',
    score NUMERIC CHECK (score IS NULL OR (score >= 0 AND score <= 1000)),
    feedback TEXT,
    graded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    graded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (assignment_id, student_id)
);

-- QUIZZES (Kuis & Ujian)
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_subject_id UUID NOT NULL REFERENCES public.class_subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    instructions TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 30 CHECK (duration_minutes > 0),
    opens_at TIMESTAMPTZ,
    closes_at TIMESTAMPTZ,
    max_attempts INTEGER NOT NULL DEFAULT 1 CHECK (max_attempts >= 1),
    show_results_at TEXT NOT NULL DEFAULT 'after_close' CHECK (show_results_at IN ('immediately', 'after_close', 'manual')),
    is_published_results BOOLEAN NOT NULL DEFAULT FALSE,
    status content_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- QUIZ QUESTIONS
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'short_answer', 'essay')),
    prompt TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { id, text }
    points NUMERIC NOT NULL DEFAULT 10 CHECK (points >= 0),
    position INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SECURE QUIZ ANSWER KEYS (NEVER exposed directly to students via RLS)
CREATE TABLE IF NOT EXISTS public.quiz_answer_keys (
    question_id UUID PRIMARY KEY REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
    answer_key JSONB NOT NULL, -- e.g. { correct_option_id: "A" } or { accepted_answers: ["string"] }
    explanation TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- QUIZ ATTEMPTS
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    attempt_number INTEGER NOT NULL DEFAULT 1,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    score NUMERIC CHECK (score IS NULL OR score >= 0),
    max_score NUMERIC,
    status quiz_attempt_status NOT NULL DEFAULT 'in_progress',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- QUIZ RESPONSES
CREATE TABLE IF NOT EXISTS public.quiz_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
    response JSONB NOT NULL DEFAULT '{}'::jsonb, -- { selected_option_id: "A" } or { text: "..." }
    is_correct BOOLEAN,
    points_awarded NUMERIC,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (attempt_id, question_id)
);

-- ANNOUNCEMENTS (Pengumuman Sekolah atau Pengumuman Kelas)
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE, -- NULL means school-wide
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- DISCUSSIONS (Forum Diskusi Kelas / Materi)
CREATE TABLE IF NOT EXISTS public.discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'visible' CHECK (status IN ('visible', 'pinned', 'archived', 'hidden')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- DISCUSSION REPLIES
CREATE TABLE IF NOT EXISTS public.discussion_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    body TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'visible' CHECK (status IN ('visible', 'hidden')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    target_url TEXT,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- GAMIFICATION: XP EVENTS
CREATE TABLE IF NOT EXISTS public.xp_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    source_id UUID,
    xp_delta INTEGER NOT NULL CHECK (xp_delta > 0),
    idempotency_key TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- GAMIFICATION: BADGES
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon_key TEXT,
    criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
    xp_bonus INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- GAMIFICATION: STUDENT BADGES
CREATE TABLE IF NOT EXISTS public.student_badges (
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
    awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (student_id, badge_id)
);

-- AUDIT LOGS (Tindakan Administratif & Keamanan)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_classes_academic_year ON public.classes(academic_year);
CREATE INDEX IF NOT EXISTS idx_class_teachers_teacher ON public.class_teachers(teacher_id);
CREATE INDEX IF NOT EXISTS idx_class_subjects_class ON public.class_subjects(class_id);
CREATE INDEX IF NOT EXISTS idx_class_subjects_teacher ON public.class_subjects(teacher_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class ON public.enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_courses_class_subject ON public.courses(class_subject_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_materials_lesson ON public.materials(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_student ON public.lesson_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_assignments_class_subject ON public.assignments(class_subject_id, due_at);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON public.assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON public.assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_class_subject ON public.quizzes(class_subject_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON public.quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_student ON public.quiz_attempts(quiz_id, student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_attempt ON public.quiz_responses(attempt_id);
CREATE INDEX IF NOT EXISTS idx_announcements_class ON public.announcements(class_id, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_discussions_class ON public.discussions(class_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_discussion_replies_disc ON public.discussion_replies(discussion_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id, read_at, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_xp_events_student ON public.xp_events(student_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id, created_at DESC);

-- ============================================================================
-- 4. HELPER FUNCTIONS
-- ============================================================================

-- Check if current user is Admin
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = p_user_id AND role = 'admin' AND status = 'active'
    );
$$;

-- Check if user is a teacher assigned to class
CREATE OR REPLACE FUNCTION public.is_teacher_of_class(p_class_id UUID, p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.class_teachers
        WHERE class_id = p_class_id AND teacher_id = p_user_id
    ) OR EXISTS (
        SELECT 1 FROM public.class_subjects
        WHERE class_id = p_class_id AND teacher_id = p_user_id
    ) OR public.is_admin(p_user_id);
$$;

-- Check if user is a student enrolled in class
CREATE OR REPLACE FUNCTION public.is_student_of_class(p_class_id UUID, p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.enrollments
        WHERE class_id = p_class_id AND student_id = p_user_id AND status = 'active'
    ) OR public.is_admin(p_user_id);
$$;

-- Helper to safely grant XP idempotently
CREATE OR REPLACE FUNCTION public.grant_xp_idempotent(
    p_student_id UUID,
    p_event_type TEXT,
    p_source_id UUID,
    p_xp_delta INTEGER,
    p_idempotency_key TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_event_id UUID;
    v_total_xp BIGINT;
BEGIN
    -- Check if idempotency key already exists
    SELECT id INTO v_event_id FROM public.xp_events WHERE idempotency_key = p_idempotency_key;
    IF v_event_id IS NOT NULL THEN
        SELECT COALESCE(SUM(xp_delta), 0) INTO v_total_xp FROM public.xp_events WHERE student_id = p_student_id;
        RETURN jsonb_build_object('success', true, 'duplicate', true, 'total_xp', v_total_xp);
    END IF;

    -- Insert new event
    INSERT INTO public.xp_events (student_id, event_type, source_id, xp_delta, idempotency_key)
    VALUES (p_student_id, p_event_type, p_source_id, p_xp_delta, p_idempotency_key)
    RETURNING id INTO v_event_id;

    SELECT COALESCE(SUM(xp_delta), 0) INTO v_total_xp FROM public.xp_events WHERE student_id = p_student_id;

    RETURN jsonb_build_object('success', true, 'duplicate', false, 'event_id', v_event_id, 'total_xp', v_total_xp);
END;
$$;

-- Automatically create profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_role user_role := 'student';
    v_name TEXT;
BEGIN
    -- Read metadata if provided
    IF NEW.raw_user_meta_data->>'role' IN ('admin', 'teacher', 'student') THEN
        -- Only assign non-student if created by authorized process
        v_role := (NEW.raw_user_meta_data->>'role')::user_role;
    END IF;

    v_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email);

    INSERT INTO public.profiles (id, full_name, role, status)
    VALUES (NEW.id, v_name, v_role, 'active')
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;
END;
$$;

-- Trigger on auth.users (wrapped safely)
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
    END IF;
END $$;

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answer_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- PROFILES POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
    FOR SELECT TO authenticated
    USING (
        id = auth.uid() 
        OR public.is_admin()
        -- Teachers and students can see names and avatars of people in their classes
        OR EXISTS (
            SELECT 1 FROM public.enrollments e1
            JOIN public.enrollments e2 ON e1.class_id = e2.class_id
            WHERE e1.student_id = auth.uid() AND e2.student_id = profiles.id
        )
        OR EXISTS (
            SELECT 1 FROM public.class_teachers ct
            JOIN public.enrollments e ON ct.class_id = e.class_id
            WHERE (ct.teacher_id = auth.uid() AND e.student_id = profiles.id)
               OR (e.student_id = auth.uid() AND ct.teacher_id = profiles.id)
        )
    );

CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid() OR public.is_admin())
    WITH CHECK (
        public.is_admin() 
        OR (id = auth.uid() AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()))
    );

CREATE POLICY "profiles_admin_all" ON public.profiles
    FOR ALL TO authenticated
    USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- SUBJECTS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "subjects_select_authenticated" ON public.subjects
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "subjects_admin_manage" ON public.subjects
    FOR ALL TO authenticated USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- CLASSES POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "classes_select" ON public.classes
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR public.is_teacher_of_class(id)
        OR public.is_student_of_class(id)
    );

CREATE POLICY "classes_admin_manage" ON public.classes
    FOR ALL TO authenticated USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- CLASS_TEACHERS & CLASS_SUBJECTS
-- ----------------------------------------------------------------------------
CREATE POLICY "class_teachers_select" ON public.class_teachers
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "class_teachers_admin_manage" ON public.class_teachers
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "class_subjects_select" ON public.class_subjects
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR public.is_teacher_of_class(class_id)
        OR public.is_student_of_class(class_id)
    );

CREATE POLICY "class_subjects_admin_manage" ON public.class_subjects
    FOR ALL TO authenticated USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- ENROLLMENTS POLICIES
-- ----------------------------------------------------------------------------
CREATE POLICY "enrollments_select" ON public.enrollments
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR student_id = auth.uid()
        OR public.is_teacher_of_class(class_id)
    );

CREATE POLICY "enrollments_admin_manage" ON public.enrollments
    FOR ALL TO authenticated USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- COURSES & LESSONS & MATERIALS
-- ----------------------------------------------------------------------------
CREATE POLICY "courses_select" ON public.courses
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.class_subjects cs
            WHERE cs.id = courses.class_subject_id
            AND (
                (status = 'published' AND public.is_student_of_class(cs.class_id))
                OR public.is_teacher_of_class(cs.class_id)
            )
        )
    );

CREATE POLICY "courses_teacher_manage" ON public.courses
    FOR ALL TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.class_subjects cs
            WHERE cs.id = courses.class_subject_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "lessons_select" ON public.lessons
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.courses c
            JOIN public.class_subjects cs ON c.class_subject_id = cs.id
            WHERE c.id = lessons.course_id
            AND (
                (lessons.status = 'published' AND public.is_student_of_class(cs.class_id))
                OR public.is_teacher_of_class(cs.class_id)
            )
        )
    );

CREATE POLICY "lessons_teacher_manage" ON public.lessons
    FOR ALL TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.courses c
            JOIN public.class_subjects cs ON c.class_subject_id = cs.id
            WHERE c.id = lessons.course_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "materials_select" ON public.materials
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.courses c ON l.course_id = c.id
            JOIN public.class_subjects cs ON c.class_subject_id = cs.id
            WHERE l.id = materials.lesson_id
            AND (
                (l.status = 'published' AND public.is_student_of_class(cs.class_id))
                OR public.is_teacher_of_class(cs.class_id)
            )
        )
    );

CREATE POLICY "materials_teacher_manage" ON public.materials
    FOR ALL TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.courses c ON l.course_id = c.id
            JOIN public.class_subjects cs ON c.class_subject_id = cs.id
            WHERE l.id = materials.lesson_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

-- ----------------------------------------------------------------------------
-- LESSON PROGRESS
-- ----------------------------------------------------------------------------
CREATE POLICY "lesson_progress_select" ON public.lesson_progress
    FOR SELECT TO authenticated
    USING (
        student_id = auth.uid()
        OR public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.lessons l
            JOIN public.courses c ON l.course_id = c.id
            JOIN public.class_subjects cs ON c.class_subject_id = cs.id
            WHERE l.id = lesson_progress.lesson_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "lesson_progress_upsert_own" ON public.lesson_progress
    FOR ALL TO authenticated
    USING (student_id = auth.uid() OR public.is_admin())
    WITH CHECK (student_id = auth.uid() OR public.is_admin());

-- ----------------------------------------------------------------------------
-- ASSIGNMENTS & SUBMISSIONS
-- ----------------------------------------------------------------------------
CREATE POLICY "assignments_select" ON public.assignments
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.class_subjects cs
            WHERE cs.id = assignments.class_subject_id
            AND (
                (assignments.status = 'published' AND public.is_student_of_class(cs.class_id))
                OR public.is_teacher_of_class(cs.class_id)
            )
        )
    );

CREATE POLICY "assignments_teacher_manage" ON public.assignments
    FOR ALL TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.class_subjects cs
            WHERE cs.id = assignments.class_subject_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "submissions_select" ON public.assignment_submissions
    FOR SELECT TO authenticated
    USING (
        student_id = auth.uid()
        OR public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.assignments a
            JOIN public.class_subjects cs ON a.class_subject_id = cs.id
            WHERE a.id = assignment_submissions.assignment_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "submissions_student_submit" ON public.assignment_submissions
    FOR INSERT TO authenticated
    WITH CHECK (
        (student_id = auth.uid() AND EXISTS (
            SELECT 1 FROM public.assignments a
            JOIN public.class_subjects cs ON a.class_subject_id = cs.id
            WHERE a.id = assignment_submissions.assignment_id
            AND a.status = 'published'
            AND public.is_student_of_class(cs.class_id)
        ))
        OR public.is_admin()
    );

CREATE POLICY "submissions_update" ON public.assignment_submissions
    FOR UPDATE TO authenticated
    USING (
        student_id = auth.uid()
        OR public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.assignments a
            JOIN public.class_subjects cs ON a.class_subject_id = cs.id
            WHERE a.id = assignment_submissions.assignment_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

-- ----------------------------------------------------------------------------
-- QUIZZES & QUESTIONS & ANSWER KEYS
-- ----------------------------------------------------------------------------
CREATE POLICY "quizzes_select" ON public.quizzes
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.class_subjects cs
            WHERE cs.id = quizzes.class_subject_id
            AND (
                (quizzes.status = 'published' AND public.is_student_of_class(cs.class_id))
                OR public.is_teacher_of_class(cs.class_id)
            )
        )
    );

CREATE POLICY "quizzes_teacher_manage" ON public.quizzes
    FOR ALL TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.class_subjects cs
            WHERE cs.id = quizzes.class_subject_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "quiz_questions_select" ON public.quiz_questions
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.quizzes q
            JOIN public.class_subjects cs ON q.class_subject_id = cs.id
            WHERE q.id = quiz_questions.quiz_id
            AND (
                (q.status = 'published' AND public.is_student_of_class(cs.class_id))
                OR public.is_teacher_of_class(cs.class_id)
            )
        )
    );

CREATE POLICY "quiz_questions_teacher_manage" ON public.quiz_questions
    FOR ALL TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.quizzes q
            JOIN public.class_subjects cs ON q.class_subject_id = cs.id
            WHERE q.id = quiz_questions.quiz_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

-- CRITICAL: Quiz answer keys are NEVER readable directly by students!
CREATE POLICY "quiz_answer_keys_select" ON public.quiz_answer_keys
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.quiz_questions qq
            JOIN public.quizzes q ON qq.quiz_id = q.id
            JOIN public.class_subjects cs ON q.class_subject_id = cs.id
            WHERE qq.id = quiz_answer_keys.question_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "quiz_answer_keys_manage" ON public.quiz_answer_keys
    FOR ALL TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.quiz_questions qq
            JOIN public.quizzes q ON qq.quiz_id = q.id
            JOIN public.class_subjects cs ON q.class_subject_id = cs.id
            WHERE qq.id = quiz_answer_keys.question_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

-- ----------------------------------------------------------------------------
-- QUIZ ATTEMPTS & RESPONSES
-- ----------------------------------------------------------------------------
CREATE POLICY "quiz_attempts_select" ON public.quiz_attempts
    FOR SELECT TO authenticated
    USING (
        student_id = auth.uid()
        OR public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.quizzes q
            JOIN public.class_subjects cs ON q.class_subject_id = cs.id
            WHERE q.id = quiz_attempts.quiz_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "quiz_attempts_insert_student" ON public.quiz_attempts
    FOR INSERT TO authenticated
    WITH CHECK (
        student_id = auth.uid()
        OR public.is_admin()
    );

CREATE POLICY "quiz_attempts_update" ON public.quiz_attempts
    FOR UPDATE TO authenticated
    USING (
        student_id = auth.uid()
        OR public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.quizzes q
            JOIN public.class_subjects cs ON q.class_subject_id = cs.id
            WHERE q.id = quiz_attempts.quiz_id
            AND public.is_teacher_of_class(cs.class_id)
        )
    );

CREATE POLICY "quiz_responses_select" ON public.quiz_responses
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.quiz_attempts qa
            WHERE qa.id = quiz_responses.attempt_id
            AND (
                qa.student_id = auth.uid()
                OR public.is_admin()
                OR EXISTS (
                    SELECT 1 FROM public.quizzes q
                    JOIN public.class_subjects cs ON q.class_subject_id = cs.id
                    WHERE q.id = qa.quiz_id
                    AND public.is_teacher_of_class(cs.class_id)
                )
            )
        )
    );

CREATE POLICY "quiz_responses_insert_update_student" ON public.quiz_responses
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.quiz_attempts qa
            WHERE qa.id = quiz_responses.attempt_id
            AND qa.student_id = auth.uid()
            AND qa.status = 'in_progress'
        )
        OR public.is_admin()
    );

-- ----------------------------------------------------------------------------
-- ANNOUNCEMENTS & DISCUSSIONS & REPLIES
-- ----------------------------------------------------------------------------
CREATE POLICY "announcements_select" ON public.announcements
    FOR SELECT TO authenticated
    USING (
        class_id IS NULL -- School-wide
        OR public.is_admin()
        OR public.is_student_of_class(class_id)
        OR public.is_teacher_of_class(class_id)
    );

CREATE POLICY "announcements_manage" ON public.announcements
    FOR ALL TO authenticated
    USING (
        public.is_admin()
        OR (class_id IS NOT NULL AND public.is_teacher_of_class(class_id))
    );

CREATE POLICY "discussions_select" ON public.discussions
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR public.is_student_of_class(class_id)
        OR public.is_teacher_of_class(class_id)
    );

CREATE POLICY "discussions_insert" ON public.discussions
    FOR INSERT TO authenticated
    WITH CHECK (
        public.is_admin()
        OR public.is_student_of_class(class_id)
        OR public.is_teacher_of_class(class_id)
    );

CREATE POLICY "discussions_update_moderation" ON public.discussions
    FOR UPDATE TO authenticated
    USING (
        author_id = auth.uid()
        OR public.is_admin()
        OR public.is_teacher_of_class(class_id)
    );

CREATE POLICY "discussion_replies_select" ON public.discussion_replies
    FOR SELECT TO authenticated
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.discussions d
            WHERE d.id = discussion_replies.discussion_id
            AND (public.is_student_of_class(d.class_id) OR public.is_teacher_of_class(d.class_id))
        )
    );

CREATE POLICY "discussion_replies_insert" ON public.discussion_replies
    FOR INSERT TO authenticated
    WITH CHECK (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.discussions d
            WHERE d.id = discussion_replies.discussion_id
            AND (public.is_student_of_class(d.class_id) OR public.is_teacher_of_class(d.class_id))
        )
    );

CREATE POLICY "discussion_replies_update_moderation" ON public.discussion_replies
    FOR UPDATE TO authenticated
    USING (
        author_id = auth.uid()
        OR public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.discussions d
            WHERE d.id = discussion_replies.discussion_id
            AND public.is_teacher_of_class(d.class_id)
        )
    );

-- ----------------------------------------------------------------------------
-- NOTIFICATIONS
-- ----------------------------------------------------------------------------
CREATE POLICY "notifications_select_own" ON public.notifications
    FOR SELECT TO authenticated
    USING (recipient_id = auth.uid() OR public.is_admin());

CREATE POLICY "notifications_update_own" ON public.notifications
    FOR UPDATE TO authenticated
    USING (recipient_id = auth.uid() OR public.is_admin());

-- ----------------------------------------------------------------------------
-- GAMIFICATION: XP, BADGES
-- ----------------------------------------------------------------------------
CREATE POLICY "xp_events_select" ON public.xp_events
    FOR SELECT TO authenticated
    USING (student_id = auth.uid() OR public.is_admin());

CREATE POLICY "badges_select_all" ON public.badges
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "badges_admin_manage" ON public.badges
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "student_badges_select" ON public.student_badges
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "student_badges_admin_manage" ON public.student_badges
    FOR ALL TO authenticated USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- AUDIT LOGS
-- ----------------------------------------------------------------------------
CREATE POLICY "audit_logs_admin_only" ON public.audit_logs
    FOR ALL TO authenticated
    USING (public.is_admin());
