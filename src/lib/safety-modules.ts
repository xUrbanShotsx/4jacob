import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  FileWarning,
  ListChecks,
  MessageSquare,
} from "lucide-react";
import type { Tone } from "@/components/graphs";

/**
 * Registry of Safety-module brief pages served by `app/docs/safety/[slug]`.
 * Each entry is what the Solutions mega-menu's Safety items link to — a short,
 * standalone brief per module rather than every item landing on the same
 * generic docs page. Add a module by appending an entry here; the route,
 * static params and metadata pick it up automatically.
 */
export type SafetyModule = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
  lede: string;
  points: string[];
};

export const SAFETY_MODULES: SafetyModule[] = [
  {
    slug: "incidents",
    name: "Incidents",
    icon: AlertTriangle,
    tone: "danger",
    lede: "Log, investigate and close out incidents from any device — with corrective actions that don't fall through the cracks.",
    points: [
      "Report an incident from a phone in under a minute, with photos and witness statements attached.",
      "Severity auto-classifies and triggers the right notification chain — site manager, WHS manager, executive.",
      "Corrective actions are tracked to completion, with automatic follow-up reminders.",
      "Every incident rolls into your leading and lagging indicator dashboards automatically.",
    ],
  },
  {
    slug: "actions",
    name: "Actions",
    icon: ListChecks,
    tone: "danger",
    lede: "Every action from every audit, incident or inspection — assigned, tracked and closed out in one register.",
    points: [
      "Actions generate automatically from incidents, audits, inspections and risk assessments.",
      "Assign an owner and due date; overdue actions escalate automatically.",
      "See every open action across every site in one portfolio view.",
      "Evidence is attached at close-out, ready for the next audit.",
    ],
  },
  {
    slug: "toolbox",
    name: "Toolbox Talks",
    icon: MessageSquare,
    tone: "primary",
    lede: "AI-drafted toolbox talks on any topic, delivered and signed off on site in minutes.",
    points: [
      "Generate a toolbox talk from any WHS topic with the AI toolbox.",
      "Deliver on a phone or tablet, with a digital sign-off from every attendee.",
      "Build a library of talks your crews can reuse and adapt.",
      "Attendance rolls straight into training records — no separate paperwork.",
    ],
  },
  {
    slug: "prestart",
    name: "Prestart",
    icon: CheckCircle2,
    tone: "primary",
    lede: "Daily pre-start checks completed on site, offline-capable, synced the moment there's signal.",
    points: [
      "Pre-start forms built for plant, equipment and high-risk activities.",
      "Works offline — a worker on a site with no reception can still complete and sign a pre-start.",
      "Non-conformances raise an action automatically, no separate step.",
      "Full history for every site, every day, ready for an auditor.",
    ],
  },
  {
    slug: "swms",
    name: "SWMS",
    icon: FileWarning,
    tone: "danger",
    lede: "Safe Work Method Statements drafted, reviewed and version-controlled — not a folder of PDFs.",
    points: [
      "AI-drafted SWMS from the HRCW category, with task steps and hazards pre-populated.",
      "Digital review and sign-off from every worker before high-risk work begins.",
      "Version history — know exactly which SWMS was in force on any given day.",
      "Linked directly to the permits and inductions that depend on it.",
    ],
  },
  {
    slug: "permits",
    name: "Permits",
    icon: ClipboardCheck,
    tone: "info",
    lede: "Permit-to-work issued, tracked and closed out — hot work, confined space, excavation and more.",
    points: [
      "Permit templates for hot work, confined space, excavation, working at heights and more.",
      "AI-suggested controls based on permit type and work location.",
      "Time-boxed permits expire automatically — no permit left open by accident.",
      "Full audit trail of who issued, who signed and who closed it out.",
    ],
  },
  {
    slug: "safety-inspections",
    name: "Safety inspections",
    icon: ClipboardCheck,
    tone: "success",
    lede: "Scheduled and ad-hoc site inspections, with findings that turn straight into tracked actions.",
    points: [
      "Build inspection checklists for any site, plant item or activity.",
      "Schedule recurring inspections and get reminded before they're due.",
      "Every finding becomes a tracked action automatically — nothing gets lost on a paper checklist.",
      "Trend inspection scores over time across sites and contractors.",
    ],
  },
];

export function getSafetyModule(slug: string): SafetyModule | undefined {
  return SAFETY_MODULES.find((m) => m.slug === slug);
}
