"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import {
  Panel,
  SectionHeader,
  Badge,
  ChatBubble,
} from "@/src/components/dashboard/primitives";

type Convo = {
  name: string;
  last: string;
  time: string;
  status: string;
  color: string;
  thread: { from: "bot" | "user"; text: string }[];
};

const conversations: Convo[] = [
  {
    name: "Sarah Malik",
    last: "How do I request a refund?",
    time: "2m ago",
    status: "Resolved",
    color: "green",
    thread: [
      { from: "user", text: "How do I request a refund?" },
      { from: "bot", text: "You can request a refund within 30 days from your billing page. Want the link?" },
      { from: "user", text: "Yes please!" },
      { from: "bot", text: "Here you go: /dashboard/billing. Anything else?" },
    ],
  },
  {
    name: "David Chen",
    last: "Widget not loading on Safari",
    time: "18m ago",
    status: "Open",
    color: "orange",
    thread: [
      { from: "user", text: "The widget won't load on Safari." },
      { from: "bot", text: "Sorry about that! Are you on the latest Safari version? Try clearing cache first." },
    ],
  },
  {
    name: "Amara Okoye",
    last: "Can I export my chat history?",
    time: "1h ago",
    status: "Waiting",
    color: "blue",
    thread: [
      { from: "user", text: "Can I export my chat history?" },
      { from: "bot", text: "Yes — head to Conversations and hit export. Want me to walk you through it?" },
    ],
  },
  {
    name: "Liam Wright",
    last: "Pricing for 5 seats?",
    time: "3h ago",
    status: "Resolved",
    color: "green",
    thread: [
      { from: "user", text: "What's pricing for 5 seats?" },
      { from: "bot", text: "Assist IQ is free for teams! Every plan is included at no cost." },
    ],
  },
];

const filters = ["All", "Resolved", "Open", "Waiting"];

export default function ConversationsPage() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("All");

  const list =
    filter === "All"
      ? conversations
      : conversations.filter((c) => c.status === filter);
  const current = conversations[active];

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Conversations"
        subtitle="Every chat your bot has handled."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel className="lg:col-span-2 p-4 h-fit">
          <div className="flex items-center gap-2 border-4 border-black rounded-full px-4 py-2 bg-neutral-50 mb-4">
            <Search size={16} />
            <input
              placeholder="Search chats..."
              className="bg-transparent outline-none font-bold text-sm w-full placeholder:text-black/40"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border-2 border-black rounded-full px-3 py-1 text-xs font-black uppercase transition-colors ${
                  filter === f ? "bg-[#ccff00]" : "bg-white hover:bg-neutral-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {list.map((c) => {
              const idx = conversations.indexOf(c);
              return (
                <button
                  key={c.name}
                  onClick={() => setActive(idx)}
                  className={`w-full text-left border-4 rounded-xl p-3 transition-all ${
                    idx === active
                      ? "border-black bg-[#ccff00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "border-black/20 hover:border-black bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-sm">{c.name}</span>
                    <span className="text-xs font-bold text-black/40">
                      {c.time}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-black/60 truncate mb-2">
                    {c.last}
                  </div>
                  <Badge color={c.color}>{c.status}</Badge>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel className="lg:col-span-3 flex flex-col h-[600px]">
          <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full" />
              <div>
                <div className="font-black">{current.name}</div>
                <div className="text-xs font-bold text-black/50">
                  {current.time}
                </div>
              </div>
            </div>
            <Badge color={current.color}>{current.status}</Badge>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {current.thread.map((m, i) => (
              <ChatBubble key={i} from={m.from}>
                {m.text}
              </ChatBubble>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
