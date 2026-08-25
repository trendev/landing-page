import { Search, X } from "lucide-react";

import { faqEntries, faqIntro, faqTopicCounts, faqTopics } from "@/data/faq";
import { ALL_TOPICS, type TopicFilter } from "@/lib/faqSearch";

interface FaqSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  topic: TopicFilter;
  onTopicChange: (topic: TopicFilter) => void;
  resultCount: number;
}

const SEARCH_INPUT_ID = "faq-search";
const RESULT_COUNT_ID = "faq-result-count";

export function FaqSearch({
  query,
  onQueryChange,
  topic,
  onTopicChange,
  resultCount,
}: FaqSearchProps) {
  const total = faqEntries.length;

  const pillClass = (active: boolean) =>
    `px-3.5 py-1.5 rounded-full text-sm border transition-all duration-200 cursor-pointer active:scale-95 ${
      active
        ? "bg-accent text-accent-foreground border-accent"
        : "glass border-white/12 text-muted-foreground hover:text-foreground hover:border-white/25"
    }`;

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* A placeholder is not a label. */}
        <label htmlFor={SEARCH_INPUT_ID} className="sr-only">
          {faqIntro.searchLabel}
        </label>
        <Search
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
        />
        <input
          id={SEARCH_INPUT_ID}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") onQueryChange("");
          }}
          placeholder={faqIntro.searchPlaceholder}
          aria-describedby={RESULT_COUNT_ID}
          className="glass w-full rounded-full pl-11 pr-11 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent/60 [&::-webkit-search-cancel-button]:appearance-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X aria-hidden="true" className="w-4 h-4" />
          </button>
        )}
      </div>

      {/*
       * A group of toggle buttons, not a tablist: the pills share one list
       * rather than each owning a panel, and a tablist's roving tabindex would
       * fight the search field beside them. aria-pressed is the right semantic
       * for a sticky filter.
       */}
      <div
        role="group"
        aria-label="Filter by topic"
        className="flex flex-wrap justify-center gap-2"
      >
        <button
          type="button"
          aria-pressed={topic === ALL_TOPICS}
          onClick={() => onTopicChange(ALL_TOPICS)}
          className={pillClass(topic === ALL_TOPICS)}
        >
          {faqIntro.allTopicsLabel}
          <span className="opacity-60 ml-1.5 tabular-nums">{total}</span>
        </button>
        {faqTopics.map((item) => {
          const active = topic === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              /* Clicking the active pill returns to All. */
              onClick={() => onTopicChange(active ? ALL_TOPICS : item.id)}
              className={pillClass(active)}
            >
              {item.label}
              {/* Counts come from the full set, never the filtered one: a
                  count that changes as you type is noise. */}
              <span className="opacity-60 ml-1.5 tabular-nums">
                {faqTopicCounts[item.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Rendered unconditionally: a live region mounted by the change it
          announces does not announce. */}
      <p
        id={RESULT_COUNT_ID}
        aria-live="polite"
        className="text-center text-xs text-muted-foreground tabular-nums"
      >
        Showing {resultCount} of {total} questions
      </p>
    </div>
  );
}
