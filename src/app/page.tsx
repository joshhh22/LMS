import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  Shield,
  ArrowRight,
  CheckCircle2,
  Users,
  BarChart2,
  Lock,
  Layers,
  Database,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F1F4F9] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-[#F8FAFD]/90 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(100,116,139,0.06)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-[0_6px_16px_-2px_rgba(99,102,241,0.35),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)]">
              <GraduationCap className="h-5 w-5 drop-shadow" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">EduFlow</span>
              <span className="ml-2.5 rounded-full bg-indigo-100/80 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-indigo-200/50">
                LMS Sekolah Modern
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-700 font-bold hover:bg-white/80 rounded-xl">
                Masuk Sesi
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="clay-btn-primary">
                Buka Platform
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-indigo-800 mb-8 bg-white/90 border border-white/90 shadow-[0_4px_12px_-2px_rgba(99,102,241,0.12),inset_0_2px_3px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(148,163,184,0.12)]">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Platform LMS Sekolah Berbasis Peran & Row-Level Security
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.15]">
            Learn Better, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Grow Further.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            EduFlow menghadirkan pengalaman belajar sekolah yang terintegrasi: modul pelajaran, penugasan digital, kuis otomatis dengan proteksi kunci jawaban, buku nilai transparan, dan motivasi gamifikasi yang server-validated.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
              <button className="clay-btn-primary h-12 px-8 text-base font-bold flex items-center gap-2">
                <span>Mulai Pembelajaran</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/login">
              <button className="clay-btn-secondary h-12 px-8 text-base font-bold text-slate-800">
                Pilih Akun Demo (Admin / Guru / Siswa)
              </button>
            </Link>
          </div>

          {/* Anti-Slop Technical Integrity Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3.5 py-2 border border-white/90 shadow-[0_4px_10px_rgba(100,116,139,0.06),inset_0_1px_2px_rgba(255,255,255,1)]">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Autentikasi & RLS Ketat</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3.5 py-2 border border-white/90 shadow-[0_4px_10px_rgba(100,116,139,0.06),inset_0_1px_2px_rgba(255,255,255,1)]">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Akses Penuh Administrator</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3.5 py-2 border border-white/90 shadow-[0_4px_10px_rgba(100,116,139,0.06),inset_0_1px_2px_rgba(255,255,255,1)]">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Evaluasi & Kuis Otomatis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tactile System Architecture Card */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white/95 border border-white/95 p-6 sm:p-8 shadow-[0_16px_36px_-6px_rgba(100,116,139,0.12),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(148,163,184,0.1)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600">
                Spesifikasi Arsitektur Sistem
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                EduFlow Production Core
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Aplikasi full-stack nyata dengan proteksi data sekolah, verifikasi otorisasi, dan validasi sisi server.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-1.5 border border-emerald-200 text-xs font-bold text-emerald-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Database Active & Seeded
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="rounded-2xl bg-[#F8FAFD] p-4 border border-slate-200/70 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-bold">Otorisasi RLS</span>
              </div>
              <p className="text-xs text-slate-600">Admin memiliki akses penuh; Guru terbatas pada kelas binaan; Siswa pada kelas terdaftar.</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFD] p-4 border border-slate-200/70 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Lock className="h-4 w-4" />
                <span className="text-xs font-bold">Shielding Kunci Soal</span>
              </div>
              <p className="text-xs text-slate-600">Kunci jawaban kuis tidak pernah dikirim ke browser siswa sebelum evaluasi selesai.</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFD] p-4 border border-slate-200/70 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Award className="h-4 w-4" />
                <span className="text-xs font-bold">XP & Gamifikasi</span>
              </div>
              <p className="text-xs text-slate-600">Perhitungan XP dan klaim lencana diverifikasi di backend secara idempotent dan anti-tamper.</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFD] p-4 border border-slate-200/70 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Database className="h-4 w-4" />
                <span className="text-xs font-bold">Audit & Integritas</span>
              </div>
              <p className="text-xs text-slate-600">Audit log mencatat setiap perubahan akun, perizinan, dan aktivitas nilai administratif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Overview: 3 Chunky 3D Clay Cards */}
      <section className="py-16 md:py-24 bg-white/60 border-t border-slate-200/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-2 block">
              Desain Berbasis Peran (RBAC)
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Pengalaman Terbaik untuk Setiap Pengguna
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Hak akses terlindungi secara komprehensif pada lapisan database Row-Level Security (RLS) dan validasi server-side.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="clay-card rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-6 shadow-[0_8px_20px_-4px_rgba(59,130,246,0.35),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)]">
                  <GraduationCap className="h-7 w-7 drop-shadow" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Siswa (Student)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Akses terpusat ke materi terdaftar, pengumpulan tugas teks/berkas, pengerjaan kuis real-time, perolehan XP transparan, dan leaderboard kelas.
                </p>
                <ul className="space-y-3 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Modul & materi PDF/video</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Submit tugas & riwayat nilai</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Leveling XP & lencana prestasi</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-100">
                <Link href="/login" className="block">
                  <Button size="sm" variant="outline" className="w-full clay-btn-secondary text-xs font-bold">
                    Buka Dashboard Siswa &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* Teacher Card */}
            <div className="clay-card rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white mb-6 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.35),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)]">
                  <Users className="h-7 w-7 drop-shadow" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Guru (Teacher)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Pengelolaan kelas binaan, publikasi materi belajar, pembuatan tugas ber-deadline, penilai kuis otomatis, dan buku nilai terstruktur.
                </p>
                <ul className="space-y-3 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Manajemen kelas & materi binaan</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Evaluasi & feedback submission</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Pembuat kuis & bank soal</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-100">
                <Link href="/login" className="block">
                  <Button size="sm" variant="outline" className="w-full clay-btn-secondary text-xs font-bold">
                    Buka Dashboard Guru &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* Admin Card */}
            <div className="clay-card rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-800 text-white mb-6 shadow-[0_8px_20px_-4px_rgba(99,102,241,0.35),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)]">
                  <Shield className="h-7 w-7 drop-shadow" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Administrator</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Akses penuh dan menyeluruh ke seluruh modul sistem: manajemen pengguna, kelas, mata pelajaran, enrollment, audit log, dan analitik sekolah.
                </p>
                <ul className="space-y-3 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Akses penuh lintas seluruh modul</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Kontrol akun pengguna & role</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Audit log & keamanan platform</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-100">
                <Link href="/login" className="block">
                  <Button size="sm" variant="outline" className="w-full clay-btn-secondary text-xs font-bold">
                    Buka Dashboard Admin &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 py-10 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <GraduationCap className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-slate-800">EduFlow</span> — Learn Better, Grow Further.
          </div>
          <p>© 2026 EduFlow LMS. Dibuat sesuai standar arsitektur sekolah modern.</p>
        </div>
      </footer>
    </div>
  );
}
