---
name: figma-sync
description: Use after any visual change to this landing page (theme, layout, spacing, new section) to mirror the result back into the counterpart Figma file so design and code do not drift. Covers the generate_figma_design capture procedure and its SPA reload gotcha.
---

# Keep Figma in sync

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
