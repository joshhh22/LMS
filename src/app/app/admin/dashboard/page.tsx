"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  Shield,
  Users,
  FolderTree,
  BookOpen,
  ClipboardList,
  HelpCircle,
  Award,
  Sparkles,
  BarChart3,
  Calendar,
  Bell,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  PlusCircle,
  Layers,
  Settings,
} from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const { user } = useAuth();

  const profiles = db.getProfiles();
  const students = profiles.filter((p) => p.role === "student");
  const teachers = profiles.filter((p) => p.role === "teacher");
  const classes = db.getClasses();
  const subjects = db.getSubjects();
  const courses = db.getCourses();
  const assignments = db.getAssignments();
  const submissions = db.getSubmissions();
  const quizzes = db.getQuizzes();
  const auditLogs = db.getAuditLogs();

  return (
    <div className="space-y-8">
      {/* Admin Executive Header (Chunky Tactile Clay Hero) */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-[0_16px_36px_-6px_rgba(30,27,75,0.4),inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/25 px-3.5 py-1 text-xs font-bold text-indigo-300 border border-indigo-400/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
              <Shield className="h-3.5 w-3.5 text-indigo-400" />
              Administrator Utama • Akses Penuh Sistem
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-xs">
              Pusat Kendali EduFlow
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Kelola seluruh entitas sekolah: akun pengguna, rombel kelas, kurikulum ajar, perizinan, dan pemantauan audit keamanan.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/app/admin/users">
              <Button size="sm" className="clay-btn-primary text-xs font-bold">
                <PlusCircle className="mr-1.5 h-4 w-4" /> Kelola Pengguna
              </Button>
            </Link>
            <Link href="/app/admin/audit-logs">
              <Button size="sm" variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <ShieldAlert className="mr-1.5 h-4 w-4" /> Buka Audit Log
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main KPI Row (Chunky 3D Clay Stat Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pengguna"
          value={profiles.length}
          subtitle={`${students.length} Siswa • ${teachers.length} Guru`}
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="Kelas Aktif"
          value={classes.length}
          subtitle="Tahun Ajaran 2026/2027"
          icon={FolderTree}
          color="blue"
        />
        <StatCard
          title="Mata Pelajaran"
          value={subjects.length}
          subtitle="Kurikulum Terdaftar"
          icon={BookOpen}
          color="emerald"
        />
        <StatCard
          title="Tugas & Kuis"
          value={assignments.length + quizzes.length}
          subtitle={`${submissions.length} Pengumpulan Siswa`}
          icon={ClipboardList}
          color="violet"
        />
      </div>

      {/* Module Navigation Grid (Full System Navigation with Chunky Clay Tiles) */}
      <div>
        <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
            <Layers className="h-4 w-4" />
          </div>
          Akses Langsung Seluruh Modul EduFlow (Admin Privilege)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { title: "Manajemen Pengguna", href: "/app/admin/users", icon: Users, count: `${profiles.length} Akun` },
            { title: "Daftar Kelas", href: "/app/admin/classes", icon: FolderTree, count: `${classes.length} Rombel` },
            { title: "Mata Pelajaran", href: "/app/admin/subjects", icon: BookOpen, count: `${subjects.length} Mapel` },
            { title: "Pendaftaran Siswa", href: "/app/admin/enrollments", icon: Award, count: "Enrollment" },
            { title: "Modul & Pelajaran", href: "/app/admin/courses", icon: Layers, count: `${courses.length} Modul` },
            { title: "Materi & Dokumen", href: "/app/admin/materials", icon: ClipboardList, count: "Storage" },
            { title: "Tugas Siswa", href: "/app/admin/assignments", icon: ClipboardList, count: `${assignments.length} Tugas` },
            { title: "Kuis & Asesmen", href: "/app/admin/quizzes", icon: HelpCircle, count: `${quizzes.length} Kuis` },
            { title: "Buku Nilai Sekolah", href: "/app/admin/grades", icon: Award, count: "Transkrip" },
            { title: "Kalender & Agenda", href: "/app/admin/calendar", icon: Calendar, count: "Jadwal" },
            { title: "Pusat Pengumuman", href: "/app/admin/announcements", icon: Bell, count: "Broadcast" },
            { title: "Moderasi Diskusi", href: "/app/admin/discussions", icon: MessageSquare, count: "Forum" },
            { title: "Gamifikasi & XP", href: "/app/admin/gamification", icon: Sparkles, count: "Badges" },
            { title: "Analitik Platform", href: "/app/admin/analytics", icon: BarChart3, count: "Statistik" },
            { title: "Audit Log Keamanan", href: "/app/admin/audit-logs", icon: ShieldAlert, count: `${auditLogs.length} Log` },
            { title: "Pengaturan Sistem", href: "/app/admin/settings", icon: Settings, count: "Config" },
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Link key={idx} href={mod.href} className="block group">
                <div className="clay-card rounded-2xl p-4.5 hover:-translate-y-1 transition-all duration-150 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_6px_rgba(99,102,241,0.12)] group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-indigo-700 group-hover:text-white group-hover:shadow-[0_6px_16px_-2px_rgba(99,102,241,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-all">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-lg">{mod.count}</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {mod.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Administrative Audit Logs */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100/80 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
              <ShieldAlert className="h-4 w-4" />
            </div>
            Aktivitas Terkini (Audit Logs)
          </CardTitle>
          <Link href="/app/admin/audit-logs" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
            Lihat Seluruh Log &rarr;
          </Link>
        </CardHeader>
        <CardContent className="p-5 space-y-2.5">
          {auditLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between rounded-2xl border border-white/90 bg-[#F8FAFD] p-3.5 text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_6px_rgba(100,116,139,0.03)]"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="indigo" className="text-[9px] font-mono font-bold">
                    {log.action}
                  </Badge>
                  <span className="font-bold text-slate-800">
                    Oleh: {log.actor?.full_name || "Admin"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  {JSON.stringify(log.metadata)}
                </p>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold shrink-0">
                {formatDate(log.created_at)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
