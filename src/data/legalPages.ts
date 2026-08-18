import type { ContentSection } from "@/types";

/**
 * Legal notice (mentions légales) and privacy policy content (issue #15).
 *
 * Entity details were confirmed by the owner on 2026-08-18 against the public
 * registers (RCS Meaux 821 442 290) and are no longer placeholders. Both
 * documents should still be reviewed alongside the Terms by the French
 * IT/commercial lawyer before production launch.
 */

export const LEGAL_LAST_UPDATED = "2026-08-18";

export const legalNoticeSections: ContentSection[] = [
  {
    id: "editor",
    heading: "Site publisher (Éditeur)",
    bullets: [
      "Company name: TRENDev (trading as TRENDev Consulting)",
      "Legal form: Société par actions simplifiée à associé unique (SASU)",
      "Share capital: €10,000",
      "Registered office: 7 avenue Christian Doppler, 77700 Serris, France",
      "SIREN: 821 442 290 — SIRET (registered office): 821 442 290 00028",
      "Trade and Companies Register: RCS Meaux 821 442 290",
      "Intra-Community VAT number: FR75 821 442 290",
      "APE/NAF code: 6201Z — Programmation informatique",
      "Publication director (Directeur de la publication): Julien Sié, Président",
      "Contact: contact@trendev.fr",
    ],
  },
  {
    id: "hosting",
    heading: "Hosting (Hébergeur)",
    paragraphs: [
      "This site is hosted by GitHub, Inc. (GitHub Pages), 88 Colin P. Kelly Jr Street, San Francisco, CA 94107, United States — https://pages.github.com.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    paragraphs: [
      "The content of this site (texts, layout, graphics, logos) is protected by intellectual-property law. Any reproduction or representation, in whole or in part, without prior written authorisation is prohibited, except where permitted by law.",
    ],
  },
  {
    id: "professional-services",
    heading: "Professional services",
    paragraphs: [
      "The services presented on this site are offered exclusively to professional and business customers. They are governed by the Terms of Service available at trendev.fr/terms.",
    ],
  },
];

export const privacySections: ContentSection[] = [
  {
    id: "controller",
    heading: "Data controller",
    paragraphs: [
      "The data controller for this site is TRENDev, a société par actions simplifiée à associé unique (SASU) registered with the Trade and Companies Register of Meaux under number 821 442 290, whose registered office is at 7 avenue Christian Doppler, 77700 Serris, France — contact@trendev.fr.",
      "This policy describes the processing of personal data carried out through the trendev.fr website. It is directed at professional visitors and clients.",
    ],
  },
  {
    id: "data-collected",
    heading: "Data we process and why",
    bullets: [
      "Audience measurement — Google Analytics 4 (property G-G6NP1YWXS0) processes device and usage data (pages viewed, approximate location, browser and device identifiers, cookies) to measure how the site is used.",
      "Consultation booking — when you book a consultation via Calendly, Calendly collects the identification and scheduling details you submit (name, email, chosen slot, context you provide).",
      "Email contact — when you write to contact@trendev.fr, we process your name, email address and the content of your message to respond to you.",
      "Subscriptions and billing — when self-service subscriptions launch, payment, billing and tax data will be processed by Stripe as payment processor; this policy will be updated before that processing begins.",
    ],
  },
  {
    id: "legal-bases",
    heading: "Legal bases",
    bullets: [
      "Audience measurement: your consent, collected through the cookie banner before any analytics script is loaded (Article 6(1)(a) GDPR and Article 82 of the French Data Protection Act).",
      "Booking and email contact: steps taken at your request prior to entering into a contract, and legitimate interest in responding to professional enquiries.",
      "Subscriptions and billing (future): performance of the contract and compliance with legal (accounting, tax) obligations.",
    ],
  },
  {
    id: "recipients-transfers",
    heading: "Recipients and international transfers",
    paragraphs: [
      "Personal data is processed by TRENDev and by the service providers named above (Google, Calendly, GitHub as site host, and later Stripe), acting for the purposes described. Some of these providers are established in the United States; transfers rely on the EU–US Data Privacy Framework and/or Standard Contractual Clauses, as applicable to each provider.",
    ],
  },
  {
    id: "retention",
    heading: "Retention",
    paragraphs: [
      "Analytics data is retained for the duration configured in Google Analytics. Enquiry and booking data is kept for the time needed to handle the relationship and then archived or deleted. Contractual and billing records are kept for the durations required by French commercial and tax law.",
    ],
  },
  {
    id: "rights",
    heading: "Your rights",
    paragraphs: [
      "You have the right to access, rectify and erase your personal data, to object to or request restriction of its processing, and to data portability, under the conditions of the GDPR. To exercise these rights, contact contact@trendev.fr.",
      "You may lodge a complaint with the French supervisory authority, the CNIL (cnil.fr), or with the supervisory authority of your place of establishment.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and analytics choices",
    paragraphs: [
      "This site uses Google Analytics cookies for audience measurement, and asks for your consent before doing so. Until you accept, the Google Analytics script is not loaded, no request is sent to Google, and no analytics cookie is written. Refusing leaves the site fully usable.",
      "You can change or withdraw your choice at any time via the \"Cookie settings\" link in the site footer. Withdrawing deletes the Google Analytics cookies previously set on this browser. Your choice is stored locally in your browser, so it applies to that browser only.",
      "You can also block cookies through your browser settings, use Google's opt-out browser add-on (tools.google.com/dlpage/gaoptout), or enable your browser's tracking-protection features.",
    ],
  },
];
