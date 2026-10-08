/**
 * Build step 3 of 3 (see `npm run build`): writes a static, fully rendered HTML
 * file for every route in src/app/staticRoutes.ts, plus 404.html, sitemap.xml
 * and robots.txt.
 *
 * Without this, every URL served the same empty `<div id="root">` with the
 * landing page's title, description and canonical, so any crawler or link
 * preview that does not run JS saw each subpage as a blank duplicate of "/".
 *
 * Each page gets the app HTML in #root (hydrated by src/main.tsx) and the head
 * its own useDocumentMeta call asks for. Routes are written twice, as
 * `<route>/index.html` and `<route>.html`: GitHub Pages answers `/faq` from
 * `faq.html` directly, where a directory alone would 301 to `/faq/` and the
 * slash-less canonicals would point at a redirect.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const BUILD = 'build';
const SSR_ENTRY = 'build-ssr/entry-server.js';
const ORIGIN = 'https://trendev.fr';

const { render, staticRoutes } = await import(pathToFileURL(SSR_ENTRY).href);
const template = readFileSync(join(BUILD, 'index.html'), 'utf8');

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Replaces one attribute of the single tag matching `selector`; fails loudly if absent. */
function setAttr(html, tagPattern, attr, value) {
  const re = new RegExp(`(<${tagPattern}[^>]*?\\s${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html: no tag matching ${tagPattern}`);
  return html.replace(re, `$1${escapeAttr(value)}$2`);
}

function renderPage(path, { html, meta }) {
  let page = template;
  if (meta.overrides) {
    page = page.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`);
    const tags = [
      ['meta name="description"', meta.description],
      ['meta name="robots"', meta.robots],
      ['meta property="og:title"', meta.title],
      ['meta name="twitter:title"', meta.title],
      ['meta property="og:description"', meta.description],
      ['meta name="twitter:description"', meta.description],
      ['meta property="og:url"', meta.canonical],
      ['meta name="twitter:url"', meta.canonical],
    ];
    for (const [tag, value] of tags) page = setAttr(page, tag, 'content', value);
    page = setAttr(page, 'link rel="canonical"', 'href', meta.canonical);
  }
  const root = '<div id="root"></div>';
  if (!page.includes(root)) throw new Error('index.html: empty #root not found');
  return page.replace(
    root,
    `<div id="root" data-prerendered-path="${escapeAttr(path)}">${html}</div>`,
  );
}

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

const indexable = [];
for (const path of staticRoutes) {
  const result = await render(path);
  const page = renderPage(path, result);
  if (path === '/') {
    write(join(BUILD, 'index.html'), page);
  } else {
    write(join(BUILD, path, 'index.html'), page);
    write(join(BUILD, `${path}.html`), page);
  }
  // Only self-canonical, indexable pages are sitemap URLs: a page whose
  // canonical points elsewhere (the current Terms' dated URL) is a duplicate.
  const self = `${ORIGIN}${path}`;
  if (!/noindex/i.test(result.meta.robots) && result.meta.canonical === self) {
    indexable.push(self);
  }
}

// GitHub Pages serves this, with a 404 status, for every unknown URL. It has
// no URL of its own, so it carries no canonical (it is noindex anyway).
write(
  join(BUILD, '404.html'),
  renderPage('/404', await render('/404')).replace(/\s*<link rel="canonical"[^>]*>/, ''),
);

write(
  join(BUILD, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`,
);

write(
  join(BUILD, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`,
);

rmSync('build-ssr', { recursive: true, force: true });
console.log(
  `Prerendered ${staticRoutes.length} routes + 404.html; sitemap lists ${indexable.length}.`,
);
