/**
 * Google Analytics loading, gated on the visitor's cookie choice (issue #15).
 *
 * index.html deliberately no longer loads gtag.js: it only defines the
 * dataLayer/gtag stub and sets Google Consent Mode to denied. The Google
 * script is injected here, and only once the visitor has accepted analytics
 * cookies.
 *
 * Consent Mode alone would not be enough: with `analytics_storage: denied`
 * gtag.js still loads and still sends cookieless pings to Google. GA4 is not
 * an exempted audience-measurement tool under CNIL guidance, so refusing has
 * to mean no Google request at all — hence the deferred script injection.
 *
 * The choice is stored in localStorage (a strictly-necessary preference, so
 * itself exempt) and can be changed at any time from the footer.
 */

const GA_MEASUREMENT_ID = "G-G6NP1YWXS0";
const STORAGE_KEY = "trendev.analytics-consent";

export type ConsentChoice = "granted" | "denied";

let libraryRequested = false;

export function readConsent(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    // Storage blocked (private mode, hardened browser): treat as undecided.
    // Nothing is loaded, which is the safe outcome.
    return null;
  }
}

function persist(choice: ConsentChoice | null): void {
  try {
    if (choice) window.localStorage.setItem(STORAGE_KEY, choice);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Same as above: the visitor is simply asked again next time.
  }
}

function loadLibrary(): void {
  if (libraryRequested) return;
  libraryRequested = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Reports the page the visitor is on when consent is given or restored;
  // later SPA navigations go through trackPageView().
  window.gtag?.("config", GA_MEASUREMENT_ID);
}

/** Removes the _ga / _ga_<id> cookies GA may have written before a withdrawal. */
function clearAnalyticsCookies(): void {
  const host = window.location.hostname;
  const domains = new Set(["", host, `.${host}`]);
  const registrable = host.split(".").slice(-2).join(".");
  if (registrable) domains.add(`.${registrable}`);

  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}

function applyConsent(choice: ConsentChoice): void {
  window.gtag?.("consent", "update", { analytics_storage: choice });
  if (choice === "granted") loadLibrary();
  else clearAnalyticsCookies();
}

/** Records a decision from the consent banner and acts on it immediately. */
export function setConsent(choice: ConsentChoice): void {
  persist(choice);
  applyConsent(choice);
}

/** Restores a previously granted consent on boot. Called once from main.tsx. */
export function initAnalytics(): void {
  if (readConsent() === "granted") applyConsent("granted");
}

/** SPA pageview, dropped unless the visitor accepted analytics cookies. */
export function trackPageView(path: string, title: string): void {
  if (readConsent() !== "granted") return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  });
}
