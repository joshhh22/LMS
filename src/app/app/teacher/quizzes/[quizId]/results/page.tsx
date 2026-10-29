"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { SECURE_ANSWER_KEYS } from "@/lib/supabase/mock-data";
import {
  HelpCircle,
  ArrowLeft,
  Users,
  Award,
  Clock,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function TeacherQuizResultsPage() {
  const params = useParams();
  const quizId = params?.quizId as string;
  const { user } = useAuth();

  const quiz = db.getQuizById(quizId);

  if (!quiz) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Kuis Tidak Ditemukan</h2>
        <Link href="/app/teacher/quizzes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Kuis
          </Button>
        </Link>
      </div>
    );
  }

  const allAttempts = db.getQuizzes().find((q) => q.id === quizId)?.my_attempts || [];
  const profiles = db.getProfiles();
  const questions = quiz.questions || [];

  return (
    <div className="space-y-6">
      <Link
        href="/app/teacher/quizzes"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Bank Soal & Kuis
      </Link>

      {/* Quiz Summary Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="indigo" className="text-xs">
            {quiz.class_subject?.subject?.name}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">
            {quiz.class_subject?.class?.name}
          </span>
          <span className="text-xs text-slate-500 ml-auto font-medium">
            Durasi: {quiz.duration_minutes} Menit
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{quiz.title}</h1>
        <p className="text-xs text-slate-600">{quiz.instructions}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student Attempts Table (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600" />
                Rekap Hasil Pengerjaan Siswa
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Percobaan</TableHead>
                    <TableHead>Waktu Selesai</TableHead>
                    <TableHead>Nilai</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAttempts.map((att) => {
                    const student = profiles.find((p) => p.id === att.student_id);
                    return (
                      <TableRow key={att.id}>
                        <TableCell className="font-semibold text-slate-800 flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {student?.full_name?.substring(0, 2).toUpperCase() || "SW"}
                          </div>
                          <span>{student?.full_name || "Siswa"}</span>
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          Ke-{att.attempt_number}
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          {formatDate(att.submitted_at)}
                        </TableCell>
                        <TableCell>
                          <span className="font-black text-sm text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                            {att.score} / {att.max_score}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="success" className="text-[10px]">
                            Lengkap
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Protected Answer Keys (1 Col - Teacher/Admin Only) */}
        <div>
          <Card className="border-indigo-200">
            <CardHeader className="pb-3 border-b border-indigo-100 bg-indigo-50/50">
              <CardTitle className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-indigo-600" />
                Kunci Jawaban Guru (Privat)
              </CardTitle>
              <p className="text-[11px] text-indigo-700">
                Kunci jawaban ini dilindungi kebijakan RLS dan tidak dikirimkan ke siswa.
              </p>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {questions.map((q, idx) => {
                const key = SECURE_ANSWER_KEYS[q.id];
                return (
                  <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Butir Soal {idx + 1}</span>
                      <Badge variant="indigo" className="text-[10px] font-bold">
                        Kunci: Opsi {key?.correct_option_id || "A"}
                      </Badge>
                    </div>
                    <p className="text-slate-600 font-medium">{q.prompt}</p>
                    {key?.explanation && (
                      <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                        Pembahasan: {key.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

