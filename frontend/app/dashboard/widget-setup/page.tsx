"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Copy, Check, Globe, Bot, MessageSquare, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader, cardClass, primaryBtnClass } from "@/components/shared";

const snippet = `<!-- SupportMind AI Widget -->
<script
  src="https://supportmind.ai/widget.js"
  data-chatbot-id="demo_123"
  data-color="#6366f1"
  data-position="bottom-right"
></script>`;

const steps = [
  { step: "1", title: "Copy the code snippet", desc: "Copy the script tag from the code block below." },
  { step: "2", title: "Paste before </body>", desc: "Add it just before the closing </body> tag in your HTML." },
  { step: "3", title: "Add your domain", desc: "Enter your website domain below to whitelist it for the widget." },
  { step: "4", title: "You're live!", desc: "The chat widget will appear on your website within seconds." },
];

export default function WidgetSetupPage() {
  const [copied, setCopied] = useState(false);
  const [domain, setDomain] = useState("https://mywebsite.com");
  const [widgetOpen, setWidgetOpen] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionHeader
        title="Widget Setup"
        description="Install the SupportMind chat widget on your website in minutes."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Steps */}
          <Card className={`${cardClass} p-6`}>
            <h3 className="font-semibold text-slate-900 mb-5">Installation Steps</h3>
            <div className="space-y-4">
              {steps.map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full gradient-bg text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Code Snippet */}
          <Card className={`${cardClass} overflow-hidden`}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">Embed Code</span>
              </div>
              <button
                onClick={copy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copied ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <div className="bg-slate-900 px-5 py-5">
              <pre className="text-sm text-slate-100 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <code>{snippet}</code>
              </pre>
            </div>
          </Card>

          {/* Domain Whitelist */}
          <Card className={`${cardClass} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-900">Allowed Domains</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">Add domains that are allowed to load your chat widget.</p>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300">
                <Globe className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="https://yourdomain.com"
                  className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent"
                />
              </div>
              <Button className={primaryBtnClass}>Add Domain</Button>
            </div>
            <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs text-slate-600">mywebsite.com — Active</span>
              <button className="ml-auto text-xs text-red-500 hover:underline">Remove</button>
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <Card className={`${cardClass} p-5`}>
            <h3 className="font-semibold text-slate-900 mb-4">Widget Preview</h3>
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-4 min-h-64 relative flex items-end justify-end">
              {/* Mock site */}
              <div className="absolute inset-4 bg-white rounded-xl border border-slate-200 p-3 overflow-hidden">
                <div className="h-3 bg-slate-200 rounded mb-2 w-3/4" />
                <div className="h-2 bg-slate-100 rounded mb-1.5 w-full" />
                <div className="h-2 bg-slate-100 rounded mb-1.5 w-5/6" />
                <div className="h-2 bg-slate-100 rounded w-4/6" />
              </div>

              {/* Widget bubble */}
              {widgetOpen && (
                <div className="absolute bottom-16 right-4 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-10">
                  <div className="gradient-bg px-3 py-2.5 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">SupportBot</span>
                    <button onClick={() => setWidgetOpen(false)} className="ml-auto text-white/70 text-lg leading-none">×</button>
                  </div>
                  <div className="px-3 py-3 space-y-2">
                    <div className="bg-slate-100 rounded-xl rounded-tl-sm px-3 py-2 text-xs text-slate-700 max-w-[90%]">
                      Hi! How can I help you today? 👋
                    </div>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="flex gap-1 border border-slate-200 rounded-xl p-1">
                      <input className="flex-1 text-xs px-1 outline-none text-slate-600" placeholder="Type a message..." readOnly />
                      <button className="w-6 h-6 gradient-bg rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setWidgetOpen(!widgetOpen)}
                className="relative z-10 w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-opacity"
              >
                <Bot className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center mt-3">Click the button to preview the widget</p>
          </Card>

          <Card className={`${cardClass} p-5`}>
            <h3 className="font-semibold text-slate-900 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Widget loads", value: "12,847" },
                { label: "Chats started", value: "3,241" },
                { label: "Engagement rate", value: "25.2%" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-semibold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className={`${cardClass} p-5`}>
            <h3 className="font-semibold text-slate-900 mb-3">Platform Guides</h3>
            <div className="space-y-2">
              {["WordPress", "Shopify", "Webflow", "Wix"].map((platform) => (
                <a key={platform} href="#" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="text-sm text-slate-700">{platform}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
