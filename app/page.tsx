'use client';

import { Shell } from '@/components/layout/shell';
import { HomeHero } from '@/components/sections/home-hero';
import { AboutSection } from '@/components/sections/about-section';
import { FeaturedProjectsSection, type FeaturedProject } from '@/components/sections/featured-projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { HueControl } from '@/components/ui/hue-control';

export default function Home() {
  // Featured projects data
  const featuredProjects: FeaturedProject[] = [
    {
      id: 'detection',
      title: 'AI Detection System',
      description: 'Real-time content detection with sub-100ms latency',
      domain: 'AI / Detection',
      href: '/showcase',
      accentHue: 0,
    },
    {
      id: 'spatial',
      title: 'Spatial UI Framework',
      description: 'AR experiences with perspective transforms',
      domain: 'AR / Spatial',
      href: '/projects/spatial-ui',
      accentHue: 180,
    },
    {
      id: 'analytics',
      title: 'Data Analytics Platform',
      description: 'Interactive visualizations and dashboards',
      domain: 'Data / Visualization',
      href: '/projects/analytics',
      accentHue: 45,
    },
    {
      id: 'learning',
      title: 'Learning Experience System',
      description: 'Personalized education with interactive elements',
      domain: 'EdTech / Learning',
      href: '/projects/learning',
      accentHue: 270,
    },
  ];

  // Contact links
  const contactLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: '→' },
    { label: 'Twitter', href: 'https://twitter.com', icon: '→' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: '→' },
    { label: 'Email', href: 'mailto:hello@example.com', icon: '→' },
  ];

  return (
    <Shell>
      {/* Hero Section */}
      <HomeHero
        name="Creative Technologist"
        tagline="Building elegant interfaces and interactive experiences"
        location="San Francisco, CA"
        status="Available for Projects"
      />

      {/* About Section */}
      <AboutSection
        title="About Me"
        paragraphs={[
          "I&apos;m a full-stack engineer passionate about crafting beautiful, performant digital experiences. With expertise in React, Three.js, and modern tooling, I specialize in building interactive systems that bridge design and technology.",
          "My work focuses on creating scalable architectures, optimizing performance, and pushing the boundaries of what&apos;s possible on the web. When I&apos;m not coding, I explore new techniques in 3D rendering and generative design.",
        ]}
        highlights={['React', 'Next.js', 'Three.js', 'TypeScript', 'WebGL', 'Performance']}
      />

      {/* Featured Projects */}
      <FeaturedProjectsSection
        title="Featured Work"
        projects={featuredProjects}
        showViewAll
        viewAllHref="/work"
      />

      {/* Contact Section */}
      <ContactSection
        title="Get In Touch"
        subtitle="Interested in working together? Have a question about my work?"
        email="hello@example.com"
        links={contactLinks}
      />

      {/* Hue Control for accent color adjustment */}
      <HueControl initialHue={164} />
    </Shell>
  )
}
