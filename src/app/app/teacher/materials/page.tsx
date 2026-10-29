"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  BookOpen,
  PlusCircle,
  Layers,
  FileText,
  Video,
  Clock,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TeacherMaterialsPage() {
  const { user } = useAuth();
  const courses = db.getCourses();
  const classSubjects = db.getClassSubjects();

  // Create course dialog state
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [selectedClassSubjectId, setSelectedClassSubjectId] = useState(classSubjects[0]?.id || "");

  // Create lesson dialog state
  const [isLessonOpen, setIsLessonOpen] = useState(false);
  const [targetCourseId, setTargetCourseId] = useState(courses[0]?.id || "");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonMinutes, setLessonMinutes] = useState(45);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim() || !selectedClassSubjectId) return;

    db.createCourse(selectedClassSubjectId, courseTitle, courseDesc);
    setCourseTitle("");
    setCourseDesc("");
    setIsCourseOpen(false);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !targetCourseId) return;

    db.createLesson(targetCourseId, lessonTitle, lessonContent, lessonMinutes);
    setLessonTitle("");
    setLessonContent("");
    setIsLessonOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Manajemen Materi & Modul Ajar
          </h1>
          <p className="text-sm text-slate-500">
            Susun silabus digital, unggah materi modul, dokumen referensi, dan video penunjang.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {/* Create Course Dialog */}
          <Dialog open={isCourseOpen} onOpenChange={setIsCourseOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs">
                <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Buat Modul Ajar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buat Modul Ajar Baru</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateCourse} className="space-y-4 pt-2">
                <div>
                  <Label htmlFor="csSelect">Pilih Kelas & Mata Pelajaran</Label>
                  <select
                    id="csSelect"
                    value={selectedClassSubjectId}
                    onChange={(e) => setSelectedClassSubjectId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium"
                    required
                  >
                    {classSubjects.map((cs) => (
                      <option key={cs.id} value={cs.id}>
                        {cs.class?.name} — {cs.subject?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="cTitle">Judul Modul</Label>
                  <Input
                    id="cTitle"
                    placeholder="Contoh: Modul 2: Dinamika Gerak Rotasi"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="mt-1 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cDesc">Deskripsi Ringkas</Label>
                  <Textarea
                    id="cDesc"
                    placeholder="Tujuan pembelajaran dan kompetensi dasar modul..."
                    value={courseDesc}
                    onChange={(e) => setCourseDesc(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsCourseOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" size="sm" className="bg-indigo-600 text-white">
                    Simpan Modul
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Create Lesson Dialog */}
          <Dialog open={isLessonOpen} onOpenChange={setIsLessonOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Tambah Pertemuan / Bab
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Pertemuan / Bab Pembelajaran</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateLesson} className="space-y-4 pt-2">
                <div>
                  <Label htmlFor="courseSelect">Pilih Modul Induk</Label>
                  <select
                    id="courseSelect"
                    value={targetCourseId}
                    onChange={(e) => setTargetCourseId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium"
                    required
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.class_subject?.subject?.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="lTitle">Judul Pertemuan / Bab</Label>
                  <Input
                    id="lTitle"
                    placeholder="Contoh: Bab 2.1 — Momen Inersia Benda Tegar"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className="mt-1 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lMin">Estimasi Waktu Belajar (Menit)</Label>
                  <Input
                    id="lMin"
                    type="number"
                    value={lessonMinutes}
                    onChange={(e) => setLessonMinutes(Number(e.target.value))}
                    className="mt-1 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lContent">Uraian Materi Pembelajaran</Label>
                  <Textarea
                    id="lContent"
                    placeholder="Tulis ringkasan teori, rumus, dan penjelasan materi..."
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    className="mt-1 min-h-[120px] text-xs"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsLessonOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" size="sm" className="bg-indigo-600 text-white">
                    Publikasikan Pertemuan
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {courses.map((course) => {
          const lessons = course.lessons || [];
          return (
            <Card key={course.id} className="shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="indigo" className="text-[10px]">
                      {course.class_subject?.subject?.name}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">
                      {course.class_subject?.class?.name}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900">{course.title}</CardTitle>
                  <p className="text-xs text-slate-500 mt-1">{course.description}</p>
                </div>
                <Badge variant="success" className="text-xs shrink-0 self-start sm:self-center">
                  Status: Terpublikasi
                </Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Daftar Pertemuan ({lessons.length} Bab)
                </h4>
                {lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800">{lesson.title}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{lesson.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 shrink-0">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {lesson.estimated_minutes} Menit
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" /> {lesson.materials?.length || 0} Lampiran
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
