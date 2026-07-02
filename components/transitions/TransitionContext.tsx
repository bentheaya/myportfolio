'use client';

import React, { createContext, useContext, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getLenis } from '@/lib/lenis';

interface TransitionContextType {
  isPending: boolean;
  startTransition: (href: string, cursorX: number) => void;
  transitionProgress: 'idle' | 'animating-in' | 'animating-out';
  setTransitionProgress: (progress: 'idle' | 'animating-in' | 'animating-out') => void;
  cursorX: number;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState<'idle' | 'animating-in' | 'animating-out'>('idle');
  const [cursorX, setCursorX] = useState(0);

  const startTransition = (href: string, x: number) => {
    if (isPending || transitionProgress !== 'idle') return;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Stop smooth scroll during transition
    const lenis = getLenis();
    if (lenis) lenis.stop();

    setCursorX(x);
    setTransitionProgress('animating-in');
    setIsPending(true);

    if (prefersReduced) {
      // Mobile / prefers-reduced cross-fade (direct navigate)
      router.push(href);
      setTimeout(() => {
        setIsPending(false);
        setTransitionProgress('idle');
        if (lenis) lenis.start();
      }, 300);
      return;
    }

    // Wait for liquid flood-in animation (400ms) before pushing route
    setTimeout(() => {
      // Perform routing while the overlay is fully covering the screen
      router.push(href);

      // Allow Next.js route change to resolve, then trigger recede
      setTimeout(() => {
        setTransitionProgress('animating-out');

        // Final cleanup after liquid recede finishes (420ms)
        setTimeout(() => {
          setIsPending(false);
          setTransitionProgress('idle');
          if (lenis) lenis.start();
        }, 450);
      }, 120);
    }, 420);
  };

  return (
    <TransitionContext.Provider
      value={{
        isPending,
        startTransition,
        transitionProgress,
        setTransitionProgress,
        cursorX,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a TransitionProvider');
  }
  return context;
}
