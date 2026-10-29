"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { ClipboardList, Clock, ArrowRight, CheckCircle2, AlertCircle, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function StudentAssignmentsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "pending" | "submitted">("all");

  const assignments = db.getAssignments();

  const filtered = assignments.filter((asg) => {
    if (filter === "pending") return !asg.my_submission;
    if (filter === "submitted") return !!asg.my_submission;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tugas Pembelajaran</h1>
          <p className="text-sm text-slate-500">
            Daftar tugas, lembar kerja siswa, batas pengumpulan, dan nilai dari guru.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex rounded-lg bg-slate-100 p-1 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${filter === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}
          >
            Semua ({assignments.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${filter === "pending" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}
          >
            Belum Dikumpulkan ({assignments.filter((a) => !a.my_submission).length})
          </button>
          <button
            onClick={() => setFilter("submitted")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${filter === "submitted" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}
          >
            Selesai ({assignments.filter((a) => !!a.my_submission).length})
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((asg) => {
          const isSubmitted = !!asg.my_submission;
          const isGraded = asg.my_submission?.status === "graded";
          return (
            <Card key={asg.id} className="hover:border-indigo-200 transition-colors">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="indigo" className="text-[10px]">
                      {asg.class_subject?.subject?.name}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">
                      {asg.class_subject?.class?.name}
                    </span>
                    {isGraded ? (
                      <Badge variant="success" className="text-[10px]">
                        Dinilai ({asg.my_submission?.score}/100)
                      </Badge>
                    ) : isSubmitted ? (
                      <Badge variant="indigo" className="text-[10px]">
                        Terkumpul
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="text-[10px]">
                        Menunggu Pengumpulan
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{asg.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl">{asg.instructions}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      Batas Waktu: <strong>{formatDate(asg.due_at)}</strong>
                    </span>
                    <span>Skor Maks: {asg.max_score}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
                  {isGraded && (
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Nilai Anda:</span>
                      <p className="text-xl font-extrabold text-indigo-700">{asg.my_submission?.score}/100</p>
                    </div>
                  )}
                  <Link href={`/app/student/assignments/${asg.id}`}>
                    <Button
                      size="sm"
                      variant={isSubmitted ? "outline" : "default"}
                      className="w-full sm:w-auto text-xs"
                    >
                      {isSubmitted ? "Lihat Submission" : "Kumpulkan Tugas"}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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

