"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

function format(v: number, decimals: number, prefix: string, suffix: string) {
  return (
    prefix +
    v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
    suffix
  );
}

/** Counts up to `to` the first time it enters the viewport. */
export function Counter({
  to,
  from = 0,
  duration = 2.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (reduce) {
      node.textContent = format(to, decimals, prefix, suffix);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v, decimals, prefix, suffix);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration, decimals, prefix, suffix]);

  return (
    <span className={className}>
      <span className="sr-only">{format(to, decimals, prefix, suffix)}</span>
      <span ref={ref} aria-hidden>
        {format(from, decimals, prefix, suffix)}
      </span>
    </span>
  );
}
