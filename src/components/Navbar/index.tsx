import React from 'react';

import { useBaseLayoutState } from '@/contexts/BaseLayout';

import { NavDrawer } from './NavDrawer';
import { NavHeader } from './NavHeader';

export const Navbar = () => {
  const { isNavDrawerOpen, toggleNavDrawer } = useBaseLayoutState();

  return (
    <div className="flex flex-col">
      <NavHeader onToggle={toggleNavDrawer} />
      <NavDrawer isOpen={isNavDrawerOpen} />
    </div>
  );
};
