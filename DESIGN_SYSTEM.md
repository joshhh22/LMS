# Design System — EduFlow

## Arah visual
Modern education SaaS: bersih, fokus, ramah, profesional, dan tidak terlalu ramai. Utamakan keterbacaan dan hierarki informasi.

## Identitas
- Nama: EduFlow
- Tagline: Learn Better, Grow Further
- Gaya: minimalis, rounded secukupnya, data cards yang rapi, whitespace konsisten.
- Warna aksen awal: indigo/violet; tetapkan token final dalam CSS variables.
- Sediakan light mode terlebih dahulu; dark mode dapat menyusul.

## Layout
- Sidebar untuk navigasi utama di desktop.
- Sidebar dapat diciutkan jika diperlukan.
- Mobile memakai drawer atau bottom navigation yang sesuai konteks.
- Header menampilkan judul halaman, breadcrumb bila berguna, pencarian jika tersedia, notifikasi, dan profil.
- Konten menggunakan lebar maksimum yang nyaman dibaca.

## Komponen
- Button: primary, secondary, outline, ghost, destructive.
- Input, textarea, select, checkbox, radio, date/time picker.
- Dialog untuk konfirmasi atau form pendek.
- Sheet/drawer untuk detail pada layar kecil.
- Table dengan search, filter, pagination, empty state.
- Badge status: draft, published, submitted, late, graded, archived.
- Toast untuk feedback singkat.
- Skeleton untuk loading.
- Chart harus memiliki label, legenda, dan fallback ketika data kosong.

## Dashboard siswa
- Greeting dan ringkasan belajar.
- Kartu tugas terdekat.
- Continue Learning.
- Jadwal hari ini.
- Progress mata pelajaran.
- XP dan streak, tanpa menjadikan gamifikasi lebih dominan daripada belajar.

## Dashboard guru
- Ringkasan kelas.
- Submission yang perlu dinilai.
- Tugas dan kuis aktif.
- Performa kelas.
- Aksi cepat membuat materi/tugas/kuis.

## Dashboard Admin
- Statistik platform.
- Manajemen pengguna.
- Manajemen kelas dan mata pelajaran.
- Aktivitas administratif dan audit log.
- Tautan ke semua modul karena Admin memiliki akses penuh.

## UX states
Setiap halaman data harus menangani:
- Loading
- Empty
- Error
- Success
- Permission denied
- Data stale atau aksi konflik jika relevan

## Motion
- Animasi pendek dan fungsional.
- Hormati `prefers-reduced-motion`.
- Jangan menganimasikan setiap elemen secara berlebihan.
- Motion tidak boleh menghalangi keyboard navigation atau membaca konten.

## Aksesibilitas
- Kontras warna memadai.
- Focus ring terlihat.
- Label form eksplisit.
- Semua aksi dapat diakses keyboard.
- Jangan menggunakan warna sebagai satu-satunya indikator status.
