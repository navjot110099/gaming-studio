"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { easeLux } from "./Reveal";

export type Segment = { text: string; className?: string };

type WordRevealProps = {
  segments: Segment[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
};

/**
 * Masks each word and slides it up into place. Works with any line wrapping,
 * so headlines reflow naturally from 375px to 1920px.
 */
export function WordReveal({
  segments,
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false,
  as = "h2",
  id,
}: WordRevealProps) {
  const Tag = motion[as];
  const words = segments.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, className: seg.className })),
  );
  const label = segments.map((s) => s.text).join(" ");

  return (
    <Tag
      id={id}
      className={className}
      aria-label={label}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } })}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map(({ w, className: wc }, i) => (
        <Fragment key={`${w}-${i}`}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] pr-[0.06em] -mr-[0.06em] align-bottom">
            <motion.span
              className={cn("inline-block will-change-transform", wc)}
              variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
              transition={{ duration: 1.1, ease: easeLux }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
