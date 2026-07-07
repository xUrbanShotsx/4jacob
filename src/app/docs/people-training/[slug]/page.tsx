import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleBriefPage } from "@/components/module-brief";
import { getPeopleTrainingModule, PEOPLE_TRAINING_MODULES } from "@/lib/people-training-modules";

type Params = { slug: string };

/** Pre-render one brief page per People & training module; reject any other slug. */
export function generateStaticParams(): Params[] {
  return PEOPLE_TRAINING_MODULES.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const module_ = getPeopleTrainingModule(slug);
  if (!module_) return {};
  return {
    title: `${module_.name} — People & training`,
    description: module_.lede,
    alternates: { canonical: `/docs/people-training/${module_.slug}` },
  };
}

export default async function PeopleTrainingModulePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const module_ = getPeopleTrainingModule(slug);
  if (!module_) notFound();

  return (
    <ModuleBriefPage
      module={module_}
      groupLabel="People & training"
      groupHref="/docs#people-training"
    />
  );
}
