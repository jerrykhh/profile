import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExperienceItem } from "@/config/profile";
import { cn } from "@/lib/utils";

type ExperienceTimelineProps = {
  items: readonly ExperienceItem[];
  className?: string;
};

export function ExperienceTimeline({ items, className }: ExperienceTimelineProps) {
  return (
    <Card className={cn("border-border/80 bg-card shadow-none ring-1 ring-border/70", className)}>
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/70 pb-4">
        <CardTitle className="font-heading text-xl font-semibold tracking-tight">Experience</CardTitle>
        <span className="text-sm text-muted-foreground">{items.length} roles</span>
      </CardHeader>
      <CardContent className="pt-2">
        <ol className="relative ms-4 border-s border-border/80">
          {items.map((job, index) => {
            const latest = index === 0;
            return (
              <li key={`${job.role}-${job.period}`} className="relative py-6 ps-10 first:pt-4 last:pb-2">
                {/* Node centered on the vertical border via -translate-x-1/2 */}
                <span className="absolute start-0 top-7 flex size-9 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border border-border bg-white text-foreground shadow-sm dark:border-border dark:bg-white">
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      alt=""
                      width={36}
                      height={36}
                      className="size-full object-cover"
                    />
                  ) : (
                    <BriefcaseBusiness className="size-4" aria-hidden />
                  )}
                </span>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-base font-semibold tracking-tight md:text-lg">
                      {job.role}
                    </h3>
                    {latest ? (
                      <Badge
                        variant="secondary"
                        className="rounded-full border border-border/80 bg-muted font-normal text-foreground"
                      >
                        Latest
                      </Badge>
                    ) : null}
                  </div>
                  <p className="text-sm font-medium text-foreground/85">{job.company}</p>
                  <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock3 className="size-3.5 shrink-0" aria-hidden />
                    <span>{job.period}</span>
                  </p>

                  <p className="text-justify text-sm leading-relaxed text-muted-foreground">
                    {job.summary}
                  </p>
                  {job.link ? (
                    <Link
                      href={job.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      {job.link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
