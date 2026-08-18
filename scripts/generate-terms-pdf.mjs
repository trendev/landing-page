#!/usr/bin/env node
/**
 * Generates the committed Terms of Service PDF from the built, dated /terms
 * route, so the PDF is guaranteed to match the version clients read online.
 *
 * Usage:   node scripts/generate-terms-pdf.mjs <effective-date>
 * Example: node scripts/generate-terms-pdf.mjs 2026-09-01
 *
 * Run manually when publishing a Terms version (not part of CI). Output goes
 * to public/terms/trendev-terms-of-service-<date>.pdf and MUST be committed;
 * once committed, the matching dated terms module is frozen (see
 * docs/legal-versioning.md).
 *
 * Requires a Chromium/Chrome binary: set CHROME_BIN, or one is auto-detected
 * (Playwright's /opt/pw-browsers install, or chromium/google-chrome on PATH).
 */
import { execFileSync, execSync, spawn } from "node:child_process";
import { existsSync, globSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const date = process.argv[2];
if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error("Usage: node scripts/generate-terms-pdf.mjs <YYYY-MM-DD>");
  process.exit(1);
}

function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) {
    return process.env.CHROME_BIN;
  }
  const home = process.env.HOME ?? "";
  const candidates = [
    // Linux (CI containers and dev boxes)
    ...globSync("/opt/pw-browsers/chromium-*/chrome-linux/chrome"),
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    // macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ...globSync(
      `${home}/Library/Caches/ms-playwright/chromium-*/chrome-mac/Chromium.app/Contents/MacOS/Chromium`,
    ),
  ];
  const found = candidates.find((path) => existsSync(path));
  if (!found) {
    console.error(
      "No Chromium/Chrome binary found. Set CHROME_BIN to a browser binary.",
    );
    process.exit(1);
  }
  return found;
}

async function waitForServer(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`Preview server did not become ready at ${url}`);
}

const chrome = findChrome();
const port = 4173;
const pageUrl = `http://localhost:${port}/terms/${date}`;
const outDir = resolve(root, "public/terms");
const outFile = resolve(outDir, `trendev-terms-of-service-${date}.pdf`);

console.log("Building site…");
execSync("npm run build", { cwd: root, stdio: "inherit" });

console.log("Starting preview server…");
const preview = spawn(
  "npx",
  ["vite", "preview", "--port", String(port), "--strictPort"],
  { cwd: root, stdio: "ignore" },
);

try {
  await waitForServer(`http://localhost:${port}/`);
  mkdirSync(outDir, { recursive: true });
  console.log(`Printing ${pageUrl} → ${outFile}`);
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--virtual-time-budget=10000",
      "--no-pdf-header-footer",
      `--print-to-pdf=${outFile}`,
      pageUrl,
    ],
    { stdio: "inherit" },
  );
  console.log(`Done. Commit ${outFile} alongside the terms module.`);
} finally {
  preview.kill("SIGTERM");
}
