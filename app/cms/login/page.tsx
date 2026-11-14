import { redirect } from "next/navigation";

import { CmsLoginForm } from "@/components/cms/login-form";
import { readCmsSession } from "@/lib/private/cms-desk";

export const dynamic = "force-dynamic";

export default async function CmsLoginPage() {
  if ((await readCmsSession()) === "open") redirect("/cms");
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">CMS sign in</h1>
        <p className="text-sm text-muted-foreground">
          Single-operator login. Set CMS_USERNAME and CMS_PASSWORD as Worker secrets (or .dev.vars locally).
        </p>
      </div>
      <CmsLoginForm />
    </div>
  );
}
