"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock, FileText, TrendingUp } from "lucide-react";
import {
  Panel,
  SectionHeader,
  StatCard,
  Badge,
  ProgressBar,
} from "@/src/components/dashboard/primitives";
import { api } from "@/lib/api";
import type {
  AnalyticsOverview,
  Conversation,
  TopQuestion,
} from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

const barColors = [
  "bg-purple-400",
  "bg-blue-400",
  "bg-orange-400",
  "bg-[#ccff00]",
  "bg-pink-400",
  "bg-purple-400",
];

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [topQuestions, setTopQuestions] = useState<TopQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [ov, convos, tops] = await Promise.all([
          api.analyticsOverview(),
          api.analyticsConversations(),
          api.analyticsTopQuestions(),
        ]);
        if (cancelled) return;
        setOverview(ov);
        setConversations(convos);
        setTopQuestions(tops);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load analytics",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const statusBreakdown = useMemo(() => {
    const total = conversations.length || 1;
    const resolved = conversations.filter((c) => c.status === "RESOLVED").length;
    const open = conversations.filter((c) => c.status === "OPEN").length;
    const waiting = conversations.filter((c) => c.status === "WAITING").length;
    return [
      {
        label: "Resolved",
        value: Math.round((resolved / total) * 100),
        color: "bg-[#ccff00]",
      },
      {
        label: "Open",
        value: Math.round((open / total) * 100),
        color: "bg-orange-400",
      },
      {
        label: "Waiting",
        value: Math.round((waiting / total) * 100),
        color: "bg-pink-400",
      },
    ];
  }, [conversations]);

  const volume = useMemo(() => {
    const buckets = Array(6).fill(0) as number[];
    const now = Date.now();
    const week = 7 * 24 * 60 * 60 * 1000;
    for (const c of conversations) {
      const age = now - new Date(c.createdAt).getTime();
      const idx = Math.min(5, Math.floor(age / week));
      buckets[5 - idx] += 1;
    }
    const max = Math.max(...buckets, 1);
    return buckets.map((count, i) => ({
      label: `W${i + 1}`,
      value: Math.round((count / max) * 100) || 6,
      count,
    }));
  }, [conversations]);

  const messageUsage =
    overview?.monthlyUsage.find((u) => u.type === "MESSAGE")?.count ?? 0;
  const resolutionRate =
    conversations.length === 0
      ? 0
      : Math.round(
          (conversations.filter((c) => c.status === "RESOLVED").length /
            conversations.length) *
            100,
        );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto font-black uppercase tracking-widest">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Analytics"
        subtitle="How your chatbot is performing."
      />

      {error && (
        <div className="mb-6 border-4 border-black rounded-xl bg-orange-200 px-4 py-3 font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Resolution Rate"
          value={`${resolutionRate}%`}
          delta={`${conversations.length} recent chats`}
          icon={CheckCircle2}
          color="bg-[#ccff00]"
        />
        <StatCard
          label="Total Messages"
          value={String(overview?.totalMessages ?? 0)}
          delta={`${messageUsage} this month`}
          icon={Clock}
        />
        <StatCard
          label="Documents"
          value={String(overview?.totalDocuments ?? 0)}
          delta={`${overview?.totalDocumentChunks ?? 0} chunks`}
          icon={FileText}
          color="bg-purple-400"
        />
        <StatCard
          label="Total Handled"
          value={String(overview?.totalConversations ?? 0)}
          delta="all conversations"
          icon={TrendingUp}
          color="bg-orange-400"
        />
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
            Status Breakdown
          </h2>
          <div className="space-y-6">
            {statusBreakdown.map((b) => (
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
        {topQuestions.length === 0 ? (
          <p className="font-bold text-black/50">No questions yet.</p>
        ) : (
          <div className="space-y-3">
            {topQuestions.map((t, i) => (
              <div
                key={`${t.question}-${i}`}
                className="flex items-center gap-4 border-4 border-black rounded-xl px-4 py-3 bg-neutral-50"
              >
                <span className="font-black text-lg w-8">{i + 1}</span>
                <span className="flex-1 font-bold">{t.question}</span>
                <Badge color="purple">{t.count} asks</Badge>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
