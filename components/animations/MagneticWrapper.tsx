'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticWrapperProps {
  children: React.ReactElement;
  range?: number;     // proximity zone in px
  strength?: number;  // attraction strength multiplier (0 to 1)
}

/**
 * MagneticWrapper
 * GSAP-based magnetic hover effect wrapper.
 * Attracts the child element towards the cursor when within range,
 * and snaps back elastically on leave.
 */
export function MagneticWrapper({
  children,
  range = 80,
  strength = 0.35,
}: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Proximity guard: skip on small screens or devices that do not support fine pointers
    const isMobileOrTablet = window.innerWidth < 1024 || !window.matchMedia('(pointer: fine)').matches;
    if (isMobileOrTablet) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    const child = container.firstElementChild as HTMLElement;
    if (!child) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance between cursor and center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Proximity attraction
        const targetX = distanceX * strength;
        const targetY = distanceY * strength;

        gsap.to(child, {
          x: targetX,
          y: targetY,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        // Snap back if cursor is out of range but still in element bounds
        gsap.to(child, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      // Elastic snap-back to origin on leave
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.1, 0.3)',
        overwrite: 'auto',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(child);
    };
  }, [range, strength]);

  // Wrap child inside an relative container to avoid offset conflicts
  return (
    <div ref={containerRef} className="inline-block relative">
      {children}
    </div>
  );
}
