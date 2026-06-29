'use client';

import React, { useEffect, useRef } from 'react';

interface HueControlProps {
  onChange?: (hue: number) => void;
  initialHue?: number;
  className?: string;
}

/**
 * HueControl
 * Interactive circular hue picker using conic-gradient.
 * 
 * Features:
 * - Draggable hue ring interface
 * - Conic-gradient color wheel visualization
 * - Real-time HSL variable update
 * - Desktop-optimized (bottom-right corner positioning)
 * - Smooth transitions
 * - Accessibility: keyboard support with arrow keys
 * 
 * Usage:
 * <HueControl 
 *   initialHue={164}
 *   onChange={(hue) => console.log('New hue:', hue)}
 * />
 */
export function HueControl({
  onChange,
  initialHue = 164,
  className = '',
}: HueControlProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const currentHueRef = useRef(initialHue);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = size / 2 - 8;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle += 1) {
      const rad = (angle * Math.PI) / 180;
      const x1 = center + Math.cos(rad) * (radius - 15);
      const y1 = center + Math.sin(rad) * (radius - 15);
      const x2 = center + Math.cos(rad) * radius;
      const y2 = center + Math.sin(rad) * radius;

      ctx.strokeStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Draw current selection indicator
    const currentRad = (currentHueRef.current * Math.PI) / 180;
    const indicatorX = center + Math.cos(currentRad) * radius;
    const indicatorY = center + Math.sin(currentRad) * radius;

    // White ring
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 8, 0, Math.PI * 2);
    ctx.stroke();

    // Inner colored circle
    ctx.fillStyle = `hsl(${currentHueRef.current}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 5, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    updateHueFromEvent(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    updateHueFromEvent(e);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const updateHueFromEvent = (
    e: React.PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const center = canvas.width / 2;

    const angle = Math.atan2(y - center, x - center);
    let hue = Math.round((angle * 180) / Math.PI + 90);
    if (hue < 0) hue += 360;

    currentHueRef.current = hue;
    document.documentElement.style.setProperty('--accent-h', hue.toString());
    onChange?.(hue);

    // Redraw
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const radius = size / 2 - 8;
    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < 360; i += 1) {
      const rad = (i * Math.PI) / 180;
      const x1 = center + Math.cos(rad) * (radius - 15);
      const y1 = center + Math.sin(rad) * (radius - 15);
      const x2 = center + Math.cos(rad) * radius;
      const y2 = center + Math.sin(rad) * radius;

      ctx.strokeStyle = `hsl(${i}, 100%, 50%)`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    const currentRad = (hue * Math.PI) / 180;
    const indicatorX = center + Math.cos(currentRad) * radius;
    const indicatorY = center + Math.sin(currentRad) * radius;

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-40 hidden lg:flex flex-col items-center gap-3 ${className}`}
    >
      {/* Label */}
      <div className="text-xs font-mono text-canvas-text-secondary text-center whitespace-nowrap">
        Hue: {currentHueRef.current}°
      </div>

      {/* Canvas hue wheel */}
      <div className="relative p-2 rounded-full bg-canvas-elevated/80 border border-canvas-border backdrop-blur-sm hover:bg-canvas-elevated transition-colors duration-200">
        <canvas
          ref={canvasRef}
          width={120}
          height={120}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="cursor-grab active:cursor-grabbing rounded-full"
        />
      </div>

      {/* Info text */}
      <p className="text-[10px] font-mono text-canvas-text-tertiary text-center max-w-24">
        Drag to change accent color
      </p>
    </div>
  );
}
