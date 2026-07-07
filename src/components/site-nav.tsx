"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { SmartLink } from "@/components/smart-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants, cn, Logo } from "@/components/ui";
import { DEMO_URL } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

type Item = { name: string; href: string };
type Group = { heading: string; items: Item[] };

/** Every submodule now has a real brief page — see `src/lib/safety-modules.ts`,
    `src/lib/people-training-modules.ts`, `src/lib/risk-compliance-modules.ts`,
    `src/lib/insights-modules.ts` and `src/lib/operations-modules.ts`. */
const SAFETY_ITEMS: Item[] = [
  { name: "Incidents", href: "/docs/safety/incidents" },
  { name: "Actions", href: "/docs/safety/actions" },
  { name: "Toolbox", href: "/docs/safety/toolbox" },
  { name: "Prestart", href: "/docs/safety/prestart" },
  { name: "SWMS", href: "/docs/safety/swms" },
  { name: "Permits", href: "/docs/safety/permits" },
  { name: "Safety inspections", href: "/docs/safety/safety-inspections" },
];

const PEOPLE_TRAINING_ITEMS: Item[] = [
  { name: "Inductions", href: "/docs/people-training/inductions" },
  { name: "Contractors", href: "/docs/people-training/contractors" },
  { name: "Health & wellbeing", href: "/docs/people-training/health-wellbeing" },
  { name: "Return to work", href: "/docs/people-training/return-to-work" },
  { name: "Courses", href: "/docs/people-training/courses" },
  { name: "Records", href: "/docs/people-training/records" },
];

const RISK_COMPLIANCE_ITEMS: Item[] = [
  { name: "Hazard register", href: "/docs/risk-compliance/hazard-register" },
  { name: "Risk assessments", href: "/docs/risk-compliance/risk-assessments" },
  { name: "Controls", href: "/docs/risk-compliance/controls" },
  { name: "Audits", href: "/docs/risk-compliance/audits" },
  { name: "Evidence", href: "/docs/risk-compliance/evidence" },
];

const INSIGHTS_ITEMS: Item[] = [
  { name: "KPIs", href: "/docs/insights/kpis" },
  { name: "Reports", href: "/docs/insights/reports" },
  { name: "Dashboards", href: "/docs/insights/dashboards" },
];

const OPERATIONS_ITEMS: Item[] = [
  { name: "Safe work procedures", href: "/docs/operations/safe-work-procedures" },
  { name: "Site access", href: "/docs/operations/site-access" },
  { name: "Work planning", href: "/docs/operations/work-planning" },
  { name: "Defect reporting", href: "/docs/operations/defect-reporting" },
];

/* ── Solutions taxonomy (modules → submodules) ────────────────────────────── */
const PRODUCT_GROUPS: Group[] = [
  {
    heading: "Safety",
    items: SAFETY_ITEMS,
  },
  {
    heading: "People & training",
    items: PEOPLE_TRAINING_ITEMS,
  },
  {
    heading: "Operations",
    items: OPERATIONS_ITEMS,
  },
  {
    heading: "Risk & compliance",
    items: RISK_COMPLIANCE_ITEMS,
  },
  { heading: "Insights", items: INSIGHTS_ITEMS },
];

const PRODUCT_COLUMNS: Group[][] = [
  [PRODUCT_GROUPS[0]],
  [PRODUCT_GROUPS[1], PRODUCT_GROUPS[2]],
  [PRODUCT_GROUPS[3], PRODUCT_GROUPS[4]],
];
const COMING_SOON = ["Open API & webhooks", "Worker Passport"];

const RESOURCES: Item[] = [
  { name: "Documentation", href: "/docs" },
  { name: "Changelog", href: "/changelog" },
  { name: "Newsletter", href: "/newsletter" },
];

const COMPANY: Item[] = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Book a demo", href: DEMO_URL },
  { name: "Join the waitlist", href: "/waitlist" },
  { name: "Privacy Policy", href: "/legal/privacy" },
  { name: "Terms of Service", href: "/legal/terms" },
];

const ISO_TYPES: { code: string; desc: string; href: string }[] = [
  { code: "ISO 9001", desc: "Quality management systems", href: DEMO_URL },
  { code: "ISO 14001", desc: "Environmental management systems", href: DEMO_URL },
  { code: "ISO 27001", desc: "Information security management", href: DEMO_URL },
];

/* ── Shared hover-open behaviour ──────────────────────────────────────────── */
function useHoverMenu() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 100);
  };
  return { open, enter, leave, close: () => setOpen(false), toggle: () => setOpen((v) => !v) };
}

function Trigger({ label, open, onClick }: { label: string; open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-1 px-3 py-2 text-[13px] transition-colors",
        open ? "text-text" : "text-text-secondary hover:text-text",
      )}
    >
      {label}
      <ChevronDown
        className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
      />
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent-text transition-transform duration-300 group-hover:scale-x-100",
          open && "scale-x-100",
        )}
      />
    </button>
  );
}

const panelMotion = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
  transition: { duration: 0.2, ease: EASE },
};

/* A category column: underlined heading + plain-text link list. */
function ColumnGroup({ group, onNavigate }: { group: Group; onNavigate: () => void }) {
  return (
    <div>
      <p className="border-border border-b pb-2 text-[11px] text-text-tertiary">{group.heading}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {group.items.map((it) => (
          <li key={it.name}>
            <SmartLink
              href={it.href}
              onClick={onNavigate}
              className="text-[12.5px] text-text-secondary leading-none transition-colors hover:text-text"
            >
              {it.name}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Solutions mega-menu ──────────────────────────────────────────────────── */
function SolutionsMega() {
  const { open, enter, leave, close, toggle } = useHoverMenu();
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover bridge; focus stays on the trigger button and links
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <Trigger label="Solutions" open={open} onClick={toggle} />
      <AnimatePresence>
        {open && (
          <motion.div
            {...panelMotion}
            style={{ transformOrigin: "top left" }}
            className="absolute top-full left-0 pt-3"
          >
            <div className="w-[720px] max-w-[calc(100vw-2rem)] overflow-hidden border border-border bg-bg shadow-xl shadow-black/5 dark:shadow-black/40">
              <div className="grid grid-cols-3 gap-x-8 gap-y-6 p-5">
                {PRODUCT_COLUMNS.map((column, ci) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed column layout
                  <div key={ci} className="flex flex-col gap-6">
                    {column.map((g) => (
                      <ColumnGroup key={g.heading} group={g} onNavigate={close} />
                    ))}
                    {ci === PRODUCT_COLUMNS.length - 1 && (
                      <div className="mt-auto border border-border bg-bg-secondary p-3.5">
                        <p className="flex items-center gap-1.5 font-mono text-[0.55rem] text-text-tertiary uppercase tracking-wider">
                          <Sparkles className="size-2.5" /> Coming soon
                        </p>
                        <div className="mt-2 flex flex-col gap-0.5">
                          {COMING_SOON.map((c) => (
                            <span key={c} className="text-[12.5px] text-text">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer action bar */}
              <div className="flex items-center gap-3 border-border border-t bg-bg-secondary px-5 py-2.5">
                <SmartLink
                  href={DEMO_URL}
                  onClick={close}
                  className={buttonVariants({ variant: "primary" })}
                >
                  Book a demo
                </SmartLink>
                <span aria-hidden className="h-3.5 w-px bg-border" />
                <Link
                  href="/docs"
                  onClick={close}
                  className="text-[11px] text-text-secondary transition-colors hover:text-text"
                >
                  Learn more
                </Link>
                <span aria-hidden className="h-3.5 w-px bg-border" />
                <Link
                  href="/waitlist"
                  onClick={close}
                  className="text-[11px] text-text-secondary transition-colors hover:text-text"
                >
                  Join the waitlist
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Compact single-column dropdown (Company / Resources) ─────────────────── */
function SleekDropdown({
  label,
  heading,
  items,
}: {
  label: string;
  heading: string;
  items: Item[];
}) {
  const { open, enter, leave, close, toggle } = useHoverMenu();
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover bridge; focus stays on the trigger button and links
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <Trigger label={label} open={open} onClick={toggle} />
      <AnimatePresence>
        {open && (
          <motion.div
            {...panelMotion}
            style={{ transformOrigin: "top left" }}
            className="absolute top-full left-0 pt-3"
          >
            <div className="w-[208px] overflow-hidden border border-border bg-bg p-4 shadow-xl shadow-black/5 dark:shadow-black/40">
              <ColumnGroup group={{ heading, items }} onNavigate={close} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── ISO Blueprints — flagship feature, on-brand gradient pill + dropdown ──── */
function BlueprintsMenu() {
  const { open, enter, leave, close, toggle } = useHoverMenu();
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover bridge; focus stays on the trigger button and links
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        aria-expanded={open}
        onClick={toggle}
        className={cn(
          "group relative flex items-center gap-1 px-3 py-2 text-[13px] transition-colors",
          open ? "text-text" : "text-text-secondary hover:text-text",
        )}
      >
        <Sparkles className="size-3.5 text-accent-text transition-transform duration-300 group-hover:rotate-12" />
        ISO Blueprints
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
        />
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent-text transition-transform duration-300 group-hover:scale-x-100",
            open && "scale-x-100",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            {...panelMotion}
            style={{ transformOrigin: "top right" }}
            className="absolute top-full right-0 pt-3"
          >
            <div className="w-[296px] overflow-hidden border border-border bg-bg p-1.5 shadow-xl shadow-black/5 dark:shadow-black/40">
              <p className="px-2.5 pt-1.5 pb-1 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                AI-generated ISO documentation
              </p>
              {ISO_TYPES.map((t) => (
                <SmartLink
                  key={t.code}
                  href={t.href}
                  onClick={close}
                  className="flex flex-col px-2.5 py-2 transition-colors hover:bg-bg-secondary"
                >
                  <span className="text-[13px] text-text leading-tight">{t.code}</span>
                  <span className="mt-0.5 text-[11px] text-text-tertiary leading-snug">
                    {t.desc}
                  </span>
                </SmartLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile sheet ─────────────────────────────────────────────────────────── */
const MOBILE_GROUPS: Group[] = [
  ...PRODUCT_GROUPS,
  { heading: "Resources", items: RESOURCES },
  { heading: "Company", items: COMPANY },
];

function MobilePanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: EASE }}
      className="absolute inset-x-0 top-full mt-2 origin-top overflow-hidden border border-border bg-bg shadow-2xl shadow-black/5 md:hidden dark:shadow-black/40"
    >
      <div className="flex max-h-[72vh] flex-col gap-6 overflow-y-auto p-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/pricing"
            onClick={onClose}
            className="text-lg tracking-tight transition-colors hover:text-text-secondary"
          >
            Pricing
          </Link>
          <SmartLink
            href={DEMO_URL}
            onClick={onClose}
            className="flex items-center gap-1.5 text-lg tracking-tight transition-colors hover:text-text-secondary"
          >
            <Sparkles className="size-4" /> ISO Blueprints
          </SmartLink>
        </div>
        {MOBILE_GROUPS.map((g) => (
          <div key={g.heading}>
            <p className="border-border border-b pb-2 text-[13px] text-text-tertiary">
              {g.heading}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {g.items.map((it) => (
                <SmartLink
                  key={it.name}
                  href={it.href}
                  onClick={onClose}
                  className="text-[13.5px] text-text-secondary transition-colors hover:text-text"
                >
                  {it.name}
                </SmartLink>
              ))}
            </div>
          </div>
        ))}
        <div className="flex gap-2.5 border-border border-t pt-5">
          <SmartLink
            href={DEMO_URL}
            onClick={onClose}
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "flex-1")}
          >
            Get a demo
          </SmartLink>
          <Link
            href="/waitlist"
            onClick={onClose}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "flex-1")}
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Header (floating pill shell) ─────────────────────────────────────────── */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const goingDown = y > lastY.current;
    setHidden(y > 120 && goingDown && !open);
    lastY.current = y;
  });

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -16 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ pointerEvents: hidden ? "none" : "auto" }}
      className="fixed inset-x-0 top-[var(--banner-h)] z-40 px-4 pt-4"
    >
      <div className="relative mx-auto max-w-[80rem]">
        <nav className="flex h-[58px] items-center justify-between gap-4 border border-border bg-bg/90 px-2 shadow-black/5 shadow-lg backdrop-blur-md dark:bg-bg-secondary/85 dark:shadow-black/30">
          <div className="flex items-center gap-1">
            <Link
              href="/"
              aria-label="Briesa home"
              className="flex shrink-0 items-center gap-2 px-2"
            >
              <Logo size={24} />
              <span className="font-medium text-[17px] tracking-tight">Briesa</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-0.5 md:flex">
              <SolutionsMega />
              <Link
                href="/pricing"
                className={cn(
                  "group relative px-3 py-2 text-[13px] transition-colors hover:text-text",
                  pathname.startsWith("/pricing") ? "text-text" : "text-text-secondary",
                )}
              >
                Pricing
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent-text transition-transform duration-300 group-hover:scale-x-100",
                    pathname.startsWith("/pricing") && "scale-x-100",
                  )}
                />
              </Link>
              <SleekDropdown label="Company" heading="Company" items={COMPANY} />
              <SleekDropdown label="Resources" heading="Resources" items={RESOURCES} />
              <BlueprintsMenu />
            </div>
            <span aria-hidden className="hidden h-5 w-px bg-border md:block" />
            <SmartLink
              href={DEMO_URL}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "hidden sm:inline-flex",
              )}
            >
              Get a demo
            </SmartLink>
            <Link
              href="/waitlist"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "hidden sm:inline-flex",
              )}
            >
              Join the waitlist
            </Link>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="px-2 py-2 font-mono text-[0.625rem] text-text-secondary uppercase tracking-wider transition-colors hover:text-text md:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>

        <AnimatePresence>{open && <MobilePanel onClose={() => setOpen(false)} />}</AnimatePresence>
      </div>
    </motion.header>
  );
}
