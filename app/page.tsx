import Image from "next/image";
import Link from "next/link";

import { ContentCard } from "@/components/content-card";

import { HeroShaderLazy } from "@/components/hero-shader-lazy";
import { LinkButton } from "@/components/link-button";
import { MotionSection } from "@/components/motion-section";
import { Badge } from "@/components/ui/badge";
import { profileConfig, siteConfig } from "@/config/profile";
import { getFeaturedBlogs, getFeaturedProjects } from "@/lib/content";

export default function HomePage() {
  const projects = getFeaturedProjects(3);
  const blogs = getFeaturedBlogs(3);

  return (
    <div>
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <HeroShaderLazy />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(13_6_11/35%)_0%,rgb(13_6_11/78%)_58%,rgb(13_6_11)_100%)]" />
        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end gap-8 px-5 pb-20 pt-28 md:px-8 md:pb-28">
          <p className="font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight text-white md:text-7xl lg:text-8xl">
            {siteConfig.brand}
          </p>
          <div className="flex max-w-2xl flex-col gap-5">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-light leading-tight text-white md:text-5xl">
              {profileConfig.headline}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{profileConfig.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/ext/link" size="lg" className="rounded-full px-6">
                Get in Touch
              </LinkButton>
              <LinkButton
                href="/project"
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-white/5 px-6 text-white hover:bg-white/10"
              >
                View Projects
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <MotionSection className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">About</h2>
            {profileConfig.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-white/75 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <Image
              src={siteConfig.profileIcon}
              alt={siteConfig.name}
              width={640}
              height={640}
              className="mb-6 aspect-square w-full rounded-2xl object-cover"
              priority
            />
            <p className="text-sm text-white/55">{siteConfig.name} · {siteConfig.location}</p>
            <p className="mt-2 text-lg text-white">{siteConfig.title}</p>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8" delay={0.05}>
        <div className="mb-10 flex flex-col gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">Tech stack</h2>
          <p className="max-w-2xl text-white/65">Languages, frameworks, and cloud tools I reach for most often.</p>
        </div>
        <div className="flex flex-col gap-10">
          {profileConfig.techs.map((group) => (
            <div key={group.id} className="flex flex-col gap-4">
              <h3 className="text-sm uppercase tracking-[0.18em] text-white/50">{group.label}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {group.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1b0e17]/80 px-3 py-3"
                  >
                    <Image src={tech.icon} alt="" width={28} height={28} className="rounded-md object-cover" />
                    <span className="text-sm text-white/85">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8" delay={0.08}>
        <div className="mb-8 flex flex-col gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">Focus</h2>
          <p className="text-white/65">Things I’m actively working toward.</p>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {profileConfig.todos.map((todo) => (
            <li key={todo} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/85">
              {todo}
            </li>
          ))}
        </ul>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8" delay={0.1}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">Projects</h2>
            <p className="text-white/65">Selected builds across serverless, automation, and product prototypes.</p>
          </div>
          <LinkButton href="/project" variant="ghost" className="rounded-full text-white hover:bg-white/10">
            All projects
          </LinkButton>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-6xl px-5 pb-28 md:px-8" delay={0.12}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">Blog</h2>
            <p className="text-white/65">Notes on architecture, computer vision, and shipping under load.</p>
          </div>
          <LinkButton href="/blog" variant="ghost" className="rounded-full text-white hover:bg-white/10">
            All posts
          </LinkButton>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {profileConfig.versions.map((version) => (
            <Badge key={version.name} variant={version.current ? "default" : "outline"} className="rounded-full">
              <Link href={version.url}>{version.name}{version.current ? " (Now)" : ""}</Link>
            </Badge>
          ))}
        </div>
      </MotionSection>
    </div>
  );
}
