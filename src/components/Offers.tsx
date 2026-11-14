import { ArrowRight, CalendarCheck, Check, Info } from "lucide-react";

import { Link } from "@/app/router";
import { ProductIcon } from "@/components/ProductIcon";
import { TierCta } from "@/components/TierCta";
import { engagementModes } from "@/data/content";
import { positioning } from "@/data/positioning";
import {
  ADVISORY_PATH,
  DECISION_REVIEW_BOUNDARY_NOTE,
  DECISION_REVIEW_CALL_LABEL,
  DECISION_REVIEW_LINK_LABEL,
  DECISION_REVIEW_PREREQUISITE_NOTE,
  DECISION_REVIEW_SUMMARY,
  pricingTiers,
} from "@/data/pricing";
import type { EngagementMode } from "@/types";

interface OffersProps {
  onOpenConsultation: () => void;
}

const decisionReview = pricingTiers.find(
  (tier) => tier.id === "cto-decision-review",
)!;

/**
 * The bounded entry offer (issue #59), built from its pricing tier so the
 * homepage, /advisory and the service page cannot disagree on price or scope.
 * It is the one price the landing page shows: a single one-off review, not a
 * subscription section. The plans stay on /advisory. It can be bought here
 * directly (owner decision, 2026-11-10); the free call stays beside the
 * purchase button as the recommended first step.
 */
function DecisionReviewCard({ onOpenConsultation }: OffersProps) {
  return (
    <article className="relative glass rounded-2xl border-highlight/40 p-6 sm:p-8 mb-10 sm:mb-14">
      {decisionReview.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-highlight text-highlight-foreground text-xs sm:text-sm whitespace-nowrap">
          {decisionReview.badge}
        </span>
      )}
      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <ProductIcon
              tierId={decisionReview.id}
              size={56}
              className="w-12 h-12 sm:w-14 sm:h-14"
            />
            <h3 className="text-2xl sm:text-3xl">{decisionReview.name}</h3>
          </div>
          <p className="text-lg sm:text-xl text-foreground mb-3">
            {decisionReview.tagline}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-5">
            {DECISION_REVIEW_SUMMARY}
          </p>
          <div>
            <span className="text-3xl sm:text-4xl text-foreground">
              {decisionReview.price}
            </span>
            <span className="text-muted-foreground">
              {decisionReview.priceSuffix}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {decisionReview.taxNote}
          </p>
        </div>

        <div className="flex flex-col">
          <ul className="space-y-3 mb-6">
            {decisionReview.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground"
              >
                <Check className="w-4 h-4 mt-1 text-accent shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-auto">
            <TierCta tier={decisionReview} onOpenConsultation={onOpenConsultation} />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenConsultation}
                className="flex-1 px-5 py-2.5 sm:py-3 glass rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <CalendarCheck className="w-4 h-4 text-accent" />
                {DECISION_REVIEW_CALL_LABEL}
              </button>
              <Link
                href={decisionReview.servicePath}
                className="flex-1 px-5 py-2.5 sm:py-3 glass rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {DECISION_REVIEW_LINK_LABEL}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Must stay adjacent to the CTAs above (issue #59). */}
      <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
        <p className="flex items-start gap-3 text-sm text-foreground">
          <CalendarCheck className="w-4 h-4 mt-0.5 text-accent shrink-0" />
          <span>{DECISION_REVIEW_PREREQUISITE_NOTE}</span>
        </p>
        <p className="flex items-start gap-3 text-sm text-muted-foreground">
          <Info className="w-4 h-4 mt-0.5 text-accent shrink-0" />
          <span>{DECISION_REVIEW_BOUNDARY_NOTE}</span>
        </p>
      </div>
    </article>
  );
}

function ModeLink({ mode }: { mode: EngagementMode }) {
  // Inline text flow, with the last word and the arrow held together, so the
  // arrow sits right after the label when it wraps.
  const split = mode.cta.lastIndexOf(" ") + 1;
  return (
    <Link
      href={mode.href}
      className="text-sm text-accent hover:opacity-80 transition-opacity"
    >
      {mode.cta.slice(0, split)}
      <span className="whitespace-nowrap">
        {mode.cta.slice(split)}
        <ArrowRight
          aria-hidden="true"
          className="inline-block w-3.5 h-3.5 ml-1 align-[-0.125em]"
        />
      </span>
    </Link>
  );
}

/**
 * One of the three offers beside the featured review. No price: the landing
 * page links out to /advisory and /services/*, it never hosts the plans.
 */
function OfferCard({ mode }: { mode: EngagementMode }) {
  return (
    <article className="glass rounded-2xl p-6 flex flex-col">
      <p className="text-xs text-muted-foreground mb-3">{mode.need}</p>
      <h3 className="flex items-center gap-3 mb-3">
        <ProductIcon tierId={mode.tierId} size={48} />
        <span>{mode.engagement}</span>
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{mode.responsibility}</p>
      <ul className="flex flex-wrap gap-2 mb-4">
        {mode.deliverables.map((item) => (
          <li
            key={item}
            className="px-2.5 py-1 rounded-full border border-accent/30 text-accent text-xs"
          >
            {item}
          </li>
        ))}
      </ul>
      {mode.missions && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">
            {positioning.offers.missionsTitle}
          </p>
          <ul className="space-y-1.5">
            {mode.missions.map((mission) => (
              <li
                key={mission}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>{mission}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-auto">
        <ModeLink mode={mode} />
      </div>
    </article>
  );
}

export function Offers({ onOpenConsultation }: OffersProps) {
  return (
    <section id="offers" className="py-12 sm:py-16 px-4 sm:px-6">
      {/* `#engagements` was the old offers table's anchor; kept so published
          links still land on the same section, heading included. */}
      <div id="engagements" className="max-w-6xl mx-auto scroll-mt-28">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            {positioning.offers.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {positioning.offers.description}
          </p>
        </div>

        <DecisionReviewCard onOpenConsultation={onOpenConsultation} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagementModes.map((mode) => (
            <OfferCard key={mode.engagement} mode={mode} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 sm:mt-10">
          <Link
            href={ADVISORY_PATH}
            className="px-5 sm:px-6 py-2.5 sm:py-3 glass rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {positioning.offers.compareLink}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={onOpenConsultation}
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            Not sure which fits? Book a free consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
