"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  BookOpen,
  ArrowLeft,
  Clock,
  FileText,
  Video,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Download,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LessonViewPage() {
  const params = useParams();
  const lessonId = params?.lessonId as string;
  const { user } = useAuth();

  const [completed, setCompleted] = useState(false);
  const [claimedXp, setClaimedXp] = useState(false);

  const lesson = db.getLessonById(lessonId);

  if (!lesson) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Pertemuan Tidak Ditemukan</h2>
        <Link href="/app/student/courses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Modul
          </Button>
        </Link>
      </div>
    );
  }

  const materials = lesson.materials || [];

  const handleComplete = () => {
    if (!user) return;
    setCompleted(true);
    // Award XP idempotently
    const idempotencyKey = `xp_lesson_${lesson.id}_${user.id}`;
    const result = db.grantXp(user.id, "lesson_completed", lesson.id, 75, idempotencyKey);
    setClaimedXp(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href={`/app/student/courses/${lesson.course_id}`}
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Silabus Modul
      </Link>

      {/* Lesson Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="indigo" className="text-xs">Pertemuan Bab {lesson.position}</Badge>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <Clock className="h-3.5 w-3.5" /> Estimasi {lesson.estimated_minutes} Menit
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {lesson.title}
        </h1>
      </div>

      {/* Main Content Article */}
      <Card>
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900">
            <BookOpen className="h-4 w-4 text-indigo-600" /> Uraian Materi Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="prose prose-slate max-w-none">
            <p className="whitespace-pre-line text-base text-slate-800 leading-relaxed font-normal">
              {lesson.content || "Konten teks materi pembelajaran."}
            </p>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Poin Kunci yang Harus Dikuasai:
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
              <li>Memahami definisi formal relasi pemetaan dari himpunan domain ke kodomain.</li>
              <li>Mampu menentukan batasan domain alami untuk menghindari pembagian dengan nol.</li>
              <li>Menghitung hasil komposisi fungsi secara bertahap dan teliti.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Learning Materials & Downloads */}
      {materials.length > 0 && (
        <Card>
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-900">
              <FileText className="h-4 w-4 text-indigo-600" /> Lampiran Dokumen & Media Belajar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {materials.map((mat) => {
              const isVideo = mat.material_type === "video";
              const isPdf = mat.material_type === "pdf";
              return (
                <div
                  key={mat.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 hover:border-indigo-200 transition-colors bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      {isVideo ? <Video className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{mat.title}</h4>
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">
                        Format: {mat.material_type}
                      </span>
                    </div>
                  </div>

                  {mat.external_url && (
                    <a
                      href={mat.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Buka Berkas
                      </Button>
                    </a>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Completion & XP Claim Action Bar */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-indigo-950 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            Selesai Mempelajari Pertemuan Ini?
          </h3>
          <p className="text-xs text-indigo-700 mt-0.5">
            Tandai selesai untuk menyimpan progres belajar Anda dan klaim +75 XP ke akun Anda.
          </p>
        </div>

        <Button
          onClick={handleComplete}
          disabled={completed}
          className={`shrink-0 font-semibold shadow-sm ${
            completed
              ? "bg-emerald-600 hover:bg-emerald-600 text-white cursor-default"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {completed ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Bab Selesai (+75 XP)
            </span>
          ) : (
            "Tandai Selesai & Klaim XP"
          )}
        </Button>
      </div>
    </div>
  );
}

