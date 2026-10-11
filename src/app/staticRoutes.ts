import { serviceDescriptions } from "@/data/serviceDescriptions";
import { termsVersionSummaries } from "@/data/terms";

/**
 * Every URL scripts/prerender.mjs writes a static HTML file for, i.e. every
 * route GitHub Pages serves with a real 200 (anything else falls through to
 * the 404.html fallback, which still boots the app but answers 404).
 *
 * Built from the data that defines the routes, so a new service page or Terms
 * version gets its file, its sitemap entry and its prerendered head without a
 * second list to keep in sync. Keep the static part in step with `matchRoute`
 * in router.tsx. Whether a route is indexable is not decided here: a page that
 * passes `robots: "noindex"` to useDocumentMeta is left out of the sitemap.
 */
export const staticRoutes: string[] = [
  "/",
  "/advisory",
  "/faq",
  ...serviceDescriptions.map((service) => `/services/${service.slug}`),
  "/terms",
  ...termsVersionSummaries.map((summary) => `/terms/${summary.date}`),
  "/legal",
  "/privacy",
  "/welcome",
];
