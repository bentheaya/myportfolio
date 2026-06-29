'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  staggerMs?: number;
  delay?: number;
  className?: string;
}

/**
 * TextReveal
 * Character-by-character stagger animation component.
 * 
 * Features:
 * - Smooth reveal animation on mount
 * - Customizable stagger timing
 * - Optional delay before animation starts
 * - Configurable HTML element type
 * - Intersection Observer support (animates when in view)
 * 
 * Usage:
 * <TextReveal 
 *   text="Reveal this text character by character" 
 *   staggerMs={50}
 *   className="text-3xl font-bold"
 * />
 */
export function TextReveal({
  text,
  as: Component = 'p',
  staggerMs = 30,
  delay = 0,
  className = '',
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const characters = text.split('');

  return (
    <Component ref={ref as any} className={className}>
      {characters.map((char, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${
              delay + index * staggerMs
            }ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Component>
  );
}
