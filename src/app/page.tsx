import type { Metadata } from "next";
import { AiToolbox } from "@/components/home/ai-toolbox";
import { Cta } from "@/components/home/cta";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Industries } from "@/components/home/industries";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import { Personas } from "@/components/home/personas";
import { Showcase } from "@/components/home/showcase";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { TrustStrip } from "@/components/home/trust-strip";

export const metadata: Metadata = {
  description:
    "Briesa unifies WHS, GRC and ISO certification in one platform for Australian business — priced per organisation, with training included.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Showcase />
      <Features />
      <Industries />
      <AiToolbox />
      <Stats />
      <Testimonials />
      <Personas />
      <Cta />
      <Faq />
      <NewsletterCta />
    </main>
  );
}
