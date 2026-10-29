# Sitemap — EduFlow

## Public
- `/` — landing page
- `/login` — login
- `/forgot-password` — pemulihan password
- `/reset-password` — set password baru
- `/unauthorized` — akses ditolak

## Shared authenticated
- `/app/profile` — profil
- `/app/settings` — pengaturan akun
- `/app/notifications` — pusat notifikasi
- `/app/calendar` — kalender dan agenda

## Student
- `/app/student/dashboard`
- `/app/student/courses`
- `/app/student/courses/[courseId]`
- `/app/student/lessons/[lessonId]`
- `/app/student/assignments`
- `/app/student/assignments/[assignmentId]`
- `/app/student/quizzes`
- `/app/student/quizzes/[quizId]`
- `/app/student/quizzes/[quizId]/attempt`
- `/app/student/grades`
- `/app/student/progress`
- `/app/student/achievements`
- `/app/student/community`
- `/app/student/community/[discussionId]`

## Teacher
- `/app/teacher/dashboard`
- `/app/teacher/classes`
- `/app/teacher/classes/[classId]`
- `/app/teacher/materials`
- `/app/teacher/assignments`
- `/app/teacher/assignments/[assignmentId]/submissions`
- `/app/teacher/submissions/[submissionId]/review`
- `/app/teacher/quizzes`
- `/app/teacher/quizzes/[quizId]/results`
- `/app/teacher/gradebook`
- `/app/teacher/analytics`
- `/app/teacher/announcements`
- `/app/teacher/discussions`

## Admin — akses penuh
- `/app/admin/dashboard`
- `/app/admin/users`
- `/app/admin/users/[userId]`
- `/app/admin/roles`
- `/app/admin/classes`
- `/app/admin/subjects`
- `/app/admin/enrollments`
- `/app/admin/courses`
- `/app/admin/materials`
- `/app/admin/assignments`
- `/app/admin/quizzes`
- `/app/admin/grades`
- `/app/admin/calendar`
- `/app/admin/announcements`
- `/app/admin/discussions`
- `/app/admin/gamification`
- `/app/admin/analytics`
- `/app/admin/audit-logs`
- `/app/admin/storage`
- `/app/admin/settings`

## Catatan routing
Sitemap adalah usulan route, bukan kewajiban menggunakan seluruh halaman sejak MVP. Hindari duplikasi halaman jika komponen dan route bersama lebih tepat. Semua route privat harus dilindungi di server.
