"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot, Upload, BarChart3, Star, ChevronDown, ChevronUp, Shield,
  ArrowRight, Sparkles, Brain, Code2,

} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Noise from "@/components/Noise";
import GridBackground from "@/components/GridBackground";
import Hero from "@/components/Hero";
import TechStackSection from "@/components/TechStackSection";
import { testimonials, faqs } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const features = [
  { icon: Upload, title: "Upload Any Document", desc: "PDF, DOCX, TXT — your FAQs and policies become chatbot knowledge in seconds.", span: "col-span-1 sm:col-span-2" },
  { icon: Brain, title: "Instant AI Training", desc: "Neural processing reads and understands your content automatically.", span: "col-span-1" },
  { icon: Bot, title: "Smart Responses", desc: "Accurate answers, 24/7, zero human intervention needed.", span: "col-span-1" },
  { icon: Shield, title: "Secure & Private", desc: "Your data stays encrypted. Never shared, never sold.", span: "col-span-1" },
  { icon: BarChart3, title: "Deep Analytics", desc: "See exactly what customers ask and where your docs fall short.", span: "col-span-1 sm:col-span-2" },
  { icon: Code2, title: "One-Line Embed", desc: "Paste a single script tag. Your chatbot goes live instantly.", span: "col-span-1" },
];

const steps = [
  { step: "01", title: "Upload content", desc: "Drop your FAQ docs, guides, and policies into the knowledge base." },
  { step: "02", title: "AI trains", desc: "Our engine reads, indexes, and understands every document." },
  { step: "03", title: "Embed widget", desc: "Copy one line of code into your website's HTML." },
  { step: "04", title: "Go live", desc: "Your chatbot handles customer questions around the clock." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Navbar />

      <Hero />

      <TechStackSection />

      {/* ─── FEATURES BENTO ─── */}
      <section id="features" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16">
            <motion.p variants={fadeUp} className="section-label text-cyan-600 mb-3">Capabilities</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight max-w-xl">
              Everything to automate support,{" "}
              <span className="gradient-text">nothing you don&apos;t need</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {features.map(({ icon: Icon, title, desc, span }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`bento-card rounded-2xl p-7 ${span}`}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS — TIMELINE ─── */}
      <section id="how-it-works" className="py-28 bg-zinc-900 relative overflow-hidden">
        <Noise opacity={0.04} blend="soft-light" />
        <GridBackground size={48} opacity={0.2} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 mesh-orb" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-20">
            <motion.p variants={fadeUp} className="section-label text-cyan-400 mb-3">Process</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Live in four steps
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="contents">
              {steps.map(({ step, title, desc }) => (
                <motion.div key={step} variants={fadeUp} className="flex flex-col items-center text-center px-4 py-6">
                  <div className="w-16 h-16 rounded-2xl gradient-border flex items-center justify-center mb-6 relative z-10 bg-[#0c0c12]">
                    <span className="text-xl font-extrabold gradient-text">{step}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-[200px]">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16">
            <motion.p variants={fadeUp} className="section-label text-cyan-600 mb-3">Social Proof</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
              Teams that switched to AI support
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className={`bento-card rounded-2xl p-7 ${i === 1 ? "md:-translate-y-4" : ""}`}
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-zinc-100">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-28 bg-zinc-50 relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="section-label text-cyan-600 mb-3">FAQ</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-zinc-900 tracking-tight">
              Questions answered
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`rounded-2xl overflow-hidden transition-all ${
                  openFaq === i
                    ? "bg-white border border-cyan-500/20 shadow-lg shadow-cyan-500/5"
                    : "bg-white border border-zinc-200/80"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-zinc-50/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-zinc-900 pr-4">{faq.question}</span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    openFaq === i ? "bg-cyan-500/10 text-cyan-600" : "bg-zinc-100 text-zinc-400"
                  }`}>
                    {openFaq === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-zinc-500 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 relative overflow-hidden bg-[#08080d]">
        <GridBackground size={48} opacity={0.25} />
        <Noise opacity={0.06} />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/15 mesh-orb" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="section-label text-cyan-400">Get started today</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight text-glow">
              Ready to automate support?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
              Join hundreds of businesses using SupportMind AI. Free forever, setup in minutes.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group gradient-bg text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all glow-cyan flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="glass-card text-zinc-300 font-semibold px-8 py-4 rounded-2xl hover:bg-white/[0.06] hover:text-white transition-all flex items-center justify-center border border-white/[0.08]"
              >
                Log in
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
