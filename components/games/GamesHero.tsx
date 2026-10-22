"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Scramble } from "@/components/motion/Scramble";
import { Counter } from "@/components/motion/Counter";
import { ParticleField } from "@/components/home/ParticleField";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { to: 6, label: "Titles in the archive" },
  { to: 2, label: "Live service games" },
  { to: 3, label: "Projects in development" },
];

export function GamesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-snow/10 pt-28 lg:pt-36" aria-labelledby="games-title">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease, delay: 0.3 }}
        className="absolute inset-0 -z-20"
      >
        <Img id="1728289306599-399d47b9cb43" alt="" fill preload sizes="100vw" className="object-cover opacity-35 [filter:grayscale(0.6)_contrast(1.2)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/80 to-void" />
      </motion.div>
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <ParticleField density={40} className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      <div className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hud mb-10 flex items-center gap-2 text-steel"
        >
          <Link href="/" className="hover:text-cyan">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-fog">
            Games
          </span>
        </motion.nav>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="hud mb-6 text-cyan"
        >
          [ARCHIVE] {"//"} Games & projects
        </motion.p>
        <h1 id="games-title" className="font-display text-[3.6rem] leading-[0.86] font-bold tracking-[-0.02em] uppercase sm:text-8xl lg:text-[9rem]">
          <Scramble immediate delay={0.45} text="WORLDS" className="block" />
          <Scramble immediate delay={0.65} text="IN PROGRESS" className="text-glow block text-cyan" />
        </h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.95 }}
            className="max-w-xl text-lg leading-relaxed text-fog lg:col-span-6"
          >
            Every game we&rsquo;ve shipped and everything we&rsquo;re building — with screenshots, platforms, release
            status and honest development progress. Filter by status below.
          </motion.p>
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
            className="grid grid-cols-3 gap-px bg-snow/10 ring-1 ring-snow/10 lg:col-span-5 lg:col-start-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col bg-void/80 p-4 backdrop-blur sm:p-5">
                <dt className="hud order-2 text-steel">{s.label}</dt>
                <dd className="font-display text-4xl font-bold text-lime">
                  <Counter to={s.to} duration={1.4} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
