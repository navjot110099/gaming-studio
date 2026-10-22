import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { sponsors } from "@/lib/data";

const styles = [
  "font-display font-bold tracking-[0.2em]",
  "font-sans font-semibold italic tracking-tight text-2xl",
  "font-mono lowercase tracking-[0.1em]",
  "font-display font-semibold tracking-[0.3em] text-base",
  "font-mono tracking-tight",
  "font-display font-bold tracking-[0.4em] text-base",
  "font-sans font-bold tracking-[0.15em] italic",
  "font-display font-medium tracking-[0.1em]",
];

export function Sponsors() {
  return (
    <section className="border-t border-snow/10 py-20 lg:py-24" aria-labelledby="partners-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <Reveal className="mb-10 flex items-center gap-4">
          <h2 id="partners-title" className="hud text-steel">
            Partners & sponsors
          </h2>
          <span className="h-px flex-1 bg-snow/10" aria-hidden />
        </Reveal>
        <Stagger as="ul" className="grid grid-cols-2 gap-px bg-snow/10 sm:grid-cols-4" stagger={0.05}>
          {sponsors.map((s, i) => (
            <StaggerItem as="li" key={s} variant="fade" className="group relative grid h-24 place-items-center bg-void sm:h-28">
              <span
                className={`text-xl text-steel/70 transition-all duration-500 group-hover:text-snow group-hover:[text-shadow:0_0_20px_rgb(43_228_255/0.6)] ${styles[i % styles.length]}`}
              >
                {s}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
