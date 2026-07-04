"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot, Upload, Zap, Shield, BarChart3, Globe, Star, ChevronDown, ChevronUp,
  MessageSquare, FileText, ArrowRight, Play,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { testimonials, faqs } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const features = [
  { icon: Upload, title: "Upload Any Document", desc: "PDF, DOCX, TXT — upload your FAQs and policies in seconds." },
  { icon: Zap, title: "Instant AI Training", desc: "Your chatbot learns from your content automatically." },
  { icon: Bot, title: "Smart Responses", desc: "Answers questions accurately, 24/7, with no human needed." },
  { icon: Shield, title: "Secure & Private", desc: "Your business data stays encrypted and never leaves our secure servers." },
  { icon: BarChart3, title: "Detailed Analytics", desc: "See what customers ask most and improve your support content." },
  { icon: Globe, title: "Easy Integration", desc: "Add one script tag to your website and you're live." },
];

const steps = [
  { step: "01", title: "Upload your content", desc: "Upload your FAQ docs, support articles, and product guides." },
  { step: "02", title: "AI trains your chatbot", desc: "Our AI reads and understands your content within minutes." },
  { step: "03", title: "Embed on your website", desc: "Copy one line of code and paste it into your website." },
  { step: "04", title: "Support customers 24/7", desc: "Your chatbot answers questions around the clock, automatically." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-indigo-100">
              <Zap className="w-3.5 h-3.5" /> Powered by GPT-4o
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Launch an AI Support Chatbot{" "}
              <span className="gradient-text">Trained on Your Business Knowledge</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-slate-600 mb-10 leading-relaxed">
              Upload your FAQs, product guides, and policies. SupportMind AI creates a smart chatbot
              for your website that answers customer questions 24/7 — no coding required.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="gradient-bg text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-base">
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:bg-slate-50 transition-colors text-base shadow-sm">
                <Play className="w-4 h-4 fill-indigo-600 text-indigo-600" /> View Demo
              </button>
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm text-slate-400 mt-5">100% free · No credit card required</motion.p>
          </motion.div>

          {/* Dashboard preview mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10 bottom-0 h-24 pointer-events-none" />
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-indigo-100 overflow-hidden">
              {/* Mock browser bar */}
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="flex-1 mx-4 bg-white rounded-lg px-3 py-1 text-xs text-slate-400 border border-slate-200">app.supportmind.ai/dashboard</div>
              </div>
              {/* Mock dashboard */}
              <div className="flex h-80 sm:h-96">
                {/* Sidebar */}
                <div className="w-40 bg-slate-900 p-3 flex flex-col gap-1">
                  {["Dashboard", "Knowledge Base", "Chatbot", "Conversations", "Analytics"].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs ${i === 0 ? "bg-indigo-600 text-white" : "text-slate-400"}`}>
                      <div className="w-3 h-3 rounded bg-current opacity-60" />
                      {item}
                    </div>
                  ))}
                </div>
                {/* Content */}
                <div className="flex-1 bg-slate-50 p-4 overflow-hidden">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {["12,847", "34", "Active", "8,240"].map((v, i) => (
                      <div key={i} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                        <p className="text-xs text-slate-400 mb-1">{["Conversations", "Documents", "Bot Status", "Usage"][i]}</p>
                        <p className="text-base font-bold text-slate-900">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Recent Conversations</p>
                    {["Sarah J.", "Michael C.", "Emily R."].map((name, i) => (
                      <div key={name} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
                        <div className="w-5 h-5 rounded-full gradient-bg text-white text-xs flex items-center justify-center font-bold">{name[0]}</div>
                        <span className="text-xs text-slate-700 flex-1">{name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${["bg-indigo-100 text-indigo-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700"][i]}`}>
                          {["Open", "Resolved", "Waiting"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-indigo-600 font-semibold text-sm mb-2 uppercase tracking-wide">Features</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Everything you need to automate support
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
              From document upload to live chatbot — SupportMind handles the entire workflow so your team doesn't have to.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-indigo-600 font-semibold text-sm mb-2 uppercase tracking-wide">How it Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Up and running in minutes</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }, i) => (
              <motion.div key={step} variants={fadeUp} className="relative">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full">
                  <div className="text-4xl font-extrabold gradient-text mb-4">{step}</div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full bg-indigo-100 items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-indigo-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-indigo-600 font-semibold text-sm mb-2 uppercase tracking-wide">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Trusted by growing businesses</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-indigo-600 font-semibold text-sm mb-2 uppercase tracking-wide">FAQ</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900">Frequently asked questions</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 bg-white">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 gradient-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to automate your customer support?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-indigo-100 text-lg mb-8">
              Join hundreds of businesses already using SupportMind AI.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center">
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
