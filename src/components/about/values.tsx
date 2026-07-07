"use client";

import { motion } from "motion/react";
import { fadeUpItem, Stagger } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

const VALUES = [
  {
    title: "Safety is the point",
    body: "Every feature traces back to someone going home safe. If it doesn't make a site safer or an audit cleaner, it doesn't ship.",
  },
  {
    title: "Australian-owned & hosted",
    body: "Built for Australian WHS law, owned by an Australian team, with your data kept onshore. No offshoring your compliance record.",
  },
  {
    title: "One platform, not ten tools",
    body: "WHS, governance, risk and certification share one source of truth — so evidence flows in once and shows up everywhere it's needed.",
  },
  {
    title: "Built with operators",
    body: "We talk to the people running sites every week, spot the friction, and fix it fast. Opinionated, not bloated.",
  },
];

export function Values() {
  return (
    <section className="section-padding border-border border-t bg-bg-secondary">
      <div className="web-container">
        <SectionHeading
          eyebrow="What we believe"
          title="Four things we won't compromise on."
          align="center"
        />
        <Stagger
          className="mt-14 grid gap-px border border-border bg-border shadow-black/5 shadow-xl sm:grid-cols-2 dark:shadow-black/20"
          stagger={0.08}
        >
          {VALUES.map((value, i) => (
            <motion.div key={value.title} variants={fadeUpItem} className="bg-bg p-8">
              <span className="font-mono text-[0.65rem] text-text-tertiary tracking-wider">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl tracking-tight">{value.title}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{value.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
