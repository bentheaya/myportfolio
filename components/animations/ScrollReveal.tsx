'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade' | 'fade-up' | 'fade-down' | 'scale' | 'slide-left' | 'slide-right';
  duration?: number;
  delay?: number;
  startTrigger?: string; // e.g. 'top 85%'
  className?: string;
}

/**
 * ScrollReveal
 * GSAP ScrollTrigger wrapper component.
 * Animates child components dynamically as they enter the viewport.
 */
export function ScrollReveal({
  children,
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  startTrigger = 'top 85%',
  className = '',
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let fromVars: gsap.TweenVars = { opacity: 0 };
    let toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: startTrigger,
        toggleActions: 'play none none none',
      },
    };

    // Determine animation parameters
    switch (animation) {
      case 'fade':
        break;
      case 'fade-up':
        fromVars.y = 40;
        toVars.y = 0;
        break;
      case 'fade-down':
        fromVars.y = -40;
        toVars.y = 0;
        break;
      case 'scale':
        fromVars.scale = 0.95;
        toVars.scale = 1;
        break;
      case 'slide-left':
        fromVars.x = 50;
        toVars.x = 0;
        break;
      case 'slide-right':
        fromVars.x = -50;
        toVars.x = 0;
        break;
    }

    gsap.fromTo(el, fromVars, toVars);

    return () => {
      ScrollTrigger.getById(`reveal-${el.id}`)?.kill();
    };
  }, [animation, duration, delay, startTrigger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
