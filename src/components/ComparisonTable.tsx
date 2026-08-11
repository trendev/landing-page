import { Check, Minus } from "lucide-react";

import { comparisonRows, pricingTiers } from "@/data/pricing";

/** Renders a boolean as ✓/— and passes strings through. */
function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check aria-label="Included" className="w-4 h-4 text-accent mx-auto" />;
  }
  if (value === false) {
    return (
      <Minus
        aria-label="Not included"
        className="w-4 h-4 text-muted-foreground/50 mx-auto"
      />
    );
  }
  return <span>{value}</span>;
}

/** Tier comparison frozen in issue #13; scrolls horizontally on small screens. */
export function ComparisonTable() {
  return (
    <div className="glass rounded-2xl overflow-x-auto">
      <table className="w-full min-w-[42rem] text-sm border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="sticky left-0 bg-card/90 text-left px-4 sm:px-6 py-4 border-b border-border font-normal text-muted-foreground">
              Compare
            </th>
            {pricingTiers.map((tier) => (
              <th
                key={tier.id}
                className={`px-4 sm:px-6 py-4 border-b border-border text-center ${
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
                {row.values.map((value, tierIndex) => (
                  <td
                    key={pricingTiers[tierIndex].id}
                    className={`px-4 sm:px-6 py-3 text-center ${borderClass}`}
                  >
                    <Cell value={value} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
