import type { ReactNode } from "react";

import { Link } from "@/app/router";

/**
 * The smallest possible inline markup for copy that lives in `src/data`.
 *
 * Supports exactly two things: `**bold**` and `[text](/href)`. No nesting, no
 * escaping, no lists, no code spans. That is deliberate. The site ships with no
 * Markdown dependency, and the alternative (modelling every emphasised phrase
 * as an object literal in the data file) makes ~44 hand-authored FAQ answers
 * miserable to write and to review. If an answer needs more structure than bold
 * and a link, it needs `bullets`, not more grammar.
 *
 * `renderInline` is the React rendering; `stripInline` produces the plain-text
 * form used for the search haystack and the FAQPage JSON-LD, so neither of them
 * ever matches on markup characters or on the inside of an href.
 */

/** `**bold**` | `[text](href)`. Both alternatives are captured in one pass. */
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Internal hrefs go through the router's `Link` so they navigate client-side;
 * anything else is treated as external and opens in a new tab.
 *
 * Note this also enforces the site-wide "always `/faq#x`, never `#x`" rule
 * structurally: a bare `#hash` href is not internal by this test, so it would
 * render as an external link and be obvious in review. `Link` itself ignores
 * bare hashes (router.tsx), which is exactly the bug this avoids.
 */
function isInternal(href: string): boolean {
  return href.startsWith("/");
}

export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  // `INLINE` is a module-level /g regex, so reset before every use.
  INLINE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));

    const [, bold, linkText, href] = match;
    if (bold !== undefined) {
      nodes.push(<strong key={key++}>{bold}</strong>);
    } else if (linkText !== undefined && href !== undefined) {
      nodes.push(
        isInternal(href) ? (
          <Link
            key={key++}
            href={href}
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            {linkText}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            {linkText}
          </a>
        ),
      );
    }
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/** Same grammar, markers removed: `**x**` -> `x`, `[t](/h)` -> `t`. */
export function stripInline(text: string): string {
  return text.replace(INLINE, (_full, bold, linkText) =>
    bold !== undefined ? bold : linkText,
  );
}
