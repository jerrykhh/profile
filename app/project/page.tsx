import type { Metadata } from "next";

import { ContentCard } from "@/components/content-card";
import { PageIntro } from "@/components/page-intro";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectIndexPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <PageIntro title="Projects" description="Prototype products, hackathon systems, and automation tools." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
