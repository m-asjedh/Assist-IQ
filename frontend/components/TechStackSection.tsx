"use client";

import { motion, type Variants } from "motion/react";
import GridBackground from "@/components/GridBackground";
import Noise from "@/components/Noise";
import ImageAccordion, { type AccordionPanel } from "@/components/ImageAccordion";

const techPanels: AccordionPanel[] = [
  {
    id: "frontend",
    label: "Frontend",
    title: "Next.js & React",
    description: "Server components, streaming UI, and a polished embeddable chat widget.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&q=80",
    overlay: "bg-gradient-to-t from-cyan-950/95 via-cyan-900/50 to-cyan-800/20",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "Motion"],
  },
  {
    id: "backend",
    label: "Backend",
    title: "NestJS API",
    description: "Type-safe REST endpoints, document ingestion, and real-time SSE streams.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
    overlay: "bg-gradient-to-t from-violet-950/95 via-violet-900/50 to-violet-800/20",
    tags: ["NestJS", "TypeScript", "REST", "SSE"],
  },
  {
    id: "ai",
    label: "AI",
    title: "RAG + OpenRouter",
    description: "Vector search retrieves context; OpenRouter routes to the best LLM for each reply.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
    overlay: "bg-gradient-to-t from-fuchsia-950/95 via-fuchsia-900/50 to-fuchsia-800/20",
    tags: ["RAG", "OpenRouter", "Vector DB", "Embeddings"],
  },
  {
    id: "ui",
    label: "UI",
    title: "Design system",
    description: "Accessible components and icons that keep the product cohesive and fast to build.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
    overlay: "bg-gradient-to-t from-amber-950/95 via-amber-900/50 to-amber-800/20",
    tags: ["shadcn/ui", "Radix UI", "Lucide"],
  },
];

const header: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function TechStackSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a0a0f]">
      <GridBackground size={48} opacity={0.15} />
      <Noise opacity={0.04} blend="soft-light" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080d] via-transparent to-[#08080d] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={header}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.p variants={headerItem} className="section-label text-cyan-400 mb-3">
            Tech Stack
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Built with{" "}
            <span className="gradient-text">modern tools</span>
          </motion.h2>
          <motion.p variants={headerItem} className="text-zinc-500 mt-4 text-sm sm:text-base max-w-lg mx-auto">
            Hover each panel to explore the frontend, backend, AI, and UI layers behind Assist IQ.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/8 bg-[#06060a]/80 p-3 sm:p-5 backdrop-blur-sm"
        >
          <ImageAccordion
            panels={techPanels}
            defaultActive={2}
            heightClass="h-[380px] sm:h-[460px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
