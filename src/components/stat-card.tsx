"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}

export function StatCard({ label, value, subValue, icon, trend, delay = 0 }: StatCardProps) {
  return (
    <div
      className={cn(
        "glass glass-hover rounded-2xl p-6 glow-purple transition-all duration-300 hover:scale-[1.02] animate-fade-in",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
          {icon}
        </div>
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">{value}</div>
      {subValue && (
        <div className={cn(
          "mt-2 text-sm font-medium",
          trend === "up" && "text-emerald-400",
          trend === "down" && "text-red-400",
          trend === "neutral" && "text-muted-foreground",
        )}>
          {trend === "up" && "↑ "}
          {trend === "down" && "↓ "}
          {subValue}
        </div>
      )}
    </div>
  );
}
