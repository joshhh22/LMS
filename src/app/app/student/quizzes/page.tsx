"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { HelpCircle, Clock, ArrowRight, Award, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function StudentQuizzesPage() {
  const { user } = useAuth();
  const quizzes = db.getQuizzes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Kuis & Ujian Evaluasi</h1>
        <p className="text-sm text-slate-500">
          Uji pemahaman materi Anda melalui asesmen objektif dan simulasi ujian berkala.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => {
          const attempts = quiz.my_attempts || [];
          const hasAttempted = attempts.length > 0;
          const bestScore = hasAttempted
            ? Math.max(...attempts.map((a) => a.score || 0))
            : null;

          return (
            <Card key={quiz.id} className="hover:border-indigo-300 transition-all flex flex-col justify-between shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="indigo" className="text-[10px]">
                    {quiz.class_subject?.subject?.name || "Mata Pelajaran"}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {quiz.class_subject?.class?.name}
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-slate-900">
                  {quiz.title}
                </CardTitle>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {quiz.instructions || "Evaluasi materi berkala dengan penilaian otomatis."}
                </p>
              </CardHeader>
              <CardContent className="pt-2 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-indigo-600" />
                    Durasi: {quiz.duration_minutes} Menit
                  </span>
                  <span>
                    Batas Percobaan: <strong>{attempts.length}/{quiz.max_attempts}x</strong>
                  </span>
                </div>

                {hasAttempted && (
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-xs border border-emerald-100">
                    <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-emerald-600" /> Skor Tertinggi Anda:
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      {bestScore} Poin
                    </span>
                  </div>
                )}

                <div className="pt-2">
                  <Link href={`/app/student/quizzes/${quiz.id}`} className="block">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                      {hasAttempted ? "Lihat Hasil & Ulangi" : "Mulai Kerjakan Kuis"}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

