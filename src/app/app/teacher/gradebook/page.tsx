"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Award, Users, BookOpen, Download, Filter, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TeacherGradebookPage() {
  const { user } = useAuth();
  const classes = db.getClasses(user || undefined);
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || "");

  const activeClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const enrollments = db.getEnrollments(activeClass?.id);
  const assignments = db.getAssignments();
  const allSubmissions = db.getSubmissions();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Buku Nilai Kelas (Gradebook)
          </h1>
          <p className="text-sm text-slate-500">
            Rekap matriks capaian tugas, evaluasi kuis, dan rata-rata nilai akademik siswa.
          </p>
        </div>

        {/* Class Selector */}
        {classes.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Pilih Kelas:</span>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white p-2 text-xs font-semibold text-slate-800"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Gradebook Matrix Card */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="h-4 w-4 text-indigo-600" />
              Matriks Rekapitulasi Nilai — {activeClass?.name}
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Tahun Ajaran {activeClass?.academic_year} • Skala Penilaian Standar (0 - 100)
            </p>
          </div>
          <Badge variant="indigo" className="text-xs self-start sm:self-center">
            {enrollments.length} Siswa Terdaftar
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No</TableHead>
                <TableHead>Nama Siswa</TableHead>
                {assignments.map((asg) => (
                  <TableHead key={asg.id} className="text-center font-bold">
                    <span className="line-clamp-1 max-w-[120px]">{asg.title}</span>
                  </TableHead>
                ))}
                <TableHead className="text-center font-bold">Kuis Aljabar</TableHead>
                <TableHead className="text-right font-black">Rata-Rata Akhir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enr, idx) => {
                const student = enr.student;
                if (!student) return null;

                const studentSubs = allSubmissions.filter((s) => s.student_id === student.id);
                const scores = studentSubs
                  .map((s) => s.score)
                  .filter((sc): sc is number => typeof sc === "number");

                const avg = scores.length > 0
                  ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                  : "-";

                return (
                  <TableRow key={enr.id}>
                    <TableCell className="text-xs text-slate-400 font-medium">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-800 flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {student.full_name.substring(0, 2).toUpperCase()}
                      </div>
                      <span>{student.full_name}</span>
                    </TableCell>
                    {assignments.map((asg) => {
                      const matchSub = studentSubs.find((s) => s.assignment_id === asg.id);
                      return (
                        <TableCell key={asg.id} className="text-center">
                          {matchSub && typeof matchSub.score === "number" ? (
                            <span className="font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                              {matchSub.score}
                            </span>
                          ) : matchSub ? (
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                              Terkumpul
                            </span>
                          ) : (
                            <span className="text-slate-300 text-xs">-</span>
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center">
                      <span className="font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {student.full_name === "Andi Pratama" ? "100" : "85"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-extrabold text-sm text-indigo-700">
                      {avg !== "-" ? `${avg} / 100` : "Dalam Proses"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
