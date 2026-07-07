"use client";

import { Check } from "lucide-react";
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef, useState } from "react";
import { BarChart, Heatmap, ProgressRows } from "@/components/graphs";
import { NumberTicker } from "@/components/number-ticker";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/components/ui";

/** A framed product panel — window chrome + a representative mini visual. */
function Panel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="aspect-[3/5] w-full overflow-hidden border border-border bg-bg shadow-2xl shadow-black/10 dark:shadow-black/30">
      <div className="flex items-center gap-1.5 border-border border-b px-3 py-2.5">
        <span className="size-1.5 bg-border-strong" />
        <span className="size-1.5 bg-border-strong" />
        <span className="size-1.5 bg-border-strong" />
        <span className="ml-2 truncate font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

const PRESTART = ["Site induction logged", "Plant pre-start signed", "SWMS reviewed"];
// Four weeks of daily site activity (0–1 intensity), 7 columns per week.
const ACTIVITY = [
  0.2, 0.5, 0.4, 0.8, 0.6, 0.1, 0, 0.3, 0.7, 0.9, 0.5, 0.8, 0.2, 0, 0.6, 0.8, 1, 0.7, 0.9, 0.3, 0.1,
  0.4, 0.9, 0.7, 1, 0.8, 0.5, 0.2,
];
const READINESS = [
  { label: "ISO 45001", value: 96, tone: "primary" as const },
  { label: "ISO 14001", value: 88, tone: "success" as const },
  { label: "ISO 9001", value: 92, tone: "info" as const },
];
const INCIDENTS = [
  { label: "Q1", value: 42 },
  { label: "Q2", value: 31 },
  { label: "Q3", value: 22 },
  { label: "Q4", value: 14, tone: "success" as const },
];

const ITEMS: { label: string; caption: string; panel: ReactNode }[] = [
  {
    label: "Capture",
    caption: "Pre-starts, inductions and toolbox talks signed off from any site, on any device.",
    panel: (
      <Panel label="site / pre-start">
        <p className="font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
          This morning
        </p>
        <div className="mt-3 space-y-2.5">
          {PRESTART.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <span className="grid size-4 place-items-center border border-border bg-bg-secondary">
                <Check className="size-2.5 text-text" />
              </span>
              <span className="text-text-secondary text-xs">{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
          Site activity · 4 weeks
        </p>
        <Heatmap data={ACTIVITY} className="mt-2.5" />
      </Panel>
    ),
  },
  {
    label: "Comply",
    caption: "Evidence rolls up into a single audit-ready score across every framework.",
    panel: (
      <Panel label="dashboard / readiness">
        <p className="font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
          Audit ready
        </p>
        <p className="mt-1 font-medium text-5xl text-text tracking-tighter">
          <NumberTicker value={94} suffix="%" />
        </p>
        <div className="mt-6">
          <ProgressRows rows={READINESS} />
        </div>
      </Panel>
    ),
  },
  {
    label: "Insight",
    caption: "Trends and KPIs surface the risks worth acting on — before they become incidents.",
    panel: (
      <Panel label="insights / trends">
        <p className="font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
          Incidents · by quarter
        </p>
        <BarChart data={INCIDENTS} height={120} className="mt-3" />
        <div className="mt-5 grid grid-cols-2 gap-px border border-border bg-border">
          {[
            ["-67%", "Incident rate"],
            ["12", "Open actions"],
          ].map(([n, l]) => (
            <div key={l} className="bg-bg px-2 py-3 text-center">
              <p className="font-medium text-base text-text">{n}</p>
              <p className="mt-0.5 font-mono text-[0.5rem] text-text-tertiary uppercase tracking-wider">
                {l}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    ),
  },
];

const CASCADE = [
  { rotate: -6, y: 20 },
  { rotate: 0, y: 0 },
  { rotate: 6, y: 20 },
] as const;

export function Showcase() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrollDone, setScrollDone] = useState(false);
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 90%", "start 45%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollDone(reduced ? true : v >= 0.98);
  });

  // Fast start, smooth deceleration. Snap to final when reduced-motion.
  const steps = reduced ? [1, 1, 1, 1, 1] : [0, 0.3, 0.7, 0.85, 1];
  const lerp = (to: number) => [0, to * 0.4, to * 0.8, to * 0.95, to];

  const x0 = useTransform(scrollYProgress, steps, ["100%", "40%", "10%", "2%", "0%"]);
  const x2 = useTransform(scrollYProgress, steps, ["-100%", "-40%", "-10%", "-2%", "0%"]);
  const y0 = useTransform(scrollYProgress, steps, lerp(CASCADE[0].y));
  const y2 = useTransform(scrollYProgress, steps, lerp(CASCADE[2].y));
  const r0 = useTransform(scrollYProgress, steps, lerp(CASCADE[0].rotate));
  const r2 = useTransform(scrollYProgress, steps, lerp(CASCADE[2].rotate));

  const xByIndex: (MotionValue<string> | number)[] = [x0, 0, x2];
  const yByIndex: (MotionValue<number> | number)[] = [y0, 0, y2];
  const rByIndex: (MotionValue<number> | number)[] = [r0, 0, r2];

  return (
    <section className="section-padding overflow-x-clip">
      <div className="web-container">
        <SectionHeading
          eyebrow="See it in action"
          title="From the daily pre-start to the audit, in one flow."
          lede="Evidence is captured once on site, rolls up into an audit-ready score, and surfaces as the trends worth acting on."
          align="center"
        />

        {/* Mobile — independent fade-in cards. */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:hidden">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto w-full max-w-60">{item.panel}</div>
              <ShowcaseCaption item={item} index={i} active />
            </motion.div>
          ))}
        </div>

        {/* Desktop — shared scroll-driven cascade. */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: decorative hover-reset on the cascade grid */}
        <div
          ref={gridRef}
          className="mt-20 hidden md:grid md:grid-cols-3 md:gap-0"
          onMouseLeave={() => setHovered(null)}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              className={cn("cursor-pointer", i === 1 && "md:-mx-6")}
              onMouseEnter={() => setHovered(i)}
              style={{
                x: xByIndex[i],
                y: yByIndex[i],
                rotate: rByIndex[i],
                zIndex: hovered === i ? 10 : i === 1 ? 2 : 1,
              }}
            >
              <motion.div
                animate={{
                  y: scrollDone && hovered === i ? -12 : 0,
                  rotate: scrollDone && hovered === i ? -CASCADE[i].rotate : 0,
                  scale: scrollDone ? (hovered === i ? 1.05 : hovered !== null ? 0.97 : 1) : 1,
                  opacity: scrollDone ? (hovered === null || hovered === i ? 1 : 0.4) : 1,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              >
                <div className="mx-auto w-full max-w-60">{item.panel}</div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: scrollDone ? (hovered === null || hovered === i ? 1 : 0.2) : 0,
                    y: scrollDone ? 0 : 8,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ShowcaseCaption item={item} index={i} active />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCaption({
  item,
  index,
  active,
}: {
  item: { label: string; caption: string };
  index: number;
  active?: boolean;
}) {
  return (
    <div className={cn("mt-6 text-center", !active && "opacity-60")}>
      <span className="font-mono text-[0.6rem] text-text-tertiary tracking-wider">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-1 text-lg tracking-tight">{item.label}</h3>
      <p className="mx-auto mt-1 max-w-48 text-text-secondary text-xs leading-relaxed">
        {item.caption}
      </p>
    </div>
  );
}
