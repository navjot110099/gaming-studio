import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { LegalLinks } from "./LegalLinks";
import { site } from "@/lib/site";
import { games } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-cyan/15 bg-void-2">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 lg:px-10 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-steel">{site.tagline} An independent studio of 140 developers, artists and competitors, building in Berlin since 2019.</p>
            <p className="hud mt-8 flex items-center gap-2 text-lime">
              <span className="size-1.5 animate-pulse rounded-full bg-lime" aria-hidden />
              All systems operational
            </p>
          </div>
          <nav aria-label="Footer — site" className="lg:col-span-2 lg:col-start-6">
            <p className="hud mb-5 text-cyan">{"// "}Site</p>
            <ul className="space-y-3 text-fog">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-lime">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer — games" className="lg:col-span-2">
            <p className="hud mb-5 text-cyan">{"// "}Games</p>
            <ul className="space-y-3 text-fog">
              {games
                .filter((g) => g.status !== "Classified")
                .map((g) => (
                  <li key={g.slug}>
                    <Link href={`/games#${g.slug}`} className="transition-colors hover:text-lime">
                      {g.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="hud mb-5 text-cyan">{"// "}Contact</p>
            <address className="space-y-1 text-fog not-italic">
              {site.address.map((a) => (
                <p key={a}>{a}</p>
              ))}
            </address>
            <div className="mt-5 space-y-1">
              <a href={`mailto:${site.email}`} className="block text-fog transition-colors hover:text-lime">
                {site.email}
              </a>
              <a href={`mailto:${site.press}`} className="block text-fog transition-colors hover:text-lime">
                {site.press}
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hud inline-block px-3 py-2 text-fog ring-1 ring-snow/15 ring-inset transition hover:text-void hover:bg-cyan hover:ring-cyan"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="text-outline mt-20 font-display text-[16vw] leading-[0.8] font-bold tracking-[-0.03em] whitespace-nowrap select-none lg:text-[13.5vw]"
        >
          NEXUS//VOID
        </p>

        <div className="flex flex-col gap-4 border-t border-snow/10 py-6 text-sm text-steel md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legal}. All trademarks are property of their respective owners.
          </p>
          <div className="flex items-center gap-6">
            <LegalLinks />
            <a href="#top" className="hud flex items-center gap-2 text-fog transition-colors hover:text-lime" aria-label="Back to top">
              Top <ArrowUp className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
