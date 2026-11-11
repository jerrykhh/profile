import { CobaltHeroBackdrop } from "@/components/cobalt-hero-backdrop";

/**
 * Shared layout for home + contact so the cobalt hero mesh stays mounted
 * across navigations (avoids base-color → shader flash on route change).
 */
export default function CobaltLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative isolate">
      <CobaltHeroBackdrop />
      {children}
    </div>
  );
}
