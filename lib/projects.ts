export interface ProjectMetadata {
  slug: string;
  title: string;
  domain: string;
  accentColor: string; // Hex color for project-specific highlights
  accentHue: number;   // HSL Hue (0-360) for relative system elements
  githubUrl?: string;
  status: string;
  tags: string[];
  track: 'AI & Models' | 'Spatial & Geometry' | 'Architectures & Backends' | 'Civic Data & Archives';
  nextProjectSlug?: string;
}

export const projectsMetadata: ProjectMetadata[] = [
  // AI & Models Track
  {
    slug: 'slopslayer',
    title: 'SlopSlayer',
    domain: 'AI / Detection',
    accentColor: '#ef4444',
    accentHue: 0,
    githubUrl: 'https://github.com/bentheaya/SlopSlayer',
    status: 'Active / Open Source',
    tags: ['Python', 'Gemini Multi-Modal', 'Computer Vision', 'Temporal Classification'],
    track: 'AI & Models',
    nextProjectSlug: 'opinionminer',
  },
  {
    slug: 'opinionminer',
    title: 'OpinionMiner',
    domain: 'AI / NLP',
    accentColor: '#f97316',
    accentHue: 30,
    githubUrl: 'https://github.com/bentheaya/opinionminer',
    status: 'Completed',
    tags: ['Python', 'Tokenizers', 'Code-Switching', 'Dialect Sentiment Mapping'],
    track: 'AI & Models',
    nextProjectSlug: 'nutrilogic',
  },
  {
    slug: 'nutrilogic',
    title: 'NutriLogic Expert System',
    domain: 'AI / Neuro-Symbolic',
    accentColor: '#22c55e',
    accentHue: 120,
    githubUrl: 'https://github.com/bentheaya/NutriLogic-Expert-System',
    status: 'Completed',
    tags: ['Prolog', 'Django', 'React', 'Symbolic Rule Matrices'],
    track: 'AI & Models',
    nextProjectSlug: 'ai-course-recommender',
  },
  {
    slug: 'ai-course-recommender',
    title: 'AI Course Recommender',
    domain: 'Applied AI / Recommender Systems',
    accentColor: '#eab308',
    accentHue: 48,
    status: 'Completed',
    tags: ['Python', 'Scoring Pipeline', 'Profile Weighting', 'Confidence Models'],
    track: 'AI & Models',
    nextProjectSlug: 'dira',
  },

  // Spatial & Geometry Track
  {
    slug: 'dira',
    title: 'Dira AR Pathfinder',
    domain: 'AR / Spatial AI',
    accentColor: '#6393ff',
    accentHue: 224,
    githubUrl: 'https://github.com/bentheaya/AR_Pathfinder',
    status: 'Active / MIT',
    tags: ['TypeScript', 'Gemini Agentic Vision', 'Redis State Cache', 'Spatial Geometry DB'],
    track: 'Spatial & Geometry',
    nextProjectSlug: 'diffgeo',
  },
  {
    slug: 'diffgeo',
    title: 'Differential-Geometric Metric',
    domain: 'Mathematics / Research',
    accentColor: '#c084fc',
    accentHue: 270,
    githubUrl: 'https://github.com/bentheaya/Differential-Geometric-Similarity-Metric',
    status: 'Completed',
    tags: ['Jupyter Notebook', 'Manifold Geometry', 'KL Divergence', 'Geodesic Optimization'],
    track: 'Spatial & Geometry',
    nextProjectSlug: 'musicgame',
  },
  {
    slug: 'musicgame',
    title: 'MusicPlayerGame',
    domain: 'Creative / Experimental',
    accentColor: '#a78bfa',
    accentHue: 264,
    githubUrl: 'https://github.com/bentheaya/MusicPlayerGame',
    status: 'Completed',
    tags: ['TypeScript', 'Web Audio API', 'Canvas 2D', 'Sensory Interaction'],
    track: 'Spatial & Geometry',
    nextProjectSlug: 'spiks',
  },

  // Architectures & Backends Track
  {
    slug: 'spiks',
    title: 'Spiks ride-hailing',
    domain: 'Systems / Mobility Platform',
    accentColor: '#38bdf8',
    accentHue: 190,
    status: 'Completed / Collaboration',
    tags: ['PostgreSQL', 'PostGIS', 'Redis Pub/Sub', 'M-Pesa API', 'Africa\'s Talking API'],
    track: 'Architectures & Backends',
    nextProjectSlug: 'legacy-core',
  },
  {
    slug: 'legacy-core',
    title: 'Legacy Core Suite',
    domain: 'Systems / API Architecture',
    accentColor: '#e879f9',
    accentHue: 290,
    githubUrl: 'https://github.com/Legacy-Core/API-GateWay',
    status: 'Completed',
    tags: ['Django', 'JavaScript', 'API Gateway', 'Signal Routing', 'Distributed Transactions'],
    track: 'Architectures & Backends',
    nextProjectSlug: 'miniecommerce',
  },
  {
    slug: 'miniecommerce',
    title: 'MiniEcommerce',
    domain: 'Systems / Microservices',
    accentColor: '#fb7185',
    accentHue: 340,
    githubUrl: 'https://github.com/bentheaya/miniecomerce',
    status: 'Completed',
    tags: ['Python', 'Django', 'Microservices Orchestration', 'API Gateway Protocols'],
    track: 'Architectures & Backends',
    nextProjectSlug: 'quickfood-frontend',
  },
  {
    slug: 'quickfood-frontend',
    title: 'Quickfood Frontend',
    domain: 'Frontend Engineering / Commerce UX',
    accentColor: '#ec4899',
    accentHue: 330,
    status: 'Completed',
    tags: ['TypeScript', 'Cart Orchestration', 'Mutation Queueing', 'State Sync'],
    track: 'Architectures & Backends',
    nextProjectSlug: 'the-househub',
  },
  {
    slug: 'the-househub',
    title: 'THE-HOUSEHUB',
    domain: 'PropTech / Housing Platforms',
    accentColor: '#14b8a6',
    accentHue: 170,
    status: 'Completed',
    tags: ['TypeScript', 'Listing Registry', 'Memoized Filters', 'Search Optimization'],
    track: 'Architectures & Backends',
    nextProjectSlug: 'intuilab',
  },

  // Civic Data & Archives Track
  {
    slug: 'intuilab',
    title: 'IntuiLab',
    domain: 'EdTech / Learning',
    accentColor: '#fbbf24',
    accentHue: 45,
    githubUrl: 'https://github.com/bentheaya/intuilab',
    status: 'Active',
    tags: ['TypeScript', 'Socratic AI Tutor', 'Pedagogical Matrices', 'Feynman Challenger'],
    track: 'Civic Data & Archives',
    nextProjectSlug: 'ukweli',
  },
  {
    slug: 'ukweli',
    title: 'UKWELI Civic Platform',
    domain: 'Civic Tech / Digital Literacy',
    accentColor: '#2dd4a0',
    accentHue: 164,
    githubUrl: 'https://github.com/bentheaya/UKWELI',
    status: 'Completed',
    tags: ['TypeScript', 'Content Authenticity', 'Social Verification Graph'],
    track: 'Civic Data & Archives',
    nextProjectSlug: 'nyaraka',
  },
  {
    slug: 'nyaraka',
    title: 'Nyaraka Digital Archive',
    domain: 'Heritage / Full-Stack',
    accentColor: '#94a3b8',
    accentHue: 200,
    status: 'Completed / Final Year Project',
    tags: ['TypeScript', 'OCR Pipeline', 'Document Indexing', 'Preservation Archiving'],
    track: 'Civic Data & Archives',
    nextProjectSlug: 'veld',
  },
  {
    slug: 'veld',
    title: 'Veld Data Lakehouse',
    domain: 'Data / African Cloud Infrastructure',
    accentColor: '#f59e0b',
    accentHue: 45,
    githubUrl: 'https://github.com/Veld-AI/Veld',
    status: 'Active Contribution',
    tags: ['Data Lakehouse', 'Distributed Strata', 'African Cloud Strata'],
    track: 'Civic Data & Archives',
    nextProjectSlug: 'digital-economy',
  },
  {
    slug: 'digital-economy',
    title: 'Digital Economy growth tracker',
    domain: 'Data Science / Research',
    accentColor: '#10b981',
    accentHue: 150,
    githubUrl: 'https://github.com/csaafrica/Digital-Economy-Growth-Tracker',
    status: 'Completed',
    tags: ['Jupyter Notebook', 'Composite Indicators', 'Predictive Modeling'],
    track: 'Civic Data & Archives',
    nextProjectSlug: 'collab',
  },

  // Orbiting/Other Collaborative Work
  {
    slug: 'collab',
    title: 'Collaborative Contributions',
    domain: 'Contributions',
    accentColor: '#64748b',
    accentHue: 215,
    status: 'Active',
    tags: ['NEXUS', 'learn_io', 'UTAVU', 'Organization Contribs'],
    track: 'Civic Data & Archives',
    nextProjectSlug: 'slopslayer',
  },
];

export function getProjectBySlug(slug: string): ProjectMetadata | undefined {
  return projectsMetadata.find((p) => p.slug === slug);
}

export async function getProjectContent(slug: string) {
  try {
    const data = await import(`../content/projects/${slug}.json`);
    return data.default;
  } catch (error) {
    console.error(`Error loading content for project ${slug}:`, error);
    return null;
  }
}
