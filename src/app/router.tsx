import {
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";

/**
 * Minimal client-side router (no dependency — matches the repo's zero-dep
 * ethos, cf. WeaveBackground). The build prerenders a static HTML file per
 * route (src/app/staticRoutes.ts, scripts/prerender.mjs) and a 404.html that
 * GitHub Pages serves for unknown paths, so deep links resolve; here we only
 * need pathname matching + history.pushState navigation.
 */

export type Route =
  | { kind: "landing" }
  | { kind: "advisory" }
  | { kind: "service"; slug: string }
  | { kind: "terms"; date?: string }
  | { kind: "legal" }
  | { kind: "privacy" }
  | { kind: "welcome" }
  | { kind: "faq" }
  | { kind: "notFound" };

/** Strip trailing slashes; GH Pages serves `/terms/` for `/terms/index.html`. */
function normalize(pathname: string): string {
  const stripped = pathname.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
}

export function matchRoute(pathname: string): Route {
  const path = normalize(pathname);
  if (path === "/") return { kind: "landing" };
  if (path === "/advisory") return { kind: "advisory" };
  if (path === "/legal") return { kind: "legal" };
  if (path === "/privacy") return { kind: "privacy" };
  if (path === "/terms") return { kind: "terms" };
  if (path === "/welcome") return { kind: "welcome" };
  if (path === "/faq") return { kind: "faq" };

  const terms = path.match(/^\/terms\/(\d{4}-\d{2}-\d{2})$/);
  // Unknown dates are resolved to NotFound by TermsPage (it owns the registry).
  if (terms) return { kind: "terms", date: terms[1] };

  const service = path.match(/^\/services\/([a-z0-9-]+)$/);
  // Unknown slugs are resolved to NotFound by ServicePage (it owns the data).
  if (service) return { kind: "service", slug: service[1] };

  return { kind: "notFound" };
}

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Separate subscription for `location.hash`.
 *
 * The route store above snapshots `location.pathname` only, which means a hash
 * change produces NO React notification by either path: `navigate()` skips
 * `notify()` when the path is unchanged, and on `popstate` the pathname
 * snapshot is identical so `useSyncExternalStore` bails out. A page that has to
 * react to the hash (/faq, which expands and scrolls to the targeted answer)
 * therefore needs its own store.
 *
 * Folding the hash into `getPathname` instead would work, but it would also
 * re-render the whole landing tree on every `/#expertise` click, so this stays
 * opt-in.
 */
const hashListeners = new Set<() => void>();

function notifyHash() {
  for (const listener of hashListeners) listener();
}

function subscribeHash(listener: () => void): () => void {
  hashListeners.add(listener);
  return () => hashListeners.delete(listener);
}

function getHash(): string {
  return window.location.hash;
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", notify);
  window.addEventListener("popstate", notifyHash);
  window.addEventListener("hashchange", notifyHash);
}

function getPathname(): string {
  return window.location.pathname;
}

/**
 * The path being prerendered (scripts/prerender.mjs, via entry-server). There
 * is no `window` at build time, so the route comes from here instead.
 */
let serverPathname = "/";

export function setServerPathname(pathname: string): void {
  serverPathname = pathname;
}

/**
 * Hydration renders with this snapshot. In the browser it is the real path, so
 * the first client render picks the same page the prerendered HTML holds.
 */
function getServerPathname(): string {
  return typeof window === "undefined" ? serverPathname : getPathname();
}

/** Current route, re-rendered on pushState/popstate. */
export function useRoute(): Route {
  const pathname = useSyncExternalStore(
    subscribe,
    getPathname,
    getServerPathname,
  );
  return matchRoute(pathname);
}

/**
 * The prerendered HTML has no hash, and nothing renders from it directly (only
 * effects read it), so hydration starts from "" and the real hash follows.
 */
function getServerHash(): string {
  return "";
}

/** Current `location.hash` (including the leading "#"), or "" when absent. */
export function useHash(): string {
  return useSyncExternalStore(subscribeHash, getHash, getServerHash);
}

/**
 * Programmatic navigation. Accepts paths with optional hashes ("/#expertise").
 * After the route renders: scrolls to the hash target if present, else to top.
 */
export function navigate(href: string): void {
  const url = new URL(href, window.location.origin);
  const samePath =
    normalize(url.pathname) === normalize(window.location.pathname);
  window.history.pushState(null, "", url.pathname + url.search + url.hash);
  if (!samePath) notify();
  notifyHash();
  // One frame so the target page has committed before we look up the anchor.
  requestAnimationFrame(() => {
    const id = url.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (!samePath) {
      window.scrollTo(0, 0);
    }
  });
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Anchor that routes internally on plain left-clicks. External URLs,
 * pure-hash anchors, modified clicks (new tab, etc.) and `target` links keep
 * native behavior.
 */
export function Link({ href, onClick, target, ...rest }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    if (target && target !== "_self") return;
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return;
    if (href.startsWith("#")) return;
    event.preventDefault();
    navigate(href);
  };

  return <a href={href} target={target} onClick={handleClick} {...rest} />;
}
