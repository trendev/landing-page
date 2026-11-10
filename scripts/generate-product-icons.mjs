/**
 * Renders the web derivatives of the product icons (issue #61) from the
 * approved 1254px masters in public/images/products/<tier-id>-v1.png.
 *
 * The masters are ~1.1 MiB each and stay the source (and the Stripe product
 * image); the site only loads these small WebP copies, picked by `srcset`.
 * 80/160/240px cover the 32 to 80 CSS px display sizes at 1x to 3x.
 *
 * Requires the `cwebp` CLI (libwebp, e.g. `brew install webp`); it is not a
 * repo dependency. Run `node scripts/generate-product-icons.mjs` after a
 * master changes and commit the output.
 */
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

export const PRODUCT_ICON_TIERS = [
  'cto-decision-review',
  'cto-advisor',
  'cto-advisor-plus',
  'fractional-cto',
];
export const PRODUCT_ICON_WIDTHS = [80, 160, 240];

for (const tier of PRODUCT_ICON_TIERS) {
  const master = `public/images/products/${tier}-v1.png`;
  for (const width of PRODUCT_ICON_WIDTHS) {
    const out = `public/images/products/${tier}-v1-${width}.webp`;
    execFileSync('cwebp', ['-quiet', '-q', '85', '-m', '6', '-resize', String(width), String(width), master, '-o', out]);
    console.log(`${out}  ${statSync(out).size} bytes`);
  }
}
