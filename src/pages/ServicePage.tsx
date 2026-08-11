import { CalendarCheck } from "lucide-react";

import { Link } from "@/app/router";
import { ComparisonTable } from "@/components/ComparisonTable";
import { TierCta } from "@/components/Pricing";
import { legalLinks } from "@/data/content";
import { PREREQUISITE_NOTE, pricingTiers } from "@/data/pricing";
import { getServiceDescription } from "@/data/serviceDescriptions";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { NotFoundPage } from "@/pages/NotFoundPage";
import type { ContentSection } from "@/types";

function Section({ section }: { section: ContentSection }) {
  return (
    <article className="glass rounded-2xl p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl">{section.heading}</h2>
        {section.pendingDefault && (
          <span className="px-2.5 py-0.5 rounded-full border border-accent/30 text-accent text-xs">
            default terms — pending confirmation
          </span>
        )}
      </div>
      {section.paragraphs?.map((paragraph) => (
        <p
          key={paragraph}
          className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed"
        >
          {paragraph}
        </p>
      ))}
      {section.bullets && (
        <ul className="space-y-2 mt-2">
          {section.bullets.map((bullet) => (
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
    </article>
  );
}

interface ServicePageProps {
  slug: string;
  onOpenConsultation: () => void;
}

export function ServicePage({ slug, onOpenConsultation }: ServicePageProps) {
  const service = getServiceDescription(slug);
  const tier = service
    ? pricingTiers.find((candidate) => candidate.id === service.tierId)
    : undefined;

  useDocumentMeta(
    service
      ? {
          title: `${service.title} | TRENDev`,
          description: service.metaDescription,
          canonicalPath: `/services/${service.slug}`,
        }
      : undefined,
  );

  if (!service || !tier) return <NotFoundPage />;

  const selfService = tier.cta.kind === "checkout";

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm text-muted-foreground mb-3">
            Service description · version {service.version} · effective{" "}
            {service.effectiveDate}
          </p>
          <h1 className="text-4xl sm:text-5xl mb-4">{service.title}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-5">
            {tier.tagline}
          </p>
          <div>
            <span className="text-3xl sm:text-4xl text-foreground">
              {tier.price}
            </span>
            <span className="text-muted-foreground">{tier.priceSuffix}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{tier.taxNote}</p>
        </header>

        <div className="space-y-6 sm:space-y-8">
          {service.sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          {selfService && (
            <div className="glass rounded-xl px-5 py-4 flex items-start sm:items-center gap-3 mb-6">
              <CalendarCheck className="w-5 h-5 text-accent shrink-0" />
              <p className="text-sm sm:text-base text-foreground">
                {PREREQUISITE_NOTE}
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-xl mx-auto">
            <TierCta tier={tier} onOpenConsultation={onOpenConsultation} />
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl text-center mb-6">
            Compare the three engagements
          </h2>
          <ComparisonTable />
        </div>

        <footer className="mt-10 sm:mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-3">
            Version {service.version}, effective {service.effectiveDate}, last
            updated {service.lastUpdated}. The service-description version
            accepted at purchase governs your subscription, together with the
            Terms of Service. Professional clients only.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-accent hover:opacity-80 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
    </section>
  );
}
