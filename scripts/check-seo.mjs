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
  '/', '/advisory', '/faq', '/services/cto-advisor', '/services/cto-advisor-plus',
  '/services/fractional-cto', '/terms', '/legal', '/privacy',
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
assert.ok(!paths.includes('/welcome'), '/welcome is noindex and must stay out of the sitemap');

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
assert.equal(typesOn('advisory.html').filter((type) => type === 'Service').length, 3);
assert.ok(typesOn('services/cto-advisor.html').includes('BreadcrumbList'));
for (const block of jsonLd(read('advisory.html'))) {
  for (const node of block['@graph'] ?? [block]) {
    if (node['@type'] !== 'Service') continue;
    const spec = node.offers.priceSpecification;
    assert.equal(spec.valueAddedTaxIncluded, false, `${node.name}: prices exclude taxes`);
    assert.equal(spec.priceCurrency, 'EUR');
  }
}

const welcome = read('welcome.html');
assert.match(attr(welcome, 'meta name="robots"', 'content'), /noindex/);
const notFound = read('404.html');
assert.match(attr(notFound, 'meta name="robots"', 'content'), /noindex/);
assert.ok(!notFound.includes('rel="canonical"'), '404.html must not declare a canonical');

for (const asset of ['og-image.jpg', 'favicon.png']) {
  assert.ok(existsSync(join(BUILD, asset)), `Missing /${asset}`);
}
assert.equal(attr(read('index.html'), 'meta property="og:image"', 'content'), `${ORIGIN}/og-image.jpg`);

console.log(`SEO checks passed: ${paths.length} indexable routes, /welcome and 404 noindex.`);
