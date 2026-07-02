'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { animateTextIn } from '@/lib/animations';

// Lazy-load the R3F Hero Scene to prevent SSR hydration mismatches
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-canvas-bg" />,
});

interface HomeHeroProps {
  name: string;
  tagline: string;
  location?: string;
  status?: string;
  className?: string;
}

/**
 * HomeHero
 * Premium left-aligned cinematic hero section.
 * - Interactive Three.js node-graph constellation as full canvas background
 * - Real photo blended at low opacity as environmental texture (top-right)
 * - Massive responsive typography with split-character GSAP entry
 * - Ambient overlay gradient ensuring text readability
 */
export function HomeHero({
  name,
  tagline,
  location,
  status,
  className = '',
}: HomeHeroProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (nameRef.current) {
      animateTextIn(nameRef.current, 0.2);
    }

    if (detailsRef.current) {
      detailsRef.current.style.opacity = '0';
      detailsRef.current.style.transform = 'translateY(10px)';
      detailsRef.current.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.8s';
      requestAnimationFrame(() => {
        if (detailsRef.current) {
          detailsRef.current.style.opacity = '1';
          detailsRef.current.style.transform = 'translateY(0)';
        }
      });
    }
  }, []);

  return (
    <section
      className={`relative min-h-screen w-full flex items-end justify-start px-6 md:px-12 pb-20 md:pb-28 overflow-hidden bg-canvas-bg z-10 ${className}`}
    >
      {/* ── Background: photo texture blended with dark canvas ── */}
      <div className="absolute inset-0 z-[0] pointer-events-none select-none">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{
            opacity: 0.055,
            mixBlendMode: 'luminosity',
            filter: 'grayscale(100%) contrast(1.1)',
          }}
          priority
          sizes="100vw"
          aria-hidden
        />
        {/* Vignette to kill harsh edges of the photo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_30%,transparent_20%,rgb(8,8,8)_75%)]" />
      </div>

      {/* ── Three.js constellation graph ── */}
      {mounted && <HeroScene />}

      {/* ── Readability gradient: pull text up from dark base ── */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-canvas-bg via-canvas-bg/25 to-transparent pointer-events-none" />

      {/* ── Typography overlay ── */}
      <div className="relative z-10 max-w-4xl space-y-6 select-none pointer-events-none">
        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-canvas-text leading-[0.9] tracking-tight uppercase"
        >
          {name}
        </h1>

        <p className="text-sm md:text-lg text-canvas-text-secondary max-w-2xl font-mono leading-relaxed">
          {tagline}
        </p>

        <div
          ref={detailsRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center pt-2"
        >
          {location && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-canvas-text font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-canvas-text-tertiary" />
              <span>{location}</span>
            </div>
          )}

          {status && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-faint border border-accent-dim/30">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-bright animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-bright">
                {status}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Scroll explore cue ── */}
      <div className="absolute bottom-10 right-6 md:right-12 z-10 hidden sm:flex flex-col items-end gap-3 font-mono text-[9px] tracking-widest text-canvas-text-tertiary uppercase select-none pointer-events-none">
        <span>// scroll.explore</span>
        <div className="w-[1px] h-14 bg-canvas-border/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-accent-bright animate-traveling-dot" />
        </div>
      </div>
    </section>
  );
}
