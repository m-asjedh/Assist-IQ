"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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

export default function NeoBrutalistPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <main className="min-h-screen bg-[#f3f4f6]">
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
      </main>
    </>
  );
}
