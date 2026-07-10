"use client";

import React, { useEffect, useState } from "react";
import { User, Building2, Bell, Palette, Shield } from "lucide-react";
import { NeoButton } from "@/src/components/landingpage/Brutalism";
import {
  Panel,
  SectionHeader,
} from "@/src/components/dashboard/primitives";
import { api } from "@/lib/api";
import { useAuth } from "@/src/context/AuthProvider";
import { ApiError } from "@/lib/api/client";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="block mb-2 font-black uppercase text-xs tracking-widest">
        {label}
      </span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold outline-none disabled:bg-neutral-100"
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
  const { user, company, refresh } = useAuth();
  const [tab, setTab] = useState("profile");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [botName, setBotName] = useState("");
  const [accentColor, setAccentColor] = useState("#ccff00");
  const [chatbotId, setChatbotId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCompanyName(company?.name ?? "");
    setWebsite(company?.website ?? "");
    setIndustry(company?.industry ?? "");
  }, [company]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const bots = await api.listChatbots();
        if (cancelled || !bots[0]) return;
        setChatbotId(bots[0].id);
        setBotName(bots[0].name);
        setAccentColor(bots[0].primaryColor);
      } catch {
        /* optional */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      if (tab === "company") {
        await api.updateCompany({
          name: companyName,
          website: website || undefined,
          industry: industry || undefined,
        });
        await refresh();
        setMessage("Company updated.");
      } else if (tab === "branding" && chatbotId) {
        await api.updateChatbot(chatbotId, {
          name: botName,
          primaryColor: accentColor,
        });
        setMessage("Branding updated.");
      } else {
        setMessage("Nothing to save on this tab yet.");
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        title="Settings"
        subtitle="Manage your account and preferences."
        action={
          <NeoButton
            variant="lime"
            className="text-sm"
            disabled={saving}
            onClick={() => void save()}
          >
            {saving ? "Saving..." : "Save Changes"}
          </NeoButton>
        }
      />

      {(error || message) && (
        <div
          className={`mb-6 border-4 border-black rounded-xl px-4 py-3 font-bold ${
            error ? "bg-orange-200" : "bg-[#ccff00]"
          }`}
        >
          {error || message}
        </div>
      )}

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
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  label="Full Name"
                  value={user?.fullName ?? ""}
                  disabled
                />
                <Field
                  label="Email"
                  value={user?.email ?? ""}
                  type="email"
                  disabled
                />
              </div>
              <p className="text-sm font-bold text-black/50">
                Profile fields are managed by your account and can&apos;t be
                edited here yet.
              </p>
            </div>
          )}

          {tab === "company" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Company
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  label="Company Name"
                  value={companyName}
                  onChange={setCompanyName}
                />
                <Field
                  label="Website"
                  value={website}
                  onChange={setWebsite}
                />
                <Field
                  label="Industry"
                  value={industry}
                  onChange={setIndustry}
                />
                <Field
                  label="Slug"
                  value={company?.slug ?? ""}
                  disabled
                />
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
              <p className="text-sm font-bold text-black/50">
                Notification preferences are UI-only for now.
              </p>
            </div>
          )}

          {tab === "branding" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Chatbot Branding
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  label="Bot Display Name"
                  value={botName}
                  onChange={setBotName}
                />
                <Field
                  label="Accent Color"
                  value={accentColor}
                  onChange={setAccentColor}
                />
              </div>
              <Toggle label="Show 'Powered by Assist IQ'" on />
            </div>
          )}

          {tab === "security" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Security
              </h2>
              <p className="font-bold text-black/50">
                Password change isn&apos;t available via API yet.
              </p>
              <Toggle label="Two-Factor Authentication" />
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
