"use client";

import React from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Award, BookOpen, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";

export default function StudentGradesPage() {
  const { user } = useAuth();

  const submissions = db.getSubmissions().filter((s) => s.student_id === user?.id && s.status === "graded");
  const quizAttempts = db.getQuizzes().flatMap((q) => q.my_attempts || []);

  const totalPoints = submissions.reduce((sum, s) => sum + (s.score || 0), 0);
  const avgGrade = submissions.length > 0 ? Math.round(totalPoints / submissions.length) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Buku Nilai & Riwayat Evaluasi</h1>
        <p className="text-sm text-slate-500">
          Transkrip capaian tugas, kuis, dan umpan balik resmi dari guru pengampu Anda.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Rata-Rata Tugas</span>
          <p className="text-3xl font-black text-indigo-700 mt-2">{avgGrade}/100</p>
          <span className="text-[11px] text-slate-400">Dari {submissions.length} tugas yang telah dinilai</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Evaluasi Selesai</span>
          <p className="text-3xl font-black text-emerald-700 mt-2">{submissions.length + quizAttempts.length}</p>
          <span className="text-[11px] text-slate-400">Tugas & Kuis terekam</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Predikat Saat Ini</span>
          <p className="text-3xl font-black text-violet-700 mt-2">
            {avgGrade >= 90 ? "Sangat Baik (A)" : avgGrade >= 75 ? "Baik (B)" : "Cukup (C)"}
          </p>
          <span className="text-[11px] text-slate-400">Berdasarkan skala penilaian sekolah</span>
        </div>
      </div>

      {/* Assignment Grades Table */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-600" />
            Nilai Tugas & Lembar Kerja
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {submissions.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={Award}
                title="Belum Ada Nilai Tugas"
                description="Nilai akan tampil secara otomatis di sini begitu guru menyelesaikan evaluasi dan mempublikasikan hasil."
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Tugas</TableHead>
                  <TableHead>Tanggal Dinilai</TableHead>
                  <TableHead>Skor Perolehan</TableHead>
                  <TableHead>Feedback Guru</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-semibold text-slate-800">
                      {sub.assignment?.title || "Tugas"}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(sub.graded_at)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 border border-emerald-100">
                        {sub.score} / 100
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600 max-w-xs">
                      {sub.feedback ? (
                        <span className="italic">"{sub.feedback}"</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quiz Grades Table */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            Nilai Kuis & Asesmen Terjadwal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {quizAttempts.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">Belum ada riwayat pengerjaan kuis.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kuis</TableHead>
                  <TableHead>Percobaan</TableHead>
                  <TableHead>Waktu Selesai</TableHead>
                  <TableHead>Skor Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizAttempts.map((att) => (
                  <TableRow key={att.id}>
                    <TableCell className="font-semibold text-slate-800">
                      Kuis Evaluasi Pembelajaran
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      Ke-{att.attempt_number}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(att.submitted_at)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-black text-indigo-700 border border-indigo-100">
                        {att.score} Poin
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
