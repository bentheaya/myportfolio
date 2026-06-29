'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NextProjectTeaserProps {
  title: string;
  description: string;
  domain: string;
  href: string;
  accentHue?: number;
  className?: string;
}

/**
 * NextProjectTeaser
 * Large, interactive navigation card for next project with magnetic hover effects.
 * 
 * Features:
 * - Full width, tall card design
 * - Smooth scale and glow on hover
 * - Dynamic accent color
 * - Arrow indicator animation
 * - Domain badge support
 * 
 * Usage:
 * <NextProjectTeaser
 *   title="Next: AR Spatial System"
 *   description="Building spatial UI with perspective transforms"
 *   domain="AR / Spatial"
 *   href="/projects/ar-spatial"
 *   accentHue={240}
 * />
 */
export function NextProjectTeaser({
  title,
  description,
  domain,
  href,
  accentHue,
  className = '',
}: NextProjectTeaserProps) {
  const [isHovered, setIsHovered] = useState(false);

  const style = accentHue !== undefined
    ? ({
        '--accent-h': accentHue,
      } as React.CSSProperties)
    : undefined;

  return (
    <Link href={href}>
      <div
        style={style}
        className={`group relative overflow-hidden rounded-xl border border-canvas-border bg-gradient-to-br from-canvas-elevated/50 to-canvas-card/30 p-8 md:p-12 transition-all duration-300 magnetic hover:border-accent-bright/50 hover:glow-accent-lg ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background grid effect */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_1px,rgba(255,255,255,.05)_1px)] bg-[length:30px_30px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_1px,rgba(255,255,255,.05)_1px)] bg-[length:30px_30px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-canvas-elevated/50 border border-canvas-border/50">
            <span className="text-xs font-mono uppercase tracking-wide text-canvas-text-tertiary">
              Next Project
            </span>
          </div>

          {/* Domain badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-faint border border-accent-dim">
            <span className="inline-block w-1 h-1 rounded-full bg-accent-bright animate-pulse-accent" />
            <span className="text-xs font-mono text-accent-bright">{domain}</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-canvas-text group-hover:text-accent-bright transition-colors duration-200">
            {title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-canvas-text-secondary group-hover:text-canvas-text-secondary/80 transition-colors duration-200 max-w-xl">
            {description}
          </p>

          {/* CTA with arrow */}
          <div className="inline-flex items-center gap-2 pt-4 text-accent-bright font-mono text-sm group-hover:gap-3 transition-all duration-200">
            <span>Explore Project</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <svg
              className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </div>
        </div>

        {/* Accent border glow on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none border-2 border-accent-bright/20 rounded-xl"
            style={{
              boxShadow: `inset 0 0 60px -15px hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.15)`,
            }}
          />
        )}
      </div>
    </Link>
  );
}
