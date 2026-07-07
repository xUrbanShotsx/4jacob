import type { Metadata } from "next";
import { WaitlistFlow } from "@/components/waitlist/waitlist-flow";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Be among the first to access Briesa — intelligent WHS, GRC and ISO compliance for Australian business. Join the waitlist for early access.",
  alternates: { canonical: "/waitlist" },
};

export default function WaitlistPage() {
  return (
    <main>
      <WaitlistFlow />
    </main>
  );
}
