import Image from "next/image";
import Link from "next/link";

import { ContentCard } from "@/components/content-card";
import { HeroShaderLazy } from "@/components/hero-shader-lazy";
import { LinkButton } from "@/components/link-button";
import { Badge } from "@/components/ui/badge";
import { profileConfig, siteConfig } from "@/config/profile";
import { getFeaturedBlogs, getFeaturedProjects } from "@/lib/content";

export default function HomePage() {
  const projects = getFeaturedProjects(3);
  const blogs = getFeaturedBlogs(3);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-8 md:px-8 md:py-12">
      <section className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between gap-8 rounded-[2rem] border border-border bg-card p-7 md:p-10">
          <div className="flex flex-col gap-5">
            <p className="w-fit rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground">
              {siteConfig.title} · {siteConfig.location}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              {profileConfig.headline}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{profileConfig.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/ext/link" size="lg" className="rounded-full px-6">
              Get in Touch
            </LinkButton>
            <LinkButton href="/project" size="lg" variant="outline" className="rounded-full px-6">
              View Projects
            </LinkButton>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-border">
          <HeroShaderLazy />
          <div className="relative flex h-full min-h-[320px] flex-col justify-end p-6">
            <p className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
              {siteConfig.brand}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Cloud, web, and serverless systems.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-5 rounded-[2rem] border border-border bg-card p-7 md:p-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">About</h2>
          {profileConfig.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded-[2rem] border border-border bg-card p-5">
          <Image
            src={siteConfig.profileIcon}
            alt={siteConfig.name}
            width={720}
            height={720}
            className="aspect-square w-full rounded-[1.4rem] object-cover"
            priority
          />
          <div>
            <p className="text-lg font-medium">{siteConfig.name}</p>
            <p className="text-sm text-muted-foreground">{siteConfig.title}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-border bg-card p-7 md:p-10">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Tech stack</h2>
          <p className="text-muted-foreground">Languages, frameworks, and cloud tools I reach for most often.</p>
        </div>
        <div className="flex flex-col gap-8">
          {profileConfig.techs.map((group) => (
            <div key={group.id} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-muted-foreground">{group.label}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {group.items.map((tech) => (
                  <div key={tech.name} className="flex items-center gap-3 rounded-2xl bg-secondary px-3 py-3">
                    <Image src={tech.icon} alt="" width={28} height={28} className="size-7 rounded-lg object-cover" />
                    <span className="text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {profileConfig.todos.map((todo) => (
          <div key={todo} className="rounded-3xl border border-border bg-card px-5 py-4">
            <p className="text-sm text-muted-foreground">Now</p>
            <p className="mt-1 text-base">{todo}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Projects</h2>
            <p className="mt-2 text-muted-foreground">Selected builds across serverless, automation, and prototypes.</p>
          </div>
          <Link href="/project" className="text-sm font-medium text-primary hover:underline">
            All projects
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 pb-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Blog</h2>
            <p className="mt-2 text-muted-foreground">Notes on architecture, computer vision, and shipping under load.</p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
            All posts
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {profileConfig.versions.map((version) => (
            <Badge key={version.name} variant={version.current ? "default" : "outline"} className="rounded-full">
              <Link href={version.url}>
                {version.name}
                {version.current ? " · now" : ""}
              </Link>
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
