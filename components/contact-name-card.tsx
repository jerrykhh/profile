import Link from "next/link";

import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, LinkedInIcon, MailIcon, YouTubeIcon } from "@/components/social-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { extLinkConfig, profileConfig, siteConfig } from "@/config/profile";
import { glassShell } from "@/lib/glass";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconById: Record<string, IconComponent> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  email: MailIcon,
};

const socialIcons = ["github", "linkedin", "youtube", "email"].flatMap((id) => {
  const social = profileConfig.socials.find((item) => item.id === id);
  const Icon = iconById[id];
  if (!social || !Icon) return [];

  // Email icon goes home (not mailto), per Jerry.
  const href = id === "email" ? "/" : social.href;
  const external = href.startsWith("http");

  return [
    {
      id,
      label: id === "email" ? "Email — go to homepage" : social.label,
      href,
      external,
      Icon,
    },
  ];
});

export function ContactNameCard() {
  return (
    <Card
      className={cn(
        "w-full max-w-md gap-0 overflow-hidden rounded-[1.35rem] py-0 text-foreground shadow-none",
        glassShell,
      )}
    >
      <CardHeader className="items-center gap-3 px-6 pb-5 pt-8 text-center">
        <Avatar className="size-24 border border-white/60 shadow-[0_10px_30px_rgba(15,23,42,0.12)] md:size-28">
          <AvatarImage src={extLinkConfig.icon} alt={siteConfig.name} />
          <AvatarFallback>JK</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1.5">
          <CardTitle className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {siteConfig.brand}
          </CardTitle>
          <CardDescription className="text-sm text-foreground/70 md:text-base">
            {siteConfig.name} · {siteConfig.title} · {siteConfig.location}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex w-full flex-col items-center gap-5 px-6 pb-8">
        <Separator className="bg-foreground/10" />

        <Button
          size="lg"
          className="h-10 min-w-[10.5rem] rounded-full border-transparent bg-foreground px-6 text-background hover:bg-foreground/90"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Website
        </Button>

        <div className="flex w-full justify-center">
          <div
            className="inline-flex items-center justify-center gap-2.5"
            role="list"
            aria-label="Connect"
          >
            {socialIcons.map(({ id, label, href, external, Icon }) => (
              <Button
                key={id}
                size="icon"
                variant="outline"
                className={cn(
                  "size-11 shrink-0 rounded-full border-white/55 bg-white/35 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
                  "backdrop-blur-md hover:bg-white/55 hover:text-foreground",
                )}
                nativeButton={false}
                render={
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    aria-label={label}
                    role="listitem"
                  />
                }
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
