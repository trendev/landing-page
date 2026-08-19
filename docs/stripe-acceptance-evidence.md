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
  `STRIPE_PAYMENT_LINKS` in `src/data/stripe.ts` (live entries are empty
  strings today; the CTAs fall back to the consultation modal until filled).
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
> v1.0 (2026-09-01)](https://trendev.fr/terms/2026-09-01) and the [CTO Advisor
> service description v1.0](https://trendev.fr/services/cto-advisor).
> Those exact versions govern your subscription and stay retrievable at those
> addresses.

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

- `after_completion` is still `hosted_confirmation`; the redirect to
  `https://trendev.fr/welcome` waits on issue #18 building that route.
- Both links currently offer **Klarna** alongside card. Klarna is a consumer
  BNPL product and an odd fit for a €1,500-2,500/month B2B subscription;
  restricting `payment_method_types` is a commercial decision for the owner.
- ~~Account default tax category is `txcd_10000000`~~ resolved: the account
  default is now `txcd_20060048` in both modes, matching the two products.

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
| Price `tax_behavior` | `exclusive` | n/a, no live prices yet |
| Payment links `automatic_tax` | enabled, `liability: self` | n/a for the CTO tiers |

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
