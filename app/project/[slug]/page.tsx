import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LinkButton } from "@/components/link-button";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { getProject, getProjects } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12 md:px-8 md:py-16">
      <Link href="/project" className="text-sm text-muted-foreground hover:text-foreground">
        ← Projects
      </Link>
      <div className="flex flex-col gap-4">
        <time className="text-sm text-muted-foreground">{project.date}</time>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        {project.repository ? (
          <LinkButton href={project.repository} target="_blank" rel="noreferrer" className="w-fit rounded-full">
            View on GitHub
          </LinkButton>
        ) : null}
      </div>
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.title}
          width={1200}
          height={720}
          className="rounded-3xl object-cover"
          priority
        />
      ) : null}
      <Markdown content={project.body} />
    </article>
  );
}
