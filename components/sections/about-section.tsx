import React from 'react';

interface AboutSectionProps {
  title?: string;
  paragraphs: string[];
  highlights?: string[];
  className?: string;
}

/**
 * AboutSection
 * Clean, asymmetric about/bio section for home page.
 * 
 * Features:
 * - Flexible paragraph content
 * - Optional highlights/skills
 * - Responsive two-column layout
 * - Clean typography hierarchy
 * - Accent borders on highlights
 * 
 * Usage:
 * <AboutSection
 *   title="About"
 *   paragraphs={["I build...", "With experience..."]}
 *   highlights={["React", "Three.js", "TypeScript"]}
 * />
 */
export function AboutSection({
  title = 'About',
  paragraphs,
  highlights,
  className = '',
}: AboutSectionProps) {
  return (
    <section className={`w-full py-20 md:py-32 px-4 border-t border-canvas-border/20 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-canvas-text mb-12">
          {title}
        </h2>

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left column - Main content */}
          <div className="md:col-span-2 space-y-6">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base md:text-lg text-canvas-text-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right column - Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wide text-canvas-text-tertiary">
                Key Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-md text-sm font-mono text-canvas-text border border-accent-dim bg-accent-faint/50 text-accent-bright"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
