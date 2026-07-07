import { ArrowRight, Check, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Tone } from "@/components/graphs";
import { FadeUp, Magnetic, Stagger } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants, cn } from "@/components/ui";
import { BLUEPRINT_STANDARDS } from "@/lib/blueprints";
import { DEMO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ISO Blueprints",
  description:
    "AI-generated, clause-mapped ISO 9001, 14001 and 45001 documentation, built from your live Briesa data.",
  alternates: { canonical: "/blueprints" },
};

const TONE_ICON: Record<Tone, string> = {
  primary: "text-accent-text",
  success: "text-(--badge-green-text)",
  info: "text-(--badge-blue-text)",
  danger: "text-destructive-text",
};

const TONE_BORDER_BG: Record<Tone, string> = {
  primary: "border-accent-border bg-accent-bg",
  success: "border-(--badge-green-bg) bg-(--badge-green-bg)",
  info: "border-(--badge-blue-bg) bg-(--badge-blue-bg)",
  danger: "border-destructive-border bg-destructive-bg",
};

const TONE_GLOW: Record<Tone, string> = {
  primary: "hover:border-accent-text hover:shadow-[0_16px_40px_-18px_var(--accent-text)]",
  success:
    "hover:border-(--badge-green-text) hover:shadow-[0_16px_40px_-18px_var(--badge-green-text)]",
  info: "hover:border-(--badge-blue-text) hover:shadow-[0_16px_40px_-18px_var(--badge-blue-text)]",
  danger: "hover:border-destructive-text hover:shadow-[0_16px_40px_-18px_var(--destructive-text)]",
};

const TONE_CHECK: Record<Tone, string> = {
  primary: "text-accent-text",
  success: "text-(--badge-green-text)",
  info: "text-(--badge-blue-text)",
  danger: "text-destructive-text",
};

// Light-mode accent-text (bright yellow) is illegible on the pale accent-bg, so
// the primary clause tag uses ink in light and yellow only in dark — the same
// theme-adaptive fix used on the pricing chips and primary badge.
const TONE_TAG: Record<Tone, string> = {
  primary: "border-accent-border bg-accent-bg text-text dark:text-accent-text",
  success: "border-(--badge-green-bg) bg-(--badge-green-bg) text-(--badge-green-text)",
  info: "border-(--badge-blue-bg) bg-(--badge-blue-bg) text-(--badge-blue-text)",
  danger: "border-destructive-border bg-destructive-bg text-destructive-text",
};

export default function BlueprintsPage() {
  return (
    <main>
      <PageHero
        eyebrow="ISO Blueprints"
        title="ISO documentation, generated."
        lede="Turn your live compliance data into clause-mapped ISO management-system documentation — the paperwork SMEs otherwise pay consultants thousands of dollars to produce. A separate, once-off product, used alongside any plan."
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <SmartLink
              href={DEMO_URL}
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Get a demo
            </SmartLink>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link href="/pricing" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              See Blueprints pricing
            </Link>
          </Magnetic>
        </div>
      </PageHero>

      {/* Standards overview — clickable cards that jump to each standard's section. */}
      <section className="pb-4">
        <div className="web-container">
          <Stagger
            className="grid gap-px border border-border bg-border shadow-black/5 shadow-xl md:grid-cols-3 dark:shadow-black/20"
            stagger={0.09}
            amount={0.2}
          >
            {BLUEPRINT_STANDARDS.map((s) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.slug} asChild>
                  <a
                    href={`#${s.slug}`}
                    className={cn(
                      "group flex items-center gap-4 border border-transparent bg-bg p-6 transition-all duration-300 hover:-translate-y-1",
                      TONE_GLOW[s.tone],
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center border",
                        TONE_BORDER_BG[s.tone],
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-5 transition-transform duration-300 group-hover:scale-110",
                          TONE_ICON[s.tone],
                        )}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                        {s.code}
                      </span>
                      <p className="mt-1.5 text-[15px] text-text leading-tight tracking-tight">
                        {s.name}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 font-mono text-[0.6rem] text-text-secondary uppercase tracking-wider transition-colors group-hover:text-text">
                        View{" "}
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                </FadeUp>
              );
            })}
          </Stagger>
        </div>
      </section>

      {BLUEPRINT_STANDARDS.map((standard, i) => {
        const Icon = standard.icon;
        const flip = i % 2 === 1;
        return (
          <section
            key={standard.slug}
            id={standard.slug}
            className={cn(
              "scroll-mt-32 section-padding border-border border-t",
              flip && "bg-bg-secondary",
            )}
          >
            <div className="web-container">
              {/* Section header */}
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center border",
                    TONE_BORDER_BG[standard.tone],
                  )}
                >
                  <Icon className={cn("size-5", TONE_ICON[standard.tone])} />
                </div>
                <div>
                  <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                    {standard.code}
                  </p>
                  <h2 className="text-2xl tracking-tight md:text-3xl">{standard.name}</h2>
                </div>
              </div>
              <FadeUp asChild>
                <p className="mt-5 max-w-2xl text-text-secondary leading-relaxed">
                  {standard.lede}
                </p>
              </FadeUp>

              {/* Clause map + what's generated */}
              <div className="mt-10 grid items-start gap-px border border-border bg-border shadow-black/5 shadow-xl lg:grid-cols-5 dark:shadow-black/20">
                <FadeUp className={cn("flex bg-bg p-5 sm:p-6 lg:col-span-3", flip && "lg:order-2")}>
                  <div className="flex w-full flex-col overflow-hidden border border-border bg-bg">
                    <div className="flex items-center justify-between gap-2 border-border border-b bg-bg-secondary px-4 py-3">
                      <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-text-tertiary">
                        <Sparkles className={cn("size-3", TONE_ICON[standard.tone])} />
                        {standard.code.toLowerCase()} · clause map
                      </span>
                      <span className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                        Sample
                      </span>
                    </div>
                    <ul className="flex flex-col">
                      {standard.document.map((section) => (
                        <li
                          key={section.clause}
                          className="flex gap-3 border-border border-b p-4 last:border-b-0"
                        >
                          <span
                            className={cn(
                              "mt-0.5 shrink-0 border px-1.5 py-0.5 font-mono text-[0.6rem] tabular-nums",
                              TONE_TAG[standard.tone],
                            )}
                          >
                            {section.clause}
                          </span>
                          <div>
                            <p className="font-medium text-[13.5px] text-text tracking-tight">
                              {section.heading}
                            </p>
                            <p className="mt-0.5 text-[12.5px] text-text-tertiary leading-relaxed">
                              {section.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="border-border border-t px-4 py-3 font-mono text-[0.6rem] text-text-tertiary leading-relaxed">
                      Blueprints maps every requirement clause of {standard.code} to the evidence
                      already in your Briesa program — this is a sample.
                    </p>
                  </div>
                </FadeUp>

                <FadeUp
                  className={cn(
                    "flex flex-col gap-6 bg-bg p-6 lg:col-span-2",
                    flip && "lg:order-1",
                  )}
                >
                  <div>
                    <p className="flex items-center gap-1.5 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                      <Sparkles className={cn("size-3", TONE_ICON[standard.tone])} /> What's
                      generated
                    </p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {standard.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-[13px] text-text-secondary leading-relaxed"
                        >
                          <Check
                            className={cn("mt-0.5 size-3.5 shrink-0", TONE_CHECK[standard.tone])}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border-border border-t pt-5">
                    <SmartLink
                      href={DEMO_URL}
                      className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
                    >
                      Get a demo
                    </SmartLink>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-1.5 font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider transition-colors hover:text-text"
                    >
                      See pricing <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing band */}
      <section className="section-padding border-border border-t">
        <div className="web-container">
          <FadeUp>
            <div className="flex flex-col items-start justify-between gap-6 border border-border bg-bg-secondary p-8 md:flex-row md:items-center">
              <div>
                <p className="flex items-center gap-1.5 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                  <Sparkles className="size-3 text-accent-text" /> One, two or three standards
                </p>
                <h2 className="mt-3 text-2xl tracking-tight">
                  Buy Blueprints once, use it with any plan.
                </h2>
                <p className="mt-2 max-w-xl text-text-secondary">
                  Blueprints is a separate, once-off product — not a subscription add-on. Bundle the
                  standards you need and generate certification-ready documentation alongside your
                  live Briesa program.
                </p>
              </div>
              <Link
                href="/pricing"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "shrink-0")}
              >
                See Blueprints pricing
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
