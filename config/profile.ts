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

export const siteConfig = {
  brand: "jerrykhh",
  name: "Jerry Kwok",
  title: "Software Engineer",
  location: "Hong Kong",
  url: "https://owner.bytesio.net",
  description:
    "Personal blog and portfolio of Jerry Kwok — software engineer focused on web, cloud, and serverless systems.",
  profileIcon: "/profile/icon.jpg",
} as const;

export const profileConfig = {
  nickname: "Jerry",
  headline: "Hi, I’m Jerry.",
  tagline: "Building web and cloud systems from Hong Kong.",
  intro: [
    "I am a passionate IT professional with a strong background in web development and a focus on problem-solving through programming. I hold an MSc in Information Technology from PolyU, a BSc in Computer Science from CityU, and a Higher Diploma in Software Engineering from IVE.",
    "My interest in System Design and Cloud Solution has led me to become certified in both Azure and AWS, with a current goal of attaining AWS Solution Architecture certification. I have experience building applications using the 3-tier architecture and have even developed some applications using serverless architecture.",
    "In the past, I have participated in various competitions such as Hackathons, CTF, and so on. Although I didn't win many of them, I gained a lot of experience in areas such as generating ideas, technical skills, teamwork, and more.",
  ],
  todos: [
    "AWS Certification (AWS SAA & AWS Developer)",
    "Learn Japanese",
    "Develop Microservices side project",
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
      id: "application",
      label: "Application",
      items: [
        { name: "Python", icon: "/profile/tech/python.png" },
        { name: "Java", icon: "/profile/tech/java.png" },
        { name: "TypeScript", icon: "/profile/tech/typescript.jpg" },
        { name: "JavaScript", icon: "/profile/tech/javascript.jpg" },
        { name: "Node.js", icon: "/profile/tech/node_js.png" },
        { name: "Android", icon: "/profile/tech/android.png" },
        { name: "Next.js", icon: "/profile/tech/nextjs.png" },
        { name: "React Native", icon: "/profile/tech/react_native.jpg" },
        { name: "PHP", icon: "/profile/tech/php.jpg" },
        { name: "MySQL", icon: "/profile/tech/mysql.png" },
      ],
    },
    {
      id: "others",
      label: "Others",
      items: [
        { name: "GitHub", icon: "/profile/tech/github.jpg" },
        { name: "GraphQL", icon: "/profile/tech/graphQL.png" },
        { name: "Flask", icon: "/profile/tech/flask.png" },
        { name: "Tailwind CSS", icon: "/profile/tech/tailwindcss.png" },
        { name: "AWS", icon: "/profile/tech/aws.jpg" },
        { name: "AWS CDK", icon: "/profile/tech/aws_cdk.png" },
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
