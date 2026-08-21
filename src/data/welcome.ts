import { CalendarCheck, ClipboardList, Mail } from "lucide-react";

import { CALENDLY_URL, CONTACT_ADDRESS } from "@/data/content";
import type { ContentSection, WelcomeStep } from "@/types";

/**
 * Post-purchase onboarding copy for /welcome (issue #18).
 *
 * Stripe redirects here after a successful CTO Advisor or CTO Advisor+
 * checkout. The page is deliberately static and unauthenticated: it shows no
 * Stripe data, holds no customer state and sends no email. Billing
 * communication stays with Stripe, which already owns receipts, invoices and
 * failed-payment notices.
 *
 * The onboarding mechanism is a mailto with a pre-filled checklist rather than
 * a form tool, chosen by the owner on 2026-08-21: it adds no third-party
 * processor to disclose in /privacy, needs no backend, and reads as a human
 * advisory handoff rather than a product signup.
 *
 * There is deliberately no "Manage billing" link. The Stripe Customer Portal
 * is issue #17, which is not configured; a generic portal URL that does not
 * resolve to the customer's own subscription would be worse than no link.
 */

export const WELCOME_TITLE = "Welcome to TRENDev.";

export const WELCOME_SUBTITLE =
  "Your CTO advisory engagement starts here.";

export const WELCOME_BILLING_NOTE =
  "Your receipt, invoices and any payment notifications are sent by Stripe to the email address you used at checkout. TRENDev does not send billing email.";

const CONTEXT_EMAIL_SUBJECT = "CTO advisory onboarding: my context";

const CONTEXT_EMAIL_BODY = [
  "Hello Julien,",
  "",
  "Here is the context for our first working session.",
  "",
  "Company and product:",
  "",
  "Stage and objectives:",
  "",
  "Team structure:",
  "",
  "Architecture and stack:",
  "",
  "Current roadmap:",
  "",
  "Main technical or business concerns:",
  "",
  "Known technical debt, security or delivery issues:",
  "",
  "Upcoming funding, board, due-diligence or launch deadlines:",
  "",
].join("\n");

/**
 * Pre-filled so the client can reply into a structure instead of facing a
 * blank message. Both parts are encoded: the body contains newlines, and the
 * subject contains a colon.
 */
export const CONTEXT_EMAIL_HREF =
  `mailto:${CONTACT_ADDRESS}` +
  `?subject=${encodeURIComponent(CONTEXT_EMAIL_SUBJECT)}` +
  `&body=${encodeURIComponent(CONTEXT_EMAIL_BODY)}`;

export const welcomeSteps: WelcomeStep[] = [
  {
    id: "share-context",
    icon: Mail,
    step: "01",
    heading: "Share your context",
    paragraphs: [
      "The first session is far more productive when the groundwork is already done. Send whatever you have; none of it is mandatory, and partial answers are more useful than none.",
    ],
    bullets: [
      "Company, product and business stage",
      "Objectives for the next two or three quarters",
      "Team structure and how engineering is organised",
      "Current architecture and stack",
      "Current roadmap",
      "The technical or business concerns that matter most right now",
      "Known technical debt, security or delivery issues",
      "Upcoming funding, board, due-diligence or launch deadlines",
    ],
    note: "Please do not send credentials, access tokens, secrets or production personal data by email. If something sensitive is central to the discussion, we will agree a secure channel first.",
    cta: { label: "Email your context", href: CONTEXT_EMAIL_HREF },
  },
  {
    id: "schedule-session",
    icon: CalendarCheck,
    step: "02",
    heading: "Schedule your first working session",
    paragraphs: [
      "Pick a slot that suits you. We will use it to agree priorities and to decide what the first month should actually move.",
    ],
    cta: {
      label: "Book your first session",
      href: CALENDLY_URL,
      primary: true,
    },
  },
  {
    id: "prepare-materials",
    icon: ClipboardList,
    step: "03",
    heading: "Prepare useful materials",
    paragraphs: [
      "Useful, not required. Bring what exists; do not create documents for the sake of the session.",
    ],
    bullets: [
      "Architecture diagrams, however rough",
      "Roadmap or delivery plan",
      "Org or team chart",
      "Key technical decisions already taken, and why",
      "Current incidents, risks or recurring pain",
      "A cloud cost snapshot",
      "Security or compliance constraints you operate under",
      "Investor or board materials, where relevant",
    ],
  },
];

export const welcomeClosing: ContentSection = {
  id: "what-happens-next",
  heading: "What happens next",
  paragraphs: [
    "Your advisory capacity is available from today, for the billing period you have just paid. Capacity covers meetings, preparation, substantive written advice, and architecture or document review. Short administrative exchanges do not consume it.",
    "You are working directly with Julien Sié. There is no ticket queue and no account manager in between.",
    `Anything unclear, before or after the first session: ${CONTACT_ADDRESS}.`,
  ],
};
