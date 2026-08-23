# CLAUDE.md

Guidance for working in this repo.

## What this is

Single-page marketing landing page for **TRENDev Consulting** (Fractional CTO,
AI, Cloud, DevOps, Web3). Static site, no backend.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000 (opens a browser)
npm run typecheck  # tsc --noEmit — run before considering work done
npm run build      # production build to ./build
```

There are no tests and no linter configured.

## Architecture

- `src/main.tsx` — React entry; mounts `App`, imports `styles/index.css`.
- `src/app/App.tsx` — **composition root only**: route switch (`useRoute`) +
  the consultation-modal state shared by Header and all pages + the
  cookie-consent banner state (Footer reopens it), plus
  WeaveBackground/Header/Footer chrome. Keep it thin; don't add markup here.
- `src/app/router.tsx` — hand-rolled client router (**do not add
  react-router**): `useRoute()`, `navigate()`, `Link`, flat route table
  (`/`, `/advisory`, `/services/:slug`, `/terms`, `/terms/:date`, `/legal`,
  `/privacy`, `/welcome`).
  Handles `/#section` hash links from subpages, scroll-to-top, and GA SPA
  pageviews (via `useDocumentMeta`). GH Pages serves deep links through
  per-route `index.html` copies created in `.github/workflows/deploy.yml` —
  **keep that route list in sync with the router and the terms registry**.
- `src/pages/` — one component per route: `LandingPage` (owns the
  landing-only modal state: DetailModal, ProjectsModal), `AdvisoryPage` (the
  subscription funnel: 3 tiers + `ComparisonTable`), `ServicePage`
  (data-driven by slug), `TermsPage` (versioned), `LegalPage`, `PrivacyPage`,
  `WelcomePage` (post-purchase onboarding, issue #18), `NotFoundPage`;
  `legalLayout.tsx` is the shared legal-page shell.
- `src/components/` — one component per page section (Header, Hero,
  Methodology, Offers, WhyChoose, Expertise, Services, Technologies, Faq, Cta,
  Footer). `ServiceCard` is the shared card for the Expertise + Services grids.
  `Methodology` (the `Understand → Prioritize → Execute → Scale` step
  indicator + qualitative outcomes) and `Offers` (named, fixed-scope
  productized entry points, e.g. "CTO Audit", distinct from the subscription
  tiers on `/advisory`) carry the buying-journey content added for issue #8.
  `EngagementModels` was removed when issue #19 decided its fate: it was
  generic, unlinked filler duplicating messaging already covered by Hero,
  Offers, WhyChoose and Services, and it did not fit the premium boutique
  positioning `/advisory` was built for.
  `ConsentBanner` is the cookie banner (see the consent section below).
  `BackLink` is the return path every subpage must render (see below).
  `TierCta` is the shared Advisor/Fractional purchase CTA, and
  `ComparisonTable` the 3-tier comparison; both are used by `/services/*`
  only. **The landing page has no pricing/subscription section** — see the
  commercial guardrails below.
- `src/components/modals/` — `Modal` is the shared backdrop wrapper;
  `DetailModal` / `ConsultationModal` / `ProjectsModal` build on it.
- `src/components/icons/GithubIcon.tsx` — inline GitHub mark (lucide v1 dropped
  brand icons; do not re-add an icon dependency for it).
- **All page copy lives under `src/data/`**, not in components:
  - `content.ts` — landing sections (expertise, services, whyChoose, projects,
    engagementModels, methodologySteps, outcomes, offers, faqs) plus
    `navLinks`, `legalLinks`, `CALENDLY_URL`, `CONTACT_EMAIL`, `GITHUB_URL`.
  - `pricing.ts` — the 3 frozen premium tiers, comparison table,
    `PRIMARY_CTA_LABEL`, `PREREQUISITE_NOTE`.
  - `stripe.ts` — `STRIPE_PAYMENT_LINKS`, **selected by environment**: test
    links under `vite` (dev), live links under `vite build`, overridable with
    `VITE_STRIPE_MODE=test|live`. Use the override when previewing a production
    build locally, which would otherwise point at real checkout.
    **`deploy.yml` currently pins the deployed site to `test`** (issue #16) so
    reviewers can walk the whole funnel with Stripe test cards before launch,
    so `PROD` does not imply live links right now; remove that `env:` block in
    the same change that fills in `LIVE_PAYMENT_LINKS`. Live links stay empty
    until issue #16 clears its gates; empty ⇒ purchase CTAs fall back to the
    consultation modal. Both test links complete at `/welcome` via
    `after_completion.redirect`. Payment Links are public
    URLs, **not secrets** — do not move them into `.env` (it is gitignored, so
    CI would need secrets for values that aren't secret, and the deployed link
    set would stop being reviewable in the diff).
  - `serviceDescriptions.ts` — versioned service definitions (issue #14),
    v1.0 (2026-09-01). The Advisor/Advisor+ text must stay word for word
    identical to Annex A/B of the current Terms version; a parity check is
    cheap to re-derive, a silent divergence is a contractual problem.
  - `terms/` — dated, **immutable** Terms of Service versions + registry
    (issue #15; see `docs/legal-versioning.md` before touching anything here).
    The registry is **lazy**: each version's text is a separate `import()`
    chunk, so the ~14 kB of legal prose per version never lands in the main
    bundle. Only `termsVersionSummaries` (date/version/status, used by the
    history nav and the dated-route 404 check) is eager, and it has to be kept
    in sync with its module by hand. Each version ends with **Annex A/B**, a
    frozen copy of the CTO Advisor and CTO Advisor+ service descriptions, which
    is how the accepted scope stays immutable without a dated `/services`
    route. Never replace those copies with an import from
    `serviceDescriptions.ts`: live data inside an immutable contract defeats
    the point.
  - `legalPages.ts` — legal notice + privacy content.
  - `welcome.ts` — `/welcome` onboarding copy (issue #18). Stripe redirects
    here after checkout, but the page is **static and unauthenticated**: it
    reads no Stripe data, holds no customer state and sends no email. Billing
    communication stays with Stripe. Onboarding is a prefilled `mailto`, not a
    form tool, so no third-party processor is added that `/privacy` would have
    to disclose. There is deliberately **no "Manage billing" link** until the
    Customer Portal exists (issue #17): a generic portal URL that does not
    resolve to the buyer's own subscription is worse than none.
- `src/types.ts` — shared types. `src/hooks/` — `useBodyScrollLock` (scroll
  lock), `useDocumentMeta` (per-route title/description/canonical + GA SPA
  pageview; `index.html` stays the SEO source of truth for `/` and OG/JSON-LD).
  It also overrides `robots` per route, restoring the `index.html` default when
  a page passes none: `deploy.yml` gives every route a real crawlable entry
  point, so a route that should stay out of search (`/welcome`) must say so.
- `src/lib/analytics.ts` — consent-gated Google Analytics loading. See
  **Cookie consent** below before touching anything analytics-related.

## Conventions

- Import from `src` via the `@/` alias (e.g. `@/data/content`). The alias is
  defined in **both** `vite.config.ts` and `tsconfig.json` — keep them in sync.
- Styling is Tailwind utility classes inline; theme tokens (colors, radius) are
  CSS variables in `src/styles/theme.css`. `tailwind.css` uses
  `source(none)` + an explicit `@source` glob, so new files under `src/` are
  picked up automatically.
- The `projects` array has `hidden: true` entries (WIP: UnleakTrade, PoLN);
  `ProjectsModal` filters them out. Keep the data, flip the flag to publish.

## Commercial & legal guardrails (epic #12)

- Exactly **3 public offers**: CTO Advisor €1,500/mo · CTO Advisor+ €2,500/mo
  (recommended) · Fractional CTO from €6,000/mo (contact-only, never
  self-service). Names and prices are frozen (issue #13).
- Every displayed price carries **"excluding applicable taxes"** — never
  present 20% French VAT as universal.
- **Stripe Tax is registration-gated, and registrations are per-mode.**
  `automatic_tax[enabled]=true` only runs the calculator; with no active
  `tax.registration` for the customer's jurisdiction it returns 0% and
  `taxability_reason: not_collecting`, and `tax.settings.status: "active"`
  still reads healthy. Test-mode registrations never apply to live mode, so a
  passing test purchase is not evidence about live. Before touching anything
  tax-related, check `GET /v1/tax/registrations` in **both** modes. Full
  verified state: `docs/stripe-acceptance-evidence.md`.
- The internal maximum day rate is deliberately **not published anywhere in
  this repo** — do not add it.
- The prerequisite note ("please schedule your free CTO consultation before
  subscribing") must stay adjacent to the Advisor purchase CTAs.
- **Every subpage renders a `BackLink`.** The site is a single-page app with
  deep-linkable routes, so a visitor can land on `/advisory`, `/services/*`,
  `/terms`, `/legal`, `/privacy` or `/welcome` straight from search or a
  shared link with no history to go back to. The header logo goes home too, but it is not an
  obvious affordance. `/services/*` points back at its parent `/advisory`;
  everything else points at `/`. `BackLink` is `print:hidden`, so it never
  reaches the Terms PDF.
- **The Hero's commercial CTAs come first.** Two buttons (consultation +
  advisory plans) carry the hero; "View our work" is a subdued text link
  underneath and must not be promoted back to a third button competing with
  them.
- **Two funnels, two buttons — never merge them.** Booking a consultation and
  subscribing are different intents:
  - "Book a free CTO consultation" / "Schedule Free Consultation"
    (`PRIMARY_CTA_LABEL`) opens `ConsultationModal`, which must stay purely
    about booking the call. **Do not put offers, prices or subscribe links in
    it** — that was tried and it made the funnel ambiguous.
  - "See CTO advisory plans" (`SECONDARY_CTA_LABEL` → `ADVISORY_PATH`) is the
    separate, visually distinct CTA for a visitor who already knows what they
    want. It lives in the Hero, the closing `Cta` section and the nav, and
    lands on `/advisory`.
- **Do not put a pricing/subscription section on the landing page.** The
  landing page stays Fractional-CTO-oriented end to end; a subscription block
  mid-page confuses the narrative. The offers live on `/advisory` (all three
  tiers + `ComparisonTable`) and `/services/*` (full descriptions). This was
  tried the other way and reverted twice — the landing page links out, it does
  not host the plans.
- Terms versions are immutable once their PDF is committed: publishing a
  change means a new dated module under `src/data/terms/`, a new PDF
  (`node scripts/generate-terms-pdf.mjs <date>`), and a new deploy.yml route —
  never edit an accepted version. Full workflow: `docs/legal-versioning.md`.
- **Terms v1.0 (2026-09-01) is the one published version**, and there is only
  one. It was frozen on 2026-08-19, then rewritten **in place** on 2026-08-21
  after the deep legal review of 2026-08-19 and the owner's decisions on it:
  same version, same date, same route, same PDF filename. That was legitimate
  only because the version had not yet reached its effective date and had never
  been accepted (`LIVE_PAYMENT_LINKS` is empty, so no purchase has ever been
  possible). **Do not do it again.** From now on the text is frozen absolutely:
  `status` is the only field that may change, only to `"superseded"`, and any
  correction means a new dated module with this one left online. A version that
  is not yet approved ships as `status: "draft"`, which renders a
  pending-legal-review banner that must stay until approval.
- **Publishing a new Terms version does not require recreating the Stripe
  Payment Links.** Only `consent_collection` is create-only; `metadata`,
  `subscription_data.metadata` and `custom_text` are all accepted by
  `POST /v1/payment_links/{id}`, so the recorded URL and the consent message
  repoint in place and the `buy.stripe.com` URLs survive.
- **The online Terms cover the Advisor tiers only.** Per §1, Fractional
  CTO is out of scope: it is contact-only and contracted per engagement. Don't
  reintroduce Fractional CTO clauses into the Terms or an Annex C.
- The owner's standing steer on legal scope, from the 2026-08-19 review: keep
  it simple and proportionate to a small consultancy selling advice. Approved
  changes were the ones above; expressly declined were lawyer/accountant
  registers, per-purchase evidence schedules beyond what Stripe already stores,
  approved-country and multi-country tax policy, arbitration, rewording the
  Meaux jurisdiction clause, extending confidentiality past 5 years, and extra
  boilerplate (force majeure, order of precedence). Don't re-propose them.
- What Stripe checkout must record (issue #16 input):
  `docs/stripe-acceptance-evidence.md`.

## Cookie consent (CNIL / GDPR)

Analytics is **opt-in**, and the implementation has to stay that way:

- `index.html` defines only `dataLayer` + the `gtag` stub and calls
  `gtag('consent','default', …)` with everything **denied**. It must not load
  `gtag.js` and must not call `gtag('config', …)`.
- `src/lib/analytics.ts` is the only place that injects the Google script, and
  only after an explicit accept. Consent Mode alone is not enough: with
  `analytics_storage: denied` gtag.js still loads and still pings Google, and
  GA4 is not a CNIL-exempt audience-measurement tool. Refusing must mean **no
  request to Google at all**.
- Refusing must be as easy as accepting: keep the two `ConsentBanner` buttons
  the same size, side by side, one click each. No pre-ticked state, no
  dismiss-as-consent (the banner only offers Cancel once a choice exists).
- Withdrawal must stay reachable: the footer "Cookie settings" button reopens
  the banner, and choosing Refuse deletes the `_ga*` cookies.
- The choice lives in `localStorage` under `trendev.analytics-consent`.
- `/privacy` (`src/data/legalPages.ts`) describes all of the above. **Change
  the gating and you must change that copy in the same commit.**

## Design direction (2026 dark rebrand)

The site is being rebranded from the current light theme to a **dark, navy,
glassmorphic** look with an animated woven-wave background. Visual reference
(Figma): https://www.figma.com/design/tPzPmXtsgZpjji318sUPUU

- **Brand accent is the single source of truth.** Keep `--accent` in
  `theme.css` as the brand cyan (currently `#00D9FF`; the Figma comp uses the
  near-identical `#25D8EC`). Components must reference the `accent` token
  (`bg-accent`, `text-accent`, `border-accent/30`) — never hardcode cyan hexes.
- **Dark palette** (add as tokens, don't sprinkle literals): background layers
  `#0A1430` -> `#070C1C` -> `#04060D`; text `#F1F4FF` (primary) / `#9DAFD8`
  (secondary) / `#6F7EA6` (muted).
- **Glass recipe** for panels/cards/nav: use the shared `.glass` utility
  (`theme.css`) — a translucent dark fill (`bg-card/55`), `border-white/12`, soft
  dark shadow. **No `backdrop-filter` in `.glass`.** `backdrop-blur` over the
  animated `WeaveBackground` re-rasterizes every frame; with ~30 cards on the
  page that pins the GPU and stalls the canvas. Only persistent/transient chrome
  that overlaps *scrolling* content (Header, modal panels, the consent banner
  strip — a handful of small elements at most) may add `backdrop-blur-md`
  locally.
- **Going dark:** flip the tokens in `src/styles/theme.css` (and/or apply the
  `.dark` variant) and change the `App.tsx` root from `bg-white` to the dark
  background. Don't restyle per-component with literals.
- **Verbatim copy stays *for the rebrand*.** The dark-theme rebrand is visual
  only — do not rewrite marketing copy as part of it. (Intentional positioning
  changes — e.g. the hero eyebrow/subhead and the Methodology/Offers sections
  added for issue #8 — are a separate, deliberate exception.)
- **Section rhythm.** Sections own their vertical spacing via `py-12 sm:py-16`
  (bottom-only intro sections use `pb-12 sm:pb-16`); the background runs
  continuously, so there are **no** per-section `bg-*` bands — the glass cards
  separate content. Keep this scale when adding sections; adjacent sections
  already stack their padding, so don't pile on more.

## Background: `WeaveBackground`

- `src/components/WeaveBackground.tsx` — a self-contained **WebGL** component
  rendering an animated draped woven-fabric surface (per-pixel lighting, a
  satin highlight that rolls across the folds, cyan catching the crests). It is
  the hero of the dark look; it is **not** a static gradient.
- Mount it once in `App.tsx` as the first child of the root, fixed behind all
  content: `className="fixed inset-0 -z-10"`. The root must be dark (or
  transparent) so the canvas shows through.
- It is responsive (fills the viewport, DPR-aware), dependency-free, and
  degrades gracefully: a static gradient when WebGL is unavailable, and a single
  still frame when the user prefers reduced motion.
- Tunables live in the `CONFIG` object at the top of the component (`density`,
  `speed`, `twill`, `drapeScale`, `sheen`, `mouse`, `knee`, `highlight`). It
  reads `--accent` from the document so it stays in sync with the brand token.
- **`CONFIG.highlight` is a readability setting, not a look setting.** The
  shader ends with a proportional rolloff that caps how bright the satin crests
  may get: brightness is compressed and fed back into the colour, so the crests
  keep their cyan hue and the weave keeps its structure, but the whole canvas
  stays under a relative luminance of ~0.053. That ceiling is what lets
  `text-muted-foreground` (`#9DAFD8`) survive on the bare background at 4.7:1.
  Without it the crests reach L 0.80 — brighter than pure cyan — and body text
  over them measures **1.0:1, i.e. invisible**; that was the bug this cap fixed.
  The shader's other two darkeners cannot stand in for it: the thread gaps and
  the vignette are *spatial*, and the vignette is at its brightest dead centre,
  exactly where the centred hero copy sits. **Raising `highlight` re-breaks
  every unglassed paragraph on the site** (the hero subhead and each section
  intro). If you change it, re-measure the worst case rather than eyeballing it.
- **Performance (a full-screen shader is the page's heaviest cost):** it renders
  the canvas at **0.6x** internal resolution (soft weave hides the upscale),
  caps the animation to **~30fps**, uploads static uniforms once, and **pauses
  on `visibilitychange`** when the tab is hidden. Keep these. The other half of
  the budget is the glass rule above — never reintroduce `backdrop-blur` on the
  content cards that sit over this canvas.

## Gotchas

- This repo was originally generated by Figma Make and later refactored into the
  structure above. If you find a giant inline file or a Figma artifact, it's
  drift — prefer the decomposed pattern.
- `index.html` carries the SEO/OpenGraph/schema.org markup — update site-wide
  meta there, not in React. The one exception: subpages override
  title/description/canonical at runtime via `useDocumentMeta` (which also
  fires GA SPA pageviews). `index.html` holds only the gtag **stub** and a
  denied Consent Mode default; `gtag.js` itself is loaded from
  `src/lib/analytics.ts` after consent — do not re-add the `<script async
  src="…googletagmanager…">` tag there.
