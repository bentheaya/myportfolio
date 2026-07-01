'use client';

import React, { useState, useRef } from 'react';
import { TransitionLink } from '@/components/transitions/TransitionLink';

interface ProjectCardProps {
  title: string;
  description: string;
  domain: string;
  href: string;
  image?: string;
  accentHue?: number;
  className?: string;
}

/**
 * ProjectCard
 * Large, interactive project card with magnetic hover, glow effect, and accent color support.
 * 
 * Features:
 * - Magnetic hover effect (slight scale)
 * - Dynamic accent glow
 * - Image support with gradient overlay
 * - Domain badge integration
 * - Responsive design
 * - Custom accent hue support
 */
export function ProjectCard({
  title,
  description,
  domain,
  href,
  image,
  accentHue,
  className = '',
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const style = accentHue !== undefined
    ? ({
        '--accent-h': accentHue,
      } as React.CSSProperties)
    : undefined;

  const hexColor = accentHue !== undefined ? `hsl(${accentHue} 100% 50%)` : undefined;

  return (
    <TransitionLink
      href={href}
      className="block"
      data-cursor="project"
      data-project-color={hexColor}
    >
      <div
        ref={cardRef}
        style={style}
        className={`group relative overflow-hidden rounded-xl border border-canvas-border bg-canvas-elevated/50 p-6 transition-all duration-300 magnetic hover:border-accent-bright/50 hover:glow-accent-lg ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Background image with overlay */}
        {image && (
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas-bg via-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Domain badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-faint border border-accent-dim">
            <span className="inline-block w-1 h-1 rounded-full bg-accent-bright animate-pulse-accent" />
            <span className="text-xs font-mono text-accent-bright">{domain}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-heading font-bold text-canvas-text group-hover:text-accent-bright transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-canvas-text-secondary group-hover:text-canvas-text-secondary/80 transition-colors duration-200 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Hover indicator arrow */}
        {isHovered && (
          <div className="absolute bottom-4 right-4 text-accent-bright opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        )}

        {/* Accent border on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none border-2 border-accent-bright/30 rounded-xl"
            style={{
              boxShadow: `inset 0 0 40px -10px hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.1)`,
            }}
          />
        )}
      </div>
    </TransitionLink>
  );
}
