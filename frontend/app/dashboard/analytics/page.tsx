"use client";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, BarChart3, MessageSquare, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader, ProgressBar, cardClass } from "@/components/shared";
import { topQuestions } from "@/lib/data";

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const weeklyData = [60, 80, 55, 90, 70, 85, 95, 60, 75, 88, 65, 100, 78, 92];
const months = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const kpiCards = [
  { label: "Resolution Rate", value: "94%", change: "+2% vs last month", icon: ThumbsUp, color: "text-emerald-600 bg-emerald-50" },
  { label: "Avg. Response Time", value: "1.2s", change: "-0.3s vs last month", icon: Clock, color: "text-cyan-600 bg-cyan-50" },
  { label: "Customer Satisfaction", value: "4.8/5", change: "+0.2 vs last month", icon: Star, color: "text-amber-600 bg-amber-50" },
  { label: "Total Conversations", value: "12,847", change: "+18% vs last month", icon: MessageSquare, color: "text-indigo-600 bg-indigo-50" },
];

const usageBreakdown = [
  { label: "Product questions", value: 38, color: "bg-indigo-500" },
  { label: "Account & access", value: 24, color: "bg-violet-500" },
  { label: "Account issues", value: 19, color: "bg-cyan-500" },
  { label: "Technical support", value: 12, color: "bg-emerald-500" },
  { label: "Other", value: 7, color: "bg-slate-300" },
];

export default function AnalyticsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp}>
        <SectionHeader title="Analytics" description="Insights into your chatbot's performance and customer interactions." />
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpiCards.map(({ label, value, change, icon: Icon, color }) => (
          <motion.div key={label} variants={fadeUp}>
            <Card className={`${cardClass} p-5`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{change.startsWith("+") || change.startsWith("-") ? change : "+"}{change.startsWith("+") || change.startsWith("-") ? "" : ""}</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 mb-0.5">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{change}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Volume Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card className={`${cardClass} p-5`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-slate-900">Conversation Volume</h3>
                <p className="text-xs text-slate-400">Last 14 days</p>
              </div>
              <div className="flex gap-2">
                {["7D", "14D", "30D"].map((d) => (
                  <button key={d} className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${d === "14D" ? "gradient-bg text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-1 h-40">
              {weeklyData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full gradient-bg rounded-t-md opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ height: `${h}%` }}
                    title={`${Math.round(h * 12)} conversations`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {months.map((m, i) => (
                <span key={i} className="text-xs text-slate-400 flex-1 text-center">{m}</span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Usage Breakdown */}
        <motion.div variants={fadeUp}>
          <Card className={`${cardClass} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-900">Topic Breakdown</h3>
            </div>
            <div className="space-y-3 mb-4">
              {usageBreakdown.map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-600">{label}</span>
                    <span className="text-xs font-semibold text-slate-900">{value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Donut visual */}
            <div className="flex justify-center mt-4">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 42 42" className="w-24 h-24 -rotate-90">
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="#6366f1" strokeWidth="6" strokeDasharray="38 62" strokeDashoffset="0" />
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="24 76" strokeDashoffset="-38" />
                  <circle cx="21" cy="21" r="15.915" fill="none" stroke="#06b6d4" strokeWidth="6" strokeDasharray="19 81" strokeDashoffset="-62" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-900">100%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Top Questions */}
      <motion.div variants={fadeUp}>
        <Card className={`${cardClass} p-5`}>
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-slate-500" />
            <h3 className="font-semibold text-slate-900">Top Customer Questions</h3>
            <span className="text-xs text-slate-400 ml-auto">Last 30 days</span>
          </div>
          <div className="space-y-4">
            {topQuestions.map((q, i) => (
              <div key={q.question} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-800 truncate">{q.question}</span>
                    <span className="text-xs font-semibold text-slate-900 ml-3 flex-shrink-0">{q.count}</span>
                  </div>
                  <ProgressBar value={q.percent} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
