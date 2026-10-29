# EduFlow — Learn Better, Grow Further

EduFlow adalah Learning Management System (LMS) untuk sekolah yang mengintegrasikan pembelajaran, materi, tugas, kuis, nilai, komunikasi kelas, analitik, dan gamifikasi.

## Tujuan produk
- Memudahkan siswa mengakses materi, menyelesaikan tugas, dan memantau perkembangan.
- Membantu guru mengelola kelas, materi, tugas, kuis, dan penilaian.
- Memberikan Admin akses penuh untuk mengelola seluruh platform.

## Stack yang disepakati
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion untuk animasi yang terukur
- Supabase Auth, PostgreSQL, Storage, dan Row Level Security
- Vercel untuk deployment

## Role
- **Admin:** akses penuh ke semua modul dan data platform.
- **Teacher:** mengelola kelas yang ditugaskan, materi, tugas, kuis, penilaian, pengumuman, dan analitik kelas.
- **Student:** mengikuti kelas, mengakses materi, mengumpulkan tugas, mengerjakan kuis, melihat nilai yang dipublikasikan, berdiskusi, dan memperoleh XP.

## Urutan membaca dokumentasi
1. `docs/PRODUCT_REQUIREMENTS.md`
2. `docs/ROLES_AND_PERMISSIONS.md`
3. `docs/SITEMAP.md`
4. `docs/USER_FLOWS.md`
5. `docs/DATABASE_SCHEMA.md`
6. `docs/TECHNICAL_ARCHITECTURE.md`
7. `docs/DESIGN_SYSTEM.md`
8. `docs/SECURITY.md`
9. `docs/IMPLEMENTATION_ROADMAP.md`
10. `docs/ACCEPTANCE_CRITERIA.md`

## Prinsip penting
- Jangan menganggap data contoh sebagai data produksi.
- Semua fitur harus terhubung ke backend sebelum dinyatakan selesai.
- Otorisasi harus divalidasi di server dan database, bukan hanya dengan menyembunyikan tombol.
- Service-role key Supabase tidak boleh dikirim ke browser.
- Nilai dan jawaban ujian tidak boleh bocor sebelum waktu publikasi yang ditentukan.
- Terapkan validasi input, batas ukuran file, dan penanganan error yang jelas.

## Status
Dokumen ini adalah spesifikasi awal. Keputusan yang belum ditentukan harus dikonfirmasi sebelum implementasi yang memengaruhi data atau keamanan.
