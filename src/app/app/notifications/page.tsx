"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { db, subscribeToStore } from "@/lib/store";
import { Notification } from "@/types/database";
import { Bell, Check, CheckCheck, ArrowRight, Award, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const loadNotifs = () => {
      setNotifications(db.getNotifications(user?.id));
    };

    loadNotifs();
    return subscribeToStore(loadNotifs);
  }, [user?.id]);

  const handleMarkAll = () => {
    if (!user) return;
    db.markAllNotificationsAsRead(user.id);
  };

  const handleMarkSingle = (id: string) => {
    db.markNotificationAsRead(id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "grade_published":
        return <Award className="h-5 w-5 text-emerald-600" />;
      case "announcement":
        return <Bell className="h-5 w-5 text-indigo-600" />;
      case "discussion_reply":
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pusat Notifikasi</h1>
          <p className="text-sm text-slate-500">Pemberitahuan aktivitas pembelajaran, tugas, pengumuman, dan nilai.</p>
        </div>
        {notifications.length > 0 && (
          <Button onClick={handleMarkAll} variant="outline" size="sm" className="text-xs">
            <CheckCheck className="mr-1.5 h-4 w-4" /> Tandai Semua Dibaca
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Belum Ada Notifikasi"
          description="Anda telah membaca seluruh pemberitahuan terbaru."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const isUnread = !notif.read_at;
            return (
              <Card
                key={notif.id}
                className={`transition-colors ${isUnread ? "bg-white border-indigo-200 shadow-sm" : "bg-slate-50/70 border-slate-200"}`}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isUnread ? "bg-indigo-50" : "bg-slate-100"}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm ${isUnread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                        {notif.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 shrink-0">
                        {formatDate(notif.created_at)}
                      </span>
                    </div>
                    {notif.body && (
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {notif.body}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      {notif.target_url && (
                        <Link
                          href={notif.target_url}
                          onClick={() => handleMarkSingle(notif.id)}
                          className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          Lihat Detail <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      )}
                      {isUnread && (
                        <button
                          onClick={() => handleMarkSingle(notif.id)}
                          className="text-[11px] text-slate-400 hover:text-slate-600 font-medium"
                        >
                          Tandai sudah dibaca
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

