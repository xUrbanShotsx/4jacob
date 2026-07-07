import { FaqList } from "@/components/faq-list";
import { SectionHeading } from "@/components/section-heading";

const FAQ = [
  {
    q: "How does per-organisation pricing work?",
    a: "You pay one flat monthly fee per organisation, banded by managed employee records. Field workers, contractors and visitors who sign in, complete pre-starts or acknowledge SWMS are unlimited on every tier — you never pay per seat for the people on site.",
  },
  {
    q: "What exactly is Blueprints?",
    a: "Blueprints is an AI workspace that turns your live operational compliance data into clause-mapped ISO 45001, 14001 and 9001 management-system documents, registers and certification roadmaps — the documentation SMEs otherwise pay consultants thousands of dollars to produce. It's a separate, once-off product, bought as a pack of one, two or three standards and used alongside any plan.",
  },
  {
    q: "Can one account manage multiple organisations?",
    a: "Yes — Briesa is consultant-native. One login can own or administer many organisations through identical workflows, with strict per-organisation data isolation and a cross-organisation portfolio dashboard showing every client's compliance score, expiring items and open actions in one view.",
  },
  {
    q: "Is training really included?",
    a: "Yes. The full LMS — induction builder, courses, quizzes, auto-assignment, certificates and training matrices — is included on every tier, never sold separately. Compliance gates always work in core, on every plan.",
  },
  {
    q: "Where is my data hosted, and does it work offline?",
    a: "Data is hosted in Australia — a procurement requirement for many government-adjacent construction clients. Core field workflows (pre-starts, forms, sign-ins) are built mobile-first with offline queue-and-sync, so a worker on a site with poor reception can still sign in and complete a pre-start.",
  },
] as const;

export function Faq() {
  return (
    <section className="section-padding border-border border-t bg-bg-secondary">
      <div className="web-container">
        <SectionHeading align="center" eyebrow="FAQ" title="Common questions" />
        <div className="mx-auto mt-12 max-w-2xl md:mt-16">
          <FaqList items={FAQ} />
        </div>
      </div>
    </section>
  );
}
