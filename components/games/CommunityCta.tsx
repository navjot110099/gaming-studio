import { Img } from "@/components/ui/Img";
import { HudButton } from "@/components/ui/HudButton";
import { Brackets } from "@/components/ui/Brackets";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { RegisterDialog } from "@/components/home/RegisterDialog";

export function CommunityCta() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32" aria-labelledby="cta-title">
      <Reveal variant="scale" duration={1.1}>
        <div className="chamfer relative isolate overflow-hidden bg-void-3 px-6 py-16 sm:px-12 lg:px-20 lg:py-24 [--cut:40px]">
          <div aria-hidden className="absolute inset-0 -z-10">
            <Img id="1633545495735-25df17fb9f31" alt="" fill sizes="100vw" className="opacity-40 [filter:grayscale(0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40" />
            <div className="grid-lines absolute inset-0 opacity-60" />
          </div>
          <Brackets className="inset-4 sm:inset-6" size="size-6" />
          <p className="hud mb-6 text-lime">{"// "}Community</p>
          <h2 id="cta-title" className="max-w-3xl font-display text-4xl leading-[0.92] font-bold uppercase sm:text-6xl lg:text-7xl">
            <Scramble text="Play it before" className="block" />
            <Scramble text="anyone else." className="text-glow block text-cyan" delay={0.2} />
          </h2>
          <p className="mt-6 max-w-xl text-lg text-fog">
            Closed playtests for ECHO PROTOCOL start in January. Join the Discord, apply for a slot, and help us tune the
            game before it ships.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <HudButton href="https://discord.com/" external>
              Join the Discord
            </HudButton>
            <RegisterDialog
              event="ECHO PROTOCOL — Closed Playtest"
              cta="Apply for playtest"
              className="group/cta chamfer flex items-center gap-3 bg-cyan/10 px-6 py-3.5 font-display text-[0.8rem] font-bold tracking-[0.16em] text-cyan uppercase ring-1 ring-cyan/50 ring-inset transition-colors [--cut:12px] hover:bg-cyan hover:text-void"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
