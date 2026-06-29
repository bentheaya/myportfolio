import React from 'react';
import { ProjectCard } from '@/components/ui/project-card';

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

/**
 * FeaturedProjectsSection
 * Grid of prominent featured projects for home page.
 * 
 * Features:
 * - Responsive 2x2 or 1x4 grid layout
 * - ProjectCard component integration
 * - Optional "View All" link
 * - Accent color per project
 * - Clean hierarchy
 * 
 * Usage:
 * <FeaturedProjectsSection
 *   title="Featured Work"
 *   projects={[...]}
 *   showViewAll
 *   viewAllHref="/work"
 * />
 */
export function FeaturedProjectsSection({
  title = 'Featured Work',
  projects,
  showViewAll = false,
  viewAllHref = '/work',
  className = '',
}: FeaturedProjectsSectionProps) {
  return (
    <section className={`w-full py-20 md:py-32 px-4 border-t border-canvas-border/20 ${className}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-canvas-text">
            {title}
          </h2>
          {showViewAll && (
            <a
              href={viewAllHref}
              className="text-sm font-mono text-accent-bright hover:text-accent-dim transition-colors duration-200 underline-accent"
            >
              View all projects →
            </a>
          )}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              domain={project.domain}
              href={project.href}
              accentHue={project.accentHue}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
