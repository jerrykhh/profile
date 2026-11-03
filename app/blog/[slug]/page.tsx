import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LinkButton } from "@/components/link-button";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
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
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  if (blog.external && blog.externalUrl) {
    return (
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-16 md:px-8 md:py-24">
        <Link href="/blog" className="text-sm text-white/55 hover:text-white">
          ← Blog
        </Link>
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">{blog.title}</h1>
        <p className="text-white/70">{blog.description}</p>
        <LinkButton href={blog.externalUrl} target="_blank" rel="noreferrer" className="w-fit rounded-full">
          Read on LinkedIn
        </LinkButton>
      </article>
    );
  }

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-16 md:px-8 md:py-24">
      <Link href="/blog" className="text-sm text-white/55 hover:text-white">
        ← Blog
      </Link>
      <div className="flex flex-col gap-4">
        <time className="text-sm text-white/55">{blog.date}</time>
        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-white md:text-5xl">{blog.title}</h1>
        <p className="text-lg text-white/70">{blog.description}</p>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-white/20">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      {blog.cover ? (
        <Image
          src={blog.cover}
          alt={blog.title}
          width={1200}
          height={720}
          className="rounded-3xl object-cover"
          priority
        />
      ) : null}
      <Markdown content={blog.body} />
    </article>
  );
}
