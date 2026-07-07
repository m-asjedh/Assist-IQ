"use client";

import React from "react";
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

const usage = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 38 },
  { day: "Sun", value: 55 },
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

const recent = [
  { name: "Sarah Malik", msg: "How do I request a refund?", time: "2m ago", status: "Resolved", color: "green" },
  { name: "David Chen", msg: "Widget not loading on Safari", time: "18m ago", status: "Open", color: "orange" },
  { name: "Amara Okoye", msg: "Can I export my chat history?", time: "1h ago", status: "Waiting", color: "blue" },
  { name: "Liam Wright", msg: "Pricing for 5 seats?", time: "3h ago", status: "Resolved", color: "green" },
];

const quickActions = [
  { label: "Upload Docs", desc: "Add to knowledge base", href: "/dashboard/knowledge-base", icon: Upload, color: "bg-purple-400" },
  { label: "Test Chatbot", desc: "Open the playground", href: "/dashboard/chatbot", icon: Bot, color: "bg-[#ccff00]" },
  { label: "Get Widget", desc: "Install on your site", href: "/dashboard/widget-setup", icon: Code2, color: "bg-orange-400" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Dashboard"
        subtitle="Welcome back, Jane. Here's what's happening."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Conversations" value="12,480" delta="+8.2% this week" icon={MessagesSquare} />
        <StatCard label="Documents Uploaded" value="34" delta="4 added today" icon={FileText} color="bg-purple-400" />
        <StatCard label="Chatbot Status" value="Live" delta="99.9% uptime" icon={Activity} color="bg-[#ccff00]" />
        <StatCard label="Monthly Usage" value="8,240" delta="of 10,000 msgs" icon={Gauge} color="bg-orange-400" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        <Panel className="xl:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Conversation Volume
            </h2>
            <Badge color="green">Last 7 Days</Badge>
          </div>
          <div className="flex items-end justify-between gap-3 h-56">
            {usage.map((u, i) => (
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
        <Table head={["Customer", "Last Message", "Time", "Status"]}>
          {recent.map((r, i) => (
            <Tr key={i}>
              <Td>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-full" />
                  {r.name}
                </div>
              </Td>
              <Td className="text-black/70">{r.msg}</Td>
              <Td className="whitespace-nowrap text-black/50">{r.time}</Td>
              <Td>
                <Badge color={r.color}>{r.status}</Badge>
              </Td>
            </Tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}
