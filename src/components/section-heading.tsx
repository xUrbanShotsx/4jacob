import type { ReactNode } from "react";
import { FadeUp, Reveal, Stagger } from "@/components/motion";

/** Eyebrow + masked-reveal title + optional lede, shared across marketing sections. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Stagger
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className ?? ""}`}
      stagger={0.08}
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
        <h2 className="text-balance text-4xl tracking-tighter md:text-5xl lg:text-[3.25rem]">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <FadeUp asChild>
          <p
            className={`mt-5 text-balance text-lg text-text-secondary leading-relaxed ${
              centered ? "mx-auto max-w-xl" : "max-w-2xl"
            }`}
          >
            {lede}
          </p>
        </FadeUp>
      )}
    </Stagger>
  );
}
