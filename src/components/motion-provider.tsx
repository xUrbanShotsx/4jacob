"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global motion configuration. `reducedMotion="user"` honours the visitor's
 * `prefers-reduced-motion` OS setting — transform and layout animations are
 * skipped to their end state (so nothing is left hidden) while opacity still
 * fades, keeping the site usable and comfortable for motion-sensitive users.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
