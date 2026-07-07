import type { LucideIcon } from "lucide-react";
import { CalendarClock, DoorOpen, FileCheck2, Wrench } from "lucide-react";
import type { Tone } from "@/components/graphs";

/**
 * Registry of Operations brief pages served by `app/docs/operations/[slug]`.
 * Mirrors `src/lib/safety-modules.ts` — see that file for the pattern each
 * Solutions submodule group follows.
 */
export type OperationsModule = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
  lede: string;
  points: string[];
};

export const OPERATIONS_MODULES: OperationsModule[] = [
  {
    slug: "safe-work-procedures",
    name: "Safe work procedures",
    icon: FileCheck2,
    tone: "info",
    lede: "Standard operating procedures and safe work instructions, version-controlled and always the current copy on site.",
    points: [
      "Build safe work procedures once and roll them out across every site that needs them.",
      "Workers always see the current version — no laminated sheet three revisions out of date.",
      "Sign-off tracked per worker, per procedure, per site.",
      "Linked directly to the SWMS and permits that reference them.",
    ],
  },
  {
    slug: "site-access",
    name: "Site access",
    icon: DoorOpen,
    tone: "primary",
    lede: "Know exactly who is on site, right now, and whether they're actually allowed to be there.",
    points: [
      "Digital sign-in and sign-out for workers, contractors and visitors on any device.",
      "Access gates automatically on induction status, licences and permit requirements.",
      "Real-time headcount for every site — essential for an emergency evacuation.",
      "Full attendance history for any site, any day, ready for an audit.",
    ],
  },
  {
    slug: "work-planning",
    name: "Work planning",
    icon: CalendarClock,
    tone: "success",
    lede: "Plan the week's work against the crews, plant and permits you actually have available.",
    points: [
      "See planned work alongside the permits, SWMS and inductions it depends on.",
      "Spot a scheduling conflict — a crew, a permit or a piece of plant — before it becomes a delay.",
      "Link work packages to the risk assessments and controls that govern them.",
      "One planning view shared across site supervisors and management.",
    ],
  },
  {
    slug: "defect-reporting",
    name: "Defect reporting",
    icon: Wrench,
    tone: "danger",
    lede: "Plant, equipment and site defects reported from a phone and tracked until they're actually fixed.",
    points: [
      "Report a defect with photos from any device — plant, equipment, or the site itself.",
      "Defects route automatically to the right person to action, with severity-based urgency.",
      "A defective item can be locked out of use until it's verified fixed.",
      "Full defect history per asset — know what keeps breaking and why.",
    ],
  },
];

export function getOperationsModule(slug: string): OperationsModule | undefined {
  return OPERATIONS_MODULES.find((m) => m.slug === slug);
}
