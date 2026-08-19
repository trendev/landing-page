import { ArrowLeft } from "lucide-react";

import { Link } from "@/app/router";

/**
 * Return path out of a subpage. Every route below `/` must render one: the
 * header logo also goes home, but it is not an obvious affordance, and a
 * visitor who arrives on a deep link straight from search has no history to
 * go back to. Defaults to the landing page; `/services/*` points at its
 * parent `/advisory` instead.
 */
export function BackLink({
  href = "/",
  label = "Back to home",
  className = "",
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors print:hidden ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}
