'use client';

import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

type CursorType = 'default' | 'text';

interface CursorState {
  type: CursorType;
  label: string | null;
}

interface CursorContextType {
  cursorState: CursorState;
  setCursor: (type: CursorType, label?: string | null) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorState: { type: 'default', label: null },
  setCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default', label: null });

  const setCursor = (type: CursorType, label: string | null = null) => {
    setCursorState({ type, label });
  };

  return (
    <CursorContext.Provider value={{ cursorState, setCursor }}>
      {children}
    </CursorContext.Provider>
  );
};
