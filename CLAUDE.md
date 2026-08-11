# CLAUDE.md

Guidance for working in this repo.

## What this is

Single-page marketing landing page for **TRENDev Consulting** (Fractional CTO,
AI, Cloud, DevOps, Web3). Static site, no backend.

## Stack

React 19 · Vite 8 · Tailwind CSS v4 (`@tailwindcss/vite`) · TypeScript ·
`lucide-react` icons. Output goes to `./build` (gitignored).

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
  the consultation-modal state shared by Header and all pages, plus
  WeaveBackground/Header/Footer chrome. Keep it thin; don't add markup here.
- `src/app/router.tsx` — hand-rolled client router (**do not add
  react-router**): `useRoute()`, `navigate()`, `Link`, flat route table
  (`/`, `/services/:slug`, `/terms`, `/terms/:date`, `/legal`, `/privacy`).
  Handles `/#section` hash links from subpages, scroll-to-top, and GA SPA
  pageviews (via `useDocumentMeta`). GH Pages serves deep links through
  per-route `index.html` copies created in `.github/workflows/deploy.yml` —
  **keep that route list in sync with the router and the terms registry**.
- `src/pages/` — one component per route: `LandingPage` (owns the
  landing-only modal state: DetailModal, ProjectsModal), `ServicePage`
  (data-driven by slug), `TermsPage` (versioned), `LegalPage`, `PrivacyPage`,
  `NotFoundPage`; `legalLayout.tsx` is the shared legal-page shell.
- `src/components/` — one component per page section (Header, Hero,
  Methodology, Pricing + ComparisonTable, Offers, EngagementModels, WhyChoose,
  Expertise, Services, Technologies, Faq, Cta, Footer). `ServiceCard` is the
  shared card for the Expertise + Services grids. `Methodology` (the
  `Understand → Prioritize → Execute → Scale` step indicator + qualitative
  outcomes) and `Offers` (named productized entry points) carry the
  buying-journey content added for issue #8. `Pricing` is a **compact** CTA
  section for the two Advisor subscriptions (epic #12) — the landing page
  deliberately stays Fractional-CTO-oriented, so the full 3-tier detail and
  `ComparisonTable` live on the /services/* pages, not on the landing page.
  Offers/EngagementModels are kept until issue #19 decides their fate.
- `src/components/modals/` — `Modal` is the shared backdrop wrapper;
  `DetailModal` / `ConsultationModal` / `ProjectsModal` build on it.
- `src/components/icons/GithubIcon.tsx` — inline GitHub mark (lucide v1 dropped
  brand icons; do not re-add an icon dependency for it).
- **All page copy lives under `src/data/`**, not in components:
  - `content.ts` — landing sections (expertise, services, whyChoose, projects,
    engagementModels, methodologySteps, outcomes, offers, faqs) plus
    `navLinks`, `legalLinks`, `CALENDLY_URL`, `CONTACT_EMAIL`, `GITHUB_URL`.
  - `pricing.ts` — the 3 frozen premium tiers, comparison table,
    `STRIPE_PAYMENT_LINKS` (empty until issue #16; empty ⇒ purchase CTAs fall
    back to the consultation modal), `PRIMARY_CTA_LABEL`, `PREREQUISITE_NOTE`.
  - `serviceDescriptions.ts` — versioned service definitions (issue #14).
  - `terms/` — dated, **immutable** Terms of Service versions + registry
    (issue #15; see `docs/legal-versioning.md` before touching anything here).
  - `legalPages.ts` — legal notice + privacy content.
- `src/types.ts` — shared types. `src/hooks/` — `useBodyScrollLock` (scroll
  lock), `useDocumentMeta` (per-route title/description/canonical + GA SPA
  pageview; `index.html` stays the SEO source of truth for `/` and OG/JSON-LD).

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
- The internal maximum day rate is deliberately **not published anywhere in
  this repo** — do not add it.
- The prerequisite note ("please schedule your free CTO consultation before
  subscribing") must stay adjacent to the Advisor purchase CTAs.
- Terms versions are immutable once their PDF is committed: publishing a
  change means a new dated module under `src/data/terms/`, a new PDF
  (`node scripts/generate-terms-pdf.mjs <date>`), and a new deploy.yml route —
  never edit an accepted version. Full workflow: `docs/legal-versioning.md`.
- The Terms/legal/privacy pages ship as **drafts with `[TO BE COMPLETED]`
  placeholders** until lawyer review + entity details land (issue #15); the
  draft banner must stay until the version is approved as effective.
- What Stripe checkout must record (issue #16 input):
  `docs/stripe-acceptance-evidence.md`.

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
  that overlaps *scrolling* content (Header, modal panels — one or two elements)
  may add `backdrop-blur-md` locally.
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

## Keep Figma in sync

The Figma file https://www.figma.com/design/tPzPmXtsgZpjji318sUPUU is the design
counterpart of this site. **After any visual change (theme, layout, spacing, new
section), mirror the result back into it** so design and code don't drift.

- Use the Figma MCP `generate_figma_design` capture against this `fileKey` to add
  a fresh page from the running dev server (`npm run dev`, http://localhost:3000).
  It needs the capture script on the page: temporarily add
  `<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>`
  to `index.html`, then **hard-load** the URL with the capture hash (a hash-only
  change won't reload an SPA, so the script never fires — add a throwaway query
  like `?cap=1`). Revert the script tag afterwards.
- The WebGL background only rasterizes for the first viewport; below the fold the
  capture shows the flat dark `--background`, which is the correct still stand-in.

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
  `speed`, `twill`, `drapeScale`, `sheen`, `mouse`). It reads `--accent` from
  the document so it stays in sync with the brand token.
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
- `index.html` carries the SEO/OpenGraph/schema.org markup and the Google
  Analytics snippet — update site-wide meta there, not in React. The one
  exception: subpages override title/description/canonical at runtime via
  `useDocumentMeta` (which also fires GA SPA pageviews). When the dark theme
  lands, also update the `theme-color` meta to a dark navy (e.g. `#070C1C`).
