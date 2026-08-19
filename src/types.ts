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

export interface EngagementModel {
  title: string;
  description: string;
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

export interface Faq {
  question: string;
  answer: string;
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
  /** e.g. "1.0-draft" — referenced as acceptance evidence at purchase (issue #16). */
  version: string;
  /** ISO date the version takes (or took) effect. */
  effectiveDate: string;
  /** ISO date of the last edit to this version while still in draft. */
  lastUpdated: string;
  metaDescription: string;
  sections: ContentSection[];
}

/* ── Terms of Service versioning (issue #15) ───────────────────────────── */

export interface TermsSection {
  id: string;
  number: number;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface TermsVersion {
  /** e.g. "1.0". */
  version: string;
  /** Draft versions carry a visible pending-legal-review banner. */
  status: "draft" | "effective" | "superseded";
  /** ISO date; also the dated route segment (/terms/2026-09-01). */
  effectiveDate: string;
  lastUpdated: string;
  /** Committed PDF matching this version, e.g. "/terms/trendev-terms-of-service-2026-09-01.pdf". */
  pdfPath: string;
  sections: TermsSection[];
}
