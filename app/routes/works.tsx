import { Outlet } from '@remix-run/react';
import React from 'react';

export function ProjectLayout({ children }: { children: React.ReactNode }) {
  console.log('project layout');
  console.log(children);
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}

export default ProjectLayout;
