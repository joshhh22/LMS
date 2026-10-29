"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  Award,
  Calendar,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
  Bell,
  Sparkles,
  ClipboardList,
  FolderTree,
  LogOut,
  Layers,
} from "lucide-react";
import { RoleBadge } from "@/components/shared/role-badge";

export function Sidebar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();

  const getNavItems = () => {
    if (role === "admin") {
      return [
        {
          group: "Utama",
          items: [
            { label: "Dashboard Admin", href: "/app/admin/dashboard", icon: LayoutDashboard },
            { label: "Analitik Platform", href: "/app/admin/analytics", icon: BarChart3 },
          ],
        },
        {
          group: "Manajemen Akademik",
          items: [
            { label: "Pengguna & Akun", href: "/app/admin/users", icon: Users },
            { label: "Daftar Kelas", href: "/app/admin/classes", icon: FolderTree },
            { label: "Mata Pelajaran", href: "/app/admin/subjects", icon: BookOpen },
            { label: "Pendaftaran Siswa", href: "/app/admin/enrollments", icon: GraduationCap },
            { label: "Modul & Pelajaran", href: "/app/admin/courses", icon: Layers },
            { label: "Materi & Dokumen", href: "/app/admin/materials", icon: FileText },
          ],
        },
        {
          group: "Evaluasi & Komunikasi",
          items: [
            { label: "Tugas Siswa", href: "/app/admin/assignments", icon: ClipboardList },
            { label: "Kuis & Ujian", href: "/app/admin/quizzes", icon: HelpCircle },
            { label: "Buku Nilai", href: "/app/admin/grades", icon: Award },
            { label: "Kalender Sekolah", href: "/app/admin/calendar", icon: Calendar },
            { label: "Pengumuman", href: "/app/admin/announcements", icon: Bell },
            { label: "Moderasi Diskusi", href: "/app/admin/discussions", icon: MessageSquare },
          ],
        },
        {
          group: "Sistem & Keamanan",
          items: [
            { label: "Gamifikasi & XP", href: "/app/admin/gamification", icon: Sparkles },
            { label: "Audit Logs", href: "/app/admin/audit-logs", icon: ShieldAlert },
            { label: "Pengaturan Sistem", href: "/app/admin/settings", icon: Settings },
          ],
        },
      ];
    }

    if (role === "teacher") {
      return [
        {
          group: "Aktivitas Mengajar",
          items: [
            { label: "Dashboard Guru", href: "/app/teacher/dashboard", icon: LayoutDashboard },
            { label: "Kelas Binaan Saya", href: "/app/teacher/classes", icon: FolderTree },
            { label: "Materi & Modul", href: "/app/teacher/materials", icon: BookOpen },
            { label: "Tugas & Evaluasi", href: "/app/teacher/assignments", icon: ClipboardList },
            { label: "Kuis & Ujian", href: "/app/teacher/quizzes", icon: HelpCircle },
            { label: "Buku Nilai", href: "/app/teacher/gradebook", icon: Award },
            { label: "Analitik Kelas", href: "/app/teacher/analytics", icon: BarChart3 },
          ],
        },
        {
          group: "Interaksi & Agenda",
          items: [
            { label: "Kalender Mengajar", href: "/app/calendar", icon: Calendar },
            { label: "Diskusi & Tanya Jawab", href: "/app/teacher/discussions", icon: MessageSquare },
            { label: "Pengumuman Kelas", href: "/app/teacher/announcements", icon: Bell },
          ],
        },
      ];
    }

    // Default: Student
    return [
      {
        group: "Belajar & Perkembangan",
        items: [
          { label: "Dashboard Siswa", href: "/app/student/dashboard", icon: LayoutDashboard },
          { label: "Materi & Kelas", href: "/app/student/courses", icon: BookOpen },
          { label: "Tugas Saya", href: "/app/student/assignments", icon: ClipboardList },
          { label: "Kuis & Evaluasi", href: "/app/student/quizzes", icon: HelpCircle },
          { label: "Nilai & Riwayat", href: "/app/student/grades", icon: Award },
        ],
      },
      {
        group: "Aktivitas & Komunitas",
        items: [
          { label: "Jadwal & Agenda", href: "/app/calendar", icon: Calendar },
          { label: "Capaian & XP", href: "/app/student/achievements", icon: Sparkles },
          { label: "Forum Diskusi", href: "/app/student/community", icon: MessageSquare },
          { label: "Pusat Notifikasi", href: "/app/notifications", icon: Bell },
        ],
      },
    ];
  };

  const navGroups = getNavItems();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white">
      {/* Brand header */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-100">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-slate-900">EduFlow</span>
          <p className="text-[10px] font-medium text-indigo-600 leading-none">Learn Better, Grow</p>
        </div>
      </div>

      {/* User summary card */}
      <div className="p-4 mx-3 my-2 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
            {user?.full_name?.substring(0, 2).toUpperCase() || "US"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold text-slate-800 truncate">{user?.full_name}</p>
            <div className="mt-0.5">
              <RoleBadge role={user?.role || "student"} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {group.group}
            </h4>
            <div className="space-y-0.5 mt-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-indigo-600" : "text-slate-400")} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom logout */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="h-4 w-4 text-slate-400" />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}
