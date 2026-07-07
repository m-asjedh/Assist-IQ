"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  MessagesSquare,
  BarChart3,
  Code2,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
  type LucideIcon,
} from "lucide-react";
import { GlobalStyles } from "../landingpage/Brutalism";

type NavItem = { label: string; href: string; icon: LucideIcon };

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Knowledge Base", href: "/dashboard/knowledge-base", icon: BookOpen },
  { label: "Chatbot", href: "/dashboard/chatbot", icon: Bot },
  { label: "Conversations", href: "/dashboard/conversations", icon: MessagesSquare },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Widget Setup", href: "/dashboard/widget-setup", icon: Code2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-6 border-b-4 border-black"
      >
        <img
          src="/logo.svg"
          alt="Assist IQ logo"
          className="w-8 h-8 rounded-md border-2 border-black"
        />
        <span className="font-black text-xl tracking-tighter">ASSIST IQ.</span>
      </Link>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === href
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-4 font-black uppercase text-sm tracking-wide transition-all ${
                active
                  ? "bg-[#ccff00] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "border-transparent hover:border-black hover:bg-neutral-100"
              }`}
            >
              <Icon size={18} strokeWidth={2.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-4 border-black">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl border-4 border-transparent hover:border-black hover:bg-neutral-100 font-black uppercase text-sm tracking-wide transition-all"
        >
          <LogOut size={18} strokeWidth={2.5} />
          Log Out
        </Link>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-[#f3f4f6]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-white border-r-4 border-black z-40">
          <SidebarContent />
        </aside>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="w-72 bg-white border-r-4 border-black">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="border-4 border-black rounded-lg p-1 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </div>
            <div
              className="flex-1 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
          </div>
        )}

        <div className="lg:pl-72">
          {/* Topbar */}
          <header className="sticky top-0 z-30 bg-white border-b-4 border-black">
            <div className="flex items-center gap-4 px-6 py-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden border-4 border-black rounded-lg p-1 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>

              <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md border-4 border-black rounded-full px-4 py-2 bg-neutral-50">
                <Search size={18} />
                <input
                  placeholder="Search..."
                  className="bg-transparent outline-none font-bold text-sm w-full placeholder:text-black/40"
                />
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  className="relative border-4 border-black rounded-full p-2 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 border-2 border-black rounded-full" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 border-4 border-black rounded-full pl-1 pr-3 py-1 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <div className="w-8 h-8 bg-purple-400 border-2 border-black rounded-full" />
                    <span className="hidden sm:block font-black uppercase text-xs tracking-wide">
                      Jane D.
                    </span>
                    <ChevronDown size={16} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-2 z-50">
                      <div className="px-3 py-2 border-b-2 border-black/10 mb-1">
                        <div className="font-black text-sm">Jane Doe</div>
                        <div className="text-xs font-bold text-black/50">
                          jane@company.com
                        </div>
                      </div>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-100 font-bold text-sm"
                      >
                        <User size={16} /> Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-100 font-bold text-sm"
                      >
                        <Settings size={16} /> Settings
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-100 font-bold text-sm"
                      >
                        <LogOut size={16} /> Log Out
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="p-6 md:p-10">{children}</main>
        </div>
      </div>
    </>
  );
}
