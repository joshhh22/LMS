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
    <div className="space-y-6">
      {/* Admin Executive Header — Clean Slate-900 */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 sm:p-7 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-0.5 text-xs font-medium text-slate-300 border border-slate-700">
              <Shield className="h-3.5 w-3.5 text-indigo-400" />
              Administrator Utama • Akses Penuh Sistem
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pusat Kendali EduFlow
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-normal leading-relaxed">
              Kelola seluruh entitas sekolah: akun pengguna, rombel kelas, kurikulum ajar, perizinan, dan pemantauan audit keamanan.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link href="/app/admin/users">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">
                <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Kelola Pengguna
              </Button>
            </Link>
            <Link href="/app/admin/audit-logs">
              <Button size="sm" variant="outline" className="border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold">
                <ShieldAlert className="mr-1.5 h-3.5 w-3.5" /> Buka Audit Log
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main KPI Row — Clean Flat Cards */}
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

      {/* Module Navigation Grid */}
      <div>
        <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-600" />
          Akses Langsung Seluruh Modul EduFlow (Admin Privilege)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
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
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 hover:border-slate-300 transition-colors h-full flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{mod.count}</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
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
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-indigo-600" />
            Aktivitas Terkini (Audit Logs)
          </CardTitle>
          <Link href="/app/admin/audit-logs" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
            Lihat Seluruh Log &rarr;
          </Link>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          {auditLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Badge variant="indigo" className="text-[9px] font-mono">
                    {log.action}
                  </Badge>
                  <span className="font-semibold text-slate-800">
                    Oleh: {log.actor?.full_name || "Admin"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  {JSON.stringify(log.metadata)}
                </p>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0">
                {formatDate(log.created_at)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
