'use client';

import React, { useEffect, useRef, useState } from 'react';
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
 * Renders the interactive Three.js node constellation as a full background canvas,
 * overlays massive responsive typography, and animates character entry on mount.
 */
export function HomeHero({
  name,
  tagline,
  location,
  status,
  className = '',
}: HomeHeroProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Stagger character entry animations on load
    if (nameRef.current) {
      animateTextIn(nameRef.current, 0.2);
    }
    
    // Smooth opacity reveal for the details block
    if (detailsRef.current) {
      detailsRef.current.style.opacity = '0';
      detailsRef.current.style.transform = 'translateY(10px)';
      detailsRef.current.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.8s';
      
      // Request frame to trigger animation
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
      {/* Three.js interactive constellation background */}
      {mounted && <HeroScene />}

      {/* Subtle overlay gradient to ensure text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-canvas-bg via-canvas-bg/30 to-transparent pointer-events-none" />

      {/* Left-aligned text content overlay */}
      <div className="relative z-10 max-w-4xl space-y-6 select-none pointer-events-none">
        {/* Real name with split character animation */}
        <h1 
          ref={nameRef}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-canvas-text leading-[0.9] tracking-tight uppercase"
        >
          {name}
        </h1>

        {/* Monospace tagline */}
        <p 
          ref={taglineRef}
          className="text-sm md:text-lg text-canvas-text-secondary max-w-2xl font-mono leading-relaxed"
        >
          {tagline}
        </p>

        {/* Location & Pulse Status details block */}
        <div 
          ref={detailsRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center pt-2 transition-all duration-700"
        >
          {/* Location */}
          {location && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-canvas-text font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-canvas-text-tertiary" />
              <span>{location}</span>
            </div>
          )}

          {/* Pulsing Status badge */}
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

      {/* Bottom Right Scroll explore cue */}
      <div className="absolute bottom-10 right-6 md:right-12 z-10 hidden sm:flex flex-col items-end gap-3 font-mono text-[9px] tracking-widest text-canvas-text-tertiary uppercase select-none pointer-events-none">
        <span>// scroll.explore</span>
        <div className="w-[1px] h-14 bg-canvas-border/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-accent-bright animate-traveling-dot" />
        </div>
      </div>
    </section>
  );
}
