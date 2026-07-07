import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <PageHero
        eyebrow="Error 404"
        title="This page wandered off"
        lede="The page you're after doesn't exist, or it may have moved. Let's get you back on track."
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonVariants({ variant: "primary", size: "lg" })}>
            Back to home
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Contact us
          </Link>
        </div>
      </PageHero>
    </main>
  );
}
