import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "clay-btn-primary text-white border border-white/30",
        destructive:
          "bg-gradient-to-b from-red-500 to-red-600 text-white border border-white/30 shadow-[inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_18px_-3px_rgba(239,68,68,0.35)] hover:from-red-500 hover:to-red-700 active:translate-y-0.5 active:scale-[0.98]",
        outline:
          "bg-white/90 text-slate-700 border-2 border-slate-200 shadow-[inset_0_2px_3px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(148,163,184,0.15),0_4px_10px_-2px_rgba(100,116,139,0.08)] hover:bg-slate-50 hover:border-slate-300 active:translate-y-0.5 active:scale-[0.98]",
        secondary:
          "clay-btn-secondary text-slate-800",
        ghost:
          "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 rounded-xl",
        link:
          "text-indigo-600 underline-offset-4 hover:underline font-semibold",
        subtle:
          "bg-gradient-to-b from-indigo-50 to-indigo-100/80 text-indigo-800 border border-indigo-200/80 shadow-[inset_0_2px_2px_rgba(255,255,255,0.9),0_4px_10px_-2px_rgba(99,102,241,0.12)] hover:bg-indigo-100 active:translate-y-0.5",
        success:
          "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border border-white/30 shadow-[inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(6,78,59,0.3),0_8px_18px_-3px_rgba(16,185,129,0.35)] hover:from-emerald-500 hover:to-emerald-700 active:translate-y-0.5",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-2xl px-7 text-base font-bold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
