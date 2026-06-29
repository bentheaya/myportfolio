import React from 'react';
import { ProjectHeroBase } from './project-hero-base';

interface ParticleHeroProps {
  title: string;
  domain: string;
  subtitle?: string;
  accentHue?: number;
}

/**
 * ParticleHero
 * Educational/particle aesthetic with canvas container for animation.
 * 
 * Features:
 * - Canvas-ready container
 * - Particle system placeholder grid
 * - Learning/education aesthetic
 * - Purple/violet accent by default
 * - Ready for Three.js or custom canvas animations
 * 
 * Usage:
 * <ParticleHero
 *   title="Learning Platform"
 *   domain="Education / Interactive"
 *   accentHue={270}
 * />
 */
export function ParticleHero({
  title,
  domain,
  subtitle,
  accentHue = 270, // Purple by default
}: ParticleHeroProps) {
  return (
    <ProjectHeroBase
      title={title}
      domain={domain}
      subtitle={subtitle}
      accentHue={accentHue}
    >
      {/* Canvas container - ready for custom animation */}
      <div className="w-full h-64 md:h-96 rounded-lg border border-accent-dim bg-gradient-to-b from-canvas-elevated/40 to-accent-faint/10 overflow-hidden relative">
        {/* Particle grid placeholder */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-0.5 p-4">
          {Array.from({ length: 48 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-full bg-accent-bright/20 hover:bg-accent-bright/60 transition-all duration-300"
              style={{
                animationDelay: `${idx * 50}ms`,
                animation: `pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
              }}
            />
          ))}
        </div>

        {/* Connection lines (CSS alternative) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(240, 237, 232)', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(240, 237, 232)', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {/* Placeholder connecting lines */}
          <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="url(#line-gradient)" strokeWidth="1" />
          <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="url(#line-gradient)" strokeWidth="1" />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-xs font-mono text-canvas-text-tertiary tracking-widest">
              PARTICLE SYSTEM
            </div>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-accent-bright to-transparent mx-auto" />
          </div>
        </div>
      </div>
    </ProjectHeroBase>
  );
}
