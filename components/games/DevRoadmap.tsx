"use client";

import { motion } from "framer-motion";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { games } from "@/lib/data";
import { cn } from "@/lib/utils";

const stages = ["Concept", "Pre-production", "Alpha", "Beta", "Launch"];
const stageIndex: Record<string, number> = {
  Concept: 0,
  "Pre-production": 1,
  Alpha: 2,
  "Early Access · Update 0.9": 3,
};

const notes: Record<string, string> = {
  "echo-protocol": "Vertical slice approved. Building districts 2–4 and the full investigation system.",
  "neon-drift-zero": "Final four tracks and the career league land before 1.0 next spring.",
  "signal-lost": "Prototype playtests with 400 players. Locking the core survival loop.",
  "project-kestrel": "Engine tech R&D with a strike team of twelve.",
};

export function DevRoadmap() {
  const tracked = games.filter((g) => g.progress !== undefined);
  return (
    <section className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32" aria-labelledby="roadmap-title">
      <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel index="05" label="Development progress" />
          <SectionTitle id="roadmap-title">
            Open <span className="text-cyan">roadmap</span>
          </SectionTitle>
        </div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-fog">
            We publish where every project stands — no fake dates, no vapourware. Updated on the first Monday of each
            month.
          </p>
        </Reveal>
      </div>

      <Stagger className="space-y-4" stagger={0.12}>
        {tracked.map((g) => {
          const current = stageIndex[g.stage ?? "Concept"] ?? 0;
          return (
            <StaggerItem key={g.slug}>
              <article className="grid gap-6 bg-void-2 p-6 ring-1 ring-snow/10 ring-inset sm:p-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-3">
                  <p className="hud text-steel">{g.genre}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold uppercase">{g.title}</h3>
                  <p className="mt-2 text-sm text-fog">{notes[g.slug]}</p>
                </div>
                <div className="lg:col-span-8 lg:col-start-5">
                  <div className="relative">
                    <div className="absolute top-[7px] right-[10%] left-[10%] h-0.5 bg-snow/10" aria-hidden />
                    <motion.div
                      aria-hidden
                      className="absolute top-[7px] left-[10%] h-0.5 bg-gradient-to-r from-cyan to-lime"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(current / (stages.length - 1)) * 80}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    />
                    <ol className="relative grid grid-cols-5" aria-label={`${g.title} roadmap — current stage: ${stages[current]}`}>
                      {stages.map((s, i) => (
                        <li key={s} className="flex flex-col items-center text-center" aria-current={i === current ? "step" : undefined}>
                          <span
                            className={cn(
                              "relative grid size-4 place-items-center rotate-45 ring-2 ring-inset transition",
                              i < current && "bg-cyan ring-cyan",
                              i === current && "bg-lime ring-lime shadow-[0_0_18px_var(--color-lime)]",
                              i > current && "bg-void ring-snow/25",
                            )}
                          />
                          <span className={cn("hud mt-3 text-[0.55rem] sm:text-[0.65rem]", i === current ? "text-lime" : i < current ? "text-fog" : "text-steel")}>
                            {s}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <p className="hud text-right text-lime lg:col-span-1">{g.progress}%</p>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
