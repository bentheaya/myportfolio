'use client';

import React, { useState, useEffect } from 'react';

interface Message {
  sender: 'tutor' | 'student';
  text: string;
}

export function IntuiLabDemo() {
  const [frequency, setFrequency] = useState(2);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'tutor', text: "Hello! Observe the wave profile on the left. What happens to the energy nodes as you change the parameter?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-respond when frequency slider changes (with Socratic questions)
  useEffect(() => {
    if (frequency === 2) return;
    
    setIsTyping(true);
    const delay = setTimeout(() => {
      let response = "";
      if (frequency < 2) {
        response = "Interesting. The wave crests are wider now. What does this suggest about the energy required to sustain this frequency?";
      } else if (frequency > 4) {
        response = "Observe the rapid oscillation. Why do you think the nodes are clustering closer to the boundary?";
      } else {
        response = "The wave returns to its intermediate harmonic. What physical law dictates this stabilization?";
      }
      
      setMessages(prev => [...prev, { sender: 'tutor', text: response }]);
      setIsTyping(false);
    }, 1200);

    return () => clearTimeout(delay);
  }, [frequency]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const studentMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'student', text: studentMsg }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      // Socratic answers: lead inquiries, never leak direct answers!
      let response = "That's a good observation. If you look closely at the boundary endpoints, how is the tension balanced? What mathematical relation connects tension to the frequency?";
      if (studentMsg.toLowerCase().includes('answer') || studentMsg.toLowerCase().includes('formula')) {
        response = "I cannot give you the direct equation. Instead, look at how doubling the frequency affects the number of node crossings. Try shifting the slider to verify.";
      }
      setMessages(prev => [...prev, { sender: 'tutor', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full grid md:grid-cols-2 gap-6 p-2 md:p-4 text-canvas-text select-none">
      
      {/* Left Column: Interactive physics simulation stage */}
      <div className="flex flex-col justify-between p-4 rounded-xl border border-canvas-border/30 bg-canvas-elevated/10">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-accent-bright uppercase tracking-widest">// intuilab.physics_manifold</span>
          <h3 className="text-base font-heading font-bold uppercase">
            Resonant Wave Manifold
          </h3>
        </div>

        {/* Dynamic SVG Waveform */}
        <div className="my-6 w-full h-32 bg-canvas-bg border border-canvas-border/10 rounded-lg flex items-center justify-center relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 80">
            {/* Grid background lines */}
            <line x1="0" y1="40" x2="200" y2="40" stroke="var(--color-canvas-border)" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="100" y1="0" x2="100" y2="80" stroke="var(--color-canvas-border)" strokeWidth="0.5" strokeDasharray="3 3" />
            
            {/* Dynamic wave trajectory path */}
            <path
              d={Array.from({ length: 100 }, (_, i) => {
                const x = (i / 99) * 200;
                // Sinusoidal wave formula parameterized by frequency slider
                const y = 40 + Math.sin((i / 99) * Math.PI * frequency) * 25;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--color-accent-bright)"
              strokeWidth="2"
            />
            {/* Draw nodes (zeros of the sin function) */}
            {Array.from({ length: frequency + 1 }).map((_, idx) => {
              const x = (idx / frequency) * 200;
              return (
                <circle key={idx} cx={x} cy="40" r="3" fill="var(--color-canvas-text)" className="animate-pulse" />
              );
            })}
          </svg>
        </div>

        {/* Frequency Parameter slider controller */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span>harmonic frequency (f)</span>
            <span className="text-accent-bright">{frequency}.00 Hz</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            className="w-full h-1 bg-canvas-border rounded-lg appearance-none cursor-pointer accent-accent-bright"
          />
        </div>
      </div>

      {/* Right Column: Socratic AI Tutor node chat */}
      <div className="flex flex-col justify-between p-4 rounded-xl border border-canvas-border/30 bg-canvas-elevated/10 h-full max-h-[400px] md:max-h-full">
        <div className="flex items-center justify-between pb-3 border-b border-canvas-border/10">
          <span className="text-[9px] font-mono text-accent-bright uppercase tracking-widest">// socratic_tutor_node</span>
          <span className="text-[8px] font-mono uppercase bg-accent-bright/10 text-accent-bright px-1.5 py-0.5 rounded">
            constrained_answers
          </span>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2 scrollbar-thin text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                msg.sender === 'tutor'
                  ? 'bg-canvas-card border border-canvas-border/20 mr-auto text-canvas-text-secondary'
                  : 'bg-accent-bright text-canvas-bg ml-auto font-medium'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="p-2 rounded bg-canvas-card border border-canvas-border/10 mr-auto text-[10px] font-mono text-canvas-text-tertiary animate-pulse">
              tutor node is formulating inquiry...
            </div>
          )}
        </div>

        {/* Input panel form */}
        <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-canvas-border/10">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your response to the tutor..."
            className="flex-1 px-3 py-1.5 rounded bg-canvas-bg border border-canvas-border/30 text-xs focus:outline-none focus:border-accent-bright font-mono"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded bg-accent-bright text-canvas-bg text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            send
          </button>
        </form>
      </div>

    </div>
  );
}
