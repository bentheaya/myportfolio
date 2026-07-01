'use client';

import React, { useState, useEffect, useRef } from 'react';

interface InteractionShellProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onDemoStepChange?: (index: number) => void;
  totalDemoSteps?: number;
}

export function InteractionShell({ 
  title = "Interactive Environment", 
  description, 
  children,
  onDemoStepChange,
  totalDemoSteps = 4
}: InteractionShellProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Observe visibility in viewport to trigger/pause auto-demo
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Trigger callback when active step changes
    if (onDemoStepChange) {
      onDemoStepChange(activeStep);
    }
  }, [activeStep, onDemoStepChange]);

  useEffect(() => {
    // Auto-demo timer loop (5 seconds cycle)
    if (!inView || userInteracted) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setProgress(0);
      return;
    }

    // Set up step increment timer
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % totalDemoSteps);
      setProgress(0);
    }, 5000);

    // Set up smooth 100ms interval for progress bar UI
    const stepDurationMs = 5000;
    const updateIntervalMs = 100;
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (updateIntervalMs / stepDurationMs) * 100;
      });
    }, updateIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [inView, userInteracted, totalDemoSteps]);

  const handleInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      setProgress(0);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full px-6 md:px-12 py-20 md:py-32 border-t border-canvas-border/20 bg-canvas-bg"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-accent-bright uppercase tracking-widest">// sandbox.execution</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-canvas-text leading-none uppercase">
              {title}
            </h2>
            {description && (
              <p className="text-base md:text-lg text-canvas-text-secondary max-w-3xl leading-relaxed font-mono">
                {description}
              </p>
            )}
          </div>

          {/* Mode Indicator Panel */}
          <div className="flex flex-col items-start md:items-end gap-1.5 font-mono text-[10px] uppercase tracking-wider text-canvas-text-tertiary">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${userInteracted ? 'bg-accent-bright' : 'bg-canvas-text-secondary animate-pulse'}`} />
              <span>
                {userInteracted ? 'mode: user_interactive' : 'mode: passive_loop_demo'}
              </span>
            </div>
            {!userInteracted && (
              <div className="w-32 h-[1px] bg-canvas-border/40 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-accent-bright transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Visual Stage Container */}
        <div 
          onClick={handleInteraction}
          onMouseEnter={handleInteraction}
          onTouchStart={handleInteraction}
          className="relative w-full h-[350px] md:h-[550px] bg-canvas-card/30 border border-canvas-border/30 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between p-6"
        >
          {/* Custom rendering slot */}
          {children ? (
            children
          ) : (
            // Default interactive simulation placeholder
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="flex items-center gap-4">
                {[...Array(totalDemoSteps)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-12 h-1 rounded transition-all duration-300 ${
                      activeStep === i 
                        ? 'bg-accent-bright' 
                        : 'bg-canvas-border'
                    }`}
                  />
                ))}
              </div>
              <div className="space-y-1 select-none">
                <p className="text-xs font-mono text-canvas-text-secondary uppercase">
                  Simulation Node {activeStep + 1} / {totalDemoSteps}
                </p>
                <p className="text-[10px] font-mono text-canvas-text-tertiary">
                  {userInteracted 
                    ? "Control manual: click/drag inside canvas to override" 
                    : `Next state transition in ${(5 - (progress / 20)).toFixed(1)}s`
                  }
                </p>
              </div>
            </div>
          )}

          {/* Bottom HUD stats */}
          <div className="w-full flex items-center justify-between font-mono text-[9px] text-canvas-text-tertiary uppercase mt-auto select-none pt-4 border-t border-canvas-border/5">
            <span>// stage.width: fluid</span>
            <span>// status: compiled_successfully</span>
          </div>
        </div>
      </div>
    </section>
  );
}
