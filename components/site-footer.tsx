import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { profileConfig, siteConfig } from "@/config/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Separator />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm text-muted-foreground">
          {siteConfig.name}, {siteConfig.location}. © {year}
        </p>
        <div className="flex flex-wrap gap-1">
          {profileConfig.socials.map((social) => (
            <Button
              key={social.id}
              variant="link"
              nativeButton={false}
              render={
                <Link
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                />
              }
            >
              {social.label}
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
