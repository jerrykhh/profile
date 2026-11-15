import type { ReactNode } from "react";

import { BackButton } from "@/components/back-button";

/**
 * Shared project / private detail shell.
 * Does not accept ContentItem or markdown — callers pass slots.
 */
export function DetailFrame(props: {
  backHref: string;
  breadcrumb: ReactNode;
  main: ReactNode;
  aside: ReactNode;
}): ReactNode {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <BackButton fallbackHref={props.backHref} />
        {props.breadcrumb}
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
        <div className="order-2 lg:order-1">{props.main}</div>
        <aside className="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">{props.aside}</aside>
      </div>
    </div>
  );
}
