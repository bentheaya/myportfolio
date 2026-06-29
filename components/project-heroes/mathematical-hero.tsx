import React from 'react';
import { ProjectHeroBase } from './project-hero-base';

interface MathematicalHeroProps {
  title: string;
  domain: string;
  subtitle?: string;
  accentHue?: number;
}

/**
 * MathematicalHero
 * Mathematical/3D aesthetic with geometric shapes and formula placeholders.
 * 
 * Features:
 * - 3D geometric shapes (CSS)
 * - Formula/equation placeholders
 * - Scientific aesthetic
 * - Orange/amber accent by default
 * - Ready for Three.js mesh integration
 * 
 * Usage:
 * <MathematicalHero
 *   title="3D Rendering Engine"
 *   domain="3D / Mathematics"
 *   accentHue={45}
 * />
 */
export function MathematicalHero({
  title,
  domain,
  subtitle,
  accentHue = 45, // Orange by default
}: MathematicalHeroProps) {
  return (
    <ProjectHeroBase
      title={title}
      domain={domain}
      subtitle={subtitle}
      accentHue={accentHue}
    >
      {/* 3D geometric container */}
      <div className="w-full h-64 md:h-96 rounded-lg border border-accent-dim bg-gradient-to-br from-canvas-elevated/30 to-accent-faint/10 overflow-hidden flex items-center justify-center relative">
        {/* Rotating wireframe cube */}
        <style>{`
          @keyframes rotate3d {
            0% {
              transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            }
            100% {
              transform: rotateX(360deg) rotateY(360deg) rotateZ(0deg);
            }
          }
          
          .wireframe-cube {
            animation: rotate3d 20s linear infinite;
          }
        `}</style>

        <div
          className="wireframe-cube relative w-24 h-24"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Cube faces (simplified wireframe representation) */}
          <svg
            className="absolute inset-0 w-full h-full text-accent-bright/60"
            viewBox="0 0 100 100"
            style={{ filter: 'drop-shadow(0 0 20px rgba(var(--accent-h-rgb), 0.2))' }}
          >
            {/* Front face */}
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Depth lines */}
            <line x1="10" y1="10" x2="30" y2="-10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="90" y1="10" x2="110" y2="-10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="90" y1="90" x2="110" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="10" y1="90" x2="30" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            {/* Top face */}
            <polygon points="30,-10 110,-10 90,10 10,10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            {/* Right face */}
            <polygon points="110,-10 110,70 90,90 90,10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* Formula overlay */}
        <div className="absolute bottom-6 left-6 text-xs font-mono text-canvas-text-tertiary">
          <div>f(x,y,z) = cos(x)·sin(y)·z</div>
          <div className="text-accent-bright/60 mt-1">// Ready for render</div>
        </div>

        {/* Axis labels */}
        <div className="absolute top-6 right-6 space-y-1 text-xs font-mono text-canvas-text-tertiary">
          <div>X <span className="text-accent-bright/40">→</span></div>
          <div>Y <span className="text-accent-bright/40">↑</span></div>
          <div>Z <span className="text-accent-bright/40">⊙</span></div>
        </div>
      </div>
    </ProjectHeroBase>
  );
}
