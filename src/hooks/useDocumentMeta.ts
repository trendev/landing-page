import { useEffect } from "react";

import { SITE_ORIGIN, siteMeta } from "@/data/siteMeta";
import { trackPageView } from "@/lib/analytics";

/**
 * Per-route document meta. The landing head lives in `@/data/siteMeta` (and,
 * filled from it, index.html), along with the site-wide JSON-LD; subpages
 * override title, description, canonical and robots, plus the OG/Twitter
 * url/title/description that mirror them. A page passing no overrides gets the
 * landing values back.
 *
 * At build time (no `document`) the same call is recorded instead, and
 * scripts/prerender.mjs writes it into that route's static HTML. So each page's
 * call here is the single source of its meta, for crawlers and browsers alike.
 */

export interface ResolvedDocumentMeta {
  /** Landing-page values when the page passed no overrides. */
  overrides: boolean;
  title: string;
  description: string;
  canonical: string;
  robots: string;
}

/** Last meta recorded during a server render; read by src/entry-server.tsx. */
let serverMeta: ResolvedDocumentMeta | null = null;

export function takeServerMeta(): ResolvedDocumentMeta | null {
  const meta = serverMeta;
  serverMeta = null;
  return meta;
}

/**
 * The OG/Twitter tags that restate a page's own title/description/URL, with
 * the landing value each one goes back to on "/".
 */
const MIRRORS: Array<
  [
    selector: string,
    field: "title" | "description" | "canonical",
    landing: string,
  ]
> = [
  ['meta[property="og:title"]', "title", siteMeta.ogTitle],
  ['meta[name="twitter:title"]', "title", siteMeta.ogTitle],
  ['meta[property="og:description"]', "description", siteMeta.ogDescription],
  ['meta[name="twitter:description"]', "description", siteMeta.ogDescription],
  ['meta[property="og:url"]', "canonical", siteMeta.canonical],
  ['meta[name="twitter:url"]', "canonical", siteMeta.canonical],
];

// The gtag config call fired when consent is granted (or restored on boot)
// reports the initial pageview; only report subsequent SPA navigations, once
// per path. trackPageView is itself a no-op without analytics consent.
let lastTrackedPath =
  typeof window !== "undefined" ? window.location.pathname : "";

interface DocumentMetaOptions {
  title: string;
  description?: string;
  /** Path (e.g. "/terms") appended to the site origin for the canonical URL. */
  canonicalPath?: string;
  /**
   * Overrides the document-wide robots directive, e.g. "noindex". Every route
   * is prerendered as a real crawlable page, so a route that should not
   * surface in search has to say so itself (it also keeps it out of the
   * sitemap). Restored to the landing default
   * when a page passes nothing.
   */
  robots?: string;
}

export function useDocumentMeta(options?: DocumentMetaOptions): void {
  const title = options?.title ?? siteMeta.title;
  const description = options?.description ?? siteMeta.description;
  const canonical = options?.canonicalPath
    ? `${SITE_ORIGIN}${options.canonicalPath}`
    : siteMeta.canonical;
  const robots = options?.robots ?? siteMeta.robots;
  const overrides = options !== undefined;

  if (typeof document === "undefined") {
    // Prerender: effects never run on the server, so record during render.
    serverMeta = { overrides, title, description, canonical, robots };
  }

  useEffect(() => {
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (meta) meta.content = description;
    const link = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (link) link.href = canonical;
    const robotsTag = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (robotsTag) robotsTag.content = robots;

    // Link-preview bots never run JS (they read the prerendered HTML), but keep
    // the live document consistent with it for anything that inspects the DOM.
    const resolved = { title, description, canonical };
    for (const [selector, field, landing] of MIRRORS) {
      const tag = document.querySelector<HTMLMetaElement>(selector);
      if (tag) tag.content = overrides ? resolved[field] : landing;
    }

    const path = window.location.pathname;
    if (path !== lastTrackedPath) {
      lastTrackedPath = path;
      trackPageView(path + window.location.search, title);
    }
  }, [title, description, canonical, robots, overrides]);
}
