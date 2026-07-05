'use client';

import React, { useEffect, useRef } from 'react';

/**
 * AboutHeroScene
 * Renders a high-performance, 3D rotating mathematical torus knot wireframe in violet tones
 * using HTML5 Canvas and raw trigonometry.
 */
export function AboutHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 350;
    };
    resize();
    window.addEventListener('resize', resize);

    // Parameters for torus knot T(3, 8)
    const p = 3;
    const q = 8;
    const steps = 180;
    
    // Generate static torus knot coordinates
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2 * p; // closes the loop nicely
      const r = Math.cos(q * theta) * 0.35 + 0.85;
      const x = r * Math.cos(p * theta);
      const y = r * Math.sin(p * theta);
      const z = -Math.sin(q * theta) * 0.5;
      points.push({ x, y, z });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005; // speed of rotation
      
      const width = canvas.width;
      const height = canvas.height;
      const scale = Math.min(width, height) * 0.28;
      const centerX = width / 2;
      const centerY = height / 2;
      const distance = 3.5; // camera distance

      ctx.lineWidth = 1.2;

      // Draw wireframe segments
      for (let i = 0; i < steps; i++) {
        const pt1 = points[i];
        const pt2 = points[i + 1];

        // Subtle wave displacement on vertices
        const disp1 = Math.sin(time * 3.5 + i * 0.12) * 0.035;
        const disp2 = Math.sin(time * 3.5 + (i + 1) * 0.12) * 0.035;

        let r1 = { x: pt1.x * (1 + disp1), y: pt1.y * (1 + disp1), z: pt1.z };
        let r2 = { x: pt2.x * (1 + disp2), y: pt2.y * (1 + disp2), z: pt2.z };

        // 3D Rotation matrices
        // Rotate Y
        const cosY = Math.cos(time);
        const sinY = Math.sin(time);
        r1 = { x: r1.x * cosY + r1.z * sinY, y: r1.y, z: -r1.x * sinY + r1.z * cosY };
        r2 = { x: r2.x * cosY + r2.z * sinY, y: r2.y, z: -r2.x * sinY + r2.z * cosY };

        // Rotate X
        const cosX = Math.cos(time * 0.7);
        const sinX = Math.sin(time * 0.7);
        r1 = { x: r1.x, y: r1.y * cosX - r1.z * sinX, z: r1.y * sinX + r1.z * cosX };
        r2 = { x: r2.x, y: r2.y * cosX - r2.z * sinX, z: r2.y * sinX + r2.z * cosX };

        // Perspective projection
        const p1x = (r1.x * scale) / (r1.z + distance) + centerX;
        const p1y = (r1.y * scale) / (r1.z + distance) + centerY;
        const p2x = (r2.x * scale) / (r2.z + distance) + centerX;
        const p2y = (r2.y * scale) / (r2.z + distance) + centerY;

        // Depth cue calculations
        const depth = (r1.z + r2.z) / 2;
        const alpha = Math.max(0.08, 0.42 - (depth / 2.2));

        // Drawing path segment
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        
        // Color transition in violet tones
        const hue = 265 + Math.sin(time * 1.5 + i * 0.06) * 18;
        ctx.strokeStyle = `hsla(${hue}, 72%, 62%, ${alpha})`;
        ctx.stroke();

        // Draw low-poly point joints
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.arc(p1x, p1y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 82%, 72%, ${alpha * 1.4})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="w-full h-[350px] relative flex items-center justify-center overflow-hidden rounded-xl border border-canvas-border/40 bg-canvas-elevated/10">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* Technical HUD metrics */}
      <div className="absolute bottom-4 left-4 font-mono text-[8px] text-canvas-text-tertiary select-none pointer-events-none uppercase space-y-0.5 tracking-wider">
        <div>// manifold: torus_knot_t(3,8)</div>
        <div>// topology: wireframe_surface</div>
        <div>// noise_displacement: active</div>
      </div>
    </div>
  );
}
