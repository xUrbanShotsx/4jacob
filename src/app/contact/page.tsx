import { Clock, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FadeUp } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Briesa about demos, pricing, support or partnerships. We reply to Australian businesses within one business day.",
  alternates: { canonical: "/contact" },
};

const POINTS = [
  {
    icon: Clock,
    title: "Fast replies",
    body: "We get back to Australian businesses within one business day (AEST).",
  },
  {
    icon: ShieldCheck,
    title: "Talk to people who know WHS",
    body: "Scope a rollout, weigh up ISO certification, or get a compliance-specific answer.",
  },
  {
    icon: MapPin,
    title: "Australian-owned",
    body: "Briesa Pty Ltd · data hosted onshore · NSW construction first.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Talk to us"
        lede="Whether you're scoping a WHS rollout, weighing up ISO certification or just have a question, send us a note and the right person will get back to you."
      />

      <section className="pb-24">
        <div className="web-container grid gap-10 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {POINTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeUp key={p.title} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="flex gap-4 border border-border bg-bg-secondary p-5">
                    <div className="flex size-9 shrink-0 items-center justify-center border border-border bg-bg text-text-secondary">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-text">{p.title}</h3>
                      <p className="mt-1 text-sm text-text-tertiary leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp className="lg:col-span-3">
            <div className="border border-border bg-bg-secondary p-6 sm:p-8">
              <ContactForm />
              <p className="mt-6 text-text-tertiary text-xs">
                By submitting this form you agree to our{" "}
                <a href="/privacy" className="text-text-secondary underline hover:text-text">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
