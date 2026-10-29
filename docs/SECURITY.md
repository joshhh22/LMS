# Security and Privacy

## Prinsip keamanan
1. Terapkan least privilege untuk Teacher dan Student; Admin memiliki izin penuh aplikasi.
2. Semua operasi sensitif divalidasi di server.
3. RLS aktif pada semua tabel yang berisi data pengguna atau akademik.
4. Jangan pernah mengekspos service-role key ke browser.
5. Jangan mempercayai role atau ID yang dikirim client.
6. Gunakan audit log untuk operasi administratif dan akademik yang penting.

## RLS policy requirements
- `profiles`: pengguna membaca profil sendiri; Admin dapat mengelola semua; akses Teacher ke profil siswa dibatasi pada kebutuhan kelas.
- `classes`: Student hanya melihat kelas yang diikuti; Teacher mengelola kelas yang ditugaskan; Admin semua.
- `materials`: Student hanya melihat materi yang dipublikasikan untuk kelasnya.
- `assignment_submissions`: Student hanya membaca/mengelola submission sendiri; Teacher hanya menilai submission kelas yang ditugaskan; Admin semua.
- `grades`: Student hanya melihat nilai sendiri yang dipublikasikan; Teacher mengelola nilai kelasnya; Admin semua.
- `quiz_questions`: answer key tidak boleh tersedia bagi Student sebelum pengungkapan yang diizinkan.
- `notifications`: penerima membaca dan menandai notifikasi miliknya; Admin dapat mengelola sesuai kebijakan.
- `audit_logs`: akses terbatas untuk Admin atau peran audit khusus jika kelak ditambahkan.

## Upload file
- Validasi MIME type, ekstensi, ukuran, dan pemilik file.
- Gunakan bucket privat untuk submission dan materi terbatas.
- Terapkan kebijakan Storage sesuai kelas dan role.
- Gunakan signed URL berumur pendek untuk file privat jika diperlukan.
- Jangan mengandalkan nama file sebagai kontrol akses.
- Pertimbangkan pemindaian file jika tersedia pada lingkungan deployment.

## Ujian dan penilaian
- Timer dan deadline harus diperiksa server-side.
- Simpan timestamp server.
- Jangan kirim answer key ke client.
- Batasi percobaan dengan transaksi atau constraint yang tepat.
- Cegah perubahan jawaban setelah submit final kecuali kebijakan mengizinkan.
- Validasi skor dan identitas penilai.

## Gamifikasi
- XP hanya diberikan dari event yang diverifikasi server.
- Gunakan idempotency key untuk menghindari penggandaan.
- Jangan menerima nilai XP arbitrary dari client.
- Catat event yang relevan untuk audit.

## Admin
- Admin dapat mengelola semua modul, tetapi tindakan penting seperti mengubah role, menghapus data, dan mengubah nilai perlu dicatat.
- Pertimbangkan konfirmasi untuk aksi destruktif.
- Jangan menyediakan mekanisme untuk melihat password pengguna.
- Batasi akses ke environment secrets dan panel provider.

## Privacy
- Minimalkan data pribadi yang dikumpulkan.
- Tampilkan nilai hanya kepada pihak berwenang.
- Tentukan retensi data dan prosedur penghapusan sesuai kebijakan sekolah.
- Jangan menggunakan data siswa untuk analitik publik tanpa dasar dan izin yang sesuai.

## Checklist sebelum rilis
- [ ] RLS aktif dan diuji.
- [ ] Uji siswa A tidak dapat membaca data siswa B.
- [ ] Uji guru A tidak dapat mengubah kelas guru B.
- [ ] Uji pengguna biasa tidak dapat mempromosikan dirinya menjadi Admin.
- [ ] Tidak ada secret di bundle client atau repository.
- [ ] File privat tidak dapat diakses hanya dengan menebak URL.
- [ ] Rate limit diterapkan pada endpoint sensitif jika sesuai.
- [ ] Backup dan prosedur pemulihan dipertimbangkan.
