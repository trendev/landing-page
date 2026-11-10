import { ArrowRight } from "lucide-react";

import { STRIPE_PAYMENT_LINKS, type CheckoutTierId } from "@/data/stripe";
import type { PricingTier, TierId } from "@/types";

function isCheckoutTier(id: TierId): id is CheckoutTierId {
  return id in STRIPE_PAYMENT_LINKS;
}

/**
 * Purchase CTA per the frozen CTA model (issue #13): contact tiers and
 * checkout tiers without a configured Stripe link open the introductory call
 * booking (the call is the mandatory first step of the purchase flow); once
 * issue #16 filled STRIPE_PAYMENT_LINKS, checkout CTAs became direct links to
 * Stripe-hosted checkout.
 *
 * `primary` gives a non-recommended tier the accent style, for a card where
 * this is the main action (the CTO Decision Review card on the landing page).
 */
export function TierCta({
  tier,
  onOpenConsultation,
  primary = tier.recommended,
}: {
  tier: PricingTier;
  onOpenConsultation: () => void;
  primary?: boolean;
}) {
  const stripeUrl = isCheckoutTier(tier.id) && tier.cta.kind === "checkout"
    ? STRIPE_PAYMENT_LINKS[tier.id]
    : "";
  const className = `w-full px-5 py-2.5 sm:py-3 rounded-lg transition-opacity inline-flex items-center justify-center gap-2 text-sm sm:text-base ${
    primary
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
