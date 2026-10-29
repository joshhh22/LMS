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
    <div className="min-h-screen bg-[#F1F4F9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-[0_8px_20px_-4px_rgba(99,102,241,0.35),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)]">
            <GraduationCap className="h-7 w-7 drop-shadow" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">EduFlow</span>
        </Link>
        <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-800">
          Masuk ke Portal Pembelajaran
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Akses portal sesuai hak akun Anda (Admin, Guru, Siswa).
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Quick Demo Access Bar */}
        <div className="mb-6 clay-card rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
              <Shield className="h-3.5 w-3.5" />
            </div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Akses Cepat Pengujian (Evaluasi Mandiri)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4 font-normal">
            Pilih salah satu peran pengguna berikut untuk langsung membuka dashboard dan menguji hak akses otorisasi:
          </p>

          <div className="space-y-2.5">
            {availableUsers.map((u) => {
              const roleColors = {
                admin: "hover:border-indigo-300 text-indigo-950",
                teacher: "hover:border-emerald-300 text-emerald-950",
                student: "hover:border-blue-300 text-blue-950",
              };
              const roleTag = {
                admin: "bg-indigo-100 text-indigo-800",
                teacher: "bg-emerald-100 text-emerald-800",
                student: "bg-blue-100 text-blue-800",
              };

              return (
                <button
                  key={u.id}
                  onClick={() => handleQuickLogin(u.id)}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-2xl border border-white/90 bg-white/90 p-3 text-left text-xs font-semibold shadow-[0_4px_12px_-2px_rgba(100,116,139,0.08),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(148,163,184,0.1)] transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98] ${roleColors[u.role]}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`rounded-xl px-2 py-0.5 text-[10px] font-extrabold uppercase shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] ${roleTag[u.role]}`}>
                      {u.role}
                    </span>
                    <span className="font-bold text-slate-800">{u.full_name}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="clay-card rounded-3xl p-6 sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-2xl bg-red-50 p-3 text-xs font-bold text-red-700 border border-red-200 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="font-bold text-xs text-slate-700">
                Alamat Email Sekolah
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@eduflow.school"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-bold text-xs text-slate-700">
                  Kata Sandi
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
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
                className="mt-1.5"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full clay-btn-primary h-11 text-sm font-bold mt-2"
            >
              {isLoading ? "Memproses..." : "Masuk ke Akun"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
