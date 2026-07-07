"use client";

import { motion } from "motion/react";
import { fadeUpItem, Stagger } from "@/components/motion";
import { NumberTicker } from "@/components/number-ticker";

type Stat = { value: React.ReactNode; label: string };

const STATS: Stat[] = [
  { value: <NumberTicker value={9} />, label: "Connected modules" },
  { value: <NumberTicker value={3} />, label: "Industry packs at launch" },
  { value: "∞", label: "Field workers, every tier" },
  { value: "ISO 45001", label: "14001 & 9001 ready" },
];

export function Stats() {
  return (
    <section className="border-border border-y bg-bg-secondary py-16">
      <div className="web-container">
        <Stagger
          className="grid grid-cols-2 gap-px border border-border bg-border shadow-black/5 shadow-xl md:grid-cols-4 dark:shadow-black/20"
          stagger={0.1}
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUpItem}
              className="bg-bg px-4 py-10 text-center md:px-6"
            >
              <div className="text-4xl text-text tracking-tighter md:text-5xl">{s.value}</div>
              <div className="mt-3 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
