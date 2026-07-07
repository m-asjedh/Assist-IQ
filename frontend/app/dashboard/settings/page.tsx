"use client";

import React, { useState } from "react";
import { User, Building2, Bell, Palette, Shield } from "lucide-react";
import { NeoButton } from "@/src/components/landingpage/Brutalism";
import {
  Panel,
  SectionHeader,
} from "@/src/components/dashboard/primitives";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block mb-2 font-black uppercase text-xs tracking-widest">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold outline-none"
      />
    </label>
  );
}

function Toggle({ label, on = false }: { label: string; on?: boolean }) {
  const [active, setActive] = useState(on);
  return (
    <div className="flex items-center justify-between border-4 border-black rounded-xl px-4 py-3">
      <span className="font-black text-sm uppercase">{label}</span>
      <button
        onClick={() => setActive((v) => !v)}
        className={`w-14 h-8 border-4 border-black rounded-full flex items-center transition-colors ${
          active ? "bg-[#ccff00] justify-end" : "bg-neutral-200 justify-start"
        }`}
        aria-label={label}
      >
        <span className="w-6 h-6 bg-black rounded-full m-0.5" />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        title="Settings"
        subtitle="Manage your account and preferences."
        action={
          <NeoButton variant="lime" className="text-sm">
            Save Changes
          </NeoButton>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Panel className="p-4 h-fit">
          <div className="space-y-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-4 font-black uppercase text-sm tracking-wide transition-all ${
                  tab === t.id
                    ? "bg-[#ccff00] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "border-transparent hover:border-black hover:bg-neutral-100"
                }`}
              >
                <t.icon size={18} strokeWidth={2.5} />
                {t.label}
              </button>
            ))}
          </div>
        </Panel>

        <Panel className="lg:col-span-3 p-6">
          {tab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Profile
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-400 border-4 border-black rounded-full" />
                <NeoButton variant="white" className="text-xs">
                  Change Avatar
                </NeoButton>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Full Name" defaultValue="Jane Doe" />
                <Field label="Email" defaultValue="jane@company.com" type="email" />
              </div>
            </div>
          )}

          {tab === "company" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Company
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Company Name" defaultValue="Acme Inc." />
                <Field label="Website" defaultValue="www.acme.com" />
                <Field label="Industry" defaultValue="SaaS" />
                <Field label="Team Size" defaultValue="11-50" />
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Notifications
              </h2>
              <div className="space-y-3">
                <Toggle label="New Conversation Alerts" on />
                <Toggle label="Weekly Summary Email" on />
                <Toggle label="Escalation Alerts" on />
                <Toggle label="Product Updates" />
              </div>
            </div>
          )}

          {tab === "branding" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Chatbot Branding
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Bot Display Name" defaultValue="Assist Bot" />
                <Field label="Accent Color" defaultValue="#ccff00" />
              </div>
              <Toggle label="Show 'Powered by Assist IQ'" on />
            </div>
          )}

          {tab === "security" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Security
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Current Password" type="password" defaultValue="********" />
                <div className="hidden sm:block" />
                <Field label="New Password" type="password" />
                <Field label="Confirm Password" type="password" />
              </div>
              <Toggle label="Two-Factor Authentication" />
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
