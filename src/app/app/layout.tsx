import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full animate-in fade-in-50 duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}
