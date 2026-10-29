# Implementation Roadmap

## Phase 0 — Project foundation
- [ ] Buat repository dan aplikasi Next.js TypeScript.
- [ ] Pasang Tailwind dan shadcn/ui.
- [ ] Buat proyek Supabase dan environment variables.
- [ ] Siapkan layout global, typography, tokens, dan sidebar.
- [ ] Siapkan migration workflow.
- [ ] Buat linting, formatting, dan testing baseline.

## Phase 1 — Auth and permissions
- [ ] Login/logout/reset password.
- [ ] Profiles dan role.
- [ ] Route protection di server.
- [ ] RLS dasar dan pengujian akses.
- [ ] Redirect dashboard sesuai role.
- [ ] Admin dapat mengelola akun dan role.

## Phase 2 — Classes and learning content
- [ ] CRUD mata pelajaran dan kelas.
- [ ] Assign Teacher ke kelas.
- [ ] Enrollment Student.
- [ ] Courses, lessons, materials.
- [ ] Storage policy dan upload.
- [ ] Progress materi.

## Phase 3 — Assignments and grading
- [ ] CRUD tugas.
- [ ] Submission teks/file.
- [ ] Status submission dan deadline.
- [ ] Review, skor, feedback, publikasi nilai.
- [ ] Notifikasi tugas dan hasil nilai.

## Phase 4 — Quizzes
- [ ] Builder kuis dan soal.
- [ ] Waktu buka/tutup dan jumlah percobaan.
- [ ] Attempt, response, autosave.
- [ ] Penilaian objektif.
- [ ] Pengungkapan hasil sesuai kebijakan.

## Phase 5 — Calendar, announcements, community
- [ ] Kalender dan agenda.
- [ ] Pengumuman.
- [ ] Diskusi dan balasan.
- [ ] Moderasi dasar.
- [ ] Notification center.

## Phase 6 — Analytics and gamification
- [ ] Gradebook.
- [ ] Grafik performa siswa/kelas.
- [ ] XP events yang idempotent.
- [ ] Badge dan streak.
- [ ] Leaderboard sesuai kebijakan sekolah.

## Phase 7 — Hardening and release
- [ ] E2E testing.
- [ ] Accessibility pass.
- [ ] Responsive testing.
- [ ] Security review.
- [ ] Seed data demo yang tidak berisi data nyata.
- [ ] Deployment staging dan production.
- [ ] Dokumentasi setup dan demo.

## Phase 8 — Advanced roadmap
- [ ] AI Study Assistant.
- [ ] Coding Lab dengan sandbox terisolasi.
- [ ] Group Project Workspace.
- [ ] Digital Certificates.

## Definition of done
Fitur dianggap selesai hanya jika UI, validasi, backend, izin akses, error states, dan pengujian utamanya sudah berfungsi. Mockup atau tombol tanpa aksi bukan implementasi selesai.
