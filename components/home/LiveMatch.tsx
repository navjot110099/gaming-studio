"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Brackets } from "@/components/ui/Brackets";

const rounds = ["w", "w", "l", "w", "l", "w", "w", "l", "w", "l", "w", "w"];

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export function LiveMatch() {
  const [time, setTime] = useState(87);
  const [viewers, setViewers] = useState(184203);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime((t) => (t <= 0 ? 100 : t - 1));
      setViewers((v) => v + Math.round((Math.random() - 0.4) * 60));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.25 }}
      className="relative w-full max-w-sm bg-void/70 p-5 ring-1 ring-cyan/20 backdrop-blur-md"
      aria-label="Live match"
    >
      <Brackets />
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
        <p className="hud flex items-center gap-2 text-lime">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime" />
            <span className="relative size-2 rounded-full bg-lime" />
          </span>
          Live · Masters Qualifier
        </p>
        <p className="hud text-steel tabular-nums">{viewers.toLocaleString("en-US")} watching</p>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div>
          <p className="font-display text-2xl font-bold">NXV</p>
          <p className="hud text-steel">Nexus//Void</p>
        </div>
        <p className="font-display text-4xl font-bold tabular-nums">
          <span className="text-lime">8</span>
          <span className="mx-2 text-steel">:</span>
          <span>4</span>
        </p>
        <div className="text-right">
          <p className="font-display text-2xl font-bold">ORB</p>
          <p className="hud text-steel">Orbit Esports</p>
        </div>
      </div>
      <div className="mt-5 flex gap-1" aria-label="Round history">
        {rounds.map((r, i) => (
          <span key={i} className={`h-1.5 flex-1 ${r === "w" ? "bg-lime" : "bg-snow/20"}`} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-snow/10 pt-4">
        <p className="hud text-fog">Map: Frostline · Map 2/3</p>
        <p className="hud text-cyan tabular-nums">Round {fmt(time)}</p>
      </div>
    </motion.aside>
  );
}
