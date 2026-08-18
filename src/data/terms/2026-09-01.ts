import type { TermsVersion } from "@/types";

/**
 * TRENDev Professional Services — Terms of Service, version 1.0 (DRAFT).
 *
 * IMMUTABILITY: once this version's PDF is committed and the version is
 * purchasable, this file must NEVER be edited in substance. Changes require a
 * new dated module + registry entry + PDF (see src/data/terms/index.ts and
 * docs/legal-versioning.md). While status is "draft", pre-review corrections
 * are allowed but must regenerate the PDF.
 *
 * DRAFT STATUS: this text has NOT been reviewed by a French IT/commercial
 * lawyer. It must not be marked "effective" before lawyer review and owner
 * approval (issue #15).
 *
 * Legal entity details confirmed by the owner on 2026-08-18 from the public
 * registers (RCS Meaux 821 442 290); the 2026-09-01 effective date is also
 * confirmed. The jurisdiction clause in section 14 still needs the lawyer's
 * sign-off, which is why this version stays a draft.
 */
export const termsV20260901: TermsVersion = {
  version: "1.0",
  status: "draft",
  effectiveDate: "2026-09-01",
  lastUpdated: "2026-08-18",
  pdfPath: "/terms/trendev-terms-of-service-2026-09-01.pdf",
  sections: [
    {
      id: "scope-eligibility",
      number: 1,
      heading: "Scope and eligibility",
      paragraphs: [
        'These Terms of Service (the "Terms") govern the professional services provided by TRENDev, a société par actions simplifiée à associé unique (SASU) with share capital of €10,000, having its registered office at 7 avenue Christian Doppler, 77700 Serris, France, registered with the Trade and Companies Register (RCS) of Meaux under number 821 442 290 (SIRET 821 442 290 00028), intra-Community VAT number FR75 821 442 290 (the "Provider"), to its clients (each, the "Client").',
        "The Provider's services are offered exclusively to professional and business customers acting in the course of their business activity, worldwide. They are not offered to consumers, and consumer-protection rules — including consumer withdrawal rights — do not apply.",
        "By subscribing to a service, the person completing the purchase confirms that they act in a professional capacity, on behalf of the Client entity, and that they have authority to bind that entity to these Terms.",
        "These Terms apply to the CTO Advisor and CTO Advisor+ subscription services and, as supplemented by an engagement-specific agreement, to Fractional CTO engagements.",
      ],
    },
    {
      id: "definitions-incorporation",
      number: 2,
      heading: "Definitions and incorporation of Service Descriptions",
      paragraphs: [
        '"Service Description" means the published description of the selected service (including its scope, capacity, exclusions and commercial mechanics) identified by a version number and effective date, available at trendev.fr/services.',
        "The Service Description of the selected service, in the version identified at the time of purchase, is incorporated into and forms an integral part of the agreement between the Provider and the Client. In case of conflict between a Service Description and these Terms, these Terms prevail unless the Service Description expressly states otherwise.",
        '"Advisory Capacity" means the monthly volume of substantive advisory work included in a subscription, as defined in the applicable Service Description.',
        '"Billing Period" means the monthly period covered by one advance subscription payment.',
      ],
    },
    {
      id: "formation-acceptance",
      number: 3,
      heading: "Formation of the agreement and electronic acceptance",
      paragraphs: [
        "For CTO Advisor and CTO Advisor+, the agreement is formed online, without a separately signed contract: the Client completes the checkout process, explicitly confirms its professional/business status, explicitly accepts the then-current version of these Terms, and pays the first Billing Period.",
        "The agreement is formed when the first payment is confirmed. The accepted Terms version and effective date, the applicable Service Description version, the selected service, the purchase timestamp and the Client's identification details are recorded as evidence of acceptance and retained by the Provider and its payment processor.",
        "The Client agrees that this electronic acceptance process constitutes valid and binding contract formation, and that the records described above constitute admissible evidence of the agreement and its content.",
        "For Fractional CTO engagements, the agreement is formed by the engagement-specific proposal accepted in writing (including by email), which incorporates these Terms.",
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
        "Unless explicitly included in a Service Description or a scoped Fractional CTO engagement, the services exclude: operational ownership of systems, teams or delivery; on-call duty and incident response; routine coding and hands-on implementation; sprint or project management; routine team management; and unlimited code or document review.",
      ],
    },
    {
      id: "fees-billing-taxes",
      number: 6,
      heading: "Fees, billing, taxes and failed payments",
      paragraphs: [
        "Subscription fees are payable monthly in advance, at the price stated at checkout for the selected service. Published prices are stated excluding applicable taxes.",
        "The applicable VAT or other tax treatment is determined according to the Client's country of establishment and tax status, in accordance with applicable law. For business customers established outside France, the reverse-charge mechanism or the applicable cross-border rules may apply; the Client is responsible for providing accurate business and tax identification information (including a valid VAT number where applicable) and for self-assessing any tax due under a reverse-charge mechanism.",
        "If a recurring payment fails, the Provider (directly or through its payment processor) may retry payment and notify the Client. If payment remains outstanding, the Provider may suspend the services and/or terminate the subscription in accordance with Section 13.",
        "Late payments by professional clients automatically incur, without prior notice, late-payment interest at the rate applied by the European Central Bank to its most recent refinancing operation plus 10 percentage points, and a fixed recovery-cost indemnity of €40 per unpaid invoice (Articles L. 441-10 and D. 441-5 of the French Commercial Code), plus additional recovery costs on justification. [Wording to be validated by the accountant/lawyer.]",
      ],
    },
    {
      id: "cancellation",
      number: 7,
      heading: "Cancellation and its effects",
      paragraphs: [
        "The Client may cancel a CTO Advisor or CTO Advisor+ subscription at any time, without penalty and without stating a reason. There is no minimum commitment period.",
      ],
      bullets: [
        "Cancellation takes effect at the end of the current paid Billing Period; the service remains available until that date and no further Billing Period is charged.",
        "Amounts paid for the current Billing Period are not refunded, in whole or in part, and no prorated credit is issued.",
        "Advisory Capacity unused at the effective date of cancellation is forfeited and is not compensated.",
        "Fractional CTO engagements are cancelled and renewed per the terms of the scoped engagement agreement.",
      ],
    },
    {
      id: "client-responsibilities",
      number: 8,
      heading: "Client responsibilities and decision-making",
      paragraphs: [
        "The Provider supplies independent professional advice. All decisions — including whether and how to implement any advice or recommendation — remain the Client's sole responsibility, and the Client remains solely responsible for its business, systems, personnel, compliance and results.",
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
        "Confidentiality obligations do not apply to information that is or becomes public without breach, was lawfully known before disclosure, is lawfully received from a third party, is independently developed, or must be disclosed by law or by a competent authority — in which case the disclosing party shall, where lawful, notify the other party promptly.",
        "These obligations survive for five (5) years after the end of the engagement.",
      ],
    },
    {
      id: "intellectual-property",
      number: 10,
      heading: "Intellectual property",
      paragraphs: [
        "Each party retains all intellectual property rights it held before the engagement. The Provider retains all rights in its pre-existing and independently developed methodologies, frameworks, know-how, tools and generic materials, including improvements to them made during the engagement.",
        "Upon full payment of the fees due, the Client receives a non-exclusive, worldwide, perpetual right to use, within its organisation and for its internal business purposes, the deliverables specifically prepared for the Client under the engagement (such as written recommendations, review reports and roadmaps).",
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
        "The Provider's obligations are obligations of means. To the maximum extent permitted by law, the Provider's total aggregate liability arising out of or in connection with the services, whatever the legal basis, is limited to the total fees actually paid by the Client for the services during the twelve (12) months preceding the event giving rise to liability.",
        "To the maximum extent permitted by law, neither party is liable for indirect or consequential loss, loss of profit, loss of revenue, loss of data, loss of opportunity, or reputational harm.",
        "Nothing in these Terms excludes or limits liability for gross negligence (faute lourde), wilful misconduct (dol), or any liability that cannot be excluded or limited under applicable law.",
        "Any claim must be notified to the Provider in writing within twelve (12) months of the event giving rise to it.",
      ],
    },
    {
      id: "suspension-termination",
      number: 13,
      heading: "Suspension, termination and material breach",
      paragraphs: [
        "The Provider may suspend the services upon notice if undisputed amounts remain unpaid after a reminder, or if the Client's use of the services is unlawful or abusive. Suspension does not relieve the Client of its payment obligations for the current Billing Period.",
        "Either party may terminate the agreement with immediate effect if the other party materially breaches these Terms and fails to cure the breach within fifteen (15) days of written notice, or immediately in case of a breach incapable of cure.",
        "Termination for the Client's material breach does not entitle the Client to any refund for the current Billing Period. Sections that by their nature survive termination (including confidentiality, intellectual property, liability and governing law) remain in force.",
      ],
    },
    {
      id: "law-disputes",
      number: 14,
      heading: "Governing law, disputes and general provisions",
      paragraphs: [
        "These Terms and the agreement they govern are governed by French law, excluding its conflict-of-law rules. The United Nations Convention on Contracts for the International Sale of Goods does not apply.",
        "The parties shall first attempt to resolve any dispute amicably within thirty (30) days of written notice. Failing amicable resolution, the competent courts of Meaux, France — the place of the Provider's registered office — have exclusive jurisdiction, including for interim and emergency proceedings, notwithstanding multiple defendants or third-party claims.",
        "If any provision of these Terms is held invalid, the remainder stays in force, and the invalid provision is replaced by a valid provision closest to its intent. The Provider's failure to enforce a provision is not a waiver. The Client may not assign the agreement without the Provider's prior written consent. These Terms, the applicable Service Description and the checkout record constitute the entire agreement for the subscribed service.",
        "The Provider may publish new versions of these Terms. A new version applies to a running subscription only from the next Billing Period, and the Client is informed before it applies; the version accepted at purchase remains accessible at its dated address.",
      ],
    },
  ],
};
