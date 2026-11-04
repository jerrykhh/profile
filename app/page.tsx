import Image from "next/image";
import Link from "next/link";

import { ContentCard } from "@/components/content-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileConfig, siteConfig } from "@/config/profile";
import { getFeaturedBlogs, getFeaturedProjects } from "@/lib/content";

export default function HomePage() {
  const projects = getFeaturedProjects(3);
  const blogs = getFeaturedBlogs(3);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 md:px-8 md:py-12">
      <section className="flex max-w-3xl flex-col gap-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-14">
            <AvatarImage src={siteConfig.profileIcon} alt={siteConfig.name} />
            <AvatarFallback>JK</AvatarFallback>
          </Avatar>
          <div className="flex flex-wrap gap-2">
            <Badge>{siteConfig.location}</Badge>
            <Badge variant="secondary">{siteConfig.title}</Badge>
          </div>
        </div>
        <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">{profileConfig.headline}</h1>
        <p className="text-lg text-muted-foreground">{profileConfig.tagline}</p>
        <div className="flex flex-wrap gap-2">
          <Button nativeButton={false} render={<Link href="/ext/link" />}>
            Get in Touch
          </Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/project" />}>
            View Projects
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>{siteConfig.name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-muted-foreground">
            {profileConfig.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="max-w-prose leading-relaxed">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <Image
            src={siteConfig.profileIcon}
            alt={siteConfig.name}
            width={900}
            height={900}
            className="aspect-square w-full object-cover"
            priority
          />
          <CardHeader>
            <CardTitle>{siteConfig.name}</CardTitle>
            <CardDescription>{siteConfig.title}</CardDescription>
          </CardHeader>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Tech stack</CardTitle>
          <CardDescription>Languages, frameworks, and cloud tools I use most.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={profileConfig.techs[0].id}>
            <TabsList>
              {profileConfig.techs.map((group) => (
                <TabsTrigger key={group.id} value={group.id}>
                  {group.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {profileConfig.techs.map((group) => (
              <TabsContent key={group.id} value={group.id} className="pt-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {group.items.map((tech) => (
                    <Card key={tech.name} size="sm">
                      <CardContent className="flex items-center gap-3">
                        <Image src={tech.icon} alt="" width={28} height={28} className="size-7 rounded-md object-cover" />
                        <span>{tech.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Focus</h2>
        <ItemGroup>
          {profileConfig.todos.map((todo) => (
            <Item key={todo} variant="outline">
              <ItemContent>
                <ItemTitle>{todo}</ItemTitle>
                <ItemDescription>In progress</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <Button variant="link" nativeButton={false} render={<Link href="/project" />}>
            All projects
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Blog</h2>
          <Button variant="link" nativeButton={false} render={<Link href="/blog" />}>
            All posts
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {profileConfig.versions.map((version) => (
            <Badge key={version.name} variant={version.current ? "default" : "outline"}>
              <Link href={version.url}>
                {version.name}
                {version.current ? " now" : ""}
              </Link>
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
