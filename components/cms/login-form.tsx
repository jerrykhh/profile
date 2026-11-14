"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CmsLoginState } from "@/lib/private/types";

export function CmsLoginForm() {
  const [notice, setNotice] = useState<CmsLoginState["notice"]>("none");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setNotice("none");
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/cms/api/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          username: String(form.get("username") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; notice?: CmsLoginState["notice"] };
      if (data.ok) {
        window.location.assign("/cms");
        return;
      }
      setNotice(data.notice === "rate_limited" ? "rate_limited" : "rejected");
    } catch {
      setNotice("rejected");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
      <CardHeader>
        <CardTitle className="font-heading text-lg font-semibold tracking-tight">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">Username</span>
            <input
              name="username"
              autoComplete="username"
              className="rounded-lg border border-border bg-background px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="rounded-lg border border-border bg-background px-3 py-2"
              required
            />
          </label>
          {notice === "rejected" ? (
            <p className="text-sm text-destructive">Those credentials were not accepted.</p>
          ) : null}
          {notice === "rate_limited" ? (
            <p className="text-sm text-destructive">Too many attempts. Try again later.</p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Signing in…" : "Enter"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Local: set <code className="text-foreground">CMS_USERNAME</code>,{" "}
            <code className="text-foreground">CMS_PASSWORD</code>, and{" "}
            <code className="text-foreground">SESSION_KEY</code> in{" "}
            <code className="text-foreground">.dev.vars</code> (see{" "}
            <code className="text-foreground">.dev.vars.example</code>).
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
