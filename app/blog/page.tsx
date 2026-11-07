import type { Metadata } from "next";

import { ContentCard } from "@/components/content-card";
import { getBlogs } from "@/lib/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogIndexPage() {
  const blogs = getBlogs();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-8">
      <div className="flex max-w-2xl flex-col gap-2">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">Writing on systems, experiments, and things I learned while building.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
