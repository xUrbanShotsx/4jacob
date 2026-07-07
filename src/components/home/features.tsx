"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, BarChart3, HardHat, ShieldCheck, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { Tone } from "@/components/graphs";
import { fadeUpItem, Stagger } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/components/ui";

type Feature = {
  name: string;
  icon: LucideIcon;
  body: string;
  href: string;
  tone: Tone;
};

const TONE_ICON: Record<Tone, string> = {
  primary: "text-accent-text",
  success: "text-(--badge-green-text)",
  info: "text-(--badge-blue-text)",
  danger: "text-destructive-text",
};

const TONE_GLOW: Record<Tone, string> = {
  primary: "hover:border-accent-text hover:shadow-[0_10px_32px_-14px_var(--accent-text)]",
  success:
    "hover:border-(--badge-green-text) hover:shadow-[0_10px_32px_-14px_var(--badge-green-text)]",
  info: "hover:border-(--badge-blue-text) hover:shadow-[0_10px_32px_-14px_var(--badge-blue-text)]",
  danger: "hover:border-destructive-text hover:shadow-[0_10px_32px_-14px_var(--destructive-text)]",
};

const TONE_DOT: Record<Tone, string> = {
  primary: "group-hover:bg-accent-text",
  success: "group-hover:bg-(--badge-green-text)",
  info: "group-hover:bg-(--badge-blue-text)",
  danger: "group-hover:bg-destructive-text",
};

const FEATURES: Feature[] = [
  {
    name: "Daily site safety",
    icon: HardHat,
    body: "Sign-ins, pre-starts, SWMS, permits, toolbox talks and incidents — the high-frequency surface workers touch on a phone.",
    href: "/docs",
    tone: "primary",
  },
  {
    name: "Risk & compliance",
    icon: ShieldCheck,
    body: "The three-register risk model, controls, audits, clause-mapped evidence and a policy library auditors can follow.",
    href: "/docs",
    tone: "danger",
  },
  {
    name: "People & training",
    icon: Users,
    body: "Workers, contractors and visitors, inductions and the full LMS — included on every tier, wired into site gates.",
    href: "/docs",
    tone: "info",
  },
  {
    name: "Insights & reporting",
    icon: BarChart3,
    body: "Leading and lagging indicators, compliance status and client-shareable dashboards built for Australian reporting.",
    href: "/docs",
    tone: "success",
  },
  {
    name: "Blueprints AI",
    icon: Sparkles,
    body: "Generate clause-mapped ISO 45001, 14001 and 9001 documentation, registers and certification roadmaps from live data.",
    href: "/docs",
    tone: "primary",
  },
];

export function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="web-container">
        <SectionHeading
          align="center"
          eyebrow="One platform, not five tools"
          title="Everything compliance touches, connected"
          lede="From the daily site to the management system to the auditor's evidence pack — nine modules, one source of truth."
        />

        <Stagger
          className="mt-14 grid gap-px border border-border bg-border shadow-black/5 shadow-xl sm:grid-cols-2 lg:grid-cols-5 dark:shadow-black/20"
          stagger={0.07}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.name}
                variants={fadeUpItem}
                className={cn(
                  "group relative flex flex-col gap-4 border border-transparent bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-bg-secondary",
                  TONE_GLOW[f.tone],
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                    <Icon
                      className={cn(
                        "size-3.5 transition-transform duration-300 group-hover:scale-110",
                        TONE_ICON[f.tone],
                      )}
                    />
                    {`[0${i + 1}]`}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 rounded-full bg-border-strong transition-colors",
                      TONE_DOT[f.tone],
                    )}
                  />
                </div>
                <h3 className="text-lg tracking-tight">{f.name}</h3>
                <p className="flex-1 text-sm text-text-tertiary leading-relaxed">{f.body}</p>
                <Link
                  href={f.href}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider transition-colors hover:text-text"
                >
                  Learn more
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
