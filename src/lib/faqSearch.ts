import { faqEntries, faqTopicLabels } from "@/data/faq";
import { stripInline } from "@/lib/inlineMarkup";
import type { FaqEntry, FaqTopicId } from "@/types";

/**
 * Search and filtering for /faq. Pure functions, no React, no dependency.
 *
 * With ~44 entries a linear scan is the right answer: an index, a ranking
 * function or a fuzzy library would all cost more to reason about than they
 * save, and a relevance order you cannot explain is worse than document order
 * on a list this browsable.
 */

export const ALL_TOPICS = "all" as const;
export type TopicFilter = FaqTopicId | typeof ALL_TOPICS;

/**
 * Lowercase and strip diacritics, so "résumé" and "resume" match either way
 * round. Applied to the haystack once at module load, and to the query once per
 * keystroke.
 */
export function foldText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/**
 * Everything a question can be found by: the question, the answer prose, the
 * bullets, the hidden keywords and the topic label.
 *
 * The answers are searched deliberately. The words people actually type ("VAT",
 * "cancel", "NDA", "Kubernetes") mostly live in answers, not in question
 * titles, so a question-only search would miss most real queries.
 *
 * `stripInline` runs first so markup never matches: a search for "terms" must
 * not hit the `/terms` inside a link href, and `**` must never count as text.
 */
function buildHaystack(entry: FaqEntry): string {
  return foldText(
    [
      entry.question,
      ...entry.answer,
      ...(entry.bullets ?? []),
      ...(entry.keywords ?? []),
      faqTopicLabels[entry.topic],
    ]
      .map(stripInline)
      .join("\n"),
  );
}

/** id -> folded haystack. Built once; the data is constant. */
const haystacks: ReadonlyMap<string, string> = new Map(
  faqEntries.map((entry) => [entry.id, buildHaystack(entry)]),
);

/**
 * Token AND, substring per token. "cancel" matches "cancellation", and
 * "advisor plus" matches regardless of word order. No stemming and no fuzzy
 * matching: both introduce surprising misses that are hard to explain.
 */
function matchesQuery(entry: FaqEntry, foldedTokens: string[]): boolean {
  if (foldedTokens.length === 0) return true;
  const haystack = haystacks.get(entry.id) ?? "";
  return foldedTokens.every((token) => haystack.includes(token));
}

export function filterFaqs(
  entries: FaqEntry[],
  query: string,
  topic: TopicFilter,
): FaqEntry[] {
  const foldedTokens = foldText(query).split(/\s+/).filter(Boolean);
  return entries.filter(
    (entry) =>
      (topic === ALL_TOPICS || entry.topic === topic) &&
      matchesQuery(entry, foldedTokens),
  );
}
