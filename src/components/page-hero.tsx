import type { ReactNode } from "react";
import { FadeUp, Reveal, Stagger } from "@/components/motion";

/**
 * Standard inner-page header: grid backdrop, eyebrow, masked-reveal title, lede.
 * A client island (motion) usable directly inside server page components.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  align = "center",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <section className="hero-padding relative overflow-hidden">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_55%_60%_at_50%_-10%,var(--accent-bg)_0%,transparent_70%)] opacity-50"
      />
      <div className="web-container relative">
        <Stagger
          className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
          stagger={0.09}
        >
          {eyebrow && (
            <FadeUp asChild>
              <span
                className={`inline-flex items-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider ${
                  centered ? "justify-center" : ""
                }`}
              >
                <span className="h-px w-6 bg-border-strong" />
                {eyebrow}
              </span>
            </FadeUp>
          )}
          <Reveal mode="animate" className="mt-4">
            <h1 className="text-balance text-5xl tracking-tighter md:text-6xl lg:text-7xl">
              {title}
            </h1>
          </Reveal>
          {lede && (
            <FadeUp asChild>
              <p
                className={`mt-6 text-balance text-lg text-text-secondary leading-relaxed ${
                  centered ? "mx-auto max-w-2xl" : "max-w-2xl"
                }`}
              >
                {lede}
              </p>
            </FadeUp>
          )}
          {children && <FadeUp asChild>{children}</FadeUp>}
        </Stagger>
      </div>
    </section>
  );
}
