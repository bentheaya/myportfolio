'use client';

import React, { useState } from 'react';
import { TransitionLink } from '@/components/transitions/TransitionLink';

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
 * Large, interactive navigation card for next project with magnetic hover effects and color bleed.
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

  const hexColor = accentHue !== undefined ? `hsl(${accentHue} 100% 50%)` : undefined;

  return (
    <TransitionLink href={href} data-cursor="project" data-project-color={hexColor}>
      <div
        style={{
          ...style,
          boxShadow: isHovered 
            ? `0 20px 40px -15px hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.25), inset 0 0 30px -5px hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.15)` 
            : 'none',
        }}
        className={`group relative overflow-hidden rounded-xl border border-canvas-border bg-gradient-to-br from-canvas-elevated/50 to-canvas-card/30 p-8 md:p-12 transition-all duration-500 hover:border-accent-bright/50 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background grid effect */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_1px,rgba(255,255,255,.03)_1px)] bg-[length:24px_24px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_1px,rgba(255,255,255,.03)_1px)] bg-[length:24px_24px]" />
        </div>

        {/* Thematic color bleed background overlay */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out z-0 opacity-0 group-hover:opacity-25 scale-75 group-hover:scale-100"
          style={{
            background: 'radial-gradient(circle at center, var(--color-accent-bright) 0%, transparent 65%)',
            filter: 'blur(32px)',
          }}
        />

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-canvas-text group-hover:text-accent-bright transition-colors duration-200 uppercase">
            {title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-canvas-text-secondary group-hover:text-canvas-text-secondary/80 transition-colors duration-200 max-w-xl font-mono">
            {description}
          </p>

          {/* CTA with arrow */}
          <div className="inline-flex items-center gap-2 pt-4 text-accent-bright font-mono text-xs group-hover:gap-3 transition-all duration-200">
            <span>Explore Project</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}
