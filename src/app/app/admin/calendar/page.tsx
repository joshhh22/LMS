"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Calendar, Clock, MapPin, PlusCircle, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminCalendarPage() {
  const { user } = useAuth();
  const classSubjects = db.getClassSubjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Kalender & Jadwal Akademik Seluruh Sekolah
        </h1>
        <p className="text-sm text-slate-500">
          Pengawasan alokasi ruang, jadwal pertemuan mapel, dan kalender kegiatan sekolah.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hari</TableHead>
                <TableHead>Waktu Belajar</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Guru Pengampu</TableHead>
                <TableHead className="text-right">Ruangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classSubjects.map((cs) => (
                <TableRow key={cs.id}>
                  <TableCell>
                    <Badge variant="indigo" className="text-xs">
                      {cs.schedule_day || "Senin"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-slate-800">
                    {cs.schedule_time_start} - {cs.schedule_time_end} WIB
                  </TableCell>
                  <TableCell className="font-bold text-slate-900">
                    {cs.class?.name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-700">
                    {cs.subject?.name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {cs.teacher?.full_name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 text-right">
                    {cs.room || "Ruang Kelas"}
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
