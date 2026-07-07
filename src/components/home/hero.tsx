"use client";

import { CheckCircle2, Lock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { DashboardPreview } from "@/components/home/dashboard-preview";
import { EASE, FadeUp, Magnetic, Stagger } from "@/components/motion";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants } from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero-padding relative overflow-hidden">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_60%_55%_at_50%_-10%,var(--accent-bg)_0%,transparent_70%)] opacity-50"
      />

      <Stagger
        className="web-container relative z-10 flex flex-col items-center text-center"
        stagger={0.12}
        delayChildren={0.05}
      >
        <FadeUp asChild>
          <span className="inline-flex items-center gap-2 border border-border bg-bg-secondary px-3 py-1 font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider">
            <span className="size-1.5 rounded-full bg-text-tertiary" />
            WHS · GRC · ISO certification
          </span>
        </FadeUp>

        <motion.h1
          className="motion-reveal mt-7 max-w-4xl text-balance text-5xl leading-[0.98] tracking-tighter md:text-7xl lg:text-8xl"
          variants={{
            hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: EASE },
            },
          }}
        >
          <span className="block text-text">Compliance,</span>
          <span className="block text-accent-text">unified.</span>
        </motion.h1>

        <FadeUp asChild>
          <p className="mt-7 max-w-2xl text-balance text-lg text-text-secondary leading-relaxed">
            One platform for Australian business to run safety, risk, compliance and ISO
            certification — from the daily site pre-start to the auditor's evidence pack. No
            spreadsheet sprawl, no per-seat penalty.
          </p>
        </FadeUp>

        <FadeUp asChild>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <SmartLink
                href={DEMO_URL}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Get a demo
              </SmartLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/pricing"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                See pricing
              </Link>
            </Magnetic>
          </div>
        </FadeUp>

        <FadeUp asChild>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-mono text-[0.625rem] text-text-tertiary uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3" /> Unlimited field workers
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="flex items-center gap-1.5">
              <Lock className="size-3" /> Data hosted in Australia
            </span>
          </div>
        </FadeUp>
      </Stagger>

      <div className="web-container relative z-10">
        <DashboardPreview />
      </div>
    </section>
  );
}
