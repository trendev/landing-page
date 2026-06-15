import { ArrowRight, X } from "lucide-react";

import type { ServiceItem } from "@/types";
import { Modal } from "./Modal";

interface DetailModalProps {
  item: ServiceItem;
  onClose: () => void;
  onGetStarted: () => void;
}

export function DetailModal({ item, onClose, onGetStarted }: DetailModalProps) {
  const Icon = item.icon;
  return (
    <Modal onClose={onClose} panelClassName="max-w-3xl max-h-[90vh]">
      <div className="sticky top-0 bg-white border-b border-border px-6 sm:px-8 py-4 sm:py-6 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl mb-1 sm:mb-2">{item.title}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {item.description}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded-lg transition-colors shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 sm:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Overview</h3>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {item.detailedContent.overview}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">What We Deliver</h3>
          <ul className="space-y-3">
            {item.detailedContent.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                <span className="text-muted-foreground text-sm sm:text-base">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {item.detailedContent.technologies && (
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">
              Technologies We Use
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.detailedContent.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-secondary text-foreground rounded-lg text-xs sm:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-border">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
