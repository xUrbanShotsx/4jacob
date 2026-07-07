"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/components/ui";

/**
 * Light/dark switch. When the browser supports View Transitions we run the
 * "book-open" wipe defined in globals.css; otherwise we just flip the class.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggle = async () => {
    const next = isDark ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    document.documentElement.classList.add("theme-transition");
    try {
      await document.startViewTransition(() => setTheme(next)).finished;
    } finally {
      document.documentElement.classList.remove("theme-transition");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "relative inline-flex size-7 items-center justify-center text-text-secondary transition-colors hover:text-text",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inline-flex"
        >
          {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
