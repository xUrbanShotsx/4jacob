import { FadeUp, Reveal } from "@/components/motion";
import { NewsletterForm } from "@/components/newsletter-form";

export function NewsletterCta() {
  return (
    <section className="section-padding border-border border-t">
      <div className="web-container">
        <div className="mx-auto max-w-xl text-center">
          <Reveal mode="whileInView">
            <h2 className="text-4xl tracking-tighter md:text-5xl">Stay in the know</h2>
          </Reveal>
          <FadeUp>
            <p className="mt-5 text-balance text-text-secondary leading-relaxed">
              Product updates and practical WHS, GRC and ISO compliance tips for Australian business
              — one short email a week. Free, unsubscribe any time.
            </p>
          </FadeUp>
        </div>
        <FadeUp className="mx-auto mt-10 max-w-xl">
          <div className="border border-border bg-bg-secondary p-6 shadow-black/5 shadow-xl sm:p-8 dark:shadow-black/20">
            <NewsletterForm />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
