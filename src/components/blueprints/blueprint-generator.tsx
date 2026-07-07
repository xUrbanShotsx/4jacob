"use client";

import { CornerDownLeft, FileText, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Tone } from "@/components/graphs";
import { cn, Kbd } from "@/components/ui";
import type { ClauseDoc } from "@/lib/blueprints";

const TONE_TEXT: Record<Tone, string> = {
  primary: "text-accent-text",
  success: "text-(--badge-green-text)",
  info: "text-(--badge-blue-text)",
  danger: "text-destructive-text",
};

const TONE_TAG: Record<Tone, string> = {
  // Light-mode accent-text (bright yellow) is illegible on the pale accent-bg,
  // so the primary tag uses ink text in light and the yellow only in dark —
  // the same theme-adaptive fix used on the pricing chips and primary badge.
  primary: "border-accent-border bg-accent-bg text-text dark:text-accent-text",
  success: "border-(--badge-green-bg) bg-(--badge-green-bg) text-(--badge-green-text)",
  info: "border-(--badge-blue-bg) bg-(--badge-blue-bg) text-(--badge-blue-text)",
  danger: "border-destructive-border bg-destructive-bg text-destructive-text",
};

const TONE_HOVER_BORDER: Record<Tone, string> = {
  primary: "hover:border-accent-text",
  success: "hover:border-(--badge-green-text)",
  info: "hover:border-(--badge-blue-text)",
  danger: "hover:border-destructive-text",
};

/**
 * A framed, clickable mock that "generates" a standard's clause-mapped
 * documentation on demand — the page's signature interactive moment,
 * demonstrating exactly what Blueprints produces. Echoes the AI-toolbox
 * generator so the two read as one system. Reveal is user-triggered, so
 * hiding content until the click is intentional (not a scroll-gated reveal);
 * reduced-motion users get the whole document at once.
 */
export function BlueprintGenerator({
  code,
  tone,
  document,
}: {
  code: string;
  tone: Tone;
  document: ClauseDoc[];
}) {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (status !== "generating") return;
    if (reduced) {
      setVisibleCount(document.length);
      setStatus("done");
      return;
    }
    if (visibleCount >= document.length) {
      setStatus("done");
      return;
    }
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 420);
    return () => clearTimeout(t);
  }, [status, visibleCount, document.length, reduced]);

  const generate = () => {
    setVisibleCount(0);
    setStatus("generating");
  };

  return (
    <div className="flex w-full flex-col overflow-hidden border border-border bg-bg">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-border border-b bg-bg-secondary px-4 py-3">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-3 flex items-center gap-1.5 font-mono text-[0.65rem] text-text-tertiary">
          <Sparkles className={cn("size-3", TONE_TEXT[tone])} /> blueprints · {code.toLowerCase()}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <button
          type="button"
          onClick={generate}
          disabled={status === "generating"}
          className={cn(
            "flex items-center justify-between gap-3 border border-border-strong bg-bg-secondary px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60",
            TONE_HOVER_BORDER[tone],
          )}
        >
          <span className="text-[13px] text-text">
            {status === "generating" ? "Generating…" : `Generate ${code} documentation`}
          </span>
          <Kbd className="hidden shrink-0 items-center gap-1 sm:inline-flex">
            <CornerDownLeft className="size-2.5" /> Enter
          </Kbd>
        </button>

        <div className="mt-5 flex-1">
          <AnimatePresence mode="wait">
            {status === "idle" ? (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[12.5px] text-text-muted leading-relaxed"
              >
                Generate a live sample of the clause-mapped {code} documentation Blueprints produces
                from your Briesa data.
              </motion.p>
            ) : (
              <motion.div
                key="doc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                {document.slice(0, visibleCount || document.length).map((section) => (
                  <motion.div
                    key={section.clause}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3 border-border border-t pt-3 first:border-t-0 first:pt-0"
                  >
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 border px-1.5 py-0.5 font-mono text-[0.6rem] tabular-nums",
                        TONE_TAG[tone],
                      )}
                    >
                      {section.clause}
                    </span>
                    <span>
                      <span className="block font-medium text-[13.5px] text-text tracking-tight">
                        {section.heading}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-text-tertiary leading-relaxed">
                        {section.body}
                      </span>
                    </span>
                  </motion.div>
                ))}

                {status === "generating" && (
                  <div className="flex items-center gap-1 pt-1 pl-1 text-text-tertiary">
                    <span className="size-1 animate-bounce rounded-full bg-text-tertiary [animation-delay:0ms]" />
                    <span className="size-1 animate-bounce rounded-full bg-text-tertiary [animation-delay:150ms]" />
                    <span className="size-1 animate-bounce rounded-full bg-text-tertiary [animation-delay:300ms]" />
                  </div>
                )}

                {status === "done" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 flex flex-wrap items-center justify-between gap-2 border-border border-t pt-3"
                  >
                    <p
                      className={cn(
                        "flex items-center gap-1.5 font-mono text-[0.7rem]",
                        TONE_TEXT[tone],
                      )}
                    >
                      <FileText className="size-3" /> {document.length} clauses drafted · sample
                      only
                    </p>
                    <button
                      type="button"
                      onClick={generate}
                      className="font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider underline-offset-2 transition-colors hover:text-text hover:underline"
                    >
                      Regenerate
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
