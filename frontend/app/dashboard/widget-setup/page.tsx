"use client";

import React, { useState } from "react";
import { Copy, Check, Bot, Globe } from "lucide-react";
import { NeoButton } from "@/src/components/landingpage/Brutalism";
import {
  Panel,
  SectionHeader,
  Badge,
} from "@/src/components/dashboard/primitives";

const snippet = `<script src="https://assistiq.ai/widget.js" data-chatbot-id="demo_123"></script>`;

const steps = [
  { title: "Copy the snippet", desc: "Grab the one-line script below." },
  { title: "Paste before </body>", desc: "Add it to every page you want the bot on." },
  { title: "Publish & go live", desc: "The widget appears instantly — no deploy needed." },
];

export default function WidgetSetupPage() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Widget Setup"
        subtitle="Add Assist IQ to your site in one line."
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Panel className="p-6">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
              Installation
            </h2>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={s.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 border-4 border-black rounded-full bg-[#ccff00] flex items-center justify-center font-black">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-black uppercase text-sm">{s.title}</div>
                    <div className="font-bold text-black/60 text-sm">
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel color="bg-black" className="p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="font-black uppercase text-xs tracking-widest text-[#ccff00]">
                Embed Code
              </span>
              <button
                onClick={copy}
                className="flex items-center gap-2 border-2 border-white rounded-full px-4 py-1.5 text-xs font-black uppercase hover:bg-white hover:text-black transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto text-sm font-mono bg-white/5 border border-white/20 rounded-xl p-4">
              <code>{snippet}</code>
            </pre>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight">
                Allowed Domain
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                defaultValue="www.yourcompany.com"
                className="flex-1 border-4 border-black rounded-xl px-4 py-3 font-bold outline-none"
              />
              <NeoButton variant="lime" className="text-sm justify-center">
                Save Domain
              </NeoButton>
            </div>
          </Panel>
        </div>

        <Panel color="bg-purple-400" className="p-6 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black uppercase tracking-tight">
              Preview
            </h2>
            <Badge color="black">Live</Badge>
          </div>

          <div className="relative border-4 border-black rounded-2xl bg-white h-80 overflow-hidden">
            <div className="absolute bottom-4 right-4 w-64">
              <div className="border-4 border-black rounded-2xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="flex items-center gap-2 bg-[#ccff00] border-b-4 border-black px-4 py-3">
                  <Bot size={18} />
                  <span className="font-black text-sm uppercase">Assist Bot</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="border-2 border-black rounded-xl bg-neutral-50 px-3 py-2 text-xs font-bold w-fit">
                    Hi! How can I help? 👋
                  </div>
                  <div className="border-2 border-black rounded-xl bg-[#ccff00] px-3 py-2 text-xs font-bold w-fit ml-auto">
                    Track my order
                  </div>
                </div>
                <div className="border-t-4 border-black px-3 py-2 flex items-center gap-2">
                  <div className="flex-1 border-2 border-black rounded-full px-3 py-1 text-xs text-black/40 font-bold">
                    Type a message...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
