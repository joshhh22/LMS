"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  Users,
  FolderTree,
  ClipboardList,
  HelpCircle,
  Clock,
  ArrowRight,
  PlusCircle,
  Award,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function TeacherDashboard() {
  const { user } = useAuth();

  const assignedClasses = db.getClasses(user || undefined);
  const assignments = db.getAssignments();
  const quizzes = db.getQuizzes();
  const allSubmissions = db.getSubmissions();

  const pendingSubmissions = allSubmissions.filter((s) => s.status === "submitted");
  const gradedSubmissions = allSubmissions.filter((s) => s.status === "graded");

  return (
    <div className="space-y-8">
      {/* Teacher Welcome Header (Chunky Tactile Hero) */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 p-6 sm:p-8 text-white shadow-[0_16px_36px_-6px_rgba(30,27,75,0.4),inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-indigo-200 border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
              Portal Akademik Pendidik • Tahun Ajaran 2026/2027
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-xs">
              Selamat Mengajar, {user?.full_name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Pantau kemajuan siswa binaan, periksa pengumpulan tugas terbaru, dan kelola kuis kelas.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/app/teacher/assignments">
              <Button size="sm" className="clay-btn-primary text-xs font-bold">
                <PlusCircle className="mr-1.5 h-4 w-4" /> Buat Tugas Baru
              </Button>
            </Link>
            <Link href="/app/teacher/quizzes">
              <Button size="sm" variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <PlusCircle className="mr-1.5 h-4 w-4" /> Buat Kuis
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row (Chunky 3D Clay Stat Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Kelas Binaan"
          value={assignedClasses.length}
          subtitle="Kelas aktif diajar"
          icon={FolderTree}
          color="indigo"
        />
        <StatCard
          title="Menunggu Dinilai"
          value={pendingSubmissions.length}
          subtitle="Submission siswa"
          icon={AlertCircle}
          color="amber"
        />
        <StatCard
          title="Tugas Aktif"
          value={assignments.length}
          subtitle="Tugas berjalan"
          icon={ClipboardList}
          color="blue"
        />
        <StatCard
          title="Evaluasi Selesai"
          value={gradedSubmissions.length}
          subtitle="Telah diberi skor"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Main Teacher Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Pending Submissions & Assigned Classes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submissions Pending Grading */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100/80">
              <CardTitle className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                  <AlertCircle className="h-4 w-4" />
                </div>
                Submission Menunggu Evaluasi Guru ({pendingSubmissions.length})
              </CardTitle>
              <Link href="/app/teacher/assignments" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                Kelola Semua &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5">
              {pendingSubmissions.length === 0 ? (
                <div className="text-center py-6 text-xs font-semibold text-slate-400">
                  Semua pengumpulan tugas telah selesai diperiksa!
                </div>
              ) : (
                pendingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4.5 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_12px_rgba(245,158,11,0.06)]"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="warning" className="text-[10px]">Perlu Dinilai</Badge>
                        <span className="text-xs text-slate-400 font-semibold">
                          {formatDate(sub.submitted_at)}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {sub.assignment?.title}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Siswa Pengumpul: <strong>{sub.student?.full_name}</strong>
                      </p>
                    </div>

                    <Link href={`/app/teacher/submissions/${sub.id}/review`} className="shrink-0">
                      <Button size="sm" className="clay-btn-primary text-xs font-bold w-full sm:w-auto">
                        Beri Nilai & Feedback &rarr;
                      </Button>
                    </Link>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Assigned Classes Overview */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100/80">
              <CardTitle className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                  <FolderTree className="h-4 w-4" />
                </div>
                Kelas Binaan Saya
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5">
              {assignedClasses.map((cls) => {
                const enrollments = db.getEnrollments(cls.id);
                return (
                  <div
                    key={cls.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/90 bg-[#F8FAFD] p-4.5 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_12px_rgba(100,116,139,0.05)] hover:border-indigo-200 transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                        {cls.academic_year} • {cls.grade_level}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{cls.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{cls.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant="outline" className="text-xs font-bold">
                        {enrollments.length} Siswa Terdaftar
                      </Badge>
                      <Link href={`/app/teacher/classes/${cls.id}`}>
                        <Button size="sm" variant="outline" className="text-xs font-bold">
                          Buka Kelas
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Quick Stats & Active Quizzes */}
        <div className="space-y-6">
          {/* Active Quizzes */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100/80">
              <CardTitle className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                  <HelpCircle className="h-4 w-4" />
                </div>
                Kuis Aktif Terjadwal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="rounded-2xl border border-white/90 bg-[#F8FAFD] p-3.5 space-y-1.5 text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_8px_rgba(100,116,139,0.04)]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 line-clamp-1">{quiz.title}</span>
                    <Badge variant="indigo" className="text-[9px]">Aktif</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Durasi: {quiz.duration_minutes} Menit</p>
                  <Link
                    href={`/app/teacher/quizzes/${quiz.id}/results`}
                    className="inline-flex items-center font-bold text-indigo-600 hover:text-indigo-800 pt-1 text-[11px]"
                  >
                    Lihat Rekap Skor Siswa &rarr;
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100/80">
              <CardTitle className="text-sm font-extrabold text-slate-900">Aksi Cepat Pengajar</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-2.5">
              <Link href="/app/teacher/materials" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-bold">
                  <PlusCircle className="mr-2 h-3.5 w-3.5 text-indigo-600" /> Unggah Materi Belajar Baru
                </Button>
              </Link>
              <Link href="/app/teacher/gradebook" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-bold">
                  <Award className="mr-2 h-3.5 w-3.5 text-emerald-600" /> Rekap Nilai Satu Kelas
                </Button>
              </Link>
              <Link href="/app/teacher/announcements" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs font-bold">
                  <PlusCircle className="mr-2 h-3.5 w-3.5 text-blue-600" /> Kirim Pengumuman Kelas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
