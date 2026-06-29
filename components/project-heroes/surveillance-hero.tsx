import React from 'react';
import { ProjectHeroBase } from './project-hero-base';

interface SurveillanceHeroProps {
  title: string;
  domain: string;
  subtitle?: string;
  accentHue?: number;
}

/**
 * SurveillanceHero
 * Tech surveillance aesthetic with scan lines and red accents.
 * 
 * Features:
 * - Animated scan line effect (CSS)
 * - Red accent color (can be overridden)
 * - Grid background pattern
 * - High-tech visual language
 * - Ready for overlay animations
 * 
 * Usage:
 * <SurveillanceHero
 *   title="AI Detection System"
 *   domain="AI / Detection"
 *   accentHue={0}
 * />
 */
export function SurveillanceHero({
  title,
  domain,
  subtitle,
  accentHue = 0, // Red by default
}: SurveillanceHeroProps) {
  return (
    <ProjectHeroBase
      title={title}
      domain={domain}
      subtitle={subtitle}
      accentHue={accentHue}
      className="relative"
    >
      {/* Grid overlay background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_1px,rgba(255,255,255,.1)_1px)] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_1px,rgba(255,255,255,.1)_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Animated scan lines */}
      <style>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        
        .scan-line {
          animation: scan 8s linear infinite;
        }
      `}</style>

      <div className="relative w-full h-64 md:h-96 rounded-lg border border-accent-dim bg-gradient-to-b from-accent-faint/20 to-canvas-elevated/40 overflow-hidden">
        {/* Scan line effect */}
        <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-bright to-transparent scan-line opacity-40"
          style={{ top: '0%' }}
        />

        {/* Corner markers */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent-bright/60" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent-bright/60" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent-bright/60" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent-bright/60" />

        {/* Content placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-16 h-1 bg-accent-bright/40 rounded mx-auto" />
            <div className="text-xs font-mono text-canvas-text-tertiary">
              [SYSTEM READY]
            </div>
            <div className="w-24 h-1 bg-accent-bright/20 rounded mx-auto" />
          </div>
        </div>
      </div>
    </ProjectHeroBase>
  );
}
