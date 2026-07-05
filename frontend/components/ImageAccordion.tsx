"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type AccordionPanel = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  overlay?: string;
};

type ImageAccordionProps = {
  panels: AccordionPanel[];
  defaultActive?: number;
  className?: string;
  heightClass?: string;
};

export default function ImageAccordion({
  panels,
  defaultActive = 0,
  className,
  heightClass = "h-[420px] sm:h-[480px]",
}: ImageAccordionProps) {
  const [active, setActive] = useState(defaultActive);

  return (
    <div className={cn("overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none", className)}>
      <div
        className={cn(
          "flex gap-2 sm:gap-3 min-w-[min(100%,640px)] sm:min-w-0",
          heightClass
        )}
      >
        {panels.map((panel, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={panel.id}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActive(i);
              }}
              animate={{ flex: isActive ? 5 : 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className={cn(
                "relative min-w-[52px] sm:min-w-[60px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer",
                "border border-white/10 shadow-xl shadow-black/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              )}
            >
              <motion.img
                src={panel.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                animate={{ scale: isActive ? 1.05 : 1.15 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  panel.overlay ?? "bg-gradient-to-t from-black/90 via-black/40 to-black/20",
                  isActive ? "opacity-100" : "opacity-70"
                )}
              />

              <motion.span
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/80 [writing-mode:vertical-rl] rotate-180 pointer-events-none select-none"
              >
                {panel.label}
              </motion.span>

              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-0 p-4 sm:p-6 pointer-events-none"
              >
                <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-300/90 mb-1.5">
                  {panel.label}
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight mb-2">
                  {panel.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed max-w-sm">
                  {panel.description}
                </p>
                {panel.tags && panel.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {panel.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs font-medium text-white/90 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
