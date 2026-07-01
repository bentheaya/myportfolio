'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TextReveal } from '@/components/ui/text-reveal';

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-canvas-bg pt-12 md:pt-20">
      {/* Hero section */}
      <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-mono text-accent-bright">// editorial.profile</span>
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-canvas-text leading-none uppercase">
          About Benaih
        </h1>
        <p className="text-base md:text-xl text-canvas-text-secondary font-mono leading-relaxed">
          Mathematics & Computer Science researcher developing low-latency backend architectures and neuro-symbolic systems.
        </p>
      </section>

      {/* Editorial Sections (No bullet points) */}
      <section className="py-12 md:py-20 px-6 border-t border-canvas-border/20 max-w-4xl mx-auto space-y-16 md:space-y-24">
        
        {/* Section 1: The Core Synthesis */}
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6">
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
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6">
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
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6">
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
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6">
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

        {/* Section 5: Pedagogical Design */}
        <ScrollReveal animation="fade-up" className="grid md:grid-cols-3 gap-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-accent-bright md:col-span-1">
            05. Active Pedagogy
          </h2>
          <div className="md:col-span-2 space-y-4">
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              Learning is an active process of rediscovery, not passive consumption. I design educational interfaces where users experiment with variables directly, observing changes dynamically on vector graphs while receiving Socratic hints rather than plain answers.
            </p>
            <p className="text-base leading-relaxed text-canvas-text-secondary">
              By keeping the user in an active discovery feedback loop, my software platforms help students build deep conceptual intuitions that transcend standard memorization boundaries.
            </p>
          </div>
        </ScrollReveal>

      </section>

      {/* Footer Info HUD */}
      <section className="py-16 md:py-24 px-6 border-t border-canvas-border/10 max-w-4xl mx-auto flex items-center justify-center font-mono text-[9px] text-canvas-text-tertiary uppercase select-none">
        <span>// profile.status: compile_complete</span>
      </section>
    </main>
  );
}
