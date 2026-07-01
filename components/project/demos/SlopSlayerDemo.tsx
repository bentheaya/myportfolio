'use client';

import React, { useState, useEffect } from 'react';

interface Frame {
  id: number;
  label: string;
  type: 'real' | 'synthetic';
  confidence: number;
  scanned: boolean;
}

export function SlopSlayerDemo() {
  const [frames, setFrames] = useState<Frame[]>([
    { id: 1, label: "Frame #0241", type: "real", confidence: 99.4, scanned: false },
    { id: 2, label: "Frame #0242", type: "real", confidence: 99.1, scanned: false },
    { id: 3, label: "Frame #0243", type: "synthetic", confidence: 12.8, scanned: false },
    { id: 4, label: "Frame #0244", type: "real", confidence: 98.7, scanned: false },
    { id: 5, label: "Frame #0245", type: "real", confidence: 99.0, scanned: false },
    { id: 6, label: "Frame #0246", type: "synthetic", confidence: 8.4, scanned: false },
  ]);
  const [scanning, setScanning] = useState(false);
  const [activeFrame, setActiveFrame] = useState<number | null>(null);
  const [scanSpeed, setScanSpeed] = useState('100ms');

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    
    // Reset scan states
    setFrames(prev => prev.map(f => ({ ...f, scanned: false })));
    
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx >= frames.length) {
        clearInterval(interval);
        setScanning(false);
        setActiveFrame(null);
        return;
      }
      
      setActiveFrame(currentIdx);
      setFrames(prev => {
        const next = [...prev];
        next[currentIdx] = { ...next[currentIdx], scanned: true };
        return next;
      });
      
      currentIdx++;
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 md:p-4 text-canvas-text select-none">
      {/* Control panel HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-canvas-border/10">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-accent-bright uppercase tracking-widest">// slopslayer.neural_analyzer</span>
          <h3 className="text-lg font-heading font-bold uppercase">
            Frame-by-Frame Synthetics Inspector
          </h3>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <span>speed: <span className="text-accent-bright">{scanSpeed}</span></span>
          <button
            onClick={startScan}
            disabled={scanning}
            className={`px-4 py-1.5 rounded border uppercase text-[10px] tracking-wider transition-all ${
              scanning 
                ? 'border-accent-dim text-accent-dim cursor-not-allowed' 
                : 'border-accent-bright text-accent-bright bg-accent-bright/5 hover:bg-accent-bright hover:text-canvas-bg'
            }`}
          >
            {scanning ? 'scanning...' : 'run detection scan'}
          </button>
        </div>
      </div>

      {/* Frame scanning stage */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
        {frames.map((frame, idx) => {
          const isActive = activeFrame === idx;
          const isFake = frame.type === 'synthetic';
          
          let borderStyle = 'border-canvas-border/40';
          let bgStyle = 'bg-canvas-card/10';
          let textColor = 'text-canvas-text-secondary';
          
          if (isActive) {
            borderStyle = 'border-accent-bright shadow-lg shadow-accent-bright/15 animate-pulse';
            bgStyle = 'bg-accent-bright/5';
          } else if (frame.scanned) {
            if (isFake) {
              borderStyle = 'border-red-500/80 shadow-md shadow-red-500/10';
              bgStyle = 'bg-red-500/5';
              textColor = 'text-red-400';
            } else {
              borderStyle = 'border-emerald-500/40';
              bgStyle = 'bg-emerald-500/5';
              textColor = 'text-emerald-400';
            }
          }

          return (
            <div
              key={frame.id}
              className={`relative p-4 rounded-xl border flex flex-col justify-between gap-4 h-32 transition-all duration-300 ${borderStyle} ${bgStyle}`}
            >
              {/* Scan sweep laser line overlay */}
              {isActive && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-bright animate-scan-laser" />
              )}
              
              <div className="flex items-center justify-between font-mono text-[9px]">
                <span className={textColor}>{frame.label}</span>
                {frame.scanned && (
                  <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider ${
                    isFake ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {frame.type}
                  </span>
                )}
              </div>

              {/* Vector diagram / Waveform representation in frame */}
              <div className="w-full h-12 flex items-center justify-center relative overflow-hidden bg-canvas-elevated/20 rounded border border-canvas-border/10">
                <svg className="w-full h-8 opacity-40" viewBox="0 0 100 30">
                  <path
                    d={`M 0 15 Q 25 ${isFake ? '0' : '10'} 50 15 T 100 15`}
                    fill="none"
                    stroke={frame.scanned && isFake ? '#ef4444' : 'var(--color-accent-bright)'}
                    strokeWidth="1.5"
                  />
                  {isFake && (
                    <circle cx="50" cy="15" r="2.5" fill="#ef4444" className="animate-ping" />
                  )}
                </svg>
              </div>

              <div className="flex items-end justify-between font-mono text-[9px] text-canvas-text-tertiary">
                <span>loss: {isFake ? '0.0042' : '0.0001'}</span>
                <span>
                  {frame.scanned ? `conf: ${frame.confidence}%` : 'status: queued'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analyzer status HUD */}
      <div className="pt-4 border-t border-canvas-border/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[9px] text-canvas-text-tertiary uppercase">
        <span>// pipeline.stage: FRAME_ISOLATION_LAYERS</span>
        <span>
          // detections: {frames.filter(f => f.scanned && f.type === 'synthetic').length} anomalies
        </span>
      </div>
    </div>
  );
}
