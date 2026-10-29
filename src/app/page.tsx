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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">EduFlow</span>
              <span className="ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">LMS Sekolah</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-600 font-medium">
                Masuk Sesi
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm">
                Buka Platform
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-gradient-to-b from-indigo-50/50 via-white to-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1 text-xs font-semibold text-indigo-800 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Platform Pembelajaran Modern Terpadu
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-tight">
            Learn Better, <span className="text-indigo-600">Grow Further.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            EduFlow menghadirkan pengalaman belajar sekolah yang terintegrasi: modul pelajaran, penugasan digital, kuis otomatis, buku nilai transparan, dan motivasi gamifikasi yang server-verified.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-200">
                Mulai Pembelajaran
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 border-slate-300 font-medium text-slate-700">
                Pilih Akun Demo
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Autentikasi & RLS Ketat
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Akses Penuh Administrator
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Evaluasi & Kuis Otomatis
            </span>
          </div>
        </div>
      </section>

      {/* Role Overview */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Desain Berbasis Peran</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">
              Pengalaman Terbaik untuk Setiap Pengguna
            </h3>
            <p className="mt-3 text-slate-600 text-sm">
              Hak akses terlindungi secara komprehensif pada lapisan database Row-Level Security (RLS) dan validasi server-side.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-6">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Siswa (Student)</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Akses terpusat ke materi terdaftar, pengumpulan tugas teks/berkas, pengerjaan kuis real-time, perolehan XP transparan, dan leaderboard kelas.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Modul & materi PDF/video
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Submit tugas & riwayat nilai
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Leveling XP & lencana prestasi
                </li>
              </ul>
            </div>

            {/* Teacher Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Guru (Teacher)</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Pengelolaan kelas binaan, publikasi materi belajar, pembuatan tugas ber-deadline, penilai kuis otomatis, dan buku nilai terstruktur.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Manajemen kelas & materi binaan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Evaluasi & feedback submission
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Pembuat kuis & bank soal
                </li>
              </ul>
            </div>

            {/* Admin Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Administrator</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Akses penuh dan menyeluruh ke seluruh modul sistem: manajemen pengguna, kelas, mata pelajaran, enrollment, audit log, dan analitik sekolah.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Akses penuh lintas seluruh modul
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Kontrol akun pengguna & role
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Audit log & keamanan platform
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 bg-white">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">EduFlow</span> — Learn Better, Grow Further.
          </div>
          <p>© 2026 EduFlow LMS. Dibuat sesuai standar arsitektur sekolah modern.</p>
        </div>
      </footer>
    </div>
  );
}
