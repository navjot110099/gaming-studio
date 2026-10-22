"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Check, Monitor, Star } from "lucide-react";
import type { PointerEvent } from "react";
import { Img } from "@/components/ui/Img";
import { HudButton } from "@/components/ui/HudButton";
import { Brackets } from "@/components/ui/Brackets";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { games } from "@/lib/data";

const game = games[0];

export function FeaturedGame() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 120, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <section id="featured" className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36" aria-labelledby="featured-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal variant="scale" className="lg:col-span-6" duration={1.1}>
          <div onPointerMove={onMove} onPointerLeave={onLeave} className="[perspective:1200px]">
            <motion.div
              style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: "preserve-3d" }}
              className="chamfer relative aspect-[4/5] overflow-hidden bg-void-3 [--cut:28px]"
            >
              <Img id={game.cover.id} alt={game.cover.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-[50%_35%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
              <motion.div
                aria-hidden
                style={{ left: glareX }}
                className="pointer-events-none absolute top-0 h-full w-1/2 -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(255_255_255/0.18),transparent)] mix-blend-overlay"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8" style={{ transform: "translateZ(40px)" }}>
                <p className="hud text-lime">Flagship · Free to play</p>
                <p className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-6xl">{game.title}</p>
              </div>
              <span className="hud absolute top-6 right-6 bg-void/70 px-3 py-1.5 text-cyan backdrop-blur" style={{ transform: "translateZ(30px)" }}>
                S07 // Blackout
              </span>
            </motion.div>
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionLabel index="01" label="Featured game" />
          <SectionTitle id="featured-title">
            Five operatives. <span className="text-cyan">No respawns.</span>
          </SectionTitle>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-fog">{game.description}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 grid grid-cols-3 gap-px bg-snow/10 ring-1 ring-snow/10">
            {[
              { k: game.metric?.value ?? "", v: "Players" },
              { k: "4.7", v: "Avg. rating", icon: true },
              { k: "24", v: "Operatives" },
            ].map((s) => (
              <div key={s.v} className="bg-void p-4">
                <p className="flex items-center gap-1.5 font-display text-3xl font-bold">
                  {s.k}
                  {s.icon && <Star className="size-4 fill-lime text-lime" aria-hidden />}
                </p>
                <p className="hud mt-1 text-steel">{s.v}</p>
              </div>
            ))}
          </Reveal>

          <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.07}>
            {game.features.map((f) => (
              <StaggerItem as="li" key={f} className="flex items-center gap-3 text-fog">
                <Check className="size-4 shrink-0 text-lime" aria-hidden />
                {f}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-8 flex items-center gap-3 text-steel">
            <Monitor className="size-4" aria-hidden />
            <p className="hud">{game.platforms.join(" · ")}</p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-4">
            <HudButton href="https://store.steampowered.com/" external>
              Play free now
            </HudButton>
            <HudButton href="/games#voidfall" variant="ghost">
              Game details
            </HudButton>
          </Reveal>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-5 top-12 hidden h-24 lg:block">
        <Brackets className="opacity-20" size="size-5" />
      </div>
    </section>
  );
}
