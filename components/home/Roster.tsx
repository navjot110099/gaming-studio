import { Img } from "@/components/ui/Img";
import { HudButton } from "@/components/ui/HudButton";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { players } from "@/lib/data";

export function Roster() {
  return (
    <section id="roster" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36" aria-labelledby="roster-title">
      <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <SectionLabel index="03" label="Pro roster" />
          <SectionTitle id="roster-title">
            Team <span className="text-lime">NXV</span>
          </SectionTitle>
        </div>
        <Reveal delay={0.1} className="max-w-md">
          <p className="text-fog">
            Our VOIDFALL squad: 2025 World Finalists, two-time European champions and the hungriest five players we know.
          </p>
          <HudButton href="#tournaments" variant="ghost" className="mt-6">
            Next match: Nov 14
          </HudButton>
        </Reveal>
      </div>

      <Stagger className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden" stagger={0.08}>
        {players.map((p, i) => (
          <StaggerItem key={p.handle} className="w-[72%] shrink-0 snap-start sm:w-auto">
            <article className="group relative">
              <div className="duotone chamfer relative aspect-[3/4] overflow-hidden bg-void-3 [--cut:20px]">
                <Img id={p.image.id} alt={p.image.alt} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 72vw" className="group-hover:scale-105" />
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-void via-void/20 to-transparent" />
                <span className="hud absolute top-4 left-4 z-[3] text-steel">0{i + 1}</span>
                <span className="hud absolute top-4 right-4 z-[3] bg-void/70 px-2 py-1 text-fog">{p.country}</span>
                <div className="absolute inset-x-0 bottom-0 z-[3] p-4">
                  <p className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-lime">{p.handle}</p>
                  <p className="text-sm text-fog">{p.name}</p>
                  <dl className="mt-3 grid max-h-0 grid-cols-2 gap-2 overflow-hidden opacity-0 transition-all duration-500 ease-snap group-hover:max-h-20 group-hover:opacity-100 group-focus-within:max-h-20 group-focus-within:opacity-100">
                    <div>
                      <dt className="hud text-steel">K/D</dt>
                      <dd className="font-display text-lg font-bold text-cyan">{p.kd}</dd>
                    </div>
                    <div>
                      <dt className="hud text-steel">Rating</dt>
                      <dd className="font-display text-lg font-bold text-cyan">{p.rating}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <p className="hud mt-3 text-cyan">{p.role}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
