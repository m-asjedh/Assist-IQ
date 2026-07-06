"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, BookOpen } from "lucide-react";
import Noise from "@/components/Noise";
import Lanyard from "@/components/lanyard/Lanyard";

const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] bg-[#0a0a0a] overflow-x-hidden">
      <Noise opacity={0.03} blend="overlay" />

      <Lanyard
        position={[0, 0, 20]}
        gravity={[0, -40, 0]}
        frontImage="/logo.png"
        imageFit="contain"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
        <div className="bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent pt-12 pb-8 sm:pb-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto px-4 sm:px-6 text-center pointer-events-auto"
          >
            <motion.h1
              variants={fade}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4"
            >
              From docs to answers, <br /> support that scales{" "}
              <span className="text-emerald-400">faster.</span>
            </motion.h1>

            <motion.p variants={fade} className="text-sm sm:text-base text-zinc-500 mb-6 max-w-lg mx-auto">
              AI support built on RAG and your knowledge base.{" "}
              <span className="text-emerald-400 font-semibold">Fully free.</span>
            </motion.p>

            <motion.div
              variants={fade}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-emerald-400 text-black font-semibold px-6 py-3 rounded-full text-sm shadow-[0_0_40px_-8px_rgba(52,211,153,0.6)] hover:bg-emerald-300 transition-colors"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-6 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                <BookOpen className="size-4 text-zinc-500" />
                View Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
