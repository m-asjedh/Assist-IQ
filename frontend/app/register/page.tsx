"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Eye, EyeOff, User, Building2, Mail, Lock, CheckCircle } from "lucide-react";
import Noise from "@/components/Noise";
import GridBackground from "@/components/GridBackground";

const perks = [
  "100% free, forever",
  "All features included",
  "Set up in under 30 minutes",
  "No credit card required",
];

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-2/5 hero-gradient flex-col justify-between p-12 relative overflow-hidden">
        <GridBackground />
        <Noise opacity={0.06} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-violet-600/15 mesh-orb" />
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg">SupportMind AI</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-4">Start automating support today</h2>
          <p className="text-zinc-400 mb-8">Join hundreds of businesses reducing support load by 60%+</p>
          <ul className="space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-zinc-600 text-sm relative z-10">© 2025 SupportMind AI</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">SupportMind AI</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-8">Create your free account. No credit card required.</p>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="John Doe" className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Company name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Acme Inc." className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Work email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" placeholder="you@company.com" className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              By creating an account you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </p>
            <Link href="/dashboard">
              <button type="button" className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-indigo-100">
                Create Free Account
              </button>
            </Link>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
