import { ArrowRight, CalendarCheck, Check } from "lucide-react";

import { Link } from "@/app/router";
import { BackLink } from "@/components/BackLink";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TierCta } from "@/components/TierCta";
import { PREREQUISITE_NOTE, pricingTiers } from "@/data/pricing";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

interface AdvisoryPageProps {
  onOpenConsultation: () => void;
}

/**
 * The subscription funnel, deliberately its own page rather than a landing
 * section. Two different intents need two different entry points: the primary
 * CTA books a consultation, this page is where a visitor who already knows
 * what they want goes to compare and subscribe. It also gives the offers a
 * shareable, indexable URL to send to a prospect.
 */
export function AdvisoryPage({ onOpenConsultation }: AdvisoryPageProps) {
  useDocumentMeta({
    title: "CTO Advisory Plans | TRENDev",
    description:
      "Three ways to work with a senior CTO: CTO Advisor (€1,500/month), CTO Advisor+ (€2,500/month) and Fractional CTO (from €6,000/month), all excluding applicable taxes. Cancel anytime on the Advisor subscriptions.",
    canonicalPath: "/advisory",
  });

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <BackLink className="mb-6" />
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 tracking-tight">
            Ongoing CTO advisory, as a subscription
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Recurring senior judgment behind your technology decisions, on a
            simple monthly basis. Pick the depth you need, or take the embedded
            route with a tailored Fractional CTO engagement.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingTiers.map((tier) => (
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
              <h2 className="text-xl sm:text-2xl mb-1">{tier.name}</h2>
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
              <p className="text-sm text-muted-foreground mb-5">
                {tier.tagline}
              </p>
              <ul className="space-y-2 mb-5">
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
              <ul className="space-y-1 mb-5">
                {tier.billingNotes.map((note) => (
                  <li key={note} className="text-xs text-muted-foreground">
                    {note}
                  </li>
                ))}
              </ul>
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

        {/* Must stay adjacent to the Advisor purchase CTAs (epic #12). */}
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
        </div>

        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl text-center mb-6">
            Compare the three engagements
          </h2>
          <ComparisonTable />
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <BackLink />
        </div>
      </div>
    </section>
  );
}
