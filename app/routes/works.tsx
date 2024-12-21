import { Outlet } from '@remix-run/react';
import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  console.log('work layout');
  return (
    <React.Fragment>
      <div className="min-h-screen">
        {children}
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default Layout;
