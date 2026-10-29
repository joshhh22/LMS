"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { GraduationCap, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { login, availableUsers, switchUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, "student");
    } catch {
      setError("Email atau kata sandi tidak valid.");
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (userId: string) => {
    switchUser(userId);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">EduFlow</span>
        </Link>
        <h2 className="mt-3 text-lg font-bold tracking-tight text-slate-800">
          Masuk ke Portal Pembelajaran
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Akses portal sesuai hak akun Anda (Admin, Guru, Siswa).
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Quick Demo Access Bar */}
        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Akses Cepat Pengujian (Evaluasi Mandiri)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-3 font-normal">
            Pilih salah satu peran pengguna berikut untuk langsung membuka dashboard dan menguji hak akses otorisasi:
          </p>

          <div className="space-y-2">
            {availableUsers.map((u) => {
              const roleTag = {
                admin: "bg-indigo-50 text-indigo-700 border-indigo-200",
                teacher: "bg-emerald-50 text-emerald-700 border-emerald-200",
                student: "bg-blue-50 text-blue-700 border-blue-200",
              };

              return (
                <button
                  key={u.id}
                  onClick={() => handleQuickLogin(u.id)}
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5 text-left text-xs font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase border ${roleTag[u.role]}`}>
                      {u.role}
                    </span>
                    <span className="font-semibold text-slate-800">{u.full_name}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-2.5 text-xs font-semibold text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="font-medium text-xs text-slate-700">
                Alamat Email Sekolah
              </Label>
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

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-medium text-xs text-slate-700">
                  Kata Sandi
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Lupa sandi?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-9.5 text-xs font-semibold mt-2"
            >
              {isLoading ? "Memproses..." : "Masuk ke Akun"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
