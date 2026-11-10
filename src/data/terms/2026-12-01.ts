import type { TermsVersion } from "@/types";

/**
 * TRENDev Professional Services Terms of Service, version 1.1.
 *
 * STATUS: DRAFT, pending legal review and owner approval (issue #59). While
 * `status` is "draft", pre-review corrections are allowed but must regenerate
 * the PDF (docs/legal-versioning.md). /terms keeps serving v1.0 until this
 * version is approved: the registry skips drafts when choosing the current
 * version, and no live checkout points here.
 *
 * WHY A NEW VERSION: v1.0 S1 covers the CTO Advisor and CTO Advisor+
 * subscriptions only, and its definitions and mechanics are monthly. CTO
 * Decision Review, the one-off offer approved on 2026-11-10, cannot be sold
 * under it. Stripe holds a single account-wide Terms of Service URL, so one
 * document has to cover every self-service product: this version extends v1.0
 * rather than adding a separate agreement.
 *
 * WHAT CHANGED FROM v1.0, and nothing else:
 *  - S1  scope adds CTO Decision Review; "subscribing" becomes "purchasing".
 *  - S2  Annex C added; "Subscription Services" and "Decision Review" defined;
 *        Advisory Capacity tied to the Subscription Services; the precedence
 *        sentence now names Sections 1 to 15.
 *  - S3  formation also covers payment of a Decision Review fee.
 *  - S14 "the subscribed service" becomes "the purchased service".
 *  - S15 NEW: the one-off terms of a Decision Review. It switches off the
 *        monthly mechanics (S4, S7, recurring billing in S6) for that service
 *        instead of rewording them, so the Advisor text reviewed in August is
 *        unchanged.
 *  - Annexes A and B are byte-identical to v1.0 (scripts/check-offers.mjs
 *    checks it) and are renumbered 16 and 17; Annex C (18) reproduces the
 *    CTO Decision Review service description.
 *
 * OWNER DECISIONS STILL OPEN in S15, with proposed defaults in the text: no
 * refund once paid; reschedule at no charge on provider non-delivery, with a
 * full refund if the brief is not delivered within 90 days of receiving the
 * agreed documents; lapse without refund if the documents are not provided
 * within 90 days of payment despite a reminder.
 *
 * The Annexes are a deliberate, frozen COPY of the service descriptions, not an
 * import from src/data/serviceDescriptions.ts: importing live data would make
 * an immutable contract mutable.
 */
export const termsV20261201: TermsVersion = {
  version: "1.1",
  status: "draft",
  effectiveDate: "2026-12-01",
  lastUpdated: "2026-11-10",
  pdfPath: "/terms/trendev-terms-of-service-2026-12-01.pdf",
  sections: [
    {
      id: "scope-eligibility",
      number: 1,
      heading: "Scope and eligibility",
      paragraphs: [
        'These Terms of Service (the "Terms") govern the professional services provided by TRENDev, a société par actions simplifiée à associé unique (SASU) with share capital of €10,000, having its registered office at 7 avenue Christian Doppler, 77700 Serris, France, registered with the Trade and Companies Register (RCS) of Meaux under number 821 442 290 (SIRET 821 442 290 00028), intra-Community VAT number FR75 821 442 290 (the "Provider"), to its clients (each, the "Client").',
        '"TRENDev Consulting" is a trading name (nom commercial) under which TRENDev carries on its consulting activity. It designates the same legal person and is not a separate entity: the contracting party under these Terms is TRENDev, identified above.',
        "The Provider's services are offered exclusively to professional and business customers acting in the course of their business activity, worldwide. They are not offered to consumers, and consumer-protection rules, including consumer withdrawal rights, do not apply.",
        "By purchasing a service, the person completing the purchase confirms that they act in a professional capacity, on behalf of the Client entity, and that they have authority to bind that entity to these Terms.",
        "These Terms govern the CTO Advisor and CTO Advisor+ subscription services and the CTO Decision Review one-off service only. Fractional CTO engagements are not available for self-service purchase and are not governed by these Terms: each such engagement is governed by its own agreement, scoped and accepted in writing.",
      ],
    },
    {
      id: "definitions-incorporation",
      number: 2,
      heading: "Definitions and incorporation of Service Descriptions",
      paragraphs: [
        '"Service Description" means the description of the selected service, including its scope, advisory capacity, exclusions and commercial mechanics, set out in Annex A (CTO Advisor), Annex B (CTO Advisor+) or Annex C (CTO Decision Review) to these Terms.',
        '"Subscription Services" means the CTO Advisor and CTO Advisor+ services. "Decision Review" means the CTO Decision Review service, a one-off service governed by Section 15.',
        "The Service Description of the selected service forms an integral part of the agreement between the Provider and the Client. Because it is reproduced in full in these Terms, the Client receives and accepts it together with these Terms at the time of purchase, and the accepted wording is fixed by the version of these Terms then accepted. The same wording is published at trendev.fr/services for information; in the event of any discrepancy, the Annex to the version of these Terms accepted by the Client prevails.",
        "In the event of conflict between an Annex and Sections 1 to 15 of these Terms, Sections 1 to 15 prevail, unless the Annex expressly states otherwise.",
        '"Advisory Capacity" means the monthly volume of substantive advisory work included in a subscription to a Subscription Service, as defined in the applicable Service Description.',
        '"Billing Period" means the monthly period covered by one advance subscription payment.',
      ],
    },
    {
      id: "formation-acceptance",
      number: 3,
      heading: "Formation of the agreement and electronic acceptance",
      paragraphs: [
        "The agreement is formed online, without a separately signed contract: the Client completes the checkout process, explicitly confirms its professional or business status, explicitly accepts the then-current version of these Terms, and pays the first Billing Period of a Subscription Service or the fee for a Decision Review.",
        "The agreement is formed when the first payment is confirmed. The accepted Terms version and its effective date, which include the applicable Service Description as an Annex, the selected service, the purchase timestamp and the Client's identification details are recorded as evidence of acceptance and retained by the Provider and its payment processor.",
        "The Client agrees that this electronic acceptance process constitutes valid and binding contract formation, and that the records described above constitute admissible evidence of the agreement and its content.",
      ],
    },
    {
      id: "advisory-capacity",
      number: 4,
      heading: "Advisory Capacity and usage rules",
      paragraphs: [
        "Each subscription includes the monthly Advisory Capacity stated in its Service Description. Capacity covers meetings, preparation, substantive asynchronous advice, and architecture or document review. Short administrative exchanges do not consume capacity.",
      ],
      bullets: [
        "Unused Advisory Capacity expires at the end of each monthly period and does not roll over.",
        "Advisory Capacity is not an on-call, standby or emergency-response service, and carries no guaranteed response or availability commitment beyond any response target stated in the Service Description.",
        "Work beyond the included Advisory Capacity requires the Provider's explicit prior agreement and is subject to a separate scope and separate fees.",
        "Advisory Capacity is personal to the Client and may not be shared with, resold to, or used for the benefit of third parties.",
      ],
    },
    {
      id: "availability-exclusions",
      number: 5,
      heading: "Availability, communication and excluded services",
      paragraphs: [
        "Services are provided remotely, in English or French, during the Provider's normal business days. Any response target stated in a Service Description is an objective of means, not a guaranteed result.",
        "Unless explicitly included in the applicable Service Description, the services exclude: operational ownership of systems, teams or delivery; on-call duty and incident response; routine coding and hands-on implementation; sprint or project management; routine team management; and unlimited code or document review.",
      ],
    },
    {
      id: "fees-billing-taxes",
      number: 6,
      heading: "Fees, billing, taxes and failed payments",
      paragraphs: [
        "Subscription fees are payable monthly in advance, at the price stated at checkout for the selected service. Published prices are stated excluding applicable taxes.",
        "Where VAT or another transaction tax is due, it is added to the stated price and is payable by the Client in addition to it. Clients established in France are charged French VAT at the applicable rate on top of the subscription price.",
        "The applicable VAT or other tax treatment is determined according to the Client's country of establishment and tax status, in accordance with applicable law. For business customers established outside France, the reverse-charge mechanism or the applicable cross-border rules may apply; the Client is responsible for providing accurate business and tax identification information, including a valid VAT number where applicable, and for self-assessing any tax due under a reverse-charge mechanism.",
        "Each Billing Period is invoiced as a single charge, due on its date of issue, and is collected automatically through the Provider's payment processor using the payment method registered by the Client. An invoice is issued to the Client for each Billing Period.",
        "If a recurring payment fails, the Provider, directly or through its payment processor, may retry payment and notify the Client. If payment remains outstanding, the Provider may suspend the services and/or terminate the subscription in accordance with Section 13.",
        "Late payments by professional clients automatically incur, without prior notice, late-payment interest at the rate applied by the European Central Bank to its most recent refinancing operation plus 10 percentage points, and a fixed recovery-cost indemnity of €40 per unpaid invoice (Articles L. 441-10 and D. 441-5 of the French Commercial Code), plus additional recovery costs on justification.",
      ],
    },
    {
      id: "cancellation",
      number: 7,
      heading: "Cancellation and its effects",
      paragraphs: [
        "The Client may cancel a CTO Advisor or CTO Advisor+ subscription at any time, without penalty and without stating a reason. There is no minimum commitment period.",
        "Cancellation has the following effects:",
      ],
      bullets: [
        "Cancellation takes effect at the end of the current paid Billing Period; the service remains available until that date and no further Billing Period is charged.",
        "Amounts paid for the current Billing Period are not refunded, in whole or in part, and no prorated credit is issued.",
        "Advisory Capacity that the Client has not used by the effective date of cancellation is forfeited and is not compensated.",
      ],
      subsections: [
        {
          id: "provider-non-delivery",
          heading: "If the Provider does not deliver the Advisory Capacity",
          paragraphs: [
            "Where the Provider does not make the Advisory Capacity of a Billing Period available to the Client for a reason attributable to the Provider, including absence, illness or unavailability, no refund is due. Instead, the Advisory Capacity that the Provider did not make available is carried over to the following Billing Periods, in addition to the capacity included in those periods and at no additional charge, until it has been delivered in full or the Client cancels.",
            "This carry-over is distinct from the forfeiture rule above: capacity the Client chose not to use expires at the end of its Billing Period, whereas capacity the Provider failed to make available is carried over.",
            "The Client remains free to cancel at any time under this Section, including once it considers the carried-over capacity to have been delivered. The subscription then ends at the end of the current paid Billing Period and no further Billing Period is charged.",
            "Nothing in this Section excludes any remedy that cannot be excluded under applicable law.",
          ],
        },
      ],
    },
    {
      id: "client-responsibilities",
      number: 8,
      heading: "Client responsibilities and decision-making",
      paragraphs: [
        "The Provider supplies independent professional advice. All decisions, including whether and how to implement any advice or recommendation, remain the Client's sole responsibility, and the Client remains solely responsible for its business, systems, personnel, compliance and results.",
        "The Client shall provide, in a timely manner, the accurate and complete information, access and cooperation reasonably necessary for the services. The Provider is not responsible for consequences of incomplete, inaccurate or late information provided by the Client.",
        "The Client is responsible for maintaining its own backups, security measures and operational safeguards; the advisory services do not replace them.",
      ],
    },
    {
      id: "confidentiality",
      number: 9,
      heading: "Confidentiality",
      paragraphs: [
        "Each party shall keep confidential all non-public information received from the other party in connection with the services, use it only for the purposes of the engagement, and protect it with at least the care it applies to its own confidential information of similar nature.",
        "Confidentiality obligations do not apply to information that is or becomes public without breach, was lawfully known before disclosure, is lawfully received from a third party, is independently developed, or must be disclosed by law or by a competent authority, in which case the disclosing party shall, where lawful, notify the other party promptly.",
        "These obligations survive for five (5) years after the end of the engagement.",
      ],
    },
    {
      id: "intellectual-property",
      number: 10,
      heading: "Intellectual property",
      paragraphs: [
        "Each party retains all intellectual property rights it held before the engagement. The Provider retains all rights in its pre-existing and independently developed methodologies, frameworks, know-how, tools and generic materials, including improvements to them made during the engagement.",
        "Upon full payment of the fees due, the Client receives a non-exclusive, worldwide, perpetual right to use, within its organisation and for its internal business purposes, the deliverables specifically prepared for the Client under the engagement, such as written recommendations, review reports and roadmaps.",
        "No rights are granted to either party's trademarks or trade names. Neither party may publicly reference the other as a client or provider without prior written consent, except in confidential due-diligence contexts.",
      ],
    },
    {
      id: "data-protection",
      number: 11,
      heading: "Data protection and security",
      paragraphs: [
        "Each party processes the personal data of the other party's contact persons (names, professional contact details, exchanges) as an independent controller, for the purposes of managing the engagement, in accordance with applicable data-protection law, including the GDPR.",
        "Details of the Provider's processing are set out in the privacy policy at trendev.fr/privacy.",
        "The advisory services do not, by design, require the Provider to process personal data contained in the Client's systems. If a scoped engagement requires such processing, the parties shall enter into the appropriate data-processing terms before the processing begins.",
        "Each party implements appropriate technical and organisational security measures for the information it holds; the Client remains responsible for the security of its own systems and data.",
      ],
    },
    {
      id: "liability",
      number: 12,
      heading: "Liability",
      paragraphs: [
        "The services consist of advice, analysis and recommendations. The Provider does not implement, operate or take charge of the Client's systems, teams, projects or delivery, and gives no warranty as to any particular commercial or technical outcome. Decisions and their implementation remain with the Client, as set out in Section 8.",
        "The Provider's obligations are obligations of means. To the maximum extent permitted by law, the Provider's total aggregate liability arising out of or in connection with the services, whatever the legal basis, is limited to the total fees actually paid by the Client for the services during the twelve (12) months preceding the event giving rise to liability.",
        "To the maximum extent permitted by law, neither party is liable for indirect or consequential loss, loss of profit, loss of revenue, loss of data, loss of opportunity, or reputational harm.",
        "Nothing in these Terms excludes or limits liability for gross negligence (faute lourde), wilful misconduct (dol), or any liability that cannot be excluded or limited under applicable law.",
        "Any claim must be notified to the Provider in writing within twelve (12) months of the event giving rise to it. This is a notice requirement and a condition of bringing the claim: a claim not notified within that period may not subsequently be brought. It is not a contractual modification of the limitation period, which continues to run as provided by law.",
      ],
    },
    {
      id: "suspension-termination",
      number: 13,
      heading: "Suspension, termination and material breach",
      paragraphs: [
        "The Provider may suspend the services upon notice if undisputed amounts remain unpaid after a reminder, or if the Client's use of the services is unlawful or abusive. Suspension does not relieve the Client of its payment obligations for the current Billing Period.",
        "Either party may terminate the agreement with immediate effect if the other party materially breaches these Terms and fails to cure the breach within fifteen (15) days of written notice, or immediately in case of a breach incapable of cure.",
        "Termination for the Client's material breach does not entitle the Client to any refund for the current Billing Period. Sections that by their nature survive termination, including confidentiality, intellectual property, liability and governing law, remain in force.",
      ],
    },
    {
      id: "law-disputes",
      number: 14,
      heading: "Governing law, disputes and general provisions",
      paragraphs: [
        "These Terms and the agreement they govern are governed by French law, excluding its conflict-of-law rules. The United Nations Convention on Contracts for the International Sale of Goods does not apply.",
        "The parties shall first attempt to resolve any dispute amicably within thirty (30) days of written notice. Failing amicable resolution, the competent courts of Meaux, France, being the place of the Provider's registered office, have exclusive jurisdiction, including for interim and emergency proceedings, notwithstanding multiple defendants or third-party claims.",
        "If any provision of these Terms is held invalid, the remainder stays in force, and the invalid provision is replaced by a valid provision closest to its intent. The Provider's failure to enforce a provision is not a waiver. The Client may not assign the agreement without the Provider's prior written consent. These Terms, including their Annexes, together with the checkout record, constitute the entire agreement for the purchased service.",
        "The service, its scope as set out in the applicable Annex, and the fees accepted by the Client at purchase continue to govern the subscription for as long as it runs unchanged. The Provider may publish new versions of these Terms for new purchases. A new version applies to a running subscription only if the Client changes the subscribed service or otherwise expressly agrees to it. The version accepted at purchase remains accessible at its dated address.",
      ],
    },
    {
      id: "decision-review",
      number: 15,
      heading: "CTO Decision Review: one-off service",
      paragraphs: [
        "This Section applies to the Decision Review only. Sections 4 and 7, and the provisions of Section 6 on monthly payment in advance, recurring collection, Billing Periods and failed recurring payments, do not apply to it. The other provisions of these Terms apply to it in full.",
        'Before purchase, the Client and the Provider hold a free introductory call. The decision to be reviewed, the questions agreed for it and the documents agreed for it (the "Agreed Scope") are then confirmed in writing; email is sufficient. The Decision Review covers the Agreed Scope only.',
        "The fee is a single payment, payable in full at purchase, at the price stated at checkout. It is invoiced as one charge, due on its date of issue. The paragraphs of Section 6 on taxes and on late payment apply to it. A Decision Review is not a subscription: it does not renew and does not convert into any other service.",
        "The Decision Review includes up to four (4) hours of work in total, covering preparation, review of the agreed documents, analysis, the written decision brief and its walkthrough. This is a total for the engagement, not a monthly allowance, and nothing carries over.",
        "Delivery timing is agreed in writing once the Agreed Scope is confirmed and the agreed documents are received. No delivery date is guaranteed unless it is agreed in writing.",
        "If the Agreed Scope cannot be completed within the four hours, the Provider informs the Client before exceeding them. The parties then either narrow the Agreed Scope or agree a separate scope and fees in writing. No work beyond the four hours is performed or charged without the Client's prior written agreement.",
        "Either party may reschedule the walkthrough with at least one business day's notice. The fee is not refunded once paid, except as follows:",
      ],
      bullets: [
        "If the Provider cannot deliver at the agreed time for a reason attributable to it, it reschedules at no additional charge. If the Provider has not delivered the written decision brief within ninety (90) days of receiving the agreed documents, for a reason attributable to it, the Client may terminate the Decision Review by written notice and the Provider refunds the fee in full.",
        "If the Client does not provide the agreed documents within ninety (90) days of payment, despite a written reminder from the Provider, the Decision Review lapses and the fee is not refunded.",
      ],
    },
    {
      id: "annex-a-cto-advisor",
      number: 16,
      label: "Annex A",
      heading: "CTO Advisor service description",
      paragraphs: [
        "This Annex is the Service Description of the CTO Advisor service, incorporated into these Terms under Section 2. It applies where the Client has subscribed to CTO Advisor.",
      ],
      subsections: [
        {
          id: "annex-a-overview",
          heading: "Overview & who it's for",
          paragraphs: [
            "CTO Advisor gives founders and executives recurring access to senior CTO judgment without hiring an operational technology leader. You bring the decisions that keep you up at night: architecture bets, roadmap sequencing, hiring, vendor choices. You get direct, experienced counsel with no agenda other than your outcome.",
            "It is designed for leaders who own execution themselves but want a trusted, independent technical authority reviewing direction, challenging assumptions, and helping avoid expensive mistakes.",
            "This service is available to professional and business customers only.",
          ],
        },
        {
          id: "annex-a-scope",
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
          id: "annex-a-capacity",
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
          id: "annex-a-exclusions",
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
          id: "annex-a-billing",
          heading: "Billing & taxes",
          paragraphs: ["Price: €1,500 per month, excluding applicable taxes."],
          bullets: [
            "Monthly subscription, billed in advance at the start of each billing period.",
            "Public prices are stated excluding applicable taxes. The applicable VAT or tax treatment is determined at checkout and on invoices, based on your business's country of establishment and tax status.",
            "Professional and business customers only: this service is not offered to consumers.",
          ],
        },
        {
          id: "annex-a-cancellation",
          heading: "Cancellation",
          bullets: [
            "Cancel anytime, with no long-term commitment.",
            "Cancellation takes effect at the end of the current paid billing period; the service remains available until then.",
            "No refunds and no prorated credits for the current paid period.",
            "Unused advisory capacity does not roll over to the following month.",
          ],
        },
        {
          id: "annex-a-prerequisite",
          heading: "Before you subscribe",
          paragraphs: [
            "A free CTO consultation is the required first step before subscribing. It confirms mutual fit, clarifies your context, and makes the first month productive from day one.",
          ],
        },
      ],
    },
    {
      id: "annex-b-cto-advisor-plus",
      number: 17,
      label: "Annex B",
      heading: "CTO Advisor+ service description",
      paragraphs: [
        "This Annex is the Service Description of the CTO Advisor+ service, incorporated into these Terms under Section 2. It applies where the Client has subscribed to CTO Advisor+.",
      ],
      subsections: [
        {
          id: "annex-b-overview",
          heading: "Overview & who it's for",
          paragraphs: [
            "CTO Advisor+ is the recommended tier for leaders who want continuous CTO-level governance, not just occasional counsel. It combines a closer strategic cadence with priority access and structured, recurring review of your architecture, roadmap and engineering delivery.",
            "It suits organisations where technology decisions carry board-level weight: scale-ups between funding rounds, companies preparing for diligence, and executive teams that want a standing technical authority at the table.",
            "This service is available to professional and business customers only.",
          ],
        },
        {
          id: "annex-b-scope",
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
          id: "annex-b-quarterly-review",
          heading: "Quarterly Technology Review",
          paragraphs: [
            "Once per quarter, a structured review of your architecture, roadmap, delivery and technical risks, concluded with prioritised written recommendations for the next quarter. The review is delivered within your included monthly capacity, not in addition to it.",
          ],
        },
        {
          id: "annex-b-capacity",
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
          id: "annex-b-exclusions",
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
          id: "annex-b-billing",
          heading: "Billing & taxes",
          paragraphs: ["Price: €2,500 per month, excluding applicable taxes."],
          bullets: [
            "Monthly subscription, billed in advance at the start of each billing period.",
            "Public prices are stated excluding applicable taxes. The applicable VAT or tax treatment is determined at checkout and on invoices, based on your business's country of establishment and tax status.",
            "Professional and business customers only: this service is not offered to consumers.",
          ],
        },
        {
          id: "annex-b-cancellation",
          heading: "Cancellation",
          bullets: [
            "Cancel anytime, with no long-term commitment.",
            "Cancellation takes effect at the end of the current paid billing period; the service remains available until then.",
            "No refunds and no prorated credits for the current paid period.",
            "Unused advisory capacity does not roll over to the following month.",
          ],
        },
        {
          id: "annex-b-prerequisite",
          heading: "Before you subscribe",
          paragraphs: [
            "A free CTO consultation is the required first step before subscribing. It confirms mutual fit, clarifies your context, and makes the first month productive from day one.",
          ],
        },
      ],
    },
    {
      id: "annex-c-cto-decision-review",
      number: 18,
      label: "Annex C",
      heading: "CTO Decision Review service description",
      paragraphs: [
        "This Annex is the Service Description of the CTO Decision Review service, incorporated into these Terms under Section 2. It applies where the Client has purchased a Decision Review, together with Section 15.",
      ],
      subsections: [
          {
            id: "annex-c-overview",
            heading: "Overview & who it's for",
            paragraphs: [
              "CTO Decision Review gives founders and executives a clear, independent recommendation on one specific technical decision before they commit to it. It is a one-off review, not a subscription: one question, one written brief, one walkthrough.",
              "It is designed primarily for founders and CEOs of B2B SaaS and software companies facing a concrete technical decision, for example whether to accept a development proposal or estimate, which migration scenario to pursue, or whether a proposed rewrite is justified. These are examples of the questions it fits, not a description of your situation.",
              "This service is available to professional and business customers only.",
            ],
          },
          {
            id: "annex-c-scope",
            heading: "One decision, agreed in advance",
            paragraphs: [
              "The review covers one clearly identified decision, the questions agreed for it and the documents agreed for it. All three are confirmed in writing before the work starts.",
            ],
          },
          {
            id: "annex-c-deliverable",
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
            id: "annex-c-walkthrough",
            heading: "Walkthrough",
            paragraphs: [
              "The brief is presented in a walkthrough session with the decision-maker, to go through the findings and answer questions about them. The walkthrough is part of the four hours, not in addition to them.",
            ],
          },
          {
            id: "annex-c-capacity",
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
            id: "annex-c-overflow",
            heading: "If the question needs more than 4 hours",
            paragraphs: [
              "If it becomes clear that the agreed question cannot be answered properly within the 4 hours, TRENDev tells you before going beyond them. We then either narrow the question so that it fits, or propose a separate scope and quote for you to accept or decline. Work beyond the limit is never carried out or billed without your prior written agreement.",
            ],
          },
          {
            id: "annex-c-prerequisite",
            heading: "Required first step: a free introductory call",
            paragraphs: [
              "A free 20-minute introductory call is required before purchase. It confirms fit, agrees the question and checks that the review fits the four-hour scope.",
            ],
            bullets: [
              "No preparation and no documents are needed for the call.",
              "The call carries no obligation to buy.",
              "The call is separate from the paid four hours. It is not a free audit and produces no assessment or deliverable.",
              "Once the question is agreed, TRENDev sends you the payment link for the review.",
            ],
          },
          {
            id: "annex-c-inputs",
            heading: "Agreed inputs",
            paragraphs: [
              "The review works from the documents agreed during scoping, for example a vendor proposal, a development estimate, an architecture document or a migration plan. You provide them, with the context needed to read them, in a timely manner.",
              "Please do not send credentials, access tokens, secrets or production personal data.",
            ],
          },
          {
            id: "annex-c-exclusions",
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
            id: "annex-c-billing",
            heading: "Price & billing",
            paragraphs: ["Price: €1,500, one-time, excluding applicable taxes."],
            bullets: [
              "One payment, made before the review starts. There is no subscription, no renewal and no automatic conversion into CTO Advisor or any other plan.",
              "Public prices are stated excluding applicable taxes. The applicable VAT or tax treatment is determined at checkout and on invoices, based on your business's country of establishment and tax status.",
              "Professional and business customers only: this service is not offered to consumers.",
            ],
          },
          {
            id: "annex-c-rescheduling",
            heading: "Rescheduling & cancellation",
            bullets: [
              "Either party may reschedule the walkthrough with at least one business day's notice.",
              "The fee is not refunded once paid, except as set out below.",
              "If TRENDev cannot deliver at the agreed time, it reschedules at no extra charge. If it has not delivered within 90 days of receiving the agreed documents, for a reason attributable to TRENDev, you may end the engagement and the fee is refunded in full.",
              "If the agreed documents are not provided within 90 days of payment, despite a reminder, the engagement lapses and the fee is not refunded.",
            ],
          },
          {
            id: "annex-c-broader-work",
            heading: "Broader work",
            paragraphs: [
              "Recurring advice is the scope of CTO Advisor and CTO Advisor+, technology leadership that of Fractional CTO, and a broad assessment, due diligence or implementation is scoped separately. You can start with any of them directly: the Decision Review is not a mandatory first step.",
            ],
          },
      ],
    },
  ],
};
