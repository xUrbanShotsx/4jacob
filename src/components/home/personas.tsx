"use client";

import { motion } from "motion/react";
import { fadeUpItem, Stagger } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

const PERSONAS = [
  {
    quote:
      "I run my own organisation's safety. I need the daily site stuff and audit readiness in one place — without enterprise complexity or a per-seat bill for every worker.",
    role: "Business owner · Safety manager",
    context: "User + buyer",
    initial: "O",
  },
  {
    quote:
      "I manage many client organisations from one login, with identical workflows and a portfolio dashboard showing every client's compliance score in a single view.",
    role: "WHS consultant",
    context: "User + channel",
    initial: "C",
  },
  {
    quote:
      "I sign in, complete the pre-start, acknowledge the SWMS and report incidents — on my phone, on site, often with no reception. And I'm never counted as a paid seat.",
    role: "Field worker · Contractor",
    context: "Unlimited on every tier",
    initial: "F",
  },
];

export function Personas() {
  return (
    <section className="section-padding border-border border-t bg-bg-secondary">
      <div className="web-container">
        <SectionHeading
          align="center"
          eyebrow="Built for everyone the work touches"
          title="One system, three very different users"
          lede="Owners, the consultants who serve them, and the field workers on site — each gets a surface built for how they actually work."
        />

        <Stagger
          className="mt-14 grid gap-px border border-border bg-border shadow-black/5 shadow-xl md:grid-cols-3 dark:shadow-black/20"
          stagger={0.1}
        >
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.role}
              variants={fadeUpItem}
              className="flex flex-col gap-6 bg-bg p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider tabular-nums">
                  {`[0${i + 1}]`}
                </span>
                <span aria-hidden className="size-1.5 rounded-full bg-border-strong" />
              </div>
              <p className="flex-1 text-balance text-lg text-text leading-relaxed">
                <span aria-hidden className="mr-1 font-medium text-text-tertiary">
                  “
                </span>
                {p.quote}
              </p>
              <div className="flex items-center gap-3 border-border border-t pt-5">
                <div className="flex size-9 items-center justify-center border border-border bg-bg-secondary font-medium text-sm text-text-secondary">
                  {p.initial}
                </div>
                <div>
                  <p className="font-medium text-sm text-text">{p.role}</p>
                  <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                    {p.context}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
