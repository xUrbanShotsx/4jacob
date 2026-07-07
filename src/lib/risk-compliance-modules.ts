import type { LucideIcon } from "lucide-react";
import { FileSearch, Paperclip, Scale, ShieldAlert, SlidersHorizontal } from "lucide-react";
import type { Tone } from "@/components/graphs";

/**
 * Registry of Risk & compliance brief pages served by
 * `app/docs/risk-compliance/[slug]`. Mirrors `src/lib/safety-modules.ts` —
 * see that file for the pattern each Solutions submodule group follows.
 */
export type RiskComplianceModule = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
  lede: string;
  points: string[];
};

export const RISK_COMPLIANCE_MODULES: RiskComplianceModule[] = [
  {
    slug: "hazard-register",
    name: "Hazard register",
    icon: ShieldAlert,
    tone: "danger",
    lede: "Every hazard identified, assessed and controlled — one live register instead of a spreadsheet nobody updates.",
    points: [
      "Log a hazard from any site with photos and location in under a minute.",
      "Each hazard links to its risk assessment and controls automatically — nothing sits in isolation.",
      "Review dates keep the register current instead of a one-off exercise.",
      "Full history of every hazard, from identification to close-out, ready for an audit.",
    ],
  },
  {
    slug: "risk-assessments",
    name: "Risk assessments",
    icon: Scale,
    tone: "danger",
    lede: "The three-register risk model — build, score and review risk assessments without leaving the platform.",
    points: [
      "Standard risk matrix scoring, consistent across every site and assessor.",
      "Link each assessment to the hazards, controls and SWMS it actually governs.",
      "Schedule reviews on a cycle you set — never rely on someone remembering.",
      "Residual risk tracked over time as controls are implemented.",
    ],
  },
  {
    slug: "controls",
    name: "Controls",
    icon: SlidersHorizontal,
    tone: "info",
    lede: "Every control mapped to the risk it treats, the person who owns it and the evidence that it's working.",
    points: [
      "Controls linked directly to the hazards and risks they're meant to treat — no orphaned controls.",
      "Assign an owner and a verification schedule to every control.",
      "AI-suggested controls based on permit type, hazard category and work location.",
      "See at a glance which controls are overdue for verification.",
    ],
  },
  {
    slug: "audits",
    name: "Audits",
    icon: FileSearch,
    tone: "primary",
    lede: "Internal and external audits scheduled, run and closed out with evidence attached at every step.",
    points: [
      "Build audit checklists mapped to ISO 45001, 14001, 9001 or your own framework.",
      "Findings turn into tracked actions automatically — no separate spreadsheet of non-conformances.",
      "Schedule recurring internal audits and get reminded before they're due.",
      "Export a complete audit pack — evidence, findings and close-outs — in one file.",
    ],
  },
  {
    slug: "evidence",
    name: "Evidence",
    icon: Paperclip,
    tone: "success",
    lede: "Every document, photo and sign-off an auditor could ask for, attached to the record it belongs to.",
    points: [
      "Evidence attaches directly to the incident, action, control or audit it supports — never a loose folder.",
      "Version history means you always know which document was current on a given day.",
      "Search evidence across the whole organisation in seconds, not by digging through email.",
      "Generate an audit-ready evidence pack for any framework on demand.",
    ],
  },
];

export function getRiskComplianceModule(slug: string): RiskComplianceModule | undefined {
  return RISK_COMPLIANCE_MODULES.find((m) => m.slug === slug);
}
