'use client'

import { ChevronRight } from 'lucide-react'
import { TransitionLink } from '@/components/transitions/TransitionLink'

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
    <footer className="relative w-full px-6 md:px-12 py-20 md:py-32 border-t border-canvas-border/20 bg-canvas-elevated/10">
      <div className="max-w-5xl mx-auto">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32">
          {metrics.map((metric, idx) => (
            <div key={idx} className="space-y-2 select-none">
              <p className="text-[10px] font-mono text-canvas-text-tertiary uppercase tracking-widest">
                {metric.label}
              </p>
              <p className="text-3xl md:text-5xl font-heading font-bold text-accent-bright leading-none">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Next Project Teaser Card */}
        <TransitionLink
          href={nextProjectHref}
          className="block group"
          data-cursor="pointer"
        >
          <div className="relative p-8 md:p-14 lg:p-16 bg-canvas-card/20 rounded-xl border border-canvas-border/30 hover:border-accent-bright/50 hover:bg-canvas-card/45 transform hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden shadow-2xl">
            {/* Hover overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-bright/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative flex items-center justify-between gap-8 select-none">
              <div className="flex-1 space-y-3">
                <p className="text-[10px] font-mono text-accent-bright uppercase tracking-widest">// up.next</p>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] text-canvas-text tracking-tight uppercase group-hover:text-accent-bright transition-colors duration-300">
                  {nextProjectTitle}
                </h3>
                {nextProjectSubtitle && (
                  <p className="text-sm md:text-base text-canvas-text-secondary pt-1 font-mono">
                    {nextProjectSubtitle}
                  </p>
                )}
              </div>

              {/* Arrow button */}
              <div className="flex-shrink-0 hidden md:flex items-center justify-center w-14 h-14 rounded-lg bg-canvas-elevated border border-canvas-border group-hover:bg-accent-bright group-hover:border-accent-bright group-hover:text-canvas-bg text-accent-bright transition-all duration-500">
                <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </div>

            {/* Mobile arrow */}
            <div className="md:hidden flex items-center gap-2 text-accent-bright mt-6 font-mono text-[10px] uppercase tracking-wider">
              <span>explore</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </TransitionLink>

        {/* Footer info label */}
        <div className="mt-20 md:mt-28 pt-10 border-t border-canvas-border/10 flex items-center justify-center text-center font-mono text-[9px] text-canvas-text-tertiary select-none">
          <span>// benaih_shaback_galavu_portfolio_manifest.v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}
