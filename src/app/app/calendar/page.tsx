"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Calendar, Clock, MapPin, AlertCircle, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function CalendarPage() {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState<string>("Semua");

  const classes = db.getClasses(user || undefined);
  const classSubjects = db.getClassSubjects();
  const assignments = db.getAssignments();
  const quizzes = db.getQuizzes();

  // Filter schedules belonging to user classes
  const myClassIds = classes.map((c) => c.id);
  const mySchedules = classSubjects.filter((cs) => myClassIds.includes(cs.class_id));

  const daysOfWeek = ["Semua", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const filteredSchedules =
    selectedDay === "Semua"
      ? mySchedules
      : mySchedules.filter((s) => s.schedule_day === selectedDay);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Kalender & Agenda Belajar</h1>
        <p className="text-sm text-slate-500">Jadwal tatap muka, deadline tugas, dan periode ujian kelas Anda.</p>
      </div>

      {/* Day Filter */}
      <div className="flex flex-wrap gap-2">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              selectedDay === day
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Timetable */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  Jadwal Pertemuan Kelas ({filteredSchedules.length})
                </CardTitle>
                <span className="text-xs text-slate-400">Tahun Ajaran 2026/2027</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {filteredSchedules.length === 0 ? (
                <p className="text-center py-8 text-xs text-slate-400">
                  Tidak ada jadwal mata pelajaran pada hari yang dipilih.
                </p>
              ) : (
                filteredSchedules.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 hover:border-indigo-200 transition-colors bg-white shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="indigo" className="text-[10px]">
                          {item.schedule_day || "Senin"}
                        </Badge>
                        <span className="text-xs font-semibold text-slate-500">
                          {item.class?.name}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{item.subject?.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span>Guru: {item.teacher?.full_name || "-"}</span>
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-end gap-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 shrink-0">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <Clock className="h-3.5 w-3.5 text-indigo-600" />
                        <span>{item.schedule_time_start || "08:00"} - {item.schedule_time_end || "09:30"} WIB</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                        <MapPin className="h-3 w-3" />
                        <span>{item.room || "Ruang Kelas"}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Deadlines & Quizzes Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Assignment Deadlines */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Tenggat Tugas Mendatang
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {assignments.map((asg) => (
                <div key={asg.id} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3 text-xs space-y-1">
                  <span className="font-semibold text-slate-800 line-clamp-1">{asg.title}</span>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Batas: {formatDate(asg.due_at)}</span>
                    <Badge variant={asg.my_submission ? "success" : "warning"} className="text-[9px]">
                      {asg.my_submission ? "Terkumpul" : "Belum"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quizzes Agenda */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                Jadwal Evaluasi & Kuis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3 text-xs space-y-1">
                  <span className="font-semibold text-slate-800 line-clamp-1">{quiz.title}</span>
                  <p className="text-[11px] text-slate-500">Durasi: {quiz.duration_minutes} Menit</p>
                  <p className="text-[10px] text-slate-400">Tutup: {formatDate(quiz.closes_at)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
