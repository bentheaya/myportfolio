'use client';

import React from 'react';

interface HomeHeroProps {
  name: string;
  tagline: string;
  location?: string;
  status?: string;
  accentHue?: number;
  className?: string;
}

/**
 * HomeHero
 * Large hero text overlay section for home page.
 * 
 * Features:
 * - Massive responsive typography (fluid sizing)
 * - Location + status with pulsing indicator
 * - Clean asymmetric layout
 * - Optimized for 3D background layering
 * - Full viewport height
 * - Semantic HTML structure
 * 
 * Usage:
 * <HomeHero
 *   name="Alex Chen"
 *   tagline="Creative technologist crafting digital experiences"
 *   location="San Francisco"
 *   status="Available for Projects"
 * />
 */
export function HomeHero({
  name,
  tagline,
  location,
  status,
  className = '',
}: HomeHeroProps) {
  return (
    <section className={`relative min-h-screen w-full flex items-center justify-center px-4 py-20 overflow-hidden ${className}`}>
      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 md:space-y-12">
        {/* Name */}
        <div className="space-y-4">
          <h1 className="text-fluid-hero font-heading font-bold text-canvas-text">
            {name}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-2xl text-canvas-text-secondary max-w-2xl leading-relaxed">
            {tagline}
          </p>
        </div>

        {/* Status + Location */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center pt-4">
          {/* Location */}
          {location && (
            <div className="flex items-center gap-2 text-sm md:text-base text-canvas-text font-mono">
              <svg
                className="w-4 h-4 text-canvas-text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
              <span>{location}</span>
            </div>
          )}

          {/* Status */}
          {status && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-faint border border-accent-dim">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-bright animate-pulse" />
              <span className="text-xs md:text-sm font-mono text-accent-bright">{status}</span>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-mono text-canvas-text-tertiary">Scroll to explore</span>
          <svg
            className="w-4 h-4 text-canvas-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
