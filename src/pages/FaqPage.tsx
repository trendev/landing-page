import { useEffect, useRef, useState } from "react";

import { useHash } from "@/app/router";
import { BackLink } from "@/components/BackLink";
import { FaqItem } from "@/components/FaqItem";
import { FaqSearch } from "@/components/FaqSearch";
import { faqEntries, faqIntro, getFaqEntry } from "@/data/faq";
import { PRIMARY_CTA_LABEL } from "@/data/pricing";
import { ALL_TOPICS, filterFaqs, type TopicFilter } from "@/lib/faqSearch";
import { stripInline } from "@/lib/inlineMarkup";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

/**
 * FAQPage structured data, emitted from this component rather than from
 * index.html.
 *
 * index.html is copied verbatim into every route directory by deploy.yml, so a
 * static FAQPage block there would assert that /privacy, /terms and /welcome
 * are FAQ pages too (which is what the outgoing hand-written block did). It had
 * also already drifted from the copy it described, on a repo with no tests to
 * catch it. Emitting from the data makes it per-route correct by construction
 * and impossible to desynchronise. Google executes JS for indexing, and this
 * site is client-rendered anyway, so the markup appears exactly when the
 * content it describes does.
 */
const FAQ_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://trendev.fr/faq",
  mainEntity: faqEntries.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: [...entry.answer, ...(entry.bullets ?? [])]
        .map(stripInline)
        .join(" "),
    },
  })),
  // Cheap defence against a "</script>" ever appearing in the copy.
}).replace(/</g, "\\u003c");

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface FaqPageProps {
  onOpenConsultation: () => void;
}

export function FaqPage({ onOpenConsultation }: FaqPageProps) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicFilter>(ALL_TOPICS);
  // Multi-open by design: with 44 entries and a search box, slamming the
  // previous answer shut when you open the next one is hostile.
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());
  const [arrivedId, setArrivedId] = useState<string | null>(null);
  const hash = useHash();
  /**
   * Distinguishes arriving on /faq#slug from following a link once already
   * here. It decides the scroll behaviour, and the difference is not cosmetic:
   * see the scroll call below.
   */
  const isInitialHash = useRef(true);

  useDocumentMeta({
    title: faqIntro.metaTitle,
    description: faqIntro.metaDescription,
    canonicalPath: "/faq",
  });

  /**
   * Deep-link arrival: /faq#slug expands the targeted answer, scrolls to it and
   * moves focus there.
   *
   * This runs for all four paths, because `useHash` is notified by navigate(),
   * by hashchange and by popstate: a cold full-page load (where the router
   * never runs at all and the browser's own anchor jump happened before React
   * mounted), a link clicked from another page, a link clicked while already on
   * /faq, and the Back button.
   */
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id || !getFaqEntry(id)) return;

    // A deep link must never land on a card a stale filter has removed.
    setQuery("");
    setTopic(ALL_TOPICS);
    setExpanded((previous) => new Set(previous).add(id));
    setArrivedId(id);

    /*
     * Smooth only for in-page moves, never on arrival.
     *
     * Arriving on /faq#slug can mean scrolling a couple of thousand pixels, and
     * a smooth scroll of that length is both slower than the reader wants
     * (they asked for one answer, not a tour of the other 43) and genuinely
     * fragile: it is animation-driven, so it stalls part-finished if the tab is
     * not visible. That is the common case for a shared link, which people open
     * in a background tab. An instant jump cannot stall. Following a `related`
     * link while already reading keeps the smooth scroll, where the short
     * distance is what makes the movement legible.
     */
    const behavior =
      isInitialHash.current || prefersReducedMotion() ? "auto" : "smooth";
    isInitialHash.current = false;

    const frame = requestAnimationFrame(() => {
      document.getElementById(`${id}-q`)?.focus({ preventScroll: true });
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    });
    // Clear the one-shot sweep so it does not replay when the card re-mounts
    // after a later search.
    const timer = window.setTimeout(() => setArrivedId(null), 1400);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [hash]);

  const visible = filterFaqs(faqEntries, query, topic);

  const toggle = (id: string) =>
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const clearFilters = () => {
    setQuery("");
    setTopic(ALL_TOPICS);
  };

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }}
      />
      <div className="max-w-3xl mx-auto">
        <BackLink className="mb-6" />

        <header className="text-center mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
            {faqIntro.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl mb-3">{faqIntro.title}</h1>
          <p className="text-muted-foreground leading-relaxed">
            {faqIntro.subtitle}
          </p>
        </header>

        <FaqSearch
          query={query}
          onQueryChange={setQuery}
          topic={topic}
          onTopicChange={setTopic}
          resultCount={visible.length}
        />

        {visible.length > 0 ? (
          <div className="space-y-3 mt-8">
            {visible.map((entry, index) => (
              <FaqItem
                key={entry.id}
                entry={entry}
                index={index}
                expanded={expanded.has(entry.id)}
                arrived={arrivedId === entry.id}
                onToggle={toggle}
              />
            ))}
          </div>
        ) : (
          /* The highest-intent moment on the page: someone looked for an answer
             and did not find it. Consultation funnel only, per the two-funnel
             rule: no prices and no subscribe link here. */
          <div className="glass rounded-2xl p-8 mt-8 text-center">
            <p className="text-lg mb-2">{faqIntro.emptyHeading}</p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {faqIntro.emptyBody}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-lg glass text-sm hover:border-white/25 transition-colors cursor-pointer"
              >
                {faqIntro.clearLabel}
              </button>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm hover:opacity-90 transition-opacity cursor-pointer"
              >
                {PRIMARY_CTA_LABEL}
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <BackLink />
        </div>
      </div>
    </section>
  );
}
