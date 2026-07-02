'use client';

import { useState } from 'react';
import { HomeHero } from '@/components/sections/home-hero';
import { AboutSection } from '@/components/sections/about-section';
import { FeaturedProjectsSection, type FeaturedProject } from '@/components/sections/featured-projects-section';
import { ConstellationSection } from '@/components/sections/constellation-section';
import { ContactSection } from '@/components/sections/contact-section';
import { HueControl } from '@/components/ui/hue-control';
import { PageLoader } from '@/components/ui/PageLoader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const featuredProjects: FeaturedProject[] = [
    {
      id: 'slopslayer',
      title: 'SlopSlayer',
      description: 'Real-time deepfake and AI-generated content detection engine.',
      domain: 'AI / Detection',
      href: '/work/slopslayer',
      accentHue: 0,
    },
    {
      id: 'dira',
      title: 'Dira AR Pathfinder',
      description: 'Gemini agentic vision spatial guide and offline navigation layers.',
      domain: 'AR / Spatial AI',
      href: '/work/dira',
      accentHue: 224,
    },
    {
      id: 'intuilab',
      title: 'IntuiLab',
      description: 'Next-generation pedagogical learning environment for active discovery.',
      domain: 'EdTech / Learning',
      href: '/work/intuilab',
      accentHue: 45,
    },
    {
      id: 'ukweli',
      title: 'UKWELI Civic Platform',
      description: 'Misinformation detection and translation tracker for Swahili communities.',
      domain: 'Civic Tech / Swahili AI',
      href: '/work/ukweli',
      accentHue: 164,
    },
  ];

  const contactLinks = [
    { label: 'GitHub',   href: 'https://github.com/bentheaya',          icon: '→' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/bentheaya',      icon: '→' },
    { label: 'Email',    href: 'mailto:bentheaya@gmail.com',             icon: '→' },
  ];

  return (
    <>
      {/* Full-screen loader — dismounts after fade-out completes */}
      {loading && <PageLoader onComplete={() => setLoading(false)} />}

      {/* Main content — already rendered in DOM, revealed as loader fades */}
      <HomeHero
        name="Benaih Shaback."
        tagline="Building at the intersection of mathematics, systems, and learning"
        location="Nairobi, Kenya"
        status="Open to Work"
      />

      <AboutSection
        title="About Me"
        paragraphs={[
          "I'm a software developer and mathematics student passionate about crafting performant digital systems and tactile visual experiences. Completing my B.Sc. in Mathematics & Computer Science at Maseno University, I specialize in building robust backend pipelines, logic programming integrations, and interactive mathematical manifolds.",
          "My engineering focus spans low-latency frame extraction engines, spatial databases, and microservices architecture. I believe the best digital environments make complex, abstract ideas feel intuitive and accessible through active exploration."
        ]}
        highlights={['Mathematics', 'Computer Science', 'TypeScript', 'Python', 'Prolog', 'Next.js', 'Three.js', 'PostgreSQL', 'Redis']}
      />

      <FeaturedProjectsSection
        title="Featured Work"
        projects={featuredProjects}
        showViewAll
        viewAllHref="/work"
      />

      <ConstellationSection />

      <ContactSection
        title="Get In Touch"
        subtitle="Interested in working together? Have a question about my work or research?"
        email="bentheaya@gmail.com"
        links={contactLinks}
      />

      <HueControl />
    </>
  );
}
