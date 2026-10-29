"use client";

import React from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { BarChart3, TrendingUp, Users, CheckCircle2, Clock, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/shared/stat-card";

export default function TeacherAnalyticsPage() {
  const { user } = useAuth();
  const classes = db.getClasses(user || undefined);
  const assignments = db.getAssignments();
  const allSubmissions = db.getSubmissions();
  const enrollments = db.getEnrollments();

  const totalStudents = enrollments.length;
  const gradedSubs = allSubmissions.filter((s) => s.status === "graded");
  const scores = gradedSubs.map((s) => s.score).filter((sc): sc is number => typeof sc === "number");
  const classAvg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 85;

  const completionRate = Math.min(100, Math.round((allSubmissions.length / (assignments.length * totalStudents || 1)) * 100));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Analitik Pembelajaran Kelas
        </h1>
        <p className="text-sm text-slate-500">
          Statistik tingkat penyelesaian tugas, sebaran skor evaluasi, dan keaktifan siswa.
        </p>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tingkat Pengumpulan"
          value={`${completionRate}%`}
          subtitle="Rasio submission tugas"
          icon={TrendingUp}
          color="indigo"
        />
        <StatCard
          title="Rata-Rata Nilai"
          value={`${classAvg}/100`}
          subtitle="Seluruh evaluasi"
          icon={Award}
          color="emerald"
        />
        <StatCard
          title="Total Siswa Aktif"
          value={totalStudents}
          subtitle="Kelas binaan"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Tugas Terpublikasi"
          value={assignments.length}
          subtitle="Modul evaluasi"
          icon={CheckCircle2}
          color="violet"
        />
      </div>

      {/* Analytics Charts & Progress Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject Progress Card */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              Tingkat Ketuntasan per Mata Pelajaran
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Matematika Peminatan (Kelas 10-A)</span>
                <span className="text-indigo-600 font-bold">88% Tuntas</span>
              </div>
              <Progress value={88} className="h-2 bg-slate-100" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Fisika Dasar (Kelas 10-A)</span>
                <span className="text-indigo-600 font-bold">75% Tuntas</span>
              </div>
              <Progress value={75} className="h-2 bg-slate-100" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Bahasa Inggris Akademik</span>
                <span className="text-indigo-600 font-bold">92% Tuntas</span>
              </div>
              <Progress value={92} className="h-2 bg-slate-100" />
            </div>
          </CardContent>
        </Card>

        {/* Score Distribution Breakdown */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-600" />
              Distribusi Rentang Nilai Siswa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Predikat A (Skor 90 - 100)</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                2 Siswa (67%)
              </span>
            </div>
            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Predikat B (Skor 75 - 89)</span>
              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                1 Siswa (33%)
              </span>
            </div>
            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Predikat C (Skor &lt; 75)</span>
              <span className="font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                0 Siswa (0%)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

