/** Google Analytics (gtag.js) is loaded by index.html; the router fires SPA pageviews. */
interface Window {
  gtag?: (...args: unknown[]) => void;
}
