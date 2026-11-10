import type { ServiceDescription } from "@/types";

/**
 * Full service descriptions for the four public offers (issue #14; CTO
 * Decision Review added by issue #59).
 *
 * These pages are commercial service definitions, not legal Terms. Each one
 * carries a version + effective date because the version accepted at purchase
 * becomes part of the agreement (see docs/legal-versioning.md and the Terms).
 *
 * VERSIONING: once a version is live and purchasable, do not edit its
 * substance in place. Bump the version, archive the outgoing text to
 * docs/service-descriptions/<slug>-vX.Y.md, and record the change in
 * docs/legal-versioning.md.
 *
 * ANNEX PARITY: for cto-advisor and cto-advisor-plus, the text below must stay
 * word for word identical to the matching Annex in the current Terms version
 * (src/data/terms/2026-09-01.ts). The Annex is the contractual copy and is
 * frozen; this file is the marketing rendering of it. Changing one means
 * publishing a new Terms version too, and the Annex wins on any discrepancy
 * (Terms S2).
 *
 * The same parity rule binds cto-decision-review to Annex C of Terms v1.1
 * (src/data/terms/2026-12-01.ts), the first version that covers it. v1.1 was
 * approved on 2026-11-10 and is frozen, so changing this description now means
 * a new Terms version; scripts/check-offers.mjs fails on any divergence.
 *
 * Fractional CTO has no Annex: Terms S1 puts it outside the online Terms, so
 * its commercial terms come from its own engagement agreement.
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
  "Professional and business customers only: this service is not offered to consumers.",
];

const SHARED_CANCELLATION_BULLETS = [
  "Cancel anytime, with no long-term commitment.",
  "Cancellation takes effect at the end of the current paid billing period; the service remains available until then.",
  "No refunds and no prorated credits for the current paid period.",
  "Unused advisory capacity does not roll over to the following month.",
];

export const serviceDescriptions: ServiceDescription[] = [
  {
    slug: "cto-decision-review",
    tierId: "cto-decision-review",
    title: "CTO Decision Review",
    version: "1.0",
    effectiveDate: "2026-12-01",
    lastUpdated: "2026-11-10",
    metaDescription:
      "CTO Decision Review: an independent review of one technical decision, with a written decision brief and a walkthrough. €1,500 one-time, excluding applicable taxes, up to 4 hours in total.",
    sections: [
      {
        id: "overview",
        heading: "Overview & who it's for",
        paragraphs: [
          "CTO Decision Review gives founders and executives a clear, independent recommendation on one specific technical decision before they commit to it. It is a one-off review, not a subscription: one question, one written brief, one walkthrough.",
          "It is designed primarily for founders and CEOs of B2B SaaS and software companies facing a concrete technical decision, for example whether to accept a development proposal or estimate, which migration scenario to pursue, or whether a proposed rewrite is justified. These are examples of the questions it fits, not a description of your situation.",
          "This service is available to professional and business customers only.",
        ],
      },
      {
        id: "scope",
        heading: "One decision, agreed in advance",
        paragraphs: [
          "The review covers one clearly identified decision, the questions agreed for it and the documents agreed for it. All three are confirmed in writing before the work starts.",
        ],
      },
      {
        id: "deliverable",
        heading: "What you receive",
        paragraphs: ["A concise written decision brief, covering:"],
        bullets: [
          "The relevant facts established from the agreed documents",
          "Unknowns, and the assumptions made about them",
          "The options and their trade-offs",
          "A recommendation",
          "The checks that remain before you commit",
        ],
      },
      {
        id: "walkthrough",
        heading: "Walkthrough",
        paragraphs: [
          "The brief is presented in a walkthrough session with the decision-maker, to go through the findings and answer questions about them. The walkthrough is part of the four hours, not in addition to them.",
        ],
      },
      {
        id: "capacity",
        heading: "Capacity: up to 4 hours in total",
        paragraphs: [
          "The review includes up to 4 hours of work in total, for the whole engagement. It is not a monthly allowance.",
        ],
        bullets: [
          "The 4 hours cover preparation, review of the agreed documents, analysis, writing the brief and the walkthrough.",
          "There is no recurring capacity, no advisory access after delivery and nothing to roll over.",
          "Delivery timing is agreed after the fit and scope review. No turnaround is guaranteed unless it is agreed in writing.",
        ],
      },
      {
        id: "overflow",
        heading: "If the question needs more than 4 hours",
        paragraphs: [
          "If it becomes clear that the agreed question cannot be answered properly within the 4 hours, TRENDev tells you before going beyond them. We then either narrow the question so that it fits, or propose a separate scope and quote for you to accept or decline. Work beyond the limit is never carried out or billed without your prior written agreement.",
        ],
      },
      {
        id: "prerequisite",
        heading: "Recommended first step: a free introductory call",
        paragraphs: [
          "A free 20-minute introductory call is recommended before purchase. It confirms fit, agrees the question and checks that the review fits the four-hour scope. You can also purchase directly: the question and the documents are then agreed in writing before any work starts.",
        ],
        bullets: [
          "No preparation and no documents are needed for the call.",
          "The call carries no obligation to buy.",
          "The call is separate from the paid four hours. It is not a free audit and produces no assessment or deliverable.",
          "If you purchase without a call and TRENDev declines the question as unsuitable for a review before any work starts, the fee is refunded in full.",
        ],
      },
      {
        id: "inputs",
        heading: "Agreed inputs",
        paragraphs: [
          "The review works from the documents agreed during scoping, for example a vendor proposal, a development estimate, an architecture document or a migration plan. You provide them, with the context needed to read them, in a timely manner.",
          "Please do not send credentials, access tokens, secrets or production personal data.",
        ],
      },
      {
        id: "exclusions",
        heading: "Responsibilities & what's not included",
        paragraphs: [
          "TRENDev advises; you keep the decision and its execution. Any follow-on delivery is optional, its commercial interest is disclosed, and it is scoped and priced separately.",
        ],
        bullets: [
          "Comprehensive audit or technical due diligence",
          "Exhaustive code or security review",
          "Implementation or hands-on delivery",
          "Ongoing advisory access",
          "Operational ownership of systems, teams or delivery",
          "Additional decisions beyond the agreed one",
          "Open-ended investigation",
        ],
      },
      {
        id: "billing",
        heading: "Price & billing",
        paragraphs: ["Price: €1,500, one-time, excluding applicable taxes."],
        bullets: [
          "One payment, made before the review starts. There is no subscription, no renewal and no automatic conversion into CTO Advisor or any other plan.",
          "Public prices are stated excluding applicable taxes. The applicable VAT or tax treatment is determined at checkout and on invoices, based on your business's country of establishment and tax status.",
          "Professional and business customers only: this service is not offered to consumers.",
        ],
      },
      {
        id: "rescheduling",
        heading: "Rescheduling & cancellation",
        bullets: [
          "Either party may reschedule the walkthrough with at least one business day's notice.",
          "The fee is not refunded once paid, except as set out below.",
          "If TRENDev cannot deliver at the agreed time, it reschedules at no extra charge. If it has not delivered within 90 days of receiving the agreed documents, for a reason attributable to TRENDev, you may end the engagement and the fee is refunded in full.",
          "If the agreed documents are not provided within 90 days of payment, despite a reminder, the engagement lapses and the fee is not refunded.",
        ],
      },
      {
        id: "broader-work",
        heading: "Broader work",
        paragraphs: [
          "Recurring advice is the scope of CTO Advisor and CTO Advisor+, technology leadership that of Fractional CTO, and a broad assessment, due diligence or implementation is scoped separately. You can start with any of them directly: the Decision Review is not a mandatory first step.",
        ],
      },
    ],
  },
  {
    slug: "cto-advisor",
    tierId: "cto-advisor",
    title: "CTO Advisor",
    version: "1.0",
    effectiveDate: "2026-09-01",
    lastUpdated: "2026-08-21",
    metaDescription:
      "CTO Advisor: recurring senior CTO advisory for founders and executives. €1,500/month excluding applicable taxes, up to 4h/month advisory capacity, cancel anytime.",
    sections: [
      {
        id: "overview",
        heading: "Overview & who it's for",
        paragraphs: [
          "CTO Advisor gives founders and executives recurring access to senior CTO judgment without hiring an operational technology leader. You bring the decisions that keep you up at night: architecture bets, roadmap sequencing, hiring, vendor choices. You get direct, experienced counsel with no agenda other than your outcome.",
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
          "Advisory capacity is a boundary, not the value proposition. It defines the volume of substantive advisory work included each month.",
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
    lastUpdated: "2026-08-21",
    metaDescription:
      "CTO Advisor+: deeper recurring CTO governance with priority access. €2,500/month excluding applicable taxes, up to 8h/month advisory capacity, cancel anytime.",
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
          "Advisory capacity is a boundary, not the value proposition. It defines the volume of substantive advisory work included each month.",
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
    lastUpdated: "2026-08-21",
    metaDescription:
      "Fractional CTO: embedded, tailored CTO leadership for transformation, governance, due diligence and board-facing work. From €6,000/month excluding applicable taxes.",
    sections: [
      {
        id: "overview",
        heading: "Overview & who it's for",
        paragraphs: [
          "Fractional CTO is an enterprise-style, tailored engagement: embedded CTO leadership for organisations that need deeper involvement than advisory, such as transformation programmes, execution governance, board- and investor-facing technical leadership, or high-stakes technical work.",
          "Unlike the Advisor subscriptions, Fractional CTO takes ownership where scoped: of technical strategy, of architecture direction, of engineering governance, and of hands-on execution when explicitly agreed.",
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
          "Every Fractional CTO engagement is scoped individually after a consultation: objectives, cadence, reserved capacity, governance model and duration are tailored to your context. There is no self-service checkout and no standard package, deliberately.",
        ],
        bullets: [
          "Scope, cadence and capacity defined per engagement",
          "Commercial and contractual terms are set by the engagement agreement, not by the online Terms of Service",
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
          "Start with a free CTO consultation to discuss your context. If there is a fit, TRENDev prepares a tailored engagement proposal for your review, covering scope, cadence, governance and commercial terms.",
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
