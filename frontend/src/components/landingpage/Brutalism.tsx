"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Plus,
  Star,
  Box,
  Zap,
  Server,
  Waypoints,
  Brain,
  Route,
} from "lucide-react";
import Link from "next/link";
import { SolarSystem, type OrbitConfig } from "@/components/ui/solar-system";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// --- GLOBAL STYLES & FONTS (Injected via <style>) ---
export function GlobalStyles() {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap");

      :root {
        --c-bg: #f3f4f6;
        --c-black: #121212;
        --c-lime: #ccff00;
        --c-purple: #a855f7;
        --c-orange: #fb923c;
      }

      body {
        background-color: var(--c-bg);
        color: var(--c-black);
        font-family: "Space Grotesk", sans-serif;
        overflow-x: hidden;
        cursor: default;
      }

      /* The Outline Text Effect */
      .text-outline {
        -webkit-text-stroke: 2px black;
        color: transparent;
      }

      .text-outline-white {
        -webkit-text-stroke: 2px white;
        color: transparent;
      }

      /* Custom Selection */
      ::selection {
        background-color: var(--c-black);
        color: var(--c-lime);
      }

      /* Hide Scrollbar */
      ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
    `}</style>
  );
}

// --- REUSABLE NEO-BRUTALIST COMPONENTS ---

// 1. The "Chunky" Button
export function NeoButton({
  children,
  variant = "lime",
  className = "",
  href,
  type = "button",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: string;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const bg =
    variant === "lime"
      ? "bg-[#ccff00]"
      : variant === "black"
        ? "bg-black text-white"
        : variant === "purple"
          ? "bg-purple-400"
          : "bg-white";

  const classes = `
      relative px-8 py-3 font-bold uppercase tracking-wider border-4 border-black rounded-full 
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] 
      transition-all duration-200 ${bg} ${className} flex items-center gap-2
      ${disabled ? "opacity-50 pointer-events-none" : ""}
    `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// 2. The "Card" Container
export function NeoCard({
  children,
  className = "",
  color = "bg-white",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`
    border-4 border-black rounded-2xl p-8 
    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
    hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1
    transition-all duration-300 ${color} ${className}
  `}
    >
      {children}
    </div>
  );
}

// 3. Floating 3D Cube (CSS only visual)
export function FloatingCube({
  color,
  className,
}: {
  color: string;
  className: string;
}) {
  return (
    <div className={`absolute ${className} pointer-events-none`}>
      <div
        className={`w-24 h-24 border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${color} animate-float`}
      ></div>
    </div>
  );
}

// --- SECTIONS ---

export function Navbar() {
  return (
    <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
      <div className="bg-white border-4 border-black rounded-full px-2 py-2 flex items-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 px-6">
          <img
            src="/logo.svg"
            alt="Assist IQ logo"
            className="w-8 h-8 rounded-md border-2 border-black"
          />
          <span className="font-bold text-xl tracking-tighter">ASSIST IQ.</span>
        </div>

        <div className="hidden md:flex gap-2">
          {["Features", "Pricing", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-6 py-2 font-bold uppercase hover:bg-neutral-100 rounded-full transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-2">
          <NeoButton
            href="/login"
            variant="purple"
            className="text-sm py-2 px-6"
          >
            Login
          </NeoButton>
          <NeoButton
            href="/signup"
            variant="lime"
            className="text-sm py-2 px-6"
          >
            Get Started
          </NeoButton>
        </div>
      </div>
    </nav>
  );
}

export function Hero() {
  const container = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for cubes handled by CSS class,
      // but let's add mouse movement parallax
      const cubes = document.querySelectorAll(".cube");

      window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;

        gsap.to(cubes, {
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Text Reveal
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28"
    >
      {/* Floating Elements */}
      <FloatingCube
        color="bg-purple-500"
        className="cube top-[20%] left-[10%] rotate-[-15deg]"
      />
      <FloatingCube
        color="bg-orange-400"
        className="cube bottom-[20%] right-[10%] rotate-[15deg]"
      />

      {/* Badge */}
      <div className="relative z-10 mb-6 rotate-[-2deg]">
        <div className="bg-[#ccff00] border-4 border-black px-8 py-3 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-sm md:text-base">
          AI Customer Support
        </div>
      </div>

      {/* Main Title */}
      <div
        ref={textRef}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <h1 className="text-[5rem] md:text-[10rem] leading-[0.8] font-black uppercase tracking-tighter text-black">
          Instant
        </h1>
        <h1 className="text-[5rem] md:text-[10rem] leading-[0.8] font-black uppercase tracking-tighter text-white text-outline relative">
          Support
          {/* Decorative underline/arrow */}
          <svg
            className="absolute -bottom-10 right-0 w-24 h-24 text-black hidden md:block"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 0 L100 100 L0 100 Z" transform="rotate(180 50 50)" />
          </svg>
        </h1>
      </div>

      <p className="relative z-10 mt-8 max-w-xl text-center text-lg md:text-xl font-medium px-4">
        We turn your docs into a{" "}
        <span className="font-bold bg-purple-200 px-1 border-2 border-black rounded">
          smart
        </span>{" "}
        AI chatbot that answers customers instantly — trained on your knowledge,
        live in minutes.
      </p>
    </section>
  );
}

export function Marquee() {
  // Simple pure CSS marquee is often smoother than JS for infinite loop
  return (
    <div className="bg-[#ccff00] border-y-4 border-black py-6 rotate-[-2deg] scale-105 z-20 relative overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-4xl md:text-6xl font-black uppercase mx-8 flex items-center gap-4"
          >
            Upload <Star fill="black" /> Train <Star fill="black" />{" "}
            Automate <Star fill="black" />
          </span>
        ))}
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

// --- TECH STACK SOLAR SYSTEM ---

const ReactIcon = (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5" fill="none">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextIcon = (
  <svg viewBox="0 0 180 180" className="w-5 h-5" fill="none">
    <circle cx="90" cy="90" r="90" fill="#000" />
    <path
      d="M149.508 157.52L69.142 54H54v72h14.4V69.412l67.24 87.054a89.4 89.4 0 0013.868-1.046zM111.6 54h14.4v72h-14.4z"
      fill="#fff"
    />
  </svg>
);

const TypeScriptIcon = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect width="24" height="24" rx="2" fill="#3178C6" />
    <path
      d="M5.5 12v-1.5h4.5V21h-2V12H5.5zm5.5-1.5h4.5v1.5h-3v2h3v1.5h-3v2h3V21h-4.5v-1.5h3v-2h-3v-1.5h3v-2h-3V10.5z"
      fill="#fff"
    />
  </svg>
);

const TailwindIcon = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path
      d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.4 10.79 14.55 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.6 7.21 14.45 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.4 16.79 9.55 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.6 13.21 9.45 12 7 12z"
      fill="#38BDF8"
    />
  </svg>
);

const FramerMotionIcon = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M4 0h16v8h-8z M4 8h8l8 8H4z M4 16h8v8z" fill="#000000" />
  </svg>
);

const techOrbits: OrbitConfig[] = [
  {
    id: "core",
    name: "Core",
    radiusClass: "var(--radius-inner)",
    radiusPx: 175,
    speed: 22,
    items: [
      { id: "nextjs", label: "Next.js", color: "#121212", svg: NextIcon },
      { id: "react", label: "React", color: "#61DAFB", svg: ReactIcon },
      { id: "typescript", label: "TypeScript", color: "#3178C6", svg: TypeScriptIcon },
      { id: "tailwind", label: "Tailwind", color: "#38BDF8", svg: TailwindIcon },
    ],
  },
  {
    id: "ui-motion",
    name: "UI & Motion",
    radiusClass: "var(--radius-mid)",
    radiusPx: 285,
    speed: 34,
    items: [
      { id: "framer", label: "Framer Motion", color: "#121212", svg: FramerMotionIcon },
      { id: "three", label: "Three.js", color: "#121212", svg: <Box className="w-5 h-5" /> },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    radiusClass: "var(--radius-outer)",
    radiusPx: 395,
    speed: 50,
    items: [
      { id: "nestjs", label: "NestJS", color: "#E0234E", svg: <Server className="w-5 h-5" /> },
      { id: "express", label: "Express", color: "#121212", svg: <Waypoints className="w-5 h-5" /> },
      { id: "rag", label: "RAG", color: "#a855f7", svg: <Brain className="w-5 h-5" /> },
      { id: "openrouter", label: "OpenRouter", color: "#fb923c", svg: <Route className="w-5 h-5" /> },
    ],
  },
];

export function TechOrbit() {
  return (
    <section className="py-32 px-6 bg-[#f3f4f6] border-b-4 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block bg-[#ccff00] border-4 border-black px-6 py-2 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-sm mb-8 rotate-[-2deg]">
          The Stack
        </div>
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">
          Powered by <br />{" "}
          <span className="text-outline">modern tech.</span>
        </h2>
        <p className="max-w-xl mx-auto text-lg md:text-xl font-medium text-neutral-600 mb-16">
          The frontend and backend technologies orbiting Assist IQ.
        </p>

        <div className="flex justify-center">
          <SolarSystem
            orbits={techOrbits}
            centerLogo="/logo.png"
            centerLogoAlt="Assist IQ"
          />
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const projects = [
    {
      title: "Doc Ingestion",
      tag: "Knowledge",
      color: "bg-purple-400",
      lottie:
        "https://lottie.host/51d5a4a7-276c-417a-9588-273b0c85d6c7/IJA0lW3RXC.lottie",
    },
    {
      title: "Smart Replies",
      tag: "AI Engine",
      color: "bg-blue-400",
      lottie:
        "https://lottie.host/2d5dfcd4-b2cf-4c49-849f-8a75ab68f86f/5RXRxKOENI.lottie",
    },
    {
      title: "Live Analytics",
      tag: "Insights",
      color: "bg-orange-400",
      lottie:
        "https://lottie.host/c17e4f72-dbe5-4e20-ae91-2b34e35345dc/IbU7c5azr8.lottie",
    },
    {
      title: "One-Line Embed",
      tag: "Deploy",
      color: "bg-pink-400",
      lottie:
        "https://lottie.host/b5e820b6-53fd-49b0-9dca-7f2014cb6ed3/RYABu5d9dl.lottie",
    },
  ];

  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
          What It <br />{" "}
          <span className="text-outline text-black stroke-black">Does.</span>
        </h2>
        <NeoButton variant="lime" className="text-xl py-6 px-12">
          See Features
        </NeoButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((p, i) => (
          <NeoCard key={i} className="group cursor-pointer" color={p.color}>
            <div
              className={`w-full aspect-video ${p.color} border-4 border-black rounded-lg mb-6 relative overflow-hidden`}
            >
              <DotLottieReact
                src={p.lottie}
                autoplay
                loop
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
            <div className="flex justify-between items-start">
              <h3 className="text-4xl font-bold uppercase">{p.title}</h3>
              <span className="border-2 border-black px-3 py-1 rounded-full text-xs font-bold uppercase bg-white">
                {p.tag}
              </span>
            </div>
          </NeoCard>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  const services = [
    {
      icon: <Zap size={32} />,
      title: "Instant Answers",
      desc: "Replies in milliseconds, 24/7, with zero human intervention.",
    },
    {
      icon: <Box size={32} />,
      title: "Doc Training",
      desc: "Upload PDFs, docs, and FAQs. Your bot learns them instantly.",
    },
    {
      icon: <Star size={32} />,
      title: "Secure & Private",
      desc: "Your data stays encrypted. Never shared, never sold.",
    },
  ];

  return (
    <section className="bg-black text-white py-32 px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-[#ccff00] font-bold text-xl mb-4">WHAT WE DO</div>
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 leading-tight">
            We don&apos;t do <span className="text-outline-white">tickets.</span>
            <br />
          We build <span className="text-[#ccff00]">answers.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white text-black p-8 border-4 border-[#ccff00] rounded-xl shadow-[8px_8px_0px_0px_#ccff00] hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="mb-6 bg-black text-white w-16 h-16 flex items-center justify-center rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                {s.icon}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">{s.title}</h3>
              <p className="font-medium text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const reviews = [
    {
      name: "Fewer Tickets",
      role: "Up to 60% Deflection",
      text: "Assist IQ resolves repetitive questions instantly, so your team only handles what truly needs a human.",
    },
    {
      name: "Trained On Your Docs",
      role: "Live In Minutes",
      text: "Upload your docs once and Assist IQ learns your product, answering with your exact tone and knowledge.",
    },
    {
      name: "One-Line Setup",
      role: "Zero Maintenance",
      text: "Drop in a single line of code and go live. No pipelines, no infra, no ongoing upkeep required.",
    },
  ];

  return (
    <section className="py-32 px-6 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-16">
          Why <br /> <span className="text-orange-400">Assist IQ.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <NeoCard key={i} color={i % 2 === 0 ? "bg-white" : "bg-[#ccff00]"}>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, star) => (
                  <Star key={star} size={20} fill="black" />
                ))}
              </div>
              <p className="text-xl font-bold italic mb-8 leading-tight">
                &quot;{r.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full border-2 border-black" />
                <div>
                  <div className="font-black uppercase text-sm">{r.name}</div>
                  <div className="text-xs font-bold opacity-60 uppercase">
                    {r.role}
                  </div>
                </div>
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudioTeam() {
  return (
    <section id="about" className="py-32 px-6 bg-[#f3f4f6]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2">
          <NeoCard
            color="bg-purple-500"
            className="aspect-square relative overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              alt="Team"
            />
            <div className="absolute inset-0 border-8 border-black m-4 pointer-events-none" />
          </NeoCard>
        </div>
        <div className="w-full md:w-1/2">
          <div className="text-purple-600 font-bold text-xl mb-4 uppercase tracking-[0.2em]">
            Our Mission
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.9]">
            We turn support <span className="text-outline">chaos</span> into{" "}
            <span className="bg-purple-500 text-white px-2">instant answers.</span>
          </h2>
          <p className="text-xl font-medium mb-12 text-neutral-600">
            Assist IQ reads your documents, learns your product, and answers
            customers around the clock. No queues, no wait times — just accurate
            help the moment it&apos;s needed.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-4 border-black p-4 rounded-xl bg-white shadow-[4px_4px_0px_0px_p-black]">
              <span className="text-4xl font-black italic">60%</span>
              <p className="font-bold text-xs uppercase opacity-60">
                Fewer Tickets
              </p>
            </div>
            <div className="border-4 border-black p-4 rounded-xl bg-[#ccff00] shadow-[4px_4px_0px_0px_p-black]">
              <span className="text-4xl font-black italic">24/7</span>
              <p className="font-bold text-xs uppercase opacity-60">
                Always On
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const plans = [
    {
      name: "Core",
      price: "Free",
      color: "bg-white",
      features: [
        "Unlimited Chatbots",
        "Unlimited Docs",
        "Embed Widget",
        "Community Support",
      ],
    },
    {
      name: "AI Power",
      price: "Free",
      color: "bg-[#ccff00]",
      features: [
        "Smart Replies",
        "Doc Training",
        "Live Analytics",
        "RAG + OpenRouter",
      ],
    },
    {
      name: "For Teams",
      price: "Free",
      color: "bg-orange-400",
      features: [
        "Multi-Agent",
        "SSO & Security",
        "Custom Branding",
        "Priority Help",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="py-32 px-6 bg-black text-white border-y-4 border-black"
    >
      <div className="max-w-7xl mx-auto text-center mb-24">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
          Always <span className="text-outline-white">Free.</span>
        </h2>
        <p className="text-[#ccff00] font-bold text-xl uppercase tracking-widest italic">
          Everything included_
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {plans.map((p, i) => (
          <NeoCard
            key={i}
            color={p.color}
            className="text-black flex flex-col h-full"
          >
            <div className="flex-1">
              <span className="font-black text-xs uppercase tracking-[0.2em] mb-4 block opacity-60">
                PLAN / 0{i + 1}
              </span>
              <h3 className="text-4xl font-black uppercase mb-2">{p.name}</h3>
              <div className="text-5xl font-black italic mb-8 border-b-4 border-black pb-4">
                {p.price}
              </div>
              <ul className="space-y-4 mb-12">
                {p.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 font-bold text-sm uppercase italic"
                  >
                    <Plus size={16} strokeWidth={4} /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <NeoButton
              href="/signup"
              variant={p.color === "bg-white" ? "lime" : "black"}
              className="w-full justify-center"
            >
              Get Started Free
            </NeoButton>
          </NeoCard>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    {
      q: "How does it learn my content?",
      a: "Upload your PDFs, docs, and FAQs. Assist IQ reads, indexes, and understands them automatically — no training required.",
    },
    {
      q: "How fast is setup?",
      a: "Minutes. Upload your knowledge base, then paste one line of code into your site to go live.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. Your data stays encrypted and private. It's never shared and never sold.",
    },
    {
      q: "Is there a free plan?",
      a: "Absolutely. Start free with one chatbot and upgrade only when you need more.",
    },
  ];

  return (
    <section className="py-32 px-6 bg-white border-b-4 border-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 underline decoration-4 underline-offset-8 decoration-[#ccff00]">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
            Questions?
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? -1 : i)}
              className="border-4 border-black rounded-2xl overflow-hidden cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-all"
            >
              <div
                className={`p-6 flex justify-between items-center bg-white ${open === i ? "bg-neutral-50" : ""}`}
              >
                <h3 className="text-xl font-black uppercase italic">{f.q}</h3>
                <div
                  className={`transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                >
                  <Plus size={24} strokeWidth={4} />
                </div>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-[#f3f4f6]"
                  >
                    <div className="p-8 border-t-4 border-black font-medium text-lg leading-relaxed italic">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-60 px-6 bg-[#ccff00] border-b-4 border-black relative overflow-hidden text-center">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] scale-150" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          whileInView={{ scale: [1, 1.05, 1], rotate: [-1, 1, -1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="inline-block bg-black text-white px-8 py-3 rounded-full mb-12 font-black uppercase text-xl shadow-[6px_6px_0px_0px_#888]"
        >
          Free Forever
        </motion.div>
        <h2 className="text-[5rem] md:text-[11rem] font-black uppercase leading-[0.8] tracking-tighter italic mb-16">
          GO <br /> <span className="text-outline">LIVE</span> <br /> TODAY.
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <NeoButton
            href="/signup"
            variant="black"
            className="text-2xl py-8 px-16 group"
          >
            Get Started Free{" "}
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </NeoButton>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <h2 className="text-[4rem] md:text-[9rem] font-black uppercase leading-[0.85] mb-12">
        Ready to <br /> <span className="text-purple-500">Automate Support?</span>
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <NeoButton href="/signup" variant="lime" className="text-xl py-6 px-12">
          Get Started Free
        </NeoButton>
        <NeoButton variant="white" className="text-xl py-6 px-12">
          hello@assistiq.ai
        </NeoButton>
      </div>

      <div className="mt-20 w-full flex justify-between border-t-4 border-black pt-8 font-bold uppercase text-sm">
        <span>© 2026 Assist IQ.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline text-black">
            Insta
          </a>
          <a href="#" className="hover:underline text-black">
            Twitter
          </a>
          <a href="#" className="hover:underline text-black">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
