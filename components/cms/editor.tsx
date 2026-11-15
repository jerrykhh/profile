"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShareLinksPanel } from "@/components/cms/share-links";
import { logoutCms, mintShareLink, preparePublication } from "@/lib/private/cms-actions";
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

function toDatetimeLocalValue(iso: string): string {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return "";
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function CmsEditor({ desk }: { desk: CmsDesk }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(desk.notes[0]?.contentId ?? "");
  const selected = useMemo(
    () => desk.notes.find((n) => n.contentId === selectedId) ?? null,
    [desk.notes, selectedId],
  );

  const [shareTitle, setShareTitle] = useState(desk.notes[0]?.title ?? "");
  const [shareAudience, setShareAudience] = useState(desk.notes[0]?.description ?? "");
  const [shareExpires, setShareExpires] = useState(
    desk.notes[0] ? toDatetimeLocalValue(desk.notes[0].expiresAt) : "",
  );
  const [sharePin, setSharePin] = useState("");
  const [includePin, setIncludePin] = useState(true);
  const [shareError, setShareError] = useState<string | null>(null);
  const [sharePending, setSharePending] = useState(false);
  const [minted, setMinted] = useState<{ path: string; url: string; store: string } | null>(null);

  const [draft, setDraft] = useState(mintDraft);
  const [encryptError, setEncryptError] = useState<string | null>(null);
  const [encryptPending, setEncryptPending] = useState(false);

  function onSelectEnvelope(contentId: string) {
    setSelectedId(contentId);
    setMinted(null);
    setShareError(null);
    const note = desk.notes.find((n) => n.contentId === contentId);
    if (!note) return;
    setShareTitle(note.title);
    setShareAudience(note.description);
    setShareExpires(toDatetimeLocalValue(note.expiresAt));
  }

  async function onMintShare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setSharePending(true);
    setShareError(null);
    setMinted(null);
    try {
      const result = await mintShareLink({
        contentId: selected.contentId,
        pin: sharePin,
        title: shareTitle,
        description: shareAudience,
        expiresAt: shareExpires,
        includePinInUrl: includePin,
      });
      if (!result.ok) {
        setShareError(result.reason);
        return;
      }
      setMinted({ path: result.sharePath, url: result.shareUrl, store: result.store });
      router.refresh();
    } catch {
      setShareError("failed");
    } finally {
      setSharePending(false);
    }
  }

  async function onEncrypt(formData: FormData) {
    setEncryptPending(true);
    setEncryptError(null);
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
        setEncryptError(result.reason);
        return;
      }
      downloadJson(`${result.contentId}.enc.json`, result.envelopeJson);
      setDraft(mintDraft());
      router.refresh();
    } catch {
      setEncryptError("failed");
    } finally {
      setEncryptPending(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-semibold tracking-tight">Create share link</CardTitle>
          <CardDescription>
            Primary CMS job: pick an encrypted file already in{" "}
            <code className="text-foreground">content/private/</code>, set PIN + left-rail meta, mint a share URL.
            Ciphertext stays in git — no re-upload. Gate still requires Enter even with{" "}
            <code className="text-foreground">?pin=</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {desk.notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No envelopes in this build yet. Use the secondary encrypt path below, commit the{" "}
              <code className="text-foreground">.enc.json</code>, redeploy, then mint a link here.
            </p>
          ) : (
            <form onSubmit={onMintShare} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Encrypted file</span>
                <select
                  value={selectedId}
                  onChange={(event) => onSelectEnvelope(event.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
                  required
                >
                  {desk.notes.map((note) => (
                    <option key={note.contentId} value={note.contentId}>
                      {note.slug} — {note.title} ({note.filename})
                    </option>
                  ))}
                </select>
              </label>

              <Separator />

              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Share meta (left module)
              </p>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Title</span>
                <input
                  value={shareTitle}
                  onChange={(event) => setShareTitle(event.target.value)}
                  required
                  maxLength={120}
                  className="rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Audience / left-rail description</span>
                <textarea
                  value={shareAudience}
                  onChange={(event) => setShareAudience(event.target.value)}
                  required
                  maxLength={500}
                  rows={3}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Expires</span>
                <input
                  type="datetime-local"
                  value={shareExpires}
                  onChange={(event) => setShareExpires(event.target.value)}
                  required
                  className="rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">PIN (must match the encrypting PIN)</span>
                <input
                  value={sharePin}
                  onChange={(event) => setSharePin(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  className="rounded-lg border border-border bg-background px-3 py-2 font-mono tracking-[0.3em]"
                />
              </label>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={includePin}
                  onChange={(event) => setIncludePin(event.target.checked)}
                  className="mt-1"
                />
                <span>
                  Prefill PIN in the share URL (<code className="text-foreground">?pin=</code>). Enter is still
                  required; first request may appear in access logs.
                </span>
              </label>

              {shareError ? (
                <p className="text-sm text-destructive">
                  Could not mint link ({shareError}
                  {shareError === "bad_pin" ? " — PIN does not match this envelope" : ""}).
                </p>
              ) : null}

              <Button type="submit" disabled={sharePending || !selected}>
                {sharePending ? "Creating…" : "Create share link"}
              </Button>

              {minted ? (
                <div className="rounded-lg border border-border/80 bg-muted/40 px-3 py-3 text-sm">
                  <p className="font-medium text-foreground">Share link</p>
                  <p className="mt-1 break-all font-mono text-xs text-foreground">{minted.path}</p>
                  <p className="mt-1 break-all font-mono text-xs text-muted-foreground">{minted.url}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Store: {minted.store === "d1" ? "D1 publication" : "in-memory (PRIVATE_DB unbound)"}
                  </p>
                </div>
              ) : null}
            </form>
          )}
        </CardContent>
      </Card>

      <ShareLinksPanel links={desk.links} store={desk.store} />

      <details className="group rounded-xl border border-border/80 bg-card ring-1 ring-border/70 open:pb-4">
        <summary className="cursor-pointer list-none px-4 py-4 font-heading text-lg font-semibold tracking-tight">
          Optional: encrypt new markdown
          <span className="mt-1 block text-sm font-normal text-muted-foreground">
            Secondary path — download a new{" "}
            <code className="text-foreground">.enc.json</code>, commit to GitHub, then mint a link above.
          </span>
        </summary>
        <div className="px-4">
          <form action={onEncrypt} className="flex flex-col gap-4">
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
              <span className="text-muted-foreground">Title</span>
              <input name="title" required maxLength={120} className="rounded-lg border border-border bg-background px-3 py-2" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Audience / left-rail description</span>
              <textarea
                name="description"
                required
                maxLength={500}
                rows={2}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-muted-foreground">Expires</span>
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
                rows={10}
                className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
              />
            </label>
            {encryptError ? <p className="text-sm text-destructive">Could not prepare ({encryptError}).</p> : null}
            <Button type="submit" variant="outline" disabled={encryptPending}>
              {encryptPending ? "Encrypting…" : "Encrypt and download"}
            </Button>
          </form>
        </div>
      </details>

      <form action={logoutCms}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  );
}
