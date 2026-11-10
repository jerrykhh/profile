import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
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
import { getBlog, getBlogs } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogs().map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: `/blog/${blog.slug}`,
      images: blog.cover ? [{ url: blog.cover, alt: blog.title }] : undefined,
    },
    twitter: {
      card: blog.cover ? "summary_large_image" : "summary",
      title: blog.title,
      description: blog.description,
      images: blog.cover ? [{ url: blog.cover, alt: blog.title }] : undefined,
    },
  };
}

function BlogCrumb({ title }: { title: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/blog" />}>Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  return (
    <article className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <BackButton fallbackHref="/blog" />
        <BlogCrumb title={blog.title} />
      </div>
      <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
        {blog.cover ? (
          <Image
            src={blog.cover}
            alt={blog.title}
            width={1600}
            height={256}
            unoptimized={blog.cover.endsWith(".svg")}
            className="max-h-[256px] w-full object-cover"
            priority
          />
        ) : null}
        <CardHeader>
          <CardDescription>{blog.date}</CardDescription>
          <CardTitle className="text-3xl">{blog.title}</CardTitle>
          <CardDescription>{blog.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          {blog.external && blog.externalUrl ? (
            <Button className="w-fit" nativeButton={false} render={<Link href={blog.externalUrl} target="_blank" rel="noreferrer" />}>
              Read on LinkedIn
            </Button>
          ) : (
            <Markdown content={blog.body} />
          )}
        </CardContent>
      </Card>
    </article>
  );
}
