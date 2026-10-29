-- EduFlow High-Fidelity Development Seed Data
-- Seed file: supabase/seed.sql

-- 1. Insert Subjects
INSERT INTO public.subjects (id, name, code, description, icon) VALUES
('11111111-1111-1111-1111-111111111101', 'Matematika Peminatan', 'MATH-101', 'Pembelajaran konsep aljabar, kalkulus, trigonometri, dan logika matematika tingkat menengah.', 'Calculator'),
('11111111-1111-1111-1111-111111111102', 'Fisika Dasar', 'PHYS-101', 'Studi gerak mekanika, hukum Newton, energi, termodinamika, dan gelombang.', 'Atom'),
('11111111-1111-1111-1111-111111111103', 'Bahasa Inggris Akademik', 'ENG-101', 'Pengembangan kemampuan reading comprehension, essay writing, and academic presentations.', 'BookOpen'),
('11111111-1111-1111-1111-111111111104', 'Informatika & Pemrograman', 'INFO-101', 'Pengenalan algoritma pemrograman, pemecahan masalah logika, dan pemrograman web.', 'Code2')
ON CONFLICT (code) DO NOTHING;

-- 2. Mock Profiles (Fixed UUIDs for development referencing)
-- Admin
INSERT INTO public.profiles (id, full_name, role, status, bio) VALUES
('00000000-0000-0000-0000-000000000001', 'Dr. Aris Wibowo (Administrator)', 'admin', 'active', 'Kepala Administrator EduFlow LMS SMA Nusantara.')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = 'admin';

-- Teachers
INSERT INTO public.profiles (id, full_name, role, status, bio) VALUES
('00000000-0000-0000-0000-000000000002', 'Budi Santoso, M.Pd.', 'teacher', 'active', 'Guru Pengampu Matematika dan Fisika. Pengalaman mengajar 10 tahun.'),
('00000000-0000-0000-0000-000000000003', 'Siti Aminah, S.Pd.', 'teacher', 'active', 'Guru Bahasa Inggris dan Koordinator Program Literasi Sekolah.')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = 'teacher';

-- Students
INSERT INTO public.profiles (id, full_name, role, status, bio) VALUES
('00000000-0000-0000-0000-000000000004', 'Andi Pratama', 'student', 'active', 'Siswa Kelas 10-A. Peminatan Sains & Teknologi.'),
('00000000-0000-0000-0000-000000000005', 'Clara Wijaya', 'student', 'active', 'Siswi Kelas 10-A. Minat pada Matematika dan Astronomi.'),
('00000000-0000-0000-0000-000000000006', 'Reza Firmansyah', 'student', 'active', 'Siswa Kelas 10-B. Anggota Klub Robotika Sekolah.')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = 'student';

-- 3. Classes
INSERT INTO public.classes (id, name, academic_year, grade_level, description, created_by) VALUES
('22222222-2222-2222-2222-222222222201', 'Kelas 10-A Sains', '2026/2027', 'Kelas 10', 'Kelas unggulan peminatan Matematika dan Ilmu Pengetahuan Alam.', '00000000-0000-0000-0000-000000000001'),
('22222222-2222-2222-2222-222222222202', 'Kelas 10-B Teknologi', '2026/2027', 'Kelas 10', 'Kelas peminatan Sains Terapan dan Teknologi Komputer.', '00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- 4. Class Teachers
INSERT INTO public.class_teachers (class_id, teacher_id, is_homeroom) VALUES
('22222222-2222-2222-2222-222222222201', '00000000-0000-0000-0000-000000000002', true),
('22222222-2222-2222-2222-222222222202', '00000000-0000-0000-0000-000000000003', true)
ON CONFLICT (class_id, teacher_id) DO NOTHING;

-- 5. Class Subjects
INSERT INTO public.class_subjects (id, class_id, subject_id, teacher_id, schedule_day, schedule_time_start, schedule_time_end, room) VALUES
('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111101', '00000000-0000-0000-0000-000000000002', 'Senin', '08:00', '09:30', 'Ruang 201 Lab MIPA'),
('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111102', '00000000-0000-0000-0000-000000000002', 'Rabu', '10:00', '11:30', 'Ruang Fisika'),
('33333333-3333-3333-3333-333333333303', '22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111103', '00000000-0000-0000-0000-000000000003', 'Kamis', '08:00', '09:30', 'Ruang Bahasa')
ON CONFLICT (class_id, subject_id, teacher_id) DO NOTHING;

-- 6. Enrollments
INSERT INTO public.enrollments (id, class_id, student_id, status) VALUES
('44444444-4444-4444-4444-444444444401', '22222222-2222-2222-2222-222222222201', '00000000-0000-0000-0000-000000000004', 'active'),
('44444444-4444-4444-4444-444444444402', '22222222-2222-2222-2222-222222222201', '00000000-0000-0000-0000-000000000005', 'active'),
('44444444-4444-4444-4444-444444444403', '22222222-2222-2222-2222-222222222202', '00000000-0000-0000-0000-000000000006', 'active')
ON CONFLICT (class_id, student_id) DO NOTHING;

-- 7. Courses
INSERT INTO public.courses (id, class_subject_id, title, description, status, position, created_by) VALUES
('55555555-5555-5555-5555-555555555501', '33333333-3333-3333-3333-333333333301', 'Modul 1: Fungsi, Grafik, dan Polinomial', 'Membahas pemahaman sifat-sifat fungsi aljabar, persamaan polinomial, dan analisis grafik koordinat Kartesius.', 'published', 1, '00000000-0000-0000-0000-000000000002'),
('55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333302', 'Modul 1: Kinematika & Hukum Gerak Newton', 'Eksplorasi gerak lurus beraturan (GLB), gerak lurus berubah beraturan (GLBB), dan gaya inersia.', 'published', 1, '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- 8. Lessons
INSERT INTO public.lessons (id, course_id, title, content, position, estimated_minutes, status, published_at) VALUES
('66666666-6666-6666-6666-666666666601', '55555555-5555-5555-5555-555555555501', 'Bab 1.1 — Konsep Dasar Domain, Kodomain, & Range', 'Pada pertemuan pertama ini kita mempelajari pengertian fungsi f: A -> B, bagaimana menentukan domain alami dari fungsi pecahan dan bentuk akar kuadrat, serta visualisasinya.', 1, 45, 'published', NOW()),
('66666666-6666-6666-6666-666666666602', '55555555-5555-5555-5555-555555555501', 'Bab 1.2 — Komposisi Fungsi dan Invers', 'Menjelaskan alur pembentukan fungsi komposisi (f o g)(x) dan syarat keberadaan fungsi invers f^(-1)(x).', 2, 50, 'published', NOW())
ON CONFLICT (id) DO NOTHING;

-- 9. Materials
INSERT INTO public.materials (id, lesson_id, title, material_type, external_url, position) VALUES
('77777777-7777-7777-7777-777777777701', '66666666-6666-6666-6666-666666666601', 'Slide Kuliah: Domain & Range Fungsi', 'pdf', 'https://example.com/slide-fungsi-bab1.pdf', 1),
('77777777-7777-7777-7777-777777777702', '66666666-6666-6666-6666-666666666601', 'Video Animasi Interaktif Plotting Geogebra', 'video', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 2)
ON CONFLICT (id) DO NOTHING;

-- 10. Assignments
INSERT INTO public.assignments (id, class_subject_id, title, instructions, due_at, max_score, allow_late_submission, status, published_at, created_by) VALUES
('88888888-8888-8888-8888-888888888801', '33333333-3333-3333-3333-333333333301', 'Tugas 1: Analisis Domain & Komposisi Fungsi', 'Selesaikan 5 soal studi kasus terlampir. Tulis langkah penyelesaian secara terstruktur dan jelaskan setiap asumsi domain yang digunakan.', NOW() + INTERVAL '5 days', 100, true, 'published', NOW(), '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- 11. Submissions
INSERT INTO public.assignment_submissions (id, assignment_id, student_id, text_answer, score, feedback, status, graded_by, graded_at) VALUES
('99999999-9999-9999-9999-999999999901', '88888888-8888-8888-8888-888888888801', '00000000-0000-0000-0000-000000000004', 'Berikut adalah rangkuman penyelesaian:\n1. Domain f(x) = sqrt(x^2 - 4) adalah x <= -2 atau x >= 2.\n2. Invers g(x) = (2x+3)/(x-1) adalah g^(-1)(x) = (x+3)/(x-2) dengan x != 2.', 94, 'Penalaran matematis sangat teliti dan penulisan domain sangat tepat. Pertahankan!', 'graded', '00000000-0000-0000-0000-000000000002', NOW() - INTERVAL '1 day'),
('99999999-9999-9999-9999-999999999902', '88888888-8888-8888-8888-888888888801', '00000000-0000-0000-0000-000000000005', 'Langkah pengerjaan nomor 1 sampai 5 sudah saya rangkum dalam jawaban teks ini.', null, null, 'submitted', null, null)
ON CONFLICT (id) DO NOTHING;

-- 12. Quizzes
INSERT INTO public.quizzes (id, class_subject_id, title, instructions, duration_minutes, opens_at, closes_at, max_attempts, show_results_at, status, published_at, created_by) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333301', 'Kuis Singkat: Aljabar & Fungsi Kuadrat', 'Kerjakan 3 pertanyaan pilihan ganda dan 1 pertanyaan isian singkat dalam batas waktu 20 menit.', 20, NOW() - INTERVAL '2 days', NOW() + INTERVAL '7 days', 2, 'immediately', 'published', NOW(), '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Quiz Questions
INSERT INTO public.quiz_questions (id, quiz_id, question_type, prompt, options, points, position) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'multiple_choice', 'Berapakah nilai f(3) jika f(x) = 2x^2 - 5x + 1?', '[{"id":"A","text":"4"},{"id":"B","text":"10"},{"id":"C","text":"16"},{"id":"D","text":"2"}]'::jsonb, 50, 1),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'multiple_choice', 'Jika f(x) = 3x - 2 dan g(x) = x + 4, berapakah nilai (f o g)(2)?', '[{"id":"A","text":"14"},{"id":"B","text":"16"},{"id":"C","text":"18"},{"id":"D","text":"12"}]'::jsonb, 50, 2)
ON CONFLICT (id) DO NOTHING;

-- Quiz Answer Keys (Server side protected)
INSERT INTO public.quiz_answer_keys (question_id, answer_key, explanation) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01', '{"correct_option_id":"A"}'::jsonb, 'f(3) = 2(3)^2 - 5(3) + 1 = 2(9) - 15 + 1 = 18 - 15 + 1 = 4.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02', '{"correct_option_id":"B"}'::jsonb, 'g(2) = 2 + 4 = 6. Maka f(g(2)) = f(6) = 3(6) - 2 = 18 - 2 = 16.')
ON CONFLICT (question_id) DO NOTHING;

-- 13. Announcements
INSERT INTO public.announcements (id, class_id, title, body, is_pinned, created_by, published_at) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', null, 'Selamat Datang di Semester Baru EduFlow 2026/2027!', 'Halo seluruh civitas akademika! Platform EduFlow resmi diluncurkan untuk mempermudah koordinasi modul materi, tugas, dan ujian sekolah.', true, '00000000-0000-0000-0000-000000000001', NOW()),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222201', 'Pengingat Deadline Tugas 1 Matematika', 'Jangan lupa mengumpulkan Tugas 1 Matematika sebelum batas waktu hari Jumat pukul 23:59 WIB.', false, '00000000-0000-0000-0000-000000000002', NOW())
ON CONFLICT (id) DO NOTHING;

-- 14. Discussions
INSERT INTO public.discussions (id, class_id, author_id, title, body, status) VALUES
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222201', '00000000-0000-0000-0000-000000000004', 'Diskusi Tips Menentukan Syarat Domain Fungsi Pecahan Berakar', 'Apakah ada tips cepat memeriksa tanda garis bilangan saat penyebutnya mengandung bentuk akar kuadrat?', 'visible')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.discussion_replies (id, discussion_id, author_id, body) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '00000000-0000-0000-0000-000000000002', 'Tips utama: ingat bahwa ekspresi di dalam akar harus >= 0, namun jika akar tersebut berada di posisi penyebut, maka syaratnya menjadi ketat > 0 (tidak boleh sama dengan nol).')
ON CONFLICT (id) DO NOTHING;

-- 15. Badges
INSERT INTO public.badges (id, code, name, description, icon_key, xp_bonus) VALUES
('10101010-1010-1010-1010-101010101001', 'FIRST_SUBMISSION', 'Langkah Pertama', 'Berhasil mengumpulkan tugas pembelajaran pertama kamu di EduFlow.', 'Award', 100),
('10101010-1010-1010-1010-101010101002', 'PERFECT_SCORE', 'Kecemerlangan Akademik', 'Meraih skor sempurna 100 atau A+ pada tugas atau kuis.', 'Star', 250),
('10101010-1010-1010-1010-101010101003', 'STREAK_7', 'Konsistensi 7 Hari', 'Belajar dan mengakses materi selama 7 hari berturut-turut.', 'Flame', 300)
ON CONFLICT (code) DO NOTHING;

-- Student Badges
INSERT INTO public.student_badges (student_id, badge_id, awarded_at) VALUES
('00000000-0000-0000-0000-000000000004', '10101010-1010-1010-1010-101010101001', NOW() - INTERVAL '3 days')
ON CONFLICT (student_id, badge_id) DO NOTHING;

-- 16. XP Events
INSERT INTO public.xp_events (id, student_id, event_type, xp_delta, idempotency_key) VALUES
('20202020-2020-2020-2020-202020202001', '00000000-0000-0000-0000-000000000004', 'assignment_submitted', 150, 'xp_asg_88888888-8888-8888-8888-888888888801_00000000-0000-0000-0000-000000000004'),
('20202020-2020-2020-2020-202020202002', '00000000-0000-0000-0000-000000000004', 'badge_awarded', 100, 'xp_badge_10101010-1010-1010-1010-101010101001_00000000-0000-0000-0000-000000000004')
ON CONFLICT (idempotency_key) DO NOTHING;

-- 17. Notifications
INSERT INTO public.notifications (id, recipient_id, type, title, body, target_url) VALUES
('30303030-3030-3030-3030-303030303001', '00000000-0000-0000-0000-000000000004', 'grade_published', 'Tugas 1 Telah Dinilai', 'Guru Budi Santoso memberikan nilai 94/100 pada Tugas 1 Matematika.', '/app/student/assignments/88888888-8888-8888-8888-888888888801'),
('30303030-3030-3030-3030-303030303002', '00000000-0000-0000-0000-000000000004', 'announcement', 'Pengumuman Baru Sekolah', 'Selamat Datang di Semester Baru EduFlow 2026/2027!', '/app/student/community')
ON CONFLICT (id) DO NOTHING;

-- 18. Audit Logs
INSERT INTO public.audit_logs (id, actor_id, action, entity_type, metadata) VALUES
('40404040-4040-4040-4040-404040404001', '00000000-0000-0000-0000-000000000001', 'CREATE_CLASS', 'class', '{"class_name":"Kelas 10-A Sains","academic_year":"2026/2027"}'::jsonb),
('40404040-4040-4040-4040-404040404002', '00000000-0000-0000-0000-000000000001', 'ASSIGN_TEACHER', 'class_teacher', '{"teacher_name":"Budi Santoso, M.Pd.","class_name":"Kelas 10-A Sains"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

