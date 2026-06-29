'use client';

import React, { useState } from 'react';

interface StackPillProps {
  name: string;
  tooltip?: string;
  variant?: 'default' | 'accent' | 'subtle';
  className?: string;
}

/**
 * StackPill
 * Technology/skill tag with optional hover tooltip.
 * 
 * Features:
 * - Three visual variants (default, accent, subtle)
 * - Smooth hover effects
 * - Tooltip on hover (optional)
 * - Responsive sizing
 * 
 * Usage:
 * <StackPill name="React" tooltip="UI library" variant="accent" />
 */
export function StackPill({
  name,
  tooltip,
  variant = 'default',
  className = '',
}: StackPillProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const baseClasses =
    'px-3 py-1 rounded-md font-mono text-xs font-medium transition-all duration-200 cursor-default';

  const variantClasses = {
    default: 'bg-canvas-card border border-canvas-border text-canvas-text hover:border-canvas-text/50',
    accent:
      'bg-accent-faint border border-accent-dim text-accent-bright hover:bg-accent-faint/80 hover:border-accent-bright/60',
    subtle:
      'bg-canvas-elevated border border-canvas-border/40 text-canvas-text-secondary hover:bg-canvas-elevated/80',
  };

  return (
    <div className="relative inline-block">
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {name}
      </div>

      {/* Tooltip */}
      {tooltip && showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-canvas-elevated border border-canvas-border rounded text-xs text-canvas-text-secondary whitespace-nowrap z-50 animate-fadeIn">
          {tooltip}
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-1 bg-canvas-elevated transform rotate-45 -bottom-0.5" />
        </div>
      )}
    </div>
  );
}
