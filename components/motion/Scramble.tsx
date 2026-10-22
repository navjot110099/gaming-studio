"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#%&*<>[]=+";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** ms per resolved character */
  speed?: number;
  immediate?: boolean;
};

/**
 * HUD-style "decode" effect: characters cycle through random glyphs and lock
 * in left-to-right. The real text is always present for assistive tech.
 */
export function Scramble({ text, className, delay = 0, speed = 38, immediate = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);
  const [hidden, setHidden] = useState(!reduce);

  useEffect(() => {
    if (reduce) return;
    if (!immediate && !inView) return;
    let frame = 0;
    let raf = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      setHidden(false);
      const tick = (t: number) => {
        if (!start) start = t;
        const resolved = Math.floor((t - start) / speed);
        frame++;
        if (frame % 2 === 0) {
          setOut(
            text
              .split("")
              .map((c, i) => {
                if (c === " " || i < resolved) return c;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              })
              .join(""),
          );
        }
        if (resolved < text.length) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, immediate, reduce, text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden style={{ visibility: hidden && !reduce ? "hidden" : "visible" }}>
        {out}
      </span>
    </span>
  );
}
