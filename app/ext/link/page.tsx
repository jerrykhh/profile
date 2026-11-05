import type { Metadata } from "next";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { extLinkConfig, siteConfig } from "@/config/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: extLinkConfig.intro,
};

export default function ExtLinkPage() {
  return (
    <div className="mx-auto flex w-full max-w-md px-4 py-10">
      <Card className="w-full">
        <CardHeader className="items-center text-center">
          <Avatar className="size-28">
            <AvatarImage src={extLinkConfig.icon} alt={siteConfig.name} />
            <AvatarFallback>JK</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{siteConfig.brand}</CardTitle>
          <CardDescription>{extLinkConfig.intro}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-center text-sm text-muted-foreground">{extLinkConfig.prompt}</p>
          {extLinkConfig.links.map((link) => (
            <Button
              key={link.id}
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={
                <Link
                  href={link.href}
                  target={link.href.startsWith("/") ? undefined : "_blank"}
                  rel={link.href.startsWith("/") ? undefined : "noreferrer"}
                />
              }
            >
              {link.label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
