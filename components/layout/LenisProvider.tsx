'use client';

import React, { useEffect } from 'react';
import { initLenis } from '@/lib/lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = initLenis();

    return () => {
      if (lenis && (lenis as any)._cleanup) {
        (lenis as any)._cleanup();
      }
    };
  }, []);

  return <>{children}</>;
}
