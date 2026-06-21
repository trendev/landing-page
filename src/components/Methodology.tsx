import { Check } from "lucide-react";

import { methodologySteps, outcomes } from "@/data/content";

export function Methodology() {
  return (
    <section id="how-we-work" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            How engagements work
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A repeatable system, not just expert time. Every engagement moves
            through the same four steps — the way experienced technology leaders
            actually operate.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {methodologySteps.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.step} className="p-6 glass rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                  </div>
                  <span className="text-2xl sm:text-3xl text-accent/40 tabular-nums">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {step.summary}
                </p>
                <ul className="space-y-2">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className="glass rounded-2xl p-6 sm:p-8 mt-8 sm:mt-10">
          <h3 className="mb-4 text-center sm:text-left">
            What that delivers
          </h3>
          <ul className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
            {outcomes.map((outcome) => (
              <li
                key={outcome}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
