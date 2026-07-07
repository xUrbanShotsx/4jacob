import type { Metadata } from "next";
import { ChangelogTimeline } from "@/components/changelog/timeline";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every release of the Briesa compliance platform — new modules, improvements and fixes across WHS, governance, risk and ISO.",
  alternates: { canonical: "/changelog" },
};

export default function ChangelogPage() {
  return (
    <main>
      <PageHero
        eyebrow="What's new"
        title="Changelog"
        lede="Every release of the Briesa platform — what shipped, and when."
      />
      <ChangelogTimeline />
    </main>
  );
}
