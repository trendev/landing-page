import { CalendarCheck, ClipboardList, Mail } from "lucide-react";

import { CALENDLY_URL, CONTACT_ADDRESS } from "@/data/content";
import { STRIPE_PORTAL_LOGIN_URL } from "@/data/stripe";
import type {
  ContentSection,
  WelcomeContextField,
  WelcomeStep,
} from "@/types";

/**
 * Post-purchase onboarding copy for /welcome (issue #18).
 *
 * Stripe redirects here after a successful CTO Advisor or CTO Advisor+
 * checkout. The page is deliberately static and unauthenticated: it shows no
 * Stripe data, holds no customer state and sends no email. Billing
 * communication stays with Stripe, which already owns receipts, invoices and
 * failed-payment notices.
 *
 * The onboarding mechanism is a guided form that composes a mailto. The form
 * replaced a blank pre-filled checklist, but the delivery mechanism is
 * deliberately unchanged: answers are composed in the browser and handed to
 * the client's own mail client. Nothing is posted anywhere and nothing is
 * stored, so the 2026-08-21 decision against a form tool still holds — no
 * third-party processor to disclose in /privacy, no backend, and it still
 * reads as a human advisory handoff rather than a product signup.
 *
 * If a future change ever posts these answers somewhere, /privacy's
 * "Data we process", legal bases and recipients sections must change in the
 * same commit.
 *
 * "Manage billing" (issue #17) links the Stripe Customer Portal login page,
 * where the buyer authenticates with their checkout email and manages their
 * own subscription — so a public static URL is safe here. The block renders
 * only once STRIPE_PORTAL_LOGIN_URL is filled for the current mode: a generic
 * URL that did not resolve to the customer's own subscription would be worse
 * than no link, and so would a dead one.
 */

export const WELCOME_TITLE = "Welcome to TRENDev.";

export const WELCOME_SUBTITLE =
  "Your CTO advisory engagement starts here.";

/**
 * This page is `noindex` and reachable only through Stripe's post-checkout
 * redirect, so a buyer who closes the tab has no way back to it from search.
 * The /faq entry "I closed the welcome page. How do I get back to it?"
 * (/faq#find-my-welcome-page) is the permanent route back in; this line is what
 * stops most people needing it.
 */
export const WELCOME_SAVE_NOTE =
  "Worth bookmarking this page: it is not listed in search results. If you lose it, it is linked from the FAQ under Getting started.";

export const WELCOME_BILLING_NOTE =
  "Your receipt, invoices and any payment notifications are sent by Stripe to the email address you used at checkout. TRENDev does not send billing email.";

export const CONTEXT_EMAIL_SUBJECT = "CTO advisory onboarding: my context";

/** Opening lines, above the per-topic headings, in every composed message. */
const CONTEXT_EMAIL_GREETING = [
  "Hello Julien,",
  "",
  "Here is the context for our first working session.",
  "",
];

/**
 * The eight onboarding topics — the single source of truth for both the form
 * on /welcome and the headings in the composed email.
 *
 * These used to be two hand-maintained parallel lists (display bullets and
 * email headings) that nothing kept aligned; adding a topic to one silently
 * left the other behind. Derive, never duplicate.
 */
export const contextFields: WelcomeContextField[] = [
  {
    id: "company",
    label: "Company, product and business stage",
    emailHeading: "Company and product:",
    hint: "What you build, who buys it, and how far along the business is.",
    placeholder:
      "B2B SaaS for freight forwarders. 45 paying customers, \u20AC1.4M ARR, Series A closed last year.",
  },
  {
    id: "objectives",
    label: "Objectives for the next two or three quarters",
    emailHeading: "Stage and objectives:",
    hint: "The outcomes the business is committed to, not the features.",
    placeholder:
      "Double self-serve signups, ship SSO to unblock enterprise deals, cut cloud spend by a third.",
  },
  {
    id: "team",
    label: "Team structure and how engineering is organised",
    emailHeading: "Team structure:",
    hint: "Size, seniority, in-house versus outsourced, who decides what.",
    placeholder:
      "Six engineers plus two mobile contractors. One senior, no tech lead. I make the calls today.",
  },
  {
    id: "architecture",
    label: "Current architecture and stack",
    emailHeading: "Architecture and stack:",
    hint: "The shape of the system and what it runs on.",
    placeholder:
      "Rails monolith and a Node service, Postgres, Redis, on Heroku. No infrastructure as code yet.",
  },
  {
    id: "roadmap",
    label: "Current roadmap",
    emailHeading: "Current roadmap:",
    hint: "What is planned, and how firm the plan actually is.",
    placeholder:
      "Mobile app in Q1, billing rework in Q2. The Q2 half is still a wish list.",
  },
  {
    id: "concerns",
    label: "The technical or business concerns that matter most right now",
    emailHeading: "Main technical or business concerns:",
    hint: "What keeps coming back, or what you would fix first given the choice.",
    placeholder:
      "Deploys take a day and break often. I cannot tell whether the team is slow or the codebase is.",
  },
  {
    id: "debt",
    label: "Known technical debt, security or delivery issues",
    emailHeading: "Known technical debt, security or delivery issues:",
    hint: "What you already know is wrong, even if nothing has been done about it.",
    // Describes a knowledge/coverage problem without inviting the client to
    // paste anything the step's own note tells them not to send.
    placeholder:
      "No tests on the billing path. One engineer holds all the deployment knowledge.",
  },
  {
    id: "deadlines",
    label: "Upcoming funding, board, due-diligence or launch deadlines",
    emailHeading: "Upcoming funding, board, due-diligence or launch deadlines:",
    hint: "Anything with a fixed date the technical work has to survive.",
    placeholder:
      "Series B due diligence in November. A customer security questionnaire is due before that.",
  },
];

/**
 * Composes the onboarding message as a mailto: href.
 *
 * With no answers this emits every heading blank, which is byte-for-byte the
 * template the page has always offered — so the "send the blank template"
 * path and the filled-in form cannot drift apart. With answers it emits only
 * the topics the client actually filled in: empty headings are noise, and the
 * page copy is explicit that partial answers are fine.
 *
 * Nothing here leaves the browser. The message is handed to the client's own
 * mail client, which is why /welcome still adds no processor to disclose.
 */
export function buildContextMessage(
  answers: Record<string, string> = {},
  name = "",
): string {
  const answered = contextFields.filter((field) => answers[field.id]?.trim());

  return [
    ...CONTEXT_EMAIL_GREETING,
    ...(answered.length > 0
      ? answered.flatMap((field) => [
          field.emailHeading,
          answers[field.id].trim(),
          "",
        ])
      : contextFields.flatMap((field) => [field.emailHeading, ""])),
    ...(name.trim() ? [name.trim(), ""] : []),
  ].join("\n");
}

/** The same message as a mailto: href, for handing to the mail client. */
export function buildContextMailto(
  answers: Record<string, string> = {},
  name = "",
): string {
  return (
    `mailto:${CONTACT_ADDRESS}` +
    `?subject=${encodeURIComponent(CONTEXT_EMAIL_SUBJECT)}` +
    `&body=${encodeURIComponent(buildContextMessage(answers, name))}`
  );
}

/**
 * The blank template, for a client who would rather write in their own mail
 * client than fill the form. Derived from the same builder, so it stays in
 * step with the topics above.
 */
export const CONTEXT_EMAIL_HREF = buildContextMailto();

/**
 * Form chrome. Lives here rather than in the component for the same reason as
 * every other string on the site: copy belongs under src/data.
 */
export const contextForm = {
  /** Prefix applied to every field placeholder at render time. */
  examplePrefix: "e.g. ",
  nameLabel: "Your name",
  nameHint: "So the message is signed. Your address comes from your mail client.",
  submitLabel: "Open this in my email",
  submitHint:
    "Nothing is sent from this page. Your mail client opens with the message ready, and you press send.",
  emptyHint: "Fill in at least one topic to compose the message.",
  blankTemplateLabel: "Or send the blank template and write it yourself",
  /**
   * mailto: hrefs are handed to the OS, which caps them well below what a
   * browser will hold in an address bar; past roughly 2 000 characters some
   * mail clients silently truncate the body. A truncated onboarding email is
   * the worst outcome here, because the client believes it went out in full.
   */
  tooLongWarning:
    "This is now longer than a mail client can reliably carry. Copy the message and paste it into a new email instead.",
  copyLabel: "Copy the message",
  copiedLabel: "Copied",
  copyFailedLabel: "Copy failed — select the text and copy it manually",
} as const;

/** Past this many characters the mailto: handoff stops being dependable. */
export const CONTEXT_MAILTO_LIMIT = 1900;

export const welcomeSteps: WelcomeStep[] = [
  {
    id: "share-context",
    icon: Mail,
    step: "01",
    heading: "Share your context",
    paragraphs: [
      "The first session is far more productive when the groundwork is already done. Fill in whatever you can; none of it is mandatory, and partial answers are more useful than none.",
    ],
    // Bullets and a standalone mailto CTA used to live here. Both are now the
    // form: its labels are the topics, its submit button the mailto.
    contextForm: true,
    note: "Please do not send credentials, access tokens, secrets or production personal data by email. If something sensitive is central to the discussion, we will agree a secure channel first.",
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

/**
 * Rendered after the closing section, only when the portal login URL for the
 * current Stripe mode exists (see the comment in @/data/stripe). Cancellation
 * wording must keep matching the Terms and the pricing pages: at period end,
 * no refund, no prorated credit.
 */
export const manageBilling = STRIPE_PORTAL_LOGIN_URL
  ? {
      heading: "Manage your billing",
      paragraphs: [
        "Invoices, receipts, payment method and cancellation are handled in the Stripe customer portal. Sign in with the email address you used at checkout; Stripe sends you a one-time code.",
        "You can cancel anytime. Cancellation takes effect at the end of your current paid billing period, which stays active until then.",
      ],
      cta: { label: "Open the billing portal", href: STRIPE_PORTAL_LOGIN_URL },
    }
  : null;

export const welcomeClosing: ContentSection = {
  id: "what-happens-next",
  heading: "What happens next",
  paragraphs: [
    "Your advisory capacity is available from today, for the billing period you have just paid. Capacity covers meetings, preparation, substantive written advice, and architecture or document review. Short administrative exchanges do not consume it.",
    "You are working directly with Julien Sié. There is no ticket queue and no account manager in between.",
    `Anything unclear, before or after the first session: ${CONTACT_ADDRESS}.`,
  ],
};
