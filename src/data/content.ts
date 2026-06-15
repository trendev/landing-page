import {
  Award,
  Brain,
  Cloud,
  Code,
  Coins,
  Layers,
  Rocket,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import type {
  EngagementModel,
  Faq,
  Project,
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
      "Seasoned professionals with proven track records in leading technical teams and projects",
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

export const engagementModels: EngagementModel[] = [
  {
    title: "Fractional CTO / CTO as a Service",
    description:
      "Executive technical leadership without full-time overhead: roadmap, hiring, architecture, and investor-ready technical communication.",
  },
  {
    title: "Delivery Acceleration for Startups",
    description:
      "MVP-to-scale execution with full-stack engineering, cloud-native architecture, and DevOps automation to ship faster with less risk.",
  },
  {
    title: "Modernization for Growing Companies",
    description:
      "Upgrade legacy systems through cloud migration, reliability engineering, and AI-enabled workflows that reduce cost and increase speed.",
  },
];

export const faqs: Faq[] = [
  {
    question: "What is CTO as a Service and who needs it?",
    answer:
      "CTO as a Service gives you strategic technical leadership on-demand. It is ideal for startups and SMEs that need senior guidance on architecture, hiring, security, and roadmap execution without committing to a full-time CTO role.",
  },
  {
    question: "Can you support both strategy and implementation?",
    answer:
      "Yes. We combine executive-level consulting with hands-on delivery across full-stack development, cloud/DevOps, AI integration, and blockchain engineering.",
  },
  {
    question:
      "Do you provide smart contract development and security support?",
    answer:
      "Yes. We design and build smart contracts on major ecosystems, run security-focused reviews, and help teams improve reliability, gas efficiency, and operational safety.",
  },
  {
    question: "How quickly can we start?",
    answer:
      "Most engagements start with a free discovery call, then a short technical assessment and action plan. Initial high-priority execution can usually begin within days.",
  },
];

/** In-page navigation shared by the header and footer. */
export const navLinks = [
  { href: "#expertise", label: "Expertise" },
  { href: "#services", label: "Services" },
  { href: "#why-choose", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

/** Shared external links used across CTAs. */
export const CALENDLY_URL =
  "https://calendly.com/whyvrafvr/trendev-consult";
export const CONTACT_EMAIL =
  "mailto:contact@trendev.fr?subject=Consultation%20Request%20from%20TRENDev%20Website";
export const GITHUB_URL = "https://github.com/trendev";
