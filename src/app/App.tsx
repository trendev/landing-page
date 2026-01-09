import { useState } from "react";
import {
  ArrowRight,
  Code,
  Cloud,
  Brain,
  Network,
  Settings,
  Layers,
  Award,
  Rocket,
  Target,
  Github,
  Mail,
  X,
  Users,
  TrendingUp,
  Shield,
  Coins,
  ExternalLink,
} from "lucide-react";

interface ServiceItem {
  icon: any;
  title: string;
  description: string;
  detailedContent: {
    overview: string;
    benefits: string[];
    technologies?: string[];
  };
}

export default function App() {
  const [selectedItem, setSelectedItem] =
    useState<ServiceItem | null>(null);
  const [showConsultationModal, setShowConsultationModal] =
    useState(false);
  const [showProjectsModal, setShowProjectsModal] =
    useState(false);

  const expertise: ServiceItem[] = [
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

  const services: ServiceItem[] = [
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

  const whyChoose = [
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

  const projects = [
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
    },
    {
      name: "PoLN",
      subtitle: "Decentralized Work Protocol",
      url: "https://poln.org",
      tagline:
        "What if coordinating work didn’t require trust?",
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
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-1.5">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              <span className="text-lg sm:text-xl">
                TRENDev
              </span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#expertise"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Expertise
            </a>
            <a
              href="#services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#why-choose"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Why Us
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
          <button
            onClick={() => setShowConsultationModal(true)}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            Free Consultation
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 border border-accent/20 rounded-full mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm">
              Empowering Enterprises and Startups to Scale with
              Confidence
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 tracking-tight max-w-4xl mx-auto px-4">
            Technology solutions that drive real business value
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            From MVP to enterprise scale, we transform your
            technology challenges into competitive advantages.
            Expert engineering, cloud infrastructure, AI
            integration, and strategic leadership.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Schedule Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowProjectsModal(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 border border-border rounded-lg hover:bg-secondary transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose TRENDev */}
      <section
        id="why-choose"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
              Why Choose TRENDev
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Investing in TRENDev Consulting leads to
              measurable returns through reduced costs,
              increased efficiency, and accelerated growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl border border-border"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-primary rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section
        id="expertise"
        className="py-16 sm:py-24 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
              Our Expertise
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Strategic consulting and leadership for your
              technology initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedItem(item)}
                  className="group p-6 sm:p-8 bg-white border border-border rounded-2xl hover:border-accent hover:shadow-lg transition-all duration-300 text-left w-full"
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
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              Technical implementation and infrastructure
              solutions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-6xl mx-auto">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedItem(item)}
                  className="group p-6 sm:p-8 bg-white border border-border rounded-2xl hover:border-accent hover:shadow-lg transition-all duration-300 text-left w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
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
            })}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border px-6 sm:px-8 py-4 sm:py-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  {selectedItem.icon && (
                    <selectedItem.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                    {selectedItem.title}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 sm:px-8 py-6 sm:py-8">
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">
                  Overview
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {selectedItem.detailedContent.overview}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">
                  What We Deliver
                </h3>
                <ul className="space-y-3">
                  {selectedItem.detailedContent.benefits.map(
                    (benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3"
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                        <span className="text-muted-foreground text-sm sm:text-base">
                          {benefit}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {selectedItem.detailedContent.technologies && (
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">
                    Technologies We Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.detailedContent.technologies.map(
                      (tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-secondary text-foreground rounded-lg text-xs sm:text-sm"
                        >
                          {tech}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-border">
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setShowConsultationModal(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowConsultationModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-primary to-primary/80 px-6 sm:px-8 py-6 sm:py-8 text-white relative">
              <button
                onClick={() => setShowConsultationModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                Let's Start Your Journey
              </h2>
              <p className="text-sm sm:text-base opacity-90">
                Ready to scale your business with resilience and
                consistency or launch a disruptive new venture?
              </p>
            </div>

            <div className="px-6 sm:px-8 py-6 sm:py-8">
              <div className="mb-6">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                  At TRENDev Consulting,{" "}
                  <strong className="text-foreground">
                    we provide a complimentary initial
                    consultation
                  </strong>{" "}
                  via Google Meet to discuss your needs and
                  explore how we can support your journey.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  During this free session, we'll dive deep into
                  your technical challenges, strategic goals,
                  and growth objectives. Whether you're looking
                  to optimize your infrastructure, build a
                  high-performing team, or develop cutting-edge
                  solutions, we'll outline a clear path forward
                  tailored to your unique situation.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    No commitment required - just an honest
                    conversation about your goals
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Discuss your technical challenges and
                    strategic objectives
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Get expert insights and actionable
                    recommendations
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://calendly.com/whyvrafvr/trendev-consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 font-medium"
                >
                  Book Your Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() =>
                    setShowConsultationModal(false)
                  }
                  className="w-full px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Modal */}
      {showProjectsModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowProjectsModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-primary to-primary/80 px-6 sm:px-8 py-6 sm:py-8 text-white relative">
              <button
                onClick={() => setShowProjectsModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                Our Recent Projects
              </h2>
              <p className="text-sm sm:text-base opacity-90">
                Explore our latest open-source initiatives and
                join us in shaping the future of technology
              </p>
            </div>

            <div className="px-6 sm:px-8 py-6 sm:py-8">
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="group border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl mb-1 group-hover:text-accent transition-colors">
                          {project.name}
                        </h3>
                        {project.subtitle && (
                          <p className="text-sm text-muted-foreground">
                            {project.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-sm sm:text-base mb-2 italic text-muted-foreground">
                      {project.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-xs sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Visit Project
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technologies Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-6">
            Modern Technology Stack
          </h2>
          <p className="text-lg sm:text-xl opacity-90 mb-8 sm:mb-12 max-w-2xl mx-auto">
            We work with cutting-edge technologies to deliver
            robust, scalable solutions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              "Cloud Platforms & Blockchain",
              "AI & ML",
              "DevOps Tools",
              "Modern Frameworks",
            ].map((tech, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center min-h-[80px] sm:min-h-[100px]"
              >
                <p className="text-sm sm:text-base text-center">
                  {tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="py-16 sm:py-24 px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              Ready to scale your technology?
            </h2>
            <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your
              project and explore how we can help achieve your
              goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://calendly.com/whyvrafvr/trendev-consult"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Book via Google Meet
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@trendev.fr?subject=Consultation%20Request%20from%20TRENDev%20Website"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4" />
                Email us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              <span className="text-lg sm:text-xl">
                TRENDev
              </span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <a
                href="#expertise"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Expertise
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </a>
              <a
                href="#why-choose"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Why Us
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <a
                href="https://github.com/trendev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </nav>
          </div>
          <div className="text-center text-muted-foreground border-t border-border pt-6 sm:pt-8">
            <p className="text-sm sm:text-base">
              © 2026 TRENDev Consulting. High-end technical
              solutions for modern businesses.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}