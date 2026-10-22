import { HudButton } from "@/components/ui/HudButton";

export default function NotFound() {
  return (
    <section className="grid-lines relative flex min-h-[80vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="hud mb-6 text-lime">Error 404 {"//"} Signal lost</p>
      <h1 className="font-display text-7xl font-bold uppercase sm:text-9xl">
        Out of <span className="text-glow text-cyan">bounds</span>
      </h1>
      <p className="mt-6 max-w-md text-fog">This sector of the map doesn&rsquo;t exist. Respawn somewhere safer.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <HudButton href="/">Respawn home</HudButton>
        <HudButton href="/games" variant="cyan">
          Browse games
        </HudButton>
      </div>
    </section>
  );
}
