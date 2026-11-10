/**
 * Checks the prerendered build (run after `npm run build`; deploy.yml runs it
 * before uploading). Dependency-free, like check-positioning.mjs: it reads the
 * files GitHub Pages will serve and fails on anything a crawler would get
 * wrong. Not a substitute for the Rich Results Test or Search Console.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BUILD = 'build';
const ORIGIN = 'https://trendev.fr';
const read = (file) => readFileSync(join(BUILD, file), 'utf8');

/** Published URLs (Stripe redirects, legal references, inbound links). */
const MUST_BE_INDEXED = [
  '/', '/advisory', '/faq', '/services/cto-decision-review', '/services/cto-advisor',
  '/services/cto-advisor-plus', '/services/fractional-cto', '/terms', '/legal', '/privacy',
];

const attr = (html, tag, name) =>
  html.match(new RegExp(`<${tag}[^>]*?\\s${name}="([^"]*)"`))?.[1];
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (match, index) => {
      try {
        return JSON.parse(match[1]);
      } catch (error) {
        throw new Error(`JSON-LD block ${index} does not parse: ${error.message}`);
      }
    },
  );
const types = (blocks) =>
  blocks.flatMap((block) => block['@graph'] ?? [block]).map((node) => node['@type']);

assert.ok(read('robots.txt').includes(`Sitemap: ${ORIGIN}/sitemap.xml`));
const urls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = urls.map((url) => url.slice(ORIGIN.length) || '/');
for (const path of MUST_BE_INDEXED) assert.ok(paths.includes(path), `Sitemap misses ${path}`);
for (const path of ['/welcome', '/welcome/decision-review', '/terms/2026-12-01']) {
  // 2026-12-01 is the current version: its dated URL canonicalises to /terms.
  assert.ok(!paths.includes(path), `${path} is noindex and must stay out of the sitemap`);
}

const titles = new Map();
for (const path of paths) {
  const files = path === '/' ? ['index.html'] : [`${path}.html`, `${path}/index.html`];
  for (const file of files) assert.ok(existsSync(join(BUILD, file)), `Missing ${file}`);
  if (files.length === 2) assert.equal(read(files[0]), read(files[1]), `${path}: copies differ`);
  const html = read(files[0]);
  const where = `${path}:`;

  assert.ok(!/%SITE_[A-Z]/.test(html), `${where} unfilled index.html placeholder`);
  assert.equal(attr(html, 'div id="root"', 'data-prerendered-path'), path, `${where} root path`);
  assert.ok(!html.includes('<div id="root"></div>'), `${where} empty #root`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${where} needs exactly one <h1>`);
  assert.ok(!html.includes('Loading the Terms'), `${where} prerendered a loading state`);

  const canonical = attr(html, 'link rel="canonical"', 'href');
  assert.equal(canonical, `${ORIGIN}${path}`, `${where} canonical`);
  assert.equal(attr(html, 'meta property="og:url"', 'content'), canonical, `${where} og:url`);
  assert.ok(!/noindex/.test(attr(html, 'meta name="robots"', 'content')), `${where} noindex`);
  const description = attr(html, 'meta name="description"', 'content');
  assert.ok(description && description.length >= 50, `${where} description too short`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  assert.ok(title, `${where} no <title>`);
  assert.ok(!titles.has(title), `${where} same <title> as ${titles.get(title)}`);
  titles.set(title, path);

  jsonLd(html); // every block must parse
}

const typesOn = (file) => types(jsonLd(read(file)));
assert.ok(typesOn('index.html').includes('Organization'));
assert.ok(typesOn('faq.html').includes('FAQPage'));
assert.ok(!typesOn('privacy.html').includes('FAQPage'), 'FAQPage must stay on /faq only');
assert.equal(typesOn('advisory.html').filter((type) => type === 'Service').length, 4);
assert.ok(typesOn('services/cto-advisor.html').includes('BreadcrumbList'));
for (const block of jsonLd(read('advisory.html'))) {
  for (const node of block['@graph'] ?? [block]) {
    if (node['@type'] !== 'Service') continue;
    const spec = node.offers.priceSpecification;
    assert.equal(spec.valueAddedTaxIncluded, false, `${node.name}: prices exclude taxes`);
    assert.equal(spec.priceCurrency, 'EUR');
    // The one-off review must never reach a rich result as monthly (issue #59).
    if (node.name === 'CTO Decision Review') assert.ok(!spec.unitCode, 'Decision Review JSON-LD is monthly');
  }
}
const review = read('services/cto-decision-review.html');
assert.ok(typesOn('services/cto-decision-review.html').includes('BreadcrumbList'));
for (const tag of ['meta name="description"', 'meta property="og:description"']) {
  const text = attr(review, tag, 'content');
  assert.ok(/one-time/.test(text) && !/month/i.test(text), `${tag} on the review page must read one-time`);
}

for (const file of ['welcome.html', 'welcome/decision-review.html']) {
  assert.match(attr(read(file), 'meta name="robots"', 'content'), /noindex/, `${file} must be noindex`);
}
// Terms v1.1 (approved 2026-11-10) is served at /terms; v1.0 keeps its own URL.
assert.equal(attr(read('terms/2026-12-01.html'), 'link rel="canonical"', 'href'), `${ORIGIN}/terms`);
assert.ok(!/noindex/.test(attr(read('terms/2026-12-01.html'), 'meta name="robots"', 'content') ?? ''), 'v1.1 is no longer a draft');
assert.ok(read('terms.html').includes('Version <!-- -->1.1') || read('terms.html').includes('Version 1.1'), '/terms serves v1.1');
assert.ok(paths.includes('/terms/2026-09-01'), 'The superseded v1.0 stays published and indexed');
const notFound = read('404.html');
assert.match(attr(notFound, 'meta name="robots"', 'content'), /noindex/);
assert.ok(!notFound.includes('rel="canonical"'), '404.html must not declare a canonical');

const home = read('index.html');
for (const asset of ['og-image.jpg', 'favicon.png', 'logo.svg', 'icon-192.png', 'apple-touch-icon.png']) {
  assert.ok(existsSync(join(BUILD, asset)), `Missing /${asset}`);
}
assert.equal(attr(home, 'meta property="og:image"', 'content'), `${ORIGIN}/og-image.jpg`);
assert.match(home.match(/<title>([^<]*)<\/title>/)[1], /Fractional CTO/, 'Home title must lead with the offer');

// Google ignores Organization logos under 112px (PNG width/height: bytes 16-23).
const organization = jsonLd(home).find((block) => block['@type'] === 'Organization');
const logoUrl = organization.logo.url ?? organization.logo;
assert.ok(logoUrl.startsWith(`${ORIGIN}/`), 'Organization logo must be on this site');
const logo = readFileSync(join(BUILD, logoUrl.slice(ORIGIN.length + 1)));
const [width, height] = [logo.readUInt32BE(16), logo.readUInt32BE(20)];
assert.ok(width >= 112 && height >= 112 && width === height, `Organization logo is ${width}×${height}`);

console.log(`SEO checks passed: ${paths.length} indexable routes, /welcome and 404 noindex.`);
