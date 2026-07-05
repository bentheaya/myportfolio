'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TextReveal } from '@/components/ui/text-reveal';
import { AboutHeroScene } from '@/components/ui/about-hero-scene';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Philosophy statement card with local geometric/particle canvas burst on entry
function PhilosophyCard({ title, text }: { title: string; text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const triggerBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    
    // Spawn 25 particles in the center of the card
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.8;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 2,
        alpha: 1
      });
    }

    let frameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95; // drag
        p.vy *= 0.95;
        p.alpha -= 0.022; // fade out
        if (p.alpha > 0) {
          alive = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(var(--accent-h), 75%, 60%, ${p.alpha})`;
          ctx.fill();
        }
      });
      if (alive) {
        frameId = requestAnimationFrame(animate);
      }
    };
    animate();
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      onEnter: () => {
        triggerBurst();
        gsap.fromTo(card.querySelector('.card-content'), 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
        );
      },
      once: true
    });
    return () => st.kill();
  }, []);

  return (
    <div ref={cardRef} className="relative p-6 rounded-xl border border-canvas-border bg-canvas-elevated/30 overflow-hidden min-h-[140px] flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="card-content opacity-0 z-10 text-center space-y-2 select-none">
        <h4 className="text-xs font-mono font-bold text-accent-bright uppercase tracking-wider">// {title}</h4>
        <p className="text-sm text-canvas-text-secondary leading-relaxed max-w-md font-mono">{text}</p>
      </div>
    </div>
  );
}

// Stack pill with dynamic expand explanations + micro-icon rotation
function StackPill({ name, desc, icon }: { name: string; desc: string; icon: string }) {
  return (
    <div className="group flex items-start gap-3 p-4 rounded-xl border border-canvas-border bg-canvas-elevated/30 hover:border-accent-bright/40 hover:bg-canvas-card transition-all duration-300 cursor-pointer overflow-hidden w-full">
      <div className="text-accent-bright text-sm font-mono mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 select-none">
        {icon}
      </div>
      <div className="flex flex-col space-y-1 w-full">
        <span className="text-xs font-mono font-bold text-canvas-text uppercase tracking-wider">{name}</span>
        <span className="text-[10px] font-mono text-canvas-text-secondary max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out leading-relaxed">
          {desc}
        </span>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Staggered Left Borders Reveal
    const borders = el.querySelectorAll('.section-border-line');
    const borderTriggers: ScrollTrigger[] = [];
    borders.forEach((border) => {
      const st = gsap.to(border, {
        scaleY: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: border.parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
      if (st.scrollTrigger) borderTriggers.push(st.scrollTrigger);
    });

    // 2. Timeline Progress Line Scroll-fill animation
    const timelineSt = gsap.to('.timeline-progress-line', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: true,
      }
    });

    // 3. Timeline Milestone Dots lighting up
    const steps = el.querySelectorAll('.timeline-step');
    const stepTriggers: ScrollTrigger[] = [];
    steps.forEach((step) => {
      const dot = step.querySelector('.timeline-dot');
      const st = ScrollTrigger.create({
        trigger: step,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(dot, { 
            borderColor: 'var(--color-accent-bright)', 
            backgroundColor: 'var(--color-accent-bright)', 
            filter: 'drop-shadow(0 0 6px var(--color-accent-bright))', 
            duration: 0.3 
          });
        },
        onLeaveBack: () => {
          gsap.to(dot, { 
            borderColor: 'var(--color-canvas-border)', 
            backgroundColor: 'rgb(8 8 8)', 
            filter: 'none', 
            duration: 0.3 
          });
        }
      });
      stepTriggers.push(st);
    });

    return () => {
      borderTriggers.forEach(t => t.kill());
      if (timelineSt.scrollTrigger) timelineSt.scrollTrigger.kill();
      timelineSt.kill();
      stepTriggers.forEach(t => t.kill());
    };
  }, []);

  const stackItems = [
    { name: 'Mathematics', desc: 'Differential geometry models, geodesic path optimizations, KL-divergence matrices.', icon: '∫' },
    { name: 'TypeScript / Next.js', desc: 'Low-latency frontend rendering cycles, custom hook matrices, page transitions.', icon: 'λ' },
    { name: 'Python / PyTorch', desc: 'Deep learning classifiers, Gemini multi-modal interfaces, temporal mapping.', icon: 'π' },
    { name: 'Prolog / expert systems', desc: 'Symbolic logic constraint validation, semantic rule compiler engines.', icon: '⇒' },
    { name: 'PostgreSQL / PostGIS', desc: 'Spatial database schemas, geographic coordinates indexing, fast routing.', icon: '⌖' },
    { name: 'Redis Pub/Sub', desc: 'Distributed queue management, transactional route state caching layers.', icon: '⚡' },
  ];

  return (
    <main ref={pageRef} className="w-full min-h-screen bg-canvas-bg pt-20 md:pt-28">
      {/* Hero section: Typography left, 3D math torus knot wireframe right */}
      <section className="py-12 md:py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-mono text-accent-bright">// editorial.profile</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-canvas-text leading-none uppercase">
            About Benaih
          </h1>
          <p className="text-base md:text-lg text-canvas-text-secondary font-mono leading-relaxed">
            Mathematics & Computer Science researcher developing low-latency backend architectures and neuro-symbolic systems. Fusing abstract manifolds with high-concurrency routing layers.
          </p>
        </div>
        <div className="w-full h-full min-h-[300px]">
          <AboutHeroScene />
        </div>
      </section>

      {/* Editorial Sections with Left-Border Accent Lines drawing on scroll */}
      <section className="py-12 md:py-20 px-6 border-t border-canvas-border/20 max-w-5xl mx-auto space-y-16 md:space-y-24">
        
        {/* Section 1: The Core Synthesis */}
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6 pl-6 border-l border-canvas-border/10 relative py-4">
          <div className="absolute left-0 top-0 w-[1.5px] h-full bg-accent-bright origin-top scale-y-0 section-border-line" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-accent-bright md:col-span-1">
            01. Core Synthesis
          </h2>
          <div className="md:col-span-2 space-y-4">
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              My engineering approach sits at the convergence of pure mathematical logic and scalable systems design. I believe software interfaces shouldn't just present data—they should illuminate underlying logic structures, letting complex information display itself transparently and naturally.
            </p>
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              Through my coursework at Maseno University and independent research, I focus on transforming abstract algebraic representations, manifold coordinates, and symbolic logic states into robust, highly-optimized runtime engines.
            </p>
          </div>
        </ScrollReveal>

        {/* Section 2: Mathematical Manifolds */}
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6 pl-6 border-l border-canvas-border/10 relative py-4">
          <div className="absolute left-0 top-0 w-[1.5px] h-full bg-accent-bright origin-top scale-y-0 section-border-line" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-accent-bright md:col-span-1">
            02. Manifold Geometry
          </h2>
          <div className="md:col-span-2 space-y-4">
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              I study non-Euclidean vector representations to map mathematical similarities along curved manifolds rather than flat spaces. Fusing geodesic path integrals governed by Christoffel acceleration symbols with Kullback-Leibler information divergence allows me to build robust, noise-resilient analytics pipelines.
            </p>
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              This geometric perspective extends directly into my systems engineering, helping structure data topology, coordinate index routing parameters, and cache invalidation matrices cleanly and predictably.
            </p>
          </div>
        </ScrollReveal>

        {/* Section 3: Logic Programming */}
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6 pl-6 border-l border-canvas-border/10 relative py-4">
          <div className="absolute left-0 top-0 w-[1.5px] h-full bg-accent-bright origin-top scale-y-0 section-border-line" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-accent-bright md:col-span-1">
            03. Neuro-Symbolic AI
          </h2>
          <div className="md:col-span-2 space-y-4">
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              While probabilistic models are highly expressive, they lack explicit deterministic verification boundaries. My research explores neuro-symbolic systems that couple modern multi-modal pipelines with rigid, symbolic logic programming cores.
            </p>
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              By compiling Kenya Ministry of Health nutrition directives into Prolog rule matrices and parsing user inputs through custom Django middleware, I demonstrate how to enforce safety, transparency, and accountability across consumer health platforms.
            </p>
          </div>
        </ScrollReveal>

        {/* Section 4: Distributed Backends */}
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6 pl-6 border-l border-canvas-border/10 relative py-4">
          <div className="absolute left-0 top-0 w-[1.5px] h-full bg-accent-bright origin-top scale-y-0 section-border-line" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-accent-bright md:col-span-1">
            04. Distributed Strata
          </h2>
          <div className="md:col-span-2 space-y-4">
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              Monolithic architectures often obscure localized failures. I build distributed systems that decompose operations into explicit event-driven microservices. My backend designs focus on strict service boundaries, PostGIS geospatial radius indexing, and Redis caching topologies.
            </p>
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              From real-time driver allocation locks for Maseno ride-hailing networks to API gateways managing downstream isolation, I prioritize message integrity, idempotency, and transactional consistency above all.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Dynamic Journey Timeline Section */}
      <section className="py-16 md:py-24 px-6 border-t border-canvas-border/20 max-w-5xl mx-auto space-y-12 timeline-container">
        <div className="space-y-2 max-w-2xl mx-auto text-center">
          <span className="text-xs font-mono text-accent-bright">// journey.chronology</span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-canvas-text uppercase">Milestones & Timeline</h3>
        </div>

        <div className="relative pl-8 max-w-2xl mx-auto py-12 space-y-12">
          {/* Static gray pipeline wire */}
          <div className="absolute left-[7px] top-0 w-[1.5px] h-full bg-canvas-border/30" />
          {/* Glowing dynamic filling wire */}
          <div className="absolute left-[7px] top-0 w-[1.5px] bg-accent-bright origin-top scale-y-0 timeline-progress-line" style={{ height: '100%' }} />
          
          {/* Chronology 1 */}
          <div className="relative timeline-step">
            <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-canvas-border bg-canvas-bg transition-colors duration-300 timeline-dot" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-accent-bright">// 2022 - 2026</span>
              <h4 className="text-base font-bold text-canvas-text uppercase tracking-wide">Academic Foundations</h4>
              <p className="text-sm text-canvas-text-secondary leading-relaxed font-mono">
                Maseno University. B.Sc. Mathematics & Computer Science. Specialized in computational geometry, algebraic structures, and mathematical modeling.
              </p>
            </div>
          </div>

          {/* Chronology 2 */}
          <div className="relative timeline-step">
            <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-canvas-border bg-canvas-bg transition-colors duration-300 timeline-dot" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-accent-bright">// 2024 - 2025</span>
              <h4 className="text-base font-bold text-canvas-text uppercase tracking-wide">Logic & API Infrastructure</h4>
              <p className="text-sm text-canvas-text-secondary leading-relaxed font-mono">
                Engineered neuro-symbolic nutrition expert systems (Prolog rules logic) and managed microservice routing APIs inside Django frameworks.
              </p>
            </div>
          </div>

          {/* Chronology 3 */}
          <div className="relative timeline-step">
            <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-canvas-border bg-canvas-bg transition-colors duration-300 timeline-dot" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-accent-bright">// 2025 - Present</span>
              <h4 className="text-base font-bold text-canvas-text uppercase tracking-wide">Applied AI & Spatial Engineering</h4>
              <p className="text-sm text-canvas-text-secondary leading-relaxed font-mono">
                Initiated SlopSlayer for real-time temporal classification, and Dira AR Pathfinder spatial state cache routing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Highlights with tooltips */}
      <section className="py-16 md:py-24 px-6 border-t border-canvas-border/20 max-w-5xl mx-auto space-y-12">
        <div className="space-y-2 text-center">
          <span className="text-xs font-mono text-accent-bright">// tooling.strata</span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-canvas-text uppercase">Specialized Stack</h3>
          <p className="text-xs font-mono text-canvas-text-tertiary">Hover pills to inspect description</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {stackItems.map((item, idx) => (
            <ScrollReveal key={item.name} animation="fade-up" delay={idx * 0.05}>
              <StackPill name={item.name} desc={item.desc} icon={item.icon} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Core Philosophies with Canvas particle burst on enter */}
      <section className="py-16 md:py-24 px-6 border-t border-canvas-border/20 max-w-5xl mx-auto space-y-12">
        <div className="space-y-2 text-center">
          <span className="text-xs font-mono text-accent-bright">// systems.values</span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-canvas-text uppercase">Core Philosophies</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <PhilosophyCard 
            title="Rigid Constraints" 
            text="Safety and integrity require mathematical logic bounds, not just probabilistic guesses." 
          />
          <PhilosophyCard 
            title="Logic Tactility" 
            text="Complex structures must be interactively browseable and feel physically alive to users." 
          />
          <PhilosophyCard 
            title="Active Discovery" 
            text="Pedagogy succeeds when students alter variables directly, observing results dynamically." 
          />
        </div>
      </section>

      {/* Footer Info HUD */}
      <section className="py-16 md:py-24 px-6 border-t border-canvas-border/10 max-w-5xl mx-auto flex items-center justify-center font-mono text-[9px] text-canvas-text-tertiary uppercase select-none">
        <span>// profile.status: compile_complete</span>
      </section>
    </main>
  );
}
