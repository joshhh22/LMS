"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Bell, PlusCircle, Pin, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";

export default function AdminAnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState(db.getAnnouncements());
  const classes = db.getClasses();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [classId, setClassId] = useState<string>("all");
  const [success, setSuccess] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    db.createAnnouncement(title, body, classId === "all" ? null : classId);
    setAnnouncements(db.getAnnouncements());
    setTitle("");
    setBody("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Pusat Pengumuman Sekolah (Broadcast)
        </h1>
        <p className="text-sm text-slate-500">
          Terbitkan pengumuman resmi ke seluruh platform sekolah atau kelas tertentu.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {announcements.map((ann) => (
            <Card key={ann.id} className={ann.is_pinned ? "border-indigo-300" : ""}>
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {ann.is_pinned && (
                      <Badge variant="indigo" className="text-[10px] flex items-center gap-1">
                        <Pin className="h-3 w-3" /> Disematkan
                      </Badge>
                    )}
                    <Badge variant={ann.class_id ? "secondary" : "default"} className="text-[10px]">
                      {ann.class ? ann.class.name : "Platform Sekolah (Seluruh Pengguna)"}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(ann.published_at)}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{ann.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{ann.body}</p>
                <div className="pt-2 text-xs text-slate-400">
                  Diumumkan oleh: <strong>{ann.author?.full_name || "Administrator"}</strong>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-indigo-600" />
                Siarkan Pengumuman Baru
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {success && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4" /> Pengumuman berhasil disiarkan!
                </div>
              )}

              <form onSubmit={handleBroadcast} className="space-y-4">
                <div>
                  <Label htmlFor="target" className="text-xs">Sasaran Pengumuman</Label>
                  <select
                    id="target"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-semibold bg-white"
                  >
                    <option value="all">Platform Sekolah (Semua Siswa & Guru)</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        Khusus: {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="bTitle" className="text-xs">Judul Pengumuman</Label>
                  <Input
                    id="bTitle"
                    placeholder="Contoh: Libur Semester & Jadwal Ujian..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bBody" className="text-xs">Uraian Lengkap</Label>
                  <Textarea
                    id="bBody"
                    placeholder="Tulis pengumuman resmi dari sekolah..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="mt-1 min-h-[120px] text-xs"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  Siarkan Pengumuman
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
