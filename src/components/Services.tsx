import { services } from "@/data/content";
import type { ServiceItem } from "@/types";
import { ServiceCard } from "./ServiceCard";

interface ServicesProps {
  onSelectItem: (item: ServiceItem) => void;
}

export function Services({ onSelectItem }: ServicesProps) {
  return (
    <section
      id="services"
      className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Technical implementation and infrastructure solutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-6xl mx-auto">
          {services.map((item, index) => (
            <ServiceCard
              key={index}
              item={item}
              onClick={() => onSelectItem(item)}
              className="md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
