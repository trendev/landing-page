import { Check, Mail, ShieldCheck } from "lucide-react";

import {
  DELIVERY_CTA_LABEL,
  DELIVERY_ENQUIRY_EMAIL,
  adviceSafeguards,
  deliveryPrinciples,
  proofCases,
} from "@/data/content";

/**
 * The partner delivery model and the anonymised proof behind it (issue #47).
 * States the model as it is, Julien plus trusted repeat partners, with no
 * invented team size, partner names or outcome metrics.
 */
export function HowWeDeliver() {
  return (
    <section id="how-we-deliver" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            How we deliver
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Direct access to a senior CTO, with the delivery capacity of
            trusted collaborators when the mission requires it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {deliveryPrinciples.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="p-6 sm:p-8 glass rounded-2xl flex gap-4"
              >
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="mb-2">{principle.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8 glass rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-accent shrink-0" />
            <h3>When advice could lead to delivery</h3>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            A possible follow-on engagement is a commercial interest, and we
            say so. The advice has to be useful on its own, without a second
            purchase. In practice:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {adviceSafeguards.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground"
              >
                <Check className="w-4 h-4 mt-1 text-accent shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 sm:mt-16">
          <h3 className="text-2xl sm:text-3xl text-center mb-2">
            Selected engagements
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Anonymised. Clients are not named, and each case describes the work
            actually performed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {proofCases.map((proof) => (
              <div key={proof.context} className="p-6 glass rounded-2xl">
                <p className="text-xs text-accent mb-2">{proof.context}</p>
                <p className="text-sm sm:text-base text-foreground mb-4">
                  {proof.problem}
                </p>
                <ul className="space-y-2">
                  {proof.work.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <a
            href={DELIVERY_ENQUIRY_EMAIL}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-accent/50 bg-card/50 text-accent hover:bg-accent/15 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Mail className="w-4 h-4" />
            {DELIVERY_CTA_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}
