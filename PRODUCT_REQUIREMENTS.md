# Product Requirements — EduFlow

## 1. Ringkasan
EduFlow adalah LMS sekolah dengan antarmuka modern, navigasi konsisten, dan alur belajar yang mudah dipahami. Produk mengutamakan fungsi LMS inti sebelum fitur eksperimental.

## 2. Pengguna sasaran
- Siswa sekolah
- Guru
- Admin sekolah/platform

## 3. Tujuan
- Memusatkan materi, tugas, kuis, nilai, jadwal, dan pengumuman.
- Memperjelas status tugas dan perkembangan belajar.
- Mengurangi pekerjaan administratif guru.
- Memberi Admin kontrol menyeluruh terhadap platform.

## 4. Modul inti
1. Authentication dan profil
2. Dashboard sesuai role
3. Manajemen pengguna
4. Kelas dan mata pelajaran
5. Modul dan materi pembelajaran
6. Tugas dan submission
7. Kuis dan ujian
8. Gradebook dan feedback
9. Kalender dan agenda
10. Notifikasi
11. Pengumuman dan diskusi
12. XP, streak, badge, dan leaderboard
13. Learning analytics
14. Pengaturan platform dan audit log

## 5. Fitur lanjutan
- AI Study Assistant berbasis materi yang diizinkan
- Coding Lab dengan sandbox eksekusi yang aman
- Group Project Workspace
- Sertifikat digital

Fitur lanjutan tidak termasuk MVP kecuali kebutuhan proyek berubah.

## 6. Kebutuhan fungsional
### Authentication
- Login dan logout.
- Reset password melalui alur yang aman.
- Profil pengguna.
- Role ditetapkan secara tepercaya oleh Admin atau proses provisioning; pengguna tidak boleh menaikkan role sendiri.

### Courses dan materi
- Guru dapat mengelola materi pada kelas yang menjadi tanggung jawabnya.
- Siswa dapat membuka materi kelas yang diikutinya.
- Materi dapat berupa teks, tautan, PDF, video, atau lampiran.
- Sistem menyimpan status penyelesaian materi per siswa.

### Tugas
- Guru membuat tugas dengan instruksi, lampiran, deadline, dan aturan submission.
- Siswa mengirim jawaban teks atau file sebelum deadline sesuai kebijakan tugas.
- Guru memberi nilai, komentar, dan status revisi.
- Sistem mencatat waktu submission dan riwayat yang relevan.

### Kuis
- Guru menyusun soal dan aturan percobaan.
- Siswa memulai, menjawab, dan mengirim kuis.
- Jawaban disimpan dengan aman; autosave dapat digunakan.
- Nilai otomatis hanya untuk jenis soal yang dapat dinilai deterministik.
- Pembahasan dan hasil ditampilkan sesuai pengaturan publikasi.

### Nilai dan analitik
- Siswa hanya melihat nilai miliknya yang sudah boleh dipublikasikan.
- Guru melihat performa kelas yang diajarnya.
- Admin dapat mengakses analitik lintas platform.
- Rumus nilai akhir harus dapat dikonfigurasi atau ditetapkan sekolah; jangan mengasumsikan bobot tanpa persetujuan.

### Gamifikasi
- XP berasal dari aktivitas yang valid dan tercatat di server.
- Hindari memberi XP hanya karena membuka halaman atau mengulang aksi yang sama.
- Terapkan idempotensi untuk mencegah XP ganda dari satu event.
- Leaderboard harus mengikuti kebijakan privasi sekolah.

## 7. Kebutuhan nonfungsional
- Responsif untuk desktop, tablet, dan mobile.
- Aksesibilitas dasar: keyboard navigation, label, kontras memadai, dan fokus terlihat.
- Validasi input di server.
- Penanganan loading, empty, success, dan error state.
- Audit tindakan administratif penting.
- Pagination untuk daftar besar.
- Pengujian izin akses dan alur kritis.

## 8. Batas MVP
Termasuk: auth, role, dashboard, kelas, materi, tugas, submission, penilaian, kuis dasar, kalender, notifikasi dasar, admin panel.

Di luar MVP awal: AI, eksekusi kode online, live video, pembayaran, aplikasi native, sertifikat kompleks.
