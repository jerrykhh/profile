export type SocialLink = {
  id: string;
  label: string;
  href: string;
  username?: string;
};

export type TechGroup = {
  id: string;
  label: string;
  items: Array<{
    name: string;
    icon: string;
  }>;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  /** One short paragraph — no bullet lists. */
  summary: string;
  /** Optimized company mark under /public/profile/companies */
  logo?: string;
  link?: { label: string; href: string };
};

export type EducationItem = {
  school: string;
  credential: string;
  period: string;
  note?: string;
  /** Optimized school mark under /public/profile/schools */
  logo?: string;
};

export type CertificationItem = {
  name: string;
  period: string;
};

export const siteConfig = {
  brand: "jerrykhh",
  name: "Jerry Kwok",
  title: "Senior Software Engineer",
  location: "Hong Kong",
  url: "https://owner.bytesio.net",
  description:
    "Senior Software Engineer working across DevOps/SRE, cloud platform engineering, and hands-on application development.",
  profileIcon: "/profile/icon.jpg",
} as const;

export const profileConfig = {
  nickname: "Jerry",
  headline: "Hi, I’m Jerry.",
  tagline:
    "Senior Software Engineer at ViuTV — DevOps/SRE, cloud platforms, and customer-facing web systems.",
  intro: [
    "I work across DevOps/SRE, cloud platform engineering, and hands-on application development. I translate business and user needs into system designs, then deliver through infrastructure provisioning, software development, integration, testing, release, and production support.",
    "At ViuTV I partner with product, design, engineers, and vendors to balance delivery timelines, security, scalability, reliability, and operability. Recent work includes a zero-disruption Next.js SSR modernisation for traffic peaks above 10 million requests per hour, AWS cost reduction of about 20%, and AI-assisted delivery workflows.",
    "I hold an MSc in Information Technology (Big Data and AI) from PolyU, a BSc in Computer Science from CityU, and a Higher Diploma in Software Engineering from IVE. I am AWS Certified Solutions Architect – Associate, AWS Certified AI Practitioner, and AWS Certified Cloud Practitioner.",
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "HK Television Entertainment Co Ltd (ViuTV) · Digital Team",
      period: "Nov 2025 – Present",
      logo: "/profile/companies/viutv.png",
      summary:
        "Partner with PM/design on needs and delivery; ~20% AWS cost cut via architecture/optimisation; introduced Cursor/DevOps Agent for automation; continued DevOps/SRE + in-house web + vendor TV/mobile coordination after promotion.",
    },
    {
      role: "Software Engineer",
      company: "HK Television Entertainment Co Ltd (ViuTV) · Digital Team",
      period: "Nov 2023 – Nov 2025",
      logo: "/profile/companies/viutv.png",
      summary:
        "Designed AWS/Terraform for React→Next.js SSR (CloudFront, peaks >10M req/h); built viu.tv Next.js + Fastify APIs + MongoDB Atlas semantic search; prize-claim (Kinesis/SQS FIFO/Lambda) and voting (>200 rps) + Live/VOD reactions; AWS Identity Center/OIDC, GitHub Actions quality gates, multi-AZ ECS migrations, k6 load tests, Elemental DR; vendor QA/CNAPP (Orca); campaigns incl. Olympics 2024, National Games 2025, FIFA 2026, Chill Club, ViuTV 10th.",
      link: {
        label: "LinkedIn case study",
        href: "https://www.linkedin.com/pulse/hosting-high-traffic-nextjs-ssr-application-aws-case-study-jerry-kwok-xl5nc",
      },
    },
    {
      role: "Student Programmer",
      company: "Hospital Authority · Storage & Backup Team",
      period: "Jul 2021 – Jun 2022",
      logo: "/profile/companies/ha.png",
      summary:
        "Shell verification on AIX/RHEL/Linux; SQL Server Agent→Bash migration; ASP.NET→Flask on OpenShift; Python reporting/crawler/API gateway.",
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      school: "The Hong Kong Polytechnic University",
      credential: "MSc in Information Technology (Big Data and AI)",
      period: "Aug 2022 – May 2023",
      logo: "/profile/schools/polyu.png",
    },
    {
      school: "The City University of Hong Kong",
      credential: "BSc in Computer Science",
      period: "Sep 2020 – May 2022",
      note: "HK Tech 300, CityHack 2021, HKCERT CTF 20 & 21, UST Hackathon 2021",
      logo: "/profile/schools/cityu.png",
    },
    {
      school: "Hong Kong Institute of Vocational Education",
      credential: "Higher Diploma in Software Engineering",
      period: "Sep 2018 – May 2020",
      logo: "/profile/schools/ive.svg",
    },
  ] satisfies EducationItem[],
  certifications: [
    { name: "AWS Certified Solutions Architect – Associate", period: "Nov 2025 – Nov 2028" },
    { name: "AWS Certified AI Practitioner", period: "Sep 2025 – Sep 2028" },
    { name: "AWS Certified Cloud Practitioner", period: "Jul 2022 – Nov 2028" },
    { name: "Microsoft Certified: Azure AI Fundamentals", period: "Jun 2021" },
    { name: "Microsoft Certified: Azure Fundamentals", period: "Sep 2020" },
    { name: "CityHack 2021 — 2nd Runner Up", period: "Jan 2021" },
  ] satisfies CertificationItem[],
  todos: [
    "Deepen AI agent tooling across delivery and operations",
    "Learn Japanese",
    "Ship a microservices side project",
    "Keep learning, keep looking further",
  ],
  versions: [
    { name: "v1.0.0", url: "https://owner-v1-backup.bytesio.net/", current: false },
    { name: "v2.0.0", url: "https://profile-jerrykhh.vercel.app/", current: false },
    { name: "v3.0.0", url: "https://owner.bytesio.net/", current: false },
    { name: "v4.0.0", url: "/", current: true },
  ],
  socials: [
    {
      id: "github",
      label: "GitHub",
      username: "jerrykhh",
      href: "https://github.com/jerrykhh",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      username: "jerrykhh",
      href: "https://www.linkedin.com/in/jerrykhh/",
    },
    {
      id: "email",
      label: "Email",
      username: "jerrykwok.khh@gmail.com",
      href: "mailto:jerrykwok.khh@gmail.com",
    },
    {
      id: "youtube",
      label: "YouTube",
      username: "@jerry_kwok",
      href: "https://www.youtube.com/@jerry_kwok",
    },
  ] satisfies SocialLink[],
  techs: [
    {
      id: "languages",
      label: "Languages & apps",
      items: [
        { name: "TypeScript", icon: "/profile/tech/typescript.jpg" },
        { name: "JavaScript", icon: "/profile/tech/javascript.jpg" },
        { name: "Node.js", icon: "/profile/tech/node_js.png" },
        { name: "Python", icon: "/profile/tech/python.png" },
        { name: "PHP", icon: "/profile/tech/php.jpg" },
        { name: "Next.js", icon: "/profile/tech/nextjs.png" },
        { name: "React", icon: "/profile/tech/react.png" },
        { name: "Tailwind CSS", icon: "/profile/tech/tailwindcss.png" },
        { name: "Flask", icon: "/profile/tech/flask.png" },
        { name: "GraphQL", icon: "/profile/tech/graphQL.png" },
      ],
    },
    {
      id: "cloud",
      label: "Cloud & data",
      items: [
        { name: "AWS", icon: "/profile/tech/aws.jpg" },
        { name: "AWS CDK", icon: "/profile/tech/aws_cdk.png" },
        { name: "GitHub", icon: "/profile/tech/github.jpg" },
        { name: "MySQL", icon: "/profile/tech/mysql.png" },
      ],
    },
  ] satisfies TechGroup[],
} as const;

export const extLinkConfig = {
  intro:
    "Hey there! my little corner of the internet. When I’m not busy, you’ll find me sharing insights, inspirations, and maybe a meme or two. Drop by my socials—let’s chat!",
  prompt: "science fiction, creativity, information technology",
  icon: "/ext/link/linktr_icon.jpg",
  links: [
    { id: "website", label: "Website", href: "/" },
    ...profileConfig.socials.map((social) => ({
      id: social.id,
      label: social.label,
      href: social.href,
    })),
  ],
} as const;
