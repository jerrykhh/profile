import { CmsLoginForm } from "@/components/cms/login-form";

export const dynamic = "force-dynamic";

/**
 * LIVE: route shell + noindex via cms/layout.
 * STUB: readCmsSession redirect and real password verify (loginCms throws not implemented).
 */
export default function CmsLoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">CMS sign in</h1>
        <p className="text-sm text-muted-foreground">
          Single-operator login. Credentials are Worker secrets, never shipped in the frontend bundle.
        </p>
      </div>
      <CmsLoginForm />
    </div>
  );
}
