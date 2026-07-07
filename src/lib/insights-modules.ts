import type { LucideIcon } from "lucide-react";
import { FileText, LayoutDashboard, Target } from "lucide-react";
import type { Tone } from "@/components/graphs";

/**
 * Registry of Insights brief pages served by `app/docs/insights/[slug]`.
 * Mirrors `src/lib/safety-modules.ts` — see that file for the pattern each
 * Solutions submodule group follows.
 */
export type InsightsModule = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
  lede: string;
  points: string[];
};

export const INSIGHTS_MODULES: InsightsModule[] = [
  {
    slug: "kpis",
    name: "KPIs",
    icon: Target,
    tone: "primary",
    lede: "Leading and lagging indicators tracked automatically — not calculated by hand at the end of the month.",
    points: [
      "Standard WHS leading and lagging indicators built in — incident rate, near-miss ratio, training compliance and more.",
      "Define your own KPIs and thresholds specific to your organisation.",
      "KPIs recalculate automatically as new data comes in — no manual spreadsheet rollups.",
      "Set a target and see at a glance whether you're tracking ahead or behind.",
    ],
  },
  {
    slug: "reports",
    name: "Reports",
    icon: FileText,
    tone: "info",
    lede: "Board-ready and client-shareable reports generated on demand, not rebuilt from scratch every month.",
    points: [
      "Generate a report for any site, contractor or time period in a couple of clicks.",
      "Client-shareable reports built for Australian reporting requirements — no reformatting needed.",
      "Schedule recurring reports to land in the right inbox automatically.",
      "Every report pulls from the same live data — no version drift between reports.",
    ],
  },
  {
    slug: "dashboards",
    name: "Dashboards",
    icon: LayoutDashboard,
    tone: "success",
    lede: "Live dashboards for every level of the business — from a site supervisor's phone to the board pack.",
    points: [
      "Pre-built dashboards for site, portfolio and executive views — no setup required.",
      "Drill from a portfolio-level number straight down to the incident or action behind it.",
      "Consultants get a cross-organisation dashboard showing every client in one view.",
      "Share a live dashboard link — no static export that's out of date by the time it's opened.",
    ],
  },
];

export function getInsightsModule(slug: string): InsightsModule | undefined {
  return INSIGHTS_MODULES.find((m) => m.slug === slug);
}
