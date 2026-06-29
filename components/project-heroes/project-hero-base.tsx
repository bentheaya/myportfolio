import React from 'react';
import { DomainBadge } from '@/components/ui/domain-badge';

interface ProjectHeroBaseProps {
  title: string;
  domain: string;
  subtitle?: string;
  accentHue?: number;
  children?: React.ReactNode;
  className?: string;
}

/**
 * ProjectHeroBase
 * Base hero section for all project pages.
 * 
 * Features:
 * - Full viewport layout
 * - Corner layout brackets [ ]
 * - Back link to projects
 * - Domain badge
 * - Fluid title typography (clamp)
 * - Scroll cue indicator
 * - Slot for custom hero background/visualization
 * 
 * Usage:
 * <ProjectHeroBase
 *   title="AI Detection System"
 *   domain="AI / Detection"
 *   accentHue={164}
 * >
 *   <div>Your custom hero content goes here</div>
 * </ProjectHeroBase>
 */
export function ProjectHeroBase({
  title,
  domain,
  subtitle,
  accentHue,
  children,
  className = '',
}: ProjectHeroBaseProps) {
  return (
    <section className={`relative min-h-screen w-full flex items-center justify-center px-4 py-20 overflow-hidden bg-canvas-bg ${className}`}>
      {/* Top-left bracket */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-canvas-border/40 rounded-tl-sm" />

      {/* Bottom-right bracket */}
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-canvas-border/40 rounded-br-sm" />

      {/* Back link */}
      <a
        href="/work"
        className="absolute top-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 inline-flex items-center gap-2 text-sm font-mono text-canvas-text-secondary hover:text-canvas-text transition-colors duration-200"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>all work</span>
      </a>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-8 md:space-y-12">
        {/* Domain badge */}
        <div>
          <DomainBadge label={domain} accentHue={accentHue} />
        </div>

        {/* Title */}
        <h1 className="text-fluid-hero font-heading font-bold text-canvas-text max-w-4xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg md:text-xl text-canvas-text-secondary max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Custom hero content slot */}
        {children && <div className="pt-8">{children}</div>}
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
    </section>
  );
}
