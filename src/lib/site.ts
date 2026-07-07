import { INSIGHTS_MODULES } from "@/lib/insights-modules";
import { PEOPLE_TRAINING_MODULES } from "@/lib/people-training-modules";
import { RISK_COMPLIANCE_MODULES } from "@/lib/risk-compliance-modules";
import { SAFETY_MODULES } from "@/lib/safety-modules";

/** Canonical site metadata, reused across SEO metadata, JSON-LD, and the sitemap. */
export const SITE = {
  name: "Briesa",
  legalName: "Briesa Pty Ltd",
  url: "https://briesa.com",
  title: "Briesa — Compliance, unified",
  description: "Unified WHS, GRC & ISO certification platform for Australian business.",
  locale: "en_AU",
  twitter: "@briesa",
} as const;

/** The interactive demo app — external, opens in a new tab. */
export const DEMO_URL = "https://demo.briesa.com";

/** Public, indexable routes — drives the sitemap. */
export const SITE_ROUTES = [
  "/",
  "/about",
  "/pricing",
  "/docs",
  ...SAFETY_MODULES.map((m) => `/docs/safety/${m.slug}`),
  ...PEOPLE_TRAINING_MODULES.map((m) => `/docs/people-training/${m.slug}`),
  ...RISK_COMPLIANCE_MODULES.map((m) => `/docs/risk-compliance/${m.slug}`),
  ...INSIGHTS_MODULES.map((m) => `/docs/insights/${m.slug}`),
  "/changelog",
  "/contact",
  "/newsletter",
  "/legal/privacy",
  "/legal/terms",
] as const;
