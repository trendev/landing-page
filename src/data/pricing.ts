import { Building2, Gem, MessagesSquare } from "lucide-react";

import type { ComparisonRow, PricingTier, TierId } from "@/types";

/**
 * The three public premium CTO offers (epic #12, frozen in issue #13).
 * Exactly three offers; names, prices, capacity and cancellation mechanics
 * are frozen — do not edit without a new commercial decision on the epic.
 *
 * Commercial guardrails:
 * - Prices always display "excluding applicable taxes" (worldwide B2B; tax
 *   treatment is applied at checkout/invoicing per client establishment).
 * - Capacity is a boundary, never the headline value proposition.
 * - Fractional CTO is contact-only: no self-service checkout, ever.
 * - An internal maximum standard day rate exists but is deliberately NOT
 *   published anywhere in this repo.
 */

export const TAX_NOTE = "excluding applicable taxes";

/** Frozen site-wide primary CTA copy (issue #13). */
export const PRIMARY_CTA_LABEL = "Book a free CTO consultation";

/**
 * Second funnel entry point (issue #13). Booking a consultation and
 * subscribing are different intents, so they get different buttons: this one
 * is for the visitor who already knows what they want.
 */
export const ADVISORY_PATH = "/advisory";
export const SECONDARY_CTA_LABEL = "See CTO advisory plans";

/**
 * Short form for the sticky header on phones. The full label is 225px wide,
 * which leaves no room beside the logo under ~360px and collides with it below
 * 320px. Same action, same promise, fewer words.
 */
export const PRIMARY_CTA_LABEL_SHORT = "Free consultation";

/** Shown adjacent to the Advisor/Advisor+ purchase CTAs — keep them together. */
export const PREREQUISITE_NOTE =
  "Prerequisite: please schedule your free CTO consultation before subscribing.";

/**
 * Stripe-hosted checkout links, filled in by issue #16 once products, tax
 * collection and Terms acceptance are configured and validated. While a link
 * is an empty string, the purchase CTA renders with its real label but opens
 * the consultation modal instead (the consultation is the mandatory first
 * step of the purchase flow, so this is the honest fallback).
 */
export const STRIPE_PAYMENT_LINKS: Record<
  Exclude<TierId, "fractional-cto">,
  string
> = {
  "cto-advisor": "",
  "cto-advisor-plus": "",
};

export const pricingTiers: PricingTier[] = [
  {
    id: "cto-advisor",
    icon: MessagesSquare,
    name: "CTO Advisor",
    price: "€1,500",
    priceSuffix: "/month",
    taxNote: TAX_NOTE,
    tagline:
      "Recurring senior CTO judgment for founders and executives who need decisions, direction, and a sounding board — without operational overhead.",
    features: [
      "Architecture and technical decision support",
      "Technical roadmap and product trade-off guidance",
      "Engineering organisation and hiring advice",
      "Vendor and technology evaluation",
      "Substantive async advice between sessions",
      "Typically 2 strategic sessions per month",
      "Up to 4 hours/month of advisory capacity",
    ],
    highlights: [
      "Up to 4 hours/month of advisory capacity",
      "Typically 2 strategic sessions per month",
      "Substantive async advice between sessions",
    ],
    billingNotes: [
      "Monthly subscription, billed in advance",
      "Cancel anytime — effective at the end of the current paid period",
      "No refunds or prorated credits · no capacity rollover",
    ],
    cta: { label: "Start CTO Advisor", kind: "checkout" },
    servicePath: "/services/cto-advisor",
  },
  {
    id: "cto-advisor-plus",
    icon: Gem,
    name: "CTO Advisor+",
    price: "€2,500",
    priceSuffix: "/month",
    taxNote: TAX_NOTE,
    tagline:
      "Deeper recurring CTO governance: closer cadence, priority access, and structured oversight of architecture, roadmap and engineering delivery.",
    features: [
      "Weekly or biweekly strategic sessions",
      "Priority async advisory",
      "Deeper architecture and roadmap review",
      "Technical risk and debt prioritisation",
      "Engineering organisation and delivery review",
      "Quarterly Technology Review within included capacity",
      "Executive and board preparation where appropriate",
      "Up to 8 hours/month of advisory capacity",
    ],
    highlights: [
      "Up to 8 hours/month of advisory capacity",
      "Weekly or biweekly strategic sessions",
      "Priority async advisory + Quarterly Technology Review",
    ],
    billingNotes: [
      "Monthly subscription, billed in advance",
      "Cancel anytime — effective at the end of the current paid period",
      "No refunds or prorated credits · no capacity rollover",
    ],
    recommended: true,
    cta: { label: "Start CTO Advisor+", kind: "checkout" },
    servicePath: "/services/cto-advisor-plus",
  },
  {
    id: "fractional-cto",
    icon: Building2,
    name: "Fractional CTO",
    price: "From €6,000",
    priceSuffix: "/month",
    taxNote: TAX_NOTE,
    tagline:
      "Embedded CTO leadership for organisations that need transformation, execution governance, or board-facing technical leadership.",
    features: [
      "Technical strategy and architecture ownership",
      "Engineering governance and delivery oversight",
      "Team and leadership structure, senior interviews",
      "CEO, board and investor-facing technical leadership",
      "Technical due diligence, M&A and high-stakes support",
      "Crisis and turnaround support",
      "Hands-on execution when explicitly scoped",
      "Tailored scope, cadence and reserved capacity",
    ],
    billingNotes: [
      "Enterprise-style engagement, scoped individually after consultation",
      "Tailored agreement — terms per scoped engagement",
    ],
    cta: { label: "Discuss your context", kind: "contact" },
    servicePath: "/services/fractional-cto",
  },
];

/** Comparison table frozen in issue #13 — values per [Advisor, Advisor+, Fractional]. */
export const comparisonRows: ComparisonRow[] = [
  { label: "Price", values: ["€1,500/month", "€2,500/month", "from €6,000/month"] },
  { label: "Capacity", values: ["up to 4h/month", "up to 8h/month", "tailored / reserved days"] },
  { label: "Strategic sessions", values: ["typically 2/month", "weekly or biweekly", "embedded cadence"] },
  { label: "Async advisory", values: [true, "✓ priority", true] },
  { label: "Architecture / roadmap", values: ["review", "deeper review", "ownership / governance"] },
  { label: "Quarterly Technology Review", values: [false, "✓ within capacity", "✓ as required"] },
  { label: "Engineering organisation", values: ["advice", "deeper involvement", "ownership / execution"] },
  { label: "Board / investor", values: ["occasional prep", true, true] },
  { label: "DD / high-stakes", values: [false, "limited preparation", true] },
  { label: "Operational ownership", values: [false, false, "✓ when scoped"] },
  { label: "Hands-on execution", values: [false, false, "✓ when scoped"] },
  { label: "Subscription", values: ["monthly", "monthly", "tailored agreement"] },
  { label: "Cancel anytime", values: [true, true, "per scoped engagement"] },
  { label: "Rollover", values: [false, false, "per agreement"] },
];
