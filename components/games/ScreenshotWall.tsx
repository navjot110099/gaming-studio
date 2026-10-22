"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Lightbox, type Shot } from "./Lightbox";
import { games } from "@/lib/data";
import { cn } from "@/lib/utils";

const shots: Shot[] = games
  .filter((g) => g.status !== "Classified")
  .flatMap((g) => g.screenshots.map((s) => ({ ...s, game: g.title })))
  .filter((s, i, arr) => arr.findIndex((x) => x.id === s.id) === i);

const spans = ["lg:col-span-2 lg:row-span-2", "", "", "lg:row-span-2", "", "lg:col-span-2", "", ""];

export function ScreenshotWall() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <section className="border-y border-snow/10 bg-void-2 py-24 lg:py-32" aria-labelledby="screens-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12">
          <SectionLabel index="04" label="Screenshots" />
          <SectionTitle id="screens-title">
            Captured <span className="text-lime">in-engine</span>
          </SectionTitle>
        </div>
        <Stagger className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] lg:grid-cols-4 lg:gap-4" stagger={0.06}>
          {shots.map((s, i) => (
            <StaggerItem key={s.id} variant="scale" className={cn(spans[i % spans.length])}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group duotone relative block h-full w-full overflow-hidden bg-void-3 text-left"
                aria-label={`Open screenshot: ${s.alt}`}
              >
                <Img id={s.id} alt={s.alt} fill sizes="(min-width: 1024px) 40vw, 50vw" className="group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between bg-gradient-to-t from-void/90 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="hud text-snow">{s.game}</span>
                  <Expand className="size-4 text-cyan" aria-hidden />
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <Lightbox shots={shots} index={index} onChange={setIndex} />
    </section>
  );
}
