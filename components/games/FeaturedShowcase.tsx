"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Expand } from "lucide-react";
import { useState } from "react";
import { Img } from "@/components/ui/Img";
import { HudButton } from "@/components/ui/HudButton";
import { Brackets } from "@/components/ui/Brackets";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { StatusChip } from "./StatusChip";
import { ProgressBar } from "./ProgressBar";
import { Lightbox, type Shot } from "./Lightbox";
import type { Game } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FeaturedShowcase({ game, index, flip }: { game: Game; index: string; flip?: boolean }) {
  const shots: Shot[] = [game.cover, ...game.screenshots].map((s) => ({ ...s, game: game.title }));
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id={`featured-${game.slug}`} className="scroll-mt-24 overflow-x-clip border-b border-snow/10 py-20 lg:py-28" aria-labelledby={`${game.slug}-feature-title`}>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <Reveal variant={flip ? "right" : "left"} className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setLightbox(active)}
              className="group chamfer relative block aspect-video w-full overflow-hidden bg-void-3 [--cut:26px]"
              aria-label={`Open screenshot: ${shots[active].alt}`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={shots[active].id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Img id={shots[active].id} alt={shots[active].alt} fill sizes="(min-width: 1024px) 58vw, 92vw" className="transition-transform duration-1000 group-hover:scale-[1.03]" />
                </motion.div>
              </AnimatePresence>
              <span className="hud absolute right-4 bottom-4 flex items-center gap-2 bg-void/80 px-3 py-2 text-fog opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-3.5" aria-hidden /> Expand
              </span>
            </button>
            <Brackets className="-inset-2" size="size-4" />
          </div>
          <ul className="mt-4 grid grid-cols-4 gap-3" aria-label={`${game.title} screenshots`}>
            {shots.slice(0, 4).map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show screenshot ${i + 1}: ${s.alt}`}
                  aria-pressed={active === i}
                  className={cn(
                    "duotone relative block aspect-video w-full overflow-hidden ring-1 ring-inset transition",
                    active === i ? "is-active ring-cyan" : "ring-snow/10 hover:ring-snow/40",
                  )}
                >
                  <Img id={s.id} alt="" fill sizes="(min-width: 1024px) 14vw, 22vw" />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={cn("flex flex-col justify-center lg:col-span-5", flip && "lg:order-1")}>
          <Reveal variant="fade" className="hud mb-5 flex items-center gap-3 text-steel">
            <span className="text-cyan">[{index}]</span> Featured · {game.genre}
          </Reveal>
          <h2 id={`${game.slug}-feature-title`} className="font-display text-5xl leading-[0.9] font-bold tracking-tight uppercase sm:text-6xl">
            <Scramble text={game.title} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-4 font-display text-xl text-cyan">{game.tagline}</p>
            <p className="mt-5 leading-relaxed text-fog">{game.description}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-6 flex flex-wrap items-center gap-3">
            <StatusChip status={game.status} />
            <span className="hud text-steel">{game.release}</span>
          </Reveal>
          {game.progress !== undefined && (
            <Reveal delay={0.18} className="mt-6">
              <ProgressBar value={game.progress} stage={game.stage} label={`${game.title} progress to 1.0`} />
            </Reveal>
          )}
          <Reveal delay={0.2}>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {game.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-fog">
                  <Check className="size-4 shrink-0 text-lime" aria-hidden /> {f}
                </li>
              ))}
            </ul>
            <p className="hud mt-6 text-steel">Platforms: {game.platforms.join(" · ")}</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-3">
            <HudButton href="https://store.steampowered.com/" external>
              {game.status === "Early Access" ? "Join Early Access" : "Play now"}
            </HudButton>
            <button
              type="button"
              onClick={() => setLightbox(0)}
              className="chamfer hud flex items-center gap-2 bg-snow/5 px-5 py-3.5 text-snow ring-1 ring-snow/15 ring-inset transition hover:bg-snow/10 hover:ring-cyan/50 [--cut:12px]"
            >
              <Expand className="size-4" aria-hidden /> View {shots.length} screenshots
            </button>
          </Reveal>
        </div>
      </div>
      <Lightbox shots={shots} index={lightbox} onChange={setLightbox} />
    </section>
  );
}
