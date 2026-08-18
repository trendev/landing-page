import { ArrowRight } from "lucide-react";

import { STRIPE_PAYMENT_LINKS } from "@/data/pricing";
import type { PricingTier } from "@/types";

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
