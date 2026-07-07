import type { Metadata } from "next";
import { AboutCta } from "@/components/about/cta";
import { AboutFaq } from "@/components/about/faq";
import { AboutHero } from "@/components/about/hero";
import { Mission } from "@/components/about/mission";
import { Team } from "@/components/about/team";
import { Values } from "@/components/about/values";
import { PullQuote } from "@/components/pull-quote";

export const metadata: Metadata = {
  title: "About",
  description:
    "Briesa is an Australian-owned compliance platform — one place for WHS, governance, risk and ISO certification, built by a small team close to the work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Mission />
      <Values />
      <PullQuote
        quote="We spent years stitching together spreadsheets, inboxes and binders just to prove a site was safe. Briesa is the system we wished we'd had — one place that earns its keep instead of adding to the busywork."
        author="Jordan Avery"
        byline="Co-founder, Briesa"
      />
      <Team />
      <AboutFaq />
      <AboutCta />
    </main>
  );
}
