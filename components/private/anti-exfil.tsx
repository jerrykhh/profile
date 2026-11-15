"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Best-effort anti-exfil deterrents. Not OS-proof.
 * Ships: copy/cut preventDefault, contextmenu preventDefault, user-select:none,
 * PrintScreen keydown preventDefault (still does not stop OS/browser capture).
 * Does NOT ship: DevTools detection, debugger traps/loops, or visibility-change traps.
 */
export function preventExfilClipboard(event: { preventDefault: () => void }): void {
  event.preventDefault();
}

export function preventExfilContextMenu(event: { preventDefault: () => void }): void {
  event.preventDefault();
}

/** Returns true when PrintScreen was handled (still best-effort only). */
export function handleExfilKeyDown(event: { key: string; preventDefault: () => void }): boolean {
  if (event.key !== "PrintScreen") return false;
  event.preventDefault();
  return true;
}

export function AntiExfilShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      handleExfilKeyDown(event);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className="select-none"
      onCopy={preventExfilClipboard}
      onCut={preventExfilClipboard}
      onContextMenu={preventExfilContextMenu}
      data-anti-exfil="best-effort"
    >
      {children}
    </div>
  );
}
