"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  HelpCircle,
  ArrowLeft,
  Clock,
  Award,
  AlertCircle,
  CheckCircle2,
  PlayCircle,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function QuizOverviewPage() {
  const params = useParams();
  const quizId = params?.quizId as string;
  const { user } = useAuth();

  const quiz = db.getQuizById(quizId);

  if (!quiz) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Kuis Tidak Ditemukan</h2>
        <Link href="/app/student/quizzes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Kuis
          </Button>
        </Link>
      </div>
    );
  }

  const attempts = quiz.my_attempts || [];
  const canAttempt = attempts.length < quiz.max_attempts;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link
        href="/app/student/quizzes"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Daftar Kuis
      </Link>

      {/* Quiz Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="indigo" className="text-xs">
            {quiz.class_subject?.subject?.name}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">
            {quiz.class_subject?.class?.name}
          </span>
          <span className="text-xs text-slate-500 ml-auto flex items-center gap-1 font-medium">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            Tutup: {formatDate(quiz.closes_at)}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {quiz.title}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">{quiz.instructions}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Durasi Waktu</span>
            <strong className="text-slate-800">{quiz.duration_minutes} Menit</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Batas Percobaan</span>
            <strong className="text-slate-800">{quiz.max_attempts} Kali</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Jumlah Soal</span>
            <strong className="text-slate-800">{quiz.questions?.length || 0} Butir</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Hasil Nilai</span>
            <strong className="text-slate-800">Otomatis Terbit</strong>
          </div>
        </div>
      </div>

      {/* Past Attempts History */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="h-4 w-4 text-emerald-600" />
            Riwayat Percobaan Pengerjaan ({attempts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {attempts.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">
              Anda belum pernah mengerjakan kuis ini.
            </p>
          ) : (
            attempts.map((att) => (
              <div
                key={att.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4 bg-slate-50/70"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="indigo" className="text-[10px]">
                      Percobaan Ke-{att.attempt_number}
                    </Badge>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {formatDate(att.submitted_at)}
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 mt-1 block">
                    Status: <strong className="text-emerald-700 capitalize">{att.status}</strong>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400">Skor Diperoleh:</span>
                  <p className="text-xl font-black text-indigo-700">{att.score} Poin</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Action to Start / Reattempt */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-indigo-950">
            {canAttempt ? "Siap Memulai Pengerjaan?" : "Batas Percobaan Telah Tercapai"}
          </h3>
          <p className="text-xs text-indigo-700 mt-0.5">
            {canAttempt
              ? "Waktu akan mulai berjalan otomatis setelah Anda menekan tombol mulai di sebelah kanan."
              : `Anda telah menggunakan seluruh jatah ${quiz.max_attempts}x percobaan untuk asesmen ini.`}
          </p>
        </div>

        {canAttempt && (
          <Link href={`/app/student/quizzes/${quiz.id}/attempt`}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm text-xs shrink-0">
              <PlayCircle className="mr-1.5 h-4 w-4" />
              Mulai Pengerjaan Sekarang
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
