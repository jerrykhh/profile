'use client';

import { createContext, useContext, useState } from 'react';

interface BaseLayoutState {
  isNavDrawerOpen: boolean;
  handleToggleNavDrawer: (isOpen: boolean) => void;
}

const initialState: BaseLayoutState = {
  isNavDrawerOpen: false,
  handleToggleNavDrawer: () => {},
};

const BaseLayoutContext = createContext<BaseLayoutState>(initialState);

export const BaseLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  const handleToggleNavDrawer = (isOpen: boolean) => {
    setIsNavDrawerOpen(isOpen);
  };

  return (
    <BaseLayoutContext.Provider
      value={{ isNavDrawerOpen, handleToggleNavDrawer }}
    >
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
