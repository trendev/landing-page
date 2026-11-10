import { Check, Minus } from "lucide-react";

import { comparisonRows, pricingTiers } from "@/data/pricing";

/** Renders a boolean as ✓/—; alignment is the caller's job. */
function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check aria-label="Included" className="w-4 h-4 text-accent" />;
  }
  if (value === false) {
    return (
      <Minus aria-label="Not included" className="w-4 h-4 text-muted-foreground/50" />
    );
  }
  return <span>{value}</span>;
}

/**
 * Offer comparison: issue #13's three columns plus CTO Decision Review
 * (issue #59).
 *
 * Two layouts, same data. Four offer columns plus the label column need
 * ~60rem to stay legible, so on anything narrower they could only be a
 * horizontally scrolling table, which is poor UI: the row labels scroll away
 * from their values and nothing signals there is more to the right. Below `lg`
 * each offer becomes its own card with label/value rows, which reads naturally
 * in a single vertical scroll. The table returns at `lg`, where it fits
 * without being squeezed into the old three-column width.
 */
export function ComparisonTable() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:hidden">
        {pricingTiers.map((tier) => (
          <div key={tier.id} className="glass rounded-2xl p-5">
            <h3
              className={`mb-4 ${tier.recommended ? "text-accent" : "text-foreground"}`}
            >
              {tier.name}
            </h3>
            <dl className="space-y-0">
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between gap-4 py-2 border-b border-border/60 last:border-0"
                >
                  <dt className="text-sm text-muted-foreground">{row.label}</dt>
                  <dd className="text-sm text-foreground text-right flex justify-end shrink-0 max-w-[55%]">
                    <Cell value={row.values[tier.id]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="hidden lg:block glass rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[60rem] text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 bg-card/90 text-left px-4 sm:px-6 py-4 border-b border-border font-normal text-muted-foreground">
                Compare
              </th>
              {pricingTiers.map((tier) => (
                <th
                  key={tier.id}
                  className={`px-4 py-4 border-b border-border text-center w-[19%] ${
                    tier.recommended ? "text-accent" : "text-foreground"
                  }`}
                >
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, index) => {
              const borderClass =
                index < comparisonRows.length - 1
                  ? "border-b border-border/60"
                  : "";
              return (
                <tr key={row.label}>
                  <th
                    className={`sticky left-0 bg-card/90 text-left px-4 sm:px-6 py-3 font-normal text-muted-foreground ${borderClass}`}
                  >
                    {row.label}
                  </th>
                  {pricingTiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={`px-4 py-3 ${borderClass}`}
                    >
                      <div className="flex justify-center text-center">
                        <Cell value={row.values[tier.id]} />
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
