import { ArrowRight } from "lucide-react";

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
          <button
            onClick={onOpenProjects}
            className="px-5 sm:px-6 py-2.5 sm:py-3 glass rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
