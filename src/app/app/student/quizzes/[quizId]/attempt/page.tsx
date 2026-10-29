"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  HelpCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Award,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function QuizAttemptPage() {
  const params = useParams();
  const quizId = params?.quizId as string;
  const router = useRouter();
  const { user } = useAuth();

  const quiz = db.getQuizById(quizId);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(
    (quiz?.duration_minutes || 20) * 60
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; maxScore: number } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (result) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [result]);

  if (!quiz) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Kuis Tidak Ditemukan</h2>
        <Link href="/app/student/quizzes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Kuis
          </Button>
        </Link>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQ = questions[currentIdx];

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleFinalSubmit = () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const attempt = db.submitQuizAttempt(quiz.id, user.id, answers);
      setResult({
        score: attempt.score || 0,
        maxScore: attempt.max_score || 100,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    const isPerfect = result.score === result.maxScore;
    return (
      <div className="max-w-2xl mx-auto py-8 text-center space-y-6">
        <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-2">
            <Award className="h-9 w-9" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Pengerjaan Kuis Selesai!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Jawaban Anda telah dievaluasi dan dinilai secara otomatis di server.
          </p>

          <div className="my-6 inline-block rounded-2xl bg-slate-50 border border-slate-200 p-6 min-w-[240px]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Skor Perolehan Anda
            </span>
            <div className="text-4xl font-black text-indigo-700 mt-1">
              {result.score} / {result.maxScore}
            </div>
            <p className="text-xs font-semibold text-emerald-700 mt-2 flex items-center justify-center gap-1">
              <Sparkles className="h-4 w-4" /> +200 XP Dikreditkan!
            </p>
          </div>

          {isPerfect && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 font-semibold">
              🏆 Luar Biasa! Anda meraih skor sempurna dan membuka Lencana Kecemerlangan Akademik!
            </div>
          )}

          <div className="pt-4 flex justify-center gap-3">
            <Link href={`/app/student/quizzes/${quiz.id}`}>
              <Button variant="outline" size="sm">
                Kembali ke Ringkasan
              </Button>
            </Link>
            <Link href="/app/student/dashboard">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Buka Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Top Bar with Live Timer */}
      <div className="sticky top-20 z-10 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-sm p-4 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-indigo-600 uppercase">
            {quiz.class_subject?.subject?.name}
          </span>
          <h2 className="text-sm font-bold text-slate-900 line-clamp-1">{quiz.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-mono font-bold text-indigo-700">
            <Clock className="h-4 w-4 text-indigo-600" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <Button
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-2xs"
          >
            Selesai & Kumpulkan
          </Button>
        </div>
      </div>

      {/* Question Card */}
      {currentQ && (
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase">
                Soal Butir Ke-{currentIdx + 1} dari {questions.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">Bobot: {currentQ.points} Poin</span>
            </div>
            <CardTitle className="text-base font-bold text-slate-900 mt-2 leading-relaxed">
              {currentQ.prompt}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  type="button"
                  className={`flex w-full items-center gap-3.5 rounded-xl border p-4 text-left text-sm transition-all ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-2xs"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {opt.id}
                  </div>
                  <span className="flex-1 leading-snug">{opt.text}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Sebelumnya
        </Button>

        {/* Question bubble indicator */}
        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  isCurrent
                    ? "ring-2 ring-indigo-600 ring-offset-1 bg-indigo-600 text-white"
                    : isAnswered
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {currentIdx < questions.length - 1 ? (
          <Button
            onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
          >
            Berikutnya <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            onClick={handleFinalSubmit}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
          >
            Kumpulkan Final
          </Button>
        )}
      </div>
    </div>
  );
}

