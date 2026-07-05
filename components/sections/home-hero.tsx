'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { animateTextIn } from '@/lib/animations';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Lazy-load Three.js scene — pass heroHeight for scroll-parallax
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none">
      <span className="text-[9px] font-mono text-canvas-text-tertiary uppercase tracking-widest animate-pulse">
        // loading.constellation_nodes...
      </span>
    </div>
  ),
});

interface HomeHeroProps {
  name: string;
  tagline: string;
  location?: string;
  status?: string;
  className?: string;
}

/**
 * HomeHero
 * Layer order (bottom → top):
 *   z-0   photo texture (luminosity blend, 18% opacity)
 *   z-[1] Three.js canvas (alpha:true, transparent bg — photo shows through)
 *   z-[2] bottom readability gradient
 *   z-10  typography
 */
export function HomeHero({
  name,
  tagline,
  location,
  status,
  className = '',
}: HomeHeroProps) {
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted]       = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const [isMobile, setIsMobile]     = useState(false);

  const words = name.split(' ');

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || !window.matchMedia('(pointer: fine)').matches;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Measure the hero section height for scroll-parallax bounds
    if (sectionRef.current) {
      setHeroHeight(sectionRef.current.offsetHeight);
      const ro = new ResizeObserver(() => {
        if (sectionRef.current) setHeroHeight(sectionRef.current.offsetHeight);
      });
      ro.observe(sectionRef.current);
      return () => {
        ro.disconnect();
        window.removeEventListener('resize', checkMobile);
      };
    }
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const section = sectionRef.current;

    if (line1) {
      animateTextIn(line1, 0.2);
    }
    if (line2) {
      animateTextIn(line2, 0.4);
    }

    let t1: gsap.core.Tween | null = null;
    let t2: gsap.core.Tween | null = null;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && line1 && line2 && section) {
      gsap.registerPlugin(ScrollTrigger);

      t1 = gsap.to(line1, {
        x: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      t2 = gsap.to(line2, {
        x: 90,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    if (detailsRef.current) {
      detailsRef.current.style.opacity = '0';
      detailsRef.current.style.transform = 'translateY(10px)';
      detailsRef.current.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.8s';
      requestAnimationFrame(() => {
        if (detailsRef.current) {
          detailsRef.current.style.opacity = '1';
          detailsRef.current.style.transform = 'translateY(0)';
        }
      });
    }

    return () => {
      if (t1) {
        t1.kill();
        t1.scrollTrigger?.kill();
      }
      if (t2) {
        t2.kill();
        t2.scrollTrigger?.kill();
      }
    };
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen w-full flex items-end justify-start px-6 md:px-12 pb-20 md:pb-28 overflow-hidden bg-canvas-bg z-10 ${className}`}
    >
      {/* ── z-0: Background photo ─────────────────────────────────────────── */}
      {/* Visible because the Canvas div above is transparent (no bg class).    */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-[center_30%]"
          style={{
            opacity: 0.18,
            mixBlendMode: 'luminosity',
            filter: 'grayscale(60%) contrast(1.05) brightness(0.85)',
          }}
          priority
          sizes="100vw"
          aria-hidden
        />
        {/* Soft vignette only at the very edges — not aggressive */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_80%_at_55%_35%,transparent_35%,rgb(8,8,8)_85%)]" />
      </div>

      {/* ── z-[1]: Three.js constellation (transparent bg — photo shows) ───── */}
      {mounted && !isMobile && <HeroScene heroHeight={heroHeight} />}

      {/* ── z-[2]: Bottom readability fade ──────────────────────────────────── */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-canvas-bg via-canvas-bg/20 to-transparent pointer-events-none" />

      {/* ── z-10: Typography ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl space-y-6 select-none pointer-events-none w-full">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-canvas-text leading-[0.9] tracking-tight uppercase flex flex-col gap-2"
        >
          <span ref={line1Ref} className="inline-block transform-gpu origin-left">
            {words[0]}
          </span>
          <span ref={line2Ref} className="inline-block pl-8 sm:pl-16 transform-gpu origin-left">
            {words[1] || ''}
          </span>
        </h1>

        <p className="text-sm md:text-lg text-canvas-text-secondary max-w-2xl font-mono leading-relaxed">
          {tagline}
        </p>

        <div
          ref={detailsRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center pt-2"
        >
          {location && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-canvas-text font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-canvas-text-tertiary" />
              <span>{location}</span>
            </div>
          )}

          {status && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-faint border border-accent-dim/30">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-bright animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-bright">
                {status}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Scroll cue ───────────────────────────────────────────────────────── */}
      <div className="absolute bottom-10 right-6 md:right-12 z-10 flex flex-col items-end gap-3 font-mono text-[9px] tracking-widest text-canvas-text-tertiary uppercase select-none pointer-events-none">
        <span>// scroll.explore</span>
        <div className="w-[1px] h-14 bg-canvas-border/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 animate-traveling-dot" style={{ backgroundColor: 'var(--color-accent-bright)' }} />
        </div>
      </div>
    </section>
  );
}
