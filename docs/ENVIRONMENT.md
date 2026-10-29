# Environment Setup

## Prerequisites
- Node.js versi LTS yang kompatibel dengan versi Next.js yang dipilih
- npm, pnpm, atau package manager yang disepakati tim
- Akun Supabase
- Akun GitHub
- Akun Vercel untuk deployment

## Setup lokal
1. Buat aplikasi Next.js dengan App Router dan TypeScript.
2. Pasang Tailwind CSS dan konfigurasi shadcn/ui.
3. Buat proyek Supabase.
4. Salin URL dan publishable/anon key ke `.env.local`.
5. Jalankan migration database.
6. Isi seed data khusus development.
7. Jalankan server development.
8. Uji auth, role, dan RLS sebelum mengembangkan modul data.

## `.env.local` contoh
```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# Server only; jangan pernah memakai prefix NEXT_PUBLIC_
SUPABASE_SERVICE_ROLE_KEY=
# Hanya jika fitur AI benar-benar diimplementasikan
AI_PROVIDER_API_KEY=
```

Jangan commit `.env.local`. Tambahkan ke `.gitignore`. Untuk Supabase, gunakan nama key yang sesuai dengan jenis key yang tersedia di project settings.

## Catatan
- Service-role key bersifat rahasia dan melewati RLS; gunakan hanya di server dan hanya jika diperlukan.
- Jangan menaruh kredensial asli pada seed atau dokumentasi.
- Untuk demo, gunakan akun dan data fiktif.
