import { HeroSection } from './hero-section'
import { OriginSection } from './origin-section'
import { InteractionShell } from './interaction-shell'
import { CodeSection } from './code-section'
import { MetricsSection } from './metrics-section'

export interface ProjectPageData {
  hero: {
    backHref?: string
    domain: string
    title: string
    subtitle?: string
    accentHue?: number
  }
  origin: {
    pullQuote: string
    paragraphs: string[]
  }
  architecture: {
    title: string
    description: string
    codeBlocks: Array<{
      filename: string
      language?: string
      code: string
    }>
    narrative: string
  }
  hardParts: {
    title: string
    description: string
    codeBlocks: Array<{
      filename: string
      language?: string
      code: string
    }>
    narrative: string
    reverseLayout?: boolean
  }
  metrics: {
    metrics: Array<{
      label: string
      value: string
    }>
    nextProjectTitle: string
    nextProjectHref: string
    nextProjectSubtitle?: string
  }
}

interface ProjectPageProps {
  data: ProjectPageData
  children?: React.ReactNode
  slug?: string
}

export function ProjectPage({ data, children, slug }: ProjectPageProps) {
  return (
    <article className="w-full bg-canvas-bg">
      {/* Hero Section */}
      <HeroSection
        backHref={data.hero.backHref}
        domain={data.hero.domain}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        accentHue={data.hero.accentHue}
        slug={slug}
      />

      {/* Origin Section */}
      <OriginSection
        pullQuote={data.origin.pullQuote}
        paragraphs={data.origin.paragraphs}
      />

      {/* Interaction Shell - with canvas ready for custom elements */}
      <InteractionShell
        title="Live Simulation"
        description="Interact with the active sandbox model below to test the logic interfaces."
      >
        {children}
      </InteractionShell>

      {/* Architecture Section */}
      <CodeSection
        title={data.architecture.title}
        description={data.architecture.description}
        codeBlocks={data.architecture.codeBlocks}
        narrative={data.architecture.narrative}
      />

      {/* Hard Parts Section */}
      <CodeSection
        title={data.hardParts.title}
        description={data.hardParts.description}
        codeBlocks={data.hardParts.codeBlocks}
        narrative={data.hardParts.narrative}
        reverseLayout={data.hardParts.reverseLayout}
      />

      {/* Metrics & Next Project Section */}
      <MetricsSection
        metrics={data.metrics.metrics}
        nextProjectTitle={data.metrics.nextProjectTitle}
        nextProjectHref={data.metrics.nextProjectHref}
        nextProjectSubtitle={data.metrics.nextProjectSubtitle}
      />
    </article>
  )
}
