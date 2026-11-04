import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem } from "@/lib/content/types";

const EXTERNAL_PLACEHOLDER = "/blog/external-placeholder.svg";

export function ContentCard({ item }: { item: ContentItem }) {
  const isExternal = item.external && Boolean(item.externalUrl);
  const cover = item.cover || (isExternal ? EXTERNAL_PLACEHOLDER : undefined);

  return (
    <Card className="h-full">
      {cover ? (
        <Image
          src={cover}
          alt=""
          width={800}
          height={500}
          unoptimized={cover.endsWith(".svg")}
          className="aspect-[16/10] w-full bg-accent object-cover"
        />
      ) : null}
      <CardHeader>
        <CardDescription>{item.date}</CardDescription>
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <CardDescription className="line-clamp-3">{item.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex flex-wrap gap-2">
        {isExternal ? <Badge variant="secondary">External</Badge> : null}
        {item.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
        <Button
          className="ms-auto"
          size="sm"
          variant="outline"
          nativeButton={false}
          render={
            <Link href={item.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} />
          }
        >
          {isExternal ? "Open" : "Read"}
        </Button>
      </CardFooter>
    </Card>
  );
}
