"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getCardStyle, useCardStack } from "@/components/hooks/use-card-stack";
import { FadeUp, Reveal } from "@/components/motion";
import { cn } from "@/components/ui";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
  tenure: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    quote:
      "We replaced three spreadsheets and a shared inbox with one system. The first audit after switching took a morning, not a fortnight — every piece of evidence was already where it needed to be.",
    name: "Megan Doyle",
    role: "WHS Manager, Coastal Civil",
    tenure: "14 sites",
  },
  {
    id: 1,
    quote:
      "Our supervisors actually do the pre-starts now because it takes thirty seconds on their phone. That alone changed how seriously the crews take safety on site.",
    name: "Tom Alderton",
    role: "Operations Director, Alderton Group",
    tenure: "220 workers",
  },
  {
    id: 2,
    quote:
      "I can see compliance across every project from one screen. When the board asks how we're tracking against ISO, I send a report instead of starting a panic.",
    name: "Priya Naidu",
    role: "Risk & Compliance Lead, Meridian",
    tenure: "ISO 45001",
  },
  {
    id: 3,
    quote:
      "Onboarding contractors used to be a black hole of expired tickets. Briesa flags what's lapsing before they reach the gate — no more standing crews down.",
    name: "Jack Mercer",
    role: "Site Manager, Mercer Build",
    tenure: "6-month user",
  },
  {
    id: 4,
    quote:
      "It's the quietest tool that made the loudest difference. Incidents are down, the paperwork is done, and nobody on site feels like they're filling in forms for the sake of it.",
    name: "Sarah Whitlock",
    role: "Safety Advisor, Northline",
    tenure: "9 sites",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ card }: { card: Testimonial }) {
  return (
    <article className="flex h-full flex-col border border-border bg-bg shadow-black/5 shadow-xl dark:shadow-black/20">
      <div className="flex-1 px-8 pt-8 md:px-10 md:pt-10">
        <span className="select-none font-medium text-5xl text-border-strong leading-none md:text-6xl">
          &ldquo;
        </span>
        <p className="mt-1 text-balance text-lg leading-snug tracking-tight md:text-xl lg:text-2xl">
          {card.quote}
        </p>
      </div>
      <div className="flex items-center gap-3 px-8 pt-6 pb-8 md:px-10 md:pb-10">
        <span className="grid size-10 shrink-0 place-items-center border border-border bg-bg-secondary font-mono text-[0.65rem] text-text-secondary tracking-wider">
          {initials(card.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium text-sm text-text">{card.name}</p>
          <p className="truncate font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
            {card.role}
          </p>
        </div>
        <span className="ml-auto shrink-0 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
          {card.tenure}
        </span>
      </div>
    </article>
  );
}

function CardStack() {
  const { cards, setPaused, goTo, activeIndex, progress } = useCardStack(TESTIMONIALS);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{
    x: number;
    y: number;
    zone: "top" | "bottom";
    visible: boolean;
  }>({ x: 0, y: 0, zone: "bottom", visible: false });

  const goPrev = () => goTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => goTo((activeIndex + 1) % TESTIMONIALS.length);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const zone = e.clientY - rect.top < rect.height / 2 ? "top" : "bottom";
    setCursor({ x: e.clientX, y: e.clientY, zone, visible: true });
  }, []);

  const handleClick = () => {
    if (cursor.zone === "top") goPrev();
    else goNext();
  };

  return (
    <div className="flex items-center gap-4 md:gap-6">
      {/* biome-ignore lint/a11y/noStaticElementInteractions: carousel surface advances cards on click; dots provide an accessible control */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: the vertical dots below are the keyboard-accessible control */}
      <div
        ref={containerRef}
        className={cn("relative w-full max-w-xl", cursor.visible && "cursor-none")}
        onMouseEnter={() => setPaused(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setPaused(false);
          setCursor((prev) => ({ ...prev, visible: false }));
        }}
        onClick={handleClick}
      >
        {/* Invisible spacers — the tallest card sets the height. */}
        <div className="invisible grid">
          {TESTIMONIALS.map((card) => (
            <div key={card.id} className="col-start-1 row-start-1">
              <TestimonialCard card={card} />
            </div>
          ))}
        </div>

        {/* Animated stack. */}
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={cn(
              "absolute inset-x-0 top-0 bottom-0",
              index !== 0 && "pointer-events-none",
            )}
            style={{ transformOrigin: "top center" }}
            animate={getCardStyle(index)}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <TestimonialCard card={card} />
          </motion.div>
        ))}

        {/* Blur pulse — flashes on card change. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="pointer-events-none absolute inset-0 z-10 backdrop-blur-md"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {/* Floating cursor — portaled to body to escape the card transforms. */}
        {typeof window !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {cursor.visible && (
                <motion.div
                  className="pointer-events-none fixed z-50"
                  style={{ left: cursor.x - 20, top: cursor.y - 20 }}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                  transition={{
                    opacity: { duration: 0.15 },
                    filter: { duration: 0.15 },
                    scale: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                >
                  <div className="flex size-10 items-center justify-center bg-text text-bg shadow-lg">
                    {cursor.zone === "top" ? (
                      <ChevronUp className="size-5" />
                    ) : (
                      <ChevronDown className="size-5" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>

      {/* Vertical progress dots. */}
      <div className="flex flex-col items-center gap-3">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => goTo(i)}
            className="flex items-center justify-center"
          >
            {activeIndex === i ? (
              <span className="block size-3 overflow-hidden border border-text">
                <motion.span
                  className="block h-full w-full bg-text"
                  style={{ originY: 1, scaleY: progress / 100 }}
                />
              </span>
            ) : (
              <span className="block size-2 bg-border-strong transition-colors hover:bg-text" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="section-padding overflow-x-clip">
      <div className="web-container">
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-16">
          <div ref={ref} className="md:col-span-4">
            <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
              <span className="h-px w-6 bg-border-strong" />
              In their words
            </span>
            <Reveal className="mt-4">
              <h2 className="text-balance text-4xl tracking-tighter md:text-5xl lg:text-6xl">
                Trusted on site.
              </h2>
            </Reveal>
            <FadeUp className="mt-4">
              <p className="max-w-sm text-sm text-text-secondary leading-relaxed md:text-base">
                The people running Australian sites on why they made Briesa the system of record for
                safety and compliance.
              </p>
            </FadeUp>
          </div>

          <motion.div
            className="flex md:col-span-8 lg:justify-end"
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <CardStack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
