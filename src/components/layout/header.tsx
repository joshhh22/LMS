"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db, subscribeToStore } from "@/lib/store";
import { Bell } from "lucide-react";

export function Header() {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const updateUnread = () => {
      if (user?.id) {
        const notifications = db.getNotifications(user.id);
        setUnreadCount(notifications.filter((n) => !n.read_at).length);
      } else {
        const notifications = db.getNotifications();
        setUnreadCount(notifications.filter((n) => !n.read_at).length);
      }
    };

    updateUnread();
    return subscribeToStore(updateUnread);
  }, [user?.id]);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur-sm">
      {/* Active Academic Session Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200/80 px-3 py-1.5 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-700 hidden sm:inline">Tahun Ajaran 2026/2027</span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-slate-500 font-medium">Semester Ganjil</span>
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link
          href="/app/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          title="Pusat Notifikasi"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-xs">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Link */}
        <Link
          href="/app/profile"
          className="flex items-center gap-2.5 rounded-lg p-1 hover:bg-slate-50 transition-colors"
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
