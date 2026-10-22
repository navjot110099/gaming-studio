import type { Metadata } from "next";
import { GamesHero } from "@/components/games/GamesHero";
import { FeaturedShowcase } from "@/components/games/FeaturedShowcase";
import { GamesPortfolio } from "@/components/games/GamesPortfolio";
import { ScreenshotWall } from "@/components/games/ScreenshotWall";
import { DevRoadmap } from "@/components/games/DevRoadmap";
import { StudioTeam } from "@/components/games/StudioTeam";
import { CommunityCta } from "@/components/games/CommunityCta";
import { games } from "@/lib/data";
import { unsplash } from "@/lib/utils";

const description =
  "Every Nexus//Void game and project: VOIDFALL, NEON DRIFT: ZERO, ECHO PROTOCOL, SIGNAL LOST and more — with screenshots, platforms, release status and live development progress.";

export const metadata: Metadata = {
  title: "Games & Projects",
  description,
  alternates: { canonical: "/games" },
  openGraph: {
    title: "Games & Projects — Nexus//Void",
    description,
    url: "/games",
    images: [{ url: unsplash("1763198216825-06c985c712a2", 1200, 630), width: 1200, height: 630, alt: "VOIDFALL key art" }],
  },
};

export default function GamesPage() {
  return (
    <>
      <GamesHero />
      <FeaturedShowcase game={games[0]} index="01" />
      <FeaturedShowcase game={games[1]} index="02" flip />
      <GamesPortfolio />
      <ScreenshotWall />
      <DevRoadmap />
      <StudioTeam />
      <CommunityCta />
    </>
  );
}
