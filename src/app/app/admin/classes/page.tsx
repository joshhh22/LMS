"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { FolderTree, PlusCircle, Users, BookOpen, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminClassesPage() {
  const { user } = useAuth();
  const [classes, setClasses] = useState(db.getClasses());

  // Dialog State
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [academicYear, setAcademicYear] = useState("2026/2027");
  const [gradeLevel, setGradeLevel] = useState("Kelas 10");
  const [description, setDescription] = useState("");

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    db.createClass(name, academicYear, gradeLevel, description);
    setClasses(db.getClasses());
    setName("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Manajemen Rombongan Belajar (Kelas)
          </h1>
          <p className="text-sm text-slate-500">
            Kelola seluruh kelas, tingkat jenjang, dan tahun ajaran aktif di sekolah.
          </p>
        </div>

        {/* Create Class Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Tambah Kelas Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Buat Kelas Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateClass} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="clsName">Nama Kelas</Label>
                <Input
                  id="clsName"
                  placeholder="Contoh: Kelas 11-IPA 1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="clsYear">Tahun Ajaran</Label>
                  <Input
                    id="clsYear"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="mt-1 text-xs"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clsGrade">Tingkat Jenjang</Label>
                  <Input
                    id="clsGrade"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="mt-1 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="clsDesc">Keterangan / Jurusan</Label>
                <Input
                  id="clsDesc"
                  placeholder="Peminatan Matematika & IPA..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" size="sm" className="bg-indigo-600 text-white">
                  Simpan Kelas
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {classes.map((cls) => {
          const enrollments = db.getEnrollments(cls.id);
          const classSubjects = db.getClassSubjects(cls.id);
          return (
            <Card key={cls.id} className="shadow-sm hover:border-indigo-300 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="indigo" className="text-[10px]">
                    Tahun Ajaran {cls.academic_year}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-400">
                    {cls.grade_level}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-slate-900">{cls.name}</CardTitle>
                <p className="text-xs text-slate-500 mt-1">{cls.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span><strong>{enrollments.length}</strong> Siswa Terdaftar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    <span><strong>{classSubjects.length}</strong> Mapel Terhubung</span>
                  </div>
                </div>

                <Link href={`/app/teacher/classes/${cls.id}`} className="block">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Buka Detail & Roster Siswa <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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

