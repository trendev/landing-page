---
name: figma-sync
description: Use after any visual change to this landing page (theme, layout, spacing, new section) to mirror the result back into the counterpart Figma file so design and code do not drift. Covers both capture routes — the scripts/figma-sync SVG pipeline and generate_figma_design — and their gotchas.
---

# Keep Figma in sync

The Figma file https://www.figma.com/design/tPzPmXtsgZpjji318sUPUU is the design
counterpart of this site. **After any visual change (theme, layout, spacing, new
section), mirror the result back into it** so design and code don't drift.

Each sync lands on its **own dated page** (`YYYY-MM-DD · Site sync (all routes)`).
Never overwrite an earlier one — the old comps are the record of what the design
used to be.

## Preferred: the repo's own pipeline (`scripts/figma-sync/`)

Works with only `use_figma` + `upload_assets`, so it does not depend on the
capture tool being available in the session. It produces **editable vector and
Inter text layers**, not screenshots.

```bash
npm run dev                        # http://localhost:3000
node scripts/figma-sync/build.mjs  # -> figma-out/svg/*.svg  (needs playwright)
```

Then `upload_assets` (one submit URL per file, POSTed as multipart so the
**ASCII** filename becomes the layer name), and `use_figma` to move the imported
frames onto a fresh dated page, rename and lay them out.
`scripts/figma-sync/README.md` has the full procedure, the route list, and the
deliberate fidelity gaps.

Two gotchas worth repeating:

- **Don't put SVG filters in the upload.** Figma rasterises them on import and
  every layer on the page comes back a blurry bitmap. Shadows are dropped for
  exactly this reason.
- **Non-ASCII filenames get mis-decoded** into the layer name (`·` arrives as
  `Â·`). Upload with ASCII names, rename afterwards in `use_figma`.

## Alternative: `generate_figma_design`

When the capture tool *is* available it is a one-shot pixel capture, and useful
as a cross-check:

- Run it against this `fileKey` from the running dev server. It needs the
  capture script on the page: temporarily add
  `<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>`
  to `index.html`, then **hard-load** the URL with the capture hash (a hash-only
  change won't reload an SPA, so the script never fires — add a throwaway query
  like `?cap=1`). Revert the script tag afterwards.

## Both routes

- The WebGL background only rasterizes for the first viewport; below the fold the
  capture shows the flat dark `--background`, which is the correct still stand-in.
- Analytics consent is opt-in, so a cold load puts the cookie banner over the
  first viewport. Capture pages with the choice pre-stored (the pipeline stores
  `denied`) and give the banner its own frame.
