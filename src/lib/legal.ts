import type { ComponentType } from "react";
import { PrivacyBody } from "@/components/legal/privacy-body";
import { TermsBody } from "@/components/legal/terms-body";

/**
 * Registry of legal documents served by `app/legal/[slug]`. Each entry owns its
 * slug, SEO metadata, display date and the body component; the route renders the
 * shared chrome around `Body`. Add a new policy by dropping a body component in
 * `components/legal` and appending an entry here — the route, static params,
 * metadata and sitemap pick it up automatically.
 */
export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  /** Human-readable display date (e.g. "17 June 2026"). */
  lastUpdated: string;
  /** Clause that follows "This is a template." in the callout. */
  templateNote: string;
  Body: ComponentType;
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Briesa Pty Ltd collects, uses, stores and protects personal information, in line with the Australian Privacy Principles.",
    lastUpdated: "17 June 2026",
    templateNote:
      "Review it with qualified legal counsel and tailor it to your actual data practices before launch. It does not constitute legal advice.",
    Body: PrivacyBody,
  },
  {
    slug: "terms",
    title: "Terms of Service",
    description:
      "The terms governing your use of the Briesa compliance platform provided by Briesa Pty Ltd, including subscriptions, acceptable use and liability.",
    lastUpdated: "17 June 2026",
    templateNote:
      "Review it with qualified legal counsel and tailor it to your actual commercial terms before launch. It does not constitute legal advice.",
    Body: TermsBody,
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((doc) => doc.slug === slug);
}
