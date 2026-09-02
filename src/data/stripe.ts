import type { TierId } from "@/types";

/** Tiers that can be bought self-service. Fractional CTO is contact-only. */
export type CheckoutTierId = Exclude<TierId, "fractional-cto">;

type PaymentLinks = Record<CheckoutTierId, string>;

/**
 * Stripe-hosted checkout links, split by environment (issue #16).
 *
 * Payment Links are public URLs, not secrets. They are meant to be handed to
 * buyers, so both maps live in source and are selected at build time. That is
 * deliberately NOT a `.env` file: `.env*` is gitignored, so a dotenv approach
 * would mean adding CI secrets to GitHub Pages for values that are not secret,
 * and the deployed link set would stop being reviewable in the diff.
 *
 * Selection: `vite` (dev) is test mode and `vite build` (production) is live
 * mode, unless VITE_STRIPE_MODE overrides it. The override's remaining use is
 * previewing a production build locally with test links (`VITE_STRIPE_MODE=test
 * npm run build`), which would otherwise point at real checkout. deploy.yml
 * used to pin the deployed site to `test` for pre-launch review; that pin was
 * removed in the same change that filled LIVE_PAYMENT_LINKS, so PROD means
 * live checkout again.
 */

/**
 * Test mode. Safe to commit and safe to click: test mode moves no real money
 * and is fed by Stripe's test cards. Created against acct_1QNvN0Hxg3uOgAWo.
 *
 * These links require Terms of Service acceptance at checkout, and complete at
 * https://trendev.fr/welcome (issue #18) rather than Stripe's generic hosted
 * confirmation.
 *
 * `consent_collection` is create-only: whether acceptance is demanded at all
 * cannot be toggled after creation. Everything that names the accepted version
 * can be updated in place, though: `custom_text.terms_of_service_acceptance`,
 * `metadata` and `subscription_data.metadata` are all accepted by
 * POST /v1/payment_links/{id}. Publishing a new Terms version therefore
 * repoints these links and the buy.stripe.com URLs below survive; only
 * adding or removing the consent requirement itself forces new links.
 * docs/legal-versioning.md step 6 has the procedure, including the trap that
 * `subscription_data.metadata` REPLACES the whole map while top-level
 * `metadata` merges.
 */
const TEST_PAYMENT_LINKS: PaymentLinks = {
  "cto-advisor": "https://buy.stripe.com/test_00wbJ1atb8bA4Do28x5AQ05",
  "cto-advisor-plus": "https://buy.stripe.com/test_eVq9AT9p7dvU3zk7sR5AQ06",
};

/**
 * Live mode. Created 2026-08-23 (issue #16) mirroring the test links
 * field-for-field: Terms v1.0 (2026-09-01) consent with the Annex named in the
 * checkbox message, required business legal name + B2B confirmation, required
 * billing address, tax-ID collection, automatic tax, all six acceptance
 * evidence keys in both `metadata` and `subscription_data.metadata`, and
 * completion at https://trendev.fr/welcome.
 *
 * Advisor: plink_1U7kQxHxg3uOgAWoveHMrENC (price_1U7kQfHxg3uOgAWoLM2zoZIr).
 * Advisor+: plink_1U7kR7Hxg3uOgAWoEDq3P70U (price_1U7kQjHxg3uOgAWoCs0tlzOw).
 *
 * These move real money. They only reach visitors once a build without
 * VITE_STRIPE_MODE deploys, so the launch gates were enforced by when the
 * change that removed the deploy.yml test pin was merged, not by editing this
 * file again. That merge happened on 2026-08-25 and checkout has been live
 * since. Two gates were met by then: the live FR tax registration is active
 * (taxreg_1U68dSHxg3uOgAWod8hIGPxi) and the live links mirror the reviewed test
 * configuration field-for-field. One was deliberately not waited for: Terms
 * v1.0 carries the effective date 2026-09-01, so buyers between 2026-08-25 and
 * that date accept a version dated ahead of their purchase. Terms S3 and S14
 * and the checkout consent message all make the version accepted at purchase
 * the one that governs the subscription, so this was a labelling gap rather
 * than an ungoverned sale; see docs/legal-versioning.md. That gap closed on
 * 2026-09-01 when the effective date arrived, and the note /terms carried
 * through the window expired with it. Every gate is now behind us.
 */
const LIVE_PAYMENT_LINKS: PaymentLinks = {
  "cto-advisor": "https://buy.stripe.com/9B628r58RcrQ1rc6oN5AQ01",
  "cto-advisor-plus": "https://buy.stripe.com/7sY6oHfNv9fE9XI6oN5AQ02",
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

/**
 * Stripe Customer Portal login page (issue #17), split by mode like the
 * payment links: the login page is a per-mode Dashboard artifact
 * (billing.stripe.com/p/login/…), created when the portal's no-code link is
 * activated in Settings → Billing → Customer portal. The customer
 * authenticates with their checkout email (Stripe sends a one-time code), so
 * the same public URL resolves every buyer to their own subscription — no
 * backend involved.
 *
 * Both modes are filled in below, so /welcome shows its "Manage billing" block.
 * The empty-string branch is kept, not dead: a mode whose portal link is not
 * activated yet leaves this empty, and /welcome then omits the block rather
 * than pointing at a dead URL. Like the payment links, these are public URLs,
 * not secrets.
 *
 * Both URLs provided by the owner on 2026-08-25 and verified against the
 * default portal configuration of the matching mode (test
 * bpc_1U8JGKHxg3uOgAWoA9s1VsCZ, live bpc_1U8J97Hxg3uOgAWoLkfHWJtT; both
 * login_page.enabled, cancel at period end without proration, no plan
 * switching).
 */
const TEST_PORTAL_LOGIN_URL =
  "https://billing.stripe.com/p/login/test_cNicN5eJr9fE4Do3cB5AQ00";
const LIVE_PORTAL_LOGIN_URL =
  "https://billing.stripe.com/p/login/cNicN5eJr9fE4Do3cB5AQ00";

export const STRIPE_PORTAL_LOGIN_URL: string =
  STRIPE_MODE === "live" ? LIVE_PORTAL_LOGIN_URL : TEST_PORTAL_LOGIN_URL;
