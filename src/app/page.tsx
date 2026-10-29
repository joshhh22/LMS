import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Shield,
  ArrowRight,
  CheckCircle2,
  Users,
  Lock,
  Database,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">EduFlow</span>
              <span className="ml-2.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-100">
                LMS Sekolah
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-600 font-medium">
                Masuk Sesi
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">
                Buka Platform
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold text-indigo-700 mb-6 bg-indigo-50 border border-indigo-100">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Platform LMS Sekolah Berbasis Peran & Row-Level Security
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.15]">
            Learn Better, <span className="text-indigo-600">Grow Further.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            EduFlow menghadirkan pengalaman belajar sekolah yang terintegrasi: modul pelajaran, penugasan digital, kuis otomatis dengan proteksi kunci jawaban, buku nilai transparan, dan motivasi gamifikasi yang server-validated.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link href="/login">
              <Button size="lg" className="h-11 px-7 text-sm font-semibold">
                Mulai Pembelajaran
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-11 px-7 text-sm font-semibold">
                Pilih Akun Demo (Admin / Guru / Siswa)
              </Button>
            </Link>
          </div>

          {/* Trust markers */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Autentikasi & RLS Ketat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Akses Penuh Administrator</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Evaluasi & Kuis Otomatis</span>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                Spesifikasi Arsitektur Sistem
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                EduFlow Production Core
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Aplikasi full-stack nyata dengan proteksi data sekolah, verifikasi otorisasi, dan validasi sisi server.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 border border-emerald-200 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Database Active & Seeded
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-1.5 text-indigo-600 mb-1.5">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-semibold">Otorisasi RLS</span>
              </div>
              <p className="text-xs text-slate-600">Admin memiliki akses penuh; Guru terbatas pada kelas binaan; Siswa pada kelas terdaftar.</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-1.5 text-indigo-600 mb-1.5">
                <Lock className="h-4 w-4" />
                <span className="text-xs font-semibold">Shielding Kunci Soal</span>
              </div>
              <p className="text-xs text-slate-600">Kunci jawaban kuis tidak pernah dikirim ke browser siswa sebelum evaluasi selesai.</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-1.5 text-indigo-600 mb-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-semibold">XP & Gamifikasi</span>
              </div>
              <p className="text-xs text-slate-600">Perhitungan XP dan klaim lencana diverifikasi di backend secara idempotent dan anti-tamper.</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-1.5 text-indigo-600 mb-1.5">
                <Database className="h-4 w-4" />
                <span className="text-xs font-semibold">Audit & Integritas</span>
              </div>
              <p className="text-xs text-slate-600">Audit log mencatat setiap perubahan akun, perizinan, dan aktivitas nilai administratif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Overview */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
              Desain Berbasis Peran (RBAC)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Pengalaman Terbaik untuk Setiap Pengguna
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Hak akses terlindungi secara komprehensif pada lapisan database Row-Level Security (RLS) dan validasi server-side.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Student Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-5">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Siswa (Student)</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Akses terpusat ke materi terdaftar, pengumpulan tugas teks/berkas, pengerjaan kuis real-time, perolehan XP transparan, dan leaderboard kelas.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-indigo-600" /> Modul & materi PDF/video
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-indigo-600" /> Submit tugas & riwayat nilai
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-indigo-600" /> Leveling XP & lencana prestasi
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link href="/login" className="block">
                  <Button size="sm" variant="outline" className="w-full text-xs font-semibold">
                    Buka Dashboard Siswa &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* Teacher Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 mb-5">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Guru (Teacher)</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Pengelolaan kelas binaan, publikasi materi belajar, pembuatan tugas ber-deadline, penilai kuis otomatis, dan buku nilai terstruktur.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> Manajemen kelas & materi binaan
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> Evaluasi & feedback submission
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> Pembuat kuis & bank soal
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link href="/login" className="block">
                  <Button size="sm" variant="outline" className="w-full text-xs font-semibold">
                    Buka Dashboard Guru &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* Admin Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-5">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Administrator</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Akses penuh dan menyeluruh ke seluruh modul sistem: manajemen pengguna, kelas, mata pelajaran, enrollment, audit log, dan analitik sekolah.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-indigo-600" /> Akses penuh lintas seluruh modul
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-indigo-600" /> Kontrol akun pengguna & role
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-indigo-600" /> Audit log & keamanan platform
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link href="/login" className="block">
                  <Button size="sm" variant="outline" className="w-full text-xs font-semibold">
                    Buka Dashboard Admin &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white shadow-xs">
              <GraduationCap className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-slate-800">EduFlow</span> — Learn Better, Grow Further.
          </div>
          <p>© 2026 EduFlow LMS. Dibuat sesuai standar arsitektur sekolah modern.</p>
        </div>
      </footer>
    </div>
  );
}
