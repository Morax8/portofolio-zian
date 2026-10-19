/* ============================================================
   CONTENT MODEL — single source of truth for site copy.
   Strictly typed so components stay dumb + presentational.
   ============================================================ */

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  /** Plain number, unpadded. */
  value: string;
  /** Mono label sitting above the value in the hero data row. */
  label: string;
}

export interface TechCard {
  index: string;
  /** Stable key — drives icon lookup. */
  key: "FRONTEND" | "BACKEND_DB" | "AI_DATASCI" | "INFRA_TOOLS";
  /** Display label rendered in the card. */
  label: string;
  caption: string;
  stack: string[];
}

export type ExperienceCategory =
  | "LEADERSHIP"
  | "DEVELOPMENT"
  | "LAB & SECURITY";

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  /** true → currently active role; false/undefined → past role. */
  current?: boolean;
  /** One or more tracks this role belongs to; drives the timeline filter tabs. */
  categories: ExperienceCategory[];
  tags: string[];
  /** One-line hook shown in the collapsed card. */
  summary: string;
  desc: string;
  /** Bullet achievements revealed when the card is expanded. */
  highlights: string[];
  /** Key technical impact revealed when the card is expanded. */
  impact?: string;
  /** Optional public deliverable tied to this role. */
  liveUrl?: string;
}

export interface ProjectShot {
  /** Public path, e.g. "/projects/byte/01.webp". */
  src: string;
  /** Intrinsic pixel width — lets next/image hold the aspect ratio (no CLS). */
  width: number;
  /** Intrinsic pixel height. */
  height: number;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  desc: string;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  /** Tailwind span at the lg breakpoint for the bento grid. */
  span?: string;
  /** Optional real screenshots rendered as a gallery in the detail modal.
   *  Falls back to a typographic index plate when absent. */
  screenshots?: ProjectShot[];
}

export interface ResearchItem {
  index: string;
  title: string;
  org: string;
  body: string;
  tags: string[];
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

/* ------------------------------------------------------------ */

export const PROFILE = {
  name: "ADITYA ZIANUR",
  role: "Head of R&D Division @ HMIF XVI UMN · Website Coordinator @ PPIF UMN 2026",
  /** Hero statement. Says what the work is, in one sentence. */
  headline:
    "Full-stack engineer building real-time platforms and applied ML systems.",
  /** Supporting paragraph — concrete, no adjectives doing the work. */
  lede: "I lead a five-person R&D team at HMIF XVI UMN and ship event platforms — real-time quiz systems, registration portals, company profiles — on deadlines measured in weeks. Alongside that I build predictive models, most recently a URL-lexical phishing classifier.",
  /** Current post, shown as the photo caption. */
  currentPost: "Head of R&D, HMIF XVI UMN",
  email: "adityazianurrahman@gmail.com",
  resumeHref: "/AdityaZianur_Resume.pdf",
  photo: "/foto/profile.png",
  location: "Tangerang, ID",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const STATS: Stat[] = [
  { label: "Roles held", value: "9" },
  { label: "Projects shipped", value: "9" },
  { label: "Organizations", value: "6" },
  { label: "Building since", value: "2023" },
];

export const ABOUT_PARAGRAPHS: string[] = [
  "I'm a Computer Science undergraduate at Universitas Multimedia Nusantara, operating at the intersection of full-stack web engineering and applied machine learning. My focus is turning ambiguous ideas into production systems — real-time platforms, event portals, and predictive models that hold up under load.",
  "As Head of R&D at HMIF XVI I lead a technical team of five and own the product lifecycle of student-facing apps; as Website Coordinator for INFORTA and PPIF I ship real-time quiz platforms on tight deadlines. I optimize for velocity without sacrificing structure — clean architecture, typed contracts, and deployment pipelines that don't wake me up at 3AM.",
];

export const TECH_CARDS: TechCard[] = [
  {
    index: "01",
    key: "FRONTEND",
    label: "Frontend",
    caption: "Interfaces & interaction",
    stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript"],
  },
  {
    index: "02",
    key: "BACKEND_DB",
    label: "Backend & databases",
    caption: "Services & data layers",
    stack: ["PHP", "Laravel", "Node.js", "Express.js", "MySQL", "Socket.io"],
  },
  {
    index: "03",
    key: "AI_DATASCI",
    label: "AI & data science",
    caption: "Models & analysis",
    stack: ["Python", "scikit-learn", "Pandas", "ML / DL", "Flask"],
  },
  {
    index: "04",
    key: "INFRA_TOOLS",
    label: "Infrastructure & tools",
    caption: "Ship, secure & operate",
    stack: ["Git", "VPS Deploy", "Vercel", "Kali Linux", "Docker"],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "hmif-head",
    role: "Head of R&D Division",
    org: "HMIF XVI UMN",
    period: "Nov 2025 – Present",
    current: true,
    categories: ["LEADERSHIP"],
    tags: ["Next.js", "React", "Team Lead", "Product Lifecycle"],
    summary: "Leading R&D's technical direction and a 5-person build team.",
    desc: "Lead a technical team of 5 staff to design and develop digital solutions enhancing the academic experience of Informatics students. Manage the product lifecycle of student-facing applications, from requirement gathering through deployment and maintenance.",
    highlights: [
      "Lead a technical team of 5 across design, development, and delivery.",
      "Own the full product lifecycle — requirements, deployment, and maintenance.",
      "Ship student-facing applications that improve the Informatics academic experience.",
    ],
    impact:
      "Sets the engineering standards and technical roadmap for the division.",
    liveUrl: "https://hmif.umn.ac.id",
  },
  {
    id: "hmif-member",
    role: "R&D Division Member",
    org: "HMIF UMN",
    period: "Nov 2024 – Nov 2025",
    categories: ["DEVELOPMENT"],
    tags: ["Laravel", "Web Dev", "Research"],
    summary: "Built and maintained internal organizational web applications.",
    desc: "Developed and maintained organizational web applications to support internal administrative needs. Conducted technical research to support project quality improvements and innovation strategies.",
    highlights: [
      "Developed and maintained organizational web applications for administrative needs.",
      "Ran technical research to drive quality improvements and innovation strategies.",
    ],
    impact:
      "Strengthened internal tooling reliability ahead of the R&D lead role.",
    liveUrl: "https://hmif.umn.ac.id",
  },
  {
    id: "lab-supervisor",
    role: "Former Lab Supervisor",
    org: "Informatics Laboratory UMN",
    period: "Apr 2025 – Apr 2026",
    current: false,
    categories: ["LAB & SECURITY"],
    tags: ["Cyber Security", "AI Lab", "Administration"],
    summary: "Oversaw the Cyber Security, AI, and Digital Interaction labs.",
    desc: "Managed leadership teams across Cyber Security, AI, and Digital Interaction labs; acted as the primary liaison with the Informatics Study Program. Oversaw administrative operations, workflow management, and facility procurement requests. Completed handover (sertijab) to my successor.",
    highlights: [
      "Managed leadership teams across Cyber Security, AI, and Digital Interaction labs.",
      "Served as the primary liaison with the Informatics Study Program.",
      "Handled administration, workflow management, and facility procurement.",
    ],
    impact: "Completed a clean handover (sertijab) to a successor.",
  },
  {
    id: "inforta-coord",
    role: "Website Division Coordinator",
    org: "INFORTA 2026",
    period: "Mar 2026 – May 2026",
    current: false,
    categories: ["LEADERSHIP"],
    tags: ["Express.js", "Socket.io", "Penetration Testing"],
    summary: "Coordinated INFORTA's web build and hardened it via pentesting.",
    desc: "Architected and deployed the official event website and a real-time interactive quiz platform in under one month, using Express.js and Socket.io. Conducted comprehensive penetration testing and security audits to mitigate vulnerabilities.",
    highlights: [
      "Architected and deployed the event site + real-time quiz in under a month.",
      "Built the real-time layer with Express.js and Socket.io.",
      "Ran penetration testing and security audits to close vulnerabilities.",
    ],
    impact: "Shipped a hardened, real-time platform on a one-month deadline.",
    liveUrl: "https://infortaumn.my.id",
  },
  {
    id: "ppif-coord",
    role: "Website Division Coordinator",
    org: "PPIF UMN",
    period: "Jan 2026 – Okt 2026",
    current: false,
    categories: ["LEADERSHIP"],
    tags: ["Next.js", "React", "Socket.io"],
    summary: "Directing PPIF's website and Kahoot-style quiz platform.",
    desc: "Coordinate the development of the official study program introduction website and a real-time quiz platform using Next.js (TSX) and a Kahoot-like quiz application with React, Express, and Socket.io.",
    highlights: [
      "Coordinate the study-program introduction website in Next.js (TSX).",
      "Lead a Kahoot-like real-time quiz with React, Express, and Socket.io.",
    ],
    impact:
      "Directs the web division's delivery for incoming-student onboarding.",
    liveUrl: "https://ppif.umn.ac.id",
  },
  {
    id: "fuse-coord",
    role: "Website Division Coordinator",
    org: "FUSE IGNITE 2026",
    period: "Jun 2026 – Sep 2026",
    categories: ["LEADERSHIP"],
    tags: ["Laravel", "Inertia.js", "Backend Architecture", "MySQL"],
    summary:
      "Led backend architecture for HMIF's annual sports and esports competition platform.",
    desc: "Architected and built the backend of a full-featured competition platform using Laravel 13, Inertia.js, and MySQL. Delivered a 5-step registration wizard with tiered payment verification, CAS SSO campus authentication, live single-elimination bracket with Challonge import, participant attendance tracking, and an admin CMS with audit logging. Codebase maintained at 215 tests and 908 assertions with PHPStan at maximum strictness.",
    highlights: [
      "Architected the backend with Laravel 13, MySQL 8.4, and CAS SSO integration.",
      "Built a 5-step registration wizard with tiered payment verification.",
      "Delivered live bracket system with Challonge import and attendance tracking.",
      "Maintained 215 tests / 908 assertions with PHPStan at maximum strictness.",
    ],
    impact:
      "Delivered a production-grade competition platform serving HMIF's largest annual event.",
    liveUrl: "https://fuse.umn.ac.id",
  },
  {
    id: "ppif-member",
    role: "Website Division Member",
    org: "PPIF UMN",
    period: "Mar 2025 – Aug 2025",
    categories: ["DEVELOPMENT"],
    tags: ["Next.js", "Frontend", "UI/UX"],
    summary: "Front-end build for the PPIF introduction website.",
    desc: "Collaborated in the front-end development of the official study program introduction website using Next.js. Ensured website responsiveness and cross-browser compatibility for a seamless UI/UX.",
    highlights: [
      "Built front-end features for the study-program introduction site in Next.js.",
      "Ensured responsiveness and cross-browser compatibility.",
    ],
    impact: "Delivered a seamless UI/UX across devices.",
    liveUrl: "https://ppif-2025.vercel.app",
  },
  {
    id: "byte-coord",
    role: "Website Division Coordinator",
    org: "BYTE UMN",
    period: "May 2025 – Nov 2025",
    categories: ["LEADERSHIP"],
    tags: ["Laravel", "Pusher", "Real-time"],
    summary: "Led BYTE's web division with real-time Pusher features.",
    desc: "Led the web division in developing an event website using Laravel and real-time features with the Pusher library. Coordinated development timelines and task distribution to ensure on-time delivery.",
    highlights: [
      "Led the web division building the event site in Laravel.",
      "Added real-time features via the Pusher library.",
      "Coordinated timelines and task distribution for on-time delivery.",
    ],
    impact: "Delivered the event platform on schedule under launch pressure.",
    liveUrl: "https://byteumn.com",
  },
  {
    id: "smk-strada",
    role: "Web Developer Intern",
    org: "SMK STRADA",
    period: "Jul 2023 – Dec 2023",
    categories: ["DEVELOPMENT"],
    tags: ["Laravel", "Eloquent ORM", "MySQL", "CMS"],
    summary: "Internship: built a company-profile CMS in Laravel.",
    desc: "Developed a company profile web application with a custom CMS using the Laravel framework. Utilized Laravel's Eloquent ORM to manage database queries and optimize data storage in MySQL.",
    highlights: [
      "Developed a company-profile web app with a custom Laravel CMS.",
      "Used Eloquent ORM to manage queries and optimize MySQL storage.",
    ],
    impact: "Shipped a maintainable CMS during a six-month internship.",
  },
];

/* Gapless 3-col bento: 3 featured (lg:col-span-2) cards, each immediately
   followed by a regular card, then a final row of three regulars = 12 cells.
   Keep that featured→regular pairing when editing so no column is skipped.
   Ordering intent: web builds lead (rows 1–3), S!GAP holds row 3, and the
   ML/DL/security work (phishing, loan, pentest) closes the last row. */
export const PROJECTS: Project[] = [
  {
    id: "hmif-web",
    title: "HMIF Official Website",
    tags: ["Laravel", "React", "MySQL"],
    desc: "Maintain the organization's company profile site, keeping content current and the backend stable.",
    featured: true,
    liveUrl: "https://hmif.umn.ac.id",
    span: "lg:col-span-2",
    screenshots: [
      { src: "/projects/hmif-web/01.webp", width: 1600, height: 774 },
      { src: "/projects/hmif-web/02.webp", width: 1600, height: 770 },
      { src: "/projects/hmif-web/03.webp", width: 1600, height: 770 },
      { src: "/projects/hmif-web/04.webp", width: 1600, height: 772 },
    ],
  },
  {
    id: "inforta",
    title: "INFORTA 2026 Website",
    tags: ["Next.js", "Express.js", "Socket.io"],
    desc: "Full-stack event platform with a real-time Kahoot-like quiz via Socket.io, deployed in under one month.",
    featured: false,
    liveUrl: "https://infortaumn.my.id",
    screenshots: [
      { src: "/projects/inforta/01.webp", width: 1600, height: 774 },
      { src: "/projects/inforta/02.webp", width: 1600, height: 778 },
      { src: "/projects/inforta/03.webp", width: 1600, height: 773 },
      { src: "/projects/inforta/04.webp", width: 1600, height: 779 },
    ],
  },
  {
    id: "ppif",
    title: "PPIF Website",
    tags: ["Next.js", "Express.js", "Socket.io"],
    desc: "Study program introduction website with an integrated real-time quiz platform for incoming students.",
    featured: true,
    liveUrl: "https://ppif-2025.vercel.app",
    span: "lg:col-span-2",
    screenshots: [
      { src: "/projects/ppif/01.webp", width: 1600, height: 768 },
      { src: "/projects/ppif/02.webp", width: 1600, height: 770 },
      { src: "/projects/ppif/03.webp", width: 1600, height: 765 },
      { src: "/projects/ppif/04.webp", width: 1600, height: 764 },
      { src: "/projects/ppif/05.webp", width: 1600, height: 765 },
      { src: "/projects/ppif/06.webp", width: 1600, height: 768 },
      { src: "/projects/ppif/07.webp", width: 1600, height: 764 },
    ],
  },
  {
    id: "byte",
    title: "BYTE Event Website",
    tags: ["Laravel", "Pusher", "MySQL"],
    desc: "Event website with real-time audience interaction via Pusher, optimized for concurrent traffic.",
    liveUrl: "https://byteumn.com",
    repoUrl: "https://github.com/stevjoo/byte2025",
    screenshots: [
      { src: "/projects/byte/01.webp", width: 1600, height: 766 },
      { src: "/projects/byte/02.webp", width: 1600, height: 779 },
      { src: "/projects/byte/03.webp", width: 1600, height: 763 },
      { src: "/projects/byte/04.webp", width: 1600, height: 769 },
      { src: "/projects/byte/05.webp", width: 1600, height: 769 },
    ],
  },
  {
    id: "sigap",
    title: "S!GAP — AI Emergency Dispatcher",
    tags: ["Kotlin", "Jetpack Compose", "Socket.io", "Gemini AI"],
    desc: "Voice-first Android SOS app: hold to speak and an AI dispatcher gives first-aid, auto-grabs GPS, finds the nearest hospital, and places the call hands-free. Built for GH 7.0.",
    featured: true,
    liveUrl: "https://github.com/Morax8/GH7/raw/main/release/SIGAP.apk",
    repoUrl: "https://github.com/Morax8/GH7",
    span: "lg:col-span-2",
  },
  {
    id: "cms",
    title: "Company Profile CMS",
    tags: ["Laravel", "Eloquent ORM", "MySQL"],
    desc: "Company profile web app with a custom Laravel CMS built during internship at SMK STRADA.",
  },
  {
    id: "phishing",
    title: "Phishing Website Detection",
    tags: ["Python", "Machine Learning", "Deep Learning"],
    desc: "ML classifier leveraging URL lexical features to detect phishing sites, using an ensemble-based approach.",
    repoUrl: "https://github.com/Morax8/FinalProjectML",
  },

  {
    id: "pentest",
    title: "HMIF Penetration Testing",
    tags: ["Kali Linux", "dirb", "whatweb"],
    desc: "Security assessment of the HMIF website using web enumeration and reconnaissance tools.",
  },
  {
    id: "fuse",
    title: "FUSE IGNITE 2026",
    tags: ["Laravel", "Inertia.js", "MySQL", "CAS SSO"],
    desc: "Full-featured competition platform with 5-step registration, tiered payment verification, live bracket with Challonge import, and admin CMS. 215 tests at PHPStan max strictness.",
    liveUrl: "https://fuse.umn.ac.id",
    screenshots: [
      { src: "/projects/fuse/01.webp", width: 1906, height: 916 },
      { src: "/projects/fuse/02.webp", width: 1908, height: 920 },
      { src: "/projects/fuse/03.webp", width: 1905, height: 923 },
      { src: "/projects/fuse/04.webp", width: 1907, height: 920 },
      { src: "/projects/fuse/05.webp", width: 1901, height: 910 },
      { src: "/projects/fuse/06.webp", width: 1911, height: 931 },
      { src: "/projects/fuse/07.webp", width: 1908, height: 914 },
      { src: "/projects/fuse/08.webp", width: 1907, height: 907 },
    ],
  },
];

export const RESEARCH: ResearchItem[] = [
  {
    index: "01",
    title: "Informatics Laboratory — UMN",
    org: "LAB OPERATIONS · COMPLETED",
    body: "Supervised leadership teams across the Cyber Security, AI, and Digital Interaction labs and served as primary liaison with the Informatics Study Program — overseeing administrative operations, workflow, and facility procurement before completing the handover (sertijab).",
    tags: ["Cyber Security", "AI Lab", "Lab Operations"],
  },
  {
    index: "02",
    title: "Predictive ML — Phishing Detection",
    org: "APPLIED RESEARCH",
    body: "Built a predictive machine-learning classifier that detects phishing websites from lexical features extracted from URLs, using an ensemble-based approach — a lightweight, network-independent classification method.",
    tags: ["Lexical Features", "Ensemble", "URL Analysis"],
  },
];

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    handle: "@Morax8",
    href: "https://github.com/Morax8",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "Aditya Zianur",
    href: "https://www.linkedin.com/in/aditya-zianur/",
    icon: "linkedin",
  },
  {
    label: "Email",
    handle: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: "mail",
  },
];
