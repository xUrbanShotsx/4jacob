import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleBriefPage } from "@/components/module-brief";
import { getInsightsModule, INSIGHTS_MODULES } from "@/lib/insights-modules";

type Params = { slug: string };

/** Pre-render one brief page per Insights module; reject any other slug. */
export function generateStaticParams(): Params[] {
  return INSIGHTS_MODULES.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const module_ = getInsightsModule(slug);
  if (!module_) return {};
  return {
    title: `${module_.name} — Insights`,
    description: module_.lede,
    alternates: { canonical: `/docs/insights/${module_.slug}` },
  };
}

export default async function InsightsModulePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const module_ = getInsightsModule(slug);
  if (!module_) notFound();

  return <ModuleBriefPage module={module_} groupLabel="Insights" groupHref="/docs#insights" />;
}
