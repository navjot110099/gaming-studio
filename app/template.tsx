"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

let hasMounted = false;

/**
 * Soft cross-fade between pages. Skipped on the very first load so the hero's
 * own entrance sequence plays without waiting on a wrapper fade.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [animateIn] = useState(() => hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);
  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
