"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { DEMO_URL } from "@/lib/site";

/** Bump this key to re-surface the bar for everyone when the message changes. */
const STORAGE_KEY = "banner:demo-live";
const BANNER_HEIGHT = "1.75rem";

/**
 * Slim, dismissible announcement bar pinned to the top of every page — modeled
 * on the demo app's status-bar banner. While visible it sets `--banner-h` on the
 * document root; `globals.css` reads that to push the fixed nav and page content
 * down by exactly the bar's height. The choice persists in `localStorage`, so a
 * dismissed bar stays gone on return.
 *
 * Colours invert the page surface (`bg-text`/`text-bg`): dark-grey bar in light
 * mode, white bar in dark mode.
 */
export function SiteBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = !localStorage.getItem(STORAGE_KEY);
    setVisible(show);
    if (show) document.documentElement.style.setProperty("--banner-h", BANNER_HEIGHT);
    return () => {
      document.documentElement.style.removeProperty("--banner-h");
    };
  }, []);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    document.documentElement.style.removeProperty("--banner-h");
    setVisible(false);
  }

  return (
    <section
      aria-label="Announcement"
      className="fixed inset-x-0 top-0 z-50 flex h-[var(--banner-h)] select-none items-center justify-center bg-text px-9 text-center text-[12px] text-bg"
    >
      <p className="overflow-hidden whitespace-nowrap">
        <strong className="font-semibold">The public demo is now live.</strong>
        <span className="ml-1.5 max-[767px]:hidden">
          Explore the full Briesa platform — no signup.
        </span>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 font-semibold underline underline-offset-2 hover:opacity-85"
        >
          Try it now →
        </a>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="-translate-y-1/2 absolute top-1/2 right-2 flex items-center p-1.5 text-bg/70 transition-colors hover:text-bg"
      >
        <X className="size-3.5" />
      </button>
    </section>
  );
}
