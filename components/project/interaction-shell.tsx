interface InteractionShellProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

export function InteractionShell({ title, description, children }: InteractionShellProps) {
  return (
    <section className="relative w-full px-4 md:px-8 py-20 md:py-32 border-t border-canvas-border/20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        {(title || description) && (
          <div className="mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg md:text-xl text-canvas-text-secondary max-w-3xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Custom content area - pass children if needed */}
        {children ? (
          children
        ) : (
          // Default canvas container stub - ready for custom web elements
          <>
            <div className="mb-8 md:mb-12">
              <p className="text-sm font-mono text-canvas-text-tertiary uppercase tracking-wider mb-4">
                Interactive Canvas
              </p>
            </div>

            <div
              id="signature-canvas-stage"
              className="relative w-full h-[300px] md:h-[500px] bg-canvas-card border border-canvas-border rounded-xl shadow-sm overflow-hidden"
            >
              {/* Empty container ready for custom element injection */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <p className="text-sm text-canvas-text-tertiary font-mono">Canvas Ready</p>
                  <p className="text-xs text-canvas-text-tertiary/60">
                    Drop your custom elements here
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
