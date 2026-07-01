'use client';

import React, { useEffect, useRef } from 'react';
import { scrollTriggerText } from '@/lib/animations';

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  className?: string;
}

/**
 * TextReveal
 * High-performance GSAP ScrollTrigger text reveal component.
 * Splits text into individual character spans and performs a masked stagger-up reveal
 * as it enters the viewport.
 */
export function TextReveal({
  text,
  as: Component = 'p',
  delay = 0,
  className = '',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    scrollTriggerText(el, delay);
  }, [text, delay]);

  return (
    <Component ref={ref as any} className={className}>
      {text}
    </Component>
  );
}
