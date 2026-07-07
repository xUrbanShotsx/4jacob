import type { Metadata } from "next";
import { PricingContent } from "@/components/pricing/pricing-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat, per-organisation pricing for Briesa — no per-user fees. One monthly price by workforce size with all nine WHS modules and training included. Three tiers from $249/mo.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <PricingContent />;
}
