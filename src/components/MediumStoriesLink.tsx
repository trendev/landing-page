import { ArrowUpRight } from "lucide-react";

import { MEDIUM_URL } from "@/data/content";
import { faqTeaser } from "@/data/faq";
import { MediumIcon } from "./icons/MediumIcon";

/**
 * Outbound link to the Medium publication, shared by the landing FAQ teaser
 * and /faq so the two surfaces cannot drift. Deliberately a plain link: an
 * embed or a client-side RSS fetch would be a third-party request, which the
 * cookie-consent rules and /privacy would then have to cover.
 */
export function MediumStoriesLink() {
  return (
    <a
      href={MEDIUM_URL}
      target="_blank"
      rel="noopener noreferrer"
      // Not inline-flex: at phone width the label wraps, and a flex row would
      // pin the icons to the edges of a full-width box. Inline icons wrap with
      // the (centred) text instead.
      className="text-center text-balance text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <MediumIcon className="inline w-4 h-4 mr-2 align-[-0.2em]" />
      {faqTeaser.mediumLabel}
      <ArrowUpRight
        aria-hidden="true"
        className="inline w-3.5 h-3.5 ml-1 align-[-0.1em]"
      />
    </a>
  );
}
