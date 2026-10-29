import {
  Profile,
  Subject,
  Class,
  ClassSubject,
  Enrollment,
  Course,
  Lesson,
  Material,
  Assignment,
  AssignmentSubmission,
  Quiz,
  QuizQuestion,
  QuizAttempt,
  QuizResponse,
  Announcement,
  Discussion,
  DiscussionReply,
  Notification,
  XPEvent,
  Badge,
  StudentBadge,
  AuditLog,
} from '@/types/database';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    full_name: 'Dr. Aris Wibowo (Administrator)',
    role: 'admin',
    status: 'active',
    bio: 'Kepala Administrator EduFlow LMS SMA Nusantara.',
    phone: '+62 811-2345-6789',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    full_name: 'Budi Santoso, M.Pd.',
    role: 'teacher',
    status: 'active',
    bio: 'Guru Pengampu Matematika dan Fisika. Pengalaman mengajar 10 tahun.',
    phone: '+62 812-3456-7890',
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    full_name: 'Siti Aminah, S.Pd.',
    role: 'teacher',
    status: 'active',
    bio: 'Guru Bahasa Inggris dan Koordinator Program Literasi Sekolah.',
    phone: '+62 813-4567-8901',
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    full_name: 'Andi Pratama',
    role: 'student',
    status: 'active',
    bio: 'Siswa Kelas 10-A. Peminatan Sains & Teknologi.',
    phone: '+62 814-5678-9012',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    full_name: 'Clara Wijaya',
    role: 'student',
    status: 'active',
    bio: 'Siswi Kelas 10-A. Minat pada Matematika dan Astronomi.',
    phone: '+62 815-6789-0123',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    full_name: 'Reza Firmansyah',
    role: 'student',
    status: 'active',
    bio: 'Siswa Kelas 10-B. Anggota Klub Robotika Sekolah.',
    phone: '+62 816-7890-1234',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: '11111111-1111-1111-1111-111111111101',
    name: 'Matematika Peminatan',
    code: 'MATH-101',
    description: 'Pembelajaran konsep aljabar, kalkulus, trigonometri, dan logika matematika.',
    icon: 'Calculator',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '11111111-1111-1111-1111-111111111102',
    name: 'Fisika Dasar',
    code: 'PHYS-101',
    description: 'Studi gerak mekanika, hukum Newton, energi, termodinamika, dan gelombang.',
    icon: 'Atom',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '11111111-1111-1111-1111-111111111103',
    name: 'Bahasa Inggris Akademik',
    code: 'ENG-101',
    description: 'Reading comprehension, academic essays, and spoken communication.',
    icon: 'BookOpen',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '11111111-1111-1111-1111-111111111104',
    name: 'Informatika & Pemrograman',
    code: 'INFO-101',
    description: 'Algoritma, struktur data dasar, dan dasar rekayasa perangkat lunak.',
    icon: 'Code2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_CLASSES: Class[] = [
  {
    id: '22222222-2222-2222-2222-222222222201',
    name: 'Kelas 10-A Sains',
    academic_year: '2026/2027',
    grade_level: 'Kelas 10',
    description: 'Kelas unggulan peminatan Matematika dan Ilmu Pengetahuan Alam.',
    created_by: '00000000-0000-0000-0000-000000000001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222202',
    name: 'Kelas 10-B Teknologi',
    academic_year: '2026/2027',
    grade_level: 'Kelas 10',
    description: 'Kelas peminatan Sains Terapan dan Teknologi Komputer.',
    created_by: '00000000-0000-0000-0000-000000000001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_CLASS_SUBJECTS: ClassSubject[] = [
  {
    id: '33333333-3333-3333-3333-333333333301',
    class_id: '22222222-2222-2222-2222-222222222201',
    subject_id: '11111111-1111-1111-1111-111111111101',
    teacher_id: '00000000-0000-0000-0000-000000000002',
    schedule_day: 'Senin',
    schedule_time_start: '08:00',
    schedule_time_end: '09:30',
    room: 'Lab MIPA 201',
    created_at: new Date().toISOString(),
  },
  {
    id: '33333333-3333-3333-3333-333333333302',
    class_id: '22222222-2222-2222-2222-222222222201',
    subject_id: '11111111-1111-1111-1111-111111111102',
    teacher_id: '00000000-0000-0000-0000-000000000002',
    schedule_day: 'Rabu',
    schedule_time_start: '10:00',
    schedule_time_end: '11:30',
    room: 'Ruang Fisika 104',
    created_at: new Date().toISOString(),
  },
  {
    id: '33333333-3333-3333-3333-333333333303',
    class_id: '22222222-2222-2222-2222-222222222201',
    subject_id: '11111111-1111-1111-1111-111111111103',
    teacher_id: '00000000-0000-0000-0000-000000000003',
    schedule_day: 'Kamis',
    schedule_time_start: '08:00',
    schedule_time_end: '09:30',
    room: 'Ruang Bahasa',
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: '44444444-4444-4444-4444-444444444401',
    class_id: '22222222-2222-2222-2222-222222222201',
    student_id: '00000000-0000-0000-0000-000000000004',
    status: 'active',
    joined_at: new Date().toISOString(),
  },
  {
    id: '44444444-4444-4444-4444-444444444402',
    class_id: '22222222-2222-2222-2222-222222222201',
    student_id: '00000000-0000-0000-0000-000000000005',
    status: 'active',
    joined_at: new Date().toISOString(),
  },
  {
    id: '44444444-4444-4444-4444-444444444403',
    class_id: '22222222-2222-2222-2222-222222222202',
    student_id: '00000000-0000-0000-0000-000000000006',
    status: 'active',
    joined_at: new Date().toISOString(),
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: '55555555-5555-5555-5555-555555555501',
    class_subject_id: '33333333-3333-3333-3333-333333333301',
    title: 'Modul 1: Fungsi, Grafik, dan Polinomial',
    description: 'Membahas pemahaman sifat-sifat fungsi aljabar, persamaan kuadrat, dan grafik koordinat Kartesius.',
    status: 'published',
    position: 1,
    created_by: '00000000-0000-0000-0000-000000000002',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '55555555-5555-5555-5555-555555555502',
    class_subject_id: '33333333-3333-3333-3333-333333333302',
    title: 'Modul 1: Kinematika & Hukum Gerak Newton',
    description: 'Eksplorasi gerak lurus beraturan (GLB), gerak lurus berubah beraturan (GLBB), dan gaya inersia.',
    status: 'published',
    position: 1,
    created_by: '00000000-0000-0000-0000-000000000002',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: '66666666-6666-6666-6666-666666666601',
    course_id: '55555555-5555-5555-5555-555555555501',
    title: 'Bab 1.1 — Konsep Dasar Domain, Kodomain, & Range',
    content: 'Pada pertemuan pertama ini kita mempelajari pengertian fungsi f: A -> B, bagaimana menentukan domain alami dari bentuk pecahan dan bentuk akar, serta representasi pemetaan grafiknya.',
    position: 1,
    estimated_minutes: 45,
    status: 'published',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '66666666-6666-6666-6666-666666666602',
    course_id: '55555555-5555-5555-5555-555555555501',
    title: 'Bab 1.2 — Operasi Aljabar Fungsi & Komposisi',
    content: 'Membahas penggabungan dua fungsi melalui penjumlahan, perkalian, serta komposisi berantai (f o g)(x).',
    position: 2,
    estimated_minutes: 50,
    status: 'published',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_MATERIALS: Material[] = [
  {
    id: '77777777-7777-7777-7777-777777777701',
    lesson_id: '66666666-6666-6666-6666-666666666601',
    title: 'Buku Pegangan Siswa: Domain & Fungsi Aljabar (PDF)',
    material_type: 'pdf',
    external_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_size_bytes: 2450000,
    metadata: { author: 'Tim Kurikulum Matematika' },
    position: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '77777777-7777-7777-7777-777777777702',
    lesson_id: '66666666-6666-6666-6666-666666666601',
    title: 'Video Simulasi Visual: Domain & Range pada Bidang Koordinat',
    material_type: 'video',
    external_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    file_size_bytes: 52400000,
    metadata: { duration: '08:45' },
    position: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: '88888888-8888-8888-8888-888888888801',
    class_subject_id: '33333333-3333-3333-3333-333333333301',
    title: 'Tugas 1: Analisis Domain & Komposisi Fungsi',
    instructions: 'Selesaikan 5 soal studi kasus terlampir. Tulis langkah penyelesaian secara terstruktur dan jelaskan setiap asumsi domain yang digunakan.',
    due_at: new Date(Date.now() + 4 * 86400000).toISOString(),
    max_score: 100,
    allow_late_submission: true,
    submission_types: ['text', 'file'],
    attachment_urls: ['/sample-tugas1.pdf'],
    status: 'published',
    published_at: new Date().toISOString(),
    created_by: '00000000-0000-0000-0000-000000000002',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '88888888-8888-8888-8888-888888888802',
    class_subject_id: '33333333-3333-3333-3333-333333333302',
    title: 'Laporan Eksperimen: Analisis Gerak Lurus Beraturan',
    instructions: 'Susun laporan praktikum gerak kereta dinamik dengan menghitung percepatan rata-rata dan koefisien gesek.',
    due_at: new Date(Date.now() + 7 * 86400000).toISOString(),
    max_score: 100,
    allow_late_submission: false,
    submission_types: ['file'],
    attachment_urls: [],
    status: 'published',
    published_at: new Date().toISOString(),
    created_by: '00000000-0000-0000-0000-000000000002',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: '99999999-9999-9999-9999-999999999901',
    assignment_id: '88888888-8888-8888-8888-888888888801',
    student_id: '00000000-0000-0000-0000-000000000004',
    text_answer: 'Berikut adalah rangkuman penyelesaian:\n1. Domain f(x) = sqrt(x^2 - 4) adalah x <= -2 atau x >= 2.\n2. Invers g(x) = (2x+3)/(x-1) adalah g^(-1)(x) = (x+3)/(x-2) dengan x != 2.',
    status: 'graded',
    score: 94,
    feedback: 'Penalaran matematis sangat teliti dan penulisan domain sangat tepat. Pertahankan!',
    graded_by: '00000000-0000-0000-0000-000000000002',
    graded_at: new Date(Date.now() - 86400000).toISOString(),
    submitted_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '99999999-9999-9999-9999-999999999902',
    assignment_id: '88888888-8888-8888-8888-888888888801',
    student_id: '00000000-0000-0000-0000-000000000005',
    text_answer: 'Semua 5 soal telah diselesaikan dalam format teks dan diagram pendukung.',
    status: 'submitted',
    score: null,
    feedback: null,
    submitted_at: new Date(Date.now() - 5 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    class_subject_id: '33333333-3333-3333-3333-333333333301',
    title: 'Kuis Singkat: Aljabar & Pemahaman Fungsi Kuadrat',
    instructions: 'Jawab 2 pertanyaan objektif dengan cermat dalam waktu 20 menit.',
    duration_minutes: 20,
    opens_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    closes_at: new Date(Date.now() + 5 * 86400000).toISOString(),
    max_attempts: 2,
    show_results_at: 'immediately',
    is_published_results: true,
    status: 'published',
    published_at: new Date().toISOString(),
    created_by: '00000000-0000-0000-0000-000000000002',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01',
    quiz_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    question_type: 'multiple_choice',
    prompt: 'Berapakah nilai f(3) jika f(x) = 2x^2 - 5x + 1?',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '10' },
      { id: 'C', text: '16' },
      { id: 'D', text: '2' },
    ],
    points: 50,
    position: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02',
    quiz_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    question_type: 'multiple_choice',
    prompt: 'Jika f(x) = 3x - 2 dan g(x) = x + 4, berapakah nilai (f o g)(2)?',
    options: [
      { id: 'A', text: '14' },
      { id: 'B', text: '16' },
      { id: 'C', text: '18' },
      { id: 'D', text: '12' },
    ],
    points: 50,
    position: 2,
    created_at: new Date().toISOString(),
  },
];

export const SECURE_ANSWER_KEYS: Record<string, { correct_option_id: string; explanation: string }> = {
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01': {
    correct_option_id: 'A',
    explanation: 'f(3) = 2(3)^2 - 5(3) + 1 = 18 - 15 + 1 = 4.',
  },
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb02': {
    correct_option_id: 'B',
    explanation: 'g(2) = 2 + 4 = 6. Maka f(6) = 3(6) - 2 = 18 - 2 = 16.',
  },
};

export const INITIAL_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'cccccccc-1111-aaaa-aaaa-aaaaaaaaaaaa',
    quiz_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    student_id: '00000000-0000-0000-0000-000000000004',
    attempt_number: 1,
    started_at: new Date(Date.now() - 3600000).toISOString(),
    submitted_at: new Date(Date.now() - 3000000).toISOString(),
    score: 100,
    max_score: 100,
    status: 'completed',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
    class_id: null,
    title: 'Selamat Datang di Semester Baru EduFlow 2026/2027!',
    body: 'Platform EduFlow resmi diluncurkan untuk mempermudah akses modul materi, tugas interaktif, jadwal, dan kuis sekolah secara terpadu.',
    is_pinned: true,
    created_by: '00000000-0000-0000-0000-000000000001',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
    class_id: '22222222-2222-2222-2222-222222222201',
    title: 'Pengingat Deadline Tugas 1 Matematika',
    body: 'Batas pengumpulan Tugas 1 Matematika Peminatan adalah hari Jumat pukul 23:59 WIB. Mohon cek kembali kejelasan langkah pengerjaan.',
    is_pinned: false,
    created_by: '00000000-0000-0000-0000-000000000002',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_DISCUSSIONS: Discussion[] = [
  {
    id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    class_id: '22222222-2222-2222-2222-222222222201',
    author_id: '00000000-0000-0000-0000-000000000004',
    title: 'Tips Menentukan Syarat Domain Fungsi Pecahan Berakar',
    body: 'Bagaimana cara sistematis memeriksa himpunan penyelesaian jika penyebut pecahan mengandung bentuk akar sekaligus kuadrat?',
    status: 'visible',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const INITIAL_DISCUSSION_REPLIES: DiscussionReply[] = [
  {
    id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    discussion_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    author_id: '00000000-0000-0000-0000-000000000002',
    body: 'Tips utama: ingat bahwa ekspresi di dalam akar harus >= 0, namun jika berada di penyebut, syaratnya ketat > 0 (tidak boleh bernilai nol).',
    status: 'visible',
    created_at: new Date(Date.now() - 43200000).toISOString(),
    updated_at: new Date(Date.now() - 43200000).toISOString(),
  },
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: '10101010-1010-1010-1010-101010101001',
    code: 'FIRST_SUBMISSION',
    name: 'Langkah Pertama',
    description: 'Berhasil mengumpulkan tugas pembelajaran pertama di EduFlow.',
    icon_key: 'Award',
    criteria: { action: 'submit_assignment' },
    xp_bonus: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: '10101010-1010-1010-1010-101010101002',
    code: 'PERFECT_SCORE',
    name: 'Kecemerlangan Akademik',
    description: 'Meraih skor sempurna 100 pada kuis atau evaluasi mandiri.',
    icon_key: 'Star',
    criteria: { action: 'quiz_100' },
    xp_bonus: 250,
    created_at: new Date().toISOString(),
  },
  {
    id: '10101010-1010-1010-1010-101010101003',
    code: 'STREAK_7',
    name: 'Konsistensi 7 Hari',
    description: 'Aktif belajar dan membuka materi selama 7 hari berturut-turut.',
    icon_key: 'Flame',
    criteria: { streak_days: 7 },
    xp_bonus: 300,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_STUDENT_BADGES: StudentBadge[] = [
  {
    student_id: '00000000-0000-0000-0000-000000000004',
    badge_id: '10101010-1010-1010-1010-101010101001',
    awarded_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    student_id: '00000000-0000-0000-0000-000000000004',
    badge_id: '10101010-1010-1010-1010-101010101002',
    awarded_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const INITIAL_XP_EVENTS: XPEvent[] = [
  {
    id: '20202020-2020-2020-2020-202020202001',
    student_id: '00000000-0000-0000-0000-000000000004',
    event_type: 'assignment_submitted',
    source_id: '88888888-8888-8888-8888-888888888801',
    xp_delta: 150,
    idempotency_key: 'xp_asg_88888888-8888-8888-8888-888888888801_00000000-0000-0000-0000-000000000004',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: '20202020-2020-2020-2020-202020202002',
    student_id: '00000000-0000-0000-0000-000000000004',
    event_type: 'quiz_completed',
    source_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    xp_delta: 200,
    idempotency_key: 'xp_quiz_aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa_00000000-0000-0000-0000-000000000004',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '20202020-2020-2020-2020-202020202003',
    student_id: '00000000-0000-0000-0000-000000000005',
    event_type: 'assignment_submitted',
    source_id: '88888888-8888-8888-8888-888888888801',
    xp_delta: 150,
    idempotency_key: 'xp_asg_88888888-8888-8888-8888-888888888801_00000000-0000-0000-0000-000000000005',
    created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '30303030-3030-3030-3030-303030303001',
    recipient_id: '00000000-0000-0000-0000-000000000004',
    type: 'grade_published',
    title: 'Tugas 1 Telah Dinilai',
    body: 'Guru Budi Santoso memberikan nilai 94/100 pada Tugas 1 Matematika.',
    target_url: '/app/student/assignments/88888888-8888-8888-8888-888888888801',
    read_at: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '30303030-3030-3030-3030-303030303002',
    recipient_id: '00000000-0000-0000-0000-000000000004',
    type: 'announcement',
    title: 'Pengumuman Baru Sekolah',
    body: 'Selamat Datang di Semester Baru EduFlow 2026/2027!',
    target_url: '/app/student/community',
    read_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: '40404040-4040-4040-4040-404040404001',
    actor_id: '00000000-0000-0000-0000-000000000001',
    action: 'CREATE_CLASS',
    entity_type: 'class',
    metadata: { class_name: 'Kelas 10-A Sains', academic_year: '2026/2027' },
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: '40404040-4040-4040-4040-404040404002',
    actor_id: '00000000-0000-0000-0000-000000000001',
    action: 'ASSIGN_TEACHER',
    entity_type: 'class_teacher',
    metadata: { teacher_name: 'Budi Santoso, M.Pd.', class_name: 'Kelas 10-A Sains' },
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: '40404040-4040-4040-4040-404040404003',
    actor_id: '00000000-0000-0000-0000-000000000002',
    action: 'GRADE_ASSIGNMENT',
    entity_type: 'assignment_submission',
    metadata: { student_name: 'Andi Pratama', score: 94 },
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];
