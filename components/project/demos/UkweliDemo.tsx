'use client';

import React, { useState } from 'react';

interface ClaimNode {
  id: string;
  label: string;
  verdict: 'verified' | 'disputed' | 'false';
  text: string;
  swahiliText: string;
  shares: number;
  sources: string[];
}

export function UkweliDemo() {
  const [activeNode, setActiveNode] = useState<string>('c1');
  
  const claims: ClaimNode[] = [
    {
      id: 'c1',
      label: 'Claim #A941',
      verdict: 'false',
      text: 'AI verification indicates this is synthetic media promoting a financial scan.',
      swahiliText: 'Maboresho ya AI yanasema picha hii imetengenezwa kueneza wizi wa pesa.',
      shares: 4200,
      sources: ['Kenyatta Hospital MOH Dispatch', 'NTSA Official Bulletin'],
    },
    {
      id: 'c2',
      label: 'Claim #B112',
      verdict: 'verified',
      text: 'Official records confirm this subsidy program is active and fully funded.',
      swahiliText: 'Ripoti rasmi zinathibitisha mpango huu wa kutoa msaada bado unajiri.',
      shares: 1250,
      sources: ['National Treasury Gazetted Notice #240'],
    },
    {
      id: 'c3',
      label: 'Claim #D409',
      verdict: 'disputed',
      text: 'Mixed reports from localized sectors. Direct evidence is currently unverified.',
      swahiliText: 'Taarifa mchanganyiko kutoka mikoani. Ushahidi wa wazi bado haujathibitishwa.',
      shares: 890,
      sources: ['County Assembly Minutes Archive', 'Localized Press Release'],
    },
  ];

  const selectedClaim = claims.find(c => c.id === activeNode) || claims[0];

  return (
    <div className="w-full h-full grid md:grid-cols-5 gap-6 p-2 md:p-4 text-canvas-text select-none">
      
      {/* Left 3 Columns: Graph visualizer stage */}
      <div className="md:col-span-3 flex flex-col justify-between p-4 rounded-xl border border-canvas-border/30 bg-canvas-elevated/10">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-accent-bright uppercase tracking-widest">// ukweli.disinformation_tracer</span>
          <h3 className="text-base font-heading font-bold uppercase">
            Sheng/Swahili Fact-Graph
          </h3>
        </div>

        {/* Claim node constellation canvas map */}
        <div className="my-6 relative w-full h-44 bg-canvas-bg border border-canvas-border/10 rounded-lg flex items-center justify-center overflow-hidden">
          {/* Constellation connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <line x1="20%" y1="50%" x2="50%" y2="25%" stroke="var(--color-canvas-border)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="50%" y1="25%" x2="80%" y2="60%" stroke="var(--color-canvas-border)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20%" y1="50%" x2="80%" y2="60%" stroke="var(--color-canvas-border)" strokeWidth="1" strokeDasharray="3 3" />
          </svg>

          {/* Node 1 */}
          <button
            onClick={() => setActiveNode('c1')}
            className={`absolute left-[15%] top-[40%] flex flex-col items-center gap-1 group transition-all duration-300`}
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
              activeNode === 'c1' 
                ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20 scale-110' 
                : 'border-canvas-border bg-canvas-card group-hover:border-red-500'
            }`}>
              <span className="text-[10px] font-mono text-red-500 font-bold">!</span>
            </div>
            <span className="text-[8px] font-mono text-canvas-text-tertiary">#A941 (sheng)</span>
          </button>

          {/* Node 2 */}
          <button
            onClick={() => setActiveNode('c2')}
            className={`absolute left-[45%] top-[15%] flex flex-col items-center gap-1 group transition-all duration-300`}
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
              activeNode === 'c2' 
                ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20 scale-110' 
                : 'border-canvas-border bg-canvas-card group-hover:border-emerald-500'
            }`}>
              <span className="text-[9px] font-mono text-emerald-500 font-bold">✓</span>
            </div>
            <span className="text-[8px] font-mono text-canvas-text-tertiary">#B112 (swahili)</span>
          </button>

          {/* Node 3 */}
          <button
            onClick={() => setActiveNode('c3')}
            className={`absolute left-[72%] top-[50%] flex flex-col items-center gap-1 group transition-all duration-300`}
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
              activeNode === 'c3' 
                ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20 scale-110' 
                : 'border-canvas-border bg-canvas-card group-hover:border-yellow-500'
            }`}>
              <span className="text-[9px] font-mono text-yellow-500 font-bold">?</span>
            </div>
            <span className="text-[8px] font-mono text-canvas-text-tertiary">#D409 (mix)</span>
          </button>
        </div>

        <div className="text-[9px] font-mono text-canvas-text-tertiary uppercase">
          // instruction: click nodes to run content verification audit
        </div>
      </div>

      {/* Right 2 Columns: Audit details panel */}
      <div className="md:col-span-2 flex flex-col justify-between p-4 rounded-xl border border-canvas-border/30 bg-canvas-elevated/10">
        <div className="pb-3 border-b border-canvas-border/10 space-y-1">
          <span className="text-[9px] font-mono text-accent-bright uppercase tracking-widest">// verification_audit_logs</span>
          <h4 className="text-sm font-heading font-bold uppercase text-canvas-text">
            {selectedClaim.label} details
          </h4>
        </div>

        {/* Claim card info */}
        <div className="flex-1 my-4 space-y-4 text-xs">
          
          {/* Swahili Translation tag */}
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-canvas-text-tertiary uppercase">Swahili/Sheng query:</span>
            <p className="italic text-canvas-text-secondary leading-relaxed bg-canvas-bg/50 p-2.5 rounded border border-canvas-border/10">
              "{selectedClaim.swahiliText}"
            </p>
          </div>

          {/* Verification Verdict text */}
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-canvas-text-tertiary uppercase">Verdict verification:</span>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                selectedClaim.verdict === 'false' ? 'bg-red-500/10 text-red-400' :
                selectedClaim.verdict === 'verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
              }`}>
                {selectedClaim.verdict}
              </span>
              <span className="text-canvas-text-tertiary font-mono">({selectedClaim.shares.toLocaleString()} shares)</span>
            </div>
            <p className="text-canvas-text-secondary leading-relaxed mt-1">
              {selectedClaim.text}
            </p>
          </div>

          {/* Sources list */}
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-canvas-text-tertiary uppercase">Verified Source Trails:</span>
            <ul className="list-disc list-inside font-mono text-[9px] text-canvas-text-secondary space-y-1">
              {selectedClaim.sources.map((s, idx) => (
                <li key={idx} className="truncate">{s}</li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-3 border-t border-canvas-border/10 font-mono text-[9px] text-canvas-text-tertiary uppercase">
          // integrity_status: secured
        </div>
      </div>

    </div>
  );
}
