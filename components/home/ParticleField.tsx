"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; c: string; t: number };

/**
 * Lightweight canvas of drifting data-motes. Pauses off-screen and renders a
 * single static frame when the visitor prefers reduced motion.
 */
export function ParticleField({ density = 70, className }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["43,228,255", "195,255,51", "234,242,250"];
    let parts: P[] = [];

    const seed = () => {
      const count = Math.round(density * Math.min(1, w / 1200) + 18);
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: -(Math.random() * 0.35 + 0.08),
        vx: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.6 + 0.2,
        c: colors[Math.random() < 0.6 ? 0 : Math.random() < 0.5 ? 1 : 2],
        t: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += 0.03;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.t));
        ctx.fillStyle = `rgba(${p.c},${alpha})`;
        ctx.fillRect(p.x, p.y, p.r * 1.6, p.r * 1.6);
      }
    };

    const step = () => {
      if (!running) return;
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduce) {
      draw();
    } else {
      const io = new IntersectionObserver(([entry]) => {
        running = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (running) raf = requestAnimationFrame(step);
      });
      io.observe(canvas);
      return () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
      };
    }
    return () => ro.disconnect();
  }, [density, reduce]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
