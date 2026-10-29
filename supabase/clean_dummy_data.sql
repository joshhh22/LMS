-- EduFlow LMS: Clean All Dummy / Mock Data
-- File: supabase/clean_dummy_data.sql
-- Run this in your Supabase SQL Editor to reset the database to a clean production state.

-- ============================================================================
-- 1. CLEAN STUDENT ACTIVITIES & SUBMISSIONS
-- ============================================================================
TRUNCATE TABLE public.assignment_submissions CASCADE;
TRUNCATE TABLE public.quiz_responses CASCADE;
TRUNCATE TABLE public.quiz_attempts CASCADE;
TRUNCATE TABLE public.student_badges CASCADE;
TRUNCATE TABLE public.xp_events CASCADE;
TRUNCATE TABLE public.notifications CASCADE;
TRUNCATE TABLE public.audit_logs CASCADE;

-- ============================================================================
-- 2. CLEAN ACADEMIC CONTENT & EVALUATION
-- ============================================================================
TRUNCATE TABLE public.quiz_answer_keys CASCADE;
TRUNCATE TABLE public.quiz_questions CASCADE;
TRUNCATE TABLE public.quizzes CASCADE;
TRUNCATE TABLE public.assignments CASCADE;
TRUNCATE TABLE public.materials CASCADE;
TRUNCATE TABLE public.lessons CASCADE;
TRUNCATE TABLE public.courses CASCADE;
TRUNCATE TABLE public.discussion_replies CASCADE;
TRUNCATE TABLE public.discussions CASCADE;
TRUNCATE TABLE public.announcements CASCADE;

-- ============================================================================
-- 3. CLEAN CLASSES, ENROLLMENTS & SUBJECTS
-- ============================================================================
TRUNCATE TABLE public.enrollments CASCADE;
TRUNCATE TABLE public.class_subjects CASCADE;
TRUNCATE TABLE public.class_teachers CASCADE;
TRUNCATE TABLE public.classes CASCADE;
TRUNCATE TABLE public.subjects CASCADE;

-- ============================================================================
-- 4. CLEAN DUMMY ACCOUNTS (Keep only primary Admin)
-- ============================================================================
-- Delete dummy teachers and students from profiles
DELETE FROM public.profiles
WHERE id != '00000000-0000-0000-0000-000000000001';

-- Delete dummy teachers and students from auth.users & auth.identities
DELETE FROM auth.identities
WHERE user_id != '00000000-0000-0000-0000-000000000001';

DELETE FROM auth.users
WHERE id != '00000000-0000-0000-0000-000000000001';

-- Ensure primary Administrator account exists and is active
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000001',
    'authenticated',
    'authenticated',
    'admin@eduflow.school',
    crypt('admin123', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Administrator Sekolah","role":"admin"}'::jsonb,
    NOW(),
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    encrypted_password = crypt('admin123', gen_salt('bf')),
    raw_user_meta_data = '{"full_name":"Administrator Sekolah","role":"admin"}'::jsonb;

INSERT INTO public.profiles (id, full_name, role, status, bio)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Administrator Sekolah',
    'admin',
    'active',
    'Akun Administrator Utama EduFlow LMS.'
) ON CONFLICT (id) DO UPDATE SET
    full_name = 'Administrator Sekolah',
    role = 'admin',
    status = 'active';

-- All dummy data has been successfully cleaned.
-- Only the single clean Administrator account remains: admin@eduflow.school (Password: admin123).

