import type { GameStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

const tone: Record<GameStatus, string> = {
  Released: "bg-lime/15 text-lime ring-lime/40",
  "Early Access": "bg-cyan/15 text-cyan ring-cyan/40",
  "In Development": "bg-snow/10 text-fog ring-snow/30",
  Classified: "bg-[#ff5a7a]/10 text-[#ff8aa1] ring-[#ff5a7a]/40",
};

export function StatusChip({ status, className }: { status: GameStatus; className?: string }) {
  return (
    <span className={cn("hud inline-flex items-center gap-1.5 px-2 py-1 ring-1 ring-inset", tone[status], className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}
