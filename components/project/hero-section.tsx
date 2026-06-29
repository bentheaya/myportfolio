'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface HeroSectionProps {
  backHref?: string
  domain: string
  title: string
  subtitle?: string
}

export function HeroSection({ backHref = '/work', domain, title, subtitle }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-20 overflow-hidden">
      {/* Layout brackets - top left */}
      <div className="absolute top-8 left-4 md:left-8 text-canvas-text-tertiary pointer-events-none">
        <div className="text-xl md:text-2xl font-mono tracking-wider leading-none">
          <span className="opacity-40">{'['}</span>
        </div>
      </div>

      {/* Layout brackets - bottom right */}
      <div className="absolute bottom-8 right-4 md:right-8 text-canvas-text-tertiary pointer-events-none">
        <div className="text-xl md:text-2xl font-mono tracking-wider leading-none">
          <span className="opacity-40">{']'}</span>
        </div>
      </div>

      {/* Back link */}
      <div className="w-full max-w-6xl mx-auto mb-12 md:mb-16">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-canvas-text-secondary hover:text-accent-bright transition-colors duration-200 group"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm md:text-base font-mono uppercase tracking-wide">all work</span>
        </Link>
      </div>

      {/* Content container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Domain chip */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-accent-bright/30 bg-accent-bright/5 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-bright" />
            <span className="text-xs md:text-sm font-mono text-accent-bright uppercase tracking-wider">
              {domain}
            </span>
          </div>
        </div>

        {/* Massive fluid title */}
        <h1 className="text-fluid-hero font-heading font-bold leading-tight mb-6 md:mb-8 text-pretty">
          {title}
        </h1>

        {/* Subtitle if provided */}
        {subtitle && (
          <p className="text-lg md:text-xl text-canvas-text-secondary leading-relaxed max-w-3xl text-pretty">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce md:opacity-100 opacity-75">
        <span className="text-xs font-mono text-canvas-text-tertiary uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border border-canvas-text-tertiary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-canvas-text-tertiary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
