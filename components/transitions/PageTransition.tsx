'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePageTransition } from './TransitionContext';

/**
 * PageTransition — Liquid Motion
 *
 * Uses CSS clip-path polygon() tweening with GSAP (free tier compatible).
 * The overlay "floods" the screen with an organic wave, then recedes off
 * the top — producing a fluid, water-like transition.
 *
 * States:
 *  idle         → clip-path cuts the element fully off screen (below)
 *  animating-in → polygon expands upward, covering the viewport
 *  animating-out→ polygon retreats above the top edge, revealing new page
 */

// Clip-path states (all as polygon points, 4-point shapes keep it simple
// but the control over which point moves creates the wave illusion)

// Fully off-screen below the viewport
const HIDDEN_BELOW =
  'polygon(0% 110%, 100% 110%, 100% 120%, 0% 120%)';

// Wave crest just entering from bottom
const WAVE_RISE =
  'polygon(0% 60%, 35% 50%, 65% 58%, 100% 52%, 100% 110%, 0% 110%)';

// Flood covers the full viewport — slightly wavy top for organic feel
const FLOOD =
  'polygon(0% -2%, 30% 0%, 70% -3%, 100% 1%, 100% 102%, 0% 102%)';

// Starting recede — wavy leading edge at top
const RECEDE_START =
  'polygon(0% -1%, 35% 3%, 65% -2%, 100% 2%, 100% -5%, 0% -5%)';

// Fully off-screen above
const HIDDEN_ABOVE =
  'polygon(0% -20%, 100% -20%, 100% -10%, 0% -10%)';

export function PageTransition() {
  const { transitionProgress } = usePageTransition();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      if (transitionProgress === 'animating-in') {
        gsap.set(overlay, { opacity: 0, clipPath: FLOOD, display: 'block' });
        gsap.to(overlay, { opacity: 1, duration: 0.25, ease: 'power1.in' });
      } else if (transitionProgress === 'animating-out') {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.out',
          onComplete: () => gsap.set(overlay, { display: 'none' }),
        });
      } else {
        gsap.set(overlay, { opacity: 0, display: 'none' });
      }
      return;
    }

    if (transitionProgress === 'animating-in') {
      // Liquid flood from bottom
      gsap.set(overlay, {
        display: 'block',
        opacity: 1,
        clipPath: HIDDEN_BELOW,
      });

      const tl = gsap.timeline();
      tl
        // Wave crest rises quickly
        .to(overlay, {
          clipPath: WAVE_RISE,
          duration: 0.18,
          ease: 'power2.in',
        })
        // Flood fills viewport with slight organic wobble in the leading edge
        .to(overlay, {
          clipPath: FLOOD,
          duration: 0.22,
          ease: 'power3.inOut',
        });

    } else if (transitionProgress === 'animating-out') {
      // Liquid recede off the top
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: 'none', clipPath: HIDDEN_BELOW });
        },
      });
      tl
        .to(overlay, {
          clipPath: RECEDE_START,
          duration: 0.20,
          ease: 'power2.in',
        })
        .to(overlay, {
          clipPath: HIDDEN_ABOVE,
          duration: 0.22,
          ease: 'power3.inOut',
        });

    } else {
      gsap.set(overlay, { display: 'none', clipPath: HIDDEN_BELOW, opacity: 1 });
    }
  }, [transitionProgress]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none w-screen h-screen"
      style={{
        display: 'none',
        background:
          'linear-gradient(135deg, hsl(var(--accent-h,164) calc(var(--accent-s,68%) * 0.8) 28%), hsl(var(--accent-h,164) var(--accent-s,68%) var(--accent-l,55%)) 50%, hsl(var(--accent-h,164) calc(var(--accent-s,68%) * 0.9) 18%))',
        clipPath: HIDDEN_BELOW,
      }}
    />
  );
}
