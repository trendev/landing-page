import type { TierId } from "@/types";

/** Tiers that can be bought self-service. Fractional CTO is contact-only. */
export type CheckoutTierId = Exclude<TierId, "fractional-cto">;

type PaymentLinks = Record<CheckoutTierId, string>;

/**
 * Stripe-hosted checkout links, split by environment (issue #16).
 *
 * Payment Links are public URLs, not secrets — they are meant to be handed to
 * buyers — so both maps live in source and are selected at build time. That is
 * deliberately NOT a `.env` file: `.env*` is gitignored, so a dotenv approach
 * would mean adding CI secrets to GitHub Pages for values that are not secret,
 * and the deployed link set would stop being reviewable in the diff.
 *
 * Selection: `vite` (dev) is test mode, `vite build` (production, which is what
 * .github/workflows/deploy.yml runs) is live mode. Set VITE_STRIPE_MODE to
 * "test" or "live" to override — needed when previewing a production build
 * locally, which would otherwise point at real checkout.
 */

/**
 * Test mode. Safe to commit and safe to click: test mode moves no real money
 * and is fed by Stripe's test cards. Created against acct_1QNvN0Hxg3uOgAWo.
 *
 * These links require Terms of Service acceptance at checkout. Note that
 * `consent_collection` is create-only in the Stripe API (it is absent from the
 * payment-link update endpoint), so a link can never be repointed at new
 * Terms, only replaced. Publishing a Terms version therefore means new links
 * and new URLs here; docs/legal-versioning.md step 6 has the procedure.
 */
const TEST_PAYMENT_LINKS: PaymentLinks = {
  "cto-advisor": "https://buy.stripe.com/test_00wbJ1atb8bA4Do28x5AQ05",
  "cto-advisor-plus": "https://buy.stripe.com/test_eVq9AT9p7dvU3zk7sR5AQ06",
};

/**
 * Live mode. Deliberately empty until the issue #16 launch gates clear (lawyer
 * -approved effective Terms, accountant-validated tax config, owner test
 * purchase). While a link is empty the purchase CTA keeps its real label but
 * opens the consultation modal instead, which is the honest fallback because
 * the consultation is the mandatory first step of the purchase flow.
 *
 * Do not fill these in until the Terms version they reference is `effective`:
 * a live checkout must not collect acceptance of Terms whose own banner says
 * they are not yet in force.
 */
const LIVE_PAYMENT_LINKS: PaymentLinks = {
  "cto-advisor": "",
  "cto-advisor-plus": "",
};

const override = import.meta.env.VITE_STRIPE_MODE;

export const STRIPE_MODE: "test" | "live" =
  override === "test" || override === "live"
    ? override
    : import.meta.env.PROD
      ? "live"
      : "test";

export const STRIPE_PAYMENT_LINKS: PaymentLinks =
  STRIPE_MODE === "live" ? LIVE_PAYMENT_LINKS : TEST_PAYMENT_LINKS;
