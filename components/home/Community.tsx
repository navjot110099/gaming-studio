import { ArrowUpRight, MessageSquare, Palette, Radio } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { HudButton } from "@/components/ui/HudButton";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const cards = [
  {
    icon: MessageSquare,
    title: "The Discord",
    stat: "3.2M members",
    body: "Patch notes first, dev AMAs every month, LFG channels for every game and region.",
    image: { id: "1558008258-7ff8888b42b0", alt: "Rows of players competing at a community LAN event" },
    href: "https://discord.com/",
  },
  {
    icon: Radio,
    title: "Creator Program",
    stat: "1,800 creators",
    body: "Early builds, revenue share on in-game creator codes and a direct line to our team.",
    image: { id: "1779896412277-c4fd15c7a89c", alt: "Creator editing a stream highlight across multiple monitors" },
    href: "https://www.twitch.tv/",
  },
  {
    icon: Palette,
    title: "Community Cups",
    stat: "Weekly",
    body: "Free-to-enter weekly cups with in-game rewards. The best squads get invited to the Open Series.",
    image: { id: "1542751371-adc38448a05e", alt: "Player in a gaming chair in front of a glowing setup" },
    href: "https://discord.com/",
  },
];

export function Community() {
  return (
    <section id="community" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36" aria-labelledby="community-title">
      <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel index="05" label="Community" />
          <SectionTitle id="community-title">
            Built <span className="text-cyan">with</span> players,
            <br /> not for them.
          </SectionTitle>
        </div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-fog">
            Every map, balance patch and roadmap decision is tested with the community first. Join millions of players
            shaping what comes next.
          </p>
          <HudButton href="https://discord.com/" external variant="cyan" className="mt-6">
            Join the Discord
          </HudButton>
        </Reveal>
      </div>

      <Stagger className="grid gap-5 md:grid-cols-3" stagger={0.12}>
        {cards.map((c) => (
          <StaggerItem key={c.title}>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group chamfer relative flex h-full flex-col bg-void-2 ring-1 ring-snow/10 transition-all duration-500 ring-inset [--cut:22px] hover:-translate-y-1.5 hover:ring-cyan/40"
            >
              <div className="duotone relative aspect-[16/10] overflow-hidden">
                <Img id={c.image.id} alt={c.image.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center bg-cyan/10 text-cyan transition-transform duration-500 group-hover:rotate-[8deg] group-hover:bg-lime group-hover:text-void">
                    <c.icon className="size-5" aria-hidden />
                  </span>
                  <span className="hud text-lime">{c.stat}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase">{c.title}</h3>
                <p className="mt-3 flex-1 text-fog">{c.body}</p>
                <span className="hud mt-6 flex items-center gap-2 text-steel transition-colors group-hover:text-cyan">
                  Open <ArrowUpRight className="size-3.5" aria-hidden />
                </span>
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
