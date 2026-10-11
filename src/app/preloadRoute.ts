import { matchRoute } from "@/app/router";
import { currentTermsDate, loadTermsVersion } from "@/data/terms";

/**
 * Loads the async data a route renders, before the first render. Called by the
 * prerender (so the static HTML holds the content, not a loading state) and by
 * main.tsx before hydrating (so the first client render matches that HTML).
 * Only the Terms text is lazy today; every other route resolves immediately.
 */
export async function preloadRoute(pathname: string): Promise<void> {
  const route = matchRoute(pathname);
  if (route.kind === "terms") {
    await loadTermsVersion(route.date ?? currentTermsDate);
  }
}
