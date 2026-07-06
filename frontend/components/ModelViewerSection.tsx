"use client";

import { motion, type Variants } from "motion/react";
import { Bot, MessageSquare, Sparkles } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import Noise from "@/components/Noise";
import ModelViewer from "@/components/modalviewer/ModelViewer";

const header: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const highlights = [
  {
    icon: Bot,
    title: "Branded AI agent",
    desc: "Your logo, tone, and knowledge — packaged into an assistant customers recognize.",
  },
  {
    icon: MessageSquare,
    title: "Instant answers",
    desc: "RAG pulls from your docs so replies stay accurate, contextual, and on-brand.",
  },
  {
    icon: Sparkles,
    title: "Fully free",
    desc: "Train, embed, and ship Assist IQ without subscriptions or usage caps.",
  },
];

export default function ModelViewerSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a0a0f]">
      <GridBackground size={48} opacity={0.15} />
      <Noise opacity={0.04} blend="soft-light" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080d] via-transparent to-[#08080d] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={header}
          >
            <motion.p variants={item} className="section-label text-emerald-400 mb-3">
              Product preview
            </motion.p>
            <motion.h2
              variants={item}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5"
            >
              Meet{" "}
              <span className="gradient-text">Assist IQ</span>
            </motion.h2>
            <motion.p variants={item} className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Drag to explore your AI support card — the same identity customers see in your
              embeddable widget. Upload docs once; Assist IQ handles questions around the clock.
            </motion.p>

            <motion.ul variants={header} className="space-y-5">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <motion.li key={title} variants={item} className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[380px] sm:h-[480px] rounded-3xl p-px bg-gradient-to-br from-emerald-400/80 via-cyan-300/50 to-violet-400/40 shadow-[0_0_40px_-8px_rgba(52,211,153,0.45)]"
          >
            <div className="relative h-full w-full rounded-[calc(1.5rem-1px)] overflow-hidden">
              <ModelViewer
                url="/lanyard/card.glb"
                width="100%"
                height="100%"
                backgroundColor="transparent"
                showContactShadows={false}
              autoRotate
              fadeIn
              showScreenshotButton={false}
              environmentPreset="night"
              defaultRotationX={-25}
              defaultRotationY={35}
              defaultZoom={2.2}
              minZoomDistance={1.2}
              maxZoomDistance={6}
              enableMouseParallax
              enableHoverRotation
              enableManualRotation
              ambientIntensity={0.45}
              keyLightIntensity={1.1}
              rimLightIntensity={0.9}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
