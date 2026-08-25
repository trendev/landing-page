/**
 * Turn a captured layout tree (see capture.mjs) into an SVG that Figma's
 * importer converts into editable vector + text layers.
 */
import fs from 'node:fs';

const SHADOWS = false;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = (v) => (Math.round(v * 100) / 100);

export function toSvg(d, weaveDataUri) {
  // Group text runs into the visual lines they were measured on, so a line
  // with mixed inline styles flows as one <text> instead of several boxes
  // pinned at browser-measured offsets (which drift once Figma re-shapes the
  // text in Inter).
  const lineOf = new Map();
  for (const n of d.nodes) {
    if (n.t !== 'x') continue;
    if (!lineOf.has(n.li)) lineOf.set(n.li, []);
    lineOf.get(n.li).push(n);
  }
  const emittedLines = new Set();
  const out = [];
  const defs = [];
  let filterSeq = 0;
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="${esc(d.name || d.route)}" width="${d.pageW}" height="${d.pageH}" viewBox="0 0 ${d.pageW} ${d.pageH}" font-family="Inter">`);
  out.push(`<rect id="page-background" x="0" y="0" width="${d.pageW}" height="${d.pageH}" fill="#070C1C"/>`);

  for (const n of d.nodes) {
    if (n.t === 'canvas') {
      if (weaveDataUri) out.push(`<image id="WeaveBackground" x="${num(n.x)}" y="${num(n.y)}" width="${num(n.w)}" height="${num(n.h)}" preserveAspectRatio="none" xlink:href="${weaveDataUri}"/>`);
      continue;
    }
    if (n.t === 'r') {
      const attrs = [];
      const gOpen = [];
      if (n.o != null && n.o < 1) gOpen.push(`opacity="${n.o}"`);
      let filterRef = '';
      // Shadows are deliberately dropped: Figma rasterises SVG filters on
      // import, which turned every layer on the page into a blurry bitmap.
      if (SHADOWS && n.sh && n.sh.length) {
        const id = `sh${++filterSeq}`;
        const fe = n.sh.map((s) => `<feDropShadow dx="${s.x}" dy="${s.y}" stdDeviation="${num(s.b / 2)}" flood-color="${s.c}" flood-opacity="${s.a}"/>`).join('');
        defs.push(`<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%">${fe}</filter>`);
        filterRef = ` filter="url(#${id})"`;
      }
      const rr = n.r || [0, 0, 0, 0];
      const uniformR = rr.every((v) => v === rr[0]);
      const shapeAttrs = `x="${num(n.x)}" y="${num(n.y)}" width="${num(n.w)}" height="${num(n.h)}"${uniformR && rr[0] ? ` rx="${num(rr[0])}" ry="${num(rr[0])}"` : ''}`;
      const name = ` id="${esc(n.n || 'box')}"`;
      if (n.f) {
        attrs.push(`fill="${n.f}"`);
        if (n.fa != null && n.fa < 1) attrs.push(`fill-opacity="${n.fa}"`);
      } else attrs.push('fill="none"');

      let body = '';
      if (!uniformR && rr.some((v) => v > 0)) {
        body = `<path${name} d="${roundedPath(n.x, n.y, n.w, n.h, rr)}" ${attrs.join(' ')}${filterRef}/>`;
      } else {
        body = `<rect${name} ${shapeAttrs} ${attrs.join(' ')}${filterRef}/>`;
      }
      const g = gOpen.length ? `<g ${gOpen.join(' ')}>` : '';
      const gc = gOpen.length ? '</g>' : '';
      // strokes
      let strokes = '';
      if (n.s) {
        const so = n.sa != null && n.sa < 1 ? ` stroke-opacity="${n.sa}"` : '';
        if (n.sw) {
          const i = n.sw / 2;
          if (uniformR) strokes = `<rect x="${num(n.x + i)}" y="${num(n.y + i)}" width="${num(Math.max(n.w - n.sw, 0))}" height="${num(Math.max(n.h - n.sw, 0))}"${rr[0] ? ` rx="${num(Math.max(rr[0] - i, 0))}" ry="${num(Math.max(rr[0] - i, 0))}"` : ''} fill="none" stroke="${n.s}"${so} stroke-width="${n.sw}"/>`;
          else strokes = `<path d="${roundedPath(n.x + i, n.y + i, n.w - n.sw, n.h - n.sw, rr.map((v) => Math.max(v - i, 0)))}" fill="none" stroke="${n.s}"${so} stroke-width="${n.sw}"/>`;
        } else if (n.sws) {
          const [t, r, b, l] = n.sws;
          const side = (x1, y1, x2, y2, wdt) => `<line x1="${num(x1)}" y1="${num(y1)}" x2="${num(x2)}" y2="${num(y2)}" stroke="${n.s}"${so} stroke-width="${wdt}"/>`;
          if (t) strokes += side(n.x, n.y + t / 2, n.x + n.w, n.y + t / 2, t);
          if (b) strokes += side(n.x, n.y + n.h - b / 2, n.x + n.w, n.y + n.h - b / 2, b);
          if (l) strokes += side(n.x + l / 2, n.y, n.x + l / 2, n.y + n.h, l);
          if (r) strokes += side(n.x + n.w - r / 2, n.y, n.x + n.w - r / 2, n.y + n.h, r);
        }
      }
      out.push(g + body + strokes + gc);
      continue;
    }
    if (n.t === 'v') {
      const markup = d.svgs[n.k];
      if (!markup) continue;
      const m = markup.match(/^<svg([^>]*)>([\s\S]*)<\/svg>$/i);
      if (!m) continue;
      const attrStr = m[1];
      const inner = m[2];
      const vb = (attrStr.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 24 24';
      const [vx, vy, vw, vh] = vb.split(/\s+/).map(Number);
      const keep = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'];
      const gattrs = keep
        .map((k) => { const mm = attrStr.match(new RegExp(k + '="([^"]*)"')); return mm ? `${k}="${mm[1]}"` : null; })
        .filter(Boolean).join(' ');
      const sx = n.w / (vw || 24);
      const sy = n.h / (vh || 24);
      const op = n.o != null && n.o < 1 ? ` opacity="${n.o}"` : '';
      out.push(`<g id="${esc(n.n || 'icon')}"${op} transform="translate(${num(n.x)} ${num(n.y)}) scale(${num(sx)} ${num(sy)}) translate(${-vx} ${-vy})" ${gattrs}>${inner}</g>`);
      continue;
    }
    if (n.t === 'x') {
      if (emittedLines.has(n.li)) continue;
      emittedLines.add(n.li);
      const runs = lineOf.get(n.li);
      const first = runs[0];
      const top = Math.min(...runs.map((r) => r.y));
      const height = Math.max(...runs.map((r) => r.y + r.h)) - top;
      const baseline = num(top + height * 0.79);
      let ax = first.ll != null ? first.ll : first.x;
      let anchor = '';
      if (first.ta === 'c') { ax = (first.ll + first.lr) / 2; anchor = ' text-anchor="middle"'; }
      else if (first.ta === 'e') { ax = first.lr; anchor = ' text-anchor="end"'; }
      const a = [`x="${num(ax)}"`, `y="${baseline}"`, `font-size="${num(first.fs)}"`, `fill="${first.col}"`];
      if (first.fw && first.fw !== 400) a.push(`font-weight="${first.fw}"`);
      if (first.ca != null) a.push(`fill-opacity="${first.ca}"`);
      if (first.ls) a.push(`letter-spacing="${num(first.ls)}"`);
      if (first.it) a.push('font-style="italic"');
      if (first.o != null && first.o < 1) a.push(`opacity="${first.o}"`);
      a.push('xml:space="preserve"');
      const body = runs.map((r) => {
        const same = r.fw === first.fw && r.col === first.col && !r.it === !first.it && !r.u === !first.u && r.fs === first.fs && r.ca === first.ca;
        if (same && runs.length === 1) return esc(r.c);
        const ta = [];
        if (r.fw !== first.fw) ta.push(`font-weight="${r.fw}"`);
        if (r.col !== first.col) ta.push(`fill="${r.col}"`);
        if (r.ca !== first.ca) ta.push(`fill-opacity="${r.ca != null ? r.ca : 1}"`);
        if (r.fs !== first.fs) ta.push(`font-size="${num(r.fs)}"`);
        if (r.it && !first.it) ta.push('font-style="italic"');
        if (r.u) ta.push('text-decoration="underline"');
        return `<tspan${ta.length ? ' ' + ta.join(' ') : ''}>${esc(r.c)}</tspan>`;
      }).join('');
      out.push(`<text ${a.join(' ')}${anchor}>${body}</text>`);
      continue;
    }
    if (n.t === 'img') {
      out.push(`<rect x="${num(n.x)}" y="${num(n.y)}" width="${num(n.w)}" height="${num(n.h)}" fill="#0E1A3A"/>`);
    }
  }
  out.push('</svg>');
  const head = defs.length ? `<defs>${defs.join('')}</defs>` : '';
  return out[0] + head + out.slice(1).join('');
}

function roundedPath(x, y, w, h, r) {
  const [tl, tr, br, bl] = r.map((v) => Math.max(0, Math.min(v, Math.min(w, h) / 2)));
  return `M${num(x + tl)} ${num(y)}H${num(x + w - tr)}A${num(tr)} ${num(tr)} 0 0 1 ${num(x + w)} ${num(y + tr)}V${num(y + h - br)}A${num(br)} ${num(br)} 0 0 1 ${num(x + w - br)} ${num(y + h)}H${num(x + bl)}A${num(bl)} ${num(bl)} 0 0 1 ${num(x)} ${num(y + h - bl)}V${num(y + tl)}A${num(tl)} ${num(tl)} 0 0 1 ${num(x + tl)} ${num(y)}Z`;
}
