import { ArrowRight, TriangleAlert } from "lucide-react";

import { BackLink } from "@/components/BackLink";
import {
  WELCOME_BILLING_NOTE,
  WELCOME_SUBTITLE,
  WELCOME_TITLE,
  manageBilling,
  welcomeClosing,
  welcomeSteps,
} from "@/data/welcome";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import type { WelcomeStep } from "@/types";

function StepCta({ cta }: { cta: NonNullable<WelcomeStep["cta"]> }) {
  const className = `mt-5 px-5 py-2.5 sm:py-3 rounded-lg inline-flex items-center justify-center gap-2 text-sm sm:text-base ${
    cta.primary
      ? "bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
      : "glass hover:bg-white/10 transition-colors"
  }`;
  // mailto: must stay in the same tab; opening a blank tab for a mail client
  // leaves an empty window behind on most browsers.
  const external = cta.href.startsWith("http");
  return (
    <a
      href={cta.href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {cta.label}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

function Step({ step }: { step: WelcomeStep }) {
  const Icon = step.icon;
  return (
    <li className="glass rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-4 mb-3">
        <span className="w-12 h-12 rounded-full bg-card/80 border border-accent/40 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-accent" />
        </span>
        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl sm:text-3xl text-accent tabular-nums leading-none">
            {step.step}
          </span>
          <h2 className="text-lg sm:text-xl">{step.heading}</h2>
        </div>
      </div>

      {step.paragraphs?.map((paragraph) => (
        <p
          key={paragraph}
          className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed"
        >
          {paragraph}
        </p>
      ))}

      {step.bullets && (
        <ul className="space-y-2 mt-2">
          {step.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {step.note && (
        <p className="mt-4 flex items-start gap-2.5 text-sm text-muted-foreground">
          <TriangleAlert className="w-4 h-4 mt-0.5 text-accent shrink-0" />
          <span>{step.note}</span>
        </p>
      )}

      {step.cta && <StepCta cta={step.cta} />}
    </li>
  );
}

/**
 * Post-purchase onboarding (issue #18). Static and unauthenticated: Stripe
 * redirects here after checkout, but the page reads no Stripe data and holds
 * no customer state, so there is nothing here that is specific to the buyer.
 *
 * noindex because deploy.yml gives this route a real crawlable entry point,
 * and a post-purchase page does not belong in search results.
 */
export function WelcomePage() {
  useDocumentMeta({
    title: "Welcome | TRENDev",
    description:
      "Onboarding for new TRENDev CTO Advisor and CTO Advisor+ clients: share your context, schedule your first working session, and prepare useful materials.",
    canonicalPath: "/welcome",
    robots: "noindex, follow",
  });

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <BackLink className="mb-6" />

        <header className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl mb-2">{WELCOME_TITLE}</h1>
          <p className="text-lg text-muted-foreground">{WELCOME_SUBTITLE}</p>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            {WELCOME_BILLING_NOTE}
          </p>
        </header>

        <ol className="space-y-6">
          {welcomeSteps.map((step) => (
            <Step key={step.id} step={step} />
          ))}
        </ol>

        <article className="glass rounded-2xl p-6 sm:p-8 mt-6">
          <h2 className="text-lg sm:text-xl mb-3">{welcomeClosing.heading}</h2>
          {welcomeClosing.paragraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </article>

        {manageBilling && (
          <article className="glass rounded-2xl p-6 sm:p-8 mt-6">
            <h2 className="text-lg sm:text-xl mb-3">{manageBilling.heading}</h2>
            {manageBilling.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            <StepCta cta={manageBilling.cta} />
          </article>
        )}

        <div className="mt-10 text-center">
          <BackLink />
        </div>
      </div>
    </section>
  );
}
