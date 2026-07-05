import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export default function GridBackground({
  className,
  size = 64,
  opacity = 0.4,
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
      }}
    />
  );
}
