# Technical Architecture

## Stack
- Next.js App Router dan TypeScript
- Tailwind CSS dan shadcn/ui
- Framer Motion untuk animasi
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Vercel

## Pola arsitektur
- Gunakan Server Components untuk halaman yang cocok dirender di server.
- Gunakan Client Components hanya untuk interaksi yang memang membutuhkan state browser.
- Gunakan Server Actions atau Route Handlers untuk operasi mutasi yang sesuai; validasi dan otorisasi tetap wajib.
- Buat modul domain terpisah untuk auth, classes, materials, assignments, quizzes, grades, notifications, dan gamification.
- Jangan mencampur query database, komponen UI, dan aturan bisnis dalam satu file besar.

## Struktur direktori usulan
```text
src/
  app/
    (public)/
      page.tsx
      login/page.tsx
      forgot-password/page.tsx
    (app)/
      app/
        layout.tsx
        student/
        teacher/
        admin/
  components/
    ui/
    layout/
    dashboard/
    courses/
    assignments/
    quizzes/
    analytics/
  features/
    auth/
    users/
    classes/
    materials/
    assignments/
    quizzes/
    grades/
    notifications/
    gamification/
  lib/
    supabase/
      client.ts
      server.ts
      middleware.ts
    auth/
    validation/
    utils/
  types/
  config/
supabase/
  migrations/
  seed.sql
docs/
```

Sesuaikan nama direktori dengan konvensi route final. Jangan membuat struktur kosong yang terlalu kompleks sebelum ada fitur yang menggunakannya.

## Supabase clients
- Browser client hanya untuk operasi yang memang aman dilakukan dari browser dan dilindungi RLS.
- Server client menggunakan cookies/session pengguna untuk permintaan terautentikasi.
- Secret/service-role key hanya di environment server yang aman; tidak boleh memakai prefix `NEXT_PUBLIC_`.
- Jangan mengandalkan middleware saja sebagai satu-satunya pemeriksaan otorisasi.

## Environment variables
Contoh nama:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` atau publishable key sesuai konfigurasi proyek
- `SUPABASE_SERVICE_ROLE_KEY` hanya jika benar-benar diperlukan di server
- `AI_PROVIDER_API_KEY` hanya jika AI diimplementasikan

Simpan rahasia di environment manager, bukan di repository.

## Error handling
- Gunakan schema validation seperti Zod pada input.
- Tampilkan pesan ramah kepada pengguna; jangan mengirim stack trace atau detail secret.
- Catat error teknis secara aman.
- Sediakan loading, empty, success, error, dan permission-denied state.

## Testing
- Unit test untuk aturan nilai, XP, dan validasi.
- Integration test untuk query dan kebijakan izin.
- End-to-end test untuk login, submit tugas, penilaian, dan kuis.
- Uji akses silang antar siswa dan antar kelas.
