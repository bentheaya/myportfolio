import React from 'react';
import { useHue } from '@/components/hue/HueProvider';

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

/**
 * ContactSection
 * Clean footer/contact section for home page.
 * 
 * Features:
 * - Email display with copy-to-clipboard ready
 * - Social links layout
 * - Semantic footer structure
 * - Responsive design
 * - Accent color integration
 * - Real-time hue state token in footer
 */
export function ContactSection({
  title = "Let's connect",
  subtitle = 'Have a project in mind? Interested in collaborating?',
  email = 'hello@example.com',
  links = [],
  className = '',
}: ContactSectionProps) {
  const { hue } = useHue();

  return (
    <footer className={`w-full py-20 md:py-32 px-4 border-t border-canvas-border/20 bg-canvas-elevated/30 ${className}`}>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Main content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-canvas-text">
            {title}
          </h2>
          <p className="text-base md:text-lg text-canvas-text-secondary">
            {subtitle}
          </p>
        </div>

        {/* Email CTA */}
        {email && (
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wide text-canvas-text-tertiary">
              Drop me a line
            </p>
            <a
              href={`mailto:${email}`}
              className="inline-block text-2xl md:text-3xl font-heading font-bold text-canvas-text hover:text-accent-bright transition-colors duration-200 underline-accent"
            >
              {email}
            </a>
          </div>
        )}

        {/* Links grid */}
        {links.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-4 py-3 rounded-lg border border-canvas-border bg-canvas-elevated/40 hover:border-accent-bright hover:bg-accent-faint/20 transition-all duration-200 flex items-center gap-2"
              >
                {link.icon && (
                  <span className="text-accent-bright group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                )}
                <span className="text-sm font-mono text-canvas-text group-hover:text-accent-bright transition-colors duration-200">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="pt-8 border-t border-canvas-border/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs font-mono text-canvas-text-tertiary">
            © {new Date().getFullYear()} · Built with Next.js, Tailwind CSS, and ❤️
          </p>
          {/* State token */}
          <p className="text-xs font-mono text-accent-bright/80">
            // system.hue: {hue}°
          </p>
        </div>
      </div>
    </footer>
  );
}
