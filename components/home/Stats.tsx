import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Brackets } from "@/components/ui/Brackets";

const stats = [
  { to: 12.4, decimals: 1, suffix: "M", label: "Players across our games" },
  { to: 48, suffix: "", label: "Tournament titles won" },
  { to: 3.2, decimals: 1, suffix: "M", label: "Community members" },
  { to: 140, suffix: "", label: "Developers, artists & pros" },
];

export function Stats() {
  return (
    <section className="relative border-y border-snow/10 bg-void-2" aria-label="Nexus//Void by the numbers">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="group relative border-snow/10 px-5 py-12 not-last:border-r max-lg:nth-2:border-r-0 max-lg:nth-[-n+2]:border-b sm:px-8 lg:px-10 lg:py-16"
          >
            <Brackets className="opacity-0 group-hover:opacity-100" />
            <p className="hud mb-4 text-steel">[0{i + 1}]</p>
            <p className="text-glow font-display text-5xl leading-none font-bold text-snow sm:text-6xl lg:text-7xl">
              <Counter to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix} />
            </p>
            <p className="mt-4 max-w-[12rem] text-sm text-fog">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
