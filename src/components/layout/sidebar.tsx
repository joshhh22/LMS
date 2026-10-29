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
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200/80 bg-[#F8FAFD] shadow-[4px_0_24px_-10px_rgba(100,116,139,0.06)]">
      {/* Brand header */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-slate-200/60">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-[0_6px_16px_-2px_rgba(99,102,241,0.35),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)]">
          <GraduationCap className="h-5 w-5 drop-shadow" />
        </div>
        <div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">EduFlow</span>
          <p className="text-[10px] font-bold text-indigo-600 leading-none">Learn Better, Grow</p>
        </div>
      </div>

      {/* User summary card */}
      <div className="p-3 mx-3 my-2.5 rounded-2xl bg-white/95 border border-white/90 shadow-[0_6px_18px_-4px_rgba(100,116,139,0.08),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(148,163,184,0.1)]">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_4px_rgba(99,102,241,0.1)]">
            {user?.full_name?.substring(0, 2).toUpperCase() || "US"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">{user?.full_name}</p>
            <div className="mt-0.5">
              <RoleBadge role={user?.role || "student"} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {group.group}
            </h4>
            <div className="space-y-1 mt-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150",
                      isActive
                        ? "clay-pill-selected text-indigo-700 font-bold"
                        : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-xs active:scale-[0.98]"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-indigo-600" : "text-slate-400")} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom logout */}
      <div className="p-3 border-t border-slate-200/60">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-red-700 transition-all active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4 text-slate-400" />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}

