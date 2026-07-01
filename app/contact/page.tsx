'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useHue } from '@/components/hue/HueProvider';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  const { hue } = useHue();

  const links = [
    { label: 'Email', value: 'bentheaya@gmail.com', href: 'mailto:bentheaya@gmail.com', icon: Mail },
    { label: 'GitHub', value: 'github.com/bentheaya', href: 'https://github.com/bentheaya', icon: Github },
    { label: 'LinkedIn', value: 'linkedin.com/in/bentheaya', href: 'https://linkedin.com/in/bentheaya', icon: Linkedin },
  ];

  return (
    <main className="w-full min-h-screen bg-canvas-bg pt-12 md:pt-20 flex flex-col justify-between">
      {/* Contact Section */}
      <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto w-full space-y-12">
        <div className="space-y-4">
          <span className="text-xs font-mono text-accent-bright">// network.ingress</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-canvas-text leading-none uppercase select-none">
            Get in touch
          </h1>
          <p className="text-base md:text-lg text-canvas-text-secondary font-mono leading-relaxed max-w-xl select-none">
            Have a question about my research, want to discuss a project collaboration, or review backend engineering strategies? Let's connect.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid gap-6 md:grid-cols-3 pt-6">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <ScrollReveal
                key={link.label}
                animation="fade-up"
                delay={idx * 0.1}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-xl border border-canvas-border bg-canvas-card/25 hover:border-accent-bright/50 hover:bg-canvas-card/45 transition-all duration-300 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-bright/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <Icon className="w-5 h-5 text-accent-bright" />
                      <ArrowUpRight className="w-4 h-4 text-canvas-text-tertiary group-hover:text-accent-bright group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-canvas-text-tertiary uppercase">{link.label}</span>
                      <p className="text-xs font-mono text-canvas-text font-bold truncate mt-1">
                        {link.value}
                      </p>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Footer HUD (carrying the live system hue indicator!) */}
      <footer className="py-12 px-6 border-t border-canvas-border/10 w-full">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-canvas-text-tertiary uppercase select-none">
          <span>// location: nairobi_kenya</span>
          <span className="text-accent-bright">
            // system.hue: {hue}°
          </span>
          <span>© 2026 benaih_shaback</span>
        </div>
      </footer>
    </main>
  );
}
