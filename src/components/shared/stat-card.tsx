import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: "indigo" | "violet" | "emerald" | "amber" | "blue" | "rose";
}

const colorMap = {
  indigo: "bg-gradient-to-b from-indigo-100 to-indigo-200 text-indigo-700 shadow-[inset_0_2px_2px_rgba(255,255,255,0.9),0_4px_8px_-2px_rgba(79,70,229,0.2)]",
  violet: "bg-gradient-to-b from-violet-100 to-violet-200 text-violet-700 shadow-[inset_0_2px_2px_rgba(255,255,255,0.9),0_4px_8px_-2px_rgba(139,92,246,0.2)]",
  emerald: "bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-700 shadow-[inset_0_2px_2px_rgba(255,255,255,0.9),0_4px_8px_-2px_rgba(16,185,129,0.2)]",
  amber: "bg-gradient-to-b from-amber-100 to-amber-200 text-amber-800 shadow-[inset_0_2px_2px_rgba(255,255,255,0.9),0_4px_8px_-2px_rgba(245,158,11,0.2)]",
  blue: "bg-gradient-to-b from-blue-100 to-blue-200 text-blue-700 shadow-[inset_0_2px_2px_rgba(255,255,255,0.9),0_4px_8px_-2px_rgba(59,130,246,0.2)]",
  rose: "bg-gradient-to-b from-rose-100 to-rose-200 text-rose-700 shadow-[inset_0_2px_2px_rgba(255,255,255,0.9),0_4px_8px_-2px_rgba(244,63,94,0.2)]",
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "indigo",
}: StatCardProps) {
  return (
    <div className="clay-card p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60", colorMap[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{value}</h3>
        {subtitle && (
          <p className="text-xs font-medium text-slate-500 mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className="mt-2.5 flex items-center text-xs">
            <span
              className={cn(
                "font-bold",
                trend.isPositive ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {trend.value}
            </span>
            <span className="text-slate-400 ml-1.5 font-medium">dibandingkan minggu lalu</span>
          </div>
        )}
      </div>
    </div>
  );
}
