'use client';

import React, { useEffect, useRef } from 'react';
import { useHue } from '@/components/hue/HueProvider';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { scrollTriggerText } from '@/lib/animations';

interface ContactLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  email?: string;
  links?: ContactLink[];
  className?: string;
}

export function ContactSection({
  title = "Let's connect",
  subtitle = 'Have a project in mind? Interested in collaborating?',
  email = 'hello@example.com',
  links = [],
  className = '',
}: ContactSectionProps) {
  const { hue } = useHue();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emailRef   = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (headingRef.current) scrollTriggerText(headingRef.current, 0);
  }, []);

  return (
    <footer className={`w-full py-20 md:py-32 px-4 border-t border-canvas-border/20 bg-canvas-elevated/30 ${className}`}>
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Heading + subtitle */}
        <div className="space-y-5">
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-heading font-bold text-canvas-text leading-[0.95]"
          >
            {title}
          </h2>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-base md:text-lg text-canvas-text-secondary max-w-xl">
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Email CTA */}
        {email && (
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-widest text-canvas-text-tertiary">
                // drop a line
              </p>
              <a
                ref={emailRef}
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-3 text-xl md:text-3xl font-heading font-bold text-canvas-text hover:text-accent-bright transition-colors duration-300"
              >
                <span>{email}</span>
                <svg
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        )}

        {/* Links */}
        {links.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {links.map((link, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 0.08}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-canvas-border bg-canvas-elevated/40 hover:border-accent-bright/60 hover:bg-accent-faint/20 transition-all duration-300"
                >
                  {link.icon && (
                    <span className="text-accent-bright group-hover:scale-110 transition-transform duration-200">
                      {link.icon}
                    </span>
                  )}
                  <span className="text-sm font-mono text-canvas-text group-hover:text-accent-bright transition-colors duration-200">
                    {link.label}
                  </span>
                  <span className="ml-auto text-canvas-text-tertiary group-hover:text-accent-bright group-hover:translate-x-0.5 transition-all duration-200 text-xs">
                    →
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Footer bar */}
        <ScrollReveal animation="fade" delay={0.3}>
          <div className="pt-8 border-t border-canvas-border/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs font-mono text-canvas-text-tertiary">
              © {new Date().getFullYear()} Benaih Shaback · Built with Next.js &amp; Three.js
            </p>
            <p className="text-xs font-mono text-accent-bright/70">
              // system.hue: {hue}°
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
