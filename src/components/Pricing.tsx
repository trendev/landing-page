import { ArrowRight, CalendarCheck, Check } from "lucide-react";

import { Link } from "@/app/router";
import {
  PREREQUISITE_NOTE,
  STRIPE_PAYMENT_LINKS,
  pricingTiers,
} from "@/data/pricing";
import type { PricingTier } from "@/types";

interface PricingProps {
  onOpenConsultation: () => void;
}

/**
 * Purchase CTA per the frozen CTA model (issue #13): contact tiers and
 * checkout tiers without a configured Stripe link open the consultation
 * modal (the consultation is the mandatory first step of the purchase
 * flow); once issue #16 fills STRIPE_PAYMENT_LINKS, checkout CTAs become
 * direct links to Stripe-hosted checkout.
 */
export function TierCta({
  tier,
  onOpenConsultation,
}: {
  tier: PricingTier;
  onOpenConsultation: () => void;
}) {
  const stripeUrl =
    tier.cta.kind === "checkout" && tier.id !== "fractional-cto"
      ? STRIPE_PAYMENT_LINKS[tier.id]
      : "";
  const className = `w-full px-5 py-2.5 sm:py-3 rounded-lg transition-opacity inline-flex items-center justify-center gap-2 text-sm sm:text-base ${
    tier.recommended
      ? "bg-accent text-accent-foreground hover:opacity-90"
      : "glass hover:bg-white/10 transition-colors"
  }`;

  if (stripeUrl) {
    return (
      <a
        href={stripeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {tier.cta.label}
        <ArrowRight className="w-4 h-4" />
      </a>
    );
  }
  return (
    <button onClick={onOpenConsultation} className={className}>
      {tier.cta.label}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

/**
 * Compact call-to-action for the two Advisor subscriptions. The landing page
 * deliberately stays Fractional-CTO-oriented — this section introduces the
 * subscriptions without taking the page over; the full 3-tier detail and the
 * comparison table live on the /services/* pages.
 */
export function Pricing({ onOpenConsultation }: PricingProps) {
  const advisorTiers = pricingTiers.filter(
    (tier) => tier.cta.kind === "checkout",
  );
  const fractional = pricingTiers.find((tier) => tier.id === "fractional-cto");

  return (
    <section id="plans" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            Ongoing CTO advisory, as a subscription
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            When you need recurring senior judgment rather than embedded
            leadership, two subscription offers put a CTO's counsel behind
            your decisions on a simple monthly basis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-3xl mx-auto">
          {advisorTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative p-6 sm:p-8 glass rounded-2xl flex flex-col ${
                tier.recommended ? "border-accent/40" : ""
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs whitespace-nowrap">
                  Recommended
                </span>
              )}
              <h3 className="mb-1">{tier.name}</h3>
              <div className="mb-1">
                <span className="text-2xl sm:text-3xl text-foreground">
                  {tier.price}
                </span>
                <span className="text-muted-foreground">
                  {tier.priceSuffix}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {tier.taxNote}
              </p>
              <ul className="space-y-2 mb-5">
                {(tier.highlights ?? tier.features.slice(0, 3)).map(
                  (highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ),
                )}
              </ul>
              <p className="text-xs text-muted-foreground mb-5">
                Billed monthly in advance · cancel anytime, effective at the
                end of the paid period · no refunds, no rollover
              </p>
              <div className="mt-auto">
                <TierCta tier={tier} onOpenConsultation={onOpenConsultation} />
                <div className="text-center mt-3">
                  <Link
                    href={tier.servicePath}
                    className="text-sm text-accent hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                  >
                    View full service description
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
          <div className="glass rounded-xl px-5 py-4 flex items-start sm:items-center gap-3">
            <CalendarCheck className="w-5 h-5 text-accent shrink-0" />
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="text-foreground">{PREREQUISITE_NOTE}</span>{" "}
              <button
                onClick={onOpenConsultation}
                className="text-accent hover:opacity-80 transition-opacity underline underline-offset-4 text-sm sm:text-base font-normal"
              >
                Schedule it now
              </button>
            </p>
          </div>
          {fractional && (
            <p className="text-center text-sm sm:text-base text-muted-foreground mt-6">
              Need embedded leadership instead? {fractional.name} —{" "}
              {fractional.price.toLowerCase()}
              {fractional.priceSuffix}, {fractional.taxNote}, tailored to your
              context.{" "}
              <Link
                href={fractional.servicePath}
                className="text-accent hover:opacity-80 transition-opacity"
              >
                Discuss your context →
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
