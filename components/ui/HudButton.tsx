import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "lime" | "cyan" | "ghost";

const styles: Record<Variant, string> = {
  lime: "bg-lime text-void hover:bg-snow",
  cyan: "bg-cyan/10 text-cyan ring-1 ring-inset ring-cyan/50 hover:bg-cyan hover:text-void",
  ghost: "bg-snow/5 text-snow ring-1 ring-inset ring-snow/15 hover:bg-snow/10 hover:ring-snow/40",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
};

/** Chamfered HUD button: a light sweep crosses on hover and the glyph nudges out. */
export function HudButton({ href, children, variant = "lime", className, icon, external }: Props) {
  const content = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-700 ease-snap group-hover:left-[120%] group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
      <span className="relative transition-transform duration-500 ease-snap group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon ?? <ArrowUpRight className="size-4" aria-hidden />}
      </span>
    </>
  );
  const cls = cn(
    "chamfer group relative inline-flex items-center justify-center gap-3 overflow-hidden px-6 py-3.5 font-display text-[0.8rem] font-bold tracking-[0.16em] uppercase transition-colors duration-300 [--cut:12px]",
    styles[variant],
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
