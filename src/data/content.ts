import {
  Award,
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
  Shield,
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
      "Build high-performing teams and establish engineering excellence.",
    detailedContent: {
      overview:
        "Transform your engineering organization with proven leadership strategies. We help you build high-performing teams, establish best practices, efficient workflows, and create a culture of continuous improvement and innovation.",
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
      "End-to-end web application development from concept to production.",
    detailedContent: {
      overview:
        "Leveraging a wide range of programming languages and frameworks to deliver comprehensive solutions. Design and develop robust, scalable web applications with modern technologies. We deliver production-ready solutions that meet your business objectives, from initial concept through deployment and beyond.",
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
      "Strategic technical leadership and executive guidance on demand.",
    detailedContent: {
      overview:
        "Dedicated executive-level technical leadership that drives results. We become your committed technology partner, providing hands-on strategic guidance and execution support. From board presentations to team building, we deliver the full spectrum of CTO responsibilities with complete accountability for your technology success.",
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
      "Modern cloud infrastructure and automated deployment pipelines.",
    detailedContent: {
      overview:
        "Design and implement scalable cloud infrastructure that reduces costs and improves reliability. We help you modernize your infrastructure with cloud-native solutions and DevOps best practices.",
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
      "Smart contract development, security audits, and tokenomics design.",
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
      "Custom AI/ML solutions and LLM integration for your business.",
    detailedContent: {
      overview:
        "Develop custom AI and machine learning solutions tailored to your business needs. From LLM integration to predictive analytics, we help you leverage the power of modern AI technologies to gain competitive advantages.",
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
      "Scalable system design and comprehensive technology roadmaps.",
    detailedContent: {
      overview:
        "Design resilient, scalable systems that grow with your business. We create comprehensive architecture strategies that align technology with business goals, ensuring long-term success and adaptability.",
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
    icon: Users,
    title: "Experienced Leadership",
    description:
      "More than 20 years of engineering, architecture and technology leadership, with direct access to Julien Sié as your senior counterpart",
  },
  {
    icon: Rocket,
    title: "Accelerated Time-to-Market",
    description:
      "Efficient development processes and innovative technologies enable faster product launches, capturing market opportunities sooner",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "Successful projects across multiple industries and company stages",
  },
  {
    icon: TrendingUp,
    title: "Scalability & Growth",
    description:
      "Solutions designed to scale with your business, supporting growth without compromising performance",
  },
  {
    icon: Target,
    title: "Cost Optimization",
    description:
      "Reduced downtime and enhanced efficiency through optimized DevOps strategies, streamlining operations and reducing costs",
  },
  {
    icon: Shield,
    title: "High Resilience",
    description:
      "Implementing high resilience and data consistency solutions to minimize system downtime and maximize productivity",
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
    summary: "Make it sustainable without you.",
    points: ["Systems and governance", "Operating model", "Team autonomy"],
  },
];

/** Qualitative outcomes shown under the methodology, no numeric claims. */
export const outcomes: string[] = [
  "Deployments from days to minutes",
  "Higher, safer release frequency",
  "Leaner cloud infrastructure",
  "Engineering teams that scale cleanly",
  "Production AI delivered in weeks, not months",
];

/** Named, fixed-scope entry points shown in the Offers section. */
export const offers: ProductizedOffer[] = [
  {
    icon: ClipboardCheck,
    name: "CTO Audit",
    duration: "2-week assessment",
    summary: "A fast, senior read on the state of your technology and engineering.",
    deliverables: ["Architecture review", "Engineering review", "Prioritized action plan"],
  },
  {
    icon: BrainCircuit,
    name: "AI Readiness Assessment",
    duration: "Focused engagement",
    summary: "Where AI creates real leverage in your product and operations.",
    deliverables: ["AI opportunities map", "Risk analysis", "Implementation roadmap"],
  },
  {
    icon: Compass,
    name: "Engineering Scale Blueprint",
    duration: "Strategic engagement",
    summary: "A clear path to scale delivery as the organization grows.",
    deliverables: ["Operating model", "Org recommendations", "Execution roadmap"],
  },
  {
    icon: CalendarRange,
    name: "90-Day Transformation Plan",
    duration: "90-day plan",
    summary: "A concrete first quarter of measurable technical change.",
    deliverables: ["Prioritized initiatives", "Milestones", "Leadership plan"],
  },
];

/* ── Engagement modes & delivery model (issue #47) ──────────────────────
 *
 * TRENDev advises, leads and delivers. Advisory exclusions are the scope of
 * the Advisor subscriptions, not a limit of the firm, so the copy below keeps
 * the two apart: what each engagement makes TRENDev responsible for, and how
 * delivery works when a client asks for it. Present the model accurately:
 * Julien plus trusted repeat partners, never a permanent salaried team,
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
    need: "Understand a situation or challenge a decision",
    engagement: "Bounded assessment or CTO Advisor",
    responsibility:
      "Evidence, options, recommendations and decision preparation. You keep operational ownership.",
    deliverables: ["Decision brief", "Prioritised assessment"],
    href: "/services/cto-advisor",
    cta: "CTO Advisor",
  },
  {
    need: "Keep a closer advisory rhythm across connected decisions",
    engagement: "CTO Advisor+",
    responsibility:
      "Continuing challenge, governance support and executive preparation. Still advice: no implicit transfer of delivery ownership.",
    deliverables: ["Sequenced roadmap", "Quarterly Technology Review"],
    href: "/services/cto-advisor-plus",
    cta: "CTO Advisor+",
  },
  {
    need: "Lead a transition or technology programme",
    engagement: "Fractional CTO",
    responsibility:
      "Explicitly scoped leadership, authority, coordination and follow-through.",
    deliverables: ["Transition plan", "Governance and follow-through"],
    href: "/services/fractional-cto",
    cta: "Fractional CTO",
  },
  {
    need: "Design and implement an agreed piece of work",
    engagement: "Tailored delivery engagement",
    responsibility:
      "Defined scope, delivery responsibilities, acceptance criteria and fees. Trusted partners may take part.",
    deliverables: ["Implementation scope", "Delivered, accepted work"],
    href: "/#contact",
    cta: DELIVERY_CTA_LABEL,
  },
];

/** "How we deliver": the partner model, stated without invented specifics. */
export const deliveryPrinciples: DeliveryPrinciple[] = [
  {
    icon: Compass,
    title: "Julien leads the work",
    description:
      "Julien Sié sets the technical direction and remains your senior counterpart and point of contact for the whole mission.",
  },
  {
    icon: Handshake,
    title: "Trusted, repeat partners",
    description:
      "When a mission needs more hands or specialist expertise, Julien brings in providers he has worked with repeatedly. You know who is involved and what they are responsible for.",
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
    context: "Organisation of approximately 90 engineers",
    problem:
      "A platform transformation that had to be framed as options the board could decide on.",
    work: ["Platform transformation", "Board scenarios"],
  },
  {
    context: "10 engineers across two squads",
    problem:
      "A team that needed an honest read of its technology and a structure to grow into.",
    work: [
      "Technical audit",
      "Organisation design",
      "Cloud transition",
      "Roadmap",
      "Recruitment planning",
    ],
  },
  {
    context: "SaaS service on more than 100 EC2 instances",
    problem:
      "An existing SaaS service that needed auditing and refactoring at infrastructure scale.",
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
