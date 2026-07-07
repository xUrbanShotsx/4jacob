import type { LucideIcon } from "lucide-react";
import { CalendarDays, Lightbulb, Package } from "lucide-react";
import type { Metadata } from "next";
import { FadeUp, Stagger } from "@/components/motion";
import { NewsletterForm } from "@/components/newsletter-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "The Briesa weekly — product updates and practical WHS, GRC and ISO compliance tips for Australian business.",
  alternates: { canonical: "/newsletter" },
};

const GET: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Product updates",
    body: "New modules, releases and roadmap notes — what changed in Briesa and why it matters for your program.",
    icon: Package,
  },
  {
    title: "Compliance tips",
    body: "Plain-English guidance on WHS Act duties, ISO 45001 / 9001 readiness and audit prep — written for Australian business.",
    icon: Lightbulb,
  },
  {
    title: "One email a week",
    body: "A single concise digest every week. No drip campaigns, no spam — unsubscribe in one click any time.",
    icon: CalendarDays,
  },
];

export default function NewsletterPage() {
  return (
    <main>
      <PageHero
        eyebrow="The Briesa weekly"
        title="Compliance, in your inbox"
        lede="Product updates and practical compliance tips for Australian business — one short email every week. Free, and you can unsubscribe any time."
      />

      <section className="pb-12">
        <div className="web-container">
          <Stagger
            className="grid gap-px border border-border bg-border md:grid-cols-3"
            stagger={0.08}
          >
            {GET.map((g) => {
              const Icon = g.icon;
              return (
                <FadeUp key={g.title} asChild>
                  <div className="flex flex-col gap-3 bg-bg p-7">
                    <div className="flex size-9 items-center justify-center border border-border bg-bg-secondary text-text-secondary">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="text-lg tracking-tight">{g.title}</h3>
                    <p className="text-sm text-text-tertiary leading-relaxed">{g.body}</p>
                  </div>
                </FadeUp>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section-padding border-border border-t bg-bg-secondary">
        <div className="web-container">
          <FadeUp>
            <div className="mx-auto max-w-xl border border-border bg-bg p-8">
              <h2 className="text-2xl tracking-tight">Subscribe</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Enter your email to join the list. We only use your address to send the weekly
                digest.
              </p>
              <div className="mt-6">
                <NewsletterForm />
              </div>
              <p className="mt-6 text-text-tertiary text-xs">
                By subscribing you agree to receive marketing emails from Briesa Pty Ltd. We handle
                your details in line with the Australian Privacy Principles and our Privacy Policy.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
