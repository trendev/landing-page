import { expertise } from "@/data/content";
import type { ServiceItem } from "@/types";
import { ServiceCard } from "./ServiceCard";

interface ExpertiseProps {
  onSelectItem: (item: ServiceItem) => void;
}

export function Expertise({ onSelectItem }: ExpertiseProps) {
  return (
    <section id="expertise" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            Our Expertise
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Strategic consulting and leadership for your technology initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {expertise.map((item, index) => (
            <ServiceCard
              key={index}
              item={item}
              onClick={() => onSelectItem(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
