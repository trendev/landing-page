import { ArrowRight, Mail, Repeat } from "lucide-react";

import { Link } from "@/app/router";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/data/content";
import {
  ADVISORY_PATH,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_LABEL,
} from "@/data/pricing";

export function Cta() {
  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-foreground">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
            Ready to scale your technology?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Schedule a free consultation to discuss your project and explore how
            we can help achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {PRIMARY_CTA_LABEL}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href={ADVISORY_PATH}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-accent/50 bg-card/50 text-accent hover:bg-accent/15 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Repeat className="w-4 h-4" />
              {SECONDARY_CTA_LABEL}
            </Link>
            <a
              href={CONTACT_EMAIL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2.5 sm:py-3 glass rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Mail className="w-4 h-4" />
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
