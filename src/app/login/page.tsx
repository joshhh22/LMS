"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { GraduationCap, ArrowRight, Shield, User, Users, Lock } from "lucide-react";
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
      // Find matching profile by email
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">EduFlow</span>
        </Link>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-800">
          Masuk ke Portal Pembelajaran
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Akses portal sesuai hak akun Anda (Admin, Guru, Siswa).
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Quick Demo Access Bar */}
        <div className="mb-6 rounded-xl border border-indigo-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
              Akses Cepat Pengujian (Evaluasi Mandiri)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Pilih salah satu peran pengguna berikut untuk langsung membuka dashboard dan menguji hak akses otorisasi:
          </p>

          <div className="space-y-2">
            {availableUsers.map((u) => {
              const roleColors = {
                admin: "hover:bg-indigo-50 border-indigo-200 text-indigo-900",
                teacher: "hover:bg-emerald-50 border-emerald-200 text-emerald-900",
                student: "hover:bg-blue-50 border-blue-200 text-blue-900",
              };
              return (
                <button
                  key={u.id}
                  onClick={() => handleQuickLogin(u.id)}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-lg border bg-white p-2.5 text-left text-xs font-medium shadow-2xs transition-colors ${roleColors[u.role]}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-600">
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
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email">Alamat Email Sekolah</Label>
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
                <Label htmlFor="password">Kata Sandi</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            >
              {isLoading ? "Memproses..." : "Masuk ke Akun"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
