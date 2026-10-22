import { MapPin, Trophy } from "lucide-react";
import { RegisterDialog } from "./RegisterDialog";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Img } from "@/components/ui/Img";
import { tournaments } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Tournaments() {
  return (
    <section id="tournaments" className="relative overflow-hidden py-24 lg:py-36" aria-labelledby="tournaments-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Img id="1573152958734-1922c188fba3" alt="" fill sizes="100vw" className="opacity-25 [filter:grayscale(1)_contrast(1.2)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/85 to-void" />
      </div>
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="04" label="Upcoming tournaments" />
            <SectionTitle id="tournaments-title">
              The arena <span className="text-cyan">awaits.</span>
            </SectionTitle>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-fog">
              From open online cups to sold-out arenas, we run more than 40 events a year. Register a team, grab a seat, or
              watch every match live on our channels.
            </p>
          </Reveal>
        </div>

        <Stagger as="ul" className="border-t border-snow/10" stagger={0.1}>
          {tournaments.map((t, i) => (
            <StaggerItem as="li" key={t.name} className="border-b border-snow/10">
              <article
                className="group relative grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 py-6 transition-colors sm:gap-x-8 lg:grid-cols-[6rem_1fr_14rem_10rem_12rem] lg:py-8"
              >
                <span aria-hidden className="absolute inset-y-0 -inset-x-4 -z-10 origin-left scale-x-0 bg-gradient-to-r from-cyan/10 to-transparent transition-transform duration-700 ease-snap group-hover:scale-x-100" />
                <div className="chamfer grid size-16 shrink-0 place-items-center bg-void-3 ring-1 ring-snow/10 [--cut:10px] group-hover:bg-lime group-hover:text-void sm:size-20 lg:size-24">
                  <span className="text-center leading-none">
                    <span className="block font-display text-2xl font-bold sm:text-3xl">{t.day}</span>
                    <span className="hud mt-1 block">{t.month}</span>
                  </span>
                </div>
                <div className="min-w-0">
                  <p className={cn("hud mb-2", i === 0 ? "text-lime" : "text-cyan")}>{t.status}</p>
                  <h3 className="font-display text-xl leading-tight font-bold uppercase sm:text-2xl lg:text-3xl">{t.name}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-steel">
                    <MapPin className="size-3.5" aria-hidden /> {t.location}
                  </p>
                </div>
                <p className="hud col-span-2 text-fog lg:col-span-1">{t.format}</p>
                <p className="col-span-1 flex items-center gap-2 font-display text-xl font-bold text-snow lg:col-span-1">
                  <Trophy className="size-4 text-lime" aria-hidden />
                  {t.prize}
                </p>
                <RegisterDialog
                  event={t.name}
                  cta={t.cta}
                  className="group/cta hud col-span-1 flex items-center justify-end gap-2 justify-self-end px-3 py-2 text-fog ring-1 ring-snow/15 ring-inset transition-colors hover:bg-lime hover:text-void hover:ring-lime"
                />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
