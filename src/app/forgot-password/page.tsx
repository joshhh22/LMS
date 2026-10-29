"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Security best practice: Always show uniform confirmation message regardless of whether email exists
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">EduFlow</span>
        </Link>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-800">
          Pemulihan Kata Sandi
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Masukkan alamat email terdaftar untuk menerima tautan pemulihan.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {submitted ? (
            <div className="text-center py-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Instruksi Terkirim</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Jika alamat email terdaftar di sistem EduFlow, tautan pemulihan kata sandi telah dikirimkan ke kotak masuk Anda.
              </p>
              <Link href="/login" className="mt-6 inline-block">
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Halaman Masuk
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Alamat Email Terdaftar</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@eduflow.school"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                Kirim Tautan Pemulihan
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Batal dan Kembali
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
