interface CodeBlock {
  filename: string
  language?: string
  code: string
}

interface CodeSectionProps {
  title: string
  description?: string
  codeBlocks: CodeBlock[]
  narrative?: string
  reverseLayout?: boolean
}

export function CodeSection({
  title,
  description,
  codeBlocks,
  narrative,
  reverseLayout = false,
}: CodeSectionProps) {
  return (
    <section className="relative w-full px-4 md:px-8 py-20 md:py-32 border-t border-canvas-border/20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-canvas-text-secondary max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Two-column layout: code blocks + narrative */}
        <div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 ${
            reverseLayout ? 'md:auto-cols-fr' : ''
          }`}
        >
          {/* Code blocks column */}
          <div className={`space-y-4 md:space-y-6 ${reverseLayout ? 'md:order-2' : ''}`}>
            {codeBlocks.map((block, idx) => (
              <div key={idx} className="space-y-2">
                {/* Filename header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-canvas-elevated rounded-t-lg border border-b-0 border-canvas-border">
                  <div className="w-2 h-2 rounded-full bg-accent-bright" />
                  <span className="text-xs font-mono text-canvas-text-secondary uppercase tracking-wider">
                    {block.filename}
                  </span>
                </div>

                {/* Code block */}
                <pre className="p-4 bg-canvas-card border border-t-0 border-canvas-border rounded-b-lg overflow-x-auto">
                  <code className="font-mono text-xs md:text-sm leading-relaxed text-canvas-text-secondary">
                    {block.code}
                  </code>
                </pre>
              </div>
            ))}
          </div>

          {/* Narrative column */}
          {narrative && (
            <div className={`flex flex-col justify-start ${reverseLayout ? 'md:order-1' : ''}`}>
              <div className="space-y-6">
                <div className="space-y-4">
                  {narrative.split('\n\n').map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base md:text-lg leading-relaxed text-canvas-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key points box */}
                <div className="mt-8 pt-8 border-t border-canvas-border/30">
                  <p className="text-xs font-mono text-canvas-text-tertiary uppercase tracking-wider mb-4">
                    Key Insights
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Modular architecture enables scalability',
                      'Type safety prevents runtime errors',
                      'Semantic patterns improve maintainability',
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-canvas-text-secondary"
                      >
                        <span className="text-accent-bright mt-1">→</span>
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
  )
}
