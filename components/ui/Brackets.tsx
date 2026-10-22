import { cn } from "@/lib/utils";

/** Four HUD corner brackets that frame their positioned parent. */
export function Brackets({ className, size = "size-3" }: { className?: string; size?: string }) {
  const base = cn("pointer-events-none absolute border-cyan/70", size);
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0 transition-all duration-500", className)}>
      <span className={cn(base, "top-0 left-0 border-t border-l")} />
      <span className={cn(base, "top-0 right-0 border-t border-r")} />
      <span className={cn(base, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(base, "right-0 bottom-0 border-r border-b")} />
    </span>
  );
}
