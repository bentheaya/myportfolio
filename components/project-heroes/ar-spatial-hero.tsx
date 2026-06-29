import React from 'react';
import { ProjectHeroBase } from './project-hero-base';

interface ARSpatialHeroProps {
  title: string;
  domain: string;
  subtitle?: string;
  accentHue?: number;
}

/**
 * ARSpatialHero
 * AR/spatial aesthetic with perspective CSS grid and pin placeholders.
 * 
 * Features:
 * - 3D perspective transform
 * - Pin/marker placeholders
 * - Spatial positioning indicators
 * - Elegant cyan/blue aesthetic (can be customized)
 * - Ready for Three.js integration
 * 
 * Usage:
 * <ARSpatialHero
 *   title="Spatial UI System"
 *   domain="AR / Spatial"
 *   accentHue={180}
 * />
 */
export function ARSpatialHero({
  title,
  domain,
  subtitle,
  accentHue = 180, // Cyan by default
}: ARSpatialHeroProps) {
  return (
    <ProjectHeroBase
      title={title}
      domain={domain}
      subtitle={subtitle}
      accentHue={accentHue}
    >
      {/* 3D perspective container */}
      <div
        className="w-full h-64 md:h-96 rounded-lg border border-accent-dim bg-gradient-to-br from-accent-faint/10 to-canvas-elevated/30 overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Perspective grid */}
        <div
          className="w-full h-full grid grid-cols-3 grid-rows-3 gap-px p-4"
          style={{
            transform: 'rotateX(5deg) rotateY(-5deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={idx}
              className="relative rounded border border-accent-dim/40 bg-canvas-elevated/20 group hover:bg-accent-faint/20 hover:border-accent-bright/60 transition-all duration-300"
            >
              {/* Pin marker */}
              <div className="absolute top-3 left-3">
                <div className="w-2 h-2 rounded-full bg-accent-bright" />
                <div className="absolute inset-0 rounded-full bg-accent-bright/20 blur-sm" />
              </div>

              {/* Coordinate label */}
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-canvas-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                [{idx + 1}]
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProjectHeroBase>
  );
}
