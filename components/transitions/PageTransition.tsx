'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePageTransition } from './TransitionContext';

export function PageTransition() {
  const { transitionProgress, cursorX } = usePageTransition();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Mobile / prefers-reduced-motion cross-fade animation
      if (transitionProgress === 'animating-in') {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.in',
        });
      } else if (transitionProgress === 'animating-out') {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.out',
        });
      } else {
        gsap.set(overlay, { opacity: 0 });
      }
      return;
    }

    // Standard high-performance GSAP scaleX wipe
    if (transitionProgress === 'animating-in') {
      // Set origin relative to where the cursor was clicked
      const percentage = (cursorX / window.innerWidth) * 100;
      gsap.set(overlay, {
        opacity: 1,
        scaleX: 0,
        transformOrigin: `${percentage}% 50%`,
      });
      gsap.to(overlay, {
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    } else if (transitionProgress === 'animating-out') {
      // Exit animation: always wipe to the right (origin set to 100%)
      gsap.set(overlay, {
        transformOrigin: '100% 50%',
      });
      gsap.to(overlay, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    } else {
      // Idle state: reset elements
      gsap.set(overlay, {
        scaleX: 0,
        opacity: 0,
      });
    }
  }, [transitionProgress, cursorX]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-accent-bright pointer-events-none w-screen h-screen opacity-0"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
