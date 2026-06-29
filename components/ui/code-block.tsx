import React from 'react';

export interface CodeBlockProps {
  filename?: string;
  language?: string;
  code: string;
  highlightLines?: number[];
  className?: string;
}

/**
 * CodeBlock
 * Syntax-highlight ready code display using JetBrains Mono.
 * 
 * Features:
 * - Filename header with language indicator
 * - Line numbers
 * - Highlight specific lines
 * - Proper monospace formatting
 * - Line-height optimized for readability
 * - Responsive scrolling
 * 
 * Usage:
 * <CodeBlock
 *   filename="detection.ts"
 *   language="typescript"
 *   code={`export async function detectContent(input: string) {\n  return analyzer.scan(input);\n}`}
 *   highlightLines={[1]}
 * />
 */
export function CodeBlock({
  filename,
  language = 'javascript',
  code,
  highlightLines = [],
  className = '',
}: CodeBlockProps) {
  const lines = code.split('\n');
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-canvas-border bg-canvas-elevated/40 ${className}`}
    >
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-canvas-border/50 bg-canvas-elevated/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-canvas-text-tertiary uppercase tracking-wide">
              {language}
            </span>
            <span className="text-canvas-border/50">·</span>
            <span className="text-sm font-mono text-canvas-text">{filename}</span>
          </div>
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <div className="flex">
          {/* Line numbers */}
          <div className="flex flex-col items-end gap-0 px-4 py-4 text-right text-canvas-text-tertiary bg-canvas-card/30 border-r border-canvas-border/30 select-none">
            {lineNumbers.map((num) => (
              <div
                key={num}
                className="font-mono text-xs leading-6"
              >
                {num}
              </div>
            ))}
          </div>

          {/* Code content */}
          <div className="flex-1">
            <pre className="px-4 py-4 overflow-x-auto">
              <code className="font-mono text-sm text-canvas-text leading-6 block">
                {lines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`${
                      highlightLines.includes(idx + 1)
                        ? 'bg-accent-faint/30 px-2 mx-2 rounded border-l-2 border-accent-bright'
                        : ''
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
