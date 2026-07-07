import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleBriefPage } from "@/components/module-brief";
import { getRiskComplianceModule, RISK_COMPLIANCE_MODULES } from "@/lib/risk-compliance-modules";

type Params = { slug: string };

/** Pre-render one brief page per Risk & compliance module; reject any other slug. */
export function generateStaticParams(): Params[] {
  return RISK_COMPLIANCE_MODULES.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const module_ = getRiskComplianceModule(slug);
  if (!module_) return {};
  return {
    title: `${module_.name} — Risk & compliance`,
    description: module_.lede,
    alternates: { canonical: `/docs/risk-compliance/${module_.slug}` },
  };
}

export default async function RiskComplianceModulePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const module_ = getRiskComplianceModule(slug);
  if (!module_) notFound();

  return (
    <ModuleBriefPage
      module={module_}
      groupLabel="Risk & compliance"
      groupHref="/docs#risk-compliance"
    />
  );
}
