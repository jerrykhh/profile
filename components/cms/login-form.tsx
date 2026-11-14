"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginCms } from "@/lib/private/cms-actions";
import type { CmsLoginState } from "@/lib/private/types";

const initial: CmsLoginState = { notice: "none" };

export function CmsLoginForm() {
  const [state, action, pending] = useActionState(loginCms, initial);

  return (
    <Card className="border-border/80 bg-card shadow-none ring-1 ring-border/70">
      <CardHeader>
        <CardTitle className="font-heading text-lg font-semibold tracking-tight">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
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
          {state.notice === "rejected" ? (
            <p className="text-sm text-destructive">Those credentials were not accepted.</p>
          ) : null}
          {state.notice === "rate_limited" ? (
            <p className="text-sm text-destructive">Too many attempts. Try again later.</p>
          ) : null}
          <Button type="submit" disabled={pending}>
            Enter
          </Button>
          <p className="text-xs text-muted-foreground">
            Stub: loginCms throws not implemented until Worker secrets are wired.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
