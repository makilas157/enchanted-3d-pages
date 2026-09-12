import cardWeb from "@/assets/card-web.jpg";
import cardMobile from "@/assets/card-mobile.jpg";
import cardDesign from "@/assets/card-design.jpg";
import cardCloud from "@/assets/card-cloud.jpg";
import cardData from "@/assets/card-data.jpg";
import cardCommerce from "@/assets/card-commerce.jpg";
import cardPlatform from "@/assets/card-platform.jpg";

export type CatalogItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  detail: string;
  points: string[];
};

export const services: CatalogItem[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "High-performance websites and applications built on modern, maintainable foundations.",
    image: cardWeb,
    detail:
      "We design and build web platforms that stay fast as they grow — typed codebases, sensible architecture and delivery pipelines your team can own.",
    points: [
      "React, TypeScript and modern rendering strategies",
      "Design systems and component libraries",
      "Performance, accessibility and SEO baked in",
      "CI/CD and observability from day one",
    ],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    description: "Thoughtful iOS and Android experiences from prototype through store launch.",
    image: cardMobile,
    detail:
      "From first prototype to store release, we ship mobile products that feel native, handle real-world networks and keep shipping after launch.",
    points: [
      "Prototype to production in focused cycles",
      "Native-feeling motion and interaction",
      "Offline-first and sync strategies",
      "Store submission and release management",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI & UX Design",
    description:
      "Research-led product design that makes complex workflows feel direct and intuitive.",
    image: cardDesign,
    detail:
      "We start with the work people actually do, then design the shortest path through it — clear structure, honest hierarchy, no decoration for its own sake.",
    points: [
      "Discovery, interviews and workflow mapping",
      "Information architecture and flows",
      "High-fidelity UI and interaction design",
      "Usability testing and iteration",
    ],
  },
  {
    slug: "cloud-data-ai",
    title: "Cloud, Data & AI",
    description:
      "Infrastructure, automation and applied intelligence designed around measurable value.",
    image: cardCloud,
    detail:
      "We build the plumbing behind good products: reliable infrastructure, clean data flows and AI features that solve a named problem instead of chasing a trend.",
    points: [
      "Cloud architecture and cost control",
      "Data pipelines and warehousing",
      "Applied AI, retrieval and automation",
      "Security and compliance foundations",
    ],
  },
];

export const products: CatalogItem[] = [
  {
    slug: "flowdesk",
    title: "FlowDesk",
    description: "A clear, lightweight project and task workspace for focused engineering teams.",
    image: cardPlatform,
    detail:
      "FlowDesk keeps planning close to the work: one board, one backlog, no ceremony. Built for teams who want visibility without process overhead.",
    points: [
      "Boards, sprints and lightweight roadmaps",
      "Keyboard-first navigation",
      "Git and CI integrations",
      "Team workload at a glance",
    ],
  },
  {
    slug: "pulseboard",
    title: "Pulseboard",
    description: "Live business dashboards that bring essential signals into one dependable view.",
    image: cardData,
    detail:
      "Pulseboard connects your sources and shows the handful of numbers that actually drive decisions — refreshed live, shareable with anyone.",
    points: [
      "Live connectors for common data sources",
      "Composable metric widgets",
      "Alerting on thresholds and anomalies",
      "Shareable read-only views",
    ],
  },
  {
    slug: "cartsuite",
    title: "CartSuite",
    description:
      "A fast headless commerce foundation for brands ready to own their customer experience.",
    image: cardCommerce,
    detail:
      "CartSuite gives you catalog, cart and checkout as clean APIs, so your storefront can be exactly what your brand needs.",
    points: [
      "Headless catalog, cart and checkout",
      "Multi-currency and tax handling",
      "Sub-second storefront rendering",
      "Extensible promotions engine",
    ],
  },
  {
    slug: "custom-platforms",
    title: "Custom Platforms",
    description: "Domain-specific systems built with the same product rigor as our own tools.",
    image: cardWeb,
    detail:
      "When off-the-shelf software fights your business, we build the system around your domain — and treat it like a product, not a project.",
    points: [
      "Domain modelling and discovery",
      "Internal tooling and operations portals",
      "Migration from legacy systems",
      "Long-term maintenance partnership",
    ],
  },
];

export const stats = [
  { value: "120+", label: "Projects" },
  { value: "40+", label: "Clients" },
  { value: "30+", label: "Products shipped" },
  { value: "6 yrs", label: "Building" },
];

export type Project = {
  slug: string;
  name: string;
  result: string;
  image: string;
  sector: string;
};

export const projects: Project[] = [
  {
    slug: "northwind-logistics",
    name: "Northwind Logistics",
    result: "Fleet operations portal that cut dispatch time by 38%.",
    image: cardData,
    sector: "Logistics",
  },
  {
    slug: "aurea-retail",
    name: "Aurea Retail",
    result: "Headless storefront rebuild with 2.1x faster checkout.",
    image: cardCommerce,
    sector: "Commerce",
  },
  {
    slug: "meridian-health",
    name: "Meridian Health",
    result: "Patient intake app that removed 12 manual steps per visit.",
    image: cardMobile,
    sector: "Healthcare",
  },
  {
    slug: "orbit-fintech",
    name: "Orbit Fintech",
    result: "Risk dashboard consolidating 9 data sources into one view.",
    image: cardCloud,
    sector: "Fintech",
  },
  {
    slug: "stratum-industrial",
    name: "Stratum Industrial",
    result: "Plant monitoring platform with predictive downtime alerts.",
    image: cardPlatform,
    sector: "Industrial",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "shipping-software-that-survives",
    title: "Shipping software that survives its second year",
    excerpt:
      "Most systems don't fail at launch — they fail when the team that built them moves on. Here's how we design for handover.",
    date: "2026-08-14",
    readTime: "6 min read",
    image: cardWeb,
    body: [
      "Launch day is the easiest day in a product's life. The hard part starts when the original team rotates off and someone new opens the repository for the first time.",
      "We plan for that moment from the first sprint: typed boundaries, documented decisions, and deployment paths a new engineer can follow without a guided tour.",
      "The result is boring in the best way — software that keeps getting changed instead of quietly frozen.",
    ],
  },
  {
    slug: "design-systems-that-earn-their-keep",
    title: "Design systems that earn their keep",
    excerpt:
      "A component library is only valuable when it makes the next screen faster to build. A short field guide.",
    date: "2026-07-02",
    readTime: "5 min read",
    image: cardDesign,
    body: [
      "Design systems get expensive when they become a museum. The test is simple: does the next screen take less time than the last one?",
      "We keep the token layer small, name things after intent rather than appearance, and delete components that only one page uses.",
      "That discipline keeps the system a tool instead of a tax.",
    ],
  },
  {
    slug: "applied-ai-without-the-theatre",
    title: "Applied AI without the theatre",
    excerpt:
      "Where machine intelligence genuinely pays off in business software — and where it's an expensive distraction.",
    date: "2026-05-21",
    readTime: "7 min read",
    image: cardCloud,
    body: [
      "The useful AI features in business software are unglamorous: classification, extraction, summarisation, search that understands intent.",
      "We start from a measurable task, define what good looks like, and only then pick a model. If a rule beats the model, we ship the rule.",
      "Every feature gets an evaluation harness before it gets a launch date.",
    ],
  },
  {
    slug: "the-cost-of-a-slow-checkout",
    title: "The real cost of a slow checkout",
    excerpt:
      "Performance work is commercial work. A breakdown of what latency does to revenue in commerce products.",
    date: "2026-04-09",
    readTime: "4 min read",
    image: cardCommerce,
    body: [
      "Every extra second in checkout is a measurable share of abandoned carts. Performance is not a nice-to-have; it is pricing strategy by another name.",
      "We profile the whole path — network, rendering, payment provider round trips — and fix the largest number first.",
      "The wins compound, because faster pages also cost less to serve.",
    ],
  },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/projects", label: "Projects" },
  { to: "/why-us", label: "Why Us" },
  { to: "/about", label: "About" },
  { to: "/blogs", label: "Blogs" },
] as const;

export type NavDestination = {
  slug: string;
  label: string;
  to: "/services" | "/products" | "/projects" | "/why-us" | "/about" | "/blogs" | "/contact";
  blurb: string;
};

export const navDestinations: NavDestination[] = [
  {
    slug: "services",
    label: "Services",
    to: "/services",
    blurb:
      "Web and mobile engineering, product design, cloud and AI — each discipline with its own detailed page.",
  },
  {
    slug: "products",
    label: "Products",
    to: "/products",
    blurb: "The in-house tools we built for our own work, now available to your team.",
  },
  {
    slug: "projects",
    label: "Projects",
    to: "/projects",
    blurb: "Selected work: what we shipped, the constraints we worked inside, and the outcome.",
  },
  {
    slug: "why-us",
    label: "Why Us",
    to: "/why-us",
    blurb: "How we work, what we refuse to compromise on, and why teams stay with us.",
  },
  {
    slug: "about",
    label: "About",
    to: "/about",
    blurb: "The studio, the people and the thinking behind Tevexxo.",
  },
  {
    slug: "blogs",
    label: "Blogs",
    to: "/blogs",
    blurb: "Notes on engineering, design and building products that survive contact with reality.",
  },
  {
    slug: "contact",
    label: "Contact",
    to: "/contact",
    blurb: "Tell us what you're building — we reply within one business day.",
  },
];

export const socials = [
  { name: "Instagram", handle: "@tevexxo", href: "https://instagram.com" },
  { name: "WhatsApp", handle: "Chat with us", href: "https://wa.me/10000000000" },
  { name: "Facebook", handle: "/tevexxo", href: "https://facebook.com" },
  { name: "Twitter / X", handle: "@tevexxo", href: "https://x.com" },
];
