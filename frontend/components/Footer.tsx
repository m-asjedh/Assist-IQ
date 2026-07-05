import Link from "next/link";
import { Bot, Globe, MessageCircle, Link2 } from "lucide-react";
import Noise from "@/components/Noise";
import GridBackground from "@/components/GridBackground";

export default function Footer() {
  return (
    <footer className="bg-[#06060a] text-zinc-500 relative overflow-hidden border-t border-white/[0.04]">
      <GridBackground size={48} opacity={0.15} />
      <Noise opacity={0.03} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center glow-cyan">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">SupportMind AI</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">
              AI-powered customer support, trained on your business knowledge. Free forever.
            </p>
            <div className="flex gap-3 mt-5">
              {[Globe, MessageCircle, Link2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl glass-card flex items-center justify-center hover:border-cyan-500/30 hover:text-cyan-400 transition-all text-zinc-500"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: ["Features", "How it Works", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-cyan-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 SupportMind AI. All rights reserved.</p>
          <p className="text-sm text-zinc-600">Built for businesses worldwide</p>
        </div>
      </div>
    </footer>
  );
}
