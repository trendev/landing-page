# Stripe checkout — required acceptance evidence (spec for issue #16)

What the Stripe-hosted checkout for CTO Advisor / CTO Advisor+ must collect
and durably record, as defined by issues #15/#16. This document is the input
spec for the Stripe configuration work — no Stripe objects are created by the
issues that produced it.

## Non-negotiables

- Professional/B2B customers only; explicit confirmation required.
- Explicit acceptance of the current Terms of Service version.
- No custom billing/email backend: prefer Stripe-hosted capabilities
  (Checkout / Payment Links, consent collection, custom fields, metadata,
  Stripe Tax, customer emails).
- Fractional CTO never gets a self-service checkout.

## Evidence to retain per purchase

| Evidence | Suggested Stripe-hosted mechanism |
|---|---|
| Customer/business legal name | Checkout business-name / custom field |
| Billing address & country | Checkout address collection (required) |
| Business contact name & email | Checkout customer fields |
| VAT/tax ID where applicable | Stripe Tax ID collection (validates EU VAT IDs) |
| Product/price purchased | The Stripe subscription/price object itself |
| Purchase timestamp | Stripe checkout session / subscription record |
| Explicit B2B confirmation | Required custom checkbox/field, e.g. "I confirm I am purchasing on behalf of a business (professional clients only)" |
| Explicit Terms acceptance | Stripe consent collection (`terms_of_service: required`) with the account's Terms URL pointing at the **dated** route |
| Terms version accepted | `metadata.terms_version = "1.0"`, `metadata.terms_url = "https://trendev.fr/terms/2026-09-01"` |
| Service-description version accepted | `metadata.service_description = "cto-advisor v1.0 (2026-09-01)"`, `metadata.service_description_url = "https://trendev.fr/services/cto-advisor"` |

Key point: the Terms/service URLs recorded in metadata and in the Stripe
terms-of-service setting must be the **dated immutable** routes, so the
accepted text can never change under the recorded link
(see `docs/legal-versioning.md`).

Payment Links support metadata, custom fields (including required checkboxes),
consent collection, tax-ID collection and Stripe Tax — verify at
implementation time what the chosen flow records natively, and only if native
features cannot preserve the required evidence should the smallest possible
alternative be documented (still no custom backend unless genuinely required).

## Flow requirements

- Public links (not private) for both Advisor tiers, pasted into
  `STRIPE_PAYMENT_LINKS` in `src/data/pricing.ts` (empty strings today; the
  CTAs fall back to the consultation modal until filled).
- The visible prerequisite ("Prerequisite: please schedule your free CTO
  consultation before subscribing.") stays adjacent to the CTAs — it is a
  commercial condition, not a technical gate.
- After successful payment: redirect to `https://trendev.fr/welcome`
  (route built in issue #18).
- Stripe owns billing communications (receipts, invoices, dunning); branding
  configured in the Stripe dashboard.
- Tax: Stripe Tax with French origin; French VAT for French B2B, VAT-ID
  validation/reverse charge for EU B2B, applicable cross-border treatment for
  non-EU B2B. **Accountant must validate before live activation**; test
  France + one EU country + one non-EU country in test mode.
- No secret keys in the PWA — payment links / hosted checkout only.

## Launch gates (from issues #15/#16)

Live checkout must not be enabled until: lawyer-approved Terms version is
effective; accountant-validated tax configuration; owner-approved acceptance
wording; owner-performed end-to-end test purchase in Stripe test mode.
