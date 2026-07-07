"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Star } from "lucide-react";
import { GlobalStyles, NeoButton, NeoCard, FloatingCube} from "./Brutalism";

type AuthMode = "login" | "signup";

const BrutalInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <label className="block">
    <span className="block mb-2 font-black uppercase text-sm tracking-widest">
      {label}
    </span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border-4 border-black rounded-xl px-5 py-4 font-bold text-lg outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-[2px] focus:-translate-y-[2px] transition-all placeholder:text-black/30"
    />
  </label>
);

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === "login";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to your auth backend
    console.log({ mode, name, email, password });
    router.push("/dashboard");
  };

  return (
    <>
      <GlobalStyles />
      <main className="relative min-h-screen w-full bg-[#f3f4f6] flex flex-col items-center justify-center overflow-hidden px-6 py-24">
        <FloatingCube
          color="bg-purple-500"
          className="cube top-[15%] left-[12%] rotate-[-15deg] hidden md:block"
        />
        <FloatingCube
          color="bg-orange-400"
          className="cube bottom-[15%] right-[12%] rotate-[15deg] hidden md:block"
        />

        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 font-bold text-xl tracking-tighter z-20"
        >
          <div className="w-6 h-6 bg-black rounded-md" />
          <span>ASSIST IQ.</span>
        </Link>

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-6 -rotate-2 inline-block">
            <div className="bg-[#ccff00] border-4 border-black px-6 py-2 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-sm">
              {isLogin ? "Welcome Back" : "Free Forever"}
            </div>
          </div>

          <NeoCard color="bg-white">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-2">
              {isLogin ? (
                <>
                  Log <span className="text-purple-500">In.</span>
                </>
              ) : (
                <>
                  Sign <span className="text-orange-400">Up.</span>
                </>
              )}
            </h1>
            <p className="font-bold text-black/60 mb-8">
              {isLogin
                ? "Access your Assist IQ dashboard."
                : "Start automating support in minutes."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <BrutalInput
                  label="Name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={setName}
                />
              )}
              <BrutalInput
                label="Email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={setEmail}
              />
              <BrutalInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
              />

              <NeoButton
                type="submit"
                variant={isLogin ? "purple" : "lime"}
                className="w-full justify-center text-lg py-4 group"
              >
                {isLogin ? "Log In" : "Create Account"}
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </NeoButton>
            </form>
          </NeoCard>

          <div className="mt-6 text-center font-bold uppercase text-sm tracking-wide flex items-center justify-center gap-2">
            <Star size={14} fill="black" />
            {isLogin ? (
              <span>
                No account?{" "}
                <Link
                  href="/signup"
                  className="underline decoration-4 decoration-[#ccff00] underline-offset-4 hover:text-purple-600"
                >
                  Sign Up
                </Link>
              </span>
            ) : (
              <span>
                Already in?{" "}
                <Link
                  href="/login"
                  className="underline decoration-4 decoration-purple-400 underline-offset-4 hover:text-purple-600"
                >
                  Log In
                </Link>
              </span>
            )}
            <Star size={14} fill="black" />
          </div>
        </div>
      </main>
    </>
  );
}
