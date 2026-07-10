"use client";

import React, { useEffect, useState } from "react";
import { Send, Sparkles, Bot } from "lucide-react";
import { NeoButton } from "@/src/components/landingpage/Brutalism";
import {
  Panel,
  SectionHeader,
  ChatBubble,
  Badge,
} from "@/src/components/dashboard/primitives";
import { api } from "@/lib/api";
import type { Chatbot } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/src/context/AuthProvider";

type Msg = { from: "bot" | "user"; text: string };

const suggestions = [
  "How do I reset my password?",
  "What are your business hours?",
  "Do you offer team plans?",
];

const colorSwatches = ["#ccff00", "#a855f7", "#fb923c", "#60a5fa", "#f472b6"];

export default function ChatbotPage() {
  const { user } = useAuth();
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [tone, setTone] = useState("professional");
  const [primary, setPrimary] = useState("#3B82F6");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const bots = await api.listChatbots();
        const bot = bots[0] ?? null;
        if (cancelled) return;
        if (!bot) {
          setError("No chatbot found for your company.");
          return;
        }
        setChatbot(bot);
        setName(bot.name);
        setWelcomeMessage(bot.welcomeMessage);
        setTone(bot.tone);
        setPrimary(bot.primaryColor);
        setMessages([{ from: "bot", text: bot.welcomeMessage }]);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load chatbot",
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

  const ensureConversation = async () => {
    if (conversationId || !chatbot) return conversationId;
    const started = await api.startConversation({
      chatbotId: chatbot.id,
      visitorName: user?.fullName,
      visitorEmail: user?.email,
    });
    setConversationId(started.conversation.id);
    return started.conversation.id;
  };

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || !chatbot || sending) return;

    setSending(true);
    setError("");
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");

    try {
      const id = await ensureConversation();
      if (!id) throw new Error("Could not start conversation");
      const reply = await api.sendMessage(id, t);
      setMessages((m) => [...m, { from: "bot", text: reply.content }]);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to send message");
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Sorry — I couldn't answer that right now. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const saveSettings = async () => {
    if (!chatbot) return;
    setSaving(true);
    setSaveMsg("");
    setError("");
    try {
      const updated = await api.updateChatbot(chatbot.id, {
        name,
        welcomeMessage,
        tone,
        primaryColor: primary,
      });
      setChatbot(updated);
      setSaveMsg("Settings saved.");
      if (!conversationId) {
        setMessages([{ from: "bot", text: updated.welcomeMessage }]);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto font-black uppercase tracking-widest">
        Loading chatbot...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Chatbot Playground"
        subtitle="Test how your bot answers before going live."
      />

      {(error || saveMsg) && (
        <div
          className={`mb-6 border-4 border-black rounded-xl px-4 py-3 font-bold ${
            error ? "bg-orange-200" : "bg-[#ccff00]"
          }`}
        >
          {error || saveMsg}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Panel className="xl:col-span-2 flex flex-col h-[600px]">
          <div className="flex items-center gap-3 px-6 py-4 border-b-4 border-black">
            <div
              className="border-2 border-black rounded-lg p-2"
              style={{ backgroundColor: primary }}
            >
              <Bot size={20} />
            </div>
            <div>
              <div className="font-black uppercase text-sm">
                {chatbot?.name ?? "Assist Bot"}
              </div>
              <div className="text-xs font-bold text-green-600">
                {chatbot?.status === "ACTIVE" ? "● Online" : "● Offline"}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <ChatBubble key={i} from={m.from}>
                {m.text}
              </ChatBubble>
            ))}
            {sending && (
              <ChatBubble from="bot">Thinking...</ChatBubble>
            )}
          </div>

          <div className="px-6 pt-2 pb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => void send(s)}
                disabled={sending}
                className="border-2 border-black rounded-full px-3 py-1 text-xs font-bold bg-neutral-50 hover:bg-[#ccff00] transition-colors disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-3 p-4 border-t-4 border-black"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              disabled={sending || !chatbot}
              className="flex-1 border-4 border-black rounded-full px-5 py-3 font-bold outline-none placeholder:text-black/30"
            />
            <button
              type="submit"
              disabled={sending || !chatbot}
              className="border-4 border-black rounded-full p-3 bg-[#ccff00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold outline-none"
              />
            </label>

            <label className="block">
              <span className="block mb-2 font-black uppercase text-xs tracking-widest">
                Welcome Message
              </span>
              <textarea
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                rows={3}
                className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold outline-none resize-none"
              />
            </label>

            <label className="block">
              <span className="block mb-2 font-black uppercase text-xs tracking-widest">
                Tone
              </span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold outline-none bg-white"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="playful">Playful</option>
                <option value="concise">Concise</option>
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
                      primary === c
                        ? "scale-110 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : ""
                    }`}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Badge color={chatbot?.status === "ACTIVE" ? "green" : "gray"}>
                {chatbot?.status === "ACTIVE" ? "Live" : "Inactive"}
              </Badge>
              <NeoButton
                variant="lime"
                className="text-sm"
                disabled={saving || !chatbot}
                onClick={() => void saveSettings()}
              >
                {saving ? "Saving..." : "Save"}
              </NeoButton>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
