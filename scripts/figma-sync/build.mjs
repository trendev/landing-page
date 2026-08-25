/**
 * One command to rebuild the whole Figma sync payload.
 *
 *   npm run dev                        # in another shell
 *   node scripts/figma-sync/build.mjs  # writes figma-out/svg/*.svg
 *
 * Then upload the SVGs with the Figma MCP `upload_assets` tool (one submit URL
 * per file, POSTed as multipart/form-data so the filename becomes the layer
 * name) and arrange them with `use_figma`. See README.md.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { toSvg } from './to-svg.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] || 'figma-out';
const WIDTHS = [
  { w: 1440, prefix: 'D', label: 'Desktop 1440' },
  { w: 390, prefix: 'M', label: 'Mobile 390' },
];
const routes = JSON.parse(fs.readFileSync(path.join(here, 'routes.json'), 'utf8'));

/** Shrink the captured weave frame so the data URI stays a few tens of kB. */
async function toJpeg(src, dest, width) {
  const b64 = 'data:image/png;base64,' + fs.readFileSync(src).toString('base64');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = await page.evaluate(async ({ b64, width }) => {
    const img = new Image();
    await new Promise((r) => { img.onload = r; img.src = b64; });
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = Math.round(img.height * (width / img.width));
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.84);
  }, { b64, width: Math.min(width, 900) });
  fs.writeFileSync(dest, Buffer.from(url.split(',')[1], 'base64'));
  await browser.close();
}

const svgDir = path.join(OUT, 'svg');
fs.rmSync(svgDir, { recursive: true, force: true });
fs.mkdirSync(svgDir, { recursive: true });

for (const { w, prefix, label } of WIDTHS) {
  const dir = path.join(OUT, String(w));
  const capture = spawnSync(
    process.execPath,
    [path.join(here, 'capture.mjs'), dir, path.join(here, 'routes.json'), String(w)],
    { stdio: 'inherit' },
  );
  if (capture.status !== 0) process.exit(capture.status ?? 1);

  const weavePng = path.join(dir, `weave-${w}.png`);
  const weaveJpg = path.join(dir, `weave-${w}.jpg`);
  await toJpeg(weavePng, weaveJpg, w);
  const uri = 'data:image/jpeg;base64,' + fs.readFileSync(weaveJpg).toString('base64');

  routes.forEach((route, i) => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, `${route.slug}.json`), 'utf8'));
    data.name = route.name;
    const num = String(i + 1).padStart(2, '0');
    const file = path.join(svgDir, `${prefix}${num} ${route.name} (${label}).svg`);
    const svg = toSvg(data, uri);
    fs.writeFileSync(file, svg);
    console.log(`${file}  ${data.pageW}x${data.pageH}  ${Math.round(svg.length / 1024)}kb`);
  });
}
