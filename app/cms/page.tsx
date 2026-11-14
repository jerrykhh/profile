import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

/**
 * Editor desk shell.
 * STUB: readCmsDesk auth gate + preparePublication download flow.
 */
export default function CmsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-semibold tracking-tight">Private publication</CardTitle>
          <CardDescription>
            Scaffold only. Creating a PIN, encrypting markdown, and writing the pending D1 row are not
            implemented yet.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Planned fields: title, description, expiry datetime, 6-digit PIN, markdown. Submit will download{" "}
            <code className="text-foreground">content/private/&lt;contentId&gt;.enc.json</code> for commit.
          </p>
          <Button variant="outline" nativeButton={false} render={<Link href="/cms/login" />}>
            Back to login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
