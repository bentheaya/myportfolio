'use client';

import React, { useState, useEffect, useRef } from 'react';
import { projectsMetadata } from '@/lib/projects';
import { ProjectCard } from '@/components/ui/project-card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ConnectionLineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  triggerEl: HTMLElement | null;
}

function ConnectionLine({ start, end, triggerEl }: ConnectionLineProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !triggerEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const length = path.getTotalLength();
    // Start with the path hidden
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        end: 'top 50%',
        scrub: true,
      }
    });

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, [start, end, triggerEl]);

  return (
    <path
      ref={pathRef}
      d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
      stroke="var(--color-accent-bright)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      fill="none"
      className="opacity-20"
    />
  );
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [centers, setCenters] = useState<{ x: number; y: number }[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillsRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { label: 'All Work', value: 'All' },
    { label: 'AI & Models', value: 'AI & Models' },
    { label: 'Spatial & Geometry', value: 'Spatial & Geometry' },
    { label: 'Architectures & Backends', value: 'Architectures & Backends' },
    { label: 'Civic Data & Archives', value: 'Civic Data & Archives' },
  ];

  // Initialize cardRefs array matching projectsMetadata
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, projectsMetadata.length);
  }, []);

  // Update card center coordinates for connection lines
  const updateCenters = () => {
    if (!gridRef.current) return;
    const gridRect = gridRef.current.getBoundingClientRect();
    const newCenters = cardRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      return {
        x: (rect.left + rect.width / 2) - gridRect.left,
        y: (rect.top + rect.height / 2) - gridRect.top
      };
    });
    setCenters(newCenters);
  };

  useEffect(() => {
    // Measure centers on mount and update on resize
    updateCenters();
    window.addEventListener('resize', updateCenters);
    
    // Animate pills in with stagger on mount
    if (pillsRef.current) {
      const pills = pillsRef.current.querySelectorAll('.filter-pill');
      gsap.fromTo(pills, 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.05, 
          ease: 'power3.out', 
          delay: 0.2 
        }
      );
    }

    return () => {
      window.removeEventListener('resize', updateCenters);
    };
  }, []);

  // Trigger recalculation when filtering changes (since layout height might shift)
  useEffect(() => {
    const timer = setTimeout(updateCenters, 300);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  return (
    <main className="w-full min-h-screen bg-canvas-bg pt-20 md:pt-28">
      {/* Header section with corrected Top Space */}
      <section className="pt-6 pb-12 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-accent-bright">// index.work</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-canvas-text leading-none uppercase select-none">
              Selected Projects
            </h1>
          </div>
          <p className="text-base md:text-lg text-canvas-text-secondary max-w-2xl font-mono leading-relaxed select-none">
            A comprehensive catalog of experimental software systems, neuro-symbolic models, and architectural designs built to scale.
          </p>

          {/* Filter Pills with staggered entry + neon active state glow */}
          <div ref={pillsRef} className="flex flex-wrap gap-2 pt-6">
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`filter-pill px-3.5 py-1.5 rounded-full font-mono text-xs border transition-all duration-300 ${
                    isActive
                      ? 'border-accent-bright bg-accent-bright text-canvas-bg shadow-[0_0_12px_var(--color-accent-bright)]'
                      : 'border-canvas-border bg-canvas-elevated/40 text-canvas-text-secondary hover:text-canvas-text hover:border-canvas-text-secondary'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid Section with Non-Destructive Filtering & Scroll Connection Lines */}
      <section className="py-12 md:py-20 px-6 border-t border-canvas-border/20">
        <div className="max-w-5xl mx-auto relative">
          
          <div ref={gridRef} className="relative w-full">
            {/* SVG backdrop connection lines layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {centers.map((center, idx) => {
                if (idx === 0 || center.x === 0) return null;
                const prevCenter = centers[idx - 1];
                if (prevCenter.x === 0) return null;
                
                return (
                  <ConnectionLine
                    key={idx}
                    start={prevCenter}
                    end={center}
                    triggerEl={cardRefs.current[idx]}
                  />
                );
              })}
            </svg>

            {/* Grid layout */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
              {projectsMetadata.map((project, idx) => {
                const isMatched = activeFilter === 'All' || project.track === activeFilter;
                
                return (
                  <div
                    key={project.slug}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                    className={`transition-all duration-500 transform-gpu ${
                      isMatched
                        ? 'opacity-100 scale-100 blur-none pointer-events-auto'
                        : 'opacity-15 scale-[0.96] blur-[1px] pointer-events-none'
                    }`}
                  >
                    <ScrollReveal
                      animation="fade-up"
                      delay={idx * 0.05}
                    >
                      <ProjectCard
                        title={project.title}
                        description={`${project.track} pipeline element. Built utilizing high-performance layouts.`}
                        domain={project.domain}
                        href={`/work/${project.slug}`}
                        accentHue={project.accentHue}
                      />
                    </ScrollReveal>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </section>

      {/* Footer Info HUD */}
      <section className="py-16 md:py-24 px-6 border-t border-canvas-border/10">
        <div className="max-w-5xl mx-auto flex items-center justify-center font-mono text-[9px] text-canvas-text-tertiary uppercase select-none">
          <span>// index.total_projects_compiled: {projectsMetadata.filter(p => activeFilter === 'All' || p.track === activeFilter).length} / {projectsMetadata.length}</span>
        </div>
      </section>
    </main>
  );
}
