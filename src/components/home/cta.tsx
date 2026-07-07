"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants } from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

export function Cta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_60%_60%_at_50%_110%,var(--accent-bg)_0%,transparent_70%)] opacity-70"
      />
      <div className="web-container relative text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <Reveal mode="animate">
            <h2 className="mx-auto max-w-4xl text-balance text-4xl tracking-tighter md:text-6xl lg:text-7xl">
              Ready to see your whole program in one platform?
            </h2>
          </Reveal>
          <Reveal mode="animate" delay={0.1} className="mt-7">
            <p className="mx-auto max-w-xl text-balance text-text-secondary leading-relaxed">
              Book a demo and we'll show you how Briesa takes a business from the daily site
              pre-start to ISO certification — without the spreadsheet sprawl.
            </p>
          </Reveal>
          <Reveal mode="animate" delay={0.2} className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <SmartLink
                href={DEMO_URL}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Get a demo
              </SmartLink>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Talk to sales
              </Link>
            </div>
          </Reveal>
          <Reveal mode="animate" delay={0.3} className="mt-5">
            <p className="font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
              NSW construction first · Built in Australia · Replies within one business day
            </p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
