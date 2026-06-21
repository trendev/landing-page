import { ArrowRight, Check } from "lucide-react";

import { offers } from "@/data/content";

interface OffersProps {
  onOpenConsultation: () => void;
}

export function Offers({ onOpenConsultation }: OffersProps) {
  return (
    <section id="offers" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            Where to start
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Named, fixed-scope entry points with clear deliverables, so you
            know exactly what a first engagement looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div key={offer.name} className="p-6 sm:p-8 glass rounded-2xl">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                  </div>
                  <span className="px-3 py-1 rounded-full border border-accent/30 text-accent text-xs sm:text-sm shrink-0">
                    {offer.duration}
                  </span>
                </div>
                <h3 className="mb-2">{offer.name}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {offer.summary}
                </p>
                <ul className="space-y-2">
                  {offer.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-10">
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
