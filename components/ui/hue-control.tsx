'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useHue } from '@/components/hue/HueProvider';

interface HueControlProps {
  onChange?: (hue: number) => void;
  className?: string;
}

/**
 * HueControl
 * Interactive circular hue picker using conic-gradient on a canvas.
 * 
 * Features:
 * - Draggable hue ring interface
 * - Context-integrated with HueProvider (shared state)
 * - Persists to localStorage
 * - Keyboard accessible (arrow keys)
 * - Live updating label
 */
export function HueControl({
  onChange,
  className = '',
}: HueControlProps) {
  const { hue, setHue } = useHue();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  
  // Local state purely for text display feedback during drag
  const [displayHue, setDisplayHue] = useState(hue);

  // Redraw the color wheel canvas when displayHue changes
  const drawWheel = (activeHue: number) => {
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
    const currentRad = (activeHue * Math.PI) / 180;
    const indicatorX = center + Math.cos(currentRad) * radius;
    const indicatorY = center + Math.sin(currentRad) * radius;

    // White ring
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 8, 0, Math.PI * 2);
    ctx.stroke();

    // Inner colored circle
    ctx.fillStyle = `hsl(${activeHue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    drawWheel(hue);
    setDisplayHue(hue);
  }, [hue]);

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

  const updateHueFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const center = canvas.width / 2;

    const angle = Math.atan2(y - center, x - center);
    let newHue = Math.round((angle * 180) / Math.PI + 90);
    if (newHue < 0) newHue += 360;

    setDisplayHue(newHue);
    setHue(newHue);
    onChange?.(newHue);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      delta = 5;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      delta = -5;
    }

    if (delta !== 0) {
      e.preventDefault();
      let newHue = hue + delta;
      if (newHue < 0) newHue += 360;
      if (newHue >= 360) newHue -= 360;
      setHue(newHue);
      onChange?.(newHue);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-40 hidden lg:flex flex-col items-center gap-3 ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Accent color hue controller. Use left/right arrow keys or click and drag."
    >
      {/* Label */}
      <div className="text-xs font-mono text-canvas-text-secondary text-center whitespace-nowrap">
        Hue: {displayHue}°
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
        Drag/Arrows to change accent
      </p>
    </div>
  );
}
