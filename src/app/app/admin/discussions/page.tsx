"use client";

import React from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import { MessageSquare, Shield, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function AdminDiscussionsPage() {
  const { user } = useAuth();
  const discussions = db.getDiscussions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Moderasi Diskusi & Forum Komunitas
        </h1>
        <p className="text-sm text-slate-500">
          Pengawasan seluruh percakapan akademik kelas, kepatuhan norma, dan penanganan konten.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topik Diskusi</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Tanggapan</TableHead>
                <TableHead>Status Moderasi</TableHead>
                <TableHead className="text-right">Waktu Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discussions.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-bold text-slate-900">
                    {d.title}
                  </TableCell>
                  <TableCell className="text-xs text-slate-700">
                    {d.author?.full_name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {d.class?.name}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 font-semibold">
                    {d.replies?.length || 0} Balasan
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" className="text-[10px] capitalize">
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-400 text-right">
                    {formatDate(d.created_at)}
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

