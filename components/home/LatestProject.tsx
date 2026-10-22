"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { devlog, games } from "@/lib/data";

const game = games.find((g) => g.slug === "echo-protocol")!;
const stages = ["Concept", "Pre-prod", "Alpha", "Beta", "Launch"];

export function LatestProject() {
  return (
    <section className="relative overflow-hidden border-y border-snow/10 bg-void-2 py-24 lg:py-36" aria-labelledby="latest-title">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="02" label="Latest project" />
            <SectionTitle id="latest-title">
              Echo <span className="text-outline">Protocol</span>
            </SectionTitle>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">{game.description}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <div className="flex items-end justify-between">
              <p className="hud text-steel">Development progress</p>
              <p className="font-display text-5xl font-bold text-lime">
                <Counter to={game.progress ?? 0} suffix="%" duration={2} />
              </p>
            </div>
            <div className="relative mt-4 h-2 bg-snow/10" role="progressbar" aria-valuenow={game.progress} aria-valuemin={0} aria-valuemax={100} aria-label="Echo Protocol development progress">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan to-lime shadow-[0_0_16px_var(--color-lime)]"
                initial={{ width: 0 }}
                whileInView={{ width: `${game.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <ol className="hud mt-3 grid grid-cols-5 text-[0.6rem] text-steel">
              {stages.map((s, i) => (
                <li key={s} className={i === 2 ? "text-lime" : i < 2 ? "text-fog" : ""}>
                  {s}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal variant="left" className="group relative lg:col-span-7">
            <div className="duotone chamfer relative aspect-[16/10] overflow-hidden bg-void-3 [--cut:24px]">
              <Img id={game.cover.id} alt={game.cover.alt} fill sizes="(min-width: 1024px) 55vw, 92vw" className="group-hover:scale-105" />
            </div>
            <p className="hud absolute bottom-4 left-4 z-10 bg-void/80 px-3 py-1.5 text-fog backdrop-blur">Concept art — Neo-Osaka, District 2</p>
          </Reveal>
          <div className="flex flex-col lg:col-span-5">
            <Reveal variant="fade">
              <p className="hud mb-4 text-cyan">{"// "}Devlog</p>
            </Reveal>
            <Stagger as="ul" className="divide-y divide-snow/10 border-y border-snow/10" stagger={0.1}>
              {devlog.map((d) => (
                <StaggerItem as="li" key={d.title}>
                  <Link href="/games#echo-protocol" className="group flex items-start gap-5 py-5 transition-colors hover:bg-snow/[0.03]">
                    <span className="hud shrink-0 pt-1 text-steel tabular-nums">{d.date}</span>
                    <span className="flex-1">
                      <span className="hud mr-2 bg-cyan/10 px-1.5 py-0.5 text-cyan">{d.tag}</span>
                      <span className="mt-2 block font-display text-lg leading-snug font-semibold transition-colors group-hover:text-lime">
                        {d.title}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-steel transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" aria-hidden />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-6 grid grid-cols-2 gap-4">
              {game.screenshots.map((s) => (
                <div key={s.id} className="group duotone relative aspect-video overflow-hidden bg-void-3">
                  <Img id={s.id} alt={s.alt} fill sizes="(min-width: 1024px) 20vw, 45vw" className="group-hover:scale-105" />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
