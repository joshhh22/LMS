"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { BookOpen, Layers, Clock, ArrowRight, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const courses = db.getCourses();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Materi & Modul Pembelajaran</h1>
        <p className="text-sm text-slate-500">
          Akses seluruh materi kurikulum, modul interaktif, dan video tutorial kelas Anda.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const lessonCount = course.lessons?.length || 0;
          return (
            <Card key={course.id} className="flex flex-col justify-between hover:border-indigo-300 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="indigo" className="text-[10px]">
                    {course.class_subject?.subject?.name || "Mata Pelajaran"}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {course.class_subject?.class?.name}
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-slate-900 line-clamp-2">
                  {course.title}
                </CardTitle>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {course.description || "Modul pembelajaran mendalam disertai materi pegangan dan latihan terarah."}
                </p>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-indigo-600" />
                    {lessonCount} Pertemuan / Bab
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    {course.class_subject?.teacher?.full_name?.split(",")[0] || "Guru"}
                  </span>
                </div>
                <Link href={`/app/student/courses/${course.id}`} className="block">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                    Buka Modul Belajar <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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
