import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ContentCard } from "@/components/content-card";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { HomeHero } from "@/components/home-hero";
import { SkillsCard } from "@/components/skills-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { profileConfig } from "@/config/profile";
import { getFeaturedBlogs, getFeaturedProjects } from "@/lib/content";
import { GraduationCap } from "lucide-react";

/** Exact homepage document title — do not inherit a section suffix. */
export const metadata: Metadata = {
  title: {
    absolute: "Profile | Jerry Kwok",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const projects = getFeaturedProjects(3);
  const blogs = getFeaturedBlogs(3);

  return (
    <div className="flex w-full flex-col">
      <HomeHero />

      <div className="relative z-10 bg-background [content-visibility:auto] [contain-intrinsic-size:1px_2400px]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 md:gap-16 md:px-8 md:py-16">
          <ExperienceTimeline items={profileConfig.experience} />

          <SkillsCard groups={profileConfig.techs} />

          <section className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
              <CardHeader>
                <h2 className="font-heading text-xl font-semibold tracking-tight">Education</h2>
                <CardDescription>Degrees and academic background.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                {profileConfig.education.map((item, index) => (
                  <div
                    key={item.credential}
                    className={`flex items-start gap-3 py-4 ${index === 0 ? "pt-0" : ""} ${
                      index < profileConfig.education.length - 1 ? "border-b border-border/70" : "pb-0"
                    }`}
                  >
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white p-1.5 text-foreground">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={`${item.school} logo`}
                          width={32}
                          height={32}
                          unoptimized={item.logo.endsWith(".svg")}
                          className="size-full object-contain"
                        />
                      ) : (
                        <GraduationCap className="size-4" aria-hidden />
                      )}
                    </span>
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="font-medium text-foreground">{item.credential}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.school} · {item.period}
                      </p>
                      {item.note ? <p className="text-sm text-muted-foreground">{item.note}</p> : null}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
              <CardHeader>
                <h2 className="font-heading text-xl font-semibold tracking-tight">Certifications</h2>
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
              {profileConfig.versions.map((version) => {
                const opensExternally =
                  version.url.startsWith("http://") || version.url.startsWith("https://");
                return (
                  <Badge
                    key={version.name}
                    variant={version.current ? "default" : "outline"}
                    className="rounded-full"
                    render={
                      <Link
                        href={version.url}
                        target={opensExternally ? "_blank" : undefined}
                        rel={opensExternally ? "noopener noreferrer" : undefined}
                      />
                    }
                  >
                    {version.name}
                    {version.current ? " now" : ""}
                  </Badge>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
