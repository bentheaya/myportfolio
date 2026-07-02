'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/* ─────────────────────────────────────────────────────────────────────────────
 * PageLoader
 * Full-screen cinematic loader that matches Benaih's dark/technical aesthetic.
 *
 * Visual layers (bottom → top):
 *  1. Dark bg matching canvas-bg
 *  2. Floating ultra-realistic soap bubbles (CSS only, no canvas)
 *  3. Page skeleton — shimmer outlines of the actual layout below
 *  4. Center identity tag  "// benaih.init"
 *  5. Subtle scan-line animation
 *
 * Timing:
 *  - Visible for at minimum MIN_DURATION ms
 *  - Waits for the `onDone` prop to be called by the parent
 *  - Exits with a GSAP opacity + upward slide
 * ───────────────────────────────────────────────────────────────────────────── */

const MIN_DURATION = 1800; // ms — minimum loader visibility

interface PageLoaderProps {
  onComplete: () => void;
}

// ── Bubble config ────────────────────────────────────────────────────────────
const BUBBLES = [
  { size: 120, left: '8%',  delay: '0s',    dur: '7s',  opacity: 0.65 },
  { size: 56,  left: '18%', delay: '0.6s',  dur: '9s',  opacity: 0.45 },
  { size: 88,  left: '30%', delay: '1.1s',  dur: '8s',  opacity: 0.55 },
  { size: 44,  left: '42%', delay: '0.3s',  dur: '11s', opacity: 0.4  },
  { size: 100, left: '54%', delay: '1.5s',  dur: '7.5s',opacity: 0.6  },
  { size: 36,  left: '65%', delay: '0.8s',  dur: '10s', opacity: 0.35 },
  { size: 72,  left: '76%', delay: '0.2s',  dur: '9.5s',opacity: 0.5  },
  { size: 52,  left: '87%', delay: '1.8s',  dur: '8.5s',opacity: 0.42 },
  { size: 90,  left: '22%', delay: '2.1s',  dur: '7.2s',opacity: 0.5  },
  { size: 40,  left: '68%', delay: '1.3s',  dur: '12s', opacity: 0.38 },
];

export function PageLoader({ onComplete }: PageLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (exiting) return;
      setExiting(true);

      const el = loaderRef.current;
      if (!el) { onComplete(); return; }

      gsap.to(el, {
        opacity: 0,
        y: -24,
        duration: 0.65,
        ease: 'power3.inOut',
        onComplete,
      });
    }, MIN_DURATION);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] overflow-hidden bg-canvas-bg"
      aria-hidden="true"
    >
      {/* ── Scan laser line ──────────────────────────────────────────────── */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none animate-scan-laser-hero"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(45,212,160,0.4) 50%, transparent 100%)',
          zIndex: 5,
        }}
      />

      {/* ── Bubbles ──────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {BUBBLES.map((b, i) => (
          <div
            key={i}
            style={{
              position:    'absolute',
              bottom:      '-20%',
              left:        b.left,
              width:       b.size,
              height:      b.size,
              borderRadius:'50%',
              opacity:     b.opacity,
              // Realistic bubble surface: semi-transparent with subtle blue tint
              background: `radial-gradient(
                circle at 35% 28%,
                rgba(255,255,255,0.5)   0%,
                rgba(180,230,245,0.15) 22%,
                rgba(100,190,220,0.05) 50%,
                transparent            68%
              )`,
              boxShadow: `
                inset 0 2px 10px rgba(255,255,255,0.28),
                inset 0 -2px 6px  rgba(100,180,210,0.12),
                inset 4px 0 10px  rgba(80,160,200,0.08),
                0 4px 30px        rgba(80,160,200,0.06)
              `,
              border: '1px solid rgba(200,240,255,0.22)',
              animation: `bubble-rise ${b.dur} ${b.delay} ease-in infinite`,
            }}
          >
            {/* Primary specular highlight — top-left bright spot */}
            <div
              style={{
                position: 'absolute',
                top:      '12%',
                left:     '16%',
                width:    '32%',
                height:   '26%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.75) 0%, transparent 68%)',
                transform: 'rotate(-30deg)',
              }}
            />
            {/* Secondary micro-highlight — bottom right */}
            <div
              style={{
                position: 'absolute',
                bottom:   '22%',
                right:    '18%',
                width:    '14%',
                height:   '11%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 70%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Skeleton: hero section ────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-28 gap-5">
        {/* Name bar skeleton */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="h-14 md:h-20 lg:h-24 w-[72%] rounded-lg skeleton-shimmer" />
          <div className="h-14 md:h-20 lg:h-24 w-[55%] rounded-lg skeleton-shimmer" style={{ animationDelay: '0.1s' }} />
        </div>
        {/* Tagline skeleton */}
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="h-4 w-full rounded skeleton-shimmer" style={{ animationDelay: '0.18s' }} />
          <div className="h-4 w-[82%] rounded skeleton-shimmer" style={{ animationDelay: '0.24s' }} />
        </div>
        {/* Status & location row */}
        <div className="flex gap-4 items-center">
          <div className="h-5 w-28 rounded skeleton-shimmer" style={{ animationDelay: '0.3s' }} />
          <div className="h-6 w-24 rounded-full skeleton-shimmer" style={{ animationDelay: '0.36s' }} />
        </div>
      </div>

      {/* ── Center identity label ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Animated graph icon — 3 dots + 2 connecting lines */}
          <svg width="56" height="36" viewBox="0 0 56 36" fill="none" className="opacity-60">
            <circle cx="8"  cy="18" r="4" fill="#2dd4a0" />
            <circle cx="28" cy="6"  r="4" fill="#2dd4a0" opacity="0.7" />
            <circle cx="48" cy="18" r="4" fill="#2dd4a0" opacity="0.5" />
            <circle cx="28" cy="30" r="3" fill="#2dd4a0" opacity="0.4" />
            <line x1="8"  y1="18" x2="28" y2="6"  stroke="#2dd4a0" strokeWidth="1.5" opacity="0.5" />
            <line x1="28" y1="6"  x2="48" y2="18" stroke="#2dd4a0" strokeWidth="1.5" opacity="0.4" />
            <line x1="8"  y1="18" x2="28" y2="30" stroke="#2dd4a0" strokeWidth="1"   opacity="0.3" />
            <line x1="48" y1="18" x2="28" y2="30" stroke="#2dd4a0" strokeWidth="1"   opacity="0.3" />
          </svg>
          {/* Monospace init label */}
          <div className="font-mono text-xs text-accent-bright tracking-widest opacity-70">
            // benaih.init
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-accent-bright"
                style={{
                  animation: `dot-pulse 1.2s ${i * 0.2}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
