"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

const BADGE_COLORS: Record<string, string> = {
  green: "bg-[#ccff00] text-black",
  purple: "bg-purple-400 text-black",
  orange: "bg-orange-400 text-black",
  blue: "bg-blue-400 text-black",
  pink: "bg-pink-400 text-black",
  gray: "bg-neutral-200 text-black",
  black: "bg-black text-white",
};

export function Badge({
  children,
  color = "gray",
  className = "",
}: {
  children: React.ReactNode;
  color?: keyof typeof BADGE_COLORS | string;
  className?: string;
}) {
  const c = BADGE_COLORS[color] ?? BADGE_COLORS.gray;
  return (
    <span
      className={`inline-flex items-center gap-1 border-2 border-black rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${c} ${className}`}
    >
      {children}
    </span>
  );
}

export function Panel({
  children,
  className = "",
  color = "bg-white",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${color} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 font-bold text-black/60">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  color = "bg-white",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  color?: string;
}) {
  return (
    <Panel color={color} className="p-6 hover:-translate-y-1 transition-transform">
      <div className="flex items-start justify-between mb-6">
        <span className="font-black uppercase text-xs tracking-widest opacity-70">
          {label}
        </span>
        <div className="border-2 border-black rounded-lg p-2 bg-white">
          <Icon size={20} />
        </div>
      </div>
      <div className="text-4xl font-black tracking-tighter">{value}</div>
      {delta && (
        <div className="mt-2 text-xs font-black uppercase tracking-wide opacity-70">
          {delta}
        </div>
      )}
    </Panel>
  );
}

export function ProgressBar({
  value,
  color = "bg-[#ccff00]",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="w-full h-5 border-4 border-black rounded-full bg-white overflow-hidden">
      <div
        className={`h-full ${color} border-r-4 border-black transition-all`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Table({
  head,
  children,
}: {
  head: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-4 border-black">
            {head.map((h) => (
              <th
                key={h}
                className="text-left py-4 px-4 font-black uppercase text-xs tracking-widest whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Tr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b-2 border-black/10 hover:bg-neutral-50 transition-colors">
      {children}
    </tr>
  );
}

export function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`py-4 px-4 font-bold text-sm ${className}`}>{children}</td>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="border-4 border-black rounded-2xl p-6 bg-[#ccff00] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6">
        <Icon size={40} />
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
        {title}
      </h3>
      <p className="font-bold text-black/60 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}

export function ChatBubble({
  from,
  children,
}: {
  from: "bot" | "user";
  children: React.ReactNode;
}) {
  const isBot = from === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] border-4 border-black rounded-2xl px-5 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
          isBot ? "bg-white" : "bg-[#ccff00]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
