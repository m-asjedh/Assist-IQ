"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, Clock, Send, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusBadge, SectionHeader, InitialsAvatar, AppBadge, cardClass } from "@/components/shared";
import { conversations } from "@/lib/data";

const sampleThread = [
  { role: "bot", text: "Hi! How can I help you today?" },
  { role: "user", text: "How do I reset my password?" },
  { role: "bot", text: "Sure! Go to Settings → Security → Change Password. You'll receive a reset email within a minute." },
  { role: "user", text: "Got it, thank you!" },
  { role: "bot", text: "You're welcome! Is there anything else I can help with?" },
];

export default function ConversationsPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = conversations.filter((c) => {
    const matchSearch = c.customer.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionHeader title="Conversations" description="View and manage all customer conversations." />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-180px)]">
        {/* Conversation List */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className={`${cardClass} flex flex-col h-full overflow-hidden`}>
            {/* Search & Filter */}
            <div className="p-3 border-b border-slate-100 space-y-2">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-sm outline-none flex-1 text-slate-700 placeholder-slate-400"
                />
              </div>
              <div className="flex gap-1.5">
                {["all", "open", "waiting", "resolved"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                      filter === f ? "gradient-bg text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {filtered.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelected(conv)}
                  className={`w-full text-left px-4 py-3.5 hover:bg-slate-50 transition-colors ${selected.id === conv.id ? "bg-indigo-50 border-l-2 border-indigo-600" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <InitialsAvatar initials={conv.avatar} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-slate-900 truncate">{conv.customer}</p>
                        <span className="text-xs text-slate-400 flex-shrink-0">{conv.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mb-1.5">{conv.lastMessage}</p>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={conv.status} />
                        <span className="text-xs text-slate-400">{conv.messages} msgs</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="w-8 h-8 text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">No conversations found</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Conversation Detail */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className={`${cardClass} flex flex-col h-full overflow-hidden`}>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <InitialsAvatar initials={selected.avatar} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">{selected.customer}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <StatusBadge status={selected.status} />
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selected.time}
                  </span>
                </div>
              </div>
              <AppBadge variant="info">{selected.messages} messages</AppBadge>
            </div>

            {/* Thread */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-slate-50">
              {sampleThread.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "gradient-bg text-white rounded-br-sm"
                        : "bg-white text-slate-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <InitialsAvatar initials={selected.avatar} size="sm" />
                  )}
                </div>
              ))}
            </div>

            {/* Reply box */}
            <div className="px-4 pb-4 pt-3 border-t border-slate-100">
              <div className="flex gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                <input
                  type="text"
                  placeholder="Add a note or reply..."
                  className="flex-1 px-2 py-1 text-sm outline-none bg-transparent text-slate-700 placeholder-slate-400"
                />
                <button className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
