'use client';

import React, { useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useHue } from '@/components/hue/HueProvider';
import { ContactHeroScene } from '@/components/ui/contact-hero-scene';
import { ArrowUpRight, Send } from 'lucide-react';

export default function ContactPage() {
  const { hue } = useHue();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const links = [
    { 
      label: 'Email', 
      value: 'bentheaya@gmail.com', 
      href: 'mailto:bentheaya@gmail.com', 
      icon: (
        <svg className="w-5 h-5 text-accent-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Mail Icon">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    },
    { 
      label: 'GitHub', 
      value: 'github.com/bentheaya', 
      href: 'https://github.com/bentheaya', 
      icon: (
        <svg className="w-5 h-5 text-accent-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="GitHub Icon">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )
    },
    { 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/bentheaya', 
      href: 'https://linkedin.com/in/bentheaya', 
      icon: (
        <svg className="w-5 h-5 text-accent-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="LinkedIn Icon">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API compile ingress
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <main className="w-full min-h-screen bg-canvas-bg pt-20 md:pt-28 flex flex-col justify-between">
      
      {/* Contact Grid Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Intro + Underlined Form Fields */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono text-accent-bright">// network.ingress</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-canvas-text leading-none uppercase select-none">
              Get in touch
            </h1>
            <p className="text-sm md:text-base text-canvas-text-secondary font-mono leading-relaxed max-w-md select-none">
              Have a question about my research, want to discuss a project collaboration, or review backend engineering strategies? Let's connect.
            </p>
          </div>

          {/* Message compile form */}
          <form onSubmit={handleSubmit} className="space-y-6 pt-2 font-mono">
            {/* Name */}
            <div className="relative group w-full">
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-transparent border-b border-canvas-border/50 py-3 text-xs text-canvas-text focus:outline-none placeholder-canvas-text-tertiary focus:border-canvas-border transition-colors duration-300"
                placeholder="INGRESS_NAME"
              />
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-bright scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center duration-500" />
            </div>

            {/* Email */}
            <div className="relative group w-full">
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-transparent border-b border-canvas-border/50 py-3 text-xs text-canvas-text focus:outline-none placeholder-canvas-text-tertiary focus:border-canvas-border transition-colors duration-300"
                placeholder="SENDER_EMAIL"
              />
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-bright scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center duration-500" />
            </div>

            {/* Message */}
            <div className="relative group w-full">
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-transparent border-b border-canvas-border/50 py-3 text-xs text-canvas-text focus:outline-none placeholder-canvas-text-tertiary focus:border-canvas-border transition-colors duration-300 resize-none"
                placeholder="CORPUS_MESSAGE_DATA"
              />
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-bright scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center duration-500" />
            </div>

            {/* Submit button with compiled visual pulse states */}
            <button
              type="submit"
              disabled={submitted}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg border font-mono text-xs transition-all duration-300 ${
                submitted
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'border-canvas-border hover:border-accent-bright hover:bg-accent-bright hover:text-canvas-bg hover:shadow-[0_0_12px_var(--color-accent-bright)] text-canvas-text-secondary'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitted ? 'TRANSMISSION_COMPLETE' : 'DISPATCH_MESSAGE'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: 3D Node Sphere + Ripple Social Matrices */}
        <div className="space-y-8">
          <div className="w-full">
            <ContactHeroScene />
          </div>

          {/* Ripple interactive social link list */}
          <div className="grid gap-4 pt-2">
            {links.map((link, idx) => {
              return (
                <ScrollReveal
                  key={link.label}
                  animation="fade-up"
                  delay={idx * 0.08}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-5 rounded-xl border border-canvas-border bg-canvas-card/20 hover:border-accent-bright/50 hover:bg-canvas-card/40 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Ring hover ripple ping overlay */}
                    <div className="absolute inset-0 bg-accent-bright/[0.03] scale-0 group-hover:scale-100 transition-transform duration-700 ease-out origin-center opacity-0 group-hover:opacity-100 pointer-events-none z-0" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-canvas-elevated border border-canvas-border group-hover:border-accent-bright/35 transition-colors duration-300">
                          {link.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-mono text-canvas-text-tertiary uppercase">{link.label}</span>
                          <span className="text-xs font-mono text-canvas-text font-bold truncate mt-0.5">
                            {link.value}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-canvas-text-tertiary group-hover:text-accent-bright group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </section>

      {/* Footer HUD (carrying the live system hue indicator!) */}
      <footer className="py-12 px-6 border-t border-canvas-border/10 w-full mt-12 bg-canvas-bg/5 select-none">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-canvas-text-tertiary uppercase select-none">
          <span>// location: nairobi_kenya</span>
          <span className="text-accent-bright animate-pulse">
            // active_system.hue: {hue}°
          </span>
          <span>© 2026 benaih_shaback</span>
        </div>
      </footer>
    </main>
  );
}
