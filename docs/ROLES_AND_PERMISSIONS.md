# Roles and Permissions

## Prinsip
Admin adalah superuser aplikasi dan dapat mengakses seluruh modul. Akses Admin tetap harus melalui autentikasi, tercatat pada audit log untuk tindakan sensitif, dan tidak boleh bergantung pada UI saja.

## Matriks izin

| Modul/Aksi | Admin | Teacher | Student |
|---|---|---|---|
| Dashboard | Semua statistik | Statistik kelas sendiri | Data pribadi |
| Manajemen pengguna | CRUD semua pengguna dan role | Melihat siswa di kelas terkait | Mengelola profil terbatas |
| Kelas | CRUD semua kelas | Mengelola kelas yang ditugaskan | Melihat kelas yang diikuti |
| Mata pelajaran | CRUD | Mengakses yang relevan | Melihat yang diikuti |
| Materi | CRUD semua materi | CRUD materi kelas sendiri | Membaca materi kelas sendiri |
| Tugas | CRUD semua tugas | CRUD tugas kelas sendiri | Melihat dan submit tugas sendiri |
| Submission | Melihat/mengelola semua | Melihat dan menilai kelas sendiri | Membaca submission sendiri |
| Kuis | CRUD dan akses administratif | CRUD kuis kelas sendiri | Mengerjakan kuis yang tersedia |
| Nilai | Akses penuh | Mengelola nilai kelas sendiri | Melihat nilai sendiri yang dipublikasikan |
| Kalender | Semua kalender | Kalender kelas sendiri | Kalender pribadi/kelas |
| Pengumuman | Semua | Membuat untuk kelas sendiri | Membaca pengumuman yang dituju |
| Diskusi | Moderasi semua | Moderasi kelas sendiri | Posting di kelas yang diikuti |
| Gamifikasi | Mengatur dan mengaudit | Melihat performa kelas | XP, badge, dan leaderboard |
| Analitik | Lintas platform | Kelas sendiri | Perkembangan sendiri |
| Pengaturan platform | Semua | Tidak | Tidak |
| Audit log | Semua log sesuai kebijakan | Log yang relevan jika diizinkan | Tidak |
| AI/Coding Lab | Konfigurasi dan moderasi | Menggunakan/mengelola tugas terkait | Menggunakan sesuai izin |

## Aturan otorisasi
1. Setiap request terlindungi harus memeriksa sesi dan izin di server.
2. Kebijakan RLS harus membatasi akses data di database.
3. Teacher hanya dapat memodifikasi kelas yang memang ditugaskan kepadanya.
4. Student hanya dapat membaca atau mengubah data pribadi yang diizinkan.
5. Admin dapat mengakses seluruh data operasional sesuai kebutuhan platform.
6. Perubahan role hanya dapat dilakukan Admin atau proses tepercaya.
7. Jangan percaya `role`, `user_id`, atau `student_id` dari client tanpa verifikasi.
8. Gunakan audit log untuk perubahan role, penghapusan, perubahan nilai, dan perubahan pengaturan keamanan.
9. Admin penuh bukan alasan untuk mengekspos secret key di browser.
