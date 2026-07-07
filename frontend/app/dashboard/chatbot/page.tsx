"use client";

import React, { useState } from "react";
import { Send, Sparkles, Bot } from "lucide-react";
import { NeoButton } from "@/src/components/landingpage/Brutalism";
import {
  Panel,
  SectionHeader,
  ChatBubble,
  Badge,
} from "@/src/components/dashboard/primitives";

type Msg = { from: "bot" | "user"; text: string };

const initialMessages: Msg[] = [
  { from: "bot", text: "Hi! I'm your Assist IQ bot. Ask me anything about your product." },
  { from: "user", text: "What's your refund policy?" },
  { from: "bot", text: "You can request a full refund within 30 days of purchase, no questions asked. Want me to start one for you?" },
];

const suggestions = [
  "How do I reset my password?",
  "What are your business hours?",
  "Do you offer team plans?",
];

const colorSwatches = ["#ccff00", "#a855f7", "#fb923c", "#60a5fa", "#f472b6"];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [primary, setPrimary] = useState("#ccff00");

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: t },
      { from: "bot", text: "Great question! Based on your docs, here's what I found — this is a demo response." },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Chatbot Playground"
        subtitle="Test how your bot answers before going live."
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Panel className="xl:col-span-2 flex flex-col h-[600px]">
          <div className="flex items-center gap-3 px-6 py-4 border-b-4 border-black">
            <div className="border-2 border-black rounded-lg p-2 bg-[#ccff00]">
              <Bot size={20} />
            </div>
            <div>
              <div className="font-black uppercase text-sm">Assist Bot</div>
              <div className="text-xs font-bold text-green-600">● Online</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <ChatBubble key={i} from={m.from}>
                {m.text}
              </ChatBubble>
            ))}
          </div>

          <div className="px-6 pt-2 pb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="border-2 border-black rounded-full px-3 py-1 text-xs font-bold bg-neutral-50 hover:bg-[#ccff00] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-3 p-4 border-t-4 border-black"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border-4 border-black rounded-full px-5 py-3 font-bold outline-none placeholder:text-black/30"
            />
            <button
              type="submit"
              className="border-4 border-black rounded-full p-3 bg-[#ccff00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              aria-label="Send"
            >
              <Send size={20} />
            </button>
          </form>
        </Panel>

        <Panel className="p-6 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={20} />
            <h2 className="text-xl font-black uppercase tracking-tight">
              Bot Settings
            </h2>
          </div>

          <div className="space-y-6">
            <label className="block">
              <span className="block mb-2 font-black uppercase text-xs tracking-widest">
                Bot Name
              </span>
              <input
                defaultValue="Assist Bot"
                className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold outline-none"
              />
            </label>

            <label className="block">
              <span className="block mb-2 font-black uppercase text-xs tracking-widest">
                Welcome Message
              </span>
              <textarea
                defaultValue="Hi! How can I help you today?"
                rows={3}
                className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold outline-none resize-none"
              />
            </label>

            <label className="block">
              <span className="block mb-2 font-black uppercase text-xs tracking-widest">
                Tone
              </span>
              <select className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold outline-none bg-white">
                <option>Friendly</option>
                <option>Professional</option>
                <option>Playful</option>
                <option>Concise</option>
              </select>
            </label>

            <div>
              <span className="block mb-2 font-black uppercase text-xs tracking-widest">
                Primary Color
              </span>
              <div className="flex gap-3">
                {colorSwatches.map((c) => (
                  <button
                    key={c}
                    onClick={() => setPrimary(c)}
                    style={{ backgroundColor: c }}
                    className={`w-9 h-9 rounded-full border-4 border-black transition-transform ${
                      primary === c ? "scale-110 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : ""
                    }`}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Badge color="green">Live</Badge>
              <NeoButton variant="lime" className="text-sm">
                Save
              </NeoButton>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
