import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDoc, LEGAL_DOCS } from "@/lib/legal";

type Params = { slug: string };

/** Pre-render one page per registered legal document; reject any other slug. */
export function generateStaticParams(): Params[] {
  return LEGAL_DOCS.map((doc) => ({ slug: doc.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/legal/${doc.slug}` },
  };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();
  const { Body } = doc;

  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-20 md:pt-32">
        <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
          <span className="h-px w-6 bg-border-strong" />
          Legal
        </span>
        <h1 className="mt-4 text-balance text-4xl tracking-tighter md:text-5xl">{doc.title}</h1>
        <p className="mt-4 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
          Last updated {doc.lastUpdated}
        </p>

        <div className="mt-8 border border-accent-border bg-accent-bg p-5">
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text">This is a template.</span> {doc.templateNote}
          </p>
        </div>

        <Body />
      </section>
    </main>
  );
}
