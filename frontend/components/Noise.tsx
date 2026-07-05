import { cn } from "@/lib/utils";

interface NoiseProps {
  opacity?: number;
  className?: string;
  blend?: "overlay" | "soft-light" | "multiply" | "normal";
}

export default function Noise({
  opacity = 0.06,
  className,
  blend = "overlay",
}: NoiseProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-[2]", className)}
      style={{
        opacity,
        mixBlendMode: blend,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}
