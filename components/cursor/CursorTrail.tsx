'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  alpha: number;
  radius: number;
  age: number;
}

const MAX_PARTICLES = 28;
const PARTICLE_LIFETIME = 22; // frames until fully faded
const SPAWN_INTERVAL = 2;     // spawn every N frames

/**
 * CursorTrail
 * Renders a comet-style cursor trail on a full-screen canvas.
 * Color is sourced live from the CSS --accent-h / --accent-s / --accent-l variables,
 * so it automatically matches the user's selected hue.
 * Skipped on coarse-pointer (touch) devices.
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only skip on small screens or devices that do not support fine pointers
    const isMobileOrTablet = window.innerWidth < 1024 || !window.matchMedia('(pointer: fine)').matches;
    if (isMobileOrTablet) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const mouse = { x: -999, y: -999 };
    const particles: Particle[] = [];
    let frame = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Read live HSL from CSS variable
    const getAccentHSL = (): { h: number; s: number; l: number } => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      const h = parseFloat(style.getPropertyValue('--accent-h').trim()) || 164;
      const s = parseFloat(style.getPropertyValue('--accent-s').trim()) || 68;
      const l = parseFloat(style.getPropertyValue('--accent-l').trim()) || 55;
      return { h, s, l };
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      frame++;

      // Spawn new particle at cursor every SPAWN_INTERVAL frames
      if (frame % SPAWN_INTERVAL === 0 && mouse.x > 0) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          alpha: 1,
          radius: 4.5,
          age: 0,
        });
        // Cull oldest to keep pool bounded
        if (particles.length > MAX_PARTICLES) {
          particles.shift();
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { h, s, l } = getAccentHSL();

      // Draw tail particles from oldest (most faded) to newest (brightest)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age++;
        const progress = p.age / PARTICLE_LIFETIME; // 0 → 1
        p.alpha = Math.max(0, 1 - progress);        // linear fade
        p.radius = 4.5 * (1 - progress * 0.6);      // shrink slightly

        if (p.alpha <= 0) continue;

        // Comet glow: large soft outer glow + bright core
        // Outer glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        glow.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${p.alpha * 0.35})`);
        glow.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Bright core
        const core = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        core.addColorStop(0, `hsla(${h}, ${s}%, ${Math.min(l + 20, 90)}%, ${p.alpha * 0.9})`);
        core.addColorStop(0.5, `hsla(${h}, ${s}%, ${l}%, ${p.alpha * 0.6})`);
        core.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[49]"
      aria-hidden="true"
    />
  );
}
