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
  registered in `src/data/terms/index.ts`. The registry loads each version's
  text through `import()`, so a version only reaches the browser when someone
  actually opens `/terms`; the cheap `termsVersionSummaries` list stays eager
  because the version-history nav and the dated-route 404 check need it before
  any text is loaded.
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
2. Register it in `src/data/terms/index.ts`, in two places that must agree:
   a `loaders` entry (the `import()` specifier has to be a literal, so it
   cannot be generated) and a `termsVersionSummaries` row. The list is newest
   first, so putting the new row at the top is what makes it the version
   served at `/terms`. Set the outgoing version's `status` to `"superseded"`
   in its module **and** in its summary row (status flag only, never touch its
   text). Opening the page in `npm run dev` warns in the console if the two
   disagree.
3. Generate and commit the PDF: `node scripts/generate-terms-pdf.mjs <new-date>`.
4. Add `terms/<new-date>` to the per-route entry-point list in
   `.github/workflows/deploy.yml`.
5. Deploy, and confirm the new dated route returns HTTP 200 **before** the next
   step: Stripe checkout will link buyers straight at it.
6. Repoint Stripe at the new dated route:
   - Dashboard → Settings → Public business details → *Terms of service* URL =
     `https://trendev.fr/terms/<new-date>`. This is a single account-wide
     setting and there is no API for it.
   - Recreate the Payment Links with the new `subscription_data.metadata`
     (`terms_version`, `terms_url`) and deactivate the old ones.
     `consent_collection` is **create-only**: it is absent from the
     payment-link update endpoint, so an existing link can never be repointed
     to new Terms, only replaced.
   - Update `src/data/stripe.ts` with the new link URLs.
7. Existing subscribers must be informed before a new version applies to them
   (see Terms §14); the version they accepted stays online at its dated route.

## Service descriptions

- Content lives in `src/data/serviceDescriptions.ts`; each service carries a
  `version` (e.g. `1.0`) and `effectiveDate` displayed in the page
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

- [x] Owner supplies legal entity details — done 2026-08-18 from the public
      registers (RCS Meaux 821 442 290). No `[TO BE COMPLETED]` placeholder
      remains in the Terms, `/legal` or `/privacy`.
- [x] Owner confirms the four open service-description decisions of issue #14
      and the 2026-09-01 effective date — done 2026-08-18; the
      `pendingDefault` tags are gone.
- [x] French IT/commercial lawyer reviews Terms + service descriptions +
      acceptance model; comments resolved — confirmed by the owner 2026-08-19,
      including the jurisdiction clause (Terms §14, courts of Meaux).
- [x] Accountant validates VAT/late-payment/invoice wording — confirmed by the
      owner 2026-08-19.
- [x] Owner approves; Terms `status` flipped `"draft"` → `"effective"`;
      service descriptions dropped the `-draft` version suffix — 2026-08-19.
- [x] PDF regenerated and committed (213,195 → 194,026 bytes, the difference
      being the removed DRAFT banner).
- [ ] Deploy verified: dated route + PDF return HTTP 200 in production and the
      page no longer shows the draft banner.

## Cookie consent

`/privacy` describes the consent banner, and the banner is what makes the
Google Analytics claims on that page true. Analytics is consent-gated in code
(`src/lib/analytics.ts`): `index.html` carries only the gtag stub and a denied
Consent Mode default, and `gtag.js` is injected only after an accept. If that
gating is ever changed, `/privacy` has to change with it.
