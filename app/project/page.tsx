import type { Metadata } from "next";

import { ContentCard } from "@/components/content-card";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Prototype products, hackathon systems, and automation tools.",
  alternates: { canonical: "/project" },
};

export default function ProjectIndexPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-8">
      <div className="flex max-w-2xl flex-col gap-2">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Prototype products, hackathon systems, and automation tools.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
