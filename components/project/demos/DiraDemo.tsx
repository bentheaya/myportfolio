'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Pin {
  id: number;
  x: number; // percentage width 0-100
  y: number; // percentage height 0-100
  label: string;
}

export function DiraDemo() {
  const [pins, setPins] = useState<Pin[]>([
    { id: 1, x: 25, y: 70, label: "Entrance Gate" },
    { id: 2, x: 50, y: 30, label: "Main Hall" },
    { id: 3, x: 75, y: 55, label: "Research Lab" }
  ]);
  const [noise, setNoise] = useState<number>(0.3);
  const [alpha, setAlpha] = useState<number>(0.2);
  const [jitterOffsets, setJitterOffsets] = useState<{ [key: number]: { x: number; y: number } }>({});
  const gridRef = useRef<HTMLDivElement>(null);

  // Generate jitter and filter it using the smooth pose logic
  useEffect(() => {
    let frameId: number;
    let time = 0;
    
    const tick = () => {
      time += 0.1;
      setJitterOffsets(prev => {
        const next: typeof prev = {};
        pins.forEach(pin => {
          // Raw sensor noise based on noise slider
          const rawJitterX = Math.sin(time * 3 + pin.id) * noise * 12;
          const rawJitterY = Math.cos(time * 2.5 + pin.id) * noise * 12;
          
          // Smoothed using the alpha filter
          const prevJitter = prev[pin.id] || { x: 0, y: 0 };
          next[pin.id] = {
            x: prevJitter.x + (rawJitterX - prevJitter.x) * alpha,
            y: prevJitter.y + (rawJitterY - prevJitter.y) * alpha
          };
        });
        return next;
      });
      frameId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(frameId);
  }, [pins, noise, alpha]);

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const label = `Waypoint ${alphabet[(pins.length) % alphabet.length]}`;
    
    setPins(prev => [...prev, { id: Date.now(), x, y, label }]);
  };

  const clearPins = () => {
    setPins([]);
  };

  // Build the svg path connecting all pins
  const getPathD = () => {
    if (pins.length < 2) return "";
    let d = "";
    pins.forEach((pin, index) => {
      const jitter = jitterOffsets[pin.id] || { x: 0, y: 0 };
      const px = pin.x + (jitter.x / (gridRef.current?.clientWidth || 100)) * 100;
      const py = pin.y + (jitter.y / (gridRef.current?.clientHeight || 100)) * 100;
      if (index === 0) {
        d += `M ${px} ${py}`;
      } else {
        d += ` L ${px} ${py}`;
      }
    });
    return d;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 md:p-4 text-canvas-text select-none">
      {/* Header Info HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-canvas-border/10">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-accent-bright uppercase tracking-widest">// dira.spatial_pathfinder</span>
          <h3 className="text-lg font-heading font-bold uppercase">
            AR Landmark Pin Drop Sandbox
          </h3>
        </div>
        <button
          onClick={clearPins}
          className="px-3 py-1 text-[9px] font-mono uppercase border border-canvas-border hover:border-red-500/50 hover:text-red-400 rounded transition-colors"
        >
          Clear Pins
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 my-6 items-stretch">
        {/* Left Side: Parameters Slider Control Panel */}
        <div className="lg:col-span-1 bg-canvas-elevated/20 p-4 rounded-xl border border-canvas-border/40 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-canvas-text-secondary uppercase tracking-widest">// parameters</h4>
            
            {/* Sensor Noise Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span>Sensor Noise:</span>
                <span className="text-accent-bright">{noise.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={noise}
                onChange={(e) => setNoise(parseFloat(e.target.value))}
                className="w-full h-1 bg-canvas-border rounded-lg appearance-none cursor-pointer accent-accent-bright"
              />
              <span className="text-[8px] font-mono text-canvas-text-tertiary block">
                Simulates real-world GPS & heading sensor variance.
              </span>
            </div>

            {/* Smoothing Alpha Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span>Smoothing (Alpha):</span>
                <span className="text-accent-bright">{alpha.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                className="w-full h-1 bg-canvas-border rounded-lg appearance-none cursor-pointer accent-accent-bright"
              />
              <span className="text-[8px] font-mono text-canvas-text-tertiary block">
                Lower value filters jitter but adds slight tracking lag.
              </span>
            </div>
          </div>

          {/* Telemetry log inside parameters panel */}
          <div className="bg-black/50 p-3 rounded font-mono text-[9px] text-canvas-text-secondary border border-canvas-border/10 space-y-1.5 h-36 overflow-y-auto">
            <div className="text-accent-bright">// pose_filter_telemetry:</div>
            <div>[System] Offline map loaded. (100% resol)</div>
            {pins.map((pin, i) => (
              <div key={pin.id}>
                * {pin.label}: [{pin.x}%, {pin.y}%]
              </div>
            ))}
            {pins.length >= 2 && (
              <div className="text-emerald-400">
                [Router] Active waypoints: {pins.length}. Path smoothed with filter.
              </div>
            )}
            {noise > 0.6 && alpha > 0.6 && (
              <div className="text-red-400 animate-pulse">
                [Warning] High noise & low filtering detected. Jitter warning active.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Map Canvas grid overlay */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="w-full text-center text-[10px] font-mono text-canvas-text-tertiary mb-2">
            Click grid below to drop landmark waypoints
          </div>
          <div
            ref={gridRef}
            onClick={handleGridClick}
            className="w-full h-64 md:h-80 bg-canvas-card/25 border border-canvas-border/60 rounded-xl relative overflow-hidden cursor-crosshair"
            style={{
              backgroundImage: 'radial-gradient(#ffffff04 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {/* SVG overlay for drawing path lines */}
            {pins.length >= 2 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d={getPathD()}
                  fill="none"
                  stroke="var(--color-accent-bright)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-75"
                />
                <path
                  d={getPathD()}
                  fill="none"
                  stroke="var(--color-accent-bright)"
                  strokeWidth="4"
                  className="opacity-20 blur-sm"
                />
              </svg>
            )}

            {/* Pins rendering */}
            {pins.map((pin, index) => {
              const jitter = jitterOffsets[pin.id] || { x: 0, y: 0 };
              const left = `calc(${pin.x}% + ${jitter.x}px)`;
              const top = `calc(${pin.y}% + ${jitter.y}px)`;
              
              const isStart = index === 0;
              const isEnd = index === pins.length - 1;

              return (
                <div
                  key={pin.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none transition-all duration-75"
                  style={{ left, top }}
                >
                  {/* Wave effect ripple */}
                  <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-40 animate-ping ${
                    isStart ? 'bg-emerald-500' : (isEnd ? 'bg-accent-bright' : 'bg-canvas-text-secondary')
                  }`} />
                  
                  {/* Dot point */}
                  <div className={`w-3 h-3 rounded-full border border-black shadow z-10 ${
                    isStart ? 'bg-emerald-500' : (isEnd ? 'bg-accent-bright' : 'bg-canvas-text')
                  }`} />
                  
                  {/* Pin label bubble */}
                  <span className="mt-1 px-1.5 py-0.5 rounded text-[8px] font-mono bg-canvas-bg/95 border border-canvas-border whitespace-nowrap z-20 shadow-md">
                    {pin.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-canvas-border/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[9px] text-canvas-text-tertiary uppercase">
        <span>// dira_status: ACTIVE_LOCALIZATION</span>
        <span>
          // drift_error: {(noise * 0.25 * (1 - alpha * 0.5)).toFixed(3)}m
        </span>
      </div>
    </div>
  );
}
