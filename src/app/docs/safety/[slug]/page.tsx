import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Tone } from "@/components/graphs";
import { FadeUp, Stagger } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants, cn } from "@/components/ui";
import { getSafetyModule, SAFETY_MODULES } from "@/lib/safety-modules";
import { DEMO_URL } from "@/lib/site";

type Params = { slug: string };

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

/** Pre-render one brief page per Safety module; reject any other slug. */
export function generateStaticParams(): Params[] {
  return SAFETY_MODULES.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const module_ = getSafetyModule(slug);
  if (!module_) return {};
  return {
    title: `${module_.name} — Safety`,
    description: module_.lede,
    alternates: { canonical: `/docs/safety/${module_.slug}` },
  };
}

export default async function SafetyModulePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const module_ = getSafetyModule(slug);
  if (!module_) notFound();

  const Icon = module_.icon;

  return (
    <main>
      <PageHero align="left" eyebrow="Safety module" title={module_.name} lede={module_.lede}>
        <Link
          href="/docs#safety"
          className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider transition-colors hover:text-text"
        >
          <ArrowLeft className="size-3.5" /> Back to Safety
        </Link>
      </PageHero>

      <section className="pb-16">
        <div className="web-container grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div
              className={cn(
                "flex size-11 items-center justify-center border",
                TONE_BORDER_BG[module_.tone],
              )}
            >
              <Icon className={cn("size-5", TONE_ICON[module_.tone])} />
            </div>
            <h2 className="mt-5 text-2xl tracking-tight">What it does</h2>
            <Stagger className="mt-6 flex flex-col gap-4" stagger={0.06}>
              {module_.points.map((point) => (
                <FadeUp key={point} asChild>
                  <div className="flex gap-3 border-border border-t pt-4 text-[15px] text-text-secondary leading-relaxed">
                    <span
                      className={cn(
                        "mt-0.5 size-1.5 shrink-0 rounded-full",
                        TONE_DOT[module_.tone],
                      )}
                    />
                    {point}
                  </div>
                </FadeUp>
              ))}
            </Stagger>
          </div>

          <FadeUp className="lg:col-span-2">
            <div className="flex flex-col gap-4 border border-border bg-bg-secondary p-6">
              <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                Part of Safety
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {module_.name} is one of the modules included in every Briesa plan — no add-ons, no
                per-seat fees. See it alongside the rest of the platform in a live demo.
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
    </main>
  );
}
