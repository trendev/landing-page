import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Link } from "@/app/router";
import { FaqItem } from "@/components/FaqItem";
import { FAQ_PATH, faqTeaser, featuredFaqs } from "@/data/faq";

/**
 * Landing-page teaser for the knowledge base.
 *
 * Renders `featuredFaqs` through the same `FaqItem` as /faq, so the two
 * surfaces cannot drift in content or in markup. The full set, the search and
 * the topic filters live on /faq; per the commercial guardrails the landing
 * page links out rather than hosting them.
 */
export function Faq() {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="faq" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl mb-3">{faqTeaser.title}</h2>
          <p className="text-lg text-muted-foreground">{faqTeaser.subtitle}</p>
        </div>

        <div className="space-y-3">
          {featuredFaqs.map((entry, index) => (
            <FaqItem
              key={entry.id}
              entry={entry}
              index={index}
              expanded={expanded.has(entry.id)}
              onToggle={toggle}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={FAQ_PATH}
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-200"
          >
            {faqTeaser.seeAllLabel}
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
