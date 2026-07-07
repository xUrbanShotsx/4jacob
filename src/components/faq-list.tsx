"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, cn } from "@/components/ui";

export type FaqItem = { q: string; a: string };

/** Compact, centred accordion — one question open at a time. */
export function FaqList({ items, className }: { items: readonly FaqItem[]; className?: string }) {
  return (
    <Accordion type="single" className={cn("border-border border-t", className)}>
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q}>
          <AccordionTrigger className="py-5 text-[15px] sm:text-base">{item.q}</AccordionTrigger>
          <AccordionContent className="pb-5 text-[13px] text-text-secondary leading-relaxed sm:text-sm">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
