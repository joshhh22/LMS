"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db, subscribeToStore } from "@/lib/store";
import { Subject } from "@/types/database";
import { BookOpen, PlusCircle, CheckCircle2 } from "lucide-react";
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
import { formatDate } from "@/lib/utils";

export default function AdminSubjectsPage() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const loadSubjects = () => {
      setSubjects(db.getSubjects());
    };

    loadSubjects();
    return subscribeToStore(loadSubjects);
  }, []);

  // Dialog State
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    db.createSubject(name, code, description);
    setName("");
    setCode("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Mata Pelajaran (Kurikulum)
          </h1>
          <p className="text-sm text-slate-500">
            Daftar seluruh mata pelajaran, kode bidang studi, dan deskripsi kompetensi sekolah.
          </p>
        </div>

        {/* Create Subject Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Tambah Mata Pelajaran
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Mata Pelajaran Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSubject} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="subName">Nama Mata Pelajaran</Label>
                <Input
                  id="subName"
                  placeholder="Contoh: Kimia Terapan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 text-xs"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subCode">Kode Mata Pelajaran</Label>
                <Input
                  id="subCode"
                  placeholder="Contoh: CHEM-101"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1 text-xs uppercase"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subDesc">Deskripsi Kompetensi</Label>
                <Input
                  id="subDesc"
                  placeholder="Kajian reaksi kimia, stoikiometri, dan larutan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" size="sm" className="bg-indigo-600 text-white">
                  Simpan Mapel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subjects Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Mata Pelajaran</TableHead>
                <TableHead>Deskripsi Kompetensi</TableHead>
                <TableHead>Tanggal Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <Badge variant="indigo" className="font-mono text-xs">
                      {sub.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-slate-900">{sub.name}</TableCell>
                  <TableCell className="text-xs text-slate-500 max-w-md">
                    {sub.description || "-"}
                  </TableCell>
                  <TableCell className="text-xs text-slate-400">
                    {formatDate(sub.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

