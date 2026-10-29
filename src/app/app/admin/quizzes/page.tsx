"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { HelpCircle, Clock, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function AdminQuizzesPage() {
  const { user } = useAuth();
  const quizzes = db.getQuizzes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Kuis & Ujian Sekolah (Admin Overview)
        </h1>
        <p className="text-sm text-slate-500">
          Daftar seluruh asesmen, durasi pengerjaan, dan rekapitulasi ujian sekolah.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kuis</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead>Jumlah Soal</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-bold text-slate-900">
                    {q.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="indigo" className="text-[10px]">
                      {q.class_subject?.subject?.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-700">
                    {q.class_subject?.class?.name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {q.duration_minutes} Menit
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {q.questions?.length || 0} Soal
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/app/teacher/quizzes/${q.id}/results`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        Lihat Rekap Hasil
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
