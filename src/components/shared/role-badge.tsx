import React from "react";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/database";

export function RoleBadge({ role }: { role: UserRole | string }) {
  switch (role) {
    case "admin":
      return (
        <Badge variant="default" className="bg-indigo-600 text-white hover:bg-indigo-700">
          Administrator
        </Badge>
      );
    case "teacher":
      return (
        <Badge variant="indigo" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          Guru Pengampu
        </Badge>
      );
    case "student":
      return (
        <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">
          Siswa
        </Badge>
      );
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
}

