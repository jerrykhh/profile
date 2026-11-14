"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
            Encrypts on the Worker and downloads a Plan A envelope for{" "}
            <code className="text-foreground">content/private/</code>. Commit it, deploy, then open{" "}
            <code className="text-foreground">/private/&lt;slug&gt;</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit} className="flex flex-col gap-5">
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Unlocked left meta module
              </p>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Title</span>
                <input
                  name="title"
                  required
                  maxLength={120}
                  placeholder="Hello interviewer"
                  className="rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Audience / left-rail description</span>
                <textarea
                  name="description"
                  required
                  maxLength={500}
                  rows={3}
                  placeholder="Who this note is for — shown under Audience on the left"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <span className="text-xs text-muted-foreground">
                  Shown in the unlocked page left column (“Audience”), above the write-up — not the slim right aside.
                </span>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Expires</span>
                <input
                  name="expiresAt"
                  type="datetime-local"
                  required
                  className="rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
            </div>

            <Separator />

            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Access + body
              </p>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Slug (URL /private/…)</span>
                <input
                  name="slug"
                  required
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  placeholder="viu-interview"
                  className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
                />
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
                <span className="text-muted-foreground">Markdown write-up</span>
                <textarea
                  name="markdown"
                  required
                  rows={12}
                  placeholder="# Notes&#10;&#10;Body shown under Write-up on the left."
                  className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
                />
              </label>
            </div>

            {error ? <p className="text-sm text-destructive">Could not prepare ({error}).</p> : null}
            <Button type="submit" disabled={pending}>
              {pending ? "Encrypting…" : "Encrypt and download"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {desk.notes.length > 0 ? (
        <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold tracking-tight">In this build</CardTitle>
            <CardDescription>Envelopes already committed under content/private/.</CardDescription>
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
