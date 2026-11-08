"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type BackButtonProps = {
  fallbackHref: string;
  label?: string;
};

export function BackButton({ fallbackHref, label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-fit gap-1.5 rounded-full"
      onClick={() => {
        if (typeof window === "undefined") {
          router.push(fallbackHref);
          return;
        }

        const referrer = document.referrer;
        const sameOrigin = Boolean(referrer) && referrer.startsWith(window.location.origin);
        if (sameOrigin || window.history.length > 1) {
          router.back();
          return;
        }

        router.push(fallbackHref);
      }}
    >
      <ArrowLeft className="size-3.5" aria-hidden />
      {label}
    </Button>
  );
}
