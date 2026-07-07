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
/** One clause-mapped document section the Blueprints generator "writes out" —
    real ISO clause numbers so the demo reads as credible, not filler. */
export type ClauseDoc = { clause: string; heading: string; body: string };

export type BlueprintStandard = {
  slug: string;
  code: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
  lede: string;
  /** Certification readiness — % of clauses evidence already covers. */
  coverage: number;
  /** Total requirement clauses in the standard (used in the readiness panel). */
  clauseCount: number;
  points: string[];
  /** Sample clause-mapped sections the interactive generator reveals. */
  document: ClauseDoc[];
};

export const BLUEPRINT_STANDARDS: BlueprintStandard[] = [
  {
    slug: "iso-9001",
    code: "ISO 9001",
    name: "Quality management systems",
    icon: BadgeCheck,
    tone: "primary",
    lede: "Clause-mapped ISO 9001 documentation, generated from your live operational data — not written from a template.",
    coverage: 92,
    clauseCount: 10,
    points: [
      "Quality manual, procedures and process maps generated from how your organisation actually operates.",
      "Every clause mapped to the evidence already in Briesa — audits, controls, corrective actions.",
      "Internal audit schedule and non-conformance register included.",
      "See exactly which clauses are certification-ready and which need work, updated live.",
    ],
    document: [
      {
        clause: "4.1",
        heading: "Context of the organisation",
        body: "Internal and external issues drawn from your organisation profile, sites and client register.",
      },
      {
        clause: "6.1",
        heading: "Actions to address risks & opportunities",
        body: "Populated from your live risk register and the controls already treating each risk.",
      },
      {
        clause: "8.5",
        heading: "Production & service provision",
        body: "Process maps and controlled conditions built from your operational workflows.",
      },
      {
        clause: "9.2",
        heading: "Internal audit",
        body: "Audit schedule and findings pulled straight from your Briesa audit program.",
      },
    ],
  },
  {
    slug: "iso-14001",
    code: "ISO 14001",
    name: "Environmental management systems",
    icon: Leaf,
    tone: "success",
    lede: "Environmental management system documentation built from your real environmental aspects and controls.",
    coverage: 88,
    clauseCount: 10,
    points: [
      "Environmental aspects and impacts register generated from your site and activity data.",
      "Legal and other requirements register kept current against Australian environmental law.",
      "Objectives, targets and management programs mapped to measurable outcomes.",
      "Track certification readiness against every clause as evidence rolls in.",
    ],
    document: [
      {
        clause: "6.1.2",
        heading: "Environmental aspects",
        body: "Aspects and impacts register generated from your sites, plant and activities.",
      },
      {
        clause: "6.1.3",
        heading: "Compliance obligations",
        body: "Legal and other requirements kept current against Australian environmental law.",
      },
      {
        clause: "6.2",
        heading: "Environmental objectives",
        body: "Objectives and management programs mapped to measurable, tracked outcomes.",
      },
      {
        clause: "9.1.1",
        heading: "Monitoring & measurement",
        body: "Evaluation of performance built from the environmental data you already capture.",
      },
    ],
  },
  {
    slug: "iso-45001",
    code: "ISO 45001",
    name: "Occupational health & safety",
    icon: HardHat,
    tone: "danger",
    lede: "Occupational health and safety management system documentation, built from the safety program you already run in Briesa.",
    coverage: 96,
    clauseCount: 10,
    points: [
      "OH&S policy, objectives and management programs generated from your live safety data.",
      "Hazard identification and risk assessment register mapped straight to your controls and incidents.",
      "Worker consultation and participation records, plus legal and other requirements, kept current against Australian WHS law.",
      "Certification roadmap shows which clauses are ready now and what's still needed to close the gap.",
    ],
    document: [
      {
        clause: "5.4",
        heading: "Consultation & participation of workers",
        body: "Consultation records built from your toolbox talks, sign-offs and site meetings.",
      },
      {
        clause: "6.1.2",
        heading: "Hazard identification & risk",
        body: "Hazard and risk register mapped straight to your controls and incident history.",
      },
      {
        clause: "8.1.2",
        heading: "Eliminating hazards & reducing risk",
        body: "The hierarchy of controls, evidenced by the controls already live in Briesa.",
      },
      {
        clause: "10.2",
        heading: "Incident & corrective action",
        body: "Incident, nonconformity and corrective-action records pulled from your live data.",
      },
    ],
  },
];
