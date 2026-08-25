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
| Terms version accepted | `metadata.terms_version = "1.0"`, `metadata.terms_date = "2026-09-01"`, `metadata.terms_url = "https://trendev.fr/terms/2026-09-01"` |
| Service-description version accepted | `metadata.service_description = "cto-advisor 1.0"`. **No separate immutable URL needed:** the description is Annex A/B of the dated Terms above, so `terms_url` already points at the frozen copy. |

Key point: the Terms URL recorded in metadata and in the Stripe
terms-of-service setting must be the **dated immutable** route, so the
accepted text can never change under the recorded link
(see `docs/legal-versioning.md`).

This used to be recorded for the Terms but not for the service description,
which pointed at the mutable `/services/<slug>` route while the consent message
promised the accepted version would stay retrievable there. The 2026-08-19
legal review flagged it as a blocking defect. Terms v1.0 as amended on
2026-08-21 fixes it by reproducing the CTO Advisor and CTO Advisor+
descriptions verbatim as Annexes A and B: one dated URL, one PDF, both texts
inside it.
`/services/<slug>` may still be linked for convenience, but it is no longer
the record of what was accepted.

Payment Links support metadata, custom fields (including required checkboxes),
consent collection, tax-ID collection and Stripe Tax — verify at
implementation time what the chosen flow records natively, and only if native
features cannot preserve the required evidence should the smallest possible
alternative be documented (still no custom backend unless genuinely required).

## Flow requirements

- Public links (not private) for both Advisor tiers, pasted into
  `STRIPE_PAYMENT_LINKS` in `src/data/stripe.ts` (both modes filled since
  2026-08-23; an empty entry makes that CTA fall back to the consultation
  modal).
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
effective; accountant-validated tax configuration **including live-mode Stripe
Tax registrations** (see "Tax configuration" below: live mode had none until
2026-08-19 and charged 0% VAT to everyone); owner-approved acceptance wording;
owner-performed end-to-end test purchase in Stripe test mode.

## As actually configured (test mode, 2026-08-19)

> **Refreshed 2026-08-21.** The recorded URL and version are unchanged, because
> Terms v1.0 was amended in place at the same `/terms/2026-09-01` route before
> its effective date. Only the consent message wording was updated, to name the
> Annex now that the service description lives inside the Terms.
>
> That edit used `POST /v1/payment_links/{id}`, which accepts `metadata`,
> `subscription_data.metadata` and `custom_text`, so no recreation was needed
> and the `buy.stripe.com` URLs below are unchanged. Only `consent_collection`
> is create-only, and it did not change (already `terms_of_service: required`).
>
> Both links were read back afterwards: `metadata` and
> `subscription_data.metadata` each carry all six keys (`tier_id`,
> `terms_version=1.0`, `terms_date=2026-09-01`, `terms_url`,
> `service_description`, `service_description_url`). Read back after any
> metadata write: `subscription_data.metadata` **replaces** the whole map
> rather than merging, so a partial post silently deletes evidence keys.

Account `acct_1QNvN0Hxg3uOgAWo`. Verified by rendering both checkout pages,
not just by reading the API response.

| Object | ID |
|---|---|
| Product / price, CTO Advisor | `prod_V65nLnR4HG4pX3` / `price_1U5tc9Hxg3uOgAWofCTI27FF` |
| Product / price, CTO Advisor+ | `prod_V65nU6GRKT9Pty` / `price_1U5tcGHxg3uOgAWoMAtHRuqq` |
| Payment link, Advisor | `plink_1U67LcHxg3uOgAWoV6c8oaTS` |
| Payment link, Advisor+ | `plink_1U67LqHxg3uOgAWofCQlI3Sw` |

The first pair of payment links (`plink_1U5tdn…`, `plink_1U5tdx…`) is
deactivated with a message pointing back at `/advisory`. They had to be
replaced rather than fixed: `consent_collection` is **create-only**, absent
from `POST /v1/payment_links/{payment_link}`.

Each link now collects, per the table above: email, business legal name
(required text field), a required B2B confirmation dropdown, a required
billing address, a tax ID (`if_supported`, which validates EU VAT IDs), and an
explicit Terms of Service consent checkbox.

`custom_text.terms_of_service_acceptance.message` renders **markdown links**,
which is what makes the versions clickable at the moment of acceptance rather
than only recorded in metadata afterwards:

> By subscribing you accept the [TRENDev Professional Services Terms of Service
> v1.0 (2026-09-01)](https://trendev.fr/terms/2026-09-01), including Annex A,
> the CTO Advisor service description, which forms part of them.
> That exact version governs your subscription and stays retrievable at that
> address.

(Annex B for CTO Advisor+.)

Supplying that message **replaces** Stripe's default "I agree to the Terms of
Service" line, including its hyperlink, so the markdown links are not a nicety:
without them the checkbox would carry no clickable Terms at all.

Both products are classified `txcd_20060048` ("Consulting Services": *the
provision of expertise or strategic advice that is presented for consideration
and decision-making*). That is the most specific code Stripe publishes for this
work; there is no IT-consulting or management-consulting sub-code. It was
picked over `txcd_20030000` ("General - Services"), whose own Stripe
description says to use it only when no more specific category exists. Under
the EU B2B place-of-supply general rule both codes behave identically
(destination taxation, so reverse charge for EU businesses with a valid VAT
ID), so the choice matters for US state sales-tax variation and for the audit
position rather than for the three planned test purchases. `tax_code` is
mutable on a Product, so this needed no recreation.

Metadata on both the link and `subscription_data` (so it lands on the durable
subscription record):

```
tier_id, terms_version=1.0, terms_date=2026-09-01,
terms_url=https://trendev.fr/terms/2026-09-01,
service_description=<slug> 1.0, service_description_url=<service route>
```

### Known gaps

- ~~`after_completion` is still `hosted_confirmation`~~ resolved 2026-08-22:
  both test links redirect to `https://trendev.fr/welcome` (issue #18).
- Payment methods are **automatic** (card plus whatever Stripe enables for the
  account, currently including Klarna). Raised as an odd fit for a
  €1,500-2,500/month B2B subscription; the owner decided on 2026-08-23 to keep
  automatic selection, in both modes. No `payment_method_types` restriction.
- ~~Account default tax category is `txcd_10000000`~~ resolved: the account
  default is now `txcd_20060048` in both modes, matching the two products.

## As configured in live mode (2026-08-23, issue #16)

Live products, prices and payment links created, mirroring the test
configuration field-for-field (same consent collection, custom fields, custom
text naming Annex A/B, automatic tax with `liability: self`, tax-ID collection,
`/welcome` redirect, and all six evidence keys in both `metadata` and
`subscription_data.metadata`). Verified by reading every object back and
fetching both checkout URLs (HTTP 200); rendered-page verification is part of
the owner's mandatory test purchase.

| Object | ID |
|---|---|
| Product / price, CTO Advisor | `prod_V80RH9BxsV3GmJ` / `price_1U7kQfHxg3uOgAWoLM2zoZIr` |
| Product / price, CTO Advisor+ | `prod_V80RKd2qiyatRS` / `price_1U7kQjHxg3uOgAWoCs0tlzOw` |
| Payment link, Advisor | `plink_1U7kQxHxg3uOgAWoveHMrENC` |
| Payment link, Advisor+ | `plink_1U7kR7Hxg3uOgAWoEDq3P70U` |

The live URLs are recorded in `LIVE_PAYMENT_LINKS` (`src/data/stripe.ts`).
They reach visitors only when a build without `VITE_STRIPE_MODE` deploys, i.e.
once the change removing the deploy.yml test pin is merged — that merge is the
go-live switch and must wait for the launch gates above.

## Customer Portal & cancellation lifecycle (issue #17)

The Stripe MCP tooling used for the setup does not expose
`POST /v1/billing_portal/configurations`, so the portal was configured by the
owner in the Dashboard (Settings → Billing → Customer portal) on 2026-08-25,
**per mode**: test `bpc_1U8JGKHxg3uOgAWoA9s1VsCZ`, live
`bpc_1U8J97Hxg3uOgAWoLkfHWJtT`. Both configurations were read back and verified
to match the spec below (an earlier live draft had plan/quantity switching
enabled with prorations; fixed same day):

- Cancellation: enabled, **at end of billing period**, no proration/refund
  (matches Terms §Cancellation and the pricing pages).
- Plan changes / pausing: **disabled** (no supported plan switch in V1).
- Invoice history and payment-method / billing-detail updates: enabled.
- Legal links: the portal-level `business_profile` URLs are deliberately left
  null, which makes the portal **inherit** Settings → Public business details —
  already set to the dated `https://trendev.fr/terms/2026-09-01` (which checkout
  consent requires) and `https://trendev.fr/privacy`.
- The no-code **login page link is activated in both modes**; the URLs are
  recorded in `STRIPE_PORTAL_LOGIN_URL` (`src/data/stripe.ts`, per mode), which
  makes `/welcome` render its "Manage billing" block. Customers authenticate
  with their checkout email (one-time code), so the public URL resolves each
  buyer to their own subscription without any backend.

Failed payments (owner decision 2026-08-23): **Smart Retries, then cancel the
subscription** — configured in Settings → Billing → Revenue recovery
(retry policy: Smart Retries; "If all retries for a payment fail": cancel the
subscription). Stripe sends the failed-payment emails; no service continues
past an unpaid period, matching the no-refund / period-end Terms model.

## Tax configuration, verified 2026-08-19

Stripe Tax is **registration-gated**. `automatic_tax[enabled]=true` only runs
the calculator. The calculator returns 0 with `taxability_reason:
not_collecting` for every jurisdiction that has no active `tax.registration`.
`tax.settings.status: "active"` does not cover this: it only reports that the
head office address and the default tax code are filled in, so an account with
no registrations still reads as healthy while collecting nothing.

Registrations are **separate objects per mode**. Test-mode registrations never
apply to live mode, so a passing test-mode purchase proves nothing about what
live mode will charge. Check both.

### Current state

| | Test mode | Live mode |
|---|---|---|
| Head office | Serris, FR | Serris, FR |
| Default tax code | `txcd_20060048` | `txcd_20060048` |
| Registrations | FR `standard`, FR `oss_union` | FR `standard` (`taxreg_1U68dSHxg3uOgAWod8hIGPxi`, active from 2026-08-19) |
| Price `tax_behavior` | `exclusive` | `exclusive` |
| Payment links `automatic_tax` | enabled, `liability: self` | enabled, `liability: self` |

### Measured behaviour

Verified against the API rather than read from config, using draft invoices at
1,500 EUR with `txcd_20060048` and `tax_behavior: exclusive`. Test mode unless
noted:

| Billing country | Customer tax ID | Tax | `taxability_reason` |
|---|---|---|---|
| France | none | 300 EUR (20%) | `standard_rated` |
| France | FR VAT | 300 EUR (20%) | `standard_rated` |
| France (**live mode**) | none | 300 EUR (20%) | `standard_rated` |
| Germany | none | 300 EUR (20%) | `standard_rated` |
| Germany | DE VAT | 0 | `reverse_charge` |
| United States | none | 0 | `not_collecting` |

Reading of the rows that matter:

- Domestic FR to FR is **not** reverse-charged even when the customer supplies
  a French VAT number, which is correct.
- An EU customer with **no** VAT ID is charged French VAT at origin, not
  destination VAT. Note this held in test mode even though test mode carries an
  `oss_union` registration, so OSS is not what drives it. The checkout page
  therefore legitimately shows 20% for a German buyer until they enter a VAT
  number; that is not a bug and not a stale render.
- An EU business **with** a VAT ID gets 0 and `reverse_charge`, which is why
  `tax_id_collection` on the payment links is load-bearing rather than
  cosmetic.
- Non-EU is 0 with `not_collecting`.

These three scenarios are the ones issue #20 asks the accountant to validate
(French B2B, EU B2B with VAT ID, non-EU B2B).

### Reading the hosted checkout page

Stripe Checkout renders **"Tax €0.00"** on first load, before a billing address
exists, and only replaces it with the real line once the address is complete.
On the test CTO Advisor link a French address turns that row into
**"TVA (20%) €300.00"** with a total of €1,800.00 per month. The €0.00 is a
placeholder for "not calculated yet", not a calculated zero, so do not read it
as a tax misconfiguration. A calculated zero is distinguishable in the API by
`taxability_reason` (`not_collecting`, `reverse_charge`, and so on).

### The bug that was fixed

Before 2026-08-19, live mode had **zero** tax registrations. Every live
calculation returned 0% for every country, France included. Nothing else was
wrong: the tax code, `tax_behavior`, head office and payment-link config were
all already correct. Only the registration was missing.

No CTO Advisor customer was affected, because the live payment links do not
exist yet and `LIVE_PAYMENT_LINKS` in `src/data/stripe.ts` is still empty. The
pre-existing live payment link `plink_1QRdayHxg3uOgAWoGkS8IbU0` (NFR Framework,
USD) does have `automatic_tax` enabled and was calculating zero tax for that
whole period, which is worth raising with the accountant.

### Open question for the accountant

Test mode also carries an FR `oss_union` registration; live mode deliberately
does not. OSS would apply destination-country VAT to EU customers who turn out
not to be VAT-registered businesses. Whether to add it in live mode is a
filing-obligation decision, not a technical one. Stripe only records a
registration you already hold with the tax authority; it does not register on
your behalf.

### Leftover diagnostic objects to delete

Created while proving the above, never finalized, no money moved and no fee
charged:

- test mode: customers `cus_V6LAsxzVjLLHXX`, `cus_V6LCGcaqu9Byy7`,
  `cus_V6QWwK2c3XrbRQ`, `cus_V6QW5m8rd4X5lG`, `cus_V6QWvjzbop3rPV` and their
  draft invoices
- live mode: customer `cus_V6LKpz6chsojC4` ("ZZ VAT verification, safe to
  delete") and draft invoice `in_1U68f3Hxg3uOgAWoem4zpo9e`

Deleting customers is not exposed through the Stripe MCP tools, so remove them
from the Dashboard. Tracked as a task list on its own issue.
