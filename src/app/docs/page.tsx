import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Landmark,
  Plug,
  Rocket,
  ShieldAlert,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, Stagger } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Guides and reference for Briesa — the unified WHS, GRC and ISO certification platform for Australian business.",
  alternates: { canonical: "/docs" },
};

const SECTIONS: { slug: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    body: "Set up your organisation, invite your team and connect your first site in under an hour.",
    icon: Rocket,
  },
  {
    slug: "safety",
    title: "Safety",
    body: "Log incidents, manage hazards and run investigations across every site and contractor.",
    icon: ShieldAlert,
  },
  {
    slug: "risk-compliance",
    title: "Risk & compliance",
    body: "Build risk registers, schedule controls and keep your ISO and WHS obligations audit-ready.",
    icon: ClipboardCheck,
  },
  {
    slug: "people-training",
    title: "People & training",
    body: "Manage workers, contractors and visitors, and run the bundled LMS with compliance gates.",
    icon: Users,
  },
  {
    slug: "governance",
    title: "Governance",
    body: "Document policies, track actions and give the board a single line of sight over assurance.",
    icon: Landmark,
  },
  {
    slug: "operations-contractors",
    title: "Operations & contractors",
    body: "Coordinate day-to-day work, induct contractors and verify competencies before site access.",
    icon: BookOpen,
  },
  {
    slug: "insights",
    title: "Insights",
    body: "Track leading and lagging indicators with dashboards built for Australian reporting.",
    icon: BarChart3,
  },
  {
    slug: "integrations-api",
    title: "Integrations & API",
    body: "Connect Briesa to your existing systems with webhooks, SSO and the REST API.",
    icon: Plug,
  },
  {
    slug: "release-notes",
    title: "Release notes",
    body: "Follow what's new across every module — fixes, improvements and new capability.",
    icon: GraduationCap,
  },
];

export default function DocsPage() {
  return (
    <main>
      <PageHero
        align="left"
        eyebrow="Documentation"
        title="Briesa documentation"
        lede="Guides and reference for running your whole compliance program — WHS, GRC and ISO certification — in one platform. We're writing it now; sections light up as they ship."
      />

      <section className="pb-12">
        <div className="web-container">
          <Stagger
            className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.title} asChild>
                  <Link
                    href="#"
                    id={s.slug}
                    className="group flex scroll-mt-32 flex-col gap-3 bg-bg p-6 transition-colors hover:bg-bg-secondary"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex size-9 items-center justify-center border border-border bg-bg-secondary text-text-secondary transition-colors group-hover:border-border-strong group-hover:text-text">
                        <Icon className="size-4" />
                      </div>
                      <span className="border border-border bg-bg-secondary px-1.5 py-0.5 font-mono text-[0.6rem] text-text-muted uppercase tracking-wider">
                        Coming soon
                      </span>
                    </div>
                    <h3 className="text-lg tracking-tight">{s.title}</h3>
                    <p className="text-sm text-text-tertiary leading-relaxed">{s.body}</p>
                  </Link>
                </FadeUp>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section-padding border-border border-t">
        <div className="web-container">
          <FadeUp>
            <div className="flex flex-col items-start justify-between gap-6 border border-border bg-bg-secondary p-8 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl tracking-tight">Can't find what you need?</h2>
                <p className="mt-2 max-w-xl text-text-secondary">
                  The docs are still being written. In the meantime, our team can walk you through
                  any module and answer compliance-specific questions.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 font-mono text-[0.65rem] text-text-secondary uppercase tracking-wider hover:text-text"
              >
                Talk to our team →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
