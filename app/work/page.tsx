import Link from 'next/link'

const projects = [
  {
    slug: 'detection-system',
    title: 'Real-Time Content Detection',
    domain: 'AI / Detection',
    description: 'Building scalable machine learning pipelines with TypeScript',
  },
  {
    slug: 'analytics',
    title: 'Analytics Platform',
    domain: 'Data / Infrastructure',
    description: 'Processing billions of events with Kafka and ClickHouse',
  },
]

export const metadata = {
  title: 'Work',
  description: 'Selected projects and case studies',
}

export default function WorkPage() {
  return (
    <main className="w-full min-h-screen bg-canvas-bg">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-heading font-bold">
            Selected Work
          </h1>
          <p className="text-lg text-canvas-text-secondary max-w-2xl">
            A collection of projects spanning system design, machine learning, and infrastructure.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-20 px-4 border-t border-canvas-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:gap-12">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="surface-card p-8 md:p-12 rounded-xl transition-all duration-300 hover:border-accent-bright/50">
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-bright/10 border border-accent-bright/30">
                      <div className="w-1 h-1 rounded-full bg-accent-bright" />
                      <span className="text-xs font-mono text-accent-bright uppercase tracking-wider">
                        {project.domain}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 group-hover:accent-text transition-colors duration-300">
                    {project.title}
                  </h2>

                  <p className="text-lg text-canvas-text-secondary mb-6">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-accent-bright font-mono text-sm uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                    <span>Read Case Study</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 md:py-16 px-4 border-t border-canvas-border/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-canvas-text-tertiary">
            More projects coming soon. Interested in working together?
          </p>
        </div>
      </section>
    </main>
  )
}
