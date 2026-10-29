# User Flows

## 1. Login
1. Pengguna membuka `/login`.
2. Mengisi email dan password.
3. Server memvalidasi sesi melalui Supabase Auth.
4. Aplikasi mengambil profil dan role dari sumber tepercaya.
5. Pengguna diarahkan ke dashboard sesuai role.
6. Jika profil belum lengkap atau tidak aktif, tampilkan alur penanganan yang jelas.

## 2. Guru membuat tugas
1. Guru membuka kelas yang ditugaskan.
2. Memilih Buat Tugas.
3. Mengisi judul, instruksi, deadline, lampiran, jenis submission, dan aturan terlambat.
4. Server memvalidasi kepemilikan kelas dan input.
5. Tugas disimpan sebagai draft atau published.
6. Jika dipublikasikan, siswa kelas terkait mendapat notifikasi.

## 3. Siswa mengumpulkan tugas
1. Siswa membuka daftar tugas.
2. Membaca instruksi dan deadline.
3. Mengunggah file atau menulis jawaban.
4. Server memvalidasi enrollment, ukuran/jenis file, dan deadline.
5. Submission disimpan dengan timestamp server.
6. Siswa melihat status berhasil dan submission tersimpan.
7. Jika revisi diperbolehkan, siswa dapat mengirim ulang sesuai kebijakan.

## 4. Guru menilai submission
1. Guru membuka daftar submission untuk kelasnya.
2. Memilih submission.
3. Mengisi skor sesuai rentang nilai dan komentar.
4. Server memeriksa izin guru dan batas skor.
5. Nilai disimpan sebagai draft atau dipublikasikan.
6. Jika dipublikasikan, siswa mendapat notifikasi.

## 5. Siswa mengerjakan kuis
1. Siswa membuka kuis yang tersedia.
2. Server memeriksa enrollment, waktu buka/tutup, percobaan, dan status kuis.
3. Attempt dibuat di server.
4. Jawaban disimpan secara aman; autosave dapat digunakan.
5. Server menerima submit final dan menghitung nilai untuk soal objektif.
6. Hasil ditampilkan hanya jika kebijakan kuis mengizinkan.

## 6. Admin mengelola pengguna
1. Admin membuka Admin Panel.
2. Mencari atau membuat pengguna.
3. Memilih role dan status yang sesuai.
4. Server memeriksa Admin permission.
5. Perubahan disimpan dan tindakan sensitif dicatat di audit log.
6. Pengguna diberi informasi melalui kanal yang aman jika diperlukan.

## 7. XP dan achievement
1. Aktivitas yang valid terjadi, misalnya kuis selesai.
2. Server memvalidasi aktivitas dan identitas pengguna.
3. Event XP dicatat dengan kunci idempotensi.
4. Total XP dan achievement diperbarui secara konsisten.
5. Dashboard menampilkan hasil baru.
