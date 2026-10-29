"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { RoleBadge } from "@/components/shared/role-badge";
import { User, Mail, Phone, Calendar, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useAuth();
  const [bio, setBio] = useState(user?.bio || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    db.updateProfile(user.id, { bio, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalXp = user?.role === "student" ? db.getTotalXp(user.id) : null;
  const badges = user?.role === "student" ? db.getStudentBadges(user.id) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Profil Saya</h1>
        <p className="text-sm text-slate-500">Kelola informasi pribadi dan pengaturan identitas Anda di EduFlow.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* User Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white shadow-md">
              {user?.full_name?.substring(0, 2).toUpperCase()}
            </div>
            <CardTitle className="mt-4 text-lg">{user?.full_name}</CardTitle>
            <div className="mt-1 flex justify-center">
              <RoleBadge role={user?.role || "student"} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <Shield className="h-4 w-4 text-indigo-600" />
              <span>Status Akun: <strong className="text-emerald-700 capitalize">{user?.status}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>Bergabung sejak: {formatDate(user?.created_at)}</span>
            </div>
            {totalXp !== null && (
              <div className="rounded-lg bg-indigo-50/70 p-3 text-xs border border-indigo-100">
                <span className="text-slate-500">Total Pengalaman:</span>
                <p className="text-lg font-bold text-indigo-700">{totalXp.toLocaleString()} XP</p>
                <p className="text-[11px] text-slate-500 mt-1">{badges.length} Lencana Penghargaan Terkumpul</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Informasi Akun & Kontak</CardTitle>
          </CardHeader>
          <CardContent>
            {saved && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4" />
                Perubahan profil berhasil disimpan ke database.
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Lengkap (Tervalidasi Sekolah)</Label>
                <Input
                  id="name"
                  value={user?.full_name || ""}
                  disabled
                  className="bg-slate-50 text-slate-500 cursor-not-allowed mt-1"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Perubahan nama resmi siswa/guru hanya dapat diajukan melalui Administrator.
                </p>
              </div>

              <div>
                <Label htmlFor="role">Peran & Hak Akses</Label>
                <Input
                  id="role"
                  value={user?.role?.toUpperCase() || ""}
                  disabled
                  className="bg-slate-50 text-slate-500 font-mono text-xs cursor-not-allowed mt-1"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Otorisasi ditetapkan secara server-side dan tidak dapat diubah dari sisi browser.
                </p>
              </div>

              <div>
                <Label htmlFor="phone">Nomor Telepon / WhatsApp</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+62 812-xxxx-xxxx"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bio">Biografi Singkat</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ceritakan peminatan dan fokus belajar Anda..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
