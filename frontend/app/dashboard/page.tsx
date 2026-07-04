"use client";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Bot, BarChart3, ArrowUpRight, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard, StatusBadge, SectionHeader, InitialsAvatar, cardClass, primaryBtnClass } from "@/components/shared";
import { recentConversations } from "@/lib/data";

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const stats = [
  { label: "Total Conversations", value: "12,847", change: "+18% this month", icon: <MessageSquare className="w-5 h-5 text-indigo-600" />, gradient: "bg-indigo-50" },
  { label: "Documents Uploaded", value: "34", change: "+3 this week", icon: <FileText className="w-5 h-5 text-violet-600" />, gradient: "bg-violet-50" },
  { label: "Chatbot Status", value: "Active", change: "🟢 Online now", icon: <Bot className="w-5 h-5 text-emerald-600" />, gradient: "bg-emerald-50" },
  { label: "Monthly Usage", value: "8,240", change: "Conversations this month", icon: <BarChart3 className="w-5 h-5 text-cyan-600" />, gradient: "bg-cyan-50" },
];

const quickActions = [
  { label: "Upload Document", href: "/dashboard/knowledge-base", icon: FileText, color: "text-indigo-600 bg-indigo-50" },
  { label: "Test Chatbot", href: "/dashboard/chatbot", icon: Bot, color: "text-violet-600 bg-violet-50" },
  { label: "View Analytics", href: "/dashboard/analytics", icon: BarChart3, color: "text-cyan-600 bg-cyan-50" },
  { label: "Get Embed Code", href: "/dashboard/widget-setup", icon: ExternalLink, color: "text-emerald-600 bg-emerald-50" },
];

const chartBars = [40, 65, 50, 80, 60, 90, 75, 95, 70, 85, 60, 100];

export default function DashboardPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp}>
        <SectionHeader
          title="Dashboard"
          description="Welcome back, John. Here's what's happening today."
          action={
            <Link href="/dashboard/knowledge-base">
              <Button className={primaryBtnClass}><Plus className="w-4 h-4" /> Upload Doc</Button>
            </Link>
          }
        />
      </motion.div>

      {/* Stats */}
      <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Usage Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card className={`${cardClass} p-5 h-full`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-slate-900">Conversation Volume</h3>
                <p className="text-xs text-slate-400">Last 12 months</p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">↑ 18%</span>
            </div>
            <div className="flex items-end gap-1.5 h-36">
              {chartBars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full gradient-bg rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                    title={`Month ${i + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                <span key={m} className="text-xs text-slate-400 flex-1 text-center">{m}</span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeUp}>
          <Card className={`${cardClass} p-5 h-full`}>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(({ label, href, icon: Icon, color }) => (
                <Link key={label} href={href} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center leading-tight">{label}</span>
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Conversations */}
      <motion.div variants={fadeUp}>
        <Card className={cardClass}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <h3 className="font-semibold text-slate-900">Recent Conversations</h3>
            <Link href="/dashboard/conversations" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentConversations.map((conv) => (
              <div key={conv.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <InitialsAvatar initials={conv.customer.split(" ").map((n) => n[0]).join("")} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{conv.customer}</p>
                  <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={conv.status} />
                  <span className="text-xs text-slate-400 hidden sm:block">{conv.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
