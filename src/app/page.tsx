import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  Award,
  ArrowRight,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">EduFlow</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button size="sm">
                Masuk ke Akun
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold text-indigo-700 mb-6 bg-indigo-50 border border-indigo-100">
              Sistem Informasi & Manajemen Pembelajaran Sekolah
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.15]">
              Learn Better, <span className="text-indigo-600">Grow Further.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Platform pembelajaran terpadu untuk siswa, guru, dan manajemen sekolah. Akses materi pelajaran digital, pengumpulan tugas, kuis interaktif, dan pemantauan capaian nilai akademik secara mudah dan transparan.
            </p>

            <div className="mt-8 flex items-center justify-center">
              <Link href="/login">
                <Button size="lg" className="h-11 px-8 text-sm font-semibold">
                  Masuk ke Portal Sekolah
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Fitur Utama Pembelajaran
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Dirancang untuk memudahkan aktivitas belajar mengajar di lingkungan sekolah modern.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Modul & Materi Digital</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Akses materi ajar berbasis teks, file PDF terlampir, dan video pembelajaran yang tersusun terstruktur per mata pelajaran dan bab.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 mb-4">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Tugas & Evaluasi Online</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kumpulkan tugas belajar secara digital, ikuti kuis berbatas waktu, dan peroleh penilaian serta umpan balik langsung dari guru pengampu.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Rekap Nilai & Prestasi</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparansi buku nilai untuk memantau perkembangan akademik siswa serta apresiasi pencapaian belajar melalui sistem capaian poin prestasi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white shadow-xs">
              <GraduationCap className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-slate-800">EduFlow</span> — Learn Better, Grow Further.
          </div>
          <p>© 2026 EduFlow. Hak cipta dilindungi undang-undang.</p>
        </div>
      </footer>
    </div>
  );
}
