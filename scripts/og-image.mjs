/**
 * Regenerates public/og-image.jpg, the 1200×630 link-preview card (og:image /
 * twitter:image in index.html), from the live hero rather than a separate
 * design: the real headline over the real WeaveBackground, at the size every
 * major preview (LinkedIn, X, Slack, WhatsApp) crops to.
 *
 * Requires playwright (not a repo dependency, see scripts/figma-sync/README.md)
 * and a running build: `npm run build && npx vite preview --port 4173`, then
 * `node scripts/og-image.mjs [url]`. Re-run after a hero or brand change and
 * commit the PNG.
 */
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    // A single still frame of the weave instead of an arbitrary animation phase.
    reducedMotion: 'reduce',
  });
  // Keep the cookie banner out of the shot (a stored choice suppresses it).
  await page.addInitScript(() =>
    localStorage.setItem('trendev.analytics-consent', 'denied'),
  );
  await page.goto(url, { waitUntil: 'networkidle' });
  // The hero's proof line starts right at the 630px fold; half a sentence
  // along the bottom edge reads as a broken crop.
  await page
    .getByText(/^Engineering and CTO expertise spanning/)
    .evaluate((el) => (el.style.visibility = 'hidden'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 88 });
  console.log('Wrote public/og-image.jpg');
} finally {
  await browser.close();
}
