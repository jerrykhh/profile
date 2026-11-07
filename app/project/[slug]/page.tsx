import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentCard } from "@/components/content-card";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const moreProjects = getProjects().filter((item) => item.slug !== project.slug);

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-10 md:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/project" />}>Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
        <Card className="order-2 border-border/80 bg-card shadow-none ring-1 ring-border/70 lg:order-1">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-semibold tracking-tight">Project details</CardTitle>
            <CardDescription>Notes, phases, and write-up from the project markdown.</CardDescription>
          </CardHeader>
          <CardContent>
            <Markdown content={project.body} />
          </CardContent>
        </Card>

        <aside className="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">
          <Card className="overflow-hidden border-border/80 bg-card shadow-none ring-1 ring-border/70">
            {project.cover ? (
              <Image
                src={project.cover}
                alt=""
                width={1200}
                height={720}
                className="aspect-[16/10] w-full object-cover"
                priority
              />
            ) : null}
            <CardHeader>
              <CardDescription>{project.date}</CardDescription>
              <CardTitle className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              {project.language ? (
                <p className="text-sm text-muted-foreground">
                  Language · <span className="text-foreground">{project.language}</span>
                </p>
              ) : null}
              {project.repository ? (
                <Button
                  className="w-fit"
                  nativeButton={false}
                  render={<Link href={project.repository} target="_blank" rel="noreferrer" />}
                >
                  View on GitHub
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </aside>
      </div>

      {moreProjects.length > 0 ? (
        <section className="flex flex-col gap-5 border-t border-border/70 pt-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">More projects</h2>
            <Button variant="link" className="text-muted-foreground" nativeButton={false} render={<Link href="/project" />}>
              All projects
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {moreProjects.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
