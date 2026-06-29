import React from 'react';

interface PullQuoteProps {
  text: string;
  author?: string;
  accentHue?: number;
  className?: string;
}

/**
 * PullQuote
 * Large italic quote for asymmetric layouts and feature sections.
 * 
 * Features:
 * - Large, italic display text
 * - Optional author attribution
 * - Dynamic accent color support
 * - Semantic HTML (<blockquote>)
 * - Responsive font sizing
 * 
 * Usage:
 * <PullQuote 
 *   text="The most beautiful interface is the invisible one."
 *   author="—Alan Cooper"
 *   accentHue={164}
 * />
 */
export function PullQuote({
  text,
  author,
  accentHue,
  className = '',
}: PullQuoteProps) {
  const style = accentHue !== undefined
    ? ({
        '--accent-h': accentHue,
      } as React.CSSProperties)
    : undefined;

  return (
    <blockquote
      style={style}
      className={`space-y-4 ${className}`}
    >
      {/* Quote mark indicator */}
      <div className="flex items-start gap-3">
        <span className="text-4xl md:text-5xl text-accent-bright/40 leading-none">
          &ldquo;
        </span>
      </div>

      {/* Quote text */}
      <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-light italic leading-tight text-canvas-text">
        {text}
      </p>

      {/* Author */}
      {author && (
        <p className="text-base md:text-lg text-canvas-text-secondary font-mono pt-4">
          {author}
        </p>
      )}

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 w-1 h-12 bg-accent-bright opacity-40" />
    </blockquote>
  );
}
