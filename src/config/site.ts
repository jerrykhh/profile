export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Jerry Kwok profile",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "About",
      href: "/",
    },
    {
      title: "Project",
      href: "/project",
    },
  ],
  links: {
    github: "https://github.com/jerrykhh/profile",
    docs: "https://ui.shadcn.com",
  },
}
