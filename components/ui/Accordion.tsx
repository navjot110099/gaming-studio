"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: ReactNode };

type AccordionProps = {
  items: Item[];
  defaultOpen?: number | null;
  className?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  /** Renders the open/close indicator; receives the open state. */
  icon?: (open: boolean) => ReactNode;
};

/** Animated FAQ accordion: height expands, content fades, icon rotates. */
export function Accordion({
  items,
  defaultOpen = 0,
  className,
  itemClassName,
  questionClassName,
  answerClassName,
  icon,
}: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;
        return (
          <div key={item.q} className={itemClassName}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn("flex w-full items-center justify-between gap-6 text-left", questionClassName)}
              >
                <span>{item.q}</span>
                {icon ? icon(isOpen) : null}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.35, delay: isOpen ? 0.1 : 0 },
                  }}
                  className="overflow-hidden"
                >
                  <div className={answerClassName}>{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
