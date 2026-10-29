"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db, subscribeToStore } from "@/lib/store";
import { Profile, UserRole, UserStatus } from "@/types/database";
import {
  Users,
  PlusCircle,
  Shield,
  Search,
  CheckCircle2,
  Ban,
  Filter,
  UserPlus,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoleBadge } from "@/components/shared/role-badge";
import { formatDate } from "@/lib/utils";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    const loadProfiles = () => {
      setProfiles(db.getProfiles());
    };

    loadProfiles();
    return subscribeToStore(loadProfiles);
  }, []);

  // Create User Dialog
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("student");

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    db.createUser(newName, newRole, newEmail);
    setNewName("");
    setNewEmail("");
    setIsOpen(false);
  };

  const handleToggleStatus = (userId: string, currentStatus: UserStatus) => {
    const nextStatus = currentStatus === "active" ? "suspended" : "active";
    db.updateProfile(userId, { status: nextStatus });
    if (user) {
      db.addAuditLog(user.id, "UPDATE_USER_STATUS", "profile", userId, {
        status: nextStatus,
      });
    }
  };

  const filtered = profiles.filter((p) => {
    const matchesSearch =
      p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || p.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Manajemen Pengguna & Hak Akses
          </h1>
          <p className="text-sm text-slate-500">
            Daftar seluruh akun Administrator, Dewan Guru, dan Siswa sekolah di EduFlow.
          </p>
        </div>

        {/* Create User Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Tambah Pengguna Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Buat Akun Pengguna Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="uName">Nama Lengkap Resmi</Label>
                <Input
                  id="uName"
                  placeholder="Contoh: Rian Pratama, S.Kom"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 text-xs"
                  required
                />
              </div>

              <div>
                <Label htmlFor="uEmail">Alamat Email Sekolah</Label>
                <Input
                  id="uEmail"
                  type="email"
                  placeholder="rian@eduflow.school"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-1 text-xs"
                  required
                />
              </div>

              <div>
                <Label htmlFor="uRole">Peran Pengguna (Role Otorisasi)</Label>
                <select
                  id="uRole"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-semibold"
                  required
                >
                  <option value="student">Siswa (Student)</option>
                  <option value="teacher">Guru (Teacher)</option>
                  <option value="admin">Administrator (Superuser)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Peran ini menentukan hak akses menu dan kebijakan RLS pada database.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" size="sm" className="bg-indigo-600 text-white">
                  Daftarkan Pengguna
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Cari nama pengguna atau peran..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
        <div className="flex gap-1.5">
          {["all", "admin", "teacher", "student"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                roleFilter === r
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {r === "all" ? "Semua Peran" : r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Pengguna</TableHead>
                <TableHead>Peran (Role)</TableHead>
                <TableHead>Status Akun</TableHead>
                <TableHead>Tanggal Terdaftar</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => {
                const isActive = p.status === "active";
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-semibold text-slate-800 flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {p.full_name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span>{p.full_name}</span>
                        <span className="block text-[11px] text-slate-400 font-mono">
                          ID: {p.id.substring(0, 12)}...
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={p.role} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={isActive ? "success" : "destructive"} className="text-[10px] capitalize">
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(p.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        variant="outline"
                        size="sm"
                        className={`text-xs ${
                          isActive
                            ? "text-red-700 hover:bg-red-50 hover:border-red-200"
                            : "text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200"
                        }`}
                      >
                        {isActive ? "Tangguhkan (Suspend)" : "Aktifkan Akun"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

