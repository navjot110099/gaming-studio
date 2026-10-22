import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <Reveal variant="fade" className={cn("hud mb-6 flex items-center gap-3 text-cyan", className)}>
      <span className="text-steel">[{index}]</span>
      <span className="h-px w-8 bg-cyan/50" aria-hidden />
      <Scramble text={label} />
      <span className="inline-block h-3 w-1.5 animate-blink bg-lime" aria-hidden />
    </Reveal>
  );
}

export function SectionTitle({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "font-display text-[2.4rem] leading-[0.95] font-bold tracking-[-0.01em] uppercase sm:text-6xl lg:text-7xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
