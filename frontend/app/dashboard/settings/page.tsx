"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, Bell, Palette, Shield, Save, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader, cardClass, primaryBtnClass } from "@/components/shared";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

const notifOptions = [
  { id: "new_conv", label: "New conversation started", desc: "Get notified when a customer starts a chat" },
  { id: "resolved", label: "Conversation resolved", desc: "Notify when a chat is marked resolved" },
  { id: "weekly", label: "Weekly summary report", desc: "Receive a weekly analytics digest" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPw, setShowPw] = useState(false);
  const [notifs, setNotifs] = useState({ new_conv: true, resolved: false, weekly: true });
  const [botColor, setBotColor] = useState("#6366f1");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionHeader
        title="Settings"
        description="Manage your account, company, and chatbot settings."
        action={
          <Button onClick={save} className={primaryBtnClass}>
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tab Nav */}
        <div className="lg:col-span-1">
          <Card className={`${cardClass} p-2`}>
            <nav className="space-y-0.5">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id ? "gradient-bg text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card className={`${cardClass} p-6`}>
              <h3 className="font-semibold text-slate-900 mb-5">Profile Settings</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-xl font-bold">JD</div>
                <div>
                  <Button variant="outline" size="sm" className="font-semibold rounded-xl">Change Photo</Button>
                  <p className="text-xs text-slate-400 mt-1">JPG or PNG. Max 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "First Name", placeholder: "John", type: "text" },
                  { label: "Last Name", placeholder: "Doe", type: "text" },
                  { label: "Email Address", placeholder: "john@acme.com", type: "email" },
                  { label: "Phone Number", placeholder: "+1 (555) 000-0000", type: "tel" },
                ].map(({ label, placeholder, type }) => (
                  <div key={label}>
                    <label className="text-sm font-medium text-slate-700 block mb-1">{label}</label>
                    <input
                      type={type}
                      defaultValue={label === "First Name" ? "John" : label === "Last Name" ? "Doe" : label === "Email Address" ? "john@acme.com" : ""}
                      placeholder={placeholder}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "company" && (
            <Card className={`${cardClass} p-6`}>
              <h3 className="font-semibold text-slate-900 mb-5">Company Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "Company Name", placeholder: "Acme Inc.", value: "Acme Inc." },
                  { label: "Website", placeholder: "https://acme.com", value: "https://acme.com" },
                  { label: "Industry", placeholder: "SaaS / Technology", value: "SaaS / Technology" },
                  { label: "Company Size", placeholder: "10-50 employees", value: "10-50 employees" },
                ].map(({ label, placeholder, value }) => (
                  <div key={label}>
                    <label className="text-sm font-medium text-slate-700 block mb-1">{label}</label>
                    <input
                      type="text"
                      defaultValue={value}
                      placeholder={placeholder}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Company Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="We build tools that help businesses scale their customer support."
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all resize-none"
                  />
                </div>
              </div>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card className={`${cardClass} p-6`}>
              <h3 className="font-semibold text-slate-900 mb-5">Notification Settings</h3>
              <div className="space-y-4">
                {notifOptions.map(({ id, label, desc }) => (
                  <div key={id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifs((prev) => ({ ...prev, [id]: !prev[id as keyof typeof notifs] }))}
                      className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ${notifs[id as keyof typeof notifs] ? "gradient-bg" : "bg-slate-200"}`}
                      style={{ height: "22px", width: "40px" }}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${notifs[id as keyof typeof notifs] ? "translate-x-[18px]" : "translate-x-0"}`}
                        style={{ width: "18px", height: "18px", top: "2px", left: "2px" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "branding" && (
            <Card className={`${cardClass} p-6`}>
              <h3 className="font-semibold text-slate-900 mb-5">Chatbot Branding</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Bot Name</label>
                  <input
                    type="text"
                    defaultValue="SupportBot"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Welcome Message</label>
                  <textarea
                    rows={2}
                    defaultValue="Hi! How can I help you today? 👋"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    {["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setBotColor(c)}
                        className={`w-8 h-8 rounded-full transition-all ${botColor === c ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : ""}`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Widget Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Bottom Right", "Bottom Left"].map((pos) => (
                      <button
                        key={pos}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${pos === "Bottom Right" ? "gradient-bg text-white border-transparent" : "border-slate-200 text-slate-600"}`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className={`${cardClass} p-6`}>
              <h3 className="font-semibold text-slate-900 mb-5">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">Change Password</h4>
                  <div className="space-y-3">
                    {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                      <div key={label}>
                        <label className="text-sm font-medium text-slate-700 block mb-1">{label}</label>
                        <div className="relative">
                          <input
                            type={showPw ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPw(!showPw)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          >
                            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <Button className={primaryBtnClass}>Update Password</Button>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Authenticator App</p>
                      <p className="text-xs text-slate-500">Not configured</p>
                    </div>
                    <Button variant="outline" size="sm" className="font-semibold rounded-xl">Enable 2FA</Button>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">API Key</h4>
                  <p className="text-xs text-slate-500 mb-3">Use this key to access the SupportMind API</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-900 rounded-xl px-3 py-2.5 font-mono text-xs text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
                      sk-sm-••••••••••••••••••••••••••••••••
                    </div>
                    <Button variant="outline" size="sm" className="font-semibold rounded-xl">Reveal</Button>
                    <Button variant="outline" size="sm" className="font-semibold rounded-xl">Regenerate</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
