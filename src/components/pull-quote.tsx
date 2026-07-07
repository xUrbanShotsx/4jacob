"use client";

import { motion } from "motion/react";
import { EASE } from "@/components/motion";

/**
 * Editorial pull quote — an oversized opening quote mark scales in, then the
 * quote reveals word-by-word (blur + rise), and the attribution slides up last.
 * Sits on a soft accent wash framed by the design system's borders.
 */
export function PullQuote({
  quote,
  author,
  byline,
}: {
  quote: string;
  author: string;
  /** Attribution line under the author, e.g. "Co-founder, Briesa". */
  byline: string;
}) {
  const words = quote.split(" ");
  // Kick the attribution off just after the last word lands.
  const attributionDelay = words.length * 0.05 + 0.2;

  return (
    <section className="section-padding">
      <div className="web-container">
        <figure className="relative overflow-hidden border border-border bg-accent-bg p-8 md:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_15%_0%,var(--accent-bg)_0%,transparent_70%)] opacity-60"
          />
          <div className="relative">
            <motion.span
              aria-hidden
              className="select-none font-medium text-7xl text-accent-text leading-none md:text-8xl"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              &ldquo;
            </motion.span>

            <blockquote className="-mt-4 max-w-3xl text-balance text-2xl tracking-tight md:text-3xl lg:text-4xl">
              {words.map((word, i) => (
                <motion.span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static word-reveal, list never reorders
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </blockquote>

            <motion.figcaption
              className="mt-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: attributionDelay, ease: EASE }}
            >
              <p className="font-medium text-sm text-text">{author}</p>
              <p className="mt-0.5 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
                {byline}
              </p>
            </motion.figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
