# Acceptance Criteria

## Authentication
- Pengguna dapat login dan logout.
- Password reset tidak membocorkan apakah email terdaftar.
- Role berasal dari sumber tepercaya.
- Pengguna tanpa sesi tidak dapat membuka route privat.

## Role and Admin
- Admin dapat mengakses semua modul aplikasi.
- Admin dapat membuat, mengubah, menonaktifkan, dan mengelola pengguna sesuai kebijakan.
- Teacher tidak dapat mengubah role dirinya menjadi Admin.
- Student tidak dapat membuka route Admin hanya dengan mengetik URL.
- Pemeriksaan akses dilakukan di server dan database.

## Classes and materials
- Teacher hanya mengelola kelas yang ditugaskan.
- Student hanya melihat kelas yang diikuti.
- Materi draft tidak terlihat oleh Student.
- File privat tidak dapat diakses pengguna tanpa izin.

## Assignments
- Teacher dapat membuat tugas dan menentukan deadline.
- Student dapat mengirim jawaban sesuai aturan tugas.
- Timestamp submission ditetapkan server.
- Student tidak dapat membaca submission milik siswa lain.
- Teacher dapat menilai hanya submission kelas yang berwenang.
- Skor divalidasi terhadap rentang yang diizinkan.

## Quizzes
- Kuis mengikuti jadwal buka/tutup dan batas percobaan.
- Attempt terikat pada siswa yang benar.
- Answer key tidak dikirim ke client sebelum diizinkan.
- Jawaban tersimpan dan submit final tidak dapat digandakan.
- Hasil ditampilkan sesuai pengaturan kuis.

## Grades and analytics
- Student hanya melihat nilai sendiri yang dipublikasikan.
- Teacher hanya melihat analitik kelas yang ditugaskan.
- Admin dapat melihat analitik lintas platform.
- Grafik menangani data kosong dan kegagalan pemuatan.

## Gamification
- XP dihitung di server.
- Event yang sama tidak memberikan XP ganda.
- Pengguna tidak dapat mengirim jumlah XP sendiri.
- Badge diberikan berdasarkan kriteria yang tervalidasi.

## UX and quality
- Halaman utama responsif pada desktop dan mobile.
- Semua form memiliki validasi dan feedback.
- Semua daftar memiliki loading, empty, dan error state.
- Aksi penting memberi konfirmasi yang sesuai.
- Navigasi keyboard dan focus indicator berfungsi.
- Tidak ada secret dalam client bundle.

## Release gate
Jangan merilis jika terdapat bypass role, kebocoran nilai/jawaban ujian, akses lintas siswa, atau akses file privat tanpa otorisasi.
