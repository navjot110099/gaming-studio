"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useState } from "react";
import { Img } from "@/components/ui/Img";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { StatusChip } from "./StatusChip";
import { ProgressBar } from "./ProgressBar";
import { games, type GameStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters: ("All" | GameStatus)[] = ["All", "Released", "Early Access", "In Development", "Classified"];

export function GamesPortfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? games : games.filter((g) => g.status === filter);

  return (
    <section id="portfolio" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 lg:px-10 lg:py-32" aria-labelledby="portfolio-title">
      <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <SectionLabel index="03" label="Full portfolio" />
          <SectionTitle id="portfolio-title">
            The <span className="text-cyan">archive</span>
          </SectionTitle>
        </div>
        <LayoutGroup>
          <div role="group" aria-label="Filter games by status" className="-mx-5 flex gap-1 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => {
              const count = f === "All" ? games.length : games.filter((g) => g.status === f).length;
              const on = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  aria-controls="portfolio-grid"
                  onClick={() => setFilter(f)}
                  className={cn("hud relative isolate shrink-0 px-4 py-2.5 transition-colors", on ? "text-void" : "text-fog hover:text-snow")}
                >
                  {on && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 bg-lime"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {f} <span className={on ? "text-void/60" : "text-steel"}>({count})</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <motion.ul id="portfolio-grid" aria-live="polite" layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((g) => {
            const classified = g.status === "Classified";
            return (
              <motion.li
                key={g.slug}
                id={g.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-mt-28"
              >
                <article className="group chamfer relative flex h-full flex-col bg-void-2 ring-1 ring-snow/10 transition-all duration-500 ring-inset [--cut:22px] hover:-translate-y-1 hover:ring-cyan/40">
                  <div className={cn("relative aspect-[16/10] overflow-hidden", !classified && "duotone")}>
                    <Img
                      id={g.cover.id}
                      alt={g.cover.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      className={cn("group-hover:scale-105", classified && "scale-110 blur-md brightness-50")}
                    />
                    {classified && (
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="hud flex items-center gap-2 bg-void/80 px-4 py-2 text-[#ff8aa1] ring-1 ring-[#ff5a7a]/40 ring-inset">
                          <Lock className="size-3.5" aria-hidden /> Classified
                        </span>
                      </div>
                    )}
                    <StatusChip status={g.status} className="absolute top-4 left-4 z-10 backdrop-blur" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="hud text-steel">{g.genre}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight font-bold uppercase transition-colors group-hover:text-lime">{g.title}</h3>
                    <p className="mt-1 text-sm text-cyan">{g.tagline}</p>
                    <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-fog">{g.description}</p>
                    {g.progress !== undefined && (
                      <div className="mt-5">
                        <ProgressBar value={g.progress} stage={g.stage} label={`${g.title} development progress`} />
                      </div>
                    )}
                    <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-snow/10 pt-4">
                      <div>
                        <dt className="hud text-steel">Platforms</dt>
                        <dd className="mt-1 text-sm text-snow">{g.platforms.join(" · ")}</dd>
                      </div>
                      <div>
                        <dt className="hud text-steel">Release</dt>
                        <dd className="mt-1 text-sm text-snow">{g.release}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
