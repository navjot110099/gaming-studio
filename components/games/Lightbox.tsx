"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { Img } from "@/components/ui/Img";
import { useFocusTrap, useLockBody } from "@/lib/hooks";

export type Shot = { id: string; alt: string; game: string };

type Props = {
  shots: Shot[];
  index: number | null;
  onChange: (i: number | null) => void;
};

/** Full-screen screenshot viewer with arrow-key navigation and focus trapping. */
export function Lightbox({ shots, index, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const close = useCallback(() => onChange(null), [onChange]);
  useLockBody(open);
  useFocusTrap(ref, open, close);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % shots.length);
      if (e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, shots.length, onChange]);

  const shot = index !== null ? shots[index] : null;

  return (
    <AnimatePresence>
      {open && shot && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={`Screenshot viewer: ${shot.alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex flex-col bg-void/95 backdrop-blur-md"
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="hud text-fog">
              <span className="text-cyan">{shot.game}</span> {"//"} {index! + 1} / {shots.length}
            </p>
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center ring-1 ring-snow/20 ring-inset transition hover:bg-lime hover:text-void"
              aria-label="Close viewer"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-20">
            <AnimatePresence mode="wait">
              <motion.figure
                key={shot.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full max-h-[78vh] w-full max-w-6xl"
              >
                <Img id={shot.id} alt={shot.alt} fill sizes="(min-width: 1200px) 72rem, 100vw" className="object-contain" />
                <figcaption className="sr-only">{shot.alt}</figcaption>
              </motion.figure>
            </AnimatePresence>
            {shots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onChange((index! - 1 + shots.length) % shots.length)}
                  className="absolute left-2 grid size-12 place-items-center bg-void/80 ring-1 ring-snow/20 ring-inset transition hover:bg-cyan hover:text-void sm:left-6"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onChange((index! + 1) % shots.length)}
                  className="absolute right-2 grid size-12 place-items-center bg-void/80 ring-1 ring-snow/20 ring-inset transition hover:bg-cyan hover:text-void sm:right-6"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>
          <p className="px-5 pb-6 text-center text-sm text-fog sm:px-8">{shot.alt}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
