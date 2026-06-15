import { ArrowRight } from "lucide-react";

import type { ServiceItem } from "@/types";

interface ServiceCardProps {
  item: ServiceItem;
  onClick: () => void;
  /** Extra width classes; the grid/flex parent decides sizing. */
  className?: string;
}

/** Clickable card shared by the Expertise and Services grids. */
export function ServiceCard({ item, onClick, className = "" }: ServiceCardProps) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`group p-6 sm:p-8 bg-white border border-border rounded-2xl hover:border-accent hover:shadow-lg transition-[border-color,box-shadow,color] duration-300 text-left w-full ${className}`}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
      </div>
      <h3 className="mb-2 sm:mb-3 group-hover:text-accent transition-colors">
        {item.title}
      </h3>
      <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
        {item.description}
      </p>
      <div className="inline-flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm">Learn more</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
}
