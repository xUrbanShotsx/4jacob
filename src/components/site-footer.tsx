import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FadeUp, Stagger } from "@/components/motion";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants, Logo } from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

/* Editorial-minimal footer — the page's deliberate closing moment. Hairline
   rules carry the structure, mono microlabels echo the floating header, and an
   oversized wordmark lands the page. Monochrome throughout: green is reserved
   for the two CTA buttons only — every other surface is the neutral scale. */

type NavColumn = { heading: string; links: { label: string; href: string }[] };

const COLUMNS: NavColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Overview", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Documentation", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
      { label: "Book a demo", href: DEMO_URL },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Daily site safety", href: "/docs" },
      { label: "Risk & compliance", href: "/docs" },
      { label: "People & training", href: "/docs" },
      { label: "Insights & reporting", href: "/docs" },
      { label: "Blueprints AI", href: "/docs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Join the waitlist", href: "/waitlist" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-border border-t bg-bg-secondary">
      <div className="web-container">
        {/* ── Statement band: brand line + a single, confident CTA ────────── */}
        <Stagger className="grid gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-14">
          <FadeUp asChild className="md:col-span-7 lg:col-span-8">
            <div>
              <Link href="/" aria-label="Briesa home" className="inline-flex items-center gap-3">
                <Logo size={32} />
                <span className="font-medium text-xl tracking-tight">Briesa</span>
              </Link>
              <p className="mt-7 max-w-xl text-balance text-2xl text-text-secondary leading-snug tracking-tight md:text-3xl">
                Compliance, <span className="text-text">unified.</span>
              </p>
              <p className="mt-5 max-w-md text-sm text-text-tertiary leading-relaxed">
                Unified WHS, GRC &amp; ISO certification for Australian business — from the daily
                site pre-start to certification, in one system.
              </p>
            </div>
          </FadeUp>

          <FadeUp
            asChild
            className="flex flex-col gap-4 md:col-span-5 md:items-end md:text-right lg:col-span-4"
          >
            <div className="flex flex-col gap-4 md:items-end">
              <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                Start your compliance program
              </p>
              <div className="flex flex-wrap gap-2.5 md:justify-end">
                <SmartLink
                  href={DEMO_URL}
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  Book a demo
                </SmartLink>
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "secondary", size: "lg" })}
                >
                  Talk to sales
                </Link>
              </div>
              <a
                href="mailto:hello@briesa.com.au"
                className="group inline-flex w-fit items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text"
              >
                <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-border-hover">
                  hello@briesa.com.au
                </span>
                <ArrowUpRight className="-translate-x-1 size-3.5 text-text-tertiary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
            </div>
          </FadeUp>
        </Stagger>

        {/* ── Hairline rule ───────────────────────────────────────────────── */}
        <div className="h-px bg-border" />

        {/* ── Navigation + provenance card ────────────────────────────────── */}
        <Stagger className="grid grid-cols-2 gap-x-8 gap-y-12 py-10 sm:grid-cols-4 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <FadeUp asChild key={col.heading}>
              <nav aria-label={col.heading}>
                <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                  {col.heading}
                </p>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text"
                      >
                        {link.label}
                        <ArrowUpRight className="-translate-x-1 size-3 text-text-tertiary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </FadeUp>
          ))}

          {/* Provenance — a quiet card of where Briesa runs. Anchors the grid. */}
          <FadeUp asChild className="col-span-2 sm:col-span-4 lg:col-span-1 lg:col-start-4">
            <div className="flex h-full flex-col border border-border bg-bg p-5 shadow-black/5 shadow-sm dark:shadow-black/30">
              <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                Where it runs
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-text-secondary">
                <span aria-hidden className="size-1.5 bg-text-tertiary" />
                Sydney, Australia
              </p>
              <p className="mt-1.5 text-text-tertiary text-xs leading-relaxed">
                Built and hosted in Australia. Join the waitlist for early access.
              </p>
              <Link
                href="/waitlist"
                className="group mt-auto inline-flex w-fit items-center gap-1.5 pt-4 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider transition-colors hover:text-text"
              >
                Join the waitlist
                <ArrowUpRight className="-translate-x-1 size-3 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </div>
          </FadeUp>
        </Stagger>

        {/* ── Hairline rule ───────────────────────────────────────────────── */}
        <div className="h-px bg-border" />

        {/* ── Oversized faded wordmark — the deliberate final beat ─────────── */}
        <FadeUp className="overflow-clip pt-8">
          <p
            aria-hidden
            className="-mb-[0.12em] select-none font-medium text-[26vw] text-text/10 leading-[0.78] tracking-tighter md:text-[22vw] lg:text-[clamp(9rem,18vw,16rem)]"
          >
            Briesa
          </p>
        </FadeUp>
      </div>

      {/* ── Legal bar ───────────────────────────────────────────────────────── */}
      <div className="border-border border-t">
        <div className="web-container flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-tertiary text-xs">
            © 2026 Briesa Pty Ltd. All rights reserved.{" "}
            <span className="text-text-muted">ABN 68 461 702 776.</span>
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/legal/privacy"
              className="text-text-tertiary text-xs transition-colors hover:text-text"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="text-text-tertiary text-xs transition-colors hover:text-text"
            >
              Terms
            </Link>
            <span aria-hidden className="hidden h-3 w-px bg-border sm:block" />
            <span className="font-mono text-[0.6rem] text-text-muted uppercase tracking-wider">
              Compliance, unified.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
