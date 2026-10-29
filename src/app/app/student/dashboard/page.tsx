"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  BookOpen,
  ClipboardList,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  CheckCircle2,
  Flame,
  Calendar,
} from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateLevel, formatDate } from "@/lib/utils";

export default function StudentDashboard() {
  const { user } = useAuth();

  const totalXp = db.getTotalXp(user?.id);
  const { level, currentXp, nextLevelXp, progress } = calculateLevel(totalXp);
  const assignments = db.getAssignments();
  const quizzes = db.getQuizzes();
  const courses = db.getCourses();
  const studentBadges = db.getStudentBadges(user?.id);
  const submissions = db.getSubmissions().filter((s) => s.student_id === user?.id);

  const pendingAssignments = assignments.filter((a) => !a.my_submission);
  const gradedSubmissions = submissions.filter((s) => s.status === "graded");

  return (
    <div className="space-y-8">
      {/* Tactile Clay Greeting Banner with Gamification Bar */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-[0_16px_36px_-6px_rgba(99,102,241,0.28),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-sm border border-white/25">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Tahun Ajaran 2026/2027 • Semester Ganjil
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-xs">
              Selamat Datang, {user?.full_name}!
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl font-medium leading-relaxed">
              Terus tingkatkan konsistensi belajarmu hari ini. Modul baru dan latihan soal sudah tersedia.
            </p>
          </div>

          {/* Level & XP Widget (Clay Inset Capsule) */}
          <div className="rounded-2xl bg-white/15 p-4.5 backdrop-blur-md border border-white/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_6px_16px_rgba(0,0,0,0.1)] min-w-[240px]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 drop-shadow-xs">
                <Flame className="h-4 w-4 text-amber-400 fill-amber-400" /> Level {level}
              </span>
              <span className="font-extrabold text-white text-sm">{totalXp.toLocaleString()} XP</span>
            </div>
            <Progress value={progress} className="h-2.5 bg-black/20 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]" />
            <div className="flex justify-between text-[11px] font-semibold text-indigo-100 mt-1.5">
              <span>{currentXp} XP terkumpul</span>
              <span>Target: {nextLevelXp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row (Chunky 3D Clay Stat Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tugas Tertunda"
          value={pendingAssignments.length}
          subtitle="Perlu diselesaikan"
          icon={ClipboardList}
          color="amber"
        />
        <StatCard
          title="Kuis Aktif"
          value={quizzes.length}
          subtitle="Dapat dikerjakan"
          icon={HelpCircle}
          color="indigo"
        />
        <StatCard
          title="Modul Belajar"
          value={courses.length}
          subtitle="Tersedia di kelas"
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Lencana Terbuka"
          value={studentBadges.length}
          subtitle="Pencapaian prestasi"
          icon={Award}
          color="emerald"
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Continue Learning & Assignments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100/80">
              <CardTitle className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                  <BookOpen className="h-4 w-4" />
                </div>
                Lanjutkan Belajar (Continue Learning)
              </CardTitle>
              <Link href="/app/student/courses" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                Semua Materi &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5">
              {courses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-white/90 bg-[#F8FAFD] p-4.5 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_12px_rgba(100,116,139,0.05)] hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                      {course.class_subject?.subject?.name}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{course.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{course.description}</p>
                  </div>
                  <Link href={`/app/student/courses/${course.id}`} className="shrink-0">
                    <Button size="sm" className="w-full sm:w-auto clay-btn-primary text-xs font-bold">
                      Buka Modul <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100/80">
              <CardTitle className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                  <ClipboardList className="h-4 w-4" />
                </div>
                Tenggat Tugas Mendatang
              </CardTitle>
              <Link href="/app/student/assignments" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                Lihat Semua ({assignments.length}) &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5">
              {assignments.slice(0, 3).map((asg) => (
                <div
                  key={asg.id}
                  className="rounded-2xl border border-white/90 bg-[#F8FAFD] p-4.5 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_12px_rgba(100,116,139,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant={asg.my_submission ? "success" : "warning"} className="text-[10px]">
                        {asg.my_submission ? "Sudah Dikumpulkan" : "Menunggu Pengumpulan"}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-400">Batas: {formatDate(asg.due_at)}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{asg.title}</h4>
                  </div>
                  <Link href={`/app/student/assignments/${asg.id}`} className="shrink-0">
                    <Button size="sm" variant={asg.my_submission ? "outline" : "default"} className="text-xs font-bold">
                      {asg.my_submission ? "Lihat Status" : "Kumpulkan Sekarang"}
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Grades & Achievements */}
        <div className="space-y-6">
          {/* Recent Grades */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100/80">
              <CardTitle className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                  <Award className="h-4 w-4" />
                </div>
                Nilai & Feedback Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {gradedSubmissions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Belum ada tugas yang dinilai guru.</p>
              ) : (
                gradedSubmissions.map((sub) => (
                  <div key={sub.id} className="rounded-2xl border border-white/90 bg-[#F8FAFD] p-3.5 space-y-2 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_8px_rgba(100,116,139,0.04)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 line-clamp-1">
                        {sub.assignment?.title || "Tugas"}
                      </span>
                      <span className="text-sm font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-xl border border-indigo-100 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                        {sub.score}/100
                      </span>
                    </div>
                    {sub.feedback && (
                      <p className="text-[11px] text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                        "{sub.feedback}"
                      </p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Badges Preview */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100/80">
              <CardTitle className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                  <Sparkles className="h-4 w-4" />
                </div>
                Lencana Penghargaan Anda
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                {studentBadges.map((sb) => (
                  <div
                    key={sb.badge_id}
                    className="flex flex-col items-center text-center p-3 rounded-2xl border border-amber-200/60 bg-amber-50/50 shadow-[0_4px_10px_rgba(245,158,11,0.08),inset_0_1px_2px_rgba(255,255,255,1)]"
                  >
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 flex items-center justify-center font-bold text-base mb-1.5 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_6px_rgba(245,158,11,0.2)]">
                      🏆
                    </div>
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{sb.badge?.name}</span>
                    <span className="text-[10px] text-amber-800 font-extrabold mt-0.5">+{sb.badge?.xp_bonus} XP</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-center">
                <Link href="/app/student/achievements" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                  Lihat Semua Lencana & Peringkat &rarr;
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
