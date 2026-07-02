'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface AboutSectionProps {
  title?: string;
  paragraphs: string[];
  highlights?: string[];
  className?: string;
}

/**
 * AboutSection
 * Redesigned with photo integration.
 * Two-column layout: photo (right) + bio text (left).
 * Photo has cinematic dark treatment: desaturated, accent-glow border, noise overlay.
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
        {/* Section label */}
        <span className="text-xs font-mono text-accent-bright mb-4 block">// identity.node</span>

        {/* Main grid: bio left, photo right on desktop */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">

          {/* Left column: Title + Bio + Skills (3/5 cols) */}
          <div className="md:col-span-3 space-y-8">
            <ScrollReveal animation="fade-up">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-canvas-text leading-tight">
                {title}
              </h2>
            </ScrollReveal>

            <div className="space-y-5">
              {paragraphs.map((paragraph, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 0.08}>
                  <p className="text-base md:text-lg text-canvas-text-secondary leading-relaxed">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            {/* Skills grid */}
            {highlights && highlights.length > 0 && (
              <ScrollReveal animation="fade-up" delay={0.2}>
                <div className="space-y-3 pt-2">
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-canvas-text-tertiary">
                    // stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-md text-xs font-mono border border-canvas-border bg-canvas-elevated/50 text-canvas-text-secondary hover:border-accent-dim hover:text-accent-bright transition-all duration-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right column: Photo (2/5 cols) */}
          <div className="md:col-span-2">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="relative group">
                {/* Accent glow behind photo */}
                <div className="absolute -inset-1 rounded-2xl bg-accent-bright/10 blur-xl group-hover:bg-accent-bright/15 transition-all duration-700 pointer-events-none" />

                {/* Photo container */}
                <div className="relative rounded-2xl overflow-hidden border border-canvas-border/30 bg-canvas-card">
                  <Image
                    src="/benaih.jpg"
                    alt="Benaih Shaback Galavu"
                    width={480}
                    height={640}
                    className="w-full object-cover object-top grayscale-[30%] contrast-[1.05] brightness-[0.92] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    priority={false}
                  />

                  {/* Cinematic dark overlay gradient (fade to bg at bottom) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas-bg/70 via-canvas-bg/10 to-transparent pointer-events-none" />

                  {/* Name label at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-canvas-text-tertiary">
                      // benaih.shaback
                    </p>
                    <p className="text-xs font-mono text-canvas-text-secondary">
                      Mathematics & Computer Science — Maseno University
                    </p>
                  </div>
                </div>

                {/* Decorative corner brackets */}
                <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-accent-bright/50 rounded-tl-sm pointer-events-none" />
                <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-accent-bright/50 rounded-tr-sm pointer-events-none" />
                <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-accent-bright/50 rounded-bl-sm pointer-events-none" />
                <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-accent-bright/50 rounded-br-sm pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
