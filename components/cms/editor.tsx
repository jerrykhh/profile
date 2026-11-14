"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logoutCms, preparePublication } from "@/lib/private/cms-actions";
import { mintDraft } from "@/lib/private/draft";
import type { CmsDesk } from "@/lib/private/types";

function downloadJson(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function CmsEditor({ desk }: { desk: CmsDesk }) {
  const router = useRouter();
  const [draft, setDraft] = useState(mintDraft);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    try {
      const result = await preparePublication({
        contentId: draft.contentId,
        saltB64: draft.saltB64,
        ivB64: draft.ivB64,
        slug: String(formData.get("slug") ?? ""),
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        expiresAt: String(formData.get("expiresAt") ?? ""),
        pin: String(formData.get("pin") ?? ""),
        markdown: String(formData.get("markdown") ?? ""),
      });
      if (!result.ok) {
        if (result.reason === "reused") setDraft(mintDraft());
        setError(result.reason);
        return;
      }
      downloadJson(`${result.contentId}.enc.json`, result.envelopeJson);
      setDraft(mintDraft());
      router.refresh();
    } catch {
      setError("failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-semibold tracking-tight">Create private note</CardTitle>
          <CardDescription>
            Plan A: encrypts in the Worker and downloads an envelope for{" "}
            <code className="text-foreground">content/private/</code>. Commit the file, then open{" "}
            <code className="text-foreground">/private/&lt;slug&gt;</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Slug</span>
              <input
                name="slug"
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                placeholder="viu-interview"
                className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Title (meta module)</span>
              <input name="title" required maxLength={120} className="rounded-lg border border-border bg-background px-3 py-2" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Audience / left-rail description</span>
              <input
                name="description"
                required
                maxLength={500}
                placeholder="Who this note is for — shown above the write-up on the left"
                className="rounded-lg border border-border bg-background px-3 py-2"
              />
              <span className="text-xs text-muted-foreground">
                Maps to the unlocked page left column (“Audience”), not the slim private aside.
              </span>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Expires (meta module)</span>
              <input name="expiresAt" type="datetime-local" required className="rounded-lg border border-border bg-background px-3 py-2" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">PIN (6 digits)</span>
              <input
                name="pin"
                required
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                className="rounded-lg border border-border bg-background px-3 py-2 font-mono tracking-[0.3em]"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Markdown</span>
              <textarea
                name="markdown"
                required
                rows={12}
                className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
              />
            </label>
            {error ? <p className="text-sm text-destructive">Could not prepare ({error}).</p> : null}
            <Button type="submit" disabled={pending}>
              Encrypt and download
            </Button>
          </form>
        </CardContent>
      </Card>

      {desk.notes.length > 0 ? (
        <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold tracking-tight">In this build</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            {desk.notes.map((note) => (
              <p key={note.contentId}>
                <span className="font-mono text-foreground">{note.slug}</span> · {note.title} · expires{" "}
                {note.expiresAt}
              </p>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <form action={logoutCms}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  );
}
