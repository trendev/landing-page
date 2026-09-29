import {
  Brain,
  BrainCircuit,
  CalendarRange,
  ClipboardCheck,
  Cloud,
  Code,
  Coins,
  Compass,
  Handshake,
  Layers,
  ListChecks,
  Rocket,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import type {
  DeliveryPrinciple,
  EngagementMode,
  MethodologyStep,
  Project,
  ProductizedOffer,
  ProofCase,
  ServiceItem,
  WhyChooseItem,
} from "@/types";

export const expertise: ServiceItem[] = [
  {
    icon: Users,
    title: "Engineering Management & Leadership",
    description:
      "When adding engineers no longer translates into predictable delivery.",
    detailedContent: {
      overview:
        "As squads multiply, unclear ownership and cross-team dependencies can slow the roadmap. We assess the operating model, clarify responsibilities and help shape hiring and delivery practices. Implementation and ongoing leadership are scoped through a Fractional CTO or tailored mission.",
      benefits: [
        "Build and scale high-performing engineering teams",
        "Establish best practices and efficient workflows",
        "Provide mentorship and technical guidance to developers",
        "Foster a culture of continuous improvement and innovation",
        "Implement agile methodologies tailored to your organization",
        "Develop engineering processes and standards",
        "Team performance optimization and KPI development",
      ],
    },
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "When the next product milestone needs hands-on engineering capacity.",
    detailedContent: {
      overview:
        "Turn a product requirement into a scoped implementation: applications, APIs, integrations and the work needed to release them. TRENDev leads delivery with trusted partners where the scope calls for them, agreeing testing, acceptance criteria and handover with your team before work starts.",
      benefits: [
        "Design and develop robust, scalable web applications",
        "Create RESTful APIs and integrate third-party services",
        "Implement responsive, user-friendly front-end interfaces",
        "Ensure code quality through comprehensive testing and code reviews",
        "Full project lifecycle management from concept to deployment",
        "Database design and optimization",
        "Performance optimization and scalability planning",
      ],
      technologies: [
        "Go",
        "Rust",
        "Java",
        "JavaEE/JakartaEE",
        "Eclipse MicroProfile",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Python",
        "Angular",
        "React",
        "AngularJS",
        "NativeScript",
        "React Native",
        "Solana",
        "Anchor",
        "Ethereum",
        "Solidity",
        "Avalanche",
        "ethers.js",
        "web3.js",
        "MetaMask",
        "Kafka",
        "Stripe",
      ],
    },
  },
  {
    icon: Target,
    title: "CTO as a Service",
    description:
      "When a transition, hiring plan or platform programme needs senior ownership.",
    detailedContent: {
      overview:
        "Bring technology priorities, team structure and board expectations into one actionable plan. A Fractional CTO mission defines the leadership mandate, decision authority and follow-through. For decision support without operational ownership, choose an Advisor subscription instead.",
      benefits: [
        "Strategic technology planning and roadmap development",
        "Technology stack evaluation and selection",
        "Team structuring and hiring strategies",
        "Technical due diligence for investors and M&A",
        "Budget planning and resource allocation",
        "Vendor evaluation and technology partnerships",
        "Innovation strategy and competitive analysis",
        "Risk assessment and mitigation planning",
        "Board-level technical reporting and communication",
      ],
    },
  },
];

export const services: ServiceItem[] = [
  {
    icon: Cloud,
    title: "Cloud Solutions & DevOps Strategy",
    description:
      "When infrastructure, release processes or recovery gaps constrain growth.",
    detailedContent: {
      overview:
        "Assess cloud costs, deployment bottlenecks and operational risks before committing to a migration. A tailored delivery mission can cover infrastructure changes, release automation, observability and recovery procedures, with agreed milestones and handover to your engineers.",
      benefits: [
        "Design and implement scalable cloud infrastructure (AWS, Azure, GCP)",
        "Automate deployment pipelines with CI/CD best practices",
        "Optimize performance, cost, and security in cloud environments",
        "Implement comprehensive monitoring, logging, and alerting",
        "Disaster recovery planning and implementation",
        "Container orchestration with Kubernetes and Docker",
        "Infrastructure as Code (Terraform, Pulumi)",
        "Security hardening and compliance implementation",
      ],
      technologies: [
        "AWS",
        "Azure",
        "GCP",
        "Kubernetes",
        "Docker",
        "Terraform",
        "Jenkins",
        "GitLab CI/CD",
        "CloudFormation",
        "Ansible",
      ],
    },
  },
  {
    icon: Coins,
    title: "Blockchain & Web3 Development",
    description:
      "When an on-chain product needs protocol design and application delivery.",
    detailedContent: {
      overview:
        "Build secure, scalable blockchain solutions from smart contracts to full DeFi platforms. We provide end-to-end blockchain development including smart contract architecture, comprehensive security auditing, token engineering, and Web3 integration. Our expertise spans multiple blockchain ecosystems to deliver production-ready decentralized applications.",
      benefits: [
        "Smart contract development on Solana, Ethereum, and Avalanche",
        "Comprehensive smart contract security audits and vulnerability assessment",
        "Token engineering and tokenomics design",
        "DeFi protocol development and optimization",
        "NFT platform development and marketplace integration",
        "Web3 wallet integration (MetaMask, Phantom, WalletConnect)",
        "On-chain and off-chain architecture design",
        "Gas optimization and transaction efficiency",
        "Blockchain security best practices and risk mitigation",
        "Integration with existing Web2 systems",
        "DAO governance mechanisms and voting systems",
      ],
      technologies: [
        "Solana",
        "Anchor",
        "Rust",
        "Ethereum",
        "Solidity",
        "Hardhat",
        "Foundry",
        "Avalanche",
        "Polygon",
        "ethers.js",
        "web3.js",
        "MetaMask",
        "Phantom",
        "IPFS",
        "The Graph",
        "Chainlink",
        "OpenZeppelin",
        "Truffle",
      ],
    },
  },
  {
    icon: Brain,
    title: "AI Consulting & Machine Learning",
    description:
      "When an AI use case needs a credible route from experiment to integration.",
    detailedContent: {
      overview:
        "Start with the product problem, data constraints and evaluation criteria. Assess feasibility before investing, then scope the integration, deployment and monitoring work separately. An assessment may recommend not using AI; delivery is a distinct mandate, not part of an advisory subscription.",
      benefits: [
        "Develop custom AI/ML solutions tailored to your business needs",
        "Integrate Large Language Models (LLMs) like ChatGPT into applications",
        "Build recommendation systems, NLP models, and predictive analytics",
        "Provide AI strategy consulting and proof-of-concept development",
        "Data pipeline design and implementation",
        "MLOps infrastructure and model deployment",
        "Model training, fine-tuning, and optimization",
        "AI ethics and responsible AI implementation",
      ],
      technologies: [
        "OpenAI GPT",
        "ChatGPT",
        "PyTorch",
        "TensorFlow",
        "Hugging Face",
        "LangChain",
        "Scikit-learn",
        "Pandas",
        "NumPy",
      ],
    },
  },
  {
    icon: Layers,
    title: "Enterprise Architecture",
    description:
      "When the architecture that got you here cannot support the next stage.",
    detailedContent: {
      overview:
        "Compare the trade-offs of evolving the current platform, refactoring critical services or changing its architecture. We define target designs and migration sequences around business constraints, with separately scoped implementation when required. A rewrite is an option to justify, not a default recommendation.",
      benefits: [
        "Enterprise system architecture design and documentation",
        "Microservices and distributed systems architecture",
        "API strategy, design, and integration planning",
        "Technical debt assessment and reduction strategies",
        "Scalability and performance optimization",
        "Security architecture and compliance (GDPR, SOC2, ISO 27001)",
        "Technology modernization and migration strategies",
        "Architecture governance and standards",
      ],
      technologies: [
        "Microservices",
        "API Gateway",
        "Message Queues",
        "Event-Driven Architecture",
        "Service Mesh",
        "Domain-Driven Design",
      ],
    },
  },
];

export const whyChoose: WhyChooseItem[] = [
  {
    icon: Rocket,
    title: "For founders",
    description:
      "Turn a project into a product. Get support with technical feasibility, architecture, an MVP roadmap and implementation — whether you have an engineering team or are putting one together.",
  },
  {
    icon: Users,
    title: "For growing startups",
    description:
      "Keep product delivery moving as customers and teams grow. Strengthen your architecture, structure your engineering organisation and bring in leadership or delivery capacity for the next stage.",
  },
  {
    icon: Compass,
    title: "For investors",
    description:
      "Get a clear technical view before an investment or during portfolio support. Assess the product, architecture, engineering organisation and delivery risks through technical due diligence, then define practical priorities with the founders.",
  },
];

export const projects: Project[] = [
  {
    name: "NFR Management Framework",
    subtitle: "Agile & DevOps Toolkit",
    url: "https://trendev.notion.site/Free-Tools-for-NFR-Management-Framework-1741ee3b16d780569b34f8f3203c2e2e",
    tagline: "Why do Agile projects fail after they ship?",
    description:
      "Free, practical tools to define, track, and enforce performance, security, and reliability as first-class product requirements.",
    tags: [
      "Agile",
      "DevOps",
      "Non-Functional Requirements",
      "Software Quality",
      "Engineering Management",
      "Optimization",
      "Delivery",
    ],
  },
  {
    name: "UnleakTrade",
    subtitle: "Confidential OTC Trading on Solana",
    url: "https://unleak.trade",
    tagline:
      "How do you trade size on Solana without tipping the market?",
    description:
      "Execute large OTC trades on any Solana token using private RFQs, competitive pricing, and guaranteed settlement.",
    tags: [
      "Solana",
      "Blockchain",
      "ZK",
      "DeFi",
      "Liquidity",
      "Institutional Trading",
      "Crypto Markets",
    ],
    hidden: true,
  },
  {
    name: "PoLN",
    subtitle: "Decentralized Work Protocol",
    url: "https://poln.org",
    tagline: "What if coordinating work didn’t require trust?",
    description:
      "PoLN turns project execution into a decentralized protocol with on-chain commitment, accountability, and dispute resolution.",
    tags: [
      "Web3",
      "Blockchain",
      "DAO",
      "Protocol",
      "Work Coordination",
      "Decentralized Governance",
      "Collaboration",
    ],
    hidden: true,
  },
];

/** The repeatable engagement system shown in the Methodology section. */
export const methodologySteps: MethodologyStep[] = [
  {
    icon: Search,
    step: "01",
    title: "Understand",
    summary: "Understand reality before changing it.",
    points: ["Technology and architecture", "Team and delivery process", "Risks, constraints, and goals"],
  },
  {
    icon: ListChecks,
    step: "02",
    title: "Prioritize",
    summary: "Decide what matters most, first.",
    points: ["Roadmap and sequencing", "Architecture decisions", "AI and automation opportunities"],
  },
  {
    icon: Rocket,
    step: "03",
    title: "Execute",
    summary: "Deliver change, hands-on.",
    points: ["Technical leadership", "Delivery and shipping", "Hiring and team enablement"],
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Scale",
    summary: "Leave your team ready to carry it forward.",
    points: ["Systems and governance", "Operating model", "Team autonomy"],
  },
];

/** Agreed outputs, not unverified performance or time-to-market promises. */
export const outcomes: string[] = [
  "Priorities and trade-offs",
  "Named owners and milestones",
  "Delivery and acceptance criteria",
  "Operational risks and recovery plans",
  "Team handover and next steps",
];

/** Named, fixed-scope entry points shown in the Offers section. */
export const offers: ProductizedOffer[] = [
  {
    icon: ClipboardCheck,
    name: "CTO Audit",
    duration: "2-week assessment",
    summary: "Before a major technical commitment or investment: assess the platform, the team and the risks, then decide what to tackle first.",
    deliverables: ["Architecture review", "Engineering review", "Prioritized action plan"],
  },
  {
    icon: BrainCircuit,
    name: "AI Readiness Assessment",
    duration: "Focused engagement",
    summary: "Before committing a team to AI: assess use cases, data readiness and how you would evaluate value.",
    deliverables: ["AI opportunities map", "Risk analysis", "Implementation roadmap"],
  },
  {
    icon: Compass,
    name: "Engineering Scale Blueprint",
    duration: "Strategic engagement",
    summary: "When coordination is slowing delivery: define squad ownership, hiring priorities and the operating model.",
    deliverables: ["Operating model", "Org recommendations", "Execution roadmap"],
  },
  {
    icon: CalendarRange,
    name: "90-Day Transformation Plan",
    duration: "90-day plan",
    summary: "When change spans several teams: turn the direction into a sequenced first-quarter plan with owners and milestones.",
    deliverables: ["Prioritized initiatives", "Milestones", "Leadership plan"],
  },
];

/* ── Engagement modes & delivery model (issue #47) ──────────────────────
 *
 * TRENDev advises, leads and delivers. Advisory exclusions are the scope of
 * the Advisor subscriptions, not a limit of the firm, so the copy below keeps
 * the two apart: what each engagement makes TRENDev responsible for, and how
 * delivery works when a client asks for it. Present the model accurately:
 * Senior technical leadership plus trusted repeat partners, never an invented salaried team,
 * unlimited capacity or named partners.
 */

/** Label of the delivery-enquiry CTA; a third intent next to consult/subscribe. */
export const DELIVERY_CTA_LABEL = "Discuss a delivery project";

/**
 * Engagement modes, by the client's need. Names match `pricing.ts` exactly;
 * tailored delivery is deliberately not a tier and has no price.
 */
export const engagementModes: EngagementMode[] = [
  {
    need: "Assess a product, a platform or the technology behind an investment",
    engagement: "Technical assessment & due diligence",
    responsibility:
      "A separately scoped review of the technology, team and delivery risks, with findings and recommendations for founders or investors.",
    deliverables: ["Technical findings and risks", "Prioritised recommendations"],
    href: "/#offers",
    cta: "Explore a technical assessment",
  },
  {
    need: "Pressure-test a technology decision before committing resources",
    engagement: "CTO Advisor",
    responsibility:
      "Evidence, options, recommendations and decision preparation. You keep operational ownership.",
    deliverables: ["Decision brief", "Prioritised assessment"],
    href: "/services/cto-advisor",
    cta: "CTO Advisor",
  },
  {
    need: "Keep architecture, hiring and roadmap decisions aligned as you grow",
    engagement: "CTO Advisor+",
    responsibility:
      "Recurring decision support, governance reviews and executive preparation. Your team retains delivery ownership.",
    deliverables: ["Sequenced roadmap", "Quarterly Technology Review"],
    href: "/services/cto-advisor-plus",
    cta: "CTO Advisor+",
  },
  {
    need: "Lead a technology transition or structure a growing engineering organisation",
    engagement: "Fractional CTO",
    responsibility:
      "Explicitly scoped leadership, authority, coordination and follow-through.",
    deliverables: ["Transition plan", "Governance and follow-through"],
    href: "/services/fractional-cto",
    cta: "Fractional CTO",
  },
  {
    need: "Build an MVP, deliver a platform change or launch a product capability",
    engagement: "Tailored delivery engagement",
    responsibility:
      "Defined scope, delivery responsibilities, acceptance criteria and fees. Trusted partners may take part.",
    deliverables: ["Implemented changes", "Agreed validation and handover"],
    href: "/#contact",
    cta: DELIVERY_CTA_LABEL,
  },
];

/** "How we deliver": the partner model, stated without invented specifics. */
export const deliveryPrinciples: DeliveryPrinciple[] = [
  {
    icon: Compass,
    title: "Senior technical accountability",
    description:
      "TRENDev provides technical direction and delivery governance, with clear decision ownership, responsibilities and reporting agreed for each mission.",
  },
  {
    icon: Handshake,
    title: "A trusted delivery network",
    description:
      "We assemble the capabilities the work requires through established delivery partnerships. The team and each partner’s responsibilities are agreed for the mission.",
  },
  {
    icon: ClipboardCheck,
    title: "Scope agreed before work starts",
    description:
      "Roles, responsibilities, capacity, fees and acceptance criteria are defined for each mission up front, with delivery governance to match.",
  },
  {
    icon: Layers,
    title: "Alongside your team",
    description:
      "Work is planned around your existing engineers and suppliers, with clear hand-offs so your team can carry it forward.",
  },
];

/**
 * Transparent boundaries between advice and delivery. A possible follow-on
 * engagement is a commercial interest; these safeguards say so plainly rather
 * than claiming independence that separate scopes alone cannot guarantee.
 */
export const adviceSafeguards: string[] = [
  "Recommendations rest on evidence and include credible alternatives, including no change.",
  "Any proposed delivery relationship, ours or a partner's, is disclosed.",
  "Delivery is a separate scope, agreed and priced on its own.",
  "You remain free to execute internally or choose another provider.",
];

/**
 * Anonymised past engagements. NEVER name a client. Only documented work: no
 * invented savings, revenue or delivery metrics, no sector label unless it is
 * documented, and no merging of unrelated assignments into one case. Keep
 * company size, engineering headcount and squad count distinct.
 */
export const proofCases: ProofCase[] = [
  {
    context: "Approximately 90 engineers · 10 squads",
    problem:
      "Moving from a single-tenant platform towards a multi-tenant, API-first model required both architectural choices and a delivery approach the board could assess.",
    work: ["Compared transformation scenarios for the board", "Evaluated API gateway alternatives", "Worked within the squad facing the greatest delivery constraints"],
  },
  {
    context: "10 engineers across two squads",
    problem:
      "Technology changes and a growing engineering organisation needed one coherent plan, from mobile and cloud architecture to hiring and executive reporting.",
    work: [
      "Technical audit and organisation design",
      "Flutter-to-React Native and Azure-to-AWS transition work",
      "Three-year roadmap, hiring plan and executive reporting",
    ],
  },
  {
    context: "SaaS · Approximately 15 people · 100+ EC2 instances",
    problem:
      "A small SaaS organisation operated a service spread across more than 100 EC2 instances. The work connected service refactoring, a target SaaS architecture and disaster recovery planning.",
    work: [
      "Service audit and refactoring",
      "Target architecture",
      "Disaster recovery planning",
    ],
  },
];

/**
 * In-page navigation shared by the header and footer. Route-aware ("/#id")
 * so the links work from subpages (/services/*, /terms, …) via the router.
 */
export const navLinks = [
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/advisory", label: "Advisory" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

/** Legal/contractual routes shown in the footer. */
export const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy" },
  { href: "/legal", label: "Legal Notice" },
];

/** Shared external links used across CTAs. */
export const CALENDLY_URL =
  "https://calendly.com/whyvrafvr/trendev-consult";
/** Bare address, for display and for pages that build their own mailto. */
export const CONTACT_ADDRESS = "contact@trendev.fr";
/** Prefilled delivery-project mailto: never routed to subscription checkout. */
export const DELIVERY_ENQUIRY_EMAIL =
  `mailto:${CONTACT_ADDRESS}?subject=Delivery%20project%20enquiry%20from%20TRENDev%20Website`;
export const GITHUB_URL = "https://github.com/trendev";
export const MEDIUM_URL = "https://medium.com/tales-of-a-cto";
