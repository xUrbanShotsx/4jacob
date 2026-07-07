"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Wraps the site in next-themes. The @/components/ui design system is dark-first and
 * keys its tokens off the `.dark` / `.light` class on <html>, so we drive it with
 * `attribute="class"`. Transitions are disabled here because the theme toggle runs
 * its own View-Transitions "book-open" wipe (see globals.css).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
