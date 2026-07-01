'use client';

import React, { useState } from 'react';
import { projectsMetadata } from '@/lib/projects';
import { ProjectCard } from '@/components/ui/project-card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = [
    { label: 'All Work', value: 'All' },
    { label: 'AI & Models', value: 'AI & Models' },
    { label: 'Spatial & Geometry', value: 'Spatial & Geometry' },
    { label: 'Architectures & Backends', value: 'Architectures & Backends' },
    { label: 'Civic Data & Archives', value: 'Civic Data & Archives' },
  ];

  // Filter projects list dynamically
  const filteredProjects = projectsMetadata.filter(
    (p) => activeFilter === 'All' || p.track === activeFilter
  );

  return (
    <main className="w-full min-h-screen bg-canvas-bg pt-12 md:pt-20">
      {/* Header section */}
      <section className="py-16 md:py-24 px-6">
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

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-6">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs border transition-all duration-300 ${
                  activeFilter === opt.value
                    ? 'border-accent-bright bg-accent-bright text-canvas-bg shadow-lg shadow-accent-bright/15'
                    : 'border-canvas-border bg-canvas-elevated/40 text-canvas-text-secondary hover:text-canvas-text hover:border-canvas-text-secondary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-20 px-6 border-t border-canvas-border/20">
        <div className="max-w-5xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {filteredProjects.map((project, idx) => (
                <ScrollReveal
                  key={project.slug}
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
              ))}
            </div>
          ) : (
            <div className="text-center py-20 font-mono text-sm text-canvas-text-tertiary">
              // no_projects_found_in_category
            </div>
          )}
        </div>
      </section>

      {/* Footer Info HUD */}
      <section className="py-16 md:py-24 px-6 border-t border-canvas-border/10">
        <div className="max-w-5xl mx-auto flex items-center justify-center font-mono text-[9px] text-canvas-text-tertiary uppercase select-none">
          <span>// index.total_projects_compiled: {filteredProjects.length} / {projectsMetadata.length}</span>
        </div>
      </section>
    </main>
  );
}
