import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Public site chrome. CMS routes live outside this group so they can drop
 * the header and footer without nesting under a cobalt mesh.
 */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] pt-16">{children}</main>
      <SiteFooter />
    </>
  );
}
