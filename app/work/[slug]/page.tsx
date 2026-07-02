import { notFound } from 'next/navigation'
import { ProjectPage } from '@/components/project/project-page'
import { getProjectBySlug, getProjectContent } from '@/lib/projects'

// Flagship demo components
import { SlopSlayerDemo } from '@/components/project/demos/SlopSlayerDemo'
import { IntuiLabDemo } from '@/components/project/demos/IntuiLabDemo'
import { UkweliDemo } from '@/components/project/demos/UkweliDemo'
import { DiraDemo } from '@/components/project/demos/DiraDemo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [
    { slug: 'slopslayer' },
    { slug: 'opinionminer' },
    { slug: 'nutrilogic' },
    { slug: 'dira' },
    { slug: 'diffgeo' },
    { slug: 'musicgame' },
    { slug: 'spiks' },
    { slug: 'legacy-core' },
    { slug: 'miniecommerce' },
    { slug: 'ukweli' },
    { slug: 'nyaraka' },
    { slug: 'veld' },
    { slug: 'digital-economy' },
    { slug: 'collab' },
    { slug: 'the-househub' },
    { slug: 'ai-course-recommender' },
    { slug: 'quickfood-frontend' }
  ]
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) {
    return {
      title: 'Project Not Found | Benaih Shaback Portfolio',
      description: 'The requested project could not be found.'
    }
  }
  return {
    title: `${project.title} | Benaih Shaback Portfolio`,
    description: `${project.domain} - Case study and architectural details for ${project.title}`
  }
}

export default async function ProjectShowcasePage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) {
    notFound()
  }

  const content = await getProjectContent(slug)
  if (!content) {
    notFound()
  }

  // Merge runtime project metadata (accentHue) into the content payload
  const fullContent = {
    ...content,
    hero: {
      ...content.hero,
      accentHue: project.accentHue
    }
  }

  // Select dynamic demo component
  let demoComponent = null
  if (slug === 'slopslayer') {
    demoComponent = <SlopSlayerDemo />
  } else if (slug === 'intuilab') {
    demoComponent = <IntuiLabDemo />
  } else if (slug === 'ukweli') {
    demoComponent = <UkweliDemo />
  } else if (slug === 'dira') {
    demoComponent = <DiraDemo />
  }

  return (
    <ProjectPage data={fullContent} slug={slug}>
      {demoComponent}
    </ProjectPage>
  )
}
