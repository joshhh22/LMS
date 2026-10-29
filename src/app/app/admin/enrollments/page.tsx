"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Users, PlusCircle, CheckCircle2, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";

export default function AdminEnrollmentsPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState(db.getEnrollments());
  const classes = db.getClasses();
  const students = db.getProfiles().filter((p) => p.role === "student");

  // Dialog State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || "");
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "");

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !selectedStudentId) return;

    db.enrollStudent(selectedClassId, selectedStudentId);
    setEnrollments(db.getEnrollments());
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Pendaftaran Siswa (Enrollment)
          </h1>
          <p className="text-sm text-slate-500">
            Kelola penempatan rombel kelas dan status keaktifan akademik seluruh siswa.
          </p>
        </div>

        {/* Enroll Student Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Tempatkan Siswa ke Kelas
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Daftarkan Siswa ke Kelas</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEnroll} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="enrStudent">Pilih Siswa</Label>
                <select
                  id="enrStudent"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-semibold"
                  required
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.full_name} ({st.id.substring(0, 8)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="enrClass">Pilih Kelas Sasaran</Label>
                <select
                  id="enrClass"
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-semibold"
                  required
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.academic_year})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" size="sm" className="bg-indigo-600 text-white">
                  Konfirmasi Pendaftaran
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enrollments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Rombel Kelas</TableHead>
                <TableHead>Tahun Ajaran</TableHead>
                <TableHead>Status Akademik</TableHead>
                <TableHead className="text-right">Tanggal Bergabung</TableHead>
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
                  <TableCell className="font-bold text-slate-900">
                    {enr.class?.name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {enr.class?.academic_year}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" className="text-[10px] capitalize">
                      {enr.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-400 text-right">
                    {formatDate(enr.joined_at)}
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

