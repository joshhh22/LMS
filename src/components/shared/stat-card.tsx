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
  indigo: "bg-indigo-50 text-indigo-600",
  violet: "bg-purple-50 text-purple-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  blue: "bg-blue-50 text-blue-600",
  rose: "bg-rose-50 text-rose-600",
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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-slate-300">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", colorMap[color])}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <div className="mt-2.5">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={cn(
                "font-semibold",
                trend.isPositive ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {trend.value}
            </span>
            <span className="text-slate-400 ml-1.5">dibandingkan minggu lalu</span>
          </div>
        )}
      </div>
    </div>
  );
}
