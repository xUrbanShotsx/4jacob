"use client";

import { ArrowLeft, ArrowRight, Gauge, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { FaqList } from "@/components/faq-list";
import { FadeUp, fadeUpItem, Stagger } from "@/components/motion";
import { NumberTicker } from "@/components/number-ticker";
import { SectionHeading } from "@/components/section-heading";
import { SmartLink } from "@/components/smart-link";
import {
  buttonVariants,
  cn,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

type Tier = {
  name: string;
  price: string;
  desc: string;
  specs: [string, string][];
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Small",
    price: "$249",
    desc: "For small crews up to 15 workers on site.",
    specs: [
      ["Workers on site", "1 – 15"],
      ["Storage", "25 GB"],
      ["Docs / month", "100 – 300"],
      ["AI generations", "~150–300 calls"],
      ["Token cap", "500K / month"],
      ["Blocks", "5,000 / month"],
    ],
  },
  {
    name: "Medium",
    price: "$449",
    desc: "For growing teams with 15–50 workers across sites.",
    featured: true,
    specs: [
      ["Workers on site", "15 – 50"],
      ["Storage", "75 GB"],
      ["Docs / month", "300 – 800"],
      ["AI generations", "~600–1,200 calls"],
      ["Token cap", "2M / month"],
      ["Blocks", "20,000 / month"],
    ],
  },
  {
    name: "Large",
    price: "$649",
    desc: "For large organisations with 50–200+ workers.",
    specs: [
      ["Workers on site", "50 – 200+"],
      ["Storage", "200 GB"],
      ["Docs / month", "800 – 2,500"],
      ["AI generations", "~2,000–4,000 calls"],
      ["Token cap", "6M / month"],
      ["Blocks", "60,000 / month"],
    ],
  },
];

/* Blueprints — a separate, once-off product. ISO management-system documentation
   packs, sold in bundles of one, two or three standards. */
const BLUEPRINTS = [
  { standards: "1 standard", price: "$1,750", note: "One ISO management system" },
  { standards: "2 standards", price: "$3,250", note: "Save $250 vs buying singly" },
  { standards: "3 standards", price: "$4,500", note: "Save $750 vs buying singly" },
];

const FAQS = [
  {
    q: "Is pricing per organisation or per seat?",
    a: "Per organisation, never per seat. You pay one flat monthly price banded by workforce size — what scales your value — not by the number of people who log in.",
  },
  {
    q: "Are field workers and contractors charged separately?",
    a: "No. Field workers, contractors and visitors signing in are unlimited on every tier, including Small. You will never pay more as more people use the platform on site.",
  },
  {
    q: "What's included in each tier?",
    a: "All nine WHS modules and the full training (LMS) are included on every tier — there are no add-ons. Tiers differ only by capacity: workers on site, storage, documents per month and AI usage.",
  },
  {
    q: "How does Blueprints pricing work?",
    a: "Blueprints is a separate, once-off product — not a subscription add-on. It generates clause-mapped ISO management-system documentation and is bought as a one-time pack of one, two or three standards ($1,750 / $3,250 / $4,500). It works alongside any plan.",
  },
  {
    q: "How much do I save on annual billing?",
    a: "Annual billing gives you two months free — pay for ten months, get twelve. You can switch between monthly and annual at any time, and cancel whenever you like.",
  },
  {
    q: "What if we have more than 200 workers?",
    a: "Talk to us about Enterprise. You keep the same flat, all-inclusive model with capacity, security and onboarding tailored to your organisation.",
  },
] as const;

/* A tier's capacity panel — mirrors the dashboard mock's iconed micro-label +
   monochrome data-chip rows. */
function CapacityTable({
  specs,
  onExplainBlocks,
}: {
  specs: [string, string][];
  onExplainBlocks: () => void;
}) {
  return (
    <div className="border-border border-t bg-bg p-6">
      <p className="mb-3.5 flex items-center gap-1.5 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
        <Gauge className="size-2.5" /> Capacity
      </p>
      <ul className="flex flex-col gap-2.5">
        {specs.map(([label, value]) => (
          <li key={label} className="flex items-center justify-between gap-3 text-[12.5px]">
            {label === "Blocks" ? (
              <button
                type="button"
                onClick={onExplainBlocks}
                className="group inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-text"
              >
                {label}
                <HelpCircle className="size-3 text-text-tertiary transition-colors group-hover:text-text" />
              </button>
            ) : (
              <span className="text-text-secondary">{label}</span>
            )}
            <span className="inline-flex shrink-0 items-center border border-border bg-bg-secondary px-1.5 py-0.5 font-mono text-[0.6rem] text-text tabular-nums">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingContent() {
  const [blocksOpen, setBlocksOpen] = useState(false);

  return (
    <main>
      {/* Hero */}
      <section className="hero-padding relative overflow-hidden">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
        <div className="web-container relative">
          <Stagger stagger={0.08}>
            <FadeUp asChild>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider transition-colors hover:text-text"
              >
                <ArrowLeft className="size-3.5" /> Back to home
              </Link>
            </FadeUp>

            <FadeUp asChild>
              <span className="mt-9 block font-mono text-[0.65rem] uppercase tracking-wider">
                <span className="text-text-tertiary">[Pricing]</span>
                <span className="text-text-muted">{" // "}</span>
                <span className="text-accent-text">Simple, honest plans</span>
              </span>
            </FadeUp>

            <FadeUp asChild>
              <h1 className="mt-6 max-w-4xl text-balance font-medium text-5xl uppercase leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl">
                <span className="block">Flat pricing.</span>
                <span className="block">No per-user fees.</span>
              </h1>
            </FadeUp>

            <FadeUp asChild>
              <p className="mt-7 max-w-xl text-balance text-lg text-text-secondary leading-relaxed">
                One flat monthly price based on workforce size. All nine WHS modules and training
                are included — no add-ons, no surprises.
              </p>
            </FadeUp>
          </Stagger>
        </div>
      </section>

      {/* Tiers */}
      <section className="pb-8">
        <div className="web-container">
          <Stagger
            className="grid gap-px border border-border bg-border lg:grid-cols-3"
            stagger={0.08}
            amount={0.2}
          >
            {TIERS.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUpItem}
                className="relative flex flex-col bg-bg"
              >
                {t.featured && (
                  <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-0.5 bg-text" />
                )}
                <div className="flex flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                      {t.name}
                    </span>
                    {t.featured && (
                      <span className="border border-border bg-bg-secondary px-1.5 py-0.5 font-mono text-[0.55rem] text-text uppercase tracking-wider">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-4xl tracking-tighter md:text-5xl">{t.price}</span>
                    <span className="font-mono text-[0.65rem] text-text-tertiary">/ month</span>
                  </p>
                  <p className="mt-3 text-[13px] text-text-tertiary leading-relaxed">{t.desc}</p>
                </div>
                <CapacityTable specs={t.specs} onExplainBlocks={() => setBlocksOpen(true)} />
              </motion.div>
            ))}
          </Stagger>

          {/* Primary actions */}
          <FadeUp className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <SmartLink
              href={DEMO_URL}
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Get started
            </SmartLink>
            <SmartLink
              href={DEMO_URL}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Try free demo
            </SmartLink>
          </FadeUp>

          {/* Utility bar */}
          <FadeUp className="mt-8 flex flex-col gap-3 border-border border-t pt-6 font-mono text-[0.7rem] text-text-tertiary uppercase tracking-wider sm:flex-row sm:items-center sm:justify-between">
            <p>
              Need 200+ workers?{" "}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-text transition-colors hover:text-accent-text"
              >
                Contact us for Enterprise <ArrowRight className="size-3" />
              </Link>
            </p>
            <p>Annual billing — 2 months free · Cancel anytime</p>
          </FadeUp>
        </div>
      </section>

      {/* Blueprints — separate once-off product */}
      <section className="section-padding border-border border-t">
        <div className="web-container">
          <SectionHeading
            eyebrow="Blueprints · separate product"
            title="ISO documentation, bought once"
            lede="Blueprints isn't an add-on or a subscription. It's a separate, once-off product that turns your live program into clause-mapped ISO management-system documentation — buy one, two or three standards, and use it alongside any plan."
          />
          <Stagger
            className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3"
            stagger={0.1}
          >
            {BLUEPRINTS.map((b, i) => (
              <motion.div
                key={b.standards}
                variants={fadeUpItem}
                className="flex flex-col gap-3 bg-bg p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                    {`Pack 0${i + 1}`}
                  </span>
                  <span className="font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
                    Once-off
                  </span>
                </div>
                <p className="text-4xl tracking-tighter">{b.price}</p>
                <p className="font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider">
                  {b.standards}
                </p>
                <p className="text-[13px] text-text-tertiary leading-relaxed">{b.note}</p>
              </motion.div>
            ))}
          </Stagger>
          <FadeUp className="mt-6">
            <SmartLink
              href={DEMO_URL}
              className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider transition-colors hover:text-text"
            >
              See Blueprints in a demo <ArrowRight className="size-3" />
            </SmartLink>
          </FadeUp>
        </div>
      </section>

      {/* Consultant program */}
      <section className="section-padding border-border border-t bg-bg-secondary">
        <div className="web-container grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Consultant program"
            title="Every consultant is a channel"
            lede="Consultants manage client organisations through the same workflows as owners, on the same per-organisation schedule — with a volume discount that grows with the portfolio, and a cross-organisation dashboard free from the first client."
          />
          <div className="flex flex-col gap-4">
            <Stagger
              className="grid grid-cols-2 gap-px border border-border bg-border"
              stagger={0.12}
            >
              {[
                { v: 15, label: "off · 3–9 organisations" },
                { v: 25, label: "off · 10+ organisations" },
              ].map((d) => (
                <motion.div key={d.label} variants={fadeUpItem} className="bg-bg p-6 text-center">
                  <p className="text-5xl text-text tracking-tighter">
                    <NumberTicker value={d.v} suffix="%" />
                  </p>
                  <p className="mt-3 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
                    {d.label}
                  </p>
                </motion.div>
              ))}
            </Stagger>
            <FadeUp>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}
              >
                Talk to sales
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding border-border border-t">
        <div className="web-container">
          <SectionHeading title="Pricing FAQs" />
          <div className="mt-10">
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>

      {/* "What are blocks?" explainer */}
      <Dialog open={blocksOpen} onOpenChange={setBlocksOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-[0.7rem] uppercase tracking-wider">
              What are blocks?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              Blocks are how Briesa meters AI usage — toolbox talks, SWMS drafts, permit controls
              and everything else in the AI toolbox.
            </p>
            <div className="flex items-center justify-between border border-border bg-bg px-4 py-3 font-mono text-text">
              <span>10 blocks</span>
              <span className="text-text-tertiary">=</span>
              <span>1,000 tokens</span>
            </div>
            <p>
              Each generation spends blocks based on its length. Your plan's token cap is simply
              that same allowance shown in tokens, so you can think in whichever unit you prefer.
            </p>
          </div>
          <DialogFooter>
            <DialogClose className={buttonVariants({ variant: "secondary" })}>Got it</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
