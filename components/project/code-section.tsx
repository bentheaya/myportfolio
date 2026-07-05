'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface CodeBlock {
  filename: string;
  language?: string;
  code: string;
}

interface CodeSectionProps {
  title: string;
  description?: string;
  codeBlocks: CodeBlock[];
  narrative?: string;
  reverseLayout?: boolean;
}

function Flowchart() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const nodes = el.querySelectorAll('.flow-node');
    const paths = el.querySelectorAll('.flow-path');

    // Set paths to hidden initially
    paths.forEach(path => {
      const len = (path as SVGPathElement).getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 45%',
        toggleActions: 'play none none none',
      }
    });

    tl.to(nodes[0], { scale: 1.05, filter: 'drop-shadow(0 0 12px var(--color-accent-bright))', borderColor: 'var(--color-accent-bright)', duration: 0.35 })
      .to(paths[0], { strokeDashoffset: 0, duration: 0.45, ease: 'power1.inOut' })
      .to(nodes[1], { scale: 1.05, filter: 'drop-shadow(0 0 12px var(--color-accent-bright))', borderColor: 'var(--color-accent-bright)', duration: 0.35 })
      .to(paths[1], { strokeDashoffset: 0, duration: 0.45, ease: 'power1.inOut' })
      .to(nodes[2], { scale: 1.05, filter: 'drop-shadow(0 0 12px var(--color-accent-bright))', borderColor: 'var(--color-accent-bright)', duration: 0.35 });

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full py-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto font-mono text-[9px] uppercase mb-12 border border-canvas-border/40 p-6 rounded-xl bg-canvas-card/10 select-none">
      {/* Node 1 */}
      <div className="flow-node w-36 py-3.5 rounded-lg border border-canvas-border bg-canvas-elevated text-center transition-all duration-500">
        <span className="text-canvas-text-secondary font-bold tracking-wider">// 01. INGEST_PIPELINE</span>
      </div>

      {/* Link 1 */}
      <svg className="w-16 h-8 hidden md:block">
        <path className="flow-path" d="M 0 16 L 64 16" stroke="var(--color-accent-bright)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      </svg>

      {/* Node 2 */}
      <div className="flow-node w-36 py-3.5 rounded-lg border border-canvas-border bg-canvas-elevated text-center transition-all duration-500">
        <span className="text-canvas-text-secondary font-bold tracking-wider">// 02. PROCESSING_STRATA</span>
      </div>

      {/* Link 2 */}
      <svg className="w-16 h-8 hidden md:block">
        <path className="flow-path" d="M 0 16 L 64 16" stroke="var(--color-accent-bright)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      </svg>

      {/* Node 3 */}
      <div className="flow-node w-36 py-3.5 rounded-lg border border-canvas-border bg-canvas-elevated text-center transition-all duration-500">
        <span className="text-canvas-text-secondary font-bold tracking-wider">// 03. EXPORT_OUTPUT</span>
      </div>
    </div>
  );
}

export function CodeSection({
  title,
  description,
  codeBlocks,
  narrative,
  reverseLayout = false,
}: CodeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isArchitecture = title.toLowerCase().includes('architecture') || title.toLowerCase().includes('stack');

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    // Stagger code lines on scroll
    const codeContainers = el.querySelectorAll('.code-pre-container');
    const triggers: ScrollTrigger[] = [];

    codeContainers.forEach((container) => {
      const lines = container.querySelectorAll('.code-line');
      
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(lines, 
            { opacity: 0, x: 8 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.35, 
              stagger: 0.04, 
              ease: 'power2.out' 
            }
          );
        },
        once: true
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, [codeBlocks]);

  return (
    <section ref={sectionRef} className="relative w-full px-6 md:px-12 py-20 md:py-32 border-t border-canvas-border/20 bg-canvas-bg">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6 uppercase">
            {title}
          </h2>
          {description && (
            <p className="text-base md:text-lg text-canvas-text-secondary max-w-3xl leading-relaxed font-mono">
              {description}
            </p>
          )}
        </div>

        {/* Render animated flowchart if it is the Architecture section */}
        {isArchitecture && <Flowchart />}

        {/* Two-column layout: code blocks + narrative */}
        <div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 ${
            reverseLayout ? 'md:auto-cols-fr' : ''
          }`}
        >
          {/* Code blocks column */}
          <div className={`space-y-4 md:space-y-6 ${reverseLayout ? 'md:order-2' : ''}`}>
            {codeBlocks.map((block, idx) => {
              const lines = block.code.split('\n');
              return (
                <div key={idx} className="space-y-1">
                  {/* Filename header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-canvas-elevated rounded-t-lg border border-b-0 border-canvas-border">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-bright" />
                    <span className="text-[10px] font-mono text-canvas-text-secondary uppercase tracking-wider">
                      {block.filename}
                    </span>
                  </div>

                  {/* Code block with staggered line reveals */}
                  <pre className="code-pre-container p-4 bg-canvas-card border border-t-0 border-canvas-border rounded-b-lg overflow-x-auto select-text">
                    <code className="font-mono text-[11px] md:text-xs leading-relaxed text-canvas-text-secondary block">
                      {lines.map((line, lineIdx) => (
                        <div key={lineIdx} className="code-line opacity-0 flex items-start gap-4 py-0.5">
                          <span className="text-[9px] font-mono text-canvas-text-tertiary select-none w-4 text-right inline-block">
                            {lineIdx + 1}
                          </span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              );
            })}
          </div>

          {/* Narrative column */}
          {narrative && (
            <div className={`flex flex-col justify-start ${reverseLayout ? 'md:order-1' : ''}`}>
              <div className="space-y-6">
                <div className="space-y-4">
                  {narrative.split('\n\n').map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-canvas-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key points box */}
                <div className="mt-8 pt-8 border-t border-canvas-border/30">
                  <p className="text-[9px] font-mono text-canvas-text-tertiary uppercase tracking-wider mb-4">
                    // Key Insights
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Modular architecture enables scalable components',
                      'Strict type safety checks avoid runtime errors',
                      'Deterministic algorithms maintain execution predictability',
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs md:text-sm text-canvas-text-secondary"
                      >
                        <span className="text-accent-bright mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
