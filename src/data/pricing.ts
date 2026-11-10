import { Building2, Gem, MessagesSquare, Scale } from "lucide-react";

import type { ComparisonRow, PricingTier } from "@/types";

/**
 * The four public CTO offers. The three recurring/leadership offers were frozen
 * in issue #13 (epic #12); CTO Decision Review, a one-off entry offer, was
 * added by the owner's commercial decision of 2026-11-10 (issue #59). Names,
 * prices, capacity and cancellation mechanics are frozen: do not edit without
 * a new commercial decision.
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

/** Site-wide introductory booking CTA. */
export const PRIMARY_CTA_LABEL = "Book a free 20-minute call";

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
export const PRIMARY_CTA_LABEL_SHORT = "Free 20-min call";

/**
 * Shown adjacent to the purchase CTAs; keep them together. Worded for every
 * offer, one-off purchases included, not only subscriptions (issue #59).
 */
export const PREREQUISITE_NOTE =
  "Prerequisite: a free 20-minute introductory call before starting an engagement.";

/* ── CTO Decision Review (issue #59) ────────────────────────────────────── */

export const DECISION_REVIEW_PATH = "/services/cto-decision-review";
export const DECISION_REVIEW_LINK_LABEL = "View CTO Decision Review";

/** The homepage card's lead sentence, below the tagline. */
export const DECISION_REVIEW_SUMMARY =
  "Reviewing a development proposal, a migration or a rewrite? Get a focused review of one technical decision, a concise written brief and a walkthrough of the findings.";

/**
 * The more specific "before purchase" wording, kept beside every Decision
 * Review CTA. The shared PREREQUISITE_NOTE stays for the other offers.
 */
export const DECISION_REVIEW_PREREQUISITE_NOTE =
  "Prerequisite: a free 20-minute introductory call before purchase. We confirm fit, agree the question and check that the review fits the scope. No preparation or commitment required.";

export const DECISION_REVIEW_BOUNDARY_NOTE =
  "Your team keeps decision and delivery ownership. Broader investigation or implementation requires a separate agreement.";

/**
 * Stripe checkout links moved to `@/data/stripe` (issue #16): they are now
 * environment-selected (test in dev, live in a production build), which is
 * plumbing rather than frozen commercial copy.
 */

export const pricingTiers: PricingTier[] = [
  {
    // First on purpose: it is the bounded entry point. Its four hours are a
    // TOTAL for one decision, never per month, and never "a cheaper audit".
    id: "cto-decision-review",
    icon: Scale,
    name: "CTO Decision Review",
    price: "€1,500",
    priceSuffix: " one-time",
    billing: "one-time",
    taxNote: TAX_NOTE,
    tagline: "A clear recommendation before you commit.",
    features: [
      "One decision and an agreed set of documents.",
      "Facts, unknowns, options, recommendation and remaining checks.",
      "A written decision brief and walkthrough.",
      "Up to 4 hours total, including preparation and documentation.",
    ],
    billingNotes: [
      "One payment; no subscription or renewal",
      "Delivery timing agreed after the fit and scope review",
    ],
    cta: { label: PRIMARY_CTA_LABEL, kind: "call" },
    servicePath: DECISION_REVIEW_PATH,
  },
  {
    id: "cto-advisor",
    icon: MessagesSquare,
    name: "CTO Advisor",
    price: "€1,500",
    priceSuffix: "/month",
    billing: "monthly",
    taxNote: TAX_NOTE,
    tagline:
      "Recurring senior CTO judgment for founders and executives who need decisions, direction, and a sounding board, without operational overhead.",
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
      "Cancel anytime, effective at the end of the current paid period",
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
    billing: "monthly",
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
      "Cancel anytime, effective at the end of the current paid period",
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
    billing: "tailored",
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
      "Tailored agreement: terms per scoped engagement",
    ],
    cta: { label: "Discuss your context", kind: "contact" },
    servicePath: "/services/fractional-cto",
  },
];

/**
 * The comparison. The Advisor, Advisor+ and Fractional values are the ones
 * frozen in issue #13; issue #59 added the Decision Review column and the
 * "Best for", "Written output" and "Required first step" rows. Keyed by tier,
 * so a column can never shift.
 */
export const comparisonRows: ComparisonRow[] = [
  {
    label: "Best for",
    values: {
      "cto-decision-review": "one scoped technical decision",
      "cto-advisor": "recurring advice and decision support",
      "cto-advisor-plus": "deeper recurring governance and review",
      "fractional-cto": "technology leadership and operational ownership",
    },
  },
  {
    label: "Price",
    values: {
      "cto-decision-review": "€1,500 one-time",
      "cto-advisor": "€1,500/month",
      "cto-advisor-plus": "€2,500/month",
      "fractional-cto": "from €6,000/month",
    },
  },
  {
    label: "Capacity",
    values: {
      "cto-decision-review": "up to 4h total, all work included",
      "cto-advisor": "up to 4h/month",
      "cto-advisor-plus": "up to 8h/month",
      "fractional-cto": "tailored / reserved days",
    },
  },
  {
    label: "Strategic sessions",
    values: {
      "cto-decision-review": "walkthrough of the decision brief, within total capacity",
      "cto-advisor": "typically 2/month",
      "cto-advisor-plus": "weekly or biweekly",
      "fractional-cto": "embedded cadence",
    },
  },
  {
    label: "Written output",
    values: {
      "cto-decision-review":
        "decision brief: facts, unknowns, options, recommendation, remaining checks",
      "cto-advisor": "substantive written advice, within capacity",
      "cto-advisor-plus": "prioritised quarterly recommendations",
      "fractional-cto": "per scoped engagement",
    },
  },
  {
    label: "Async advisory",
    values: {
      "cto-decision-review": "no ongoing advisory access",
      "cto-advisor": true,
      "cto-advisor-plus": "✓ priority",
      "fractional-cto": true,
    },
  },
  {
    label: "Architecture / roadmap",
    values: {
      "cto-decision-review": "only as needed for the agreed decision",
      "cto-advisor": "review",
      "cto-advisor-plus": "deeper review",
      "fractional-cto": "ownership / governance",
    },
  },
  {
    label: "Quarterly Technology Review",
    values: {
      "cto-decision-review": false,
      "cto-advisor": false,
      "cto-advisor-plus": "✓ within capacity",
      "fractional-cto": "✓ as required",
    },
  },
  {
    label: "Engineering organisation",
    values: {
      "cto-decision-review": "only if directly part of the agreed decision",
      "cto-advisor": "advice",
      "cto-advisor-plus": "deeper involvement",
      "fractional-cto": "ownership / execution",
    },
  },
  {
    label: "Board / investor",
    values: {
      "cto-decision-review":
        "decision brief may inform discussion; ongoing preparation not included",
      "cto-advisor": "occasional prep",
      "cto-advisor-plus": true,
      "fractional-cto": true,
    },
  },
  {
    label: "DD / high-stakes",
    values: {
      "cto-decision-review": "no comprehensive due diligence; separately scoped",
      "cto-advisor": false,
      "cto-advisor-plus": "limited preparation",
      "fractional-cto": true,
    },
  },
  {
    label: "Operational ownership",
    values: {
      "cto-decision-review": false,
      "cto-advisor": false,
      "cto-advisor-plus": false,
      "fractional-cto": "✓ when scoped",
    },
  },
  {
    label: "Hands-on execution",
    values: {
      "cto-decision-review": false,
      "cto-advisor": false,
      "cto-advisor-plus": false,
      "fractional-cto": "✓ when scoped",
    },
  },
  {
    label: "Billing / subscription",
    values: {
      "cto-decision-review": "one payment; no subscription or renewal",
      "cto-advisor": "monthly",
      "cto-advisor-plus": "monthly",
      "fractional-cto": "tailored agreement",
    },
  },
  {
    label: "Cancel anytime",
    values: {
      "cto-decision-review": "not a monthly subscription; one-off cancellation terms apply",
      "cto-advisor": true,
      "cto-advisor-plus": true,
      "fractional-cto": "per scoped engagement",
    },
  },
  {
    label: "Rollover",
    values: {
      "cto-decision-review": "not applicable; one agreed review",
      "cto-advisor": false,
      "cto-advisor-plus": false,
      "fractional-cto": "per agreement",
    },
  },
  {
    label: "Required first step",
    values: {
      "cto-decision-review": "free 20-minute introductory call",
      "cto-advisor": "free 20-minute introductory call",
      "cto-advisor-plus": "free 20-minute introductory call",
      "fractional-cto": "free 20-minute introductory call",
    },
  },
];
