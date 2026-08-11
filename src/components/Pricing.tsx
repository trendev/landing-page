import { ArrowRight, CalendarCheck, Check } from "lucide-react";

import { ComparisonTable } from "@/components/ComparisonTable";
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

export function Pricing({ onOpenConsultation }: PricingProps) {
  return (
    <section id="plans" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            Senior CTO leadership, on your terms
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Three ways to put executive technology judgment behind your
            decisions: recurring advisory for founders and executives, or
            embedded fractional leadership for organisations in transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            return (
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
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                </div>
                <h3 className="mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.tagline}
                </p>
                <div className="mb-1">
                  <span className="text-3xl sm:text-4xl text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground">
                    {tier.priceSuffix}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-5">
                  {tier.taxNote}
                </p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <ul className="space-y-1 mb-5 border-t border-border pt-4">
                    {tier.billingNotes.map((note) => (
                      <li key={note} className="text-xs text-muted-foreground">
                        {note}
                      </li>
                    ))}
                  </ul>
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
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 mb-12 sm:mb-16 max-w-3xl mx-auto">
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
        </div>

        <ComparisonTable />
      </div>
    </section>
  );
}
