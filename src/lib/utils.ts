import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatShortDate(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function calculateLevel(xp: number): { level: number; currentXp: number; nextLevelXp: number; progress: number } {
  // Each level requires (level * 200) XP
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const currentLevelBase = (level - 1) * (level - 1) * 100;
  const nextLevelBase = level * level * 100;
  const xpInLevel = xp - currentLevelBase;
  const xpNeeded = nextLevelBase - currentLevelBase;
  const progress = Math.min(100, Math.max(0, Math.round((xpInLevel / (xpNeeded || 1)) * 100)));
  return { level, currentXp: xpInLevel, nextLevelXp: xpNeeded, progress };
}
