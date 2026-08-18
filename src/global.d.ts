/** gtag stub is defined in index.html; gtag.js itself loads only after the
 *  visitor accepts analytics cookies (src/lib/analytics.ts). */
interface Window {
  gtag?: (...args: unknown[]) => void;
}

/** Typed build-time env. `VITE_STRIPE_MODE` overrides the dev/prod default
 *  chosen in src/data/stripe.ts — see the comment there. */
interface ImportMetaEnv {
  readonly VITE_STRIPE_MODE?: "test" | "live";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
