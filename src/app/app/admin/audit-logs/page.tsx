"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { ShieldAlert, Search, Filter, ShieldCheck, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

export default function AdminAuditLogsPage() {
  const { user } = useAuth();
  const auditLogs = db.getAuditLogs();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.actor?.full_name && log.actor.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Catatan Audit Keamanan & Administrasi
        </h1>
        <p className="text-sm text-slate-500">
          Rekaman forensik seluruh tindakan operasional sensitif, pembuatan entitas, dan perubahan nilai siswa.
        </p>
      </div>

      {/* Security Notice Banner */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 flex items-center gap-3 text-xs text-indigo-900">
        <Lock className="h-4 w-4 text-indigo-600 shrink-0" />
        <span>
          Tabel <code>audit_logs</code> diamankan dengan kebijakan RLS ketat dan hanya dapat diakses oleh peran <strong>Administrator</strong>. Data sensitif seperti kata sandi tidak pernah disimpan dalam metadata log.
        </span>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Cari aksi (cth: CREATE_CLASS, GRADE)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 text-xs"
        />
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu Kejadian</TableHead>
                <TableHead>Aktor (Pelaku)</TableHead>
                <TableHead>Tindakan (Action)</TableHead>
                <TableHead>Tipe Entitas</TableHead>
                <TableHead>Rincian Metadata</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                    {formatDate(log.created_at)}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-800 flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {log.actor?.full_name?.substring(0, 2).toUpperCase() || "SY"}
                    </div>
                    <span className="text-xs">{log.actor?.full_name || "Sistem"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="indigo" className="font-mono text-[10px]">
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-slate-600">
                    {log.entity_type}
                  </TableCell>
                  <TableCell className="text-[11px] font-mono text-slate-500 max-w-xs truncate">
                    {JSON.stringify(log.metadata)}
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

