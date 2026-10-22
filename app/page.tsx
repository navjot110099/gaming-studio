import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { FeaturedGame } from "@/components/home/FeaturedGame";
import { LatestProject } from "@/components/home/LatestProject";
import { Roster } from "@/components/home/Roster";
import { Tournaments } from "@/components/home/Tournaments";
import { Stats } from "@/components/home/Stats";
import { Community } from "@/components/home/Community";
import { Sponsors } from "@/components/home/Sponsors";
import { Newsletter } from "@/components/home/Newsletter";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <FeaturedGame />
      <LatestProject />
      <Roster />
      <Stats />
      <Tournaments />
      <Community />
      <Sponsors />
      <Newsletter />
    </>
  );
}
