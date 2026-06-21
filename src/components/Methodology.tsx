import { Check, ChevronDown, ChevronRight } from "lucide-react";

import { methodologySteps, outcomes } from "@/data/content";
import type { MethodologyStep } from "@/types";

/** Circular timeline marker: the step icon with a small numeric badge. */
function StepNode({ step }: { step: MethodologyStep }) {
  const Icon = step.icon;
  return (
    <div className="relative z-10 w-16 h-16 rounded-full bg-card/80 border border-accent/40 flex items-center justify-center shadow-[0_0_24px_rgba(37,216,236,0.18)] shrink-0">
      <Icon className="w-7 h-7 text-accent" />
      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center tabular-nums">
        {Number(step.step)}
      </span>
    </div>
  );
}

/** Text content shared by the desktop and mobile timeline layouts. */
function StepContent({ step }: { step: MethodologyStep }) {
  return (
    <>
      <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
        Step {step.step}
      </p>
      <h3 className="mb-1.5">{step.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{step.summary}</p>
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
    </>
  );
}

export function Methodology() {
  const lastIndex = methodologySteps.length - 1;

  return (
    <section id="how-we-work" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            How engagements work
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A repeatable system, not just expert time. Every engagement moves
            through the same four steps, the way experienced technology leaders
            actually operate.
          </p>
        </div>

        {/* Desktop: horizontal timeline with a flowing connector and arrows. */}
        <ol className="hidden lg:grid grid-cols-4">
          {methodologySteps.map((step, i) => (
            <li key={step.step} className="relative flex flex-col">
              <div className="relative flex items-center justify-center h-16 mb-6">
                {i < lastIndex && (
                  <>
                    <div className="timeline-line absolute top-1/2 left-1/2 w-full h-0.5 -translate-y-1/2 rounded-full" />
                    <ChevronRight
                      className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 text-accent z-20"
                      strokeWidth={2.5}
                    />
                  </>
                )}
                <StepNode step={step} />
              </div>
              <div className="glass rounded-2xl p-6 mx-3 flex-1">
                <StepContent step={step} />
              </div>
            </li>
          ))}
        </ol>

        {/* Mobile: vertical timeline with a downward flowing connector. */}
        <ol className="lg:hidden">
          {methodologySteps.map((step, i) => (
            <li key={step.step} className="flex gap-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <StepNode step={step} />
                {i < lastIndex && (
                  <div className="relative flex-1 w-0.5 mt-2">
                    <div className="timeline-line-v absolute inset-0 rounded-full" />
                    <ChevronDown
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 text-accent"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
              </div>
              <div className="glass rounded-2xl p-5 flex-1 mb-0">
                <StepContent step={step} />
              </div>
            </li>
          ))}
        </ol>

        <div className="glass rounded-2xl p-6 sm:p-8 mt-8 sm:mt-10">
          <h3 className="mb-4 text-center sm:text-left">What that delivers</h3>
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
