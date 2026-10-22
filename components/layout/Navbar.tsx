"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { HudButton } from "@/components/ui/HudButton";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useFocusTrap, useLockBody, useScrolled } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

function useOnlineCount(base: number) {
  const [n, setN] = useState(base);
  useEffect(() => {
    const id = window.setInterval(() => setN((v) => v + Math.round((Math.random() - 0.45) * 140)), 2400);
    return () => window.clearInterval(id);
  }, []);
  return n;
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const online = useOnlineCount(284912);
  useLockBody(open);
  useFocusTrap(panelRef, open, close);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className={cn(
          "fixed inset-x-0 top-0 transition-[background-color,border-color,backdrop-filter] duration-500",
          open ? "z-[80]" : "z-50",
          scrolled ? "border-b border-cyan/15 bg-void/80 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-10">
          <Logo onClick={close} />

          <ul className="hidden items-center gap-1 lg:flex">
            {site.nav.map((l, i) => {
              const active = !l.href.includes("#") && pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center gap-2 px-4 py-2 font-display text-[0.8rem] font-semibold tracking-[0.14em] uppercase transition-colors",
                      active ? "text-snow" : "text-steel hover:text-snow",
                    )}
                  >
                    <span className={cn("font-mono text-[0.6rem]", active ? "text-lime" : "text-steel/60 group-hover:text-cyan")}>
                      0{i + 1}
                    </span>
                    {l.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-cyan shadow-[0_0_10px_var(--color-cyan)] transition-transform duration-500 ease-snap",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-5">
            <p className="hud hidden items-center gap-2 text-steel xl:flex" aria-live="off">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime" />
                <span className="relative size-2 rounded-full bg-lime" />
              </span>
              <span className="tabular-nums text-fog">{online.toLocaleString("en-US")}</span> online
            </p>
            <span className="hidden sm:block">
              <HudButton href="/#tournaments" className="px-5 py-3">
                Enter the Arena
              </HudButton>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-panel"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[70] grid size-11 place-items-center ring-1 ring-snow/15 ring-inset transition hover:ring-cyan/60 lg:hidden"
            >
              <span className="relative h-3.5 w-5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "absolute left-0 h-0.5 bg-snow transition-all duration-400 ease-snap",
                      i === 0 && (open ? "top-1.5 w-5 rotate-45 bg-lime" : "top-0 w-5"),
                      i === 1 && (open ? "top-1.5 w-0 opacity-0" : "top-1.5 w-3.5"),
                      i === 2 && (open ? "top-1.5 w-5 -rotate-45 bg-lime" : "top-3 w-5"),
                    )}
                  />
                ))}
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[55] bg-void/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden
            />
            <motion.div
              key="panel"
              id="mobile-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease }}
              className="grid-lines fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col overflow-y-auto border-l border-cyan/20 bg-void-2 px-6 pt-24 pb-8 lg:hidden"
            >
              <p className="hud mb-6 text-steel">{"// "}Navigation</p>
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
                className="space-y-1"
              >
                {site.nav.map((l, i) => (
                  <motion.li
                    key={l.href}
                    variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <Link
                      href={l.href}
                      onClick={close}
                      aria-current={l.href === pathname ? "page" : undefined}
                      className="group flex items-center justify-between border-b border-snow/10 py-4 font-display text-3xl font-bold uppercase transition-colors hover:text-cyan aria-[current=page]:text-lime"
                    >
                      {l.label}
                      <span className="font-mono text-xs text-steel group-hover:text-cyan">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.5 } }}
                className="mt-auto space-y-6 pt-10"
              >
                <HudButton href="/#tournaments" className="w-full">
                  Enter the Arena
                </HudButton>
                <div className="flex flex-wrap gap-2">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hud px-3 py-2 text-fog ring-1 ring-snow/15 ring-inset transition hover:text-cyan hover:ring-cyan/50"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
