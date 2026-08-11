import type { TermsVersion } from "@/types";

import { termsV20260901 } from "./2026-09-01";

/**
 * Terms of Service version registry (issue #15).
 *
 * IMMUTABILITY RULE: a dated terms module must NEVER be edited in substance
 * once its PDF is committed and the version is (or was) purchasable — clients
 * accepted that exact text. Publishing a change means: add a new dated module,
 * register it here, generate + commit its PDF (scripts/generate-terms-pdf.mjs),
 * mark the old version "superseded" (status only), and add the new route to
 * .github/workflows/deploy.yml. See docs/legal-versioning.md.
 */
export const termsVersions: Record<string, TermsVersion> = {
  "2026-09-01": termsV20260901,
};

/** The version served at /terms. */
export const currentTermsVersion: TermsVersion = termsV20260901;

/** Newest first, for the version-history list. */
export const termsVersionDates: string[] = Object.keys(termsVersions).sort(
  (a, b) => b.localeCompare(a),
);
