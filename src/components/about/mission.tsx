"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FadeUp, fadeUpItem, Reveal, Stagger } from "@/components/motion";
import { NumberTicker } from "@/components/number-ticker";
import { buttonVariants } from "@/components/ui";

type Stat = { value: React.ReactNode; label: string };

const STATS: Stat[] = [
  { value: <NumberTicker value={9} />, label: "Connected modules" },
  { value: "100%", label: "Australian-owned" },
  { value: "AU", label: "Data residency" },
  { value: <NumberTicker value={1} />, label: "Platform, not ten tools" },
];

export function Mission() {
  return (
    <section className="section-padding">
      <div className="web-container">
        {/* Split header — heading left, intent right. */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
              <span className="h-px w-6 bg-border-strong" />
              Who we are
            </span>
            <Reveal className="mt-4">
              <h2 className="text-balance text-3xl tracking-tighter md:text-4xl lg:text-5xl">
                We sweat the compliance, so your crew can get on with the job.
              </h2>
            </Reveal>
          </div>
          <FadeUp className="md:self-end">
            <p className="text-text-secondary leading-relaxed">
              Compliance shouldn't live in a dozen disconnected spreadsheets, inboxes and binders.
              We're a small Australian team building the system we wished we'd had on site — one
              place for WHS, governance, risk and certification, owned and hosted here, that earns
              its keep instead of adding to the busywork.
            </p>
          </FadeUp>
        </div>

        {/* Stats band. */}
        <Stagger
          className="mt-12 grid grid-cols-2 gap-px border border-border bg-border shadow-black/5 shadow-xl md:grid-cols-4 dark:shadow-black/20"
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

        {/* Hiring banner. */}
        <FadeUp className="mt-px">
          <div className="flex flex-col gap-4 border border-border border-t-0 bg-bg-secondary p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-medium text-text">Want to help build it?</p>
              <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                We're growing carefully. If you want to work directly with the founders and ship
                fast, we'd love to hear from you.
              </p>
            </div>
            <Link href="#team" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Meet the team
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
