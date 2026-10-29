"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Award, Search, Users, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

export default function AdminGradesPage() {
  const { user } = useAuth();
  const allSubmissions = db.getSubmissions();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allSubmissions.filter((s) => {
    const sName = s.student?.full_name || "";
    const aTitle = s.assignment?.title || "";
    return (
      sName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Transkrip Nilai Sekolah (Platform Grade Audit)
        </h1>
        <p className="text-sm text-slate-500">
          Akses pengawasan penuh administrator terhadap seluruh nilai evaluasi tugas dan kuis siswa.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Cari nama siswa atau judul tugas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 text-xs"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Tugas / Evaluasi</TableHead>
                <TableHead>Tanggal Submit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Feedback Guru</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((sub) => {
                const isGraded = sub.status === "graded";
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-semibold text-slate-800">
                      {sub.student?.full_name}
                    </TableCell>
                    <TableCell className="text-xs text-slate-700 font-medium">
                      {sub.assignment?.title}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(sub.submitted_at)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={isGraded ? "success" : "warning"} className="text-[10px]">
                        {isGraded ? "Telah Dinilai" : "Menunggu"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {typeof sub.score === "number" ? (
                        <span className="font-extrabold text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                          {sub.score} / 100
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 max-w-xs truncate">
                      {sub.feedback || "-"}
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
