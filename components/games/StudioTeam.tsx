import { Img } from "@/components/ui/Img";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { studioTeam } from "@/lib/data";

export function StudioTeam() {
  return (
    <section id="team" className="border-t border-snow/10 bg-void-2 py-24 lg:py-32" aria-labelledby="team-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="06" label="The team" />
            <SectionTitle id="team-title">
              The people <span className="text-outline">behind</span> the void
            </SectionTitle>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-fog">
              140 people across Berlin, Montréal and remote — led by veterans of competitive games, film and music
              technology.
            </p>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" stagger={0.07}>
          {studioTeam.map((m) => (
            <StaggerItem key={m.name}>
              <article className="group">
                <div className="duotone chamfer relative aspect-[4/5] overflow-hidden bg-void-3 [--cut:16px]">
                  <Img id={m.image.id} alt={m.image.alt} fill sizes="(min-width: 1024px) 15vw, (min-width: 768px) 30vw, 46vw" className="group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-lg leading-tight font-bold">{m.name}</h3>
                <p className="hud mt-1 text-cyan">{m.role}</p>
                <p className="mt-2 text-xs text-steel">{m.prev}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
