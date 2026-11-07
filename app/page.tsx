import Image from "next/image";
import Link from "next/link";

import { ContentCard } from "@/components/content-card";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { HomeHero } from "@/components/home-hero";
import { SkillsCard } from "@/components/skills-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { profileConfig, siteConfig } from "@/config/profile";
import { getFeaturedBlogs, getFeaturedProjects } from "@/lib/content";

export default function HomePage() {
  const projects = getFeaturedProjects(3);
  const blogs = getFeaturedBlogs(3);

  return (
    <div className="flex w-full flex-col">
      <HomeHero />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 md:gap-16 md:px-8 md:py-16">
        <section className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-semibold tracking-tight">About</CardTitle>
              <CardDescription>
                {siteConfig.name} · {siteConfig.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-muted-foreground">
              {profileConfig.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-prose leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <Image
              src={siteConfig.profileIcon}
              alt={siteConfig.name}
              width={900}
              height={900}
              className="aspect-square w-full object-cover"
              priority
            />
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold">{siteConfig.name}</CardTitle>
              <CardDescription>{siteConfig.title}</CardDescription>
            </CardHeader>
          </Card>
        </section>

        <ExperienceTimeline items={profileConfig.experience} />

        <SkillsCard groups={profileConfig.techs} />

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-semibold tracking-tight">Education</CardTitle>
              <CardDescription>Degrees and academic background.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
              {profileConfig.education.map((item, index) => (
                <div
                  key={item.credential}
                  className={`flex flex-col gap-1 py-4 ${index === 0 ? "pt-0" : ""} ${
                    index < profileConfig.education.length - 1 ? "border-b border-border/70" : "pb-0"
                  }`}
                >
                  <p className="font-medium text-foreground">{item.credential}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.school} · {item.period}
                  </p>
                  {item.note ? <p className="text-sm text-muted-foreground">{item.note}</p> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-semibold tracking-tight">Certifications</CardTitle>
              <CardDescription>Cloud credentials and competition awards.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
              {profileConfig.certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className={`flex flex-col gap-1 py-3 ${index === 0 ? "pt-0" : ""} ${
                    index < profileConfig.certifications.length - 1 ? "border-b border-border/70" : "pb-0"
                  }`}
                >
                  <p className="font-medium text-foreground">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">{cert.period}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Focus</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {profileConfig.todos.map((todo) => (
              <Card
                key={todo}
                size="sm"
                className="border-border/80 bg-card shadow-none ring-1 ring-border/70"
              >
                <CardContent className="flex flex-col gap-1.5 py-1">
                  <p className="font-medium text-foreground">{todo}</p>
                  <p className="text-sm text-muted-foreground">In progress</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Projects</h2>
            <Button variant="link" className="text-muted-foreground" nativeButton={false} render={<Link href="/project" />}>
              All projects
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Blog</h2>
            <Button variant="link" className="text-muted-foreground" nativeButton={false} render={<Link href="/blog" />}>
              All posts
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {profileConfig.versions.map((version) => (
              <Badge
                key={version.name}
                variant={version.current ? "default" : "outline"}
                className="rounded-full"
                render={<Link href={version.url} />}
              >
                {version.name}
                {version.current ? " now" : ""}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
