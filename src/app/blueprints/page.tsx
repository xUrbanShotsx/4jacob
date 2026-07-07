import { ArrowRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Tone } from "@/components/graphs";
import { FadeUp, Stagger } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants, cn } from "@/components/ui";
import { BLUEPRINT_STANDARDS } from "@/lib/blueprints";
import { DEMO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ISO Blueprints",
  description:
    "AI-generated, clause-mapped ISO 9001, 14001 and 27001 documentation, built from your live Briesa data.",
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

const TONE_DOT: Record<Tone, string> = {
  primary: "bg-accent-text",
  success: "bg-(--badge-green-text)",
  info: "bg-(--badge-blue-text)",
  danger: "bg-destructive-text",
};

export default function BlueprintsPage() {
  return (
    <main>
      <PageHero
        eyebrow="ISO Blueprints"
        title="AI-generated ISO documentation"
        lede="Turn your live compliance data into clause-mapped ISO management-system documentation — the paperwork SMEs otherwise pay consultants thousands of dollars to produce. A separate, once-off product, used alongside any plan."
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SmartLink href={DEMO_URL} className={buttonVariants({ variant: "primary", size: "lg" })}>
            Get a demo
          </SmartLink>
          <Link href="/pricing" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            See Blueprints pricing
          </Link>
        </div>
      </PageHero>

      {BLUEPRINT_STANDARDS.map((standard, i) => {
        const Icon = standard.icon;
        return (
          <section
            key={standard.slug}
            id={standard.slug}
            className={cn(
              "scroll-mt-32 section-padding",
              i > 0 && "border-border border-t",
              i % 2 === 1 && "bg-bg-secondary",
            )}
          >
            <div className="web-container grid gap-10 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center border",
                      TONE_BORDER_BG[standard.tone],
                    )}
                  >
                    <Icon className={cn("size-5", TONE_ICON[standard.tone])} />
                  </div>
                  <div>
                    <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                      {standard.code}
                    </p>
                    <h2 className="text-2xl tracking-tight">{standard.name}</h2>
                  </div>
                </div>
                <p className="mt-5 max-w-xl text-text-secondary leading-relaxed">{standard.lede}</p>

                <Stagger className="mt-6 flex flex-col gap-4" stagger={0.06}>
                  {standard.points.map((point) => (
                    <FadeUp key={point} asChild>
                      <div className="flex gap-3 border-border border-t pt-4 text-[15px] text-text-secondary leading-relaxed">
                        <span
                          className={cn(
                            "mt-0.5 size-1.5 shrink-0 rounded-full",
                            TONE_DOT[standard.tone],
                          )}
                        />
                        {point}
                      </div>
                    </FadeUp>
                  ))}
                </Stagger>
              </div>

              <FadeUp className="lg:col-span-2">
                <div className="flex flex-col gap-4 border border-border bg-bg p-6">
                  <p className="flex items-center gap-1.5 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                    <Sparkles className="size-3 text-accent-text" /> Included in Blueprints
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {standard.code} is one of the standards available in a Blueprints pack — buy
                    one, two or three standards as a single once-off purchase, used alongside any
                    Briesa plan.
                  </p>
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
          </section>
        );
      })}
    </main>
  );
}
