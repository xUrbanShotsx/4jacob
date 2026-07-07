import type { LucideIcon } from "lucide-react";
import { BadgeCheck, HardHat, Leaf } from "lucide-react";
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
    slug: "iso-45001",
    code: "ISO 45001",
    name: "Occupational health & safety",
    icon: HardHat,
    tone: "danger",
    lede: "Occupational health and safety management system documentation, built from the safety program you already run in Briesa.",
    points: [
      "OH&S policy, objectives and management programs generated from your live safety data.",
      "Hazard identification and risk assessment register mapped straight to your controls and incidents.",
      "Worker consultation and participation records, plus legal and other requirements, kept current against Australian WHS law.",
      "Certification roadmap shows which clauses are ready now and what's still needed to close the gap.",
    ],
  },
];

export function getBlueprintStandard(slug: string): BlueprintStandard | undefined {
  return BLUEPRINT_STANDARDS.find((s) => s.slug === slug);
}
