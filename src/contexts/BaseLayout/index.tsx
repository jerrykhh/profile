'use client';

import { createContext, useContext, useState } from 'react';

interface BaseLayoutState {
  isNavDrawerOpen: boolean;
  toggleNavDrawer: () => void;
}

const initialState: BaseLayoutState = {
  isNavDrawerOpen: false,
  toggleNavDrawer: () => {},
};

const BaseLayoutContext = createContext<BaseLayoutState>(initialState);

export const BaseLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setIsNavDrawerOpen(!isNavDrawerOpen);
  };

  return (
    <BaseLayoutContext.Provider value={{ isNavDrawerOpen, toggleNavDrawer }}>
      {children}
    </BaseLayoutContext.Provider>
  );
};

export const useBaseLayoutState = () => {
  const context = useContext(BaseLayoutContext);
  if (!context) {
    throw new Error(
      'useBaseLayoutState must be used within a BaseLayoutProvider'
    );
  }
  return context;
};
