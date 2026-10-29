"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  ClipboardList,
  ArrowLeft,
  Clock,
  CheckCircle2,
  FileText,
  Upload,
  AlertCircle,
  Sparkles,
  Award,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";

export default function AssignmentDetailPage() {
  const params = useParams();
  const assignmentId = params?.assignmentId as string;
  const { user } = useAuth();

  const assignment = db.getAssignmentById(assignmentId);

  const [textAnswer, setTextAnswer] = useState(assignment?.my_submission?.text_answer || "");
  const [fileName, setFileName] = useState(assignment?.my_submission?.file_name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!assignment) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Tugas Tidak Ditemukan</h2>
        <Link href="/app/student/assignments">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Tugas
          </Button>
        </Link>
      </div>
    );
  }

  const existingSub = assignment.my_submission;
  const isGraded = existingSub?.status === "graded";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      db.submitAssignment(assignment.id, user.id, textAnswer, fileName || "jawaban_tugas.pdf");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href="/app/student/assignments"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Daftar Tugas
      </Link>

      {/* Assignment Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="indigo" className="text-xs">
            {assignment.class_subject?.subject?.name}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">
            {assignment.class_subject?.class?.name}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 ml-auto font-medium">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            Tenggat: <strong>{formatDate(assignment.due_at)}</strong>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {assignment.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Skor Maksimum: <strong>{assignment.max_score} Poin</strong></span>
          <span>Tipe Jawaban: <strong>Teks & Berkas Unggahan</strong></span>
          <span>
            Keterlambatan: <strong>{assignment.allow_late_submission ? "Diizinkan" : "Ditolak"}</strong>
          </span>
        </div>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-indigo-600" />
            Instruksi & Petunjuk Pengerjaan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {assignment.instructions}
        </CardContent>
      </Card>

      {/* Grade Feedback Box (if already graded) */}
      {isGraded && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              <h3 className="text-base font-bold text-emerald-950">Hasil Penilaian Guru</h3>
            </div>
            <span className="text-2xl font-black text-emerald-700 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-2xs">
              {existingSub.score} / {assignment.max_score}
            </span>
          </div>
          {existingSub.feedback && (
            <div className="bg-white p-4 rounded-xl border border-emerald-100 text-xs text-slate-700">
              <span className="font-semibold text-emerald-900 block mb-1">Catatan Evaluasi Guru:</span>
              <p className="italic leading-relaxed">"{existingSub.feedback}"</p>
            </div>
          )}
          <p className="text-[11px] text-emerald-800">
            Dinilai pada {formatDate(existingSub.graded_at)}
          </p>
        </div>
      )}

      {/* Submission Form */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="h-4 w-4 text-indigo-600" />
              {existingSub ? "Perbarui / Tinjau Lembar Jawaban" : "Kumpulkan Lembar Jawaban"}
            </CardTitle>
            {existingSub && (
              <Badge variant={isGraded ? "success" : "indigo"} className="text-xs">
                {isGraded ? "Telah Dinilai" : "Sudah Dikumpulkan"}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {submitSuccess && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Jawaban tugas berhasil tersimpan di server! +150 XP telah dikreditkan ke profil Anda.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="textAnswer">Jawaban Teks / Catatan Ringkasan</Label>
              <Textarea
                id="textAnswer"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Tulis uraian jawaban tugas, langkah kalkulasi, atau penjelasan Anda di sini..."
                className="mt-1 min-h-[140px] text-sm"
                required
              />
            </div>

            <div>
              <Label htmlFor="fileUpload">Lampiran Berkas Pendukung (PDF, DOCX, Gambar)</Label>
              <div className="mt-1 flex items-center gap-3">
                <Input
                  id="fileUpload"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                  className="text-xs file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              {fileName && (
                <p className="mt-1.5 text-xs text-indigo-700 flex items-center gap-1 font-medium">
                  <FileText className="h-3.5 w-3.5" /> Berkas Terpilih: <strong>{fileName}</strong>
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Timestamp submission tercatat resmi di database.
              </span>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm"
              >
                {isSubmitting ? "Menyimpan..." : existingSub ? "Kirim Ulang Jawaban" : "Kumpulkan Tugas (+150 XP)"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
