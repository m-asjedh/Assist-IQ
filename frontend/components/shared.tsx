"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export const cardClass = "bg-white rounded-2xl border border-slate-100 shadow-sm gap-0 py-0";
export const primaryBtnClass =
  "gradient-bg text-white hover:opacity-90 border-transparent shadow-sm shadow-cyan-500/20 font-semibold rounded-xl h-auto";

const badgeStyles: Record<string, string> = {
  default: "bg-slate-100 text-slate-700 border-transparent",
  success: "bg-emerald-100 text-emerald-700 border-transparent",
  warning: "bg-amber-100 text-amber-700 border-transparent",
  info: "bg-indigo-100 text-indigo-700 border-transparent",
  danger: "bg-red-100 text-red-700 border-transparent",
};

export function AppBadge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "danger";
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn(badgeStyles[variant], "rounded-full text-xs font-medium", className)}>
      {children}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: "success" | "warning" | "info" | "danger" | "default" }> = {
    open: { label: "Open", variant: "info" },
    resolved: { label: "Resolved", variant: "success" },
    waiting: { label: "Waiting", variant: "warning" },
    trained: { label: "Trained", variant: "success" },
    processing: { label: "Processing", variant: "warning" },
    paid: { label: "Paid", variant: "success" },
  };
  const item = map[status] ?? { label: status, variant: "default" };
  return <AppBadge variant={item.variant}>{item.label}</AppBadge>;
}

export function StatCard({
  label,
  value,
  change,
  icon,
  gradient,
}: {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  gradient?: string;
}) {
  return (
    <Card className={cn(cardClass, "p-5 flex items-start justify-between")}>
      <div>
        <p className="text-sm text-slate-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-400 mt-1">{change}</p>
      </div>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", gradient ?? "bg-indigo-50")}>
        {icon}
      </div>
    </Card>
  );
}

export function InitialsAvatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = { sm: "sm" as const, md: "default" as const, lg: "lg" as const };
  return (
    <Avatar size={sizeMap[size]} className="gradient-bg shrink-0">
      <AvatarFallback className="bg-transparent text-white font-bold text-xs">{initials}</AvatarFallback>
    </Avatar>
  );
}

export function ProgressBar({
  value,
  max = 100,
  label,
}: {
  value: number;
  max?: number;
  label?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-600">{label}</span>
          <span className="text-xs font-medium text-slate-900">{Math.round(pct)}%</span>
        </div>
      )}
      <Progress
        value={pct}
        className="**:data-[slot=progress-track]:h-2 **:data-[slot=progress-track]:bg-slate-100 **:data-[slot=progress-indicator]:gradient-bg"
      />
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6">{description}</p>
      {action}
    </div>
  );
}
