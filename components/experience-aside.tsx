import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profileConfig, siteConfig } from "@/config/profile";
import { cn } from "@/lib/utils";

/**
 * Companion for the experience timeline.
 * Exhausted: years-only strip (too thin); duplicate skills chips (clutters Skills below);
 * sticky “Now” current-role panel (shipped) — fills the empty right column without noise.
 */
const focusChips = ["DevOps/SRE", "Cloud platforms", "Next.js", "Vendor delivery"] as const;

export function ExperienceAside({ className }: { className?: string }) {
  const current = profileConfig.experience[0];
  const firstPeriod = profileConfig.experience.at(-1)?.period ?? "";
  const startYear = firstPeriod.match(/\b(20\d{2})\b/)?.[1] ?? "2021";

  return (
    <Card
      className={cn(
        "border-border/80 bg-card shadow-none ring-1 ring-border/70 lg:sticky lg:top-24",
        className,
      )}
    >
      <CardHeader className="gap-1 border-b border-border/70 pb-4">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Now
        </p>
        <CardTitle className="font-heading text-xl font-semibold tracking-tight">
          Current role
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 pt-5">
        <div className="flex items-start gap-3">
          {current.logo ? (
            <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white">
              <Image src={current.logo} alt="" width={44} height={44} className="size-full object-cover" />
            </span>
          ) : null}
          <div className="min-w-0">
            <p className="font-medium text-foreground">{current.role}</p>
            <p className="text-sm text-muted-foreground">{current.company}</p>
            <p className="mt-1 text-sm text-muted-foreground">{current.period}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{siteConfig.description}</p>

        <div className="flex flex-col gap-2 border-t border-border/70 pt-4">
          <p className="text-sm text-muted-foreground">Career span</p>
          <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            {startYear} – present
          </p>
          <p className="text-sm text-muted-foreground">{profileConfig.experience.length} roles on record</p>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-border/70 pt-4">
          <p className="text-sm text-muted-foreground">Focus</p>
          <div className="flex flex-wrap gap-2">
            {focusChips.map((chip) => (
              <Badge key={chip} variant="outline" className="rounded-full font-normal">
                {chip}
              </Badge>
            ))}
          </div>
        </div>

        <Link
          href="/ext/link"
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Get in touch →
        </Link>
      </CardContent>
    </Card>
  );
}
