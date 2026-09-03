import type { FaqEntry, FaqTopic, FaqTopicId } from "@/types";

/**
 * The knowledge base behind /faq (issue: post-checkout confusion + pre-sale
 * education).
 *
 * SINGLE SOURCE OF TRUTH. The landing page renders `featuredFaqs` from this
 * same array through the same component, so the teaser and the full page can
 * never drift. There is no second copy of any question anywhere.
 *
 * CONTRACTUAL COPY. The cancellation, refund, capacity, billing and tax
 * answers restate the Terms of Service (src/data/terms/2026-09-01.ts, S4/S6/S7)
 * and the service descriptions closely and deliberately, and link out to
 * /terms#... rather than becoming a further copy that can silently drift. That
 * wording already exists in four places; this must not become a fifth that
 * contradicts a contract. Change the Terms first, never this file alone.
 *
 * SLUGS ARE PERMANENT. Each `id` is a published, shareable URL
 * (/faq#do-we-need-kubernetes). Renaming one breaks every link anyone has sent.
 * Rewording a question is fine; changing its id is not.
 *
 * Type-only imports on purpose: this module must stay free of React and of
 * lucide so it can be imported by a plain Node script later (e.g. to emit
 * structured data at build time) without dragging the app in.
 */

export const FAQ_PATH = "/faq";

/** Page copy. Lives here rather than in the component, per the repo rule. */
export const faqIntro = {
  eyebrow: "Knowledge base",
  title: "Questions & Answers",
  subtitle:
    "What a CTO actually does, when the technology is worth it, and how the advisory subscriptions work in practice.",
  metaTitle: "FAQ: fractional CTO, cloud, AI and Web3 | TRENDev",
  metaDescription:
    "Answers on the CTO role, working with a fractional CTO, technology decisions, the CTO Advisor and Advisor+ plans, billing, cancellation and getting started.",
  searchLabel: "Search questions",
  searchPlaceholder: "Search questions…",
  allTopicsLabel: "All",
  emptyHeading: "No questions match that.",
  emptyBody:
    "Try fewer words, or clear the filters. If the answer you need is not here, the fastest route is a conversation.",
  clearLabel: "Clear filters",
} as const;

/** Teaser block on the landing page (renders `featuredFaqs`). */
export const faqTeaser = {
  title: "Frequently Asked Questions",
  subtitle:
    "A few of the questions that come up most. The full knowledge base goes considerably deeper.",
  seeAllLabel: "See all questions",
} as const;

export const faqTopics: FaqTopic[] = [
  { id: "cto-role", label: "The CTO role" },
  { id: "working-together", label: "Working together" },
  { id: "technology", label: "Technology & infrastructure" },
  { id: "plans-billing", label: "Plans & billing" },
  { id: "getting-started", label: "Getting started" },
];

export const faqEntries: FaqEntry[] = [
  /* ── 1. The CTO role ─────────────────────────────────────────────────── */
  {
    id: "what-does-a-cto-do",
    topic: "cto-role",
    question: "What does a CTO actually do?",
    answer: [
      "A CTO owns the technology decisions that are expensive to reverse. Not the day to day code, and not the sprint board: the choices that set the cost of everything you build for the next two or three years.",
      "In practice that is four things. Deciding the architecture and the platform. Deciding what the engineering team should look like and who to hire. Deciding what to build in-house and what to buy. And translating between the technical reality and the commercial one for the CEO, the board and investors.",
      "A good CTO spends more time saying no than yes. Most technical failures at small companies are not bad code. They are the right solution applied to a problem the company does not have yet.",
    ],
    keywords: ["chief technology officer", "role", "responsibilities"],
    related: ["cto-vs-cpo", "do-we-need-a-cto-yet"],
  },
  {
    id: "cto-vs-cpo",
    topic: "cto-role",
    question: "CTO vs CPO: who owns what?",
    answer: [
      "The CPO owns **what** gets built and **why**. The CTO owns **how** it gets built and **whether it will hold**.",
      "The CPO answers to the market: which customers, which problem, which features, in what order. The CTO answers to reality: can this architecture carry that roadmap, what will it cost to run, what breaks first at ten times the load, how long until the team can ship it safely.",
      "The two roles are in productive tension by design. When they collapse into one person, one of the two questions stops getting asked, and it is almost always the second one.",
    ],
    keywords: ["chief product officer", "product"],
    related: ["what-is-a-cpto", "cto-vs-vp-eng-vs-em"],
  },
  {
    id: "what-is-a-cpto",
    topic: "cto-role",
    question: "What is a CPTO, and is combining the two roles a good idea?",
    answer: [
      "A CPTO is a single executive holding both product and technology. It is common below roughly thirty people, where there is not enough of either job to justify two executives.",
      "It works while the company is still finding product-market fit and speed matters more than balance. It stops working at the point where the roadmap starts writing cheques the architecture cannot cash, because the person who would push back is the same person who made the promise.",
      "The usual failure is not incompetence. It is that a CPTO under pressure defaults to whichever half of the job the CEO asks about most, and the other half quietly accumulates debt.",
    ],
    keywords: ["chief product and technology officer"],
    related: ["cto-vs-cpo"],
  },
  {
    id: "cto-vs-vp-eng-vs-em",
    topic: "cto-role",
    question: "CTO vs VP Engineering vs Engineering Manager",
    answer: ["They are three different time horizons."],
    bullets: [
      "**CTO**: two to three years out. Architecture, technology strategy, build versus buy, board-facing technical credibility.",
      "**VP Engineering**: two to three quarters out. Delivery, process, the hiring plan, whether the organisation can actually execute the roadmap.",
      "**Engineering Manager**: two to three sprints out. A team of five to eight people, their output, their growth, their unblocking.",
    ],
    keywords: ["vp eng", "engineering manager", "em", "head of engineering"],
    related: ["cto-vs-architect-vs-tech-lead", "do-we-need-a-cto-yet"],
  },
  {
    id: "cto-vs-architect-vs-tech-lead",
    topic: "cto-role",
    question: "CTO vs Enterprise Architect vs Tech Lead",
    answer: [
      "An Enterprise Architect designs how systems fit together across an organisation. It is a modelling and standards role with real authority in large companies that have many systems and long procurement cycles. Below roughly two hundred engineers it usually has nothing to bite on.",
      "A Tech Lead is a senior engineer who owns the technical direction of one team and still writes code. It is the most useful title on this list for a company under thirty people.",
      "A CTO sits above both and is accountable to the business rather than to the systems. The distinguishing test is simple: if the role's output is a diagram, it is architecture. If the output is a decision with a budget attached, it is the CTO.",
    ],
    keywords: ["enterprise architect", "tech lead", "solution architect"],
    related: ["cto-vs-vp-eng-vs-em"],
  },
  {
    id: "do-we-need-a-cto-yet",
    topic: "cto-role",
    question: "Do we need a CTO yet, or just a strong lead developer?",
    answer: [
      "If your hardest open question is “how do we build this”, you need a strong lead developer. If it is “should we build this at all, and what does it commit us to”, you need CTO judgement.",
      "Most companies under twenty people need the first far more than the second, and hire the second by mistake because the title sounds more senior.",
      "The honest answer is that many companies need CTO judgement a few hours a month and lead developer capacity full time. That gap is exactly what a fractional arrangement exists to fill. If you are not sure which side of the line you are on, that is a good thing to bring to a free consultation.",
    ],
    keywords: ["hire", "hiring", "lead developer", "first engineer"],
    related: ["full-time-vs-fractional-cto", "which-plan-fits-us"],
    featured: true,
  },
  {
    id: "full-time-vs-fractional-cto",
    topic: "cto-role",
    question: "Full-time CTO or fractional CTO: how do we choose?",
    answer: [
      "Ask how many hours a month the decisions actually take.",
      "A full-time CTO makes sense when technology is the product, when the engineering organisation is large enough that leading it is itself a full-time job, or when the role is materially board-facing every week. Below that, a full-time hire spends most of the week doing work a senior engineer or an engineering manager should be doing, at executive cost.",
      "A fractional arrangement makes sense when you need the judgement more than the presence: a handful of high-stakes decisions a month, an independent review of direction, and someone who can talk to your board without needing a translator.",
      "The comparison is not fractional versus full-time in the abstract. It is fractional now versus a full-time hire you may not yet be able to define, let alone attract. [See the advisory plans](/advisory).",
    ],
    keywords: ["part time", "interim", "cost", "salary"],
    related: ["difference-between-plans", "do-we-need-a-cto-yet"],
    featured: true,
  },
  {
    id: "what-a-fractional-cto-does-not-do",
    topic: "cto-role",
    question: "What a fractional CTO is not there to do",
    answer: [
      "Being explicit about this early prevents most disappointment later. An advisory engagement does not include:",
    ],
    bullets: [
      "Operational ownership of your systems, teams or delivery",
      "On-call duty or incident response",
      "Routine coding or hands-on implementation",
      "Sprint or project management",
      "Routine team management",
      "Unlimited code or document review",
    ],
    keywords: ["exclusions", "not included", "scope"],
    related: ["will-you-write-code", "difference-between-plans"],
  },

  /* ── 2. Working together ─────────────────────────────────────────────── */
  {
    id: "how-the-engagement-runs",
    topic: "working-together",
    question: "How does a fractional CTO engagement run, week to week?",
    answer: [
      "Two things happen on a repeating cycle: scheduled strategic sessions, and substantive advice between them.",
      "On **CTO Advisor** that is typically two strategic sessions a month plus async advice in between. On **CTO Advisor+** it is weekly or biweekly sessions, priority async, and a structured Quarterly Technology Review.",
      "Sessions are working sessions, not status updates. You bring the decision that is blocking you, we work it through, and you leave with a position you can act on. Between sessions you send the things that come up: an architecture proposal to review, a hiring shortlist, a vendor quote that smells wrong, a roadmap you want stress-tested.",
    ],
    keywords: ["cadence", "sessions", "meetings", "rhythm"],
    related: ["what-advisory-capacity-means", "difference-between-plans"],
    featured: true,
  },
  {
    id: "will-you-write-code",
    topic: "working-together",
    question: "Will you write code?",
    answer: [
      "Not under the Advisor subscriptions. Routine coding and hands-on implementation are explicitly outside their scope, and that boundary is deliberate: the value of the engagement is independent judgement, and an advisor who is also implementing loses the independence.",
      "Reading code is different from writing it. Reviewing an architecture, reading a critical module to form a view on a risk, or evaluating a technical proposal are all inside scope.",
      "If you need someone to genuinely take on execution, that is scoped as part of a [Fractional CTO engagement](/services/fractional-cto), where hands-on execution is included when explicitly agreed.",
    ],
    keywords: ["implementation", "hands on", "development", "build"],
    related: ["what-a-fractional-cto-does-not-do"],
  },
  {
    id: "working-with-your-team",
    topic: "working-together",
    question: "How do you work with our existing lead developer or agency?",
    answer: [
      "As a peer to them and an advisor to you, never as a layer above them.",
      "The failure mode to avoid is an outside advisor who undermines the person actually shipping your product. In practice that means your lead developer is in the room for architecture discussions, disagreements get resolved on the technical merits in front of you, and recommendations are things your team can carry rather than things done to them.",
      "With an outside agency the value is often sharper, because you gain someone with no stake in the size of the invoice reviewing what you are being told.",
    ],
    keywords: ["agency", "outsourcing", "team", "contractor", "freelancer"],
    related: ["we-already-have-a-cto"],
  },
  {
    id: "we-already-have-a-cto",
    topic: "working-together",
    question: "We already have a CTO. Is there still a reason to talk?",
    answer: ["Sometimes. Three situations come up repeatedly."],
    bullets: [
      "**A second opinion on a decision that is hard to reverse.** A platform migration, a rewrite, a major vendor commitment. An independent read costs a fraction of the decision.",
      "**A CTO who has not yet done the next stage.** Someone excellent at ten engineers may not have taken an organisation to fifty. Advisory support for them is cheaper and kinder than replacing them.",
      "**Board or investor due diligence.** An independent technical view carries weight that an internal one cannot.",
    ],
    keywords: ["second opinion", "due diligence", "existing cto"],
    related: ["working-with-your-team"],
  },
  {
    id: "ip-and-confidentiality",
    topic: "working-together",
    question: "Who owns the IP, and how is confidentiality handled?",
    answer: [
      "You own what you pay for. Confidentiality obligations are set out in the [Terms of Service](/terms) and run for five years.",
      "One practical rule matters more than the paperwork: **do not send credentials, access tokens, secrets or production personal data by email.** If something sensitive is central to a discussion, we agree a secure channel first.",
      "If your situation needs a specific NDA rather than the standard terms, raise it at the consultation.",
    ],
    keywords: ["nda", "intellectual property", "confidentiality", "secrets"],
  },
  {
    id: "remote-or-on-site",
    topic: "working-together",
    question: "Remote, on-site, or both?",
    answer: [
      "The Advisor subscriptions are remote by default. Sessions are video calls and async advice is written, and that is what keeps the arrangement efficient enough to be worth a few hours a month.",
      "On-site presence is a Fractional CTO matter, where cadence and location are part of the scoped engagement rather than a fixed package.",
      "Base is Serris, France, so on-site in the Paris region is straightforward when an engagement calls for it.",
    ],
    keywords: ["onsite", "office", "paris", "france", "travel", "location"],
  },
  {
    id: "how-do-we-know-it-is-working",
    topic: "working-together",
    question: "How do we know whether this is working?",
    answer: ["Ask yourself three questions after the first two months."],
    bullets: [
      "Are decisions being made faster, and are they staying made?",
      "Has anything expensive been avoided that would otherwise have gone ahead?",
      "Does your engineering team have a clearer picture of what matters this quarter?",
    ],
    keywords: ["roi", "value", "measure", "results", "outcomes"],
    related: ["how-do-i-cancel"],
  },

  /* ── 3. Technology and infrastructure ────────────────────────────────── */
  {
    id: "what-is-docker",
    topic: "technology",
    question: "What is Docker, and why does everyone use it?",
    answer: [
      "Docker packages an application together with everything it needs to run, so it behaves the same on a laptop, in a test environment and in production.",
      "The problem it solves is old and boring: software that works on one machine and fails on another because of a different library version, a different operating system, a different configuration. Containers make that whole class of problem mostly go away.",
      "**When it is the right call:** almost always, at almost any size. The cost is low and the payoff starts immediately.",
      "**When it is not:** rarely, and usually only where a specialist runtime makes containers awkward. Docker is not the decision worth agonising over. Kubernetes is.",
    ],
    keywords: ["container", "containers", "containerisation", "image"],
    related: ["what-is-kubernetes", "do-we-need-kubernetes"],
  },
  {
    id: "what-is-kubernetes",
    topic: "technology",
    question: "What is Kubernetes?",
    answer: [
      "Kubernetes runs containers across many machines and keeps them running: restarting what dies, scaling what is loaded, and rolling out new versions without downtime.",
      "It is genuinely powerful, and it is genuinely a distributed system in its own right. That second part is what teams underestimate. Running Kubernetes means someone now operates two systems: your product, and the platform underneath it.",
    ],
    keywords: ["k8s", "orchestration", "cluster"],
    related: ["do-we-need-kubernetes", "what-is-docker"],
  },
  {
    id: "do-we-need-kubernetes",
    topic: "technology",
    question: "Do we actually need Kubernetes?",
    answer: [
      "Usually not yet, and this is the single most common expensive mistake in small-company infrastructure.",
      "**When it earns its place:** many services, real scaling demands, multiple teams deploying independently, or a portability requirement you can actually name. Roughly, when you have enough engineers that a platform team is a sensible thing to have.",
      "**When it is a costly mistake:** a small team running one or two services. You will spend more engineering time operating the cluster than the cluster ever saves you, and you will have introduced an entire category of failure that your managed platform was handling for free.",
      "The uncomfortable version: teams often adopt Kubernetes because it is what the engineers want on their CV, and the business pays for it in delivery speed for two years. Working out which case you are in is a good use of a first session.",
    ],
    keywords: ["k8s", "overkill", "complexity", "platform"],
    related: ["what-is-kubernetes", "monolith-or-microservices", "cloud-costs"],
  },
  {
    id: "monolith-or-microservices",
    topic: "technology",
    question: "Monolith or microservices: which should we start with?",
    answer: [
      "Start with a monolith. Nearly always.",
      "Microservices solve an **organisational** problem, not a technical one: they let many teams deploy without coordinating with each other. If you have one team, you do not have that problem, and you have paid for network calls, distributed transactions and a debugging story that is dramatically harder.",
      "**When to split:** when teams are genuinely blocking each other on deploys, when parts of the system have wildly different scaling profiles, or when one component sits behind a compliance boundary the rest does not.",
      "The good middle path is a well-structured monolith with clean internal boundaries, so the split stays available later, at the point where you actually know where the seams are.",
    ],
    keywords: ["microservice", "modular monolith", "architecture", "services"],
    related: ["do-we-need-kubernetes", "technical-debt"],
  },
  {
    id: "cloud-costs",
    topic: "technology",
    question: "Our cloud bill keeps growing. Where does that usually come from?",
    answer: ["In roughly this order of frequency:"],
    bullets: [
      "**Nothing was ever turned off.** Test environments, old instances, orphaned volumes and snapshots.",
      "**Over-provisioning bought as insurance.** Instances sized for a load that never arrived, and never resized afterwards.",
      "**Data transfer.** Cross-region and cross-availability-zone traffic, which is invisible in architecture diagrams and very visible on the bill.",
      "**Managed services chosen without a cost model.** Convenient at prototype scale, punishing at production scale.",
      "**No cost ownership.** The bill belongs to finance, the spending decisions belong to engineering, and nobody holds both.",
    ],
    keywords: ["finops", "aws", "gcp", "azure", "spend", "bill", "budget"],
    related: ["do-we-need-kubernetes"],
  },
  {
    id: "technical-debt",
    topic: "technology",
    question: "What is technical debt, and when is it worth paying down?",
    answer: [
      "Technical debt is the gap between how your system is built and how it would be built if you were designing it for what you now know. Some of it was a deliberate trade to ship faster. Some of it accumulated because nobody had time.",
      "The distinction that matters is not old code versus new code. It is **whether the debt sits on the path of what you are about to build.** Debt in a stable, rarely touched part of the system costs you nothing and should generally be left alone.",
      "**Worth paying down:** when it is slowing down the roadmap you have already committed to, when it is a live security or reliability risk, or when it is blocking hiring because nobody wants to work in it.",
      "**Not worth paying down:** because it is untidy. A rewrite justified on aesthetics is the most expensive thing a small engineering team can do to itself.",
    ],
    keywords: ["refactor", "rewrite", "legacy", "debt"],
    related: ["monolith-or-microservices"],
  },
  {
    id: "ai-readiness",
    topic: "technology",
    question: "Are we ready to build with AI, and what does “AI readiness” mean?",
    answer: [
      "“AI readiness” mostly comes down to three unglamorous things.",
    ],
    bullets: [
      "**Do you have the data, and can you lawfully use it?** Access, quality and provenance, including whether your own terms and privacy notices actually permit the use you have in mind.",
      "**Is there a real decision or task to automate?** Ideally one where being right eighty percent of the time is already valuable, because that is broadly what these systems deliver.",
      "**Can you tell whether it is working?** An evaluation you trust, before it ships. Not a demo that impressed the room.",
    ],
    keywords: ["llm", "machine learning", "ml", "genai", "rag", "chatgpt"],
    related: ["technical-debt"],
  },
  {
    id: "how-much-security",
    topic: "technology",
    question: "How much security do we need at our stage?",
    answer: [
      "Proportionate, and mostly boring.",
      "At almost any stage the highest-value items are the same: no long-lived credentials in code or CI, multi-factor authentication everywhere, least-privilege access, dependency patching that actually happens, backups that have been restored at least once, and a written answer to “what do we do in the first hour of a breach”.",
      "That list is cheap and prevents most of what actually happens to small companies.",
      "The expensive items, penetration tests, SOC 2, ISO 27001, are usually driven by a customer or an investor rather than by risk. When they are, treat them as a sales cost and time them to the deal.",
    ],
    keywords: ["soc2", "iso 27001", "pentest", "compliance", "gdpr", "breach"],
  },
  {
    id: "when-blockchain-makes-sense",
    topic: "technology",
    question: "When does blockchain or Web3 genuinely make sense?",
    answer: [
      "When you need multiple parties who do not trust each other to agree on a shared record, and there is no acceptable neutral operator to hold it.",
      "That is a narrow condition and it is worth checking honestly, because a database with good audit logging is faster, cheaper and easier to hire for in every case where it applies.",
      "Where it genuinely does apply, the engineering demands are unforgiving. Deployed contracts are hard to change, mistakes are usually irreversible, and the security bar sits closer to aerospace than to web development.",
      "TRENDev builds in this space and will still tell you when your problem is a database problem.",
    ],
    keywords: ["web3", "smart contract", "crypto", "solidity", "ethereum", "solana"],
  },
  {
    id: "quarterly-technology-review",
    topic: "technology",
    question: "What is a Quarterly Technology Review?",
    answer: [
      "Once per quarter, a structured review of your architecture, roadmap, delivery and technical risks, concluded with prioritised written recommendations for the next quarter.",
      "It is included in **CTO Advisor+**, and it is delivered within your included monthly capacity rather than in addition to it.",
      "The point of it is cadence. Advisory conversations naturally follow whatever is urgent that week. The quarterly review is the moment where someone steps back and asks whether the direction is still right.",
    ],
    keywords: ["qtr", "review", "quarterly"],
    related: ["difference-between-plans", "what-advisory-capacity-means"],
  },

  /* ── 4. Plans and billing ────────────────────────────────────────────── */
  {
    id: "difference-between-plans",
    topic: "plans-billing",
    question:
      "What is the difference between CTO Advisor, CTO Advisor+ and Fractional CTO?",
    answer: [],
    bullets: [
      "**CTO Advisor**, €1,500 per month excluding applicable taxes. Up to 4 hours a month of advisory capacity, typically two strategic sessions, async advice between them. For founders who own execution themselves and want senior judgement reviewing direction.",
      "**CTO Advisor+**, €2,500 per month excluding applicable taxes. Up to 8 hours a month, weekly or biweekly sessions, priority async, and the Quarterly Technology Review. For companies where the technology decisions are arriving faster than one session a fortnight can absorb.",
      "**Fractional CTO**, from €6,000 per month excluding applicable taxes. Embedded leadership with ownership where scoped: transformation programmes, governance, board and investor work, due diligence, and hands-on execution when explicitly agreed. Contact only, scoped individually, never self-service.",
    ],
    keywords: ["price", "pricing", "plans", "tiers", "compare", "cost"],
    related: ["which-plan-fits-us", "what-advisory-capacity-means"],
    featured: true,
  },
  {
    id: "what-advisory-capacity-means",
    topic: "plans-billing",
    question: "What does “advisory capacity” mean in practice?",
    answer: [
      "Capacity is a boundary, not the value proposition. It defines the volume of substantive advisory work included each month.",
    ],
    bullets: [
      "It **covers** meetings, the preparation for them, substantive written advice, and architecture or document review.",
      "It **does not cover** short administrative exchanges. Scheduling, logistics and quick confirmations do not consume it.",
      "Substantive async work is accounted in 15-minute increments.",
      "Async requests are normally answered within one business day. This is not an on-call or emergency-response service.",
      "Advice goes to your designated contacts, and the number of designated contacts is not capped.",
      "Unused capacity does not roll over. Work beyond the included capacity requires explicit prior agreement or a separate scope.",
    ],
    keywords: ["hours", "capacity", "rollover", "sla", "response time"],
    related: ["more-than-the-plan-includes", "what-happens-when-i-cancel"],
  },
  {
    id: "which-plan-fits-us",
    topic: "plans-billing",
    question: "Which plan fits us?",
    answer: ["A rough guide. The free consultation exists to make it precise."],
    bullets: [
      "**CTO Advisor** if the technology decisions arrive at roughly the pace of a couple a month, you already have someone competent running delivery, and what you want is a sounding board and an independent review.",
      "**CTO Advisor+** if decisions arrive weekly, if the engineering organisation is growing, if you have board or investor conversations that need technical substance, or if you want the quarterly discipline of a structured review.",
      "**Fractional CTO** if you need someone to own something rather than advise on it: a transformation, a governance model, a due diligence process, or a turnaround.",
    ],
    keywords: ["choose", "recommend", "which one", "fit"],
    related: ["difference-between-plans", "can-i-switch-plans"],
  },
  {
    id: "why-consultation-first",
    topic: "plans-billing",
    question: "Why do I have to book a free consultation before subscribing?",
    answer: [
      "Because a subscription that starts badly wastes your money and my time.",
      "The consultation does three things. It confirms there is genuine fit. It gives me enough context that the first working session is productive rather than introductory. And it fairly often establishes that you need something other than what you were about to buy.",
      "It is free, it carries no obligation, and it is the required first step before subscribing.",
    ],
    keywords: ["consultation", "discovery call", "prerequisite", "free"],
    related: ["which-plan-fits-us"],
  },
  {
    id: "can-i-switch-plans",
    topic: "plans-billing",
    question: "Can I switch plans later?",
    answer: [
      "Yes, and one mechanical detail is worth knowing up front: the Stripe customer portal handles cancellation, invoices and payment methods, but it is deliberately not configured for plan switching.",
      "So a change of plan is handled directly. Tell me you want to move and we arrange it at a billing period boundary, so you are never paying for two at once.",
      "Moving between Advisor and Advisor+ is common. Moving to Fractional CTO is a different kind of conversation, because that engagement is scoped individually rather than bought.",
    ],
    keywords: ["upgrade", "downgrade", "change plan", "switch"],
    related: ["which-plan-fits-us", "more-than-the-plan-includes"],
  },
  {
    id: "more-than-the-plan-includes",
    topic: "plans-billing",
    question: "What if we need more than the plan includes?",
    answer: [
      "Work beyond the included capacity requires explicit prior agreement or a separate scope. It does not happen silently and it is never billed as a surprise.",
      "In practice there are three routes: move up a tier, agree a one-off scope for a specific piece of work, or move to a [Fractional CTO engagement](/services/fractional-cto) if the pattern is persistent rather than occasional.",
      "If you regularly need more than 8 hours a month, the honest recommendation is usually the third one.",
    ],
    keywords: ["overage", "extra hours", "more capacity"],
    related: ["what-advisory-capacity-means", "can-i-switch-plans"],
  },
  {
    id: "how-billing-works",
    topic: "plans-billing",
    question: "How does billing work?",
    answer: [],
    bullets: [
      "Monthly subscription, billed in advance at the start of each billing period.",
      "Each billing period is invoiced as a single charge and collected automatically through Stripe, using the payment method you registered.",
      "An invoice is issued for every billing period.",
      "Receipts, invoices and payment notifications are sent by **Stripe**, to the email address you used at checkout. TRENDev does not send billing email.",
    ],
    keywords: ["invoice", "payment", "stripe", "charge", "subscription"],
    related: ["how-vat-is-handled", "where-are-my-invoices"],
  },
  {
    id: "how-vat-is-handled",
    topic: "plans-billing",
    question: "How is VAT handled?",
    answer: [
      "All published prices are stated **excluding applicable taxes**. Where VAT or another transaction tax is due, it is added to the stated price and is payable in addition to it.",
      "The treatment depends on where your business is established and on its tax status.",
    ],
    bullets: [
      "Businesses established in **France** are charged French VAT at the applicable rate on top of the subscription price.",
      "For business customers established **outside France**, the reverse-charge mechanism or other applicable cross-border rules may apply. You are responsible for providing accurate business and tax identification information, including a valid VAT number where applicable, and for self-assessing any tax due under a reverse charge.",
    ],
    keywords: ["vat", "tax", "taxes", "tva", "reverse charge", "b2b"],
    related: ["how-billing-works"],
  },
  {
    id: "where-are-my-invoices",
    topic: "plans-billing",
    question: "Where do I find my invoices?",
    answer: [
      "In the Stripe customer portal. Sign in with the email address you used at checkout and Stripe sends you a one-time code.",
      "Every invoice is also emailed to that address by Stripe at the moment it is issued.",
      "If you need an invoice reissued with different business details, ask and it gets corrected at source rather than edited afterwards.",
    ],
    keywords: ["invoice", "receipt", "billing portal", "accounting"],
    related: ["how-billing-works", "where-is-my-receipt"],
  },
  {
    id: "how-do-i-cancel",
    topic: "plans-billing",
    question: "How do I cancel?",
    answer: [
      "In the Stripe customer portal, using the email address you used at checkout. It is one click and it does not require contacting anyone.",
      "You may cancel at any time, without penalty and without stating a reason. There is no minimum commitment period.",
    ],
    keywords: ["cancel", "cancellation", "unsubscribe", "stop", "quit", "end"],
    related: ["what-happens-when-i-cancel"],
  },
  {
    id: "what-happens-when-i-cancel",
    topic: "plans-billing",
    question: "What happens when I cancel?",
    answer: [],
    bullets: [
      "Cancellation takes effect at the **end of the current paid billing period**. The service remains available until then.",
      "Amounts already paid for the current period are **not refunded**, in whole or in part, and no prorated credit is issued.",
      "Advisory capacity you have not used by that date is forfeited and is not compensated.",
    ],
    keywords: ["refund", "cancel", "cancellation", "prorated", "credit"],
    related: ["how-do-i-cancel", "if-the-provider-is-unavailable"],
  },
  {
    id: "if-the-provider-is-unavailable",
    topic: "plans-billing",
    question: "What if you are unavailable for a period I have paid for?",
    answer: [
      "Then the capacity is carried over rather than refunded.",
      "Where the advisory capacity of a billing period is not made available for a reason attributable to TRENDev, including absence, illness or unavailability, that capacity carries over into the following billing periods, in addition to the capacity included in those periods and at no extra charge, until it has been delivered in full or you cancel.",
      "This is deliberately distinct from the forfeiture rule above. Capacity **you** chose not to use expires at the end of its period. Capacity **TRENDev** failed to make available carries over. You remain free to cancel at any time, including once you consider the carried-over capacity delivered.",
    ],
    keywords: ["holiday", "illness", "absence", "unavailable", "carry over"],
    related: ["what-happens-when-i-cancel"],
  },
  {
    id: "change-payment-method",
    topic: "plans-billing",
    question: "How do I change my payment method?",
    answer: [
      "In the Stripe customer portal, the same place as invoices and cancellation. Sign in with your checkout email address and Stripe sends a one-time code.",
      "TRENDev never sees or stores your card details. Payment data is handled entirely by Stripe.",
    ],
    keywords: ["card", "credit card", "payment method", "update card"],
    related: ["where-are-my-invoices"],
  },

  /* ── 5. Getting started ──────────────────────────────────────────────── */
  {
    id: "just-subscribed-what-now",
    topic: "getting-started",
    question: "I have just subscribed. What happens now?",
    answer: ["Three things, in this order."],
    bullets: [
      "**Share your context.** The form on your [welcome page](/welcome) walks you through it: company and stage, objectives for the next two or three quarters, team structure, current architecture and roadmap, and the concerns that matter most right now. It composes the email for you; none of it is mandatory, and partial answers are more useful than none.",
      "**Book your first working session.** It is used to agree priorities and to decide what the first month should actually move.",
      "**Bring what already exists** to that session. Architecture diagrams however rough, roadmap, org chart, known risks, a cloud cost snapshot. Do not create documents for the sake of it.",
    ],
    keywords: ["onboarding", "start", "first steps", "next steps"],
    related: ["find-my-welcome-page", "prepare-for-the-first-session"],
  },
  {
    id: "find-my-welcome-page",
    topic: "getting-started",
    question: "I closed the welcome page. How do I get back to it?",
    answer: [
      "Here: [trendev.fr/welcome](/welcome).",
      "It is deliberately kept out of search results, so it will not come up if you look for it on Google. Bookmark it, or come back to this answer, which is the permanent way back in.",
      "Nothing is lost by having closed the tab. Everything on that page is repeatable: the context form, the booking link and the billing portal.",
    ],
    keywords: ["welcome", "lost", "onboarding page", "bookmark", "after checkout"],
    related: ["just-subscribed-what-now", "where-is-my-receipt"],
  },
  {
    id: "where-is-my-receipt",
    topic: "getting-started",
    question: "Where is my receipt?",
    answer: [
      "Stripe sends it to the email address you used at checkout, along with every subsequent invoice and payment notification. TRENDev does not send billing email, so check that address rather than waiting on a message from me.",
      "You can also retrieve every invoice at any time from the Stripe customer portal, by signing in with that same address.",
    ],
    keywords: ["receipt", "confirmation", "proof of payment"],
    related: ["where-are-my-invoices"],
  },
  {
    id: "book-the-first-session",
    topic: "getting-started",
    question: "How do I book the first session?",
    answer: [
      "Through the scheduling link on your [welcome page](/welcome), which uses the same booking system as the free consultation.",
      "Pick whatever slot suits you. There is no ticket queue and no account manager in between: you are booking directly with Julien Sié.",
    ],
    keywords: ["book", "schedule", "calendly", "appointment", "first session"],
    related: ["prepare-for-the-first-session"],
  },
  {
    id: "prepare-for-the-first-session",
    topic: "getting-started",
    question: "What should I prepare for the first session?",
    answer: ["Useful, not required. Bring what exists:"],
    bullets: [
      "Architecture diagrams, however rough",
      "Roadmap or delivery plan",
      "Org or team chart",
      "Key technical decisions already taken, and why",
      "Current incidents, risks or recurring pain",
      "A cloud cost snapshot",
      "Security or compliance constraints you operate under",
      "Investor or board materials, where relevant",
    ],
    keywords: ["prepare", "preparation", "what to bring", "agenda"],
    related: ["book-the-first-session", "ip-and-confidentiality"],
  },
  {
    id: "reach-you-between-sessions",
    topic: "getting-started",
    question: "How do I reach you between sessions?",
    answer: [
      "By email, at the address on your welcome page. Substantive async advice is part of what you are paying for, not an extra.",
      "Async requests are normally answered within one business day, and priority async is part of CTO Advisor+. This is not an on-call or emergency-response service.",
      "Short administrative exchanges, scheduling and quick confirmations do not consume your advisory capacity. Substantive work does, accounted in 15-minute increments.",
    ],
    keywords: ["contact", "email", "async", "support", "response time"],
    related: ["what-advisory-capacity-means"],
  },
];

/**
 * Landing-page teaser set. Derived from the `featured` flag rather than from a
 * separate id list, so a renamed id cannot silently drop a card from the
 * landing page (there are no tests to catch that). Keep it to 4: the teaser is
 * a taste of the knowledge base, not a second copy of it.
 */
export const featuredFaqs: FaqEntry[] = faqEntries.filter(
  (entry) => entry.featured,
);

export const faqTopicLabels: Record<FaqTopicId, string> = Object.fromEntries(
  faqTopics.map((topic) => [topic.id, topic.label]),
) as Record<FaqTopicId, string>;

/** Entry count per topic, for the filter pills. Computed once, not per render. */
export const faqTopicCounts: Record<FaqTopicId, number> = faqEntries.reduce(
  (counts, entry) => {
    counts[entry.topic] = (counts[entry.topic] ?? 0) + 1;
    return counts;
  },
  {} as Record<FaqTopicId, number>,
);

export function getFaqEntry(id: string): FaqEntry | undefined {
  return faqEntries.find((entry) => entry.id === id);
}
