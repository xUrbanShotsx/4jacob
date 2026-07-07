import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleBriefPage } from "@/components/module-brief";
import { getSafetyModule, SAFETY_MODULES } from "@/lib/safety-modules";

type Params = { slug: string };

/** Pre-render one brief page per Safety module; reject any other slug. */
export function generateStaticParams(): Params[] {
  return SAFETY_MODULES.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const module_ = getSafetyModule(slug);
  if (!module_) return {};
  return {
    title: `${module_.name} — Safety`,
    description: module_.lede,
    alternates: { canonical: `/docs/safety/${module_.slug}` },
  };
}

export default async function SafetyModulePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const module_ = getSafetyModule(slug);
  if (!module_) notFound();

  return <ModuleBriefPage module={module_} groupLabel="Safety" groupHref="/docs#safety" />;
}
