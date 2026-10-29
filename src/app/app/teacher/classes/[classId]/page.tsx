"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  FolderTree,
  Users,
  BookOpen,
  ArrowLeft,
  Clock,
  ShieldAlert,
  UserCheck,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function TeacherClassDetailPage() {
  const params = useParams();
  const classId = params?.classId as string;
  const { user } = useAuth();

  const cls = db.getClassById(classId);

  // Authorization check: Teacher must be assigned to this class, or user must be Admin!
  const myClasses = db.getClasses(user || undefined);
  const isAuthorized = myClasses.some((c) => c.id === classId) || user?.role === "admin";

  if (!cls || !isAuthorized) {
    return (
      <div className="text-center py-16 space-y-4 max-w-md mx-auto">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Akses Kelas Ditolak</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Anda tidak ditugaskan sebagai pengampu pada kelas ini. Sesuai kebijakan sekolah, guru hanya dapat mengakses kelas binaan resmi.
        </p>
        <Link href="/app/teacher/classes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Kelas Saya
          </Button>
        </Link>
      </div>
    );
  }

  const enrollments = db.getEnrollments(classId);
  const classSubjects = db.getClassSubjects(classId);

  return (
    <div className="space-y-6">
      <Link
        href="/app/teacher/classes"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Daftar Kelas Binaan
      </Link>

      {/* Class Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="indigo" className="text-xs">
            Tahun Ajaran {cls.academic_year}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">{cls.grade_level}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {cls.name}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          {cls.description || "Rombongan belajar terpadu kurikulum MIPA dan Teknologi Terapan."}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student Roster (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600" />
                Daftar Siswa Terdaftar (Roster) ({enrollments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal Masuk</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enr) => (
                    <TableRow key={enr.id}>
                      <TableCell className="font-semibold text-slate-800 flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {enr.student?.full_name?.substring(0, 2).toUpperCase()}
                        </div>
                        <span>{enr.student?.full_name}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success" className="text-[10px] capitalize">
                          {enr.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {formatDate(enr.joined_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-xs font-medium text-indigo-600">Terdaftar</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Timetable / Subjects in this Class (1 Col) */}
        <div>
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                Mata Pelajaran di Kelas Ini
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {classSubjects.map((cs) => (
                <div key={cs.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {cs.subject?.code}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{cs.subject?.name}</h4>
                  <p className="text-xs text-slate-500">Pengampu: {cs.teacher?.full_name}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-1 font-medium">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>{cs.schedule_day || "Senin"}, {cs.schedule_time_start} - {cs.schedule_time_end} WIB</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

