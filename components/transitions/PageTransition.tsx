'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePageTransition } from './TransitionContext';

/**
 * PageTransition — Water Glass Morphism
 *
 * Three-layer composition:
 *
 *  Layer 1 (bottom): The actual clip-path morphing DIV with
 *    - Water-dark semi-transparent colour (NOT accent)
 *    - backdrop-filter: blur(14px) saturate(1.5) — frosted glass / refraction
 *
 *  Layer 2 (middle): An SVG with feTurbulence + feDisplacementMap filter
 *    - The turbulence `baseFrequency` is animated during the transition
 *      to produce a genuine water-distortion shimmer on the page content
 *      visible through the glass
 *
 *  Layer 3 (top): A thin shimmer highlight band that sweeps across like
 *    light reflecting off a water surface
 *
 * Animation timing:
 *  Flood (enter): HIDDEN_BELOW → WAVE_RISE → FLOOD  = ~700ms
 *  Recede (exit): FLOOD → RECEDE → HIDDEN_ABOVE     = ~650ms
 *
 * Colour: deep ocean-glass — rgba(4,20,42, 0.82) base
 * No accent hue. No dynamic CSS variables. Fixed water palette.
 */

// ─── Clip-path keyframe shapes ───────────────────────────────────────────────
// 8-point polygons for more organic wave shape

// Completely hidden below viewport
const HIDDEN_BELOW = 'polygon(0% 108%, 12% 110%, 35% 108%, 55% 111%, 75% 109%, 88% 112%, 100% 109%, 100% 120%, 0% 120%)';

// Wave crest breaking the surface from below — visible mid-screen
const WAVE_RISE = 'polygon(0% 52%, 12% 44%, 28% 50%, 45% 42%, 62% 48%, 78% 40%, 92% 46%, 100% 43%, 100% 112%, 0% 112%)';

// Second wave push — higher, more turbulent
const WAVE_PUSH = 'polygon(0% 18%, 10% 8%, 25% 16%, 42% 4%, 60% 14%, 75% 2%, 90% 10%, 100% 3%, 100% 112%, 0% 112%)';

// Full flood covering entire viewport — subtle wave at top
const FLOOD = 'polygon(0% -3%, 14% 1%, 30% -2%, 48% 2%, 65% -1%, 82% 3%, 100% -1%, 100% 104%, 0% 104%)';

// Recede — water pulling back from top
const RECEDE = 'polygon(0% -8%, 15% 4%, 32% -6%, 50% 5%, 68% -4%, 85% 6%, 100% -2%, 100% -12%, 0% -12%)';

// Fully off-screen above
const HIDDEN_ABOVE = 'polygon(0% -25%, 100% -25%, 100% -15%, 0% -15%)';

export function PageTransition() {
  const { transitionProgress } = usePageTransition();
  const glassRef   = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const filterRef  = useRef<SVGFETurbulenceElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const glass   = glassRef.current;
    const shimmer = shimmerRef.current;
    const turbulence = filterRef.current;
    const svg     = svgRef.current;
    if (!glass || !shimmer || !turbulence || !svg) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Reduced-motion: simple opacity cross-fade ──
    if (prefersReduced) {
      if (transitionProgress === 'animating-in') {
        gsap.set([glass, svg], { display: 'block' });
        gsap.set(glass, { clipPath: FLOOD, opacity: 0 });
        gsap.to(glass, { opacity: 1, duration: 0.3, ease: 'power1.in' });
      } else if (transitionProgress === 'animating-out') {
        gsap.to(glass, {
          opacity: 0, duration: 0.3, ease: 'power1.out',
          onComplete: () => gsap.set([glass, svg], { display: 'none' }),
        });
      } else {
        gsap.set([glass, svg], { display: 'none' });
        gsap.set(glass, { clipPath: HIDDEN_BELOW, opacity: 1 });
      }
      return;
    }

    if (transitionProgress === 'animating-in') {
      // Show layers
      gsap.set([glass, svg], { display: 'block' });
      gsap.set(glass, { clipPath: HIDDEN_BELOW, opacity: 1 });
      gsap.set(shimmer, { x: '-110%', opacity: 0 });

      // Animate turbulence frequency to create water movement
      gsap.to(turbulence, {
        attr: { baseFrequency: '0.018 0.055' },
        duration: 0.6,
        ease: 'none',
        yoyo: true,
        repeat: 1,
      });

      const tl = gsap.timeline();
      tl
        // First wave crest appears (slow, weighty)
        .to(glass, {
          clipPath: WAVE_RISE,
          duration: 0.28,
          ease: 'power1.in',
        })
        // Second wave surge
        .to(glass, {
          clipPath: WAVE_PUSH,
          duration: 0.22,
          ease: 'power2.in',
        })
        // Full flood — ease reflects water settling
        .to(glass, {
          clipPath: FLOOD,
          duration: 0.22,
          ease: 'power3.out',
        })
        // Shimmer sweep across surface just as it settles
        .to(shimmer, {
          x: '110%',
          opacity: 0.6,
          duration: 0.5,
          ease: 'power1.inOut',
        }, '-=0.15');

    } else if (transitionProgress === 'animating-out') {
      // Animate turbulence on recede too
      gsap.to(turbulence, {
        attr: { baseFrequency: '0.022 0.07' },
        duration: 0.55,
        ease: 'none',
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set([glass, svg], { display: 'none' });
          gsap.set(glass, { clipPath: HIDDEN_BELOW, opacity: 1 });
          gsap.set(shimmer, { x: '-110%', opacity: 0 });
          // Reset turbulence
          gsap.set(turbulence, { attr: { baseFrequency: '0.014 0.04' } });
        },
      });
      tl
        .to(glass, {
          clipPath: RECEDE,
          duration: 0.28,
          ease: 'power2.in',
        })
        .to(glass, {
          clipPath: HIDDEN_ABOVE,
          duration: 0.26,
          ease: 'power3.inOut',
        });

    } else {
      // Idle — everything hidden
      gsap.set([glass, svg], { display: 'none' });
      gsap.set(glass, { clipPath: HIDDEN_BELOW, opacity: 1 });
      gsap.set(shimmer, { x: '-110%', opacity: 0 });
      gsap.set(turbulence, { attr: { baseFrequency: '0.014 0.04' } });
    }
  }, [transitionProgress]);

  return (
    <>
      {/*
        ── SVG Filter: water turbulence distortion ──────────────────────────
        This filter is applied to the glass overlay, making the content
        visible through it appear distorted — simulating light refraction
        through moving water. The SVG itself is invisible (width/height 0),
        it only provides the filter definition.
      */}
      <svg
        ref={svgRef}
        style={{ display: 'none', position: 'fixed', width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="water-distort" x="-10%" y="-10%" width="120%" height="120%"
            colorInterpolationFilters="sRGB"
          >
            {/* Organic noise */}
            <feTurbulence
              ref={filterRef}
              type="turbulence"
              baseFrequency="0.014 0.04"
              numOctaves="4"
              seed="8"
              stitchTiles="stitch"
              result="noise"
            />
            {/* Use noise to displace the underlying pixels */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/*
        ── Glass overlay with clip-path morphing ────────────────────────────
        backdrop-filter creates the frosted-glass/refraction look.
        The deep water colour at 82% opacity is semi-transparent enough
        that you can sense the page content beneath during the wipe.
      */}
      <div
        ref={glassRef}
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none w-screen h-screen"
        style={{
          display: 'none',
          clipPath: HIDDEN_BELOW,
          // Water colour — deep ocean at night, not accent
          background: `
            linear-gradient(
              175deg,
              rgba(5, 28, 52, 0.88) 0%,
              rgba(8, 45, 78, 0.82) 30%,
              rgba(6, 35, 62, 0.86) 60%,
              rgba(4, 22, 44, 0.90) 100%
            )
          `,
          backdropFilter: 'blur(14px) saturate(1.5) brightness(0.9)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.5) brightness(0.9)',
          // Apply water distortion filter (defined in SVG above)
          filter: 'url(#water-distort)',
        }}
      >
        {/* Inner shimmer highlight — the light-reflection-off-water effect */}
        <div
          ref={shimmerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '40%',
            height: '100%',
            background: 'linear-gradient(105deg, transparent 30%, rgba(130,200,220,0.12) 50%, transparent 70%)',
            transform: 'translateX(-110%)',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Horizontal caustic lines — subtle water-surface texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 28px,
                rgba(120, 190, 210, 0.04) 28px,
                rgba(120, 190, 210, 0.04) 29px
              )
            `,
            pointerEvents: 'none',
          }}
        />
      </div>
    </>
  );
}
