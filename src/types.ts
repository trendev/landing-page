import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  detailedContent: {
    overview: string;
    benefits: string[];
    technologies?: string[];
  };
}

export interface WhyChooseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Project {
  name: string;
  subtitle?: string;
  url: string;
  tagline: string;
  description: string;
  tags: string[];
  hidden?: boolean;
}

export interface EngagementModel {
  title: string;
  description: string;
}

export interface MethodologyStep {
  icon: LucideIcon;
  /** Display order label, e.g. "01". */
  step: string;
  title: string;
  summary: string;
  points: string[];
}

export interface ProductizedOffer {
  icon: LucideIcon;
  name: string;
  /** Short engagement length, e.g. "2-week assessment". */
  duration: string;
  summary: string;
  deliverables: string[];
}

export interface Faq {
  question: string;
  answer: string;
}
