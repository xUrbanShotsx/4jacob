import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleBriefPage } from "@/components/module-brief";
import { getOperationsModule, OPERATIONS_MODULES } from "@/lib/operations-modules";

type Params = { slug: string };

/** Pre-render one brief page per Operations module; reject any other slug. */
export function generateStaticParams(): Params[] {
  return OPERATIONS_MODULES.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const module_ = getOperationsModule(slug);
  if (!module_) return {};
  return {
    title: `${module_.name} — Operations`,
    description: module_.lede,
    alternates: { canonical: `/docs/operations/${module_.slug}` },
  };
}

export default async function OperationsModulePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const module_ = getOperationsModule(slug);
  if (!module_) notFound();

  return (
    <ModuleBriefPage
      module={module_}
      groupLabel="Operations"
      groupHref="/docs#operations-contractors"
    />
  );
}
