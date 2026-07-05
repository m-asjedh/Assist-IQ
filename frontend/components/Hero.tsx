"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Noise from "@/components/Noise";

/** Swap to `/hero-preview.png` (or your file) when you have the final screenshot */
const HERO_PREVIEW_SRC = "/hero-preview.svg";

const fade: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const RING_R = 175;
const RING_C = 2 * Math.PI * RING_R;

function LightningRing() {
  return (
    <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 size-[min(130vw,900px)] sm:size-[min(115vw,820px)] pointer-events-none">
      <div className="absolute inset-0 rounded-full bg-emerald-400/8 blur-[140px]" />
      <div className="absolute inset-[5%] rounded-full bg-emerald-300/6 blur-[100px]" />
      <motion.div
        className="absolute inset-[10%] rounded-full bg-cyan-400/8 blur-[80px]"
        animate={{ opacity: [0.25, 0.65, 0.2, 0.55, 0.25] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[22%] rounded-full bg-emerald-500/12 blur-[56px]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 400 400" className="relative w-full h-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="bolt-grad" x1="0" y1="200" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
            <stop offset="45%" stopColor="#6ee7b7" stopOpacity="1" />
            <stop offset="55%" stopColor="#a7f3d0" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <filter id="electric-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soft-ring-blur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <circle
          cx="200"
          cy="200"
          r={RING_R}
          fill="none"
          stroke="#34d399"
          strokeOpacity="0.15"
          strokeWidth="3"
          filter="url(#soft-ring-blur)"
        />

        <circle
          cx="200"
          cy="200"
          r={RING_R}
          fill="none"
          stroke="#6ee7b7"
          strokeOpacity="0.08"
          strokeWidth="8"
          filter="url(#soft-ring-blur)"
        />

        <motion.circle
          cx="200"
          cy="200"
          r={RING_R}
          fill="none"
          stroke="url(#bolt-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${RING_C * 0.14} ${RING_C * 0.86}`}
          filter="url(#electric-glow)"
          animate={{ strokeDashoffset: [0, -RING_C] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />

        <motion.circle
          cx="200"
          cy="200"
          r={RING_R}
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${RING_C * 0.05} ${RING_C * 0.95}`}
          filter="url(#electric-glow)"
          animate={{
            strokeDashoffset: [RING_C * 0.4, -RING_C * 0.6],
            opacity: [0, 0.7, 0.9, 0.15, 0],
          }}
          transition={{
            strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1.4, repeat: Infinity, ease: "linear" },
          }}
        />

        <motion.circle
          cx="200"
          cy="200"
          r={RING_R - 2}
          fill="none"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`${RING_C * 0.02} ${RING_C * 0.98}`}
          filter="url(#electric-glow)"
          animate={{
            strokeDashoffset: [RING_C * 0.7, -RING_C * 0.3],
            opacity: [0, 0.8, 0, 0.8, 0],
          }}
          transition={{
            strokeDashoffset: { duration: 0.9, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.9, repeat: Infinity, ease: "linear" },
          }}
        />

        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.g
            key={deg}
            filter="url(#soft-ring-blur)"
            animate={{ opacity: [0.03, 0.3, 0.03] }}
            transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.11, ease: "easeInOut" }}
          >
            <line
              x1="200"
              y1="22"
              x2="200"
              y2="62"
              stroke="#a7f3d0"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${deg} 200 200)`}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-14 sm:mt-16 max-w-5xl mx-auto"
    >
      <div className="relative aspect-[5/3] sm:aspect-[16/9] rounded-t-2xl sm:rounded-t-3xl border border-white/8 border-b-0 overflow-hidden shadow-2xl shadow-black/60 bg-[#0a0a0a]">
        <Image
          src={HERO_PREVIEW_SRC}
          alt="SupportMind product preview"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] pt-28 sm:pt-32 pb-0">
      <Noise opacity={0.04} blend="overlay" />
      <LightningRing />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-1.5 text-xs font-medium text-emerald-400/90 mb-8"
          >
            <Sparkles className="size-3.5" />
            Powering smarter customer support
          </motion.div>

          <motion.h1
            variants={fade}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            From docs to answers—
            <br className="hidden sm:block" />
            support that scales{" "}
            <span className="text-emerald-400">Faster.</span>
          </motion.h1>

          <motion.p
            variants={fade}
            className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-xl mx-auto mb-9"
          >
            Ship AI support your users love—built on RAG, OpenRouter, and your own knowledge base.
            Designed for teams who move quickly.
          </motion.p>

          <motion.div
            variants={fade}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-emerald-400 text-black font-semibold px-7 py-3.5 rounded-full text-sm sm:text-base shadow-[0_0_40px_-8px_rgba(52,211,153,0.6)] hover:bg-emerald-300 transition-colors"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm sm:text-base font-medium text-zinc-300 hover:text-white hover:border-white/15 transition-colors"
              >
                <BookOpen className="size-4 text-zinc-500" />
                View Docs
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            variants={fade}
            className="text-base sm:text-lg font-semibold text-emerald-400 tracking-wide"
          >
            Fully free
          </motion.p>
        </motion.div>

        <HeroPreview />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08080d] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
