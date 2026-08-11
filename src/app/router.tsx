import {
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";

/**
 * Minimal client-side router (no dependency — matches the repo's zero-dep
 * ethos, cf. WeaveBackground). GitHub Pages serves 404.html (a copy of
 * index.html) for unknown paths and deploy.yml pre-creates per-route
 * index.html copies, so deep links resolve; here we only need pathname
 * matching + history.pushState navigation.
 */

export type Route =
  | { kind: "landing" }
  | { kind: "service"; slug: string }
  | { kind: "terms"; date?: string }
  | { kind: "legal" }
  | { kind: "privacy" }
  | { kind: "notFound" };

/** Strip trailing slashes; GH Pages serves `/terms/` for `/terms/index.html`. */
function normalize(pathname: string): string {
  const stripped = pathname.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
}

export function matchRoute(pathname: string): Route {
  const path = normalize(pathname);
  if (path === "/") return { kind: "landing" };
  if (path === "/legal") return { kind: "legal" };
  if (path === "/privacy") return { kind: "privacy" };
  if (path === "/terms") return { kind: "terms" };

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

if (typeof window !== "undefined") {
  window.addEventListener("popstate", notify);
}

function getPathname(): string {
  return window.location.pathname;
}

/** Current route, re-rendered on pushState/popstate. */
export function useRoute(): Route {
  const pathname = useSyncExternalStore(subscribe, getPathname);
  return matchRoute(pathname);
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
