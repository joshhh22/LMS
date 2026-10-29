import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all clay-badge select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.4),0_3px_8px_-1px_rgba(79,70,229,0.35)]",
        secondary:
          "bg-gradient-to-b from-slate-100 to-slate-200 text-slate-800 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_5px_rgba(0,0,0,0.06)]",
        destructive:
          "bg-gradient-to-b from-red-100 to-red-200/90 text-red-800 border-red-200 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_5px_rgba(239,68,68,0.15)]",
        success:
          "bg-gradient-to-b from-emerald-100 to-emerald-200/90 text-emerald-800 border-emerald-200 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_5px_rgba(16,185,129,0.15)]",
        warning:
          "bg-gradient-to-b from-amber-100 to-amber-200/90 text-amber-900 border-amber-200 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_5px_rgba(245,158,11,0.15)]",
        outline:
          "bg-white/90 text-slate-700 border border-slate-300/80 shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.05)]",
        indigo:
          "bg-gradient-to-b from-indigo-50 to-indigo-100 text-indigo-800 border-indigo-200/90 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_6px_rgba(99,102,241,0.15)]",
        violet:
          "bg-gradient-to-b from-violet-50 to-violet-100 text-violet-800 border-violet-200/90 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_6px_rgba(139,92,246,0.15)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
