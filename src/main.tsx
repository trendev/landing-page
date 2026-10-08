import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./app/App.tsx";
import { preloadRoute } from "./app/preloadRoute.ts";
import { initAnalytics } from "./lib/analytics.ts";
import "./styles/index.css";

// Re-arms Google Analytics for visitors who already accepted; a no-op for
// everyone else, so nothing is loaded before the banner is answered.
initAnalytics();

const container = document.getElementById("root")!;

/**
 * Production pages arrive prerendered (scripts/prerender.mjs), stamped with the
 * path they were rendered for. Hydrate only when that is the page being
 * visited: 404.html is served for every unknown URL, and a fresh render is
 * simpler than reconciling it. The dev server serves an empty root.
 */
const normalize = (path: string) => path.replace(/\/+$/, "") || "/";
const prerendered = container.dataset.prerenderedPath;

if (prerendered && normalize(prerendered) === normalize(location.pathname)) {
  void preloadRoute(location.pathname).then(() =>
    hydrateRoot(container, <App />),
  );
} else {
  createRoot(container).render(<App />);
}
