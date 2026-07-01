'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const isProject = useRef(false);
  const projectColor = useRef<string | null>(null);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `${dotRef.current.style.transform} scale(0.7)`;
        ringRef.current.style.transform = `${ringRef.current.style.transform} scale(0.8)`;
      }
    };

    const handleMouseUp = () => {
      isClicking.current = false;
    };

    // Event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or parent is interactive
      const interactive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]');
      const projectCard = target.closest('[data-cursor="project"]');

      if (projectCard) {
        isProject.current = true;
        isHovering.current = true;
        projectColor.current = (projectCard as HTMLElement).getAttribute('data-project-color') || 'var(--color-accent-bright)';
      } else if (interactive) {
        isHovering.current = true;
        isProject.current = false;
        projectColor.current = null;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if leaving interactive bounds
      const interactive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]');
      const projectCard = target.closest('[data-cursor="project"]');

      if (!interactive && !projectCard) {
        isHovering.current = false;
        isProject.current = false;
        projectColor.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Initial position matching
    ringPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let rafId: number;
    const tick = () => {
      if (!dotRef.current || !ringRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Lerp for outer ring (smooth trailing lag)
      const lerpFactor = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      // Determine dimensions based on state
      let ringSize = 28;
      let ringOffset = 14;
      let ringStyle = 'border border-accent-bright bg-transparent';
      let dotOpacity = '1';

      if (isClicking.current) {
        ringSize = 20;
        ringOffset = 10;
      } else if (isProject.current) {
        ringSize = 64;
        ringOffset = 32;
        dotOpacity = '0';
        // Apply dynamic project custom accent color
        const color = projectColor.current || 'var(--color-accent-bright)';
        ringRef.current.style.borderColor = color;
        ringRef.current.style.backgroundColor = `${color}1a`; // 10% opacity fill
      } else if (isHovering.current) {
        ringSize = 48;
        ringOffset = 24;
        ringRef.current.style.borderColor = 'var(--color-accent-bright)';
        ringRef.current.style.backgroundColor = 'hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.15)';
      } else {
        // Default idle style
        ringRef.current.style.borderColor = 'var(--color-accent-bright)';
        ringRef.current.style.backgroundColor = 'transparent';
      }

      // Apply styling transformations directly to DOM bypass React render loops for performance
      dotRef.current.style.opacity = dotOpacity;
      dotRef.current.style.transform = `translate3d(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px, 0) scale(${isClicking.current ? 0.7 : 1})`;
      
      ringRef.current.style.width = `${ringSize}px`;
      ringRef.current.style.height = `${ringSize}px`;
      ringRef.current.style.transform = `translate3d(${ringPos.current.x - ringOffset}px, ${ringPos.current.y - ringOffset}px, 0) scale(${isClicking.current ? 0.8 : 1})`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-bright rounded-full pointer-events-none z-50 mix-blend-difference transition-opacity duration-200"
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{ width: '28px', height: '28px' }}
      />
    </>
  );
}
