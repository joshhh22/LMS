"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  ClipboardList,
  PlusCircle,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
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
import { formatDate } from "@/lib/utils";

export default function TeacherAssignmentsPage() {
  const { user } = useAuth();
  const assignments = db.getAssignments();
  const classSubjects = db.getClassSubjects();

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClassSubjectId, setSelectedClassSubjectId] = useState(classSubjects[0]?.id || "");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDays, setDueDays] = useState(7);
  const [maxScore, setMaxScore] = useState(100);
  const [allowLate, setAllowLate] = useState(true);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedClassSubjectId) return;

    const dueDate = new Date(Date.now() + dueDays * 86400000).toISOString();

    db.createAssignment({
      class_subject_id: selectedClassSubjectId,
      title,
      instructions,
      due_at: dueDate,
      max_score: maxScore,
      allow_late_submission: allowLate,
    });

    setTitle("");
    setInstructions("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Penugasan & Evaluasi Siswa
          </h1>
          <p className="text-sm text-slate-500">
            Kelola tugas kelas, tetapkan instruksi, deadline, dan evaluasi hasil pekerjaan siswa.
          </p>
        </div>

        {/* Create Assignment Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Buat Tugas Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Buat Tugas Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateAssignment} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="asgCs">Kelas & Mata Pelajaran</Label>
                <select
                  id="asgCs"
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
                <Label htmlFor="asgTitle">Judul Tugas</Label>
                <Input
                  id="asgTitle"
                  placeholder="Contoh: Tugas 2: Analisis Vektor & Gerak Parabola"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 text-xs"
                  required
                />
              </div>

              <div>
                <Label htmlFor="asgInstructions">Instruksi & Kriteria Penilaian</Label>
                <Textarea
                  id="asgInstructions"
                  placeholder="Jelaskan pertanyaan atau berkas yang harus diunggah siswa..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="mt-1 min-h-[100px] text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="asgDue">Tenggat Waktu (Hari dari sekarang)</Label>
                  <Input
                    id="asgDue"
                    type="number"
                    value={dueDays}
                    onChange={(e) => setDueDays(Number(e.target.value))}
                    className="mt-1 text-xs"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="asgScore">Skor Maksimal</Label>
                  <Input
                    id="asgScore"
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(Number(e.target.value))}
                    className="mt-1 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="asgLate"
                  type="checkbox"
                  checked={allowLate}
                  onChange={(e) => setAllowLate(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="asgLate" className="text-xs text-slate-700 cursor-pointer">
                  Izinkan pengumpulan tugas terlambat (Late Submission)
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" size="sm" className="bg-indigo-600 text-white">
                  Publikasikan Tugas
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assignment Cards */}
      <div className="space-y-4">
        {assignments.map((asg) => {
          const allSubs = db.getSubmissions(asg.id);
          const gradedCount = allSubs.filter((s) => s.status === "graded").length;
          const pendingCount = allSubs.filter((s) => s.status === "submitted").length;

          return (
            <Card key={asg.id} className="hover:border-indigo-300 transition-colors shadow-sm">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="indigo" className="text-[10px]">
                      {asg.class_subject?.subject?.name}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">
                      {asg.class_subject?.class?.name}
                    </span>
                    <Badge variant="success" className="text-[10px]">
                      Terpublikasi
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{asg.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl">{asg.instructions}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      Tenggat: <strong>{formatDate(asg.due_at)}</strong>
                    </span>
                    <span>Skor Maks: {asg.max_score}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end gap-3 shrink-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-amber-800 font-bold border border-amber-200">
                      {pendingCount} Perlu Dinilai
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-600 font-semibold">
                      {allSubs.length} Terkumpul
                    </span>
                  </div>

                  <Link href={`/app/teacher/assignments/${asg.id}/submissions`}>
                    <Button size="sm" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                      Buka Lembar Submission ({allSubs.length}) <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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

