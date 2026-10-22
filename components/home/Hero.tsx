"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Swords } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { Img } from "@/components/ui/Img";
import { HudButton } from "@/components/ui/HudButton";
import { Scramble } from "@/components/motion/Scramble";
import { ParticleField } from "./ParticleField";
import { LiveMatch } from "./LiveMatch";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -24);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -16);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-void"
      aria-labelledby="hero-title"
    >
      {/* key art */}
      <motion.div
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease, delay: 0.2 }}
        style={{ y: reduce ? 0 : artY }}
        className="absolute inset-0 -z-20"
      >
        <motion.div style={{ x: sx, y: sy }} className="absolute -inset-8">
          <Img
            id="1563784462386-044fd95e9852"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-[60%_35%] [filter:saturate(1.15)_contrast(1.15)_brightness(1.1)]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-void)_4%,rgb(5_6_8/0.78)_36%,rgb(5_6_8/0.1)_70%,rgb(5_6_8/0.3))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/50" />
        <div className="absolute inset-0 bg-void/55 lg:hidden" />
      </motion.div>

      {/* perspective grid floor */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] [perspective:600px]">
        <div className="grid-lines absolute inset-x-[-50%] bottom-0 h-[200%] origin-bottom animate-grid [transform:rotateX(72deg)] [mask-image:linear-gradient(to_top,black_10%,transparent_70%)]" />
      </div>
      <ParticleField className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="scanlines pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 -z-10 size-[36rem] rounded-full bg-cyan/10 blur-[120px]"
      />

      <motion.div
        style={{ opacity: reduce ? 1 : fade }}
        className="mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-12 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-12 lg:px-10 lg:pt-32"
      >
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="hud mb-7 inline-flex items-center gap-3 bg-lime/10 px-3 py-2 text-lime ring-1 ring-lime/30 ring-inset"
          >
            <Swords className="size-3.5" aria-hidden />
            Season 07 · Operation: Blackout — live now
          </motion.p>

          <h1 id="hero-title" className="font-display leading-[0.84] font-bold tracking-[-0.02em] uppercase">
            <Scramble
              immediate
              delay={0.45}
              text="ENTER"
              className="block text-[4.4rem] text-snow min-[400px]:text-[5.2rem] sm:text-[8rem] lg:text-[10rem] xl:text-[11.5rem]"
            />
            <Scramble
              immediate
              delay={0.7}
              text="THE VOID"
              className="text-glow block text-[4.4rem] text-cyan min-[400px]:text-[5.2rem] sm:text-[8rem] lg:text-[10rem] xl:text-[11.5rem]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-fog"
          >
            We are Nexus//Void — an independent studio and pro esports organisation. We make competitive worlds,
            then we compete in them. Twelve million players and counting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.15 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <HudButton href="/#tournaments">Enter the Arena</HudButton>
            <HudButton href="/games" variant="cyan">
              Explore Games
            </HudButton>
          </motion.div>
        </div>

        <div className="hidden justify-end lg:col-span-4 lg:flex">
          <LiveMatch />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative mx-auto flex w-full max-w-[1440px] items-end justify-between gap-6 border-t border-snow/10 px-5 py-5 sm:px-8 lg:px-10"
      >
        <a href="#featured" className="hud group flex items-center gap-3 text-steel transition-colors hover:text-cyan">
          <span className="grid size-8 place-items-center ring-1 ring-snow/20 ring-inset group-hover:ring-cyan/60">
            <ChevronDown className="size-4 animate-bounce" aria-hidden />
          </span>
          Scroll to explore
        </a>
        <p className="hud hidden text-steel sm:block">Available on PC · PS5 · Xbox Series X|S · Switch 2</p>
      </motion.div>
    </section>
  );
}
