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
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-6 backdrop-blur-sm">
      {/* Role testing switcher notice */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1.5 text-xs text-indigo-800">
          <Shield className="h-3.5 w-3.5 text-indigo-600" />
          <span className="font-medium">Mode Evaluasi Role:</span>
          <select
            value={user?.id || ""}
            onChange={(e) => switchUser(e.target.value)}
            className="rounded bg-white border border-indigo-200 px-2 py-0.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
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
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Link
          href="/app/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          title="Pusat Notifikasi"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Link */}
        <Link
          href="/app/profile"
          className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-50 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            {user?.full_name?.substring(0, 2).toUpperCase() || "US"}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-xs font-semibold text-slate-800 leading-none">{user?.full_name}</p>
            <p className="text-[10px] text-slate-400 capitalize mt-0.5">{user?.role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
