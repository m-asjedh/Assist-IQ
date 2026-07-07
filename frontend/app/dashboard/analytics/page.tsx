"use client";

import React from "react";
import { CheckCircle2, Clock, Smile, TrendingUp } from "lucide-react";
import {
  Panel,
  SectionHeader,
  StatCard,
  Badge,
  ProgressBar,
} from "@/src/components/dashboard/primitives";

const volume = [
  { label: "W1", value: 40 },
  { label: "W2", value: 65 },
  { label: "W3", value: 52 },
  { label: "W4", value: 80 },
  { label: "W5", value: 72 },
  { label: "W6", value: 95 },
];

const barColors = [
  "bg-purple-400",
  "bg-blue-400",
  "bg-orange-400",
  "bg-[#ccff00]",
  "bg-pink-400",
  "bg-purple-400",
];

const topQuestions = [
  { q: "How do I reset my password?", count: 342 },
  { q: "What is your refund policy?", count: 289 },
  { q: "How do I install the widget?", count: 213 },
  { q: "Do you offer team plans?", count: 167 },
  { q: "How do I export conversations?", count: 121 },
];

const breakdown = [
  { label: "Resolved by Bot", value: 78, color: "bg-[#ccff00]" },
  { label: "Escalated to Human", value: 14, color: "bg-orange-400" },
  { label: "Unanswered", value: 8, color: "bg-pink-400" },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Analytics"
        subtitle="How your chatbot is performing."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard label="Resolution Rate" value="92%" delta="+3% vs last month" icon={CheckCircle2} color="bg-[#ccff00]" />
        <StatCard label="Avg Response Time" value="1.2s" delta="-0.4s faster" icon={Clock} />
        <StatCard label="Satisfaction" value="4.8/5" delta="1,204 ratings" icon={Smile} color="bg-purple-400" />
        <StatCard label="Total Handled" value="12.4k" delta="+8.2% this week" icon={TrendingUp} color="bg-orange-400" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        <Panel className="xl:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Conversation Volume
            </h2>
            <Badge color="green">Last 6 Weeks</Badge>
          </div>
          <div className="flex items-end justify-between gap-4 h-56">
            {volume.map((v, i) => (
              <div key={v.label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={`w-full border-4 border-black rounded-t-lg ${barColors[i]}`}
                    style={{ height: `${v.value}%` }}
                  />
                </div>
                <span className="font-black text-xs uppercase">{v.label}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
            Usage Breakdown
          </h2>
          <div className="space-y-6">
            {breakdown.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between font-black text-sm uppercase mb-2">
                  <span>{b.label}</span>
                  <span>{b.value}%</span>
                </div>
                <ProgressBar value={b.value} color={b.color} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="p-6">
        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
          Top Questions
        </h2>
        <div className="space-y-3">
          {topQuestions.map((t, i) => (
            <div
              key={t.q}
              className="flex items-center gap-4 border-4 border-black rounded-xl px-4 py-3 bg-neutral-50"
            >
              <span className="font-black text-lg w-8">{i + 1}</span>
              <span className="flex-1 font-bold">{t.q}</span>
              <Badge color="purple">{t.count} asks</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
