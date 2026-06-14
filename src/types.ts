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

export interface Faq {
  question: string;
  answer: string;
}
