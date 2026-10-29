"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { ClipboardList, Users, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function AdminAssignmentsPage() {
  const { user } = useAuth();
  const assignments = db.getAssignments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Seluruh Penugasan Sekolah (Admin Overview)
        </h1>
        <p className="text-sm text-slate-500">
          Pantau seluruh tugas aktif, tingkat pengumpulan siswa, dan tenggat waktu lintas kelas.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Tugas</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Tenggat Waktu</TableHead>
                <TableHead>Pengumpulan</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((asg) => {
                const subs = db.getSubmissions(asg.id);
                return (
                  <TableRow key={asg.id}>
                    <TableCell className="font-bold text-slate-900">
                      {asg.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="indigo" className="text-[10px]">
                        {asg.class_subject?.subject?.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-700">
                      {asg.class_subject?.class?.name}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(asg.due_at)}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-slate-700">
                      {subs.length} Terkumpul
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/app/teacher/assignments/${asg.id}/submissions`}>
                        <Button variant="outline" size="sm" className="text-xs">
                          Buka Submission
                        </Button>
                      </Link>
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
