# Legal & service-description versioning

How TRENDev keeps the contractual content (Terms of Service, service
descriptions) versioned, immutable and referenceable — issues #14/#15 of the
premium-services epic (#12).

## Why

Advisor subscriptions are formed online without a signed contract: the client
accepts the **current Terms version** and the **service-description version**
of the selected service at checkout. Those exact texts must therefore stay
retrievable forever, unchanged, at a stable address — a client must always be
able to re-read what they accepted.

## Terms of Service

- Content lives in dated modules: `src/data/terms/<effective-date>.ts`,
  registered in `src/data/terms/index.ts`.
- Routes: `/terms` serves the current version; `/terms/<effective-date>`
  serves each version immutably (e.g. `/terms/2026-09-01`).
- Each version has a committed PDF at
  `public/terms/trendev-terms-of-service-<date>.pdf`, generated **from the
  built dated route** by `scripts/generate-terms-pdf.mjs`, so the PDF matches
  the displayed version. The PDF honestly carries the DRAFT banner while the
  version is a draft.
- **Immutability rule:** once a version's PDF is committed and the version is
  (or ever was) purchasable, its dated module must never be edited in
  substance. While `status` is `"draft"`, pre-review corrections are allowed
  but must regenerate the PDF.

### Publishing a new Terms version

1. Add `src/data/terms/<new-date>.ts` with the new content (`status: "draft"`
   until lawyer-reviewed and owner-approved, then `"effective"`).
2. Register it in `src/data/terms/index.ts` and point `currentTermsVersion`
   at it; set the outgoing version's `status` to `"superseded"` (status flag
   only — never touch its text).
3. Generate and commit the PDF: `node scripts/generate-terms-pdf.mjs <new-date>`.
4. Add `terms/<new-date>` to the per-route entry-point list in
   `.github/workflows/deploy.yml`.
5. Existing subscribers must be informed before a new version applies to them
   (see Terms §14); the version they accepted stays online at its dated route.

## Service descriptions

- Content lives in `src/data/serviceDescriptions.ts`; each service carries a
  `version` (e.g. `1.0-draft`) and `effectiveDate` displayed in the page
  header and footer ("the version accepted at purchase governs your
  subscription").
- Versions are recorded in git; on a version bump, archive the outgoing text
  to `docs/service-descriptions/<slug>-v<X.Y>.md` in the same commit, so
  superseded descriptions remain trivially retrievable without git
  archaeology.
- The version string is what checkout metadata references (see
  `docs/stripe-acceptance-evidence.md`).

## How a purchase references these versions

Each checkout (issue #16) must record, at minimum:

- `Terms v1.0 (2026-09-01) — https://trendev.fr/terms/2026-09-01`
- `Service Description cto-advisor v1.0 (2026-09-01) —
  https://trendev.fr/services/cto-advisor`

## Launch checklist for the first production versions

- [ ] Owner supplies legal entity details (replaces `[TO BE COMPLETED]` in
      the Terms, `/legal` and `/privacy`).
- [ ] French IT/commercial lawyer reviews Terms + service descriptions +
      acceptance model; comments resolved.
- [ ] Accountant validates VAT/late-payment/invoice wording.
- [ ] Owner approves; Terms `status` flips `"draft"` → `"effective"`; service
      descriptions drop the `-draft` suffix and the `pendingDefault` flags.
- [ ] PDF regenerated and committed; deploy verified (dated route + PDF
      return HTTP 200 in production).
