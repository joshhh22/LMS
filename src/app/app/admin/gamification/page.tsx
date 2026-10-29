"use client";

import React from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Sparkles, Award, Trophy, ShieldCheck, Flame } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminGamificationPage() {
  const { user } = useAuth();
  const badges = db.getBadges();
  const leaderboard = db.getLeaderboard();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Konfigurasi Gamifikasi, XP & Lencana
        </h1>
        <p className="text-sm text-slate-500">
          Pengaturan sistem poin pengalaman (XP), aturan idempotensi server, dan penerbitan lencana prestasi.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Badges Matrix */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              Katalog Lencana Prestasi Terdaftar ({badges.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Lencana</TableHead>
                  <TableHead>Deskripsi Kriteria</TableHead>
                  <TableHead className="text-right">Bonus XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {badges.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs text-indigo-700 font-bold">
                      {b.code}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900">{b.name}</TableCell>
                    <TableCell className="text-xs text-slate-500 max-w-xs">{b.description}</TableCell>
                    <TableCell className="text-right font-bold text-xs text-emerald-700">
                      +{b.xp_bonus} XP
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Global Leaderboard View */}
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              Papan Peringkat Platform (Leaderboard)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {leaderboard.map((item) => (
              <div
                key={item.student.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      item.rank === 1
                        ? "bg-amber-100 text-amber-700"
                        : item.rank === 2
                        ? "bg-slate-200 text-slate-700"
                        : item.rank === 3
                        ? "bg-orange-100 text-orange-700"
                        : "text-slate-400"
                    }`}
                  >
                    {item.rank}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{item.student.full_name}</span>
                    <span className="text-[10px] text-slate-400">Tingkat Kemahiran Level {item.level}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-indigo-700">{item.totalXp.toLocaleString()} XP</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

