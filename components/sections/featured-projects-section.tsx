'use client';

import React, { useEffect, useRef } from 'react';
import { ProjectCard } from '@/components/ui/project-card';
import { TransitionLink } from '@/components/transitions/TransitionLink';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { scrollTriggerText } from '@/lib/animations';

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  domain: string;
  href: string;
  accentHue?: number;
  image?: string;
}

interface FeaturedProjectsSectionProps {
  title?: string;
  projects: FeaturedProject[];
  showViewAll?: boolean;
  viewAllHref?: string;
  className?: string;
}

export function FeaturedProjectsSection({
  title = 'Featured Work',
  projects,
  showViewAll = false,
  viewAllHref = '/work',
  className = '',
}: FeaturedProjectsSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      scrollTriggerText(headingRef.current, 0);
    }
  }, []);

  return (
    <section className={`w-full py-20 md:py-32 px-4 border-t border-canvas-border/20 ${className}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-end justify-between">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-heading font-bold text-canvas-text"
          >
            {title}
          </h2>
          {showViewAll && (
            <ScrollReveal animation="fade" delay={0.3}>
              <TransitionLink
                href={viewAllHref}
                className="text-sm font-mono text-accent-bright hover:text-accent-dim transition-colors duration-200"
              >
                View all →
              </TransitionLink>
            </ScrollReveal>
          )}
        </div>

        {/* Grid — each card stagger-reveals on scroll */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              animation="fade-up"
              delay={idx * 0.1}
              duration={0.7}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                domain={project.domain}
                href={project.href}
                accentHue={project.accentHue}
                image={project.image}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
