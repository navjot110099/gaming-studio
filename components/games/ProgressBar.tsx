"use client";

import { motion } from "framer-motion";

export function ProgressBar({ value, label, stage }: { value: number; label: string; stage?: string }) {
  return (
    <div>
      <div className="hud mb-2 flex items-center justify-between text-steel">
        <span>{stage ?? "Progress"}</span>
        <span className="text-lime tabular-nums">{value}%</span>
      </div>
      <div className="relative h-1.5 bg-snow/10" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan to-lime"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
