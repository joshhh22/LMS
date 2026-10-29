"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  HelpCircle,
  PlusCircle,
  Clock,
  ArrowRight,
  Award,
  Users,
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

export default function TeacherQuizzesPage() {
  const { user } = useAuth();
  const quizzes = db.getQuizzes();
  const classSubjects = db.getClassSubjects();

  // Create quiz state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCs, setSelectedCs] = useState(classSubjects[0]?.id || "");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [duration, setDuration] = useState(25);
  const [maxAttempts, setMaxAttempts] = useState(2);

  // Question 1
  const [q1Prompt, setQ1Prompt] = useState("");
  const [q1OptA, setQ1OptA] = useState("");
  const [q1OptB, setQ1OptB] = useState("");
  const [q1OptC, setQ1OptC] = useState("");
  const [q1Correct, setQ1Correct] = useState("A");

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedCs) return;

    db.createQuiz({
      class_subject_id: selectedCs,
      title,
      instructions,
      duration_minutes: duration,
      max_attempts: maxAttempts,
      questions: [
        {
          prompt: q1Prompt || "Berapakah hasil 5 x 8 + 12?",
          options: [
            { id: "A", text: q1OptA || "52" },
            { id: "B", text: q1OptB || "48" },
            { id: "C", text: q1OptC || "60" },
          ],
          correct_option_id: q1Correct,
          points: 50,
        },
      ],
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
            Kuis & Bank Soal Evaluasi
          </h1>
          <p className="text-sm text-slate-500">
            Susun paket asesmen objektif dengan timer server-side dan kunci jawaban terenkripsi.
          </p>
        </div>

        {/* Create Quiz Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Buat Kuis Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Buat Kuis & Bank Soal Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateQuiz} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="quizCs">Kelas & Mata Pelajaran</Label>
                <select
                  id="quizCs"
                  value={selectedCs}
                  onChange={(e) => setSelectedCs(e.target.value)}
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
                <Label htmlFor="qTitle">Judul Kuis</Label>
                <Input
                  id="qTitle"
                  placeholder="Contoh: Kuis 2: Pemahaman Trigonometri Dasar"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 text-xs"
                  required
                />
              </div>

              <div>
                <Label htmlFor="qInst">Petunjuk Kuis</Label>
                <Textarea
                  id="qInst"
                  placeholder="Instruksi pengerjaan kuis bagi siswa..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="qDur">Durasi Pengerjaan (Menit)</Label>
                  <Input
                    id="qDur"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="mt-1 text-xs"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="qAtt">Batas Percobaan Siswa</Label>
                  <Input
                    id="qAtt"
                    type="number"
                    value={maxAttempts}
                    onChange={(e) => setMaxAttempts(Number(e.target.value))}
                    className="mt-1 text-xs"
                    required
                  />
                </div>
              </div>

              {/* Sample Question Creator */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 space-y-3">
                <span className="text-xs font-bold text-indigo-900 block">
                  Soal Pilihan Ganda Pertama:
                </span>
                <div>
                  <Label htmlFor="qPrompt" className="text-[11px]">Pertanyaan</Label>
                  <Input
                    id="qPrompt"
                    placeholder="Tulis kalimat pertanyaan..."
                    value={q1Prompt}
                    onChange={(e) => setQ1Prompt(e.target.value)}
                    className="mt-0.5 text-xs bg-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-[10px]">Opsi A</Label>
                    <Input
                      placeholder="Jawaban A"
                      value={q1OptA}
                      onChange={(e) => setQ1OptA(e.target.value)}
                      className="text-xs bg-white mt-0.5"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px]">Opsi B</Label>
                    <Input
                      placeholder="Jawaban B"
                      value={q1OptB}
                      onChange={(e) => setQ1OptB(e.target.value)}
                      className="text-xs bg-white mt-0.5"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px]">Opsi C</Label>
                    <Input
                      placeholder="Jawaban C"
                      value={q1OptC}
                      onChange={(e) => setQ1OptC(e.target.value)}
                      className="text-xs bg-white mt-0.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="qAnsKey" className="text-[11px]">
                    Kunci Jawaban Benar (Dilindungi Server-Side)
                  </Label>
                  <select
                    id="qAnsKey"
                    value={q1Correct}
                    onChange={(e) => setQ1Correct(e.target.value)}
                    className="mt-0.5 w-full rounded-md border border-slate-200 bg-white p-1.5 text-xs font-bold text-indigo-700"
                  >
                    <option value="A">Opsi A</option>
                    <option value="B">Opsi B</option>
                    <option value="C">Opsi C</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" size="sm" className="bg-indigo-600 text-white">
                  Publikasikan Kuis
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quizzes List */}
      <div className="grid md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => {
          return (
            <Card key={quiz.id} className="hover:border-indigo-300 transition-all shadow-sm flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="indigo" className="text-[10px]">
                    {quiz.class_subject?.subject?.name}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {quiz.class_subject?.class?.name}
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-slate-900">{quiz.title}</CardTitle>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {quiz.instructions || "Evaluasi materi berkala dengan penilaian otomatis."}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-indigo-600" />
                    {quiz.duration_minutes} Menit
                  </span>
                  <span>
                    Batas: <strong>{quiz.max_attempts}x Percobaan</strong>
                  </span>
                </div>

                <Link href={`/app/teacher/quizzes/${quiz.id}/results`} className="block">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Users className="mr-1.5 h-3.5 w-3.5 text-indigo-600" />
                    Lihat Rekap Nilai Siswa
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
