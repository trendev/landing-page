import { useEffect, useState } from "react";
import { Download, TriangleAlert } from "lucide-react";

import { Link } from "@/app/router";
import { BackLink } from "@/components/BackLink";
import {
  currentTermsDate,
  hasTermsVersion,
  loadTermsVersion,
  termsVersionSummaries,
} from "@/data/terms";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { NotFoundPage } from "@/pages/NotFoundPage";
import type { TermsVersion } from "@/types";

interface TermsPageProps {
  /** Dated route (/terms/YYYY-MM-DD); undefined renders the current version. */
  date?: string;
}

/**
 * Loads one Terms version's text from its own chunk (see src/data/terms). The
 * registry answers "does this date exist?" synchronously, so an unknown date
 * still 404s immediately instead of flashing a loading state first.
 */
function useTermsVersion(date: string): TermsVersion | null {
  const [terms, setTerms] = useState<TermsVersion | null>(null);

  useEffect(() => {
    let stale = false;
    setTerms(null);
    void loadTermsVersion(date).then((loaded) => {
      if (!stale) setTerms(loaded);
    });
    return () => {
      stale = true;
    };
  }, [date]);

  return terms;
}

export function TermsPage({ date }: TermsPageProps) {
  const requested = date ?? currentTermsDate;
  const known = hasTermsVersion(requested);
  const terms = useTermsVersion(requested);

  useDocumentMeta(
    terms
      ? {
          title: `Terms of Service (v${terms.version}) | TRENDev`,
          description: `TRENDev Professional Services — Terms of Service, version ${terms.version}, effective ${terms.effectiveDate}. Professional clients only.`,
          canonicalPath: date ? `/terms/${date}` : "/terms",
        }
      : undefined,
  );

  if (!known) return <NotFoundPage />;

  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <BackLink className="mb-6" />

        {!terms ? (
          <p className="glass rounded-2xl p-6 sm:p-8 text-muted-foreground">
            Loading the Terms of Service…
          </p>
        ) : (
          <>
            <header className="glass rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4">
                TRENDev Professional Services — Terms of Service
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-5">
                <span>Version {terms.version}</span>
                <span>Effective date: {terms.effectiveDate}</span>
                <span>Last updated: {terms.lastUpdated}</span>
                <span className="px-2.5 py-0.5 rounded-full border border-accent/30 text-accent text-xs">
                  Professional clients only
                </span>
              </div>
              <a
                href={terms.pdfPath}
                download
                className="print:hidden px-4 sm:px-5 py-2 sm:py-2.5 glass rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </header>

            {terms.status === "draft" && (
              <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-5 py-4 mb-6 sm:mb-8 flex items-start gap-3 print:border-amber-700 print:bg-amber-50">
                <TriangleAlert className="w-5 h-5 text-amber-300 shrink-0 mt-0.5 print:text-amber-700" />
                <p className="text-sm sm:text-base text-amber-100 print:text-amber-900">
                  <strong>DRAFT — pending legal review.</strong> These Terms are
                  a draft and are not yet in force. They must be reviewed by a
                  French IT/commercial lawyer and approved before any
                  self-service subscription is offered under them.
                </p>
              </div>
            )}

            {terms.status === "superseded" && (
              <div className="rounded-xl border border-accent/30 bg-accent/10 px-5 py-4 mb-6 sm:mb-8">
                <p className="text-sm sm:text-base text-foreground">
                  This version has been superseded.{" "}
                  <Link href="/terms" className="text-accent hover:opacity-80">
                    Read the current Terms of Service →
                  </Link>
                </p>
              </div>
            )}

            <div className="glass rounded-2xl p-6 sm:p-10">
              {terms.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="mb-8 last:mb-0"
                >
                  <h2 className="text-lg sm:text-xl mb-3">
                    {section.number}. {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
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
              ))}
            </div>
          </>
        )}

        <footer className="print:hidden mt-8 text-center">
          <h2 className="text-sm text-muted-foreground mb-3">
            Version history
          </h2>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            {termsVersionSummaries.map((summary) => (
              <Link
                key={summary.date}
                href={`/terms/${summary.date}`}
                className="text-accent hover:opacity-80 transition-opacity"
              >
                v{summary.version} — {summary.date}
                {summary.status === "draft" ? " (draft)" : ""}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
    </section>
  );
}
