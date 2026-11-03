import type { Metadata } from "next";

import { ContentCard } from "@/components/content-card";
import { PageIntro } from "@/components/page-intro";
import { getBlogs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const blogs = getBlogs();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <PageIntro title="Blog" description="Writing on systems, experiments, and things I learned while building." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
