"use client";

import React from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  Sparkles,
  Award,
  Flame,
  CheckCircle2,
  Lock,
  Trophy,
  History,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateLevel, formatDate } from "@/lib/utils";

export default function StudentAchievementsPage() {
  const { user } = useAuth();

  const totalXp = db.getTotalXp(user?.id);
  const { level, currentXp, nextLevelXp, progress } = calculateLevel(totalXp);
  const allBadges = db.getBadges();
  const myStudentBadges = db.getStudentBadges(user?.id);
  const myBadgeIds = myStudentBadges.map((b) => b.badge_id);
  const xpEvents = db.getXpEvents(user?.id);
  const leaderboard = db.getLeaderboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Capaian Belajar & Gamifikasi
        </h1>
        <p className="text-sm text-slate-500">
          Pantau perolehan XP tervalidasi, lencana keahlian, dan peringkat motivasi kelas Anda.
        </p>
      </div>

      {/* Level Hero Widget */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-violet-50 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white font-black text-2xl shadow-md shadow-indigo-100">
              {level}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Tingkat Penguasaan</span>
              <h2 className="text-2xl font-black text-slate-900">Penjelajah Ilmu Tingkat {level}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Total Akumulasi: <strong className="text-indigo-700">{totalXp.toLocaleString()} XP</strong>
              </p>
            </div>
          </div>

          <div className="min-w-[260px] space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">Menuju Tingkat {level + 1}</span>
              <span className="text-indigo-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2.5 bg-indigo-100" />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{currentXp} XP terkumpul</span>
              <span>Butuh {nextLevelXp - currentXp} XP lagi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Badges Collection (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Daftar Lencana Keahlian ({myStudentBadges.length}/{allBadges.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {allBadges.map((badge) => {
                  const isUnlocked = myBadgeIds.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`rounded-xl border p-4 flex items-start gap-3.5 transition-all ${
                        isUnlocked
                          ? "border-amber-200 bg-amber-50/40 shadow-2xs"
                          : "border-slate-200 bg-slate-50/50 opacity-60"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                          isUnlocked
                            ? "bg-amber-100 text-amber-700 shadow-2xs"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {isUnlocked ? "🏆" : <Lock className="h-4 w-4" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900">{badge.name}</h4>
                          <Badge variant={isUnlocked ? "success" : "outline"} className="text-[9px]">
                            {isUnlocked ? "Terbuka" : "Terkunci"}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{badge.description}</p>
                        <span className="text-[10px] font-semibold text-amber-700 block pt-0.5">
                          Bonus: +{badge.xp_bonus} XP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* XP History Log */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <History className="h-4 w-4 text-indigo-600" />
                Catatan Transaksi XP (Server Verified)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {xpEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800 capitalize">
                      {evt.event_type.replace("_", " ")}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Key: {evt.idempotency_key.substring(0, 32)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600">+{evt.xp_delta} XP</span>
                    <p className="text-[10px] text-slate-400">{formatDate(evt.created_at)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Class Leaderboard */}
        <div>
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                Papan Peringkat Kelas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {leaderboard.map((item) => {
                const isMe = item.student.id === user?.id;
                return (
                  <div
                    key={item.student.id}
                    className={`flex items-center justify-between rounded-xl p-3 text-xs transition-colors ${
                      isMe
                        ? "bg-indigo-50 border border-indigo-200 font-semibold"
                        : "bg-white border border-slate-100"
                    }`}
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
                        <span className="text-slate-900 block font-bold">
                          {item.student.full_name} {isMe && "(Anda)"}
                        </span>
                        <span className="text-[10px] text-slate-400">Level {item.level}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-indigo-700">{item.totalXp.toLocaleString()} XP</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

