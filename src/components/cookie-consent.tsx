"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

const STORAGE_KEY = "cookie-consent";

/**
 * Minimal cookie-consent banner. Persists the choice in `localStorage` and hides
 * once decided. When analytics/marketing pixels land, gate them on the stored
 * `"accepted"` value (see the TODO in `decide`).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(STORAGE_KEY));
  }, []);

  if (!visible) return null;

  function decide(choice: "accepted" | "rejected") {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
    // TODO(analytics): when analytics/marketing scripts are added, only load them
    // when `choice === "accepted"` (and re-check this key on subsequent visits).
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-border border-t bg-bg/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary">
          We use essential cookies to run this site and, with your consent, analytics to improve it.
          See our{" "}
          <a href="/privacy" className="text-text underline">
            privacy policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button type="button" variant="secondary" onClick={() => decide("rejected")}>
            Reject non-essential
          </Button>
          <Button type="button" variant="primary" onClick={() => decide("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
