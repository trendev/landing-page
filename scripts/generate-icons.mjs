/**
 * Renders public/logo.svg (the TRENDev mark, redrawn as a vector from the
 * original 32px favicon) into the PNG sizes the head and structured data use:
 *
 * - logo-512.png: the Organization `logo` in index.html. Google ignores logos
 *   under 112px and shows them on white, hence the size and the white ground.
 * - apple-touch-icon.png: 180px, opaque (iOS fills transparency with black).
 * - icon-192.png: a multiple of 48px, as Google's search-result favicon
 *   guidance asks; transparent like the SVG icon.
 *
 * Requires playwright (not a repo dependency, see scripts/figma-sync/README.md):
 * `node scripts/generate-icons.mjs`. Re-run after changing logo.svg and commit
 * the PNGs. public/favicon.png (the original 32px mark) is left as is.
 */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const svg = readFileSync('public/logo.svg', 'utf8');
const ICONS = [
  { file: 'public/logo-512.png', size: 512, background: '#FFFFFF', padding: 0.12 },
  { file: 'public/apple-touch-icon.png', size: 180, background: '#FFFFFF', padding: 0.14 },
  { file: 'public/icon-192.png', size: 192, background: null, padding: 0.04 },
];

const browser = await chromium.launch();
try {
  for (const { file, size, background, padding } of ICONS) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    const inset = Math.round(size * padding);
    const mark = svg.replace('<svg ', `<svg width="${size - 2 * inset}" height="${size - 2 * inset}" `);
    await page.setContent(
      `<body style="margin:0;padding:${inset}px;background:${background ?? 'transparent'}">${mark}</body>`,
    );
    await page.screenshot({ path: file, omitBackground: background === null });
    await page.close();
    console.log(`Wrote ${file} (${size}×${size})`);
  }
} finally {
  await browser.close();
}
