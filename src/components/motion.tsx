"use client";

import {
  type HTMLMotionProps,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/components/ui";

/** Shared editorial ease — fast start, long gentle tail. */
export const EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Wraps a single interactive child (typically a primary CTA) and nudges it
 * toward the cursor on hover, spring-releasing back to rest on leave. The
 * one deliberate "signature" interaction on the page — reserved for the
 * hero's primary actions, not scattered across every button.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — children with `staggerItem` reveal in sequence on view. */
export function Stagger({
  children,
  className,
  amount = 0.15,
  delayChildren = 0,
  stagger = 0.1,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  delayChildren?: number;
  stagger?: number;
} & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

/** A single fade-up item. Drop inside <Stagger> or use standalone. */
export function FadeUp({
  children,
  className,
  asChild = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  /** When true, relies on a parent <Stagger> for the trigger (no own viewport). */
  asChild?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">) {
  if (asChild) {
    return (
      <motion.div className={cn(className, "motion-reveal")} variants={fadeVariants} {...rest}>
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={cn(className, "motion-reveal")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeVariants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Variants for a fade-up item used directly via `variants={fadeUpItem}`. */
export const fadeUpItem = fadeVariants;

/**
 * Masked "rise into view" reveal for headings — text slides up from behind a
 * clip edge. `mode="animate"` defers the trigger to a parent's animate state.
 */
export function Reveal({
  children,
  className,
  mode = "whileInView",
  delay = 0,
  duration = 1.05,
}: {
  children: ReactNode;
  className?: string;
  mode?: "animate" | "whileInView";
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const variants: Variants = {
    hidden: { y: "110%", filter: "blur(4px)" },
    visible: {
      y: "0%",
      filter: "blur(0px)",
      transition: { duration, ease: REVEAL_EASE, delay },
    },
  };

  if (mode === "animate") {
    return (
      <div className={cn("overflow-clip", className)}>
        <motion.div
          className="motion-reveal mb-[-0.25em] pb-[0.25em] will-change-transform"
          variants={variants}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("overflow-clip", className)}>
      <motion.div
        className="motion-reveal mb-[-0.25em] pb-[0.25em] will-change-transform"
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Decorative perpetual drift. Entrance fades/blurs in once, then the inner layer
 * floats forever so the two never fight.
 */
export function Float({
  children,
  className,
  delay = 0,
  amplitude = 10,
  duration = 6,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, -amplitude, 0] }}
        transition={{ duration, delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
