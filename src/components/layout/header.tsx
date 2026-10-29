"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Bell, UserCheck, Shield } from "lucide-react";

export function Header() {
  const { user, switchUser, availableUsers } = useAuth();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const notifications = db.getNotifications(user?.id);
  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/70 bg-[#F8FAFD]/90 px-6 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(100,116,139,0.06)]">
      {/* Role testing switcher notice */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-2xl bg-white/95 border border-white/90 shadow-[0_4px_12px_-2px_rgba(100,116,139,0.08),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(148,163,184,0.12)] px-3.5 py-1.5 text-xs text-slate-700">
          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
            <Shield className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider hidden sm:inline">Role Mode:</span>
          <select
            value={user?.id || ""}
            onChange={(e) => switchUser(e.target.value)}
            className="rounded-xl bg-[#F1F4F9] border border-slate-200/80 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
          >
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                [{u.role.toUpperCase()}] {u.full_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link
          href="/app/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 border border-white/90 text-slate-700 shadow-[0_4px_12px_-2px_rgba(100,116,139,0.08),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(148,163,184,0.1)] hover:shadow-md transition-all active:scale-[0.96]"
          title="Pusat Notifikasi"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 text-[10px] font-extrabold text-white shadow-sm ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Link */}
        <Link
          href="/app/profile"
          className="flex items-center gap-2.5 rounded-2xl bg-white/95 border border-white/90 p-1.5 pr-3 shadow-[0_4px_12px_-2px_rgba(100,116,139,0.08),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(148,163,184,0.1)] hover:shadow-md transition-all active:scale-[0.98]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-xs font-bold text-white shadow-[0_2px_6px_rgba(99,102,241,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)]">
            {user?.full_name?.substring(0, 2).toUpperCase() || "US"}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-xs font-bold text-slate-800 leading-none">{user?.full_name}</p>
            <p className="text-[10px] font-semibold text-indigo-600 capitalize mt-0.5">{user?.role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}

