import { Info } from "lucide-react";

import { Link } from "@/app/router";
import {
  DELIVERY_CTA_LABEL,
  DELIVERY_ENQUIRY_EMAIL,
} from "@/data/content";
import { DECISION_REVIEW_BOUNDARY_NOTE } from "@/data/pricing";

/**
 * Site chrome, never contract text: the Advisor exclusions are frozen in the
 * Terms annexes and in `serviceDescriptions.ts`, so this note sits beside them
 * to say they bound the subscription, not what TRENDev can do (issue #47).
 * `variant="decision-review"` gives the one-off review its own boundary
 * wording (issue #59): it is not a subscription, so the Advisor sentence would
 * misdescribe it.
 */
export function ScopeBoundaryNote({
  className = "",
  variant = "advisor",
}: {
  className?: string;
  variant?: "advisor" | "decision-review";
}) {
  if (variant === "decision-review") {
    return (
      <aside className={`glass rounded-xl px-5 py-4 flex items-start gap-3 ${className}`}>
        <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <p className="text-sm sm:text-base text-muted-foreground">
          {DECISION_REVIEW_BOUNDARY_NOTE}{" "}
          <a
            href={DELIVERY_ENQUIRY_EMAIL}
            className="text-accent hover:opacity-80 transition-opacity underline underline-offset-4"
          >
            {DELIVERY_CTA_LABEL}
          </a>
          .
        </p>
      </aside>
    );
  }
  return (
    <aside className={`glass rounded-xl px-5 py-4 flex items-start gap-3 ${className}`}>
      <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
      <div className="text-sm sm:text-base text-muted-foreground space-y-2">
        <p>
          <span className="text-foreground">
            The Advisor subscriptions are advice.
          </span>{" "}
          They cover analysis, recommendations and decision support, not
          running delivery or implementing changes. That is the scope of the
          subscription, not a limit on what TRENDev does.
        </p>
        <p>
          If you want TRENDev to lead or deliver the next phase, we agree a
          separate{" "}
          <Link
            href="/services/fractional-cto"
            className="text-accent hover:opacity-80 transition-opacity underline underline-offset-4"
          >
            Fractional CTO
          </Link>{" "}
          or tailored engagement, with trusted implementation partners where
          appropriate. You remain free to use your own team or another
          provider, and you can start there directly:{" "}
          <a
            href={DELIVERY_ENQUIRY_EMAIL}
            className="text-accent hover:opacity-80 transition-opacity underline underline-offset-4"
          >
            {DELIVERY_CTA_LABEL.toLowerCase()}
          </a>
          .
        </p>
      </div>
    </aside>
  );
}
