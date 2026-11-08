import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Separator />
      <div className="mx-auto flex w-full max-w-6xl px-4 py-8 md:px-8">
        <p className="text-sm text-muted-foreground">
          {siteConfig.name}, {siteConfig.location}. © {year}
        </p>
      </div>
    </footer>
  );
}
