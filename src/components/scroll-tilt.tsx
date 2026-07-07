"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/components/ui";

/**
 * Scroll-driven 3D reveal. As the element scrolls up into view it rises, fades,
 * un-tilts on the X axis and settles to full scale — the "premium product shot"
 * effect. An optional ambient accent glow swells behind it. Drop any framed
 * content (a product mock, an image) inside.
 */
export function ScrollTilt({
  children,
  className,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  /** Render the ambient accent glow behind the content (default true). */
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 35%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const glowScale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 1]);

  return (
    <div style={{ perspective: "2000px" }} className={cn("overflow-x-clip", className)}>
      <motion.div
        ref={ref}
        style={{ y, opacity, scale, rotateX }}
        className="relative will-change-transform"
      >
        {glow && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-32 -z-10"
            style={{ scale: glowScale, opacity: glowOpacity }}
          >
            <div
              className="absolute inset-0 blur-[140px]"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, var(--accent-bg) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        )}
        {children}
      </motion.div>
    </div>
  );
}
