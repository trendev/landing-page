# Figma sync

Mirrors every route of this site into the counterpart Figma file
(<https://www.figma.com/design/tPzPmXtsgZpjji318sUPUU>) as **editable vector +
Inter text layers**, not screenshots. Run it after any visual change so design
and code do not drift; see `.claude/skills/figma-sync/SKILL.md` for when.

## Run it

```bash
npm run dev                                   # http://localhost:3000
npx --yes playwright@1.56 --version           # playwright is NOT a repo dep
node scripts/figma-sync/build.mjs             # -> figma-out/svg/*.svg
```

`build.mjs` captures every entry in `routes.json` at 1440 px and 390 px and
writes one SVG per frame. Then, with the Figma MCP:

1. `upload_assets` with `count = <number of files>` to get one submit URL each.
2. `POST` each file as `multipart/form-data` (`-F "file=@<path>;type=image/svg+xml"`).
   The **filename becomes the Figma layer name**, so keep it ASCII — Figma
   mis-decodes non-ASCII filenames. The response carries `placedOnNodeId`.
3. `use_figma` to move the imported frames onto a dated page, rename them
   properly (unicode is fine here) and lay them out.

Playwright is intentionally not a dependency of the app: this pipeline is a
tool run by hand a few times a release, and the site itself has no test
runner. Chromium comes from `PLAYWRIGHT_BROWSERS_PATH` where one is provisioned.

## What it captures

- **Every route the router serves** — `/`, `/advisory`, the three
  `/services/*`, `/faq`, `/terms`, `/legal`, `/privacy`, `/welcome`, plus the
  404. Keep `routes.json` in sync with `src/app/router.tsx` and
  `.github/workflows/deploy.yml`.
- **Four overlay states** the routes alone never show: the cookie consent
  banner, and the consultation / projects / expertise-detail modals. These are
  driven by the `before` snippet on the route entry and clipped to `h` px.
- **Text as text.** Each visual line is measured character by character, so
  soft wraps become separate lines and an inline `<strong>` or link inside a
  paragraph becomes a styled `tspan` in the same flowing line. Centred and
  right-aligned lines are anchored, not pinned at a measured left edge, so they
  stay centred once Figma re-shapes them in Inter.
- **Lucide icons** as real vectors, deduplicated per page, with `currentColor`
  resolved to the computed colour.
- **Placeholder text in empty fields.** A placeholder lives in the browser's
  shadow DOM and has no text node, so the character walker cannot see it and an
  empty field would capture as a blank box — which is how the `/welcome` context
  form's eight worked examples went missing. Each one is mirrored into a real,
  identically-styled element for the duration of the capture. Only empty fields
  show a placeholder, so only empty fields get a mirror.

## Known, deliberate gaps

- **Drop shadows are dropped** (`SHADOWS = false` in `to-svg.mjs`). Figma
  rasterises SVG filters on import, and `.glass`'s 60 px shadow turned every
  layer on the page into a blurry bitmap. Dark-on-dark, the loss is small.
- **The weave is a still.** `WeaveBackground` is WebGL and only rasterises for
  the first viewport; one frame of it is captured per width and embedded, with
  the flat `--background` below it — which is what the page shows below the
  fold anyway.
- **Collapsed FAQ answers are absent.** `FaqItem` keeps them in the DOM but
  `inert`; the capture skips `inert` subtrees, matching what a visitor sees.
- **Analytics consent is pre-refused** for the page captures, so no banner and
  no request to Google. The banner has its own frame.
- Fonts: the browser lays text out in the system stack, Figma renders Inter.
  Line breaks and positions are the browser's; glyph widths are Inter's, so
  long lines can end a few pixels off.
