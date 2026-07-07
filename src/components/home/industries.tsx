"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, Check, Factory, HardHat } from "lucide-react";
import { motion } from "motion/react";
import type { Tone } from "@/components/graphs";
import { fadeUpItem, Stagger } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { SmartLink } from "@/components/smart-link";
import { Badge, cn } from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

type Industry = {
  name: string;
  icon: LucideIcon;
  body: string;
  included: string[];
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
  primary: "hover:border-accent-text hover:shadow-[0_12px_36px_-16px_var(--accent-text)]",
  success:
    "hover:border-(--badge-green-text) hover:shadow-[0_12px_36px_-16px_var(--badge-green-text)]",
  info: "hover:border-(--badge-blue-text) hover:shadow-[0_12px_36px_-16px_var(--badge-blue-text)]",
  danger: "hover:border-destructive-text hover:shadow-[0_12px_36px_-16px_var(--destructive-text)]",
};

const TONE_BADGE: Record<Tone, "primary" | "green" | "blue" | "coral"> = {
  primary: "primary",
  success: "green",
  info: "blue",
  danger: "coral",
};

const INDUSTRIES: Industry[] = [
  {
    name: "Construction",
    icon: HardHat,
    body: "From SWMS and HRCW permits to plant pre-ops and work-zone management — built to the requirements of SafeWork NSW and state equivalents.",
    included: [
      "Incidents · SWMS · Permits",
      "White Card register",
      "Plant & equipment",
      "High-risk work licensing",
      "Work-zone controls",
    ],
    href: DEMO_URL,
    tone: "primary",
  },
  {
    name: "Industrial",
    icon: Factory,
    body: "Permits to Work, LOTO procedures, JSA/JSEA and chemical process risk — built for manufacturing and industrial facilities.",
    included: [
      "Permits to Work · LOTO",
      "JSA / JSEA management",
      "Chemical & process risk",
      "Health monitoring",
      "Operational readiness",
    ],
    href: DEMO_URL,
    tone: "danger",
  },
  {
    name: "Facilities",
    icon: Building2,
    body: "Building warden registers, isolation and shutdown procedures and statutory compliance obligations — built for facility managers.",
    included: [
      "Warden register",
      "Isolation & shutdown",
      "Essential safety measures",
      "Statutory obligations",
      "Visitor & access control",
    ],
    href: DEMO_URL,
    tone: "info",
  },
];

export function Industries() {
  return (
    <section className="section-padding border-border border-t bg-bg-secondary">
      <div className="web-container">
        <SectionHeading
          align="center"
          eyebrow="Industry packs at launch"
          title="Configured for how your sites actually run"
          lede="Three industry packs ship the registers, permits and controls each sector is audited against — no generic template to bend into shape."
        />

        <Stagger
          className="mt-14 grid gap-px border border-border bg-border shadow-black/5 shadow-xl md:grid-cols-3 dark:shadow-black/20"
          stagger={0.1}
        >
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                variants={fadeUpItem}
                className={cn(
                  "group flex flex-col gap-5 border border-transparent bg-bg p-7 transition-all duration-300 hover:-translate-y-1",
                  TONE_GLOW[ind.tone],
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                    <Icon
                      className={cn(
                        "size-3.5 transition-transform duration-300 group-hover:scale-110",
                        TONE_ICON[ind.tone],
                      )}
                    />
                    {`[0${i + 1}]`}
                  </span>
                  <Badge variant={TONE_BADGE[ind.tone]} className="font-mono">
                    Open
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl tracking-tight">{ind.name}</h3>
                  <p className="mt-2.5 text-sm text-text-tertiary leading-relaxed">{ind.body}</p>
                </div>

                <div className="border-border border-t pt-5">
                  <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                    Included
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {ind.included.map((item, itemIndex) => (
                      <li
                        key={item}
                        style={{ transitionDelay: `${itemIndex * 30}ms` }}
                        className="flex items-center gap-2 text-[13px] text-text-secondary transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <Check className={cn("size-3.5 shrink-0", TONE_ICON[ind.tone])} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <SmartLink
                  href={ind.href}
                  className="mt-auto inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider transition-colors hover:text-text"
                >
                  Explore {ind.name}
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </SmartLink>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
