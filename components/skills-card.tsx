import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TechGroup } from "@/config/profile";
import { cn } from "@/lib/utils";

type SkillsCardProps = {
  groups: readonly TechGroup[];
  className?: string;
};

export function SkillsCard({ groups, className }: SkillsCardProps) {
  return (
    <Card className={cn("border-border/80 bg-card shadow-none ring-1 ring-border/70", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-xl font-semibold tracking-tight">Skills</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.id} className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">{group.label}</p>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
