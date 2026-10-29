"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { db } from "@/lib/store";
import { BookOpen, Layers, Clock, ArrowLeft, ArrowRight, FileText, Video, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.courseId as string;

  const course = db.getCourseById(courseId);

  if (!course) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Modul Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500">Modul materi pembelajaran tidak terdaftar atau belum dipublikasikan.</p>
        <Link href="/app/student/courses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Modul
          </Button>
        </Link>
      </div>
    );
  }

  const lessons = course.lessons || [];

  return (
    <div className="space-y-6">
      <Link
        href="/app/student/courses"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Modul Pembelajaran
      </Link>

      {/* Course Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="indigo" className="text-xs">
            {course.class_subject?.subject?.name}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">
            {course.class_subject?.class?.name} • Pengampu: {course.class_subject?.teacher?.full_name}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{course.title}</h1>
        <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
          {course.description || "Modul kurikulum pembelajaran lengkap dengan silabus, ringkasan teori, dan materi pendukung."}
        </p>
      </div>

      {/* Lessons Outline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-600" />
            Daftar Pertemuan & Bab ({lessons.length})
          </h2>
          <span className="text-xs text-slate-400">Ikuti materi secara berurutan</span>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson, idx) => {
            const materials = lesson.materials || [];
            return (
              <Card key={lesson.id} className="hover:border-indigo-200 transition-colors">
                <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">{lesson.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{lesson.content}</p>
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Est. {lesson.estimated_minutes} Menit
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          {materials.length} Lampiran / Media
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/app/student/lessons/${lesson.id}`} className="shrink-0">
                    <Button size="sm" className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                      Pelajari Bab Ini <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
