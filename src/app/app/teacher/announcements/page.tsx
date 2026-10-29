"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { Bell, PlusCircle, Pin, Clock, User, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";

export default function TeacherAnnouncementsPage() {
  const { user } = useAuth();
  const classes = db.getClasses(user || undefined);
  const announcements = db.getAnnouncements();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || "");
  const [isPosting, setIsPosting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsPosting(true);
    try {
      db.createAnnouncement(title, body, selectedClassId || null);
      setTitle("");
      setBody("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Pengumuman Kelas & Komunikasi
        </h1>
        <p className="text-sm text-slate-500">
          Kirim informasi penting, jadwal praktikum, atau pengingat deadline kepada seluruh siswa binaan.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Announcements List (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {announcements.map((ann) => (
            <Card key={ann.id} className={ann.is_pinned ? "border-indigo-200" : ""}>
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {ann.is_pinned && (
                      <Badge variant="indigo" className="text-[10px] flex items-center gap-1">
                        <Pin className="h-3 w-3" /> Disematkan
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px]">
                      {ann.class ? ann.class.name : "Platform Sekolah"}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(ann.published_at)}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{ann.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{ann.body}</p>
                <div className="pt-2 text-xs text-slate-400">
                  Diumumkan oleh: <strong>{ann.author?.full_name || "Guru"}</strong>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Announcement Form (1 Col) */}
        <div>
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-indigo-600" />
                Terbitkan Pengumuman Baru
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {success && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4" /> Pengumuman berhasil diterbitkan ke kelas!
                </div>
              )}

              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div>
                  <Label htmlFor="targetClass" className="text-xs">Target Kelas</Label>
                  <select
                    id="targetClass"
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium bg-white"
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="annTitle" className="text-xs">Judul Pengumuman</Label>
                  <Input
                    id="annTitle"
                    placeholder="Contoh: Perubahan Jadwal Pertemuan..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="annBody" className="text-xs">Isi Lengkap Informasi</Label>
                  <Textarea
                    id="annBody"
                    placeholder="Tulis detail pengumuman yang ingin disampaikan ke siswa..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="mt-1 min-h-[120px] text-xs"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPosting}
                  size="sm"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  {isPosting ? "Menerbitkan..." : "Kirim Pengumuman Sekarang"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
