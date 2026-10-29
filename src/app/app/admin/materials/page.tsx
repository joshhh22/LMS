"use client";

import React from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { FileText, Video, ExternalLink, HardDrive, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function AdminMaterialsPage() {
  const { user } = useAuth();
  const materials = db.getMaterials();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Berkas Materi & Arsip Penyimpanan
        </h1>
        <p className="text-sm text-slate-500">
          Inventaris dokumen ajar, video tutorial, berkas PDF kurikulum, dan tautan eksternal.
        </p>
      </div>

      <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 flex items-center gap-3 text-xs text-indigo-900">
        <HardDrive className="h-4 w-4 text-indigo-600 shrink-0" />
        <span>
          Seluruh berkas materi tervalidasi tipe MIME dan batas ukuran. Hak akses file privat dibatasi sesuai hak enrollment kelas siswa.
        </span>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Berkas / Materi</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Ukuran</TableHead>
                <TableHead>Tautan Akses</TableHead>
                <TableHead className="text-right">Waktu Unggah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-bold text-slate-900 flex items-center gap-2">
                    {m.material_type === "video" ? (
                      <Video className="h-4 w-4 text-indigo-600" />
                    ) : (
                      <FileText className="h-4 w-4 text-slate-500" />
                    )}
                    <span>{m.title}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono">
                      {m.material_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {m.file_size_bytes
                      ? `${(m.file_size_bytes / (1024 * 1024)).toFixed(1)} MB`
                      : "Tautan Web"}
                  </TableCell>
                  <TableCell className="text-xs text-indigo-600">
                    {m.external_url ? (
                      <a
                        href={m.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        Buka Sumber <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400">Penyimpanan Lokal</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-slate-400 text-right">
                    {formatDate(m.created_at)}
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
