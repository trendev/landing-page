import { useEffect } from "react";

import { trackPageView } from "@/lib/analytics";

/**
 * Per-route document meta. index.html stays the SEO source of truth for the
 * landing page and all OG/JSON-LD markup; subpages only override title,
 * description and canonical at runtime. The landing defaults are captured
 * once at module load and restored when a page passes no overrides.
 */

const SITE_ORIGIN = "https://trendev.fr";

const defaults = {
  title: typeof document !== "undefined" ? document.title : "",
  description:
    typeof document !== "undefined"
      ? (document.querySelector<HTMLMetaElement>('meta[name="description"]')
          ?.content ?? "")
      : "",
  canonical:
    typeof document !== "undefined"
      ? (document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
          ?.href ?? `${SITE_ORIGIN}/`)
      : `${SITE_ORIGIN}/`,
  robots:
    typeof document !== "undefined"
      ? (document.querySelector<HTMLMetaElement>('meta[name="robots"]')
          ?.content ?? "index, follow")
      : "index, follow",
};

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
   * Overrides the document-wide robots directive, e.g. "noindex". deploy.yml
   * gives every route a real crawlable entry point, so a route that should not
   * surface in search has to say so itself. Restored to the index.html default
   * when a page passes nothing.
   */
  robots?: string;
}

export function useDocumentMeta(options?: DocumentMetaOptions): void {
  const title = options?.title ?? defaults.title;
  const description = options?.description ?? defaults.description;
  const canonical = options?.canonicalPath
    ? `${SITE_ORIGIN}${options.canonicalPath}`
    : defaults.canonical;
  const robots = options?.robots ?? defaults.robots;

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

    const path = window.location.pathname;
    if (path !== lastTrackedPath) {
      lastTrackedPath = path;
      trackPageView(path + window.location.search, title);
    }
  }, [title, description, canonical, robots]);
}
