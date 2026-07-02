'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePageTransition } from './TransitionContext';

/**
 * PageTransition — Circular Water-Drop Wipe
 *
 * Uses CSS `clip-path: circle()` which is browser-interpolated as a perfect
 * smooth circle at every frame — no polygons, no corners, no sharp edges.
 *
 * Visual: A frosted-glass water-drop expands from the bottom-center of the
 * screen (like a droplet hitting a surface and spreading), covering everything,
 * then the new page's content is revealed as the circle shrinks back from the
 * top-center — like water pulling back up a surface.
 *
 * Layers:
 *  1. Frosted glass overlay  — backdrop-blur + deep ocean colour
 *  2. SVG feTurbulence filter — applied during the wipe for water distortion
 *  3. Shimmer highlight band  — sweeps across as the circle fills
 *
 * Timing:
 *  Enter (flood) : 680ms total  → route push at 700ms
 *  Exit (recede) : 580ms total  → cleanup at 650ms
 */

// ── Clip-path circle states ──────────────────────────────────────────────────
// All `at X% Y%` values define the circle's origin point.

// Hidden: circle is collapsed at the very bottom-center
const HIDDEN_BOTTOM = 'circle(0% at 50% 108%)';

// Full flood: circle expands to cover all four corners from bottom-center
// 160% radius guarantees full coverage on all aspect ratios
const FLOODED = 'circle(160% at 50% 108%)';

// For exit: starts fully visible from top-center origin
const FLOOD_TOP = 'circle(160% at 50% -8%)';

// Hidden from top: collapsed at top-center
const HIDDEN_TOP = 'circle(0% at 50% -8%)';

export function PageTransition() {
  const { transitionProgress } = usePageTransition();
  const glassRef   = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const filterRef  = useRef<SVGFETurbulenceElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const glass      = glassRef.current;
    const shimmer    = shimmerRef.current;
    const turbulence = filterRef.current;
    const svg        = svgRef.current;
    if (!glass || !shimmer || !turbulence || !svg) return;

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Reduced-motion fallback: simple opacity fade ────────────────────
    if (prefersReduced) {
      if (transitionProgress === 'animating-in') {
        gsap.set([glass, svg], { display: 'block' });
        gsap.set(glass, { opacity: 0 });
        gsap.to(glass, { opacity: 1, duration: 0.3, ease: 'power1.in' });
      } else if (transitionProgress === 'animating-out') {
        gsap.to(glass, {
          opacity: 0, duration: 0.3, ease: 'power1.out',
          onComplete: () => gsap.set([glass, svg], { display: 'none' }),
        });
      } else {
        gsap.set([glass, svg], { display: 'none' });
      }
      return;
    }

    // ── Enter: circle expands from bottom-center ────────────────────────
    if (transitionProgress === 'animating-in') {
      gsap.set([glass, svg], { display: 'block' });
      gsap.set(glass, { clipPath: HIDDEN_BOTTOM, opacity: 1 });
      gsap.set(shimmer, { x: '-110%', opacity: 0 });

      // Animate turbulence during the wipe (water movement)
      gsap.to(turbulence, {
        attr: { seed: 12, baseFrequency: '0.016 0.05' },
        duration: 0.65,
        ease: 'none',
      });

      const tl = gsap.timeline();
      tl
        // Expand circle — ease gives it a weighty, fluid feel
        .to(glass, {
          clipPath: FLOODED,
          duration: 0.65,
          ease: 'power2.inOut',
        })
        // Shimmer sweeps as the water settles
        .to(shimmer, {
          x: '120%',
          opacity: 0.5,
          duration: 0.45,
          ease: 'power1.inOut',
        }, '-=0.25');

    // ── Exit: circle collapses from top-center ──────────────────────────
    } else if (transitionProgress === 'animating-out') {
      // Snap origin to top so the circle appears to pull back upward
      gsap.set(glass, { clipPath: FLOOD_TOP });

      gsap.to(turbulence, {
        attr: { seed: 5, baseFrequency: '0.02 0.06' },
        duration: 0.55,
        ease: 'none',
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set([glass, svg], { display: 'none' });
          gsap.set(glass, { clipPath: HIDDEN_BOTTOM, opacity: 1 });
          gsap.set(shimmer, { x: '-110%', opacity: 0 });
          gsap.set(turbulence, { attr: { baseFrequency: '0.014 0.04', seed: 8 } });
        },
      });
      tl.to(glass, {
        clipPath: HIDDEN_TOP,
        duration: 0.56,
        ease: 'power2.inOut',
      });

    // ── Idle ────────────────────────────────────────────────────────────
    } else {
      gsap.set([glass, svg], { display: 'none' });
      gsap.set(glass, { clipPath: HIDDEN_BOTTOM, opacity: 1 });
      gsap.set(shimmer, { x: '-110%', opacity: 0 });
      gsap.set(turbulence, { attr: { baseFrequency: '0.014 0.04', seed: 8 } });
    }
  }, [transitionProgress]);

  return (
    <>
      {/* SVG filter definition — zero-size, provides water-distort filter id */}
      <svg
        ref={svgRef}
        style={{ display: 'none', position: 'fixed', width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="water-distort"
            x="-10%" y="-10%" width="120%" height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={filterRef}
              type="turbulence"
              baseFrequency="0.014 0.04"
              numOctaves="4"
              seed="8"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Glass overlay — the actual morphing element */}
      <div
        ref={glassRef}
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none w-screen h-screen"
        style={{
          display: 'none',
          clipPath: HIDDEN_BOTTOM,
          // Deep ocean water — fixed palette, no accent variables
          background: `linear-gradient(
            165deg,
            rgba(5,  28, 52, 0.88) 0%,
            rgba(8,  48, 80, 0.82) 35%,
            rgba(6,  38, 65, 0.86) 65%,
            rgba(4,  22, 44, 0.90) 100%
          )`,
          backdropFilter: 'blur(16px) saturate(1.6) brightness(0.88)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.6) brightness(0.88)',
          filter: 'url(#water-distort)',
        }}
      >
        {/* Shimmer band — light reflecting off water surface */}
        <div
          ref={shimmerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '38%',
            height: '100%',
            background:
              'linear-gradient(108deg, transparent 25%, rgba(140,210,230,0.14) 50%, transparent 75%)',
            transform: 'translateX(-110%)',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Horizontal caustic refraction lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 30px,
              rgba(120,195,215,0.035) 30px,
              rgba(120,195,215,0.035) 31px
            )`,
            pointerEvents: 'none',
          }}
        />
      </div>
    </>
  );
}
