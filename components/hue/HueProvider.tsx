'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface HueContextType {
  hue: number;
  setHue: (hue: number) => void;
}

const HueContext = createContext<HueContextType | undefined>(undefined);

export function HueProvider({ children }: { children: React.ReactNode }) {
  const [hue, setHueState] = useState<number>(164);

  // Initialize from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-accent-hue');
    if (saved) {
      const parsedHue = Number(saved);
      setHueState(parsedHue);
      document.documentElement.style.setProperty('--accent-h', saved);
    } else {
      document.documentElement.style.setProperty('--accent-h', '164');
    }
  }, []);

  const setHue = (newHue: number) => {
    const clampedHue = Math.min(360, Math.max(0, newHue));
    setHueState(clampedHue);
    localStorage.setItem('portfolio-accent-hue', clampedHue.toString());
    document.documentElement.style.setProperty('--accent-h', clampedHue.toString());
    
    // Dispatch custom event for footer state token or non-React components
    window.dispatchEvent(new CustomEvent('huechange', { detail: clampedHue }));
  };

  return (
    <HueContext.Provider value={{ hue, setHue }}>
      {children}
    </HueContext.Provider>
  );
}

export function useHue() {
  const context = useContext(HueContext);
  if (context === undefined) {
    throw new Error('useHue must be used within a HueProvider');
  }
  return context;
}
