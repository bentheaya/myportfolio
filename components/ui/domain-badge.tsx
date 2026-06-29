'use client';

import React from 'react';

interface DomainBadgeProps {
  label: string;
  subtitle?: string;
  accentHue?: number;
  className?: string;
}

/**
 * DomainBadge
 * Pill-style tag component that displays project domain/category.
 * 
 * Features:
 * - Accepts custom accent hue via CSS variable override
 * - Compact, readable pill format
 * - Dynamic color system integration
 * - Responsive padding
 *
 * Usage:
 * <DomainBadge label="AI / Detection" accentHue={164} />
 */
export function DomainBadge({
  label,
  subtitle,
  accentHue,
  className = '',
}: DomainBadgeProps) {
  const style = accentHue !== undefined ? ({
    '--accent-h': accentHue,
  } as React.CSSProperties) : undefined;

  return (
    <div
      style={style}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-faint border border-accent-dim text-sm font-mono font-medium text-accent-bright ${className}`}
    >
      {/* Indicator dot */}
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-bright animate-pulse-accent" />
      
      {/* Label */}
      <span>{label}</span>
      
      {/* Optional subtitle */}
      {subtitle && (
        <>
          <span className="text-accent-dim">/</span>
          <span className="text-accent-dim">{subtitle}</span>
        </>
      )}
    </div>
  );
}
