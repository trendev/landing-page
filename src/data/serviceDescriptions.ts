import type { ServiceDescription } from "@/types";

/**
 * Full service descriptions for the three public offers (issue #14).
 *
 * These pages are commercial service definitions, not legal Terms. Each one
 * carries a version + effective date because the version accepted at purchase
 * becomes part of the agreement (see docs/legal-versioning.md and the Terms).
 *
 * VERSIONING: once a version is live and purchasable, do not edit its
 * substance in place — bump the version, archive the outgoing text to
 * docs/service-descriptions/<slug>-vX.Y.md, and record the change in
 * docs/legal-versioning.md.
 *
 * The four open decisions of issue #14 (async response target, async
 * accounting increment, Quarterly Technology Review wording, and whether to
 * cap the number of designated contacts) were confirmed by the owner on
 * 2026-08-18: the recommended defaults stand, and designated contacts stay
 * uncapped. The lawyer review of issue #15 completed on 2026-08-19, so these
 * are version 1.0 rather than 1.0-draft.
 */

const SHARED_BILLING_BULLETS = [
  "Monthly subscription, billed in advance at the start of each billing period.",
  "Public prices are stated excluding applicable taxes. The applicable VAT or tax treatment is determined at checkout and on invoices, based on your business's country of establishment and tax status.",
  "Professional and business customers only — this service is not offered to consumers.",
];

const SHARED_CANCELLATION_BULLETS = [
  "Cancel anytime — no long-term commitment.",
  "Cancellation takes effect at the end of the current paid billing period; the service remains available until then.",
  "No refunds and no prorated credits for the current paid period.",
  "Unused advisory capacity does not roll over to the following month.",
];

export const serviceDescriptions: ServiceDescription[] = [
  {
    slug: "cto-advisor",
    tierId: "cto-advisor",
    title: "CTO Advisor",
    version: "1.0",
    effectiveDate: "2026-09-01",
    lastUpdated: "2026-08-18",
    metaDescription:
      "CTO Advisor — recurring senior CTO advisory for founders and executives. €1,500/month excluding applicable taxes, up to 4h/month advisory capacity, cancel anytime.",
    sections: [
      {
        id: "overview",
        heading: "Overview & who it's for",
        paragraphs: [
          "CTO Advisor gives founders and executives recurring access to senior CTO judgment without hiring an operational technology leader. You bring the decisions that keep you up at night — architecture bets, roadmap sequencing, hiring, vendor choices — and get direct, experienced counsel with no agenda other than your outcome.",
          "It is designed for leaders who own execution themselves but want a trusted, independent technical authority reviewing direction, challenging assumptions, and helping avoid expensive mistakes.",
          "This service is available to professional and business customers only.",
        ],
      },
      {
        id: "scope",
        heading: "What's included",
        bullets: [
          "Architecture and technical decision support",
          "Product and technology trade-off analysis",
          "Technical roadmap guidance",
          "Cloud, infrastructure, security and scalability guidance",
          "Engineering organisation and hiring advice",
          "Vendor and technology evaluation",
          "Selected technical document and architecture review",
          "CEO / founder sounding-board support",
        ],
      },
      {
        id: "capacity",
        heading: "Capacity & scheduling",
        paragraphs: [
          "Advisory capacity is a boundary, not the value proposition — it defines the volume of substantive advisory work included each month.",
        ],
        bullets: [
          "Up to 4 hours per month of advisory capacity.",
          "Capacity covers meetings, preparation, substantive async advice, and architecture or document review.",
          "Short administrative exchanges (scheduling, logistics, quick confirmations) do not consume capacity.",
          "Typical cadence: around 2 strategic sessions per month, plus async advice between sessions.",
          "Substantive async work is accounted in 15-minute increments.",
          "Async requests are normally answered within 1 business day. Advisory capacity is not an on-call or emergency-response service.",
          "Advice is provided to your designated contacts; the number of designated contacts is not capped.",
          "Unused capacity does not roll over; work beyond the included capacity requires explicit prior agreement or a separate scope.",
        ],
      },
      {
        id: "exclusions",
        heading: "What's not included",
        paragraphs: [
          "CTO Advisor is an advisory engagement. The distinction matters: TRENDev advises, your team decides and executes.",
        ],
        bullets: [
          "Operational ownership of systems, teams or delivery",
          "On-call duty or incident response",
          "Routine coding or hands-on implementation",
          "Sprint or project management",
          "Routine team management",
          "Unlimited code or document review",
        ],
      },
      {
        id: "billing",
        heading: "Billing & taxes",
        paragraphs: ["Price: €1,500 per month, excluding applicable taxes."],
        bullets: SHARED_BILLING_BULLETS,
      },
      {
        id: "cancellation",
        heading: "Cancellation",
        bullets: SHARED_CANCELLATION_BULLETS,
      },
      {
        id: "prerequisite",
        heading: "Before you subscribe",
        paragraphs: [
          "A free CTO consultation is the required first step before subscribing. It confirms mutual fit, clarifies your context, and makes the first month productive from day one.",
        ],
      },
    ],
  },
  {
    slug: "cto-advisor-plus",
    tierId: "cto-advisor-plus",
    title: "CTO Advisor+",
    version: "1.0",
    effectiveDate: "2026-09-01",
    lastUpdated: "2026-08-18",
    metaDescription:
      "CTO Advisor+ — deeper recurring CTO governance with priority access. €2,500/month excluding applicable taxes, up to 8h/month advisory capacity, cancel anytime.",
    sections: [
      {
        id: "overview",
        heading: "Overview & who it's for",
        paragraphs: [
          "CTO Advisor+ is the recommended tier for leaders who want continuous CTO-level governance, not just occasional counsel. It combines a closer strategic cadence with priority access and structured, recurring review of your architecture, roadmap and engineering delivery.",
          "It suits organisations where technology decisions carry board-level weight: scale-ups between funding rounds, companies preparing for diligence, and executive teams that want a standing technical authority at the table.",
          "This service is available to professional and business customers only.",
        ],
      },
      {
        id: "scope",
        heading: "What's included",
        paragraphs: [
          "Everything in CTO Advisor, with greater depth and access:",
        ],
        bullets: [
          "Weekly or biweekly strategic sessions",
          "Priority async advisory",
          "Deeper architecture and roadmap review",
          "Technical risk and technical-debt prioritisation",
          "Engineering organisation and delivery review",
          "Quarterly Technology Review within the included capacity",
          "Executive and board preparation where appropriate",
        ],
      },
      {
        id: "quarterly-review",
        heading: "Quarterly Technology Review",
        paragraphs: [
          "Once per quarter, a structured review of your architecture, roadmap, delivery and technical risks, concluded with prioritised written recommendations for the next quarter. The review is delivered within your included monthly capacity, not in addition to it.",
        ],
      },
      {
        id: "capacity",
        heading: "Capacity & scheduling",
        paragraphs: [
          "Advisory capacity is a boundary, not the value proposition — it defines the volume of substantive advisory work included each month.",
        ],
        bullets: [
          "Up to 8 hours per month of advisory capacity.",
          "Capacity covers meetings, preparation, substantive async advice, architecture and document review, and the Quarterly Technology Review.",
          "Short administrative exchanges (scheduling, logistics, quick confirmations) do not consume capacity.",
          "Substantive async work is accounted in 15-minute increments.",
          "Priority async requests are normally answered within 1 business day. Advisory capacity is not an on-call or emergency-response service.",
          "Advice is provided to your designated contacts; the number of designated contacts is not capped.",
          "Unused capacity does not roll over; work beyond the included capacity requires explicit prior agreement or a separate scope.",
        ],
      },
      {
        id: "exclusions",
        heading: "What's not included",
        paragraphs: [
          "CTO Advisor+ deepens the advisory relationship; it does not convert it into operational ownership. TRENDev advises, your team decides and executes.",
        ],
        bullets: [
          "Operational ownership of systems, teams or delivery",
          "On-call duty or incident response",
          "Routine coding or hands-on implementation",
          "Sprint or project management",
          "Routine team management",
          "Unlimited code or document review",
        ],
      },
      {
        id: "billing",
        heading: "Billing & taxes",
        paragraphs: ["Price: €2,500 per month, excluding applicable taxes."],
        bullets: SHARED_BILLING_BULLETS,
      },
      {
        id: "cancellation",
        heading: "Cancellation",
        bullets: SHARED_CANCELLATION_BULLETS,
      },
      {
        id: "prerequisite",
        heading: "Before you subscribe",
        paragraphs: [
          "A free CTO consultation is the required first step before subscribing. It confirms mutual fit, clarifies your context, and makes the first month productive from day one.",
        ],
      },
    ],
  },
  {
    slug: "fractional-cto",
    tierId: "fractional-cto",
    title: "Fractional CTO",
    version: "1.0",
    effectiveDate: "2026-09-01",
    lastUpdated: "2026-08-18",
    metaDescription:
      "Fractional CTO — embedded, tailored CTO leadership for transformation, governance, due diligence and board-facing work. From €6,000/month excluding applicable taxes.",
    sections: [
      {
        id: "overview",
        heading: "Overview & who it's for",
        paragraphs: [
          "Fractional CTO is an enterprise-style, tailored engagement: embedded CTO leadership for organisations that need deeper involvement than advisory — transformation programmes, execution governance, board- and investor-facing technical leadership, or high-stakes technical work.",
          "Unlike the Advisor subscriptions, Fractional CTO takes ownership where scoped: of technical strategy, of architecture direction, of engineering governance — and of hands-on execution when explicitly agreed.",
          "This service is available to professional and business customers only.",
        ],
      },
      {
        id: "scope",
        heading: "Typical scope",
        bullets: [
          "Technical strategy and architecture ownership",
          "Engineering governance and delivery governance",
          "Team and leadership structure",
          "Hiring and senior interviews",
          "CEO, board and investor-facing technical leadership",
          "Transformation programmes",
          "Technical due diligence, investor DD and M&A support",
          "High-stakes technical arbitration",
          "Crisis and turnaround support",
          "Hands-on execution when explicitly scoped",
        ],
      },
      {
        id: "engagement",
        heading: "Engagement design",
        paragraphs: [
          "Every Fractional CTO engagement is scoped individually after a consultation: objectives, cadence, reserved capacity, governance model and duration are tailored to your context. There is no self-service checkout and no standard package — deliberately.",
        ],
        bullets: [
          "Scope, cadence and capacity defined per engagement",
          "Engagement-specific commercial terms supplement the standard Terms of Service",
          "Cancellation and renewal per the scoped agreement",
        ],
      },
      {
        id: "pricing",
        heading: "Commercial model",
        paragraphs: [
          "From €6,000 per month, excluding applicable taxes. The final commercial model is defined by the scoped engagement.",
          "Professional and business customers only.",
        ],
      },
      {
        id: "prerequisite",
        heading: "Getting started",
        paragraphs: [
          "Start with a free CTO consultation to discuss your context. If there is a fit, TRENDev prepares a tailored engagement proposal — scope, cadence, governance and commercial terms — for your review.",
        ],
      },
    ],
  },
];

export function getServiceDescription(
  slug: string,
): ServiceDescription | undefined {
  return serviceDescriptions.find((service) => service.slug === slug);
}
