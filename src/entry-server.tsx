/**
 * Build-time render entry, used only by scripts/prerender.mjs (bundled by
 * `vite build --ssr`). Never shipped to the browser.
 */
import { renderToString } from "react-dom/server";

import App from "@/app/App";
import { preloadRoute } from "@/app/preloadRoute";
import { setServerPathname } from "@/app/router";
import { takeServerMeta } from "@/hooks/useDocumentMeta";

export { staticRoutes } from "@/app/staticRoutes";

export async function render(pathname: string) {
  await preloadRoute(pathname);
  setServerPathname(pathname);
  const html = renderToString(<App />);
  const meta = takeServerMeta();
  if (!meta)
    throw new Error(`${pathname}: the page never called useDocumentMeta`);
  return { html, meta };
}
