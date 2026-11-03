import type { Metadata } from "next";

import { ContentCard } from "@/components/content-card";
import { MotionSection } from "@/components/motion-section";
import { getBlogs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const blogs = getBlogs();

  return (
    <MotionSection className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-12 flex flex-col gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-5xl text-white md:text-6xl">Blog</h1>
        <p className="max-w-2xl text-lg text-white/65">Writing on systems, experiments, and things I learned while building.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </MotionSection>
  );
}
