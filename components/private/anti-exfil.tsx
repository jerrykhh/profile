"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Best-effort anti-exfil deterrents. Not OS-proof.
 * - Blocks copy/cut and context menu on the shell
 * - user-select: none
 * - Soft warning on PrintScreen / visibility loss (does not stop OS screenshots)
 */
export function AntiExfilShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "PrintScreen") {
        event.preventDefault();
        // Deterrent only; OS capture may still succeed.
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className="select-none"
      onCopy={(event) => event.preventDefault()}
      onCut={(event) => event.preventDefault()}
      onContextMenu={(event) => event.preventDefault()}
      data-anti-exfil="best-effort"
    >
      {children}
    </div>
  );
}
