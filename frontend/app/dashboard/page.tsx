"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MessagesSquare,
  FileText,
  Activity,
  Gauge,
  Upload,
  Bot,
  Code2,
  ArrowUpRight,
} from "lucide-react";
import {
  StatCard,
  Panel,
  SectionHeader,
  Table,
  Tr,
  Td,
  Badge,
} from "@/src/components/dashboard/primitives";
import { api } from "@/lib/api";
import type { AnalyticsOverview, Conversation } from "@/lib/api/types";
import { formatRelativeTime, statusBadgeColor } from "@/lib/format";
import { useAuth } from "@/src/context/AuthProvider";
import { ApiError } from "@/lib/api/client";
import { InlineLoader } from "@/src/components/PageLoader";

const quickActions = [
  {
    label: "Upload Docs",
    desc: "Add to knowledge base",
    href: "/dashboard/knowledge-base",
    icon: Upload,
    color: "bg-purple-400",
  },
  {
    label: "Test Chatbot",
    desc: "Open the playground",
    href: "/dashboard/chatbot",
    icon: Bot,
    color: "bg-[#ccff00]",
  },
  {
    label: "Get Widget",
    desc: "Install on your site",
    href: "/dashboard/widget-setup",
    icon: Code2,
    color: "bg-orange-400",
  },
];

const barColors = [
  "bg-purple-400",
  "bg-blue-400",
  "bg-orange-400",
  "bg-[#ccff00]",
  "bg-pink-400",
  "bg-purple-400",
  "bg-blue-400",
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [recent, setRecent] = useState<Conversation[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [ov, convos] = await Promise.all([
          api.analyticsOverview(),
          api.listConversations(),
        ]);
        if (cancelled) return;
        setOverview(ov);
        setRecent(convos.slice(0, 5));
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load dashboard",
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

  const chatbotLive = overview?.chatbotStatus.some((c) => c.status === "ACTIVE");
  const messageUsage =
    overview?.monthlyUsage.find((u) => u.type === "MESSAGE")?.count ?? 0;

  const volumeBars = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = Array(7).fill(0) as number[];

    for (const c of recent) {
      const day = new Date(c.createdAt).getDay();
      counts[day] += 1;
    }

    // Prefer analytics conversations if we only have recent slice — still show shape
    const max = Math.max(...counts, 1);
    return days.map((day, i) => ({
      day,
      value: Math.round((counts[i] / max) * 100) || 8,
    }));
  }, [recent]);

  if (loading) {
    return <InlineLoader label="Loading dashboard" />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Dashboard"
        subtitle={`Welcome back, ${user?.fullName?.split(" ")[0] ?? "there"}. Here's what's happening.`}
      />

      {error && (
        <div className="mb-6 border-4 border-black rounded-xl bg-orange-200 px-4 py-3 font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Total Conversations"
          value={String(overview?.totalConversations ?? 0)}
          delta={`${overview?.totalMessages ?? 0} messages`}
          icon={MessagesSquare}
        />
        <StatCard
          label="Documents Uploaded"
          value={String(overview?.totalDocuments ?? 0)}
          delta={`${overview?.totalDocumentChunks ?? 0} chunks`}
          icon={FileText}
          color="bg-purple-400"
        />
        <StatCard
          label="Chatbot Status"
          value={chatbotLive ? "Live" : "Offline"}
          delta={`${overview?.chatbotStatus.length ?? 0} bot(s)`}
          icon={Activity}
          color="bg-[#ccff00]"
        />
        <StatCard
          label="Monthly Usage"
          value={String(messageUsage)}
          delta="messages this month"
          icon={Gauge}
          color="bg-orange-400"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        <Panel className="xl:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Conversation Volume
            </h2>
            <Badge color="green">Recent</Badge>
          </div>
          <div className="flex items-end justify-between gap-3 h-56">
            {volumeBars.map((u, i) => (
              <div key={u.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={`w-full border-4 border-black rounded-t-lg ${barColors[i]}`}
                    style={{ height: `${u.value}%` }}
                  />
                </div>
                <span className="font-black text-xs uppercase">{u.day}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
            Quick Actions
          </h2>
          <div className="space-y-4">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className={`group flex items-center gap-4 border-4 border-black rounded-xl p-4 ${a.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all`}
              >
                <div className="border-2 border-black rounded-lg p-2 bg-white">
                  <a.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-black uppercase text-sm">{a.label}</div>
                  <div className="text-xs font-bold opacity-70">{a.desc}</div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Recent Conversations
          </h2>
          <Link
            href="/dashboard/conversations"
            className="font-black uppercase text-xs tracking-widest underline decoration-4 decoration-[#ccff00] underline-offset-4 hover:text-purple-600"
          >
            View All
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="font-bold text-black/50">No conversations yet.</p>
        ) : (
          <Table head={["Chat ID", "Last Message", "Time", "Status"]}>
            {recent.map((r) => {
              const last = r.messages?.[0];
              const shortId = r.id.slice(0, 8);
              return (
                <Tr key={r.id}>
                  <Td>
                    <Link
                      href="/dashboard/conversations"
                      className="font-mono font-black text-sm hover:underline"
                      title={r.id}
                    >
                      #{shortId}
                    </Link>
                  </Td>
                  <Td className="text-black/70">
                    {last?.content?.slice(0, 60) || "—"}
                  </Td>
                  <Td className="whitespace-nowrap text-black/50">
                    {formatRelativeTime(r.updatedAt)}
                  </Td>
                  <Td>
                    <Badge color={statusBadgeColor(r.status)}>{r.status}</Badge>
                  </Td>
                </Tr>
              );
            })}
          </Table>
        )}
      </Panel>
    </div>
  );
}
