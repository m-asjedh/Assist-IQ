"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Eye, EyeOff, Mail, Lock } from "lucide-react";
import Noise from "@/components/Noise";
import GridBackground from "@/components/GridBackground";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 hero-gradient flex-col justify-between p-12 relative overflow-hidden">
        <GridBackground />
        <Noise opacity={0.06} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/15 mesh-orb" />
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg">SupportMind AI</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-4 leading-snug">
            Your AI support team,<br />working 24/7
          </h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Upload your documents once. Your chatbot handles customer questions forever.
          </p>
          <div className="space-y-4">
            {[
              { label: "12,847+ conversations handled", icon: "💬" },
              { label: "60% reduction in support tickets", icon: "📉" },
              { label: "Setup in under 30 minutes", icon: "⚡" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-white">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-zinc-600 text-sm relative z-10">© 2025 SupportMind AI</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">SupportMind AI</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your account to continue</p>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Google", "GitHub"].map((provider) => (
              <button key={provider} className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="text-base">{provider === "Google" ? "G" : "⌥"}</span>
                {provider}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400">or continue with email</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-200 accent-indigo-600" />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me for 30 days</label>
            </div>

            <Link href="/dashboard">
              <button type="button" className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-indigo-100 mt-2">
                Sign in
              </button>
            </Link>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 font-semibold hover:underline">Create one free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
