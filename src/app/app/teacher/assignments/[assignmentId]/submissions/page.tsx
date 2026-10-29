"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  ClipboardList,
  ArrowLeft,
  Users,
  Clock,
  Award,
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";

export default function AssignmentSubmissionsPage() {
  const params = useParams();
  const assignmentId = params?.assignmentId as string;
  const { user } = useAuth();

  const assignment = db.getAssignmentById(assignmentId);

  if (!assignment) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Tugas Tidak Ditemukan</h2>
        <Link href="/app/teacher/assignments">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Tugas
          </Button>
        </Link>
      </div>
    );
  }

  const submissions = db.getSubmissions(assignmentId);

  return (
    <div className="space-y-6">
      <Link
        href="/app/teacher/assignments"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Daftar Tugas
      </Link>

      {/* Assignment Header Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="indigo" className="text-xs">
            {assignment.class_subject?.subject?.name}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">
            {assignment.class_subject?.class?.name}
          </span>
          <span className="text-xs text-slate-500 ml-auto flex items-center gap-1 font-medium">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            Tenggat: {formatDate(assignment.due_at)}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {assignment.title}
        </h1>
        <p className="text-xs text-slate-600 line-clamp-2">{assignment.instructions}</p>
      </div>

      {/* Submissions Table */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            Lembar Submission Siswa ({submissions.length})
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Skor Maks: <strong>{assignment.max_score}</strong></span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {submissions.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={ClipboardList}
                title="Belum Ada Siswa Mengumpulkan"
                description="Jawaban tugas siswa akan otomatis muncul di tabel ini begitu siswa menekan tombol kumpulkan."
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Waktu Dikumpulkan</TableHead>
                  <TableHead>Status Evaluasi</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => {
                  const isGraded = sub.status === "graded";
                  return (
                    <TableRow key={sub.id}>
                      <TableCell className="font-semibold text-slate-800 flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {sub.student?.full_name?.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span>{sub.student?.full_name}</span>
                          <span className="block text-[11px] text-slate-400">
                            {sub.file_name ? `Berkas: ${sub.file_name}` : "Jawaban Teks"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {formatDate(sub.submitted_at)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={isGraded ? "success" : "warning"}
                          className="text-[10px]"
                        >
                          {isGraded ? "Telah Dinilai" : "Menunggu Evaluasi"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {isGraded ? (
                          <span className="font-extrabold text-sm text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                            {sub.score} / {assignment.max_score}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/app/teacher/submissions/${sub.id}/review`}>
                          <Button size="sm" variant={isGraded ? "outline" : "default"} className="text-xs">
                            {isGraded ? "Edit Nilai" : "Beri Nilai & Review"}
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
