'use client';

import classNames from 'classnames';
import React from 'react';

import { useBaseLayoutState } from '@/contexts/BaseLayout';

import { Navbar } from '../Navbar';

interface Props {
  children?: React.ReactNode;
}

export const BaseLayout = ({ children }: Props) => {
  const { isNavDrawerOpen } = useBaseLayoutState();

  return (
    <React.Fragment>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div
          className={classNames(
            'xsOnly:hidden',
            'bg-background border-r grid min-h-screen w-auto',
            isNavDrawerOpen && 'w-[220px]'
          )}
        >
          <Navbar />
        </div>
        <div className="w-full">
          <div className="sm:container py-2">{children}</div>
        </div>
      </div>
      <div className="sm:hidden fixed w-full h-14 bottom-0 p-2 border bg-background">
        <Navbar />
      </div>
    </React.Fragment>
  );
};
