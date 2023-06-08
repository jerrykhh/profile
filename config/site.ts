export type SiteConfig = typeof siteConfig


export const siteConfig = {
  name: "Jerry Kwok Profile",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Profile",
      href: "/",
    },
    {
      title: "Project",
      href: "/project"
    },
    {
      title: "Blog",
      href: "/blog"
    }
  ],
  links: {
    github: "https://github.com/jerrykhh/profile",
    docs: "https://ui.shadcn.com",
  }
}
