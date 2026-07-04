"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, RefreshCw, Settings, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader, cardClass, primaryBtnClass } from "@/components/shared";
import { chatMessages, suggestedQuestions } from "@/lib/data";

const tones = ["Friendly", "Professional", "Concise", "Detailed"];
const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export default function ChatbotPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [botName, setBotName] = useState("SupportBot");
  const [welcome, setWelcome] = useState("Hi! How can I help you today?");
  const [tone, setTone] = useState("Friendly");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");

  const send = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", text: msg },
      { id: prev.length + 2, role: "bot", text: "Thanks for your question! Based on our knowledge base, I'll look into that for you. Is there anything else I can help you with?" },
    ]);
    setInput("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionHeader
        title="Chatbot Playground"
        description="Test your chatbot and configure its appearance and behavior."
        action={<Button className={primaryBtnClass}><Sparkles className="w-4 h-4" /> Save Settings</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className={`${cardClass} flex flex-col h-[600px]`}>
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100" style={{ borderTopColor: primaryColor }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: primaryColor }}>
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{botName}</p>
                <p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Online</p>
              </div>
              <button
                onClick={() => setMessages(chatMessages)}
                className="ml-auto text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                title="Reset chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5" style={{ background: primaryColor }}>
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "bg-slate-100 text-slate-800 rounded-bl-sm"
                    }`}
                    style={msg.role === "user" ? { background: primaryColor } : {}}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Questions */}
            <div className="px-5 pb-2 flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all bg-white"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex gap-2 border border-slate-200 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-400 transition-all bg-white">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type a message..."
                  className="flex-1 px-2 py-1 text-sm outline-none bg-transparent"
                />
                <button
                  onClick={() => send()}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-90"
                  style={{ background: primaryColor }}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="space-y-4">
          <Card className={`${cardClass} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-900">Bot Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1.5">Bot Name</label>
                <input
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1.5">Welcome Message</label>
                <textarea
                  value={welcome}
                  onChange={(e) => setWelcome(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-2">Response Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                        tone === t ? "gradient-bg text-white border-transparent" : "border-slate-200 text-slate-600 hover:border-indigo-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-2">Primary Color</label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setPrimaryColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${primaryColor === c ? "border-slate-400 scale-110" : "border-transparent"}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className={`${cardClass} p-5`}>
            <h3 className="font-semibold text-slate-900 mb-3">Widget Preview</h3>
            <div className="bg-slate-100 rounded-xl p-4 flex flex-col items-end gap-2">
              <div className="bg-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm max-w-[80%] text-right">
                <p className="text-xs text-slate-600">How do I reset my password?</p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: primaryColor }}>
                <Bot className="w-3.5 h-3.5" />
              </div>
              <button
                className="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg"
                style={{ background: primaryColor }}
              >
                <Bot className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">Live preview of your chat widget</p>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
