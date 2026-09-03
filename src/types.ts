import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  detailedContent: {
    overview: string;
    benefits: string[];
    technologies?: string[];
  };
}

export interface WhyChooseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Project {
  name: string;
  subtitle?: string;
  url: string;
  tagline: string;
  description: string;
  tags: string[];
  hidden?: boolean;
}

export interface MethodologyStep {
  icon: LucideIcon;
  /** Display order label, e.g. "01". */
  step: string;
  title: string;
  summary: string;
  points: string[];
}

export interface ProductizedOffer {
  icon: LucideIcon;
  name: string;
  /** Short engagement length, e.g. "2-week assessment". */
  duration: string;
  summary: string;
  deliverables: string[];
}

/* ── Knowledge base (/faq) ─────────────────────────────────────────────── */

export type FaqTopicId =
  | "cto-role"
  | "working-together"
  | "technology"
  | "plans-billing"
  | "getting-started";

export interface FaqTopic {
  id: FaqTopicId;
  label: string;
}

export interface FaqEntry {
  /**
   * URL slug AND DOM id, so /faq#do-we-need-kubernetes deep-links to this
   * answer. PERMANENT: once published it is a shareable link, so it must never
   * be renamed or reused, even if the question wording changes.
   */
  id: string;
  topic: FaqTopicId;
  question: string;
  /**
   * Answer paragraphs. May contain `**bold**` and `[text](/path)` only; see
   * `@/lib/inlineMarkup` for the grammar. Deliberately not Markdown: the whole
   * site ships without a Markdown dependency.
   */
  answer: string[];
  bullets?: string[];
  /** Synonyms and acronyms absent from the visible copy, folded into search. */
  keywords?: string[];
  /** Other entry ids, rendered as /faq#id links under the answer. */
  related?: string[];
  /** Mirrored into the landing-page teaser. Keep this to 4 entries. */
  featured?: boolean;
}

/* ── Premium CTO offers (epic #12) ─────────────────────────────────────── */

export type TierId = "cto-advisor" | "cto-advisor-plus" | "fractional-cto";

export interface PricingTier {
  id: TierId;
  icon: LucideIcon;
  name: string;
  /** Display price, e.g. "€1,500" or "From €6,000". */
  price: string;
  /** e.g. "/month". */
  priceSuffix: string;
  /** Always "excluding applicable taxes" — never present French VAT as universal. */
  taxNote: string;
  /** Outcome-first value proposition; capacity is never the headline. */
  tagline: string;
  /** Includes the capacity boundary as one bullet among the features. */
  features: string[];
  /**
   * Short bullet list for the compact landing CTA card (the landing page
   * stays Fractional-CTO-oriented; full detail lives on the service pages).
   */
  highlights?: string[];
  /** Billing/cancellation small print shown on the card. */
  billingNotes: string[];
  recommended?: boolean;
  cta: {
    label: string;
    /** "checkout" → Stripe link (consultation fallback while unset); "contact" → consultation. */
    kind: "checkout" | "contact";
  };
  /** Route of the full service description, e.g. "/services/cto-advisor". */
  servicePath: string;
}

export interface ComparisonRow {
  label: string;
  /** One value per tier (Advisor, Advisor+, Fractional). Booleans render as ✓/—. */
  values: [string | boolean, string | boolean, string | boolean];
}

/* ── Long-form page content (service descriptions, legal pages) ────────── */

export interface ContentSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface ServiceDescription {
  slug: string;
  tierId: TierId;
  title: string;
  /** e.g. "1.0" — referenced as acceptance evidence at purchase (issue #16). */
  version: string;
  /** ISO date the version takes (or took) effect. */
  effectiveDate: string;
  /**
   * ISO date this version's text last changed. It stops moving at approval:
   * an effective version is frozen, so this stays the date the approved
   * wording was settled, and /services/<slug> keeps showing it for as long
   * as the version stands.
   */
  lastUpdated: string;
  metaDescription: string;
  sections: ContentSection[];
}

/* ── Post-purchase onboarding (/welcome, issue #18) ────────────────────── */

export interface WelcomeStep {
  id: string;
  icon: LucideIcon;
  /** Step ordinal shown beside the heading, e.g. "01". */
  step: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Cautionary line rendered under the bullets, e.g. do not send secrets. */
  note?: string;
  /**
   * Renders the guided context form in place of bullets and a CTA. The form
   * derives its fields from `contextFields`, so the step carries no copy of
   * its own; see @/data/welcome.
   */
  contextForm?: boolean;
  cta?: {
    label: string;
    href: string;
    /** Accent styling; at most one step should claim it. */
    primary?: boolean;
  };
}

/**
 * One topic the client is asked about before the first working session.
 *
 * Single source of truth for three surfaces that used to be maintained by
 * hand and had already drifted apart: the label shown on /welcome, and the
 * heading used in the composed onboarding email.
 */
export interface WelcomeContextField {
  id: string;
  /** Shown as the form label, e.g. "Current architecture and stack". */
  label: string;
  /** Heading in the email body, e.g. "Architecture and stack:". */
  emailHeading: string;
  /** Short prompt under the label; guidance, never a placeholder. */
  hint?: string;
}

/* ── Terms of Service versioning (issue #15) ───────────────────────────── */

export interface TermsSection {
  id: string;
  number: number;
  /**
   * Rendered in place of "{number}." when set, for sections that are numbered
   * differently from the body of the contract (e.g. "Annex A").
   */
  label?: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /**
   * Nested headed blocks, rendered below the section's own paragraphs/bullets.
   * Annexes reproduce a service description, which is itself a list of headed
   * blocks, so this reuses ContentSection rather than inventing a second shape.
   */
  subsections?: ContentSection[];
}

export interface TermsVersion {
  /** e.g. "1.0". */
  version: string;
  /** Draft versions carry a visible pending-legal-review banner. */
  status: "draft" | "effective" | "superseded";
  /** ISO date; also the dated route segment (/terms/2026-09-01). */
  effectiveDate: string;
  /**
   * ISO date this version's text last changed, frozen at approval. It can sit
   * before `effectiveDate` — v1.0 was approved 2026-08-21 for a 2026-09-01
   * start — and it never moves again once the version is in force, because the
   * text cannot. /terms renders it beside the effective date.
   */
  lastUpdated: string;
  /** Committed PDF matching this version, e.g. "/terms/trendev-terms-of-service-2026-09-01.pdf". */
  pdfPath: string;
  sections: TermsSection[];
}
