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
  serves each version immutably. Currently one published version:
  `/terms/2026-09-01` (v1.0).
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
- **Immutability is delivered by the Terms, not by a dated `/services` route.**
  From Terms v1.0, the CTO Advisor and CTO Advisor+ descriptions are reproduced
  verbatim as Annex A and Annex B inside each Terms version, so the buyer
  receives the exact accepted scope in the Terms PDF and it can never change
  under them. `/services/<slug>` stays a single-current-version marketing page.
  This closes the defect flagged by the 2026-08-19 legal review, where checkout
  recorded a mutable `/services/<slug>` URL while promising the accepted text
  would remain retrievable there.
- **Annex parity:** the Advisor and Advisor+ text in
  `src/data/serviceDescriptions.ts` must stay word for word identical to the
  Annex in the current Terms version. Changing the description therefore means
  publishing a new Terms version in the same commit. The Annex is the
  contractual copy and wins on any discrepancy (Terms §2).
- Fractional CTO has no Annex: Terms §1 puts it outside the online Terms, and
  it is contracted separately per engagement.

## How a purchase references these versions

Each checkout (issue #16) must record, at minimum:

- `Terms v1.0 (2026-09-01) https://trendev.fr/terms/2026-09-01`
- `Service Description cto-advisor v1.0 (2026-09-01), reproduced as Annex A of
  the Terms above`

The service description no longer needs its own immutable URL: it travels
inside the Terms version the buyer accepts.

## Launch checklist for the first production version

- [x] Owner supplies legal entity details, done 2026-08-18 from the public
      registers (RCS Meaux 821 442 290). No `[TO BE COMPLETED]` placeholder
      remains in the Terms, `/legal` or `/privacy`.
- [x] Owner confirms the four open service-description decisions of issue #14,
      done 2026-08-18; the `pendingDefault` tags are gone.
- [x] French IT/commercial lawyer reviews Terms + service descriptions +
      acceptance model; comments resolved, confirmed by the owner 2026-08-19,
      including the jurisdiction clause (Terms §14, courts of Meaux).
- [x] Accountant validates VAT/late-payment/invoice wording, confirmed by the
      owner 2026-08-19.
- [x] Deep legal review of the checklist (2026-08-19) worked through with the
      owner on 2026-08-21; the approved points are folded into the text (below).
- [x] Owner approves v1.0, effective 2026-09-01.
- [x] PDF regenerated from the built dated route and committed.
- [x] Stripe consent message and metadata match v1.0 (2026-09-01).
- [x] Deploy verified 2026-08-21 (commit `35bdecf`): `/terms`,
      `/terms/2026-09-01`, both `/services/*` routes, `/advisory`, `/legal` and
      `/privacy` all return HTTP 200 in production, the served PDF is
      byte-identical to the committed one, and the live page renders v1.0 with
      Annexes A and B and no validation placeholder. `/terms/2026-08-22`, a
      route considered during review and never published, correctly 404s.
- [x] Account-wide Stripe *Terms of service* URL stays
      `https://trendev.fr/terms/2026-09-01`. It was never changed, because the
      route did not move, and that route now returns 200. It is not readable
      through the API, so this one is confirmed by construction rather than by
      query: if it is ever repointed, verify it in Dashboard → Settings →
      Public business details.

## v1.0 was amended in place on 2026-08-21

v1.0 was first frozen on 2026-08-19. The deep legal review of that date found
substantive defects, the owner's decisions of 2026-08-21 resolved them, and the
text was rewritten **in place** on 2026-08-21: same version number, same
2026-09-01 effective date, same route, same PDF filename.

That is legitimate here and only here, because at the time of the rewrite the
version had never been in force (its effective date had not arrived) and had
never been accepted by anyone (`LIVE_PAYMENT_LINKS` is still empty, so no
self-service purchase has ever been possible). **Do not reuse this route.** Once
a version is effective, or has ever been purchasable, a correction means a new
dated module with the old one left online: that is what the immutability rule
above exists for, and what the numbered procedure describes.

Because the route never moved, Stripe needed no URL change; only the consent
message wording was refreshed to name the Annex.

What the review changed:

- **§1** names "TRENDev Consulting" expressly as a trading name of the
  contracting legal person, and takes Fractional CTO out of the online Terms:
  it has its own negotiated engagement agreement.
- **§2** incorporates the service description from Annex A/B instead of the
  mutable `/services/<slug>` route.
- **§6** drops the `[Wording to be validated by the accountant/lawyer.]`
  placeholder that had been frozen into the 2026-08-19 text and its PDF; states
  that VAT is added on top of the published price where due; and states that
  each Billing Period is a single charge due on issue.
- **§7** keeps no-refund, and adds the owner's remedy for provider
  non-delivery: undelivered capacity carries over at no charge until it is
  delivered or the client cancels. Money is never returned.
- **§12** states the advisory-only nature up front, and makes the twelve-month
  sentence a notice condition rather than an ambiguous prescription clause.
- **§14** stops a new Terms version applying to a running subscription on
  notice alone; the accepted version keeps governing unless the client changes
  plan or agrees.
- **Annexes A and B** reproduce the CTO Advisor and CTO Advisor+ service
  descriptions in full.

### Repointing Stripe is cheaper than step 6 implies

Step 6 above says to recreate the Payment Links. That is only necessary when
`consent_collection` itself has to change, which is what happened in August
when the Terms checkbox was first added. When the checkbox is already
`terms_of_service: required` and only the *content* changes, the update
endpoint is enough: `POST /v1/payment_links/{id}` accepts `metadata`,
`subscription_data.metadata` and `custom_text`, so the recorded URL and the
consent message can be repointed in place. The buyer-facing `buy.stripe.com`
URL is preserved, which recreation would have thrown away.

**Trap:** the two metadata fields behave differently. Top-level `metadata`
*merges*, so posting two keys leaves the rest alone.
`subscription_data.metadata` *replaces the whole map*, so posting two keys
silently drops `tier_id`, `terms_version` and the service-description keys from
the durable subscription record, which is exactly the acceptance evidence this
document exists to preserve. Always post the complete map for
`subscription_data.metadata`, then read the link back and count the keys.

## Cookie consent

`/privacy` describes the consent banner, and the banner is what makes the
Google Analytics claims on that page true. Analytics is consent-gated in code
(`src/lib/analytics.ts`): `index.html` carries only the gtag stub and a denied
Consent Mode default, and `gtag.js` is injected only after an accept. If that
gating is ever changed, `/privacy` has to change with it.
