"use client";

import { motion } from "motion/react";
import { fadeUpItem, Reveal, Stagger } from "@/components/motion";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants } from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

type ChangelogEntry = {
  version: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: string;
  description: string;
  tag: string;
};

/** Newest first — the first entry renders as the highlighted "latest" card. */
const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.0",
    date: "2026-06-24",
    title: "General availability",
    description:
      "Briesa is out of beta. WHS, governance, risk and ISO modules ship together, with SSO, audit logging and Australian data residency on every plan.",
    tag: "Platform",
  },
  {
    version: "0.9",
    date: "2026-05-12",
    title: "Insights dashboards",
    description:
      "Live compliance-status, KPI and trend dashboards across every site, with scheduled PDF reports for boards and regulators.",
    tag: "Insights",
  },
  {
    version: "0.8",
    date: "2026-03-30",
    title: "Contractor management",
    description:
      "Onboard contractors with competency checks, induction tracking and expiry reminders — unlimited field workers on every tier.",
    tag: "People",
  },
  {
    version: "0.7",
    date: "2026-02-18",
    title: "Prestart & toolbox talks",
    description:
      "Mobile prestart checks, SWMS sign-off and toolbox talks that sync straight into the risk register from any site.",
    tag: "Safety",
  },
  {
    version: "0.5",
    date: "2025-11-04",
    title: "Risk register",
    description:
      "A unified risk register with assessments, treatments and residual scoring, mapped to controls and obligations.",
    tag: "Risk",
  },
  {
    version: "0.1",
    date: "2025-08-19",
    title: "Private beta",
    description:
      "The first Briesa build lands with WHS incidents, inspections and controlled documents for design-partner sites.",
    tag: "Platform",
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

/** Group newest-first entries by descending year. */
function groupByYear(entries: ChangelogEntry[]): [string, ChangelogEntry[]][] {
  const byYear = new Map<string, ChangelogEntry[]>();
  for (const entry of entries) {
    const year = entry.date.slice(0, 4);
    const bucket = byYear.get(year);
    if (bucket) bucket.push(entry);
    else byYear.set(year, [entry]);
  }
  return [...byYear.entries()];
}

function VersionPill({ version }: { version: string }) {
  return (
    <span className="inline-flex items-center border border-border bg-bg-secondary px-2 py-0.5 font-mono text-[0.6rem] text-text-secondary uppercase tracking-wider">
      v{version}
    </span>
  );
}

export function ChangelogTimeline() {
  const grouped = groupByYear(CHANGELOG);
  const latestVersion = CHANGELOG[0]?.version;

  return (
    <section className="section-padding">
      <div className="web-container max-w-4xl">
        {grouped.map(([year, entries]) => (
          <div key={year} className="group/year relative mb-16 last:mb-0">
            <Reveal className="mb-8">
              <span className="font-medium text-6xl text-border-strong leading-none tracking-tighter transition-colors duration-300 group-has-[[data-entry]:hover]/year:text-text-secondary md:text-8xl">
                {year}
              </span>
            </Reveal>

            <Stagger className="group/list flex flex-col gap-8 md:ml-8" stagger={0.1} amount={0.1}>
              {entries.map((entry) =>
                entry.version === latestVersion ? (
                  <motion.div
                    key={entry.version}
                    data-entry
                    variants={fadeUpItem}
                    className="relative border border-accent-border bg-accent-bg p-6 md:p-8"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <VersionPill version={entry.version} />
                      <span className="font-mono text-[0.65rem] text-accent-text uppercase tracking-wider">
                        Latest · {entry.tag}
                      </span>
                      <span className="ml-auto font-mono text-[0.65rem] text-text-tertiary">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <h2 className="text-2xl tracking-tight md:text-3xl">{entry.title}</h2>
                    <p className="mt-2 max-w-xl text-sm text-text-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={entry.version}
                    data-entry
                    variants={fadeUpItem}
                    className="border-border border-l-2 py-1 pl-6 transition-[border-color,opacity] duration-300 hover:border-text group-hover/list:opacity-55 hover:!opacity-100"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <VersionPill version={entry.version} />
                      <span className="font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
                        {entry.tag}
                      </span>
                      <span className="ml-auto font-mono text-[0.65rem] text-text-tertiary">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <h2 className="text-xl tracking-tight md:text-2xl">{entry.title}</h2>
                    <p className="mt-2 max-w-xl text-sm text-text-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  </motion.div>
                ),
              )}
            </Stagger>
          </div>
        ))}

        <div className="pt-4 text-center">
          <SmartLink href={DEMO_URL} className={buttonVariants({ variant: "primary", size: "lg" })}>
            Get a demo
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
