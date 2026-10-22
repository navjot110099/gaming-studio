"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const easeLux = [0.22, 1, 0.36, 1] as const;

const presets = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -24 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof presets;

type Tag = "div" | "ul" | "ol" | "li" | "section" | "article";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
};

/** Fades/slides its children in once they scroll into view. */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 1,
  className,
  amount = 0.2,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={presets[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: easeLux }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers any <StaggerItem> children as it enters the viewport. */
export function Stagger({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: Tag;
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
  duration = 0.9,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  as?: Tag;
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp className={className} variants={presets[variant]} transition={{ duration, ease: easeLux }}>
      {children}
    </Comp>
  );
}
