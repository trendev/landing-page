import type { TermsVersion } from "@/types";

/**
 * Terms of Service version registry (issue #15).
 *
 * IMMUTABILITY RULE: a dated terms module must NEVER be edited in substance
 * once its PDF is committed and the version is (or was) purchasable — clients
 * accepted that exact text. Publishing a change means: add a new dated module,
 * register it here, generate + commit its PDF (scripts/generate-terms-pdf.mjs),
 * mark the old version "superseded" (status only), and add the new route to
 * .github/workflows/deploy.yml. See docs/legal-versioning.md.
 *
 * LAZY BY DESIGN: a dated module is ~16 kB of legal prose that only /terms and
 * /terms/<date> ever render, and this registry only ever grows, because
 * versions are added and never removed. Loading them through dynamic import()
 * keeps every past and present Terms text out of the main bundle, so the vast
 * majority of visitors, who never open the Terms, never download a byte of it.
 * Everything a caller needs *before* the text arrives (which dates exist,
 * which one is current, and the labels for the version-history nav) sits in
 * the cheap eager summary below.
 */

export interface TermsVersionSummary {
  /** ISO date: the registry key and the dated route segment. */
  date: string;
  version: string;
  status: TermsVersion["status"];
}

/**
 * Eager and cheap. Newest first; this order drives the version-history nav.
 *
 * `version` and `status` mirror the dated module so the nav can be labelled
 * without loading any prose. Keep them in sync when publishing (the checklist
 * in docs/legal-versioning.md covers it). A mismatch is contained: the loaded
 * module always wins for the page body, so drift can only mislabel a nav
 * entry, and `loadTermsVersion` warns about it in dev.
 */
export const termsVersionSummaries: TermsVersionSummary[] = [
  { date: "2026-09-01", version: "1.0", status: "effective" },
];

/**
 * One lazy chunk per version. Keys must match `termsVersionSummaries`.
 *
 * The import specifier has to be a literal for the bundler to see the chunk,
 * so this map cannot be generated from the summaries above.
 */
const loaders: Record<string, () => Promise<TermsVersion>> = {
  "2026-09-01": () => import("./2026-09-01").then((m) => m.termsV20260901),
};

/** The version served at /terms. */
export const currentTermsDate: string = termsVersionSummaries[0].date;

/** Whether a dated route exists, answerable without loading the text. */
export function hasTermsVersion(date: string): boolean {
  return date in loaders;
}

/** Loads one version's full text. Resolves to null for an unknown date. */
export async function loadTermsVersion(
  date: string,
): Promise<TermsVersion | null> {
  const load = loaders[date];
  if (!load) return null;

  const terms = await load();

  if (import.meta.env.DEV) {
    const summary = termsVersionSummaries.find((entry) => entry.date === date);
    if (!summary) {
      console.warn(`[terms] ${date} has a loader but no summary entry.`);
    } else if (
      summary.version !== terms.version ||
      summary.status !== terms.status
    ) {
      console.warn(
        `[terms] summary for ${date} (v${summary.version}, ${summary.status}) ` +
          `disagrees with the module (v${terms.version}, ${terms.status}).`,
      );
    }
  }

  return terms;
}
