"use client";

import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] text-ivory transition-colors hover:border-gold/50 hover:text-gold-bright ${className}`}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
      )}
    </motion.button>
  );
}
