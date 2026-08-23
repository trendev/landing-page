import { ArrowRight, Repeat } from "lucide-react";

import { Link } from "@/app/router";
import { ADVISORY_PATH, SECONDARY_CTA_LABEL } from "@/data/pricing";

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenProjects: () => void;
}

export function Hero({ onOpenConsultation, onOpenProjects }: HeroProps) {
  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 border border-accent/20 rounded-full mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm">
            Fractional CTO · AI &amp; Engineering Transformation
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 tracking-tight max-w-4xl mx-auto px-4">
          Technology consulting that drives measurable business growth
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
          Fractional CTO leadership and hands-on delivery across AI adoption,
          product execution, and engineering transformation. Cloud, DevOps, and
          Web3 as supporting expertise.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <button
            onClick={onOpenConsultation}
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            Schedule Free Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
          {/* Distinct intent, distinct button: booking a call and subscribing
              are different journeys and must not share a CTA. Accent outline
              reads as invitation without competing with the primary fill. */}
          <Link
            href={ADVISORY_PATH}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-accent/50 bg-card/50 text-accent hover:bg-accent/15 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Repeat className="w-4 h-4" />
            {SECONDARY_CTA_LABEL}
          </Link>
        </div>
        {/* Deliberately a text link, not a third button: the two CTAs above are
            the commercial paths and must not compete with a portfolio view. */}
        <div className="mt-5 sm:mt-6 px-4">
          <button
            onClick={onOpenProjects}
            className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            View our work
          </button>
        </div>
      </div>
    </section>
  );
}
