interface OriginSectionProps {
  pullQuote: string
  paragraphs: string[]
}

export function OriginSection({ pullQuote, paragraphs }: OriginSectionProps) {
  return (
    <section className="relative w-full px-4 md:px-8 py-20 md:py-32 border-t border-canvas-border/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
          {/* Left column: Pull quote */}
          <div className="md:col-span-2 flex flex-col justify-start">
            <blockquote className="italic text-4xl md:text-5xl lg:text-6xl leading-tight font-heading text-accent-bright tracking-tight">
              "{pullQuote}"
            </blockquote>
          </div>

          {/* Right column: Technical copy */}
          <div className="md:col-span-3 space-y-6 md:space-y-8">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base md:text-lg leading-relaxed text-canvas-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
