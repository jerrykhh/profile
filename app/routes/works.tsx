import { Outlet } from '@remix-run/react';
import React from 'react';

export function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="min-h-screen">
        {children}
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default WorkLayout;
