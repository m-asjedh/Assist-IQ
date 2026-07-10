"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import {
  GlobalStyles,
  Navbar,
  Hero,
  Marquee,
  TechOrbit,
  Projects,
  Services,
  Testimonials,
  StudioTeam,
  Pricing,
  FAQ,
  FinalCTA,
  Footer,
} from "@/src/components/landingpage/Brutalism";
import { PageLoader } from "@/src/components/PageLoader";

export default function NeoBrutalistPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let destroyed = false;
    let lenis: Lenis | null = null;
    let rafId = 0;

    const minDelay = new Promise((resolve) => setTimeout(resolve, 900));
    const fontsReady =
      typeof document !== "undefined" && document.fonts?.ready
        ? document.fonts.ready
        : Promise.resolve();

    Promise.all([minDelay, fontsReady]).then(() => {
      if (!destroyed) setReady(true);
    });

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {!ready ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <PageLoader label="Loading" />
          </motion.div>
        ) : (
          <motion.main
            key="page"
            className="min-h-screen bg-[#f3f4f6]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Navbar />
            <Hero />
            <Marquee />
            <TechOrbit />
            <Projects />
            <Services />
            <Testimonials />
            <StudioTeam />
            <Pricing />
            <FAQ />
            <FinalCTA />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
