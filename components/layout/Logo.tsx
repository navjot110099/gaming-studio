import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M4 4h7l10 14V4h7v24h-7L11 14v14H4z" fill="currentColor" />
      <path d="M2 30 30 2" stroke="var(--color-lime)" strokeWidth="2.5" />
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group flex items-center gap-2.5 font-display text-lg font-bold tracking-[0.08em]", className)}
      aria-label="Nexus//Void — home"
    >
      <LogoMark className="size-7 text-snow transition-colors duration-300 group-hover:text-cyan" />
      <span>
        NEXUS<span className="text-lime">{"//"}</span>VOID
      </span>
    </Link>
  );
}
