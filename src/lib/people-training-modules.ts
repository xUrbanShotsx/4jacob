import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FolderOpen,
  GraduationCap,
  HeartPulse,
  RotateCcw,
  UserCheck,
} from "lucide-react";
import type { Tone } from "@/components/graphs";

/**
 * Registry of People & training brief pages served by
 * `app/docs/people-training/[slug]`. Mirrors `src/lib/safety-modules.ts` —
 * see that file for the pattern each Solutions submodule group follows.
 */
export type PeopleTrainingModule = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
  lede: string;
  points: string[];
};

export const PEOPLE_TRAINING_MODULES: PeopleTrainingModule[] = [
  {
    slug: "inductions",
    name: "Inductions",
    icon: UserCheck,
    tone: "primary",
    lede: "Site and company inductions completed on a phone before anyone sets foot on site.",
    points: [
      "Build induction content once — company, site-specific and contractor modules — and assign it automatically by role.",
      "Workers complete inductions on their own phone before their first day, with a digital sign-off.",
      "Induction status gates site access — no valid induction, no sign-in.",
      "Automatic re-induction reminders when content changes or a certification lapses.",
    ],
  },
  {
    slug: "contractors",
    name: "Contractors",
    icon: Briefcase,
    tone: "info",
    lede: "Verify a contractor's licences, insurance and inductions before they ever step on site.",
    points: [
      "Contractors upload licences, insurance and competency documents once, reused across every site.",
      "Expiry dates are tracked automatically — no contractor works on an expired ticket.",
      "Site access gates on verified documentation, not a spreadsheet someone forgot to check.",
      "One contractor profile, visible to every organisation they work for on Briesa.",
    ],
  },
  {
    slug: "health-wellbeing",
    name: "Health & wellbeing",
    icon: HeartPulse,
    tone: "success",
    lede: "Fitness-for-work checks, health monitoring and wellbeing support in one confidential record.",
    points: [
      "Schedule and track health monitoring required for specific roles and exposures.",
      "Confidential fitness-for-work declarations, visible only to those who need to see them.",
      "Flag and follow up wellbeing concerns without exposing sensitive detail to site managers.",
      "Reminders before a medical or health assessment lapses.",
    ],
  },
  {
    slug: "return-to-work",
    name: "Return to work",
    icon: RotateCcw,
    tone: "danger",
    lede: "Structured return-to-work plans that keep an injured worker, their doctor and their employer aligned.",
    points: [
      "Build a return-to-work plan with graduated duties, reviewed on a schedule you set.",
      "Track medical certificates, restrictions and review dates in one place.",
      "Keep the worker, their manager and your RTW coordinator on the same page automatically.",
      "Full history ready if a claim is reviewed or escalated.",
    ],
  },
  {
    slug: "courses",
    name: "Courses",
    icon: GraduationCap,
    tone: "primary",
    lede: "The bundled LMS — build courses, assign them automatically and track completion across the workforce.",
    points: [
      "Build courses with quizzes, videos and documents — or start from a Briesa-authored template.",
      "Auto-assign by role, site or licence requirement, with due dates and reminders.",
      "Compliance gates lock out site access until a mandatory course is complete.",
      "Certificates generate and store automatically on completion.",
    ],
  },
  {
    slug: "records",
    name: "Records",
    icon: FolderOpen,
    tone: "info",
    lede: "Every licence, ticket, certificate and training record for every worker, contractor and visitor in one place.",
    points: [
      "One record per person — licences, tickets, inductions, training and health checks together.",
      "Expiring items surface automatically, weeks before they lapse.",
      "Export a complete, audit-ready record for any worker in seconds.",
      "Records travel with the person, not the spreadsheet they happened to be on.",
    ],
  },
];

export function getPeopleTrainingModule(slug: string): PeopleTrainingModule | undefined {
  return PEOPLE_TRAINING_MODULES.find((m) => m.slug === slug);
}
