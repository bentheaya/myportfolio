'use client';

import React, { useEffect, useRef } from 'react';

/**
 * ContactHeroScene
 * Renders an abstract glowing network node sphere with thin connecting lines orbiting slowly.
 * The nodes are interactive and react magnetically to cursor hover attraction.
 */
export function ContactHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const mouse = { x: -1000, y: -1000, active: false };

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 280;
    };
    resize();
    window.addEventListener('resize', resize);

    // Bounding client relative mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Uniformly distribute 55 nodes on a sphere
    const count = 55;
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.0;
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi)
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.0035;

      const width = canvas.width;
      const height = canvas.height;
      const scale = Math.min(width, height) * 0.32;
      const centerX = width / 2;
      const centerY = height / 2;
      const distance = 3.0;

      // Project points from 3D space to 2D canvas coordinates
      const projected = points.map((p) => {
        // Rotate Y
        const cosY = Math.cos(time);
        const sinY = Math.sin(time);
        let rx = p.x * cosY + p.z * sinY;
        let ry = p.y;
        let rz = -p.x * sinY + p.z * cosY;

        // Rotate X
        const cosX = Math.cos(time * 0.5);
        const sinX = Math.sin(time * 0.5);
        const rz_temp = rz;
        rz = rz_temp * cosX - ry * sinX;
        ry = rz_temp * sinX + ry * cosX;

        // 2D Perspective Projection
        let px = (rx * scale) / (rz + distance) + centerX;
        let py = (ry * scale) / (rz + distance) + centerY;

        // Apply mouse magnetic attraction (distort coordinates elastic-like)
        if (mouse.active) {
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const pullForce = (100 - dist) * 0.25;
            const angle = Math.atan2(dy, dx);
            px += Math.cos(angle) * pullForce;
            py += Math.sin(angle) * pullForce;
          }
        }

        return { x: px, y: py, depth: rz };
      });

      // Draw connection edges
      ctx.lineWidth = 0.8;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connecting proximity threshold
          if (dist < 50) {
            const depth = (p1.depth + p2.depth) / 2;
            const alpha = Math.max(0.04, 0.32 - (depth / 2.2) - (dist / 140));
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(180, 85%, 62%, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw node particles
      projected.forEach((p) => {
        const alpha = Math.max(0.1, 0.42 - (p.depth / 2));
        const size = Math.max(1.5, 3.2 - (p.depth * 1.2));
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(180, 92%, 68%, ${alpha * 1.5})`;
        ctx.fill();
        
        // Soft outer glow for closest nodes
        if (p.depth < -0.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(180, 92%, 68%, ${alpha * 0.22})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full h-[280px] relative flex items-center justify-center overflow-hidden rounded-xl border border-canvas-border/40 bg-canvas-elevated/10 select-none">
      <canvas ref={canvasRef} className="block w-full h-full cursor-pointer" />
      
      {/* HUD Metrics */}
      <div className="absolute bottom-4 left-4 font-mono text-[8px] text-canvas-text-tertiary select-none pointer-events-none uppercase tracking-wider space-y-0.5">
        <div>// model: dynamic_network_node</div>
        <div>// force_field: proximity_attraction</div>
        <div>// interaction: mouse_magnetic</div>
      </div>
    </div>
  );
}
