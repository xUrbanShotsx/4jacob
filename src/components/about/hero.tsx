import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants } from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

export function AboutHero() {
  return (
    <PageHero
      align="left"
      eyebrow="About Briesa"
      title={
        <>
          Built in Australia,{" "}
          <span className="text-text-secondary">for the people doing the work.</span>
        </>
      }
      lede="Briesa started on construction sites, not in a boardroom. We're building one platform that takes a business from the daily site pre-start all the way to ISO certification — without the spreadsheet sprawl."
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <SmartLink href={DEMO_URL} className={buttonVariants({ variant: "primary", size: "lg" })}>
          Get a demo
        </SmartLink>
        <Link href="/pricing" className={buttonVariants({ variant: "secondary", size: "lg" })}>
          See pricing
        </Link>
      </div>
    </PageHero>
  );
}
