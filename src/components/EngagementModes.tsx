import { ArrowRight } from "lucide-react";

import { Link } from "@/app/router";
import { engagementModes } from "@/data/content";
import { positioning } from "@/data/positioning";
import type { EngagementMode } from "@/types";

function ModeLink({ mode }: { mode: EngagementMode }) {
  return (
    <Link
      href={mode.href}
      className="text-sm text-accent hover:opacity-80 transition-opacity inline-flex items-center gap-1"
    >
      {mode.cta}
      <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  );
}

function Deliverables({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="px-2.5 py-1 rounded-full border border-accent/30 text-accent text-xs"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Advice, operational leadership and delivery, told apart by responsibility
 * and output (issue #47). A table on desktop, stacked cards on phones. No
 * prices here: the landing page links out to the plans, it never hosts them.
 */
export function EngagementModes() {
  return (
    <section id="engagements" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            {positioning.engagements.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {positioning.engagements.description}
          </p>
        </div>

        <div className="hidden md:block glass rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-muted-foreground">
                <th className="px-5 py-4 font-normal">Your need</th>
                <th className="px-5 py-4 font-normal">Engagement</th>
                <th className="px-5 py-4 font-normal">Responsibility</th>
                <th className="px-5 py-4 font-normal">Typical outputs</th>
              </tr>
            </thead>
            <tbody>
              {engagementModes.map((mode) => (
                <tr
                  key={mode.engagement}
                  className="border-b border-white/10 last:border-b-0 align-top"
                >
                  <td className="px-5 py-5 text-foreground w-[24%]">
                    {mode.need}
                  </td>
                  <td className="px-5 py-5 w-[20%]">
                    <div className="text-foreground mb-2">
                      {mode.engagement}
                    </div>
                    <ModeLink mode={mode} />
                  </td>
                  <td className="px-5 py-5 text-muted-foreground">
                    {mode.responsibility}
                  </td>
                  <td className="px-5 py-5 w-[22%]">
                    <Deliverables items={mode.deliverables} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {engagementModes.map((mode) => (
            <div key={mode.engagement} className="glass rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-1">{mode.need}</p>
              <h3 className="mb-2">{mode.engagement}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {mode.responsibility}
              </p>
              <div className="mb-3">
                <Deliverables items={mode.deliverables} />
              </div>
              <ModeLink mode={mode} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
