/**
 * The landing page's head: <title>, description, canonical, robots and the
 * OG/Twitter card. Single source for both places that need it:
 *
 * - index.html, whose `%SITE_*%` placeholders are filled from here by the
 *   `siteMeta` plugin in vite.config.ts (dev and build alike);
 * - useDocumentMeta, which restores these values when the visitor navigates
 *   back to "/" from a subpage.
 *
 * It used to live only in index.html, with the hook reading it back out of the
 * DOM at load. Prerendering broke that: a visitor who lands on /faq now
 * receives a document whose head already describes /faq, so the hook would
 * have taken the FAQ's meta for the landing defaults.
 *
 * Imported by vite.config.ts, so keep it free of `@/` imports and of anything
 * that is not plain data.
 */
export const SITE_ORIGIN = "https://trendev.fr";

export const siteMeta = {
  /** "Fractional CTO" leads: it is the most-searched name for the offer. */
  title: "Fractional CTO, CTO Advisory & Technical Due Diligence | TRENDev",
  description:
    "Fractional CTO, CTO advisory and technical due diligence for founders, growing startups and investors, plus technology leadership and hands-on product delivery.",
  canonical: `${SITE_ORIGIN}/`,
  robots: "index, follow",
  /** The social card copy differs from <title>/description on purpose. */
  ogTitle: "CTO Advisory, Technical Due Diligence & Delivery | TRENDev",
  ogDescription:
    "Your technology partner, from idea to scale. Technical advice, CTO leadership and delivery for founders, growing startups and investors.",
  /**
   * Google ignores meta keywords (Bing weighs them, lightly). Keep them to
   * services the site actually names, never terms it does not substantiate.
   */
  keywords: [
    "fractional CTO",
    "CTO as a service",
    "CTO advisory",
    "technical due diligence",
    "technology due diligence for investors",
    "startup CTO",
    "CTO audit",
    "technical leadership",
    "engineering leadership",
    "software architecture review",
    "enterprise architecture",
    "cloud consulting",
    "DevOps consulting",
    "AI consulting",
    "AI readiness assessment",
    "full-stack development",
    "blockchain and Web3 development",
    "technology consulting",
  ].join(", "),
} as const;
