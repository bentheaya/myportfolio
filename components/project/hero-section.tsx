'use client'

import React, { useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import { TransitionLink } from '@/components/transitions/TransitionLink'
import { useHue } from '@/components/hue/HueProvider'

interface HeroSectionProps {
  backHref?: string
  domain: string
  title: string
  subtitle?: string
  accentHue?: number
  slug?: string
}

export function HeroSection({ 
  backHref = '/work', 
  domain, 
  title, 
  subtitle,
  accentHue,
  slug
}: HeroSectionProps) {
  const { hue } = useHue()

  useEffect(() => {
    if (accentHue === undefined) return

    // Save previous active hue
    const previousHue = document.documentElement.style.getPropertyValue('--accent-h')

    // Override active hue to project-specific accent hue
    document.documentElement.style.setProperty('--accent-h', accentHue.toString())

    return () => {
      // Restore previous user hue on unmount
      if (previousHue) {
        document.documentElement.style.setProperty('--accent-h', previousHue)
      } else {
        document.documentElement.style.setProperty('--accent-h', hue.toString())
      }
    }
  }, [accentHue, hue])

  // Custom flagship background rendering
  const renderBrandedBackground = () => {
    if (slug === 'slopslayer') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-20">
          {/* Dotted grid map overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Laser scan lines */}
          <div className="absolute left-0 top-0 w-full h-[1px] bg-accent-bright animate-scan-laser-hero" />
          
          {/* Tech HUD corner brackets */}
          <div className="absolute top-12 left-12 w-6 h-6 border-t-2 border-l-2 border-accent-bright/40" />
          <div className="absolute top-12 right-12 w-6 h-6 border-t-2 border-r-2 border-accent-bright/40" />
          <div className="absolute bottom-12 left-12 w-6 h-6 border-b-2 border-l-2 border-accent-bright/40" />
          <div className="absolute bottom-12 right-12 w-6 h-6 border-b-2 border-r-2 border-accent-bright/40" />
        </div>
      )
    }

    if (slug === 'intuilab') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-10">
          {/* Drifting science particles */}
          <div className="absolute w-44 h-44 rounded-full bg-accent-bright/10 filter blur-[80px] top-1/4 left-1/4 animate-particle-float-slow" />
          <div className="absolute w-56 h-56 rounded-full bg-accent-bright/8 filter blur-[100px] bottom-1/3 right-1/4 animate-particle-float-slower" />
        </div>
      )
    }

    if (slug === 'ukweli') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
          {/* Ultra-large faded text overlay */}
          <div className="opacity-[0.015] font-heading font-extrabold text-[26vw] uppercase tracking-widest text-canvas-text leading-none select-none">
            UKWELI
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-16 md:py-20 overflow-hidden bg-canvas-bg">
      {/* Branded background graphics overlay */}
      {renderBrandedBackground()}

      {/* Layout brackets - top left */}
      <div className="absolute top-8 left-6 md:left-12 text-canvas-text-tertiary pointer-events-none select-none">
        <div className="text-xl md:text-2xl font-mono tracking-wider leading-none">
          <span className="opacity-30">{'['}</span>
        </div>
      </div>

      {/* Layout brackets - bottom right */}
      <div className="absolute bottom-8 right-6 md:right-12 text-canvas-text-tertiary pointer-events-none select-none">
        <div className="text-xl md:text-2xl font-mono tracking-wider leading-none">
          <span className="opacity-30">{']'}</span>
        </div>
      </div>

      {/* Back link */}
      <div className="w-full max-w-5xl mx-auto mb-12 md:mb-16 z-10">
        <TransitionLink
          href={backHref}
          className="inline-flex items-center gap-2 text-canvas-text-secondary hover:text-accent-bright transition-colors duration-200 group"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-xs md:text-sm font-mono uppercase tracking-wider">// all work</span>
        </TransitionLink>
      </div>

      {/* Content container */}
      <div className="w-full max-w-5xl mx-auto z-10 select-none">
        {/* Domain chip */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-accent-bright/35 bg-accent-bright/5 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-bright animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono text-accent-bright uppercase tracking-widest">
              {domain}
            </span>
          </div>
        </div>

        {/* Massive fluid title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] tracking-tight uppercase mb-6 md:mb-8 text-canvas-text text-pretty">
          {title}
        </h1>

        {/* Subtitle if provided */}
        {subtitle && (
          <p className="text-base md:text-xl text-canvas-text-secondary leading-relaxed max-w-3xl font-mono">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce select-none pointer-events-none opacity-50">
        <span className="text-[9px] font-mono text-canvas-text-tertiary uppercase tracking-widest">Scroll</span>
        <div className="w-4 h-7 border border-canvas-text-tertiary/60 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 bg-canvas-text-tertiary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
