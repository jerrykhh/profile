'use client';

import { NavDrawer } from '../NavDrawer';
import { NavHeader } from '../NavHeader';

interface Props {
  children?: React.ReactNode;
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="w-14 bg-background border-r">
        <NavHeader onToggle={() => {}} />
        <NavDrawer open={true} />
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
