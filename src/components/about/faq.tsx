"use client";

import { type FaqItem, FaqList } from "@/components/faq-list";
import { FadeUp, Reveal } from "@/components/motion";

const FAQS: readonly FaqItem[] = [
  {
    q: "Who is Briesa for?",
    a: "Australian businesses that carry real WHS and compliance obligations — construction first, with the same backbone serving any operation that runs sites, crews and contractors.",
  },
  {
    q: "Where is our data hosted?",
    a: "Onshore in Australia. Briesa is Australian-owned and built for Australian WHS law, so your compliance record never has to leave the country.",
  },
  {
    q: "How does pricing work?",
    a: "You're priced per organisation by the tier you choose. Field workers, contractors and visitors are unlimited on every tier — you're never penalised for getting more people onto safe systems of work.",
  },
  {
    q: "Do we have to adopt everything at once?",
    a: "No. The modules share one source of truth but you can start with daily site safety and switch on governance, risk and certification as you grow.",
  },
  {
    q: "Are you hiring?",
    a: "We're growing the team carefully. If you want to work directly with the founders and ship fast, check the open roles above and get in touch.",
  },
];

export function AboutFaq() {
  return (
    <section className="section-padding border-border border-t">
      <div className="web-container">
        <div className="grid gap-10 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2">
            <div className="md:sticky md:top-28">
              <span className="block font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
                FAQ
              </span>
              <Reveal className="mt-4">
                <h2 className="text-balance text-3xl tracking-tighter md:text-4xl lg:text-5xl">
                  Your questions, answered.
                </h2>
              </Reveal>
              <FadeUp className="mt-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Everything you need to know about who we are and how Briesa works. Still curious?
                  Reach out anytime.
                </p>
              </FadeUp>
            </div>
          </div>
          <div className="md:col-span-3">
            <FaqList items={FAQS} />
          </div>
        </div>
      </div>
    </section>
  );
}
