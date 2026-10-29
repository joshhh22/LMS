# Database Schema — Supabase PostgreSQL

Skema berikut adalah rancangan awal. Terapkan migration SQL bertahap dan tinjau constraint, indeks, serta kebijakan RLS sebelum production.

## Konvensi
- Primary key umumnya `uuid`.
- Timestamp menggunakan `timestamptz`.
- Tabel aplikasi memiliki `created_at` dan, jika relevan, `updated_at`.
- Profil pengguna terhubung ke `auth.users(id)`.
- Jangan menyimpan password di tabel aplikasi.

## Tabel utama

### `profiles`
- `id uuid primary key references auth.users(id) on delete cascade`
- `full_name text not null`
- `avatar_url text null`
- `role app_role not null`
- `status account_status not null default 'active'`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Enum usulan:
- `app_role`: `admin`, `teacher`, `student`
- `account_status`: `active`, `suspended`, `pending`

Role harus ditetapkan oleh proses tepercaya. Jangan izinkan pengguna mengubah role lewat update profil biasa.

### `subjects`
- `id uuid primary key`
- `name text not null`
- `code text unique`
- `description text`
- timestamps

### `classes`
- `id uuid primary key`
- `name text not null`
- `academic_year text not null`
- `description text`
- `created_by uuid references profiles(id)`
- timestamps

### `class_teachers`
- `class_id uuid references classes(id) on delete cascade`
- `teacher_id uuid references profiles(id) on delete cascade`
- primary key (`class_id`, `teacher_id`)

### `class_subjects`
- `id uuid primary key`
- `class_id uuid references classes(id) on delete cascade`
- `subject_id uuid references subjects(id)`
- `teacher_id uuid references profiles(id)`
- unique constraint yang sesuai dengan aturan sekolah

### `enrollments`
- `id uuid primary key`
- `class_id uuid references classes(id) on delete cascade`
- `student_id uuid references profiles(id) on delete cascade`
- `status text not null`
- `joined_at timestamptz`
- unique (`class_id`, `student_id`)

### `courses`
- `id uuid primary key`
- `class_subject_id uuid references class_subjects(id)`
- `title text not null`
- `description text`
- `status text not null default 'draft'`
- `created_by uuid references profiles(id)`
- timestamps

### `lessons`
- `id uuid primary key`
- `course_id uuid references courses(id) on delete cascade`
- `title text not null`
- `content text`
- `position integer not null`
- `estimated_minutes integer`
- `published_at timestamptz`
- timestamps

### `materials`
- `id uuid primary key`
- `lesson_id uuid references lessons(id) on delete cascade`
- `title text not null`
- `material_type text not null`
- `storage_path text null`
- `external_url text null`
- `metadata jsonb not null default '{}'`
- timestamps

Validasi tipe dan URL dilakukan di server. File privat diakses melalui signed URL atau mekanisme akses yang tervalidasi.

### `lesson_progress`
- `id uuid primary key`
- `lesson_id uuid references lessons(id) on delete cascade`
- `student_id uuid references profiles(id) on delete cascade`
- `completed_at timestamptz`
- `last_position_seconds integer`
- unique (`lesson_id`, `student_id`)

### `assignments`
- `id uuid primary key`
- `class_subject_id uuid references class_subjects(id)`
- `title text not null`
- `instructions text not null`
- `due_at timestamptz`
- `max_score numeric not null default 100`
- `allow_late_submission boolean not null default false`
- `status text not null default 'draft'`
- `published_at timestamptz`
- `created_by uuid references profiles(id)`
- timestamps

### `assignment_submissions`
- `id uuid primary key`
- `assignment_id uuid references assignments(id) on delete cascade`
- `student_id uuid references profiles(id) on delete cascade`
- `text_answer text`
- `storage_path text`
- `submitted_at timestamptz`
- `status text not null`
- `score numeric`
- `feedback text`
- `graded_by uuid references profiles(id)`
- `graded_at timestamptz`
- timestamps

Tentukan apakah submission memiliki satu record yang dapat diperbarui atau tabel riwayat submission terpisah. Jika riwayat revisi dibutuhkan, gunakan `submission_versions`.

### `quizzes`
- `id uuid primary key`
- `class_subject_id uuid references class_subjects(id)`
- `title text not null`
- `instructions text`
- `duration_minutes integer`
- `opens_at timestamptz`
- `closes_at timestamptz`
- `max_attempts integer not null default 1`
- `show_results_at text not null default 'after_close'`
- `status text not null default 'draft'`
- `created_by uuid references profiles(id)`
- timestamps

### `quiz_questions`
- `id uuid primary key`
- `quiz_id uuid references quizzes(id) on delete cascade`
- `question_type text not null`
- `prompt text not null`
- `options jsonb`
- `answer_key jsonb`
- `points numeric not null`
- `position integer not null`

Penting: jangan kirim `answer_key` ke browser sebelum diizinkan. Pertimbangkan memisahkan answer key ke tabel privat dengan RLS ketat atau hanya mengaksesnya lewat fungsi server tepercaya.

### `quiz_attempts`
- `id uuid primary key`
- `quiz_id uuid references quizzes(id) on delete cascade`
- `student_id uuid references profiles(id) on delete cascade`
- `started_at timestamptz not null`
- `submitted_at timestamptz`
- `score numeric`
- `status text not null`
- `attempt_number integer not null`

### `quiz_responses`
- `id uuid primary key`
- `attempt_id uuid references quiz_attempts(id) on delete cascade`
- `question_id uuid references quiz_questions(id) on delete cascade`
- `response jsonb`
- `saved_at timestamptz not null default now()`
- unique (`attempt_id`, `question_id`)

### `announcements`
- `id uuid primary key`
- `class_id uuid references classes(id) null`
- `title text not null`
- `body text not null`
- `created_by uuid references profiles(id)`
- `published_at timestamptz`
- timestamps

`class_id` null dapat berarti pengumuman platform jika memang diizinkan; Admin memiliki akses penuh.

### `discussions`
- `id uuid primary key`
- `class_id uuid references classes(id) on delete cascade`
- `lesson_id uuid references lessons(id) on delete set null`
- `author_id uuid references profiles(id)`
- `title text not null`
- `body text not null`
- `status text not null default 'visible'`
- timestamps

### `discussion_replies`
- `id uuid primary key`
- `discussion_id uuid references discussions(id) on delete cascade`
- `author_id uuid references profiles(id)`
- `body text not null`
- timestamps

### `notifications`
- `id uuid primary key`
- `recipient_id uuid references profiles(id) on delete cascade`
- `type text not null`
- `title text not null`
- `body text`
- `target_url text`
- `read_at timestamptz`
- `created_at timestamptz not null default now()`

### `xp_events`
- `id uuid primary key`
- `student_id uuid references profiles(id) on delete cascade`
- `event_type text not null`
- `source_id uuid`
- `xp_delta integer not null`
- `idempotency_key text unique not null`
- `created_at timestamptz not null default now()`

Total XP sebaiknya dihitung dari event atau diperbarui secara transaksional dengan proteksi duplikasi.

### `badges`
- `id uuid primary key`
- `code text unique not null`
- `name text not null`
- `description text`
- `icon_key text`
- `criteria jsonb`

### `student_badges`
- `student_id uuid references profiles(id) on delete cascade`
- `badge_id uuid references badges(id) on delete cascade`
- `awarded_at timestamptz not null default now()`
- primary key (`student_id`, `badge_id`)

### `audit_logs`
- `id uuid primary key`
- `actor_id uuid references profiles(id)`
- `action text not null`
- `entity_type text not null`
- `entity_id uuid`
- `metadata jsonb not null default '{}'`
- `created_at timestamptz not null default now()`

Jangan menyimpan password, token, secret, atau data sensitif berlebihan pada metadata log.

## Indeks yang disarankan
- `enrollments(student_id, class_id)`
- `class_teachers(teacher_id, class_id)`
- `assignments(class_subject_id, due_at)`
- `assignment_submissions(assignment_id, student_id)`
- `quiz_attempts(quiz_id, student_id)`
- `notifications(recipient_id, read_at, created_at desc)`
- `discussions(class_id, created_at desc)`
- `xp_events(student_id, created_at desc)`

## Catatan integritas
- Tambahkan constraint skor tidak kurang dari 0 dan tidak melebihi `max_score` melalui validasi transaksi yang tepat.
- Gunakan transaksi untuk submit dan penilaian.
- Terapkan `updated_at` trigger jika dibutuhkan.
- Buat migration dan seed terpisah.
- Semua foreign key dan aturan penghapusan harus ditinjau sesuai kebutuhan retensi data sekolah.
