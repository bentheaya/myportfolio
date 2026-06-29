'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Metric {
  label: string
  value: string
}

interface MetricsSectionProps {
  metrics: Metric[]
  nextProjectTitle: string
  nextProjectHref: string
  nextProjectSubtitle?: string
}

export function MetricsSection({
  metrics,
  nextProjectTitle,
  nextProjectHref,
  nextProjectSubtitle,
}: MetricsSectionProps) {
  return (
    <footer className="relative w-full px-4 md:px-8 py-20 md:py-32 border-t border-canvas-border/20 bg-canvas-elevated/30">
      <div className="max-w-6xl mx-auto">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
          {metrics.map((metric, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-xs md:text-sm font-mono text-canvas-text-tertiary uppercase tracking-wider">
                {metric.label}
              </p>
              <p className="text-3xl md:text-4xl font-heading font-bold accent-text">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Next Project Card */}
        <Link
          href={nextProjectHref}
          className="block group"
        >
          <div className="relative p-8 md:p-12 lg:p-16 surface-card rounded-xl border border-canvas-border hover:border-accent-bright/50 transition-all duration-300 overflow-hidden">
            {/* Hover gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-bright/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Content */}
            <div className="relative flex items-center justify-between gap-8">
              <div className="flex-1 space-y-3">
                <p className="text-xs md:text-sm font-mono text-accent-bright uppercase tracking-wider">
                  Next Project
                </p>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-pretty group-hover:accent-text transition-colors duration-300">
                  {nextProjectTitle}
                </h3>
                {nextProjectSubtitle && (
                  <p className="text-base md:text-lg text-canvas-text-secondary pt-2">
                    {nextProjectSubtitle}
                  </p>
                )}
              </div>

              {/* Arrow icon */}
              <div className="flex-shrink-0 hidden md:flex items-center justify-center w-16 h-16 rounded-lg bg-accent-bright/10 group-hover:bg-accent-bright/20 transition-colors duration-300">
                <ChevronRight className="w-8 h-8 text-accent-bright group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Mobile arrow */}
            <div className="md:hidden flex items-center gap-2 text-accent-bright mt-6 group-hover:gap-3 transition-all duration-300">
              <span className="text-sm font-mono uppercase tracking-wider">Explore</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* Footer note */}
        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-canvas-border/20">
          <p className="text-center text-sm text-canvas-text-tertiary">
            Part of a comprehensive portfolio. More projects coming soon.
          </p>
        </div>
      </div>
    </footer>
  )
}
