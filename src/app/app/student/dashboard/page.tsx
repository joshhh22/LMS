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
      {/* Personalized Greeting Header with Gamification Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-indigo-100 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Tahun Ajaran 2026/2027 • Semester Ganjil
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang, {user?.full_name}!
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
              Terus tingkatkan konsistensi belajarmu hari ini. Modul baru dan latihan soal sudah tersedia.
            </p>
          </div>

          {/* Level & XP Widget */}
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20 min-w-[220px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-1">
                <Flame className="h-4 w-4 text-amber-300" /> Level {level}
              </span>
              <span className="font-semibold text-white">{totalXp.toLocaleString()} XP</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
            <div className="flex justify-between text-[10px] text-indigo-200 mt-1">
              <span>{currentXp} XP</span>
              <span>Target: {nextLevelXp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
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
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                Lanjutkan Belajar (Continue Learning)
              </CardTitle>
              <Link href="/app/student/courses" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                Semua Materi &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {courses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl border border-slate-200 p-4 hover:border-indigo-300 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                      {course.class_subject?.subject?.name}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{course.description}</p>
                  </div>
                  <Link href={`/app/student/courses/${course.id}`} className="shrink-0">
                    <Button size="sm" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                      Buka Modul <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-amber-600" />
                Tenggat Tugas Mendatang
              </CardTitle>
              <Link href="/app/student/assignments" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                Lihat Semua ({assignments.length}) &rarr;
              </Link>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {assignments.slice(0, 3).map((asg) => (
                <div
                  key={asg.id}
                  className="rounded-xl border border-slate-200 p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={asg.my_submission ? "success" : "warning"} className="text-[10px]">
                        {asg.my_submission ? "Sudah Dikumpulkan" : "Menunggu Pengumpulan"}
                      </Badge>
                      <span className="text-xs text-slate-400">Batas: {formatDate(asg.due_at)}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{asg.title}</h4>
                  </div>
                  <Link href={`/app/student/assignments/${asg.id}`} className="shrink-0">
                    <Button size="sm" variant={asg.my_submission ? "outline" : "default"} className="text-xs">
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
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" />
                Nilai & Feedback Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {gradedSubmissions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Belum ada tugas yang dinilai guru.</p>
              ) : (
                gradedSubmissions.map((sub) => (
                  <div key={sub.id} className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 line-clamp-1">
                        {sub.assignment?.title || "Tugas"}
                      </span>
                      <span className="text-base font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {sub.score}/100
                      </span>
                    </div>
                    {sub.feedback && (
                      <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-100">
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
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Lencana Penghargaan Anda
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {studentBadges.map((sb) => (
                  <div
                    key={sb.badge_id}
                    className="flex flex-col items-center text-center p-3 rounded-xl border border-amber-100 bg-amber-50/50"
                  >
                    <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-base mb-1.5 shadow-2xs">
                      🏆
                    </div>
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{sb.badge?.name}</span>
                    <span className="text-[10px] text-amber-700 font-semibold mt-0.5">+{sb.badge?.xp_bonus} XP</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-center">
                <Link href="/app/student/achievements" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
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
