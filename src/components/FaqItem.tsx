import { ChevronDown, Link2 } from "lucide-react";
import type { CSSProperties } from "react";

import { Link } from "@/app/router";
import { FAQ_PATH, faqTopicLabels, getFaqEntry } from "@/data/faq";
import { renderInline } from "@/lib/inlineMarkup";
import type { FaqEntry } from "@/types";

interface FaqItemProps {
  entry: FaqEntry;
  /** Position in the rendered list; drives the staggered entrance delay. */
  index: number;
  expanded: boolean;
  /** True for the card a /faq#slug deep link just landed on (one-shot sweep). */
  arrived?: boolean;
  onToggle: (id: string) => void;
  /** h2 on the landing teaser (under the section h2 is an h3 there); h3 on /faq. */
  headingLevel?: "h2" | "h3";
}

export function FaqItem({
  entry,
  index,
  expanded,
  arrived = false,
  onToggle,
  headingLevel = "h3",
}: FaqItemProps) {
  const Heading = headingLevel;
  const questionId = `${entry.id}-q`;
  const panelId = `${entry.id}-panel`;
  const related = (entry.related ?? [])
    .map(getFaqEntry)
    .filter((item): item is FaqEntry => item !== undefined);

  return (
    /*
     * The id lives on the always-rendered card, never on the panel, so
     * getElementById resolves whether or not the expansion state has committed.
     * scroll-mt-28 clears the fixed header for both scrollIntoView and a native
     * browser anchor jump.
     */
    <article
      id={entry.id}
      data-expanded={expanded}
      data-arrived={arrived}
      style={{ "--faq-index": index } as CSSProperties}
      className="faq-card glass rounded-xl scroll-mt-28 relative overflow-hidden transition-colors hover:border-white/20"
    >
      <span
        aria-hidden="true"
        className="faq-sweep pointer-events-none absolute inset-0 rounded-xl"
      />
      <span
        aria-hidden="true"
        className="faq-rail pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-accent"
      />

      <Heading>
        <button
          type="button"
          id={questionId}
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => onToggle(entry.id)}
          className="w-full text-left flex items-start gap-4 p-5 sm:p-6 cursor-pointer group"
        >
          <span className="flex-1 min-w-0">
            <span className="block text-base sm:text-lg text-foreground">
              {entry.question}
            </span>
            <span
              className={`block text-xs mt-1.5 transition-colors ${
                expanded ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {faqTopicLabels[entry.topic]}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`w-5 h-5 shrink-0 mt-0.5 text-muted-foreground transition-transform duration-300 group-hover:text-foreground ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </Heading>

      {/*
       * Always rendered, never unmounted: collapsed answers must stay in the
       * DOM for crawlers, and the site is fully client-rendered so there is no
       * server HTML to fall back on. `inert` (not `hidden`) does the hiding,
       * because `hidden` cannot be transitioned; inert still removes the panel
       * from the accessibility tree and from the tab order.
       */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={questionId}
        inert={!expanded}
        className="faq-panel"
      >
        <div>
          <div className="faq-answer px-5 sm:px-6 pb-5 sm:pb-6 space-y-3">
            {entry.answer.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed"
              >
                {renderInline(paragraph)}
              </p>
            ))}

            {entry.bullets && (
              <ul className="space-y-2.5 pt-1">
                {entry.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"
                    />
                    <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {renderInline(bullet)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
              {/*
               * The only thing that writes the URL. Toggling a card deliberately
               * does not push history: 44 toggles would turn Back into an
               * unusable ratchet. This is also the copy-link affordance people
               * expect on a knowledge base.
               */}
              <Link
                href={`${FAQ_PATH}#${entry.id}`}
                aria-label={`Link to: ${entry.question}`}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                <Link2 aria-hidden="true" className="w-3.5 h-3.5" />
                Link to this answer
              </Link>

              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`${FAQ_PATH}#${item.id}`}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-accent"
                >
                  {item.question}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
