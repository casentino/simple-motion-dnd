import { createContext, PropsWithChildren, useContext, useRef } from 'react';
import { MotionDnDContextType } from './type';

const MotionDnDContext = createContext<MotionDnDContextType | null>(null);

export function useMotionDnD() {
  const context = useContext(MotionDnDContext);
  if (!context) {
    throw new Error('useMotionDnD must be used within a MotionDnDProvider');
  }
  return context;
}

export function MotionDnDProvider({
  children,
  ...context
}: PropsWithChildren<MotionDnDContextType>) {
  const valueRef = useRef<MotionDnDContextType | null>(null);
  if (valueRef.current === null) {
    valueRef.current = context;
  }
  return (
    <MotionDnDContext.Provider value={valueRef.current}>
      {children}
    </MotionDnDContext.Provider>
  );
}
