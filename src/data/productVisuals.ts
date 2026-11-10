import type { TierId } from "@/types";

/**
 * One product icon per named offer (issue #61), the same artwork as its
 * Stripe Product image. Keyed by `TierId`, never by price or array order:
 * Decision Review and Advisor both show €1,500 but are different products.
 *
 * The 1254px masters (`<tier-id>-v1.png`) stay the source and the Stripe
 * image; pages load only the small WebP derivatives from
 * `scripts/generate-product-icons.mjs`. Bump the version suffix, never
 * overwrite a published file, so Stripe and caches never show a stale icon.
 */
export const PRODUCT_ICON_WIDTHS = [80, 160, 240] as const;

const VERSION = "v1";

export interface ProductVisual {
  /** Full-size master PNG: Stripe product image and future exports. */
  master: string;
  /** Smallest derivative, the `src` fallback. */
  src: string;
  /** All derivatives, for `srcset` with width descriptors. */
  srcSet: string;
}

function visual(tierId: TierId): ProductVisual {
  const base = `/images/products/${tierId}-${VERSION}`;
  return {
    master: `${base}.png`,
    src: `${base}-${PRODUCT_ICON_WIDTHS[0]}.webp`,
    srcSet: PRODUCT_ICON_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", "),
  };
}

export const productVisuals: Record<TierId, ProductVisual> = {
  "cto-decision-review": visual("cto-decision-review"),
  "cto-advisor": visual("cto-advisor"),
  "cto-advisor-plus": visual("cto-advisor-plus"),
  "fractional-cto": visual("fractional-cto"),
};
