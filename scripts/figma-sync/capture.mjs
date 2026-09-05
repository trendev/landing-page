/**
 * Capture every route of the running dev server as a layout tree.
 *
 * Walks the live DOM and records, in paint order, the boxes worth drawing
 * (fills, strokes, radii), the lucide SVG markup, and the text — split into
 * the visual lines the browser actually laid out, and within a line into
 * runs that share an inline style, so a wrapped paragraph with a bold phrase
 * or a link survives the trip. `to-svg.mjs` turns the result into an SVG that
 * Figma imports as editable vectors and Inter text.
 *
 *   node scripts/figma-sync/capture.mjs <outDir> <routesJsonPath> [width]
 *
 * Requires playwright (not a repo dependency -- see README.md) and a dev
 * server on http://localhost:3000.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = process.argv[2] || './figma-out';
const BASE = process.env.FIGMA_SYNC_BASE || 'http://localhost:3000';
const ROUTES = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const WIDTH = Number(process.argv[4] || 1440);

fs.mkdirSync(OUT, { recursive: true });

const EXTRACT = () => {
  const px = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0; };
  const _cv = document.createElement('canvas'); _cv.width = _cv.height = 1;
  const _ctx = _cv.getContext('2d', { willReadFrequently: true });
  const _cache = new Map();
  const parseColor = (c) => {
    if (!c) return null;
    if (_cache.has(c)) return _cache.get(c);
    let out = null;
    try {
      _ctx.fillStyle = '#000000';
      _ctx.fillStyle = c;
      if (_ctx.fillStyle !== '#000000' || /^(#000000|black|rgba?\(0,\s*0,\s*0)/i.test(c.trim())) {
        _ctx.clearRect(0, 0, 1, 1);
        _ctx.fillRect(0, 0, 1, 1);
        const d = _ctx.getImageData(0, 0, 1, 1).data;
        const a = Math.round((d[3] / 255) * 1000) / 1000;
        if (a > 0) {
          const hex = '#' + [d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join('');
          out = { hex, a };
        }
      }
    } catch { out = null; }
    _cache.set(c, out);
    return out;
  };
  const parseGradient = (bi) => {
    if (!bi || !bi.startsWith('linear-gradient')) return null;
    const inner = bi.slice(bi.indexOf('(') + 1, bi.lastIndexOf(')'));
    const parts = []; let depth = 0, cur = '';
    for (const ch of inner) {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; } else cur += ch;
    }
    parts.push(cur.trim());
    let angle = 180; let i = 0;
    if (/^-?[\d.]+deg$/.test(parts[0])) { angle = parseFloat(parts[0]); i = 1; }
    else if (/^to /.test(parts[0])) {
      const dir = parts[0].slice(3).trim();
      angle = { top: 0, right: 90, bottom: 180, left: 270 }[dir] ?? 180; i = 1;
    }
    const stops = [];
    for (; i < parts.length; i++) {
      const sm = parts[i].match(/^(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}|transparent|[a-z]+)\s*([\d.]+%)?/);
      if (!sm) continue;
      let col = sm[1] === 'transparent' ? { hex: '#000000', a: 0 } : parseColor(sm[1]) || { hex: '#000000', a: 0 };
      stops.push({ c: col.hex, a: col.a, p: sm[2] ? parseFloat(sm[2]) / 100 : null });
    }
    if (stops.length < 2) return null;
    stops.forEach((s, k) => { if (s.p === null) s.p = k / (stops.length - 1); });
    return { angle, stops };
  };

  const parseShadow = (bs) => {
    if (!bs || bs === 'none') return null;
    const parts = []; let depth = 0, cur = '';
    for (const ch of bs) {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; } else cur += ch;
    }
    parts.push(cur.trim());
    const out = [];
    for (const p of parts) {
      if (!p || p.includes('inset')) continue;
      const cm = p.match(/(rgba?\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\)|#[0-9a-fA-F]{3,8})/);
      const col = cm ? parseColor(cm[1]) : { hex: '#000000', a: 1 };
      if (!col) continue;
      const nums = (cm ? p.replace(cm[1], '') : p).match(/-?[\d.]+px/g) || [];
      const v = nums.map((n) => parseFloat(n));
      out.push({ c: col.hex, a: col.a, x: v[0] || 0, y: v[1] || 0, b: v[2] || 0, sp: v[3] || 0 });
    }
    return out.length ? out : null;
  };

  const doc = document.documentElement;
  const pageW = Math.round(doc.clientWidth);
  const pageH = Math.round(Math.max(document.body.scrollHeight, doc.scrollHeight));
  const nodes = [];
  let lineSeq = 0;
  const svgs = {};
  let svgSeq = 0;
  const svgKeyOf = (markup) => {
    for (const k in svgs) if (svgs[k] === markup) return k;
    const k = 's' + (++svgSeq);
    svgs[k] = markup;
    return k;
  };
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'HEAD', 'META', 'LINK', 'TITLE', 'BR']);

  const walk = (el, depth) => {
    if (SKIP_TAGS.has(el.tagName)) return;
    if (el.hasAttribute && el.hasAttribute('inert')) return;
    if (el.getAttribute && el.getAttribute('aria-hidden') === 'true' && !el.querySelector('svg,img')) {
      // decorative: still draw if it has a visible box
    }
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const op = parseFloat(cs.opacity);
    if (op === 0) return;
    const rect = el.getBoundingClientRect();
    const x = px(rect.left + window.scrollX);
    const y = px(rect.top + window.scrollY);
    const w = px(rect.width);
    const h = px(rect.height);
    if (w <= 0 || h <= 0) return;
    if (y > pageH + 200) return;

    const fill = parseColor(cs.backgroundColor);
    const grad = parseGradient(cs.backgroundImage);
    const bw = ['Top', 'Right', 'Bottom', 'Left'].map((s) => px(cs['border' + s + 'Width']));
    const bc = parseColor(cs.borderTopColor);
    const uniformBorder = bw.every((v) => v === bw[0]) && bw[0] > 0;
    const anyBorder = bw.some((v) => v > 0);
    const maxR = Math.min(w, h) / 2;
    const radii = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'].map((k) => Math.min(px(cs[k]), maxR));
    const shadow = parseShadow(cs.boxShadow);

    const isMedia = el.tagName === 'IMG' || el.tagName === 'SVG' || el.tagName === 'CANVAS' || el.tagName === 'svg';
    const tag = el.tagName.toLowerCase();

    // container box worth drawing?
    if (fill || grad || (anyBorder && bc) || (shadow && fill)) {
      const n = { t: 'r', n: (el.getAttribute('data-fig') || tag), x, y, w, h };
      if (fill) { n.f = fill.hex; if (fill.a < 1) n.fa = fill.a; }
      if (grad) n.g = grad;
      if (radii.some((v) => v > 0)) n.r = radii;
      if (anyBorder && bc) {
        n.s = bc.hex; if (bc.a < 1) n.sa = bc.a;
        if (uniformBorder) n.sw = bw[0]; else n.sws = bw;
      }
      if (shadow) n.sh = shadow;
      if (op < 1) n.o = op;
      nodes.push(n);
    }

    if (tag === 'svg') {
      const col = (parseColor(cs.color) || { hex: '#F1F4FF', a: 1 });
      const clone = el.cloneNode(true);
      clone.setAttribute('width', String(w));
      clone.setAttribute('height', String(h));
      clone.removeAttribute('class');
      let markup = clone.outerHTML.replace(/currentColor/g, col.hex);
      const cls = (el.getAttribute('class') || '').match(/lucide-[a-z0-9-]+/);
      nodes.push({ t: 'v', n: cls ? cls[0].replace('lucide-', '') : 'icon', x, y, w, h, k: svgKeyOf(markup), o: op < 1 ? op : undefined, ca: col.a < 1 ? col.a : undefined });
      return;
    }
    if (tag === 'img') {
      nodes.push({ t: 'img', n: el.getAttribute('alt') || 'image', x, y, w, h, src: el.currentSrc || el.src });
      return;
    }
    if (tag === 'canvas') {
      nodes.push({ t: 'canvas', n: 'WeaveBackground', x, y, w, h });
      return;
    }

    // text container: has a direct non-empty text child
    let hasText = false;
    for (const c of el.childNodes) {
      if (c.nodeType === 3 && c.nodeValue.trim()) { hasText = true; break; }
    }
    if (hasText) {
      // Split into runs: one per (visual line x inline style). Soft wraps are
      // invisible to innerText, and inline <strong>/<a> carry their own colour,
      // so both are recovered by walking the text character by character.
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const rg = document.createRange();
      const runs = [];
      let cur = null;
      let tn;
      while ((tn = walker.nextNode())) {
        const parent = tn.parentElement;
        if (!parent) continue;
        const pcs = getComputedStyle(parent);
        if (pcs.display === 'none' || pcs.visibility === 'hidden') continue;
        const str = tn.nodeValue;
        for (let i = 0; i < str.length; i++) {
          rg.setStart(tn, i); rg.setEnd(tn, i + 1);
          const r = rg.getBoundingClientRect();
          const ch = str[i];
          if (r.width === 0 && r.height === 0) { if (cur) cur.text += ch; continue; }
          const top = Math.round(r.top * 10) / 10;
          if (!cur || cur.parent !== parent || Math.abs(cur.top - top) > 1.2) {
            cur = { parent, top, left: r.left, right: r.right, bottom: r.bottom, text: ch };
            runs.push(cur);
          } else {
            cur.text += ch;
            cur.left = Math.min(cur.left, r.left);
            cur.right = Math.max(cur.right, r.right);
            cur.bottom = Math.max(cur.bottom, r.bottom);
            cur.top = Math.min(cur.top, top);
          }
        }
      }
      // group runs into visual lines (a wrapped paragraph is several lines,
      // and one line can hold several inline styles)
      let li = 0;
      let prevTop = null;
      for (const run of runs) {
        if (prevTop !== null && Math.abs(run.top - prevTop) > 1.2) li++;
        prevTop = run.top;
        run.li = li;
      }
      const lineBox = {};
      for (const run of runs) {
        const b = (lineBox[run.li] = lineBox[run.li] || { l: Infinity, r: -Infinity });
        b.l = Math.min(b.l, run.left);
        b.r = Math.max(b.r, run.right);
      }
      const align = cs.textAlign;
      lineSeq++;
      for (const run of runs) {
        const text = run.text.replace(/\u00a0/g, ' ');
        if (!text.trim()) continue;
        const pcs = getComputedStyle(run.parent);
        const col = parseColor(pcs.color) || { hex: '#F1F4FF', a: 1 };
        const deco = pcs.textDecorationLine && pcs.textDecorationLine !== 'none' ? pcs.textDecorationLine : undefined;
        nodes.push({
          t: 'x',
          x: px(run.left + window.scrollX),
          y: px(run.top + window.scrollY),
          w: px(run.right - run.left),
          h: px(run.bottom - run.top),
          c: text,
          fs: px(pcs.fontSize),
          fw: parseInt(pcs.fontWeight, 10) || 400,
          col: col.hex,
          ca: col.a < 1 ? col.a : undefined,
          ls: pcs.letterSpacing === 'normal' ? 0 : px(pcs.letterSpacing),
          it: pcs.fontStyle === 'italic' ? 1 : undefined,
          u: deco && deco.includes('underline') ? 1 : undefined,
          o: op < 1 ? op : undefined,
          li: lineSeq + '-' + run.li,
          ta: align === 'center' ? 'c' : (align === 'right' || align === 'end') ? 'e' : undefined,
          ll: px(lineBox[run.li].l + window.scrollX),
          lr: px(lineBox[run.li].r + window.scrollX),
        });
      }
      return;
    }

    if (depth > 40) return;
    for (const c of el.children) walk(c, depth + 1);
  };

  // A placeholder lives in the browser's shadow DOM: it has no text node, so
  // the character-by-character walker above cannot see it and every empty
  // field would capture as a blank box. Mirror each one into a real element,
  // matched to the field's content box and typography, so the normal text
  // path measures it like any other copy. Only empty fields show one.
  const phMirrors = [];
  for (const f of document.querySelectorAll('input[placeholder], textarea[placeholder]')) {
    if (f.value !== '' || !f.placeholder) continue;
    const fcs = getComputedStyle(f);
    if (fcs.display === 'none' || fcs.visibility === 'hidden') continue;
    const r = f.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    const num = (v) => parseFloat(v) || 0;
    const padL = num(fcs.paddingLeft) + num(fcs.borderLeftWidth);
    const padT = num(fcs.paddingTop) + num(fcs.borderTopWidth);
    const padR = num(fcs.paddingRight) + num(fcs.borderRightWidth);
    const padB = num(fcs.paddingBottom) + num(fcs.borderBottomWidth);
    const d = document.createElement('div');
    d.textContent = f.placeholder;
    Object.assign(d.style, {
      position: 'absolute',
      margin: '0',
      pointerEvents: 'none',
      whiteSpace: 'pre-wrap',
      overflow: 'hidden',
      left: r.left + window.scrollX + padL + 'px',
      top: r.top + window.scrollY + padT + 'px',
      width: Math.max(0, r.width - padL - padR) + 'px',
      height: Math.max(0, r.height - padT - padB) + 'px',
      fontFamily: fcs.fontFamily,
      fontSize: fcs.fontSize,
      fontWeight: fcs.fontWeight,
      fontStyle: fcs.fontStyle,
      lineHeight: fcs.lineHeight,
      letterSpacing: fcs.letterSpacing,
      // ::placeholder carries its own colour; the field's own colour is what
      // the typed answer would use, which is not what is on screen here.
      color: getComputedStyle(f, '::placeholder').color || fcs.color,
    });
    document.body.appendChild(d);
    phMirrors.push(d);
  }

  for (const c of document.body.children) walk(c, 0);

  for (const d of phMirrors) d.remove();
  return { pageW, pageH, nodes, svgs };
};

/**
 * Analytics consent is opt-in, so the cookie banner covers the first viewport
 * on a cold load. Pages are captured with a stored refusal (no banner, and no
 * request to Google); the banner gets its own `showConsent` frame instead.
 */
const browser = await chromium.launch();
for (const route of ROUTES) {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: 900 }, deviceScaleFactor: 1 });
  if (!route.showConsent) {
    await page.addInitScript(() => {
      try { window.localStorage.setItem('trendev.analytics-consent', 'denied'); } catch {}
    });
  }
  const url = BASE + route.path;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  if (route.before) { await page.evaluate(route.before); await page.waitForTimeout(900); }
  const data = await page.evaluate(EXTRACT);
  if (route.h) {
    data.pageH = route.h;
    data.nodes = data.nodes.filter((n) => n.y < route.h);
    const used = new Set(data.nodes.filter((n) => n.k).map((n) => n.k));
    for (const k of Object.keys(data.svgs)) if (!used.has(k)) delete data.svgs[k];
  }
  data.route = route.path;
  data.name = route.name;
  data.title = await page.title();
  const slug = route.slug;
  fs.writeFileSync(path.join(OUT, slug + '.json'), JSON.stringify(data));
  if (route.h) await page.screenshot({ path: path.join(OUT, slug + '-full.png'), clip: { x: 0, y: 0, width: WIDTH, height: route.h } });
  else await page.screenshot({ path: path.join(OUT, slug + '-full.png'), fullPage: true });
  console.log(slug, data.pageW + 'x' + data.pageH, data.nodes.length + ' nodes', Object.keys(data.svgs).length + ' svgs', JSON.stringify(data).length + 'b');
  // The WeaveBackground canvas only rasterises for the first viewport, so it
  // is captured once per width, with everything else hidden, and embedded as
  // the still stand-in behind every frame at that width.
  if (route.weave) {
    await page.evaluate(() => {
      const cv = document.querySelector('canvas');
      const keep = new Set();
      for (let n = cv; n; n = n.parentElement) keep.add(n);
      document.querySelectorAll('body *').forEach((el) => {
        if (!keep.has(el) && !cv.contains(el)) el.style.visibility = 'hidden';
      });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, 'weave-' + WIDTH + '.png'), clip: { x: 0, y: 0, width: WIDTH, height: 900 } });
  }
  await page.close();
}
await browser.close();
