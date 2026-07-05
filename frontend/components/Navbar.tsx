"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Menu, X, Bell, Search } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:pt-5">
      <nav className="mx-auto max-w-5xl rounded-full border border-white/[0.08] bg-[#0a0a0a]/70 backdrop-blur-xl shadow-lg shadow-black/40">
        <div className="flex h-12 sm:h-14 items-center justify-between px-3 sm:px-5">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Bot className="size-4 sm:size-5 text-emerald-400" />
            <span className="font-bold text-sm sm:text-base text-white tracking-tight">
              SupportMind
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors font-medium px-3.5 py-2 rounded-full hover:bg-white/[0.05]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              className="relative flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-black">
                3
              </span>
            </button>
            <Link
              href="/register"
              className="flex size-9 items-center justify-center rounded-full bg-emerald-400/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs"
            >
              SM
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-full"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-white/[0.06] mx-3 mb-3"
            >
              <div className="py-3 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-zinc-300 font-medium py-2.5 px-3 rounded-lg hover:bg-white/[0.04]"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="flex gap-2 pt-3 mt-2 border-t border-white/[0.06]">
                  <Link
                    href="/login"
                    className="flex-1 text-center py-2.5 text-zinc-400 font-medium text-sm"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center py-2.5 rounded-full bg-emerald-400 text-black font-semibold text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
