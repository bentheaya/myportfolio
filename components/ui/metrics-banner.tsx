import React from 'react';

export interface MetricItem {
  label: string;
  value: string | number;
  unit?: string;
  accentHue?: number;
}

interface MetricsBannerProps {
  metrics: MetricItem[];
  layout?: 'horizontal' | 'grid';
  className?: string;
}

/**
 * MetricsBanner
 * Horizontal or grid stats display component.
 * 
 * Features:
 * - Two layout modes: horizontal (flex) and grid
 * - Dynamic accent color per metric
 * - Responsive sizing and spacing
 * - Clean, minimal aesthetic
 * - Perfect for showcasing project statistics
 * 
 * Usage:
 * <MetricsBanner
 *   layout="grid"
 *   metrics={[
 *     { label: 'Performance', value: '98', unit: '%' },
 *     { label: 'Accuracy', value: '99.2', unit: '%' }
 *   ]}
 * />
 */
export function MetricsBanner({
  metrics,
  layout = 'horizontal',
  className = '',
}: MetricsBannerProps) {
  const containerClasses =
    layout === 'horizontal'
      ? 'flex flex-wrap items-center justify-between gap-6'
      : 'grid grid-cols-2 md:grid-cols-4 gap-6';

  return (
    <div
      className={`w-full px-4 py-8 md:px-8 md:py-12 border-y border-canvas-border/50 bg-canvas-elevated/20 ${containerClasses} ${className}`}
    >
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          style={
            metric.accentHue
              ? ({
                  '--accent-h': metric.accentHue,
                } as React.CSSProperties)
              : undefined
          }
          className="flex flex-col gap-1"
        >
          {/* Value */}
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-heading font-bold text-accent-bright">
              {metric.value}
            </span>
            {metric.unit && (
              <span className="text-sm md:text-base text-canvas-text-secondary font-mono">
                {metric.unit}
              </span>
            )}
          </div>

          {/* Label */}
          <p className="text-xs md:text-sm font-mono text-canvas-text-tertiary uppercase tracking-wide">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
