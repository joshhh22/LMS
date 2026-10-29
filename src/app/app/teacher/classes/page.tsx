"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { FolderTree, Users, BookOpen, ArrowRight, Calendar, UserCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TeacherClassesPage() {
  const { user } = useAuth();
  const classes = db.getClasses(user || undefined);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Kelas Binaan Saya</h1>
        <p className="text-sm text-slate-500">
          Kelola rombongan belajar, daftar siswa terdaftar, serta mata pelajaran yang Anda ampu.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {classes.map((cls) => {
          const enrollments = db.getEnrollments(cls.id);
          const classSubjects = db.getClassSubjects(cls.id);
          return (
            <Card key={cls.id} className="hover:border-indigo-300 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="indigo" className="text-[10px]">
                    Tahun Ajaran {cls.academic_year}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-400">
                    {cls.grade_level || "Tingkat Menengah"}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-slate-900">{cls.name}</CardTitle>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {cls.description || "Kelas peminatan kurikulum unggulan."}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span><strong>{enrollments.length}</strong> Siswa Aktif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    <span><strong>{classSubjects.length}</strong> Mata Pelajaran</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Link href={`/app/teacher/classes/${cls.id}`} className="flex-1">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                      Buka Roster & Detail Kelas <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
