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
- `src/app/App.tsx` — **composition root only**: holds the three modal state
  vars and assembles sections + modals. Keep it thin; don't add markup here.
- `src/components/` — one component per page section (Header, Hero,
  EngagementModels, WhyChoose, Expertise, Services, Technologies, Faq, Cta,
  Footer). `ServiceCard` is the shared card for the Expertise + Services grids.
- `src/components/modals/` — `Modal` is the shared backdrop wrapper;
  `DetailModal` / `ConsultationModal` / `ProjectsModal` build on it.
- `src/components/icons/GithubIcon.tsx` — inline GitHub mark (lucide v1 dropped
  brand icons; do not re-add an icon dependency for it).
- `src/data/content.ts` — **all page copy lives here** (expertise, services,
  whyChoose, projects, engagementModels, faqs) plus `navLinks`, `CALENDLY_URL`,
  `CONTACT_EMAIL`, `GITHUB_URL`. Edit content here, not in components.
- `src/types.ts` — shared types. `src/hooks/useBodyScrollLock.ts` — scroll lock.

## Conventions

- Import from `src` via the `@/` alias (e.g. `@/data/content`). The alias is
  defined in **both** `vite.config.ts` and `tsconfig.json` — keep them in sync.
- Styling is Tailwind utility classes inline; theme tokens (colors, radius) are
  CSS variables in `src/styles/theme.css`. `tailwind.css` uses
  `source(none)` + an explicit `@source` glob, so new files under `src/` are
  picked up automatically.
- The `projects` array has `hidden: true` entries (WIP: UnleakTrade, PoLN);
  `ProjectsModal` filters them out. Keep the data, flip the flag to publish.

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
- **Glass recipe** for panels/cards/nav: `bg-white/6` fill, `border-white/12`,
  `backdrop-blur-xl`, soft dark drop shadow. Prefer one shared `Glass` wrapper
  or a `.glass` utility over repeating the classes.
- **Going dark:** flip the tokens in `src/styles/theme.css` (and/or apply the
  `.dark` variant) and change the `App.tsx` root from `bg-white` to the dark
  background. Don't restyle per-component with literals.
- **Verbatim copy stays.** The rebrand is visual only — do not rewrite the
  marketing copy in `src/data/content.ts`.
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

## Gotchas

- This repo was originally generated by Figma Make and later refactored into the
  structure above. If you find a giant inline file or a Figma artifact, it's
  drift — prefer the decomposed pattern.
- `index.html` carries the SEO/OpenGraph/schema.org markup and the Google
  Analytics snippet — update meta there, not in React. When the dark theme
  lands, also update the `theme-color` meta to a dark navy (e.g. `#070C1C`).
