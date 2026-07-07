import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Leaf, Lock } from "lucide-react";
import type { Tone } from "@/components/graphs";

/**
 * Registry of ISO standards covered by Blueprints, rendered as anchored
 * sections on `/blueprints`. The nav's ISO Blueprints dropdown links to
 * `/blueprints#{slug}` for each — one page, one section per standard,
 * rather than a separate page per standard (Blueprints is a single
 * once-off product, not a set of platform modules).
 */
export type BlueprintStandard = {
  slug: string;
  code: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
  lede: string;
  points: string[];
};

export const BLUEPRINT_STANDARDS: BlueprintStandard[] = [
  {
    slug: "iso-9001",
    code: "ISO 9001",
    name: "Quality management systems",
    icon: BadgeCheck,
    tone: "primary",
    lede: "Clause-mapped ISO 9001 documentation, generated from your live operational data — not written from a template.",
    points: [
      "Quality manual, procedures and process maps generated from how your organisation actually operates.",
      "Every clause mapped to the evidence already in Briesa — audits, controls, corrective actions.",
      "Internal audit schedule and non-conformance register included.",
      "See exactly which clauses are certification-ready and which need work, updated live.",
    ],
  },
  {
    slug: "iso-14001",
    code: "ISO 14001",
    name: "Environmental management systems",
    icon: Leaf,
    tone: "success",
    lede: "Environmental management system documentation built from your real environmental aspects and controls.",
    points: [
      "Environmental aspects and impacts register generated from your site and activity data.",
      "Legal and other requirements register kept current against Australian environmental law.",
      "Objectives, targets and management programs mapped to measurable outcomes.",
      "Track certification readiness against every clause as evidence rolls in.",
    ],
  },
  {
    slug: "iso-27001",
    code: "ISO 27001",
    name: "Information security management",
    icon: Lock,
    tone: "info",
    lede: "Information security management system documentation, mapped to how your organisation actually handles data.",
    points: [
      "Statement of Applicability and risk treatment plan generated from your control environment.",
      "Information security policies and procedures mapped to Annex A controls.",
      "Asset register and risk assessment built from your existing data architecture.",
      "Certification roadmap shows what's ready now and what's still needed to close the gap.",
    ],
  },
];

export function getBlueprintStandard(slug: string): BlueprintStandard | undefined {
  return BLUEPRINT_STANDARDS.find((s) => s.slug === slug);
}
