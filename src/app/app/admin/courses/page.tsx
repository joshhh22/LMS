"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Layers, PlusCircle, BookOpen, Clock, Users, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function AdminCoursesPage() {
  const { user } = useAuth();
  const courses = db.getCourses();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Modul & Silabus Pembelajaran Sekolah
          </h1>
          <p className="text-sm text-slate-500">
            Pengawasan dan manajemen kurikulum modul ajar seluruh rombongan belajar.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Modul</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Guru Pengampu</TableHead>
                <TableHead>Jumlah Pertemuan</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-bold text-slate-900">
                    {c.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="indigo" className="text-[10px]">
                      {c.class_subject?.subject?.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-700">
                    {c.class_subject?.class?.name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {c.class_subject?.teacher?.full_name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {c.lessons?.length || 0} Bab Terdaftar
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="success" className="text-[10px]">
                      Terpublikasi
                    </Badge>
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
