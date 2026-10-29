"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  Award,
  ArrowLeft,
  CheckCircle2,
  FileText,
  User,
  Clock,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";

export default function ReviewSubmissionPage() {
  const params = useParams();
  const submissionId = params?.submissionId as string;
  const router = useRouter();
  const { user } = useAuth();

  const allSubmissions = db.getSubmissions();
  const sub = allSubmissions.find((s) => s.id === submissionId);

  const [score, setScore] = useState<number>(sub?.score ?? 90);
  const [feedback, setFeedback] = useState<string>(sub?.feedback ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!sub) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Submission Tidak Ditemukan</h2>
        <Link href="/app/teacher/assignments">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Tugas
          </Button>
        </Link>
      </div>
    );
  }

  const assignment = sub.assignment;
  const maxScore = assignment?.max_score || 100;

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);

    try {
      db.gradeSubmission(sub.id, user.id, score, feedback);
      setSavedSuccess(true);
      setTimeout(() => {
        router.push(`/app/teacher/assignments/${sub.assignment_id}/submissions`);
      }, 1500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link
        href={`/app/teacher/assignments/${sub.assignment_id}/submissions`}
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Daftar Submission
      </Link>

      {/* Header Info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="indigo" className="text-xs">
            {assignment?.title}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">
            Dikumpulkan: {formatDate(sub.submitted_at)}
          </span>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
            {sub.student?.full_name?.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{sub.student?.full_name}</h1>
            <p className="text-xs text-slate-500">Status Akun: Siswa Aktif Terverifikasi</p>
          </div>
        </div>
      </div>

      {/* Student Work Preview */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-4 w-4 text-indigo-600" />
            Hasil Pekerjaan yang Dikumpulkan Siswa
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Uraian Jawaban Teks:
            </span>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs font-mono text-slate-800 whitespace-pre-line leading-relaxed">
              {sub.text_answer || "(Tidak menyertakan jawaban teks)"}
            </div>
          </div>

          {sub.file_name && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Lampiran Berkas:
              </span>
              <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 text-xs text-indigo-900">
                <FileText className="h-5 w-5 text-indigo-600 shrink-0" />
                <span className="font-semibold flex-1">{sub.file_name}</span>
                <span className="text-xs text-slate-400 font-medium">Tervalidasi di Storage</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grading Form */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="h-4 w-4 text-emerald-600" />
            Evaluasi & Pemberian Nilai Resmi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {savedSuccess && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-bold text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Nilai dan feedback berhasil disimpan ke database! Notifikasi otomatis terkirim ke siswa.
            </div>
          )}

          <form onSubmit={handleSaveGrade} className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="gradeScore">Nilai Skor Siswa (Skala 0 - {maxScore})</Label>
                <span className="text-xs font-bold text-indigo-700">{score} / {maxScore}</span>
              </div>
              <Input
                id="gradeScore"
                type="number"
                min={0}
                max={maxScore}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="mt-1 text-sm font-bold"
                required
              />
            </div>

            <div>
              <Label htmlFor="gradeFeedback">Catatan Feedback & Umpan Balik Guru</Label>
              <Textarea
                id="gradeFeedback"
                placeholder="Berikan apresiasi dan saran perbaikan yang membangun bagi siswa..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mt-1 min-h-[100px] text-xs"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Tindakan penilaian akan dicatat di Audit Log platform.
              </span>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs"
              >
                {isSaving ? "Menyimpan Nilai..." : "Simpan & Publikasikan Nilai"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

