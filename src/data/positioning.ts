import { CONTACT_ADDRESS } from "@/data/content";

/** Buyer-facing copy. Contractual service definitions remain unchanged. */
export const positioning = {
  hero: {
    eyebrow: "Independent CTO advice · Technology leadership · Product delivery",
    title: "Make technology decisions you can defend.",
    description:
      "Before you commit to a software investment, a major product change or a delivery plan, understand what the evidence supports. TRENDev helps founders, software teams and investors clarify technical risks, make informed decisions and bring in the right leadership or delivery support.",
    proof:
      "Senior CTO and engineering experience, from teams of 10 engineers to organisations of approximately 90 engineers.",
    /** A plain text link, never a third button competing with the two CTAs. */
    writtenContactLink: "Prefer to start in writing? Tell us what you’re deciding.",
    workLink: "Explore selected engagements",
  },
  challenges: {
    title: "Clarity before the next commitment.",
    description:
      "Whether you’re building a product, backing a software company or growing an engineering organisation, important technical choices affect budget, delivery and future options. We help you examine the evidence, understand the trade-offs and identify a sensible next step.",
  },
  delivery: {
    title: "Experience behind the recommendations.",
    description:
      "Selected engagements show the work behind TRENDev’s judgment: comparing architecture options, structuring engineering teams and navigating delivery constraints. Each example describes a real scope of work, with client identities kept confidential.",
    modelTitle: "Senior leadership. A delivery team shaped around the mission.",
    modelDescription:
      "TRENDev combines a senior technical lead with trusted delivery partners who have worked together repeatedly. We agree the team, responsibilities and delivery milestones around your needs, alongside your own engineers.",
    safeguardsTitle: "Useful advice, with freedom over who delivers",
    safeguardsDescription:
      "Advice must stand on its own. If we propose a follow-on delivery engagement, we disclose that commercial interest and agree it separately.",
    resourcesLink: "Explore our engineering resources",
  },
  methodology: {
    title: "How we work",
    description:
      "Understand the bottleneck, agree priorities, then put change into practice. In a delivery or Fractional CTO mission, we lead the agreed work; in advisory, your team owns execution.",
    outputsTitle: "What we define with you",
  },
  offers: {
    title: "Four ways to work with us",
    description:
      "One decision to examine, recurring CTO advice, or leadership for a defined technology challenge. Choose the engagement that matches the responsibility you need. No bigger programme is required just to get started.",
    missionsTitle: "Typical scoped missions",
    compareLink: "Compare all four offers",
  },
  expertise: {
    title: "Our expertise",
    description:
      "Organisational decisions and implementation belong in the same conversation. Choose advisory for direction, Fractional CTO for leadership, or a tailored mission for delivery.",
  },
  services: {
    title: "Our services",
    description:
      "Build a product, modernise a platform or bring a new capability into production. We combine architecture, cloud, AI and software engineering around the work your project needs.",
  },
  cta: {
    title: "What technology decision are you facing?",
    description:
      "A supplier proposal to assess, a platform change to plan, a CTO transition or a technical question around an investment? Tell us what you’re trying to decide. Start with a free 20-minute introductory call or write to us directly. No preparation or confidential documents are needed. This is an introductory exchange, not a free technical audit.",
    /** General written first contact; distinct from the delivery enquiry. */
    writtenContactLabel: `Prefer email? Write to ${CONTACT_ADDRESS}`,
  },
  advisory: {
    title: "CTO advice and leadership for your business",
    description:
      "Resolve one technical decision with a one-off review, keep ownership in your team with a recurring advisory subscription, or bring in a Fractional CTO to lead a defined mission. The difference is responsibility, not just time on a calendar.",
    deliveryLink: "Need implementation? Discuss a tailored delivery mission",
  },
};
