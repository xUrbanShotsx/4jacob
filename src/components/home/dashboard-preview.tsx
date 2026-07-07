"use client";

import { AlertTriangle, BellRing, CheckCircle2, Clock } from "lucide-react";
import { motion } from "motion/react";
import { ComplianceRing, Sparkline, TONE_FILL, TONE_TEXT, toneForValue } from "@/components/graphs";
import { cn } from "@/components/ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const EXPIRING = [
  { label: "White Card — J. Brown", due: "14 days" },
  { label: "First Aid — Site 3 crew", due: "21 days" },
  { label: "EWP licence — M. Lee", due: "30 days" },
];

const PRESTART = [
  { label: "Site 3 · Tower crane", value: 100 },
  { label: "Site 7 · Excavation", value: 82 },
  { label: "Site 1 · Fit-out", value: 64 },
];

/** A framed product mock — semantic data viz where color reports real status
    (audit-ready score, overdue risk, prestart readiness) rather than decorating it. */
export function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
      className="mx-auto mt-16 max-w-5xl border border-border bg-bg-secondary shadow-2xl shadow-black/5 dark:shadow-black/20"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-border border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-3 font-mono text-[0.65rem] text-text-tertiary">
          app.briesa.com / dashboard
        </span>
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[0.6rem] text-(--badge-green-text) uppercase tracking-wider sm:flex">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--badge-green-text) opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-(--badge-green-text)" />
          </span>{" "}
          Live
        </span>
      </div>

      {/* Body */}
      <div className="grid gap-px bg-border md:grid-cols-3">
        {/* Compliance score */}
        <div className="flex flex-col items-center justify-center gap-4 bg-bg p-6">
          <ComplianceRing value={94} label="Audit ready" size={148} />
          <div className="grid w-full grid-cols-3 gap-px border border-border bg-border">
            {(
              [
                ["12", "Open actions", null],
                ["3", "Overdue", "danger"],
                ["28", "Controls", null],
              ] as const
            ).map(([n, l, tone]) => (
              <div key={l} className="bg-bg px-2 py-3 text-center">
                <p className={cn("font-medium text-lg", tone ? TONE_TEXT[tone] : "text-text")}>
                  {n}
                </p>
                <p className="mt-0.5 font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents + expiring */}
        <div className="flex flex-col gap-px bg-border">
          <div className="bg-bg p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                <AlertTriangle className="size-2.5" /> Incidents · 12 wk
              </span>
              <span className="font-mono text-[0.6rem] text-text-secondary">−38%</span>
            </div>
            <Sparkline data={[9, 7, 8, 6, 7, 5, 4, 5, 3, 4, 2, 2]} width={260} height={54} />
          </div>
          <div className="flex-1 bg-bg p-5">
            <span className="mb-3 flex items-center gap-1.5 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
              <BellRing className="size-2.5" /> Expiring soon
            </span>
            <ul className="flex flex-col gap-2.5">
              {EXPIRING.map((e) => (
                <li key={e.label} className="flex items-center justify-between text-xs">
                  <span className="truncate text-text-secondary">{e.label}</span>
                  <span className="ml-2 inline-flex shrink-0 items-center gap-1 border border-border bg-bg-secondary px-1.5 py-0.5 font-mono text-[0.55rem] text-text-tertiary">
                    <Clock className="size-2.5" /> {e.due}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prestart progress */}
        <div className="bg-bg p-5">
          <span className="mb-4 flex items-center gap-1.5 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
            <CheckCircle2 className="size-2.5" /> Prestart sign-off
          </span>
          <div className="flex flex-col gap-4">
            {PRESTART.map((p, i) => (
              <div key={p.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{p.label}</span>
                  <span className={cn("font-mono tabular-nums", TONE_TEXT[toneForValue(p.value)])}>
                    {p.value}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden border border-border bg-bg-secondary">
                  <motion.div
                    className={cn("h-full origin-left", TONE_FILL[toneForValue(p.value)])}
                    style={{ width: `${p.value}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.8 + i * 0.12, ease: EASE }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 border-border border-t pt-4">
            <p className="font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
              Next audit
            </p>
            <p className="mt-1 text-sm text-text">ISO 45001 surveillance · 41 days</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
