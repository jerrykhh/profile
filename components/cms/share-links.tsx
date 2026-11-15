"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteShareLink, disableShareLink, enableShareLink } from "@/lib/private/cms-actions";
import type { CmsShareLinkRow } from "@/lib/private/types";

export function ShareLinksPanel(props: {
  links: readonly CmsShareLinkRow[];
  store: "d1" | "memory";
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(contentId: string, action: "disable" | "enable" | "delete") {
    setBusyId(contentId);
    setError(null);
    try {
      const result =
        action === "disable"
          ? await disableShareLink(contentId)
          : action === "enable"
            ? await enableShareLink(contentId)
            : await deleteShareLink(contentId);
      if (!result.ok) {
        setError(result.reason);
        return;
      }
      router.refresh();
    } catch {
      setError("failed");
    } finally {
      setBusyId(null);
    }
  }

  async function copyUrl(link: CmsShareLinkRow) {
    try {
      await navigator.clipboard.writeText(link.shareUrl);
      setCopiedId(link.contentId);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      setError("copy_failed");
    }
  }

  return (
    <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold tracking-tight">Share links</CardTitle>
        <CardDescription>
          Minted publications ({props.store === "d1" ? "D1" : "in-memory until PRIVATE_DB is bound"}). Disable soft-blocks
          unlock; delete removes the publication row only — ciphertext stays in git.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {props.links.length === 0 ? (
          <p className="text-sm text-muted-foreground">No share links yet. Mint one above.</p>
        ) : (
          props.links.map((link) => (
            <div
              key={link.contentId}
              className="flex flex-col gap-2 rounded-lg border border-border/70 px-3 py-3 text-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-heading font-semibold tracking-tight text-foreground">{link.title}</p>
                <span
                  className={
                    link.status === "live"
                      ? "text-xs font-medium text-emerald-700 dark:text-emerald-400"
                      : link.status === "disabled"
                        ? "text-xs font-medium text-amber-700 dark:text-amber-400"
                        : "text-xs font-medium text-muted-foreground"
                  }
                >
                  {link.status}
                </span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                /private/{link.slug} · expires {link.expiresAt}
              </p>
              <p className="break-all font-mono text-xs text-foreground">{link.shareUrl}</p>
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => void copyUrl(link)}>
                  {copiedId === link.contentId ? "Copied" : "Copy URL"}
                </Button>
                {link.status === "disabled" ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={busyId === link.contentId}
                    onClick={() => void run(link.contentId, "enable")}
                  >
                    Enable
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={busyId === link.contentId || link.status === "expired"}
                    onClick={() => void run(link.contentId, "disable")}
                  >
                    Disable
                  </Button>
                )}
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={busyId === link.contentId}
                  onClick={() => void run(link.contentId, "delete")}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
        {error ? <p className="text-sm text-destructive">Action failed ({error}).</p> : null}
      </CardContent>
    </Card>
  );
}
