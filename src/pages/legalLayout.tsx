import type { ReactNode } from "react";

import { BackLink } from "@/components/BackLink";
import type { ContentSection } from "@/types";

/** Shared shell for the Legal Notice and Privacy pages. */
export function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <BackLink className="mb-6" />
        <header className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl mb-2">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {lastUpdated}
          </p>
        </header>
        <div className="space-y-6">{children}</div>
        <div className="mt-10 text-center">
          <BackLink />
        </div>
      </div>
    </section>
  );
}

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <article key={section.id} className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl mb-3">{section.heading}</h2>
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
      ))}
    </>
  );
}
