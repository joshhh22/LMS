import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-6">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Akses Ditolak (403 Unauthorized)
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-600 leading-relaxed">
        Anda tidak memiliki izin otorisasi yang mencukupi untuk membuka halaman atau data ini. Akses modul dibatasi oleh kebijakan keamanan sekolah.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/login">
          <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Portal Sesi
          </Button>
        </Link>
      </div>
    </div>
  );
}
