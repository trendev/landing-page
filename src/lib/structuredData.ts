/**
 * schema.org JSON-LD builders for page-level structured data.
 *
 * Site-wide nodes (Organization, WebSite) live in index.html; pages emit their
 * own blocks through `<JsonLd>`, which the prerender puts in the static HTML.
 * Everything here is derived from the same data the page renders, so the
 * markup cannot drift from the visible copy. Keep it free of React imports.
 */
import { SITE_ORIGIN } from "@/data/siteMeta";
import type { PricingTier } from "@/types";

/** The Organization node declared in index.html. */
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;

/**
 * Serialises a JSON-LD object for an inline <script>. Escaping "<" is a cheap
 * defence against a "</script>" ever appearing in the copy.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Home › … › current page. Each crumb is [name, path]. */
export function breadcrumbList(crumbs: Array<[name: string, path: string]>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_ORIGIN}${path}`,
    })),
  };
}

/**
 * One public offer as a Service with its monthly price. Prices are parsed from
 * the frozen display strings in `@/data/pricing` rather than restated, and are
 * always marked VAT-exclusive, matching "excluding applicable taxes". A
 * "From €6,000" price becomes a minimum, not a fixed price.
 */
export function tierService(tier: PricingTier) {
  const amount = Number(tier.price.replace(/[^\d]/g, ""));
  if (!amount)
    throw new Error(`Unparseable price for ${tier.id}: ${tier.price}`);
  const isMinimum = /^from\b/i.test(tier.price);
  const url = `${SITE_ORIGIN}${tier.servicePath}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: tier.name,
    serviceType: "CTO advisory",
    description: tier.tagline,
    url,
    provider: { "@id": ORGANIZATION_ID },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "EUR",
      ...(isMinimum ? {} : { price: amount }),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "EUR",
        ...(isMinimum ? { minPrice: amount } : { price: amount }),
        unitCode: "MON",
        unitText: "month",
        valueAddedTaxIncluded: false,
      },
    },
  };
}

/** Wraps several nodes in one block. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
