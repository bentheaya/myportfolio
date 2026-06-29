import { ProjectPage } from '@/components/project/project-page'

const sampleProjectData = {
  hero: {
    backHref: '/work',
    domain: 'AI / Detection',
    title: 'Building a Real-Time Content Detection System',
    subtitle:
      'A deep dive into architecting scalable machine learning pipelines with TypeScript and Next.js',
  },
  origin: {
    pullQuote:
      'The hardest problems in system design are not technical—they are about making the right trade-offs at the right time',
    paragraphs: [
      'Every complex system starts with a simple question: "How do we scale this?" For content detection, that question became our north star. We needed a pipeline that could process millions of submissions daily, maintain sub-100ms latency, and adapt as new content patterns emerged.',
      'The challenge was not building a detector—there are plenty of those. The challenge was building one that fits seamlessly into our existing infrastructure, handles edge cases gracefully, and provides clear insights to both our product and engineering teams. This required tight collaboration between teams, deep understanding of our data, and a willingness to iterate on core assumptions.',
    ],
  },
  architecture: {
    title: '04. System Architecture',
    description:
      'How we decomposed the problem into manageable, independently scalable components.',
    codeBlocks: [
      {
        filename: 'services/detection/orchestrator.ts',
        language: 'typescript',
        code: `// Main detection orchestrator
interface DetectionRequest {
  content: string
  userId: string
  context: ContentContext
  priority: 'low' | 'normal' | 'high'
}

class DetectionOrchestrator {
  async process(req: DetectionRequest) {
    // Route to appropriate detector
    const detector = this.selectDetector(req)
    const result = await detector.analyze(req)
    
    // Log to analytics
    await this.analytics.track('detection_complete', result)
    return result
  }

  selectDetector(req: DetectionRequest) {
    // Cost-based routing
    if (req.priority === 'high') {
      return this.premiumDetector
    }
    return this.standardDetector
  }
}`,
      },
      {
        filename: 'pipelines/feature-extraction.ts',
        language: 'typescript',
        code: `// Feature extraction pipeline
export async function extractFeatures(
  content: string
): Promise<FeatureVector> {
  return Promise.all([
    extractTextFeatures(content),
    extractSemanticFeatures(content),
    extractMetadataFeatures(content),
  ]).then((results) => mergeFeatures(results))
}

// Cached vectorization
const vectorCache = new Map<string, Float32Array>()

function getVector(content: string): Float32Array {
  const cached = vectorCache.get(content)
  if (cached) return cached
  
  const vector = encodeText(content)
  vectorCache.set(content, vector)
  return vector
}`,
      },
    ],
    narrative: `The architecture separates concerns into distinct layers. The orchestrator handles routing and business logic, while individual detectors focus on their specific classification task. This separation allows us to update detection algorithms without affecting the rest of the pipeline.

Feature extraction happens in parallel—we extract text patterns, semantic meaning, and metadata simultaneously. The vectorization layer includes built-in caching to avoid redundant encoding operations.

Each component publishes events to our analytics system, providing complete visibility into the detection pipeline. This makes debugging and monitoring significantly easier.`,
  },
  hardParts: {
    title: '05. The Hard Parts',
    description:
      'Where the real complexity lives—handling edge cases and maintaining consistency at scale.',
    codeBlocks: [
      {
        filename: 'cache/consistency-layer.ts',
        language: 'typescript',
        code: `// Cache coherence across distributed system
class ConsistencyLayer {
  private cache: Map<string, CachedResult>
  private version: number = 0

  async invalidate(keys: string[]) {
    // Broadcast invalidation across replicas
    await Promise.all([
      this.cache.bulkDelete(keys),
      this.redis.del(...keys),
      this.pubsub.publish('cache:invalidate', keys),
    ])
    this.version++
  }

  async get(key: string): Promise<Result> {
    const local = this.cache.get(key)
    if (local?.version === this.version) {
      return local.data
    }
    
    // Fetch from source of truth
    const remote = await this.redis.get(key)
    if (remote) {
      this.cache.set(key, {
        data: remote,
        version: this.version,
      })
    }
    return remote
  }
}`,
      },
      {
        filename: 'monitoring/circuit-breaker.ts',
        language: 'typescript',
        code: `// Fault tolerance with graceful degradation
class CircuitBreaker {
  state: 'closed' | 'open' | 'half-open' = 'closed'
  failureCount = 0
  lastFailureTime = 0
  readonly threshold = 5
  readonly timeout = 60000 // 1 minute

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'half-open'
      } else {
        throw new CircuitBreakerOpenError()
      }
    }

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onFailure() {
    this.lastFailureTime = Date.now()
    this.failureCount++
    if (this.failureCount >= this.threshold) {
      this.state = 'open'
    }
  }

  private onSuccess() {
    this.failureCount = 0
    this.state = 'closed'
  }
}`,
      },
    ],
    narrative: `The biggest challenge was maintaining consistency across our distributed cache. When a detection result changes, we need to invalidate caches across multiple regions and ensure consistency without sacrificing performance.

Our solution uses a version-based cache coherence model. Each cache entry knows its version, and when we invalidate data, we increment the global version. Nodes check version numbers before trusting local cache, automatically falling back to the source of truth when needed.

Another major challenge was building resilience. External ML services can fail, networks can be slow, and databases can become overloaded. We implemented circuit breakers that gracefully degrade our detection capabilities rather than failing the entire request. This way, users get some form of response even during failures.`,
    reverseLayout: true,
  },
  metrics: {
    metrics: [
      {
        label: 'Queries/sec',
        value: '2.4M',
      },
      {
        label: 'P99 Latency',
        value: '87ms',
      },
      {
        label: 'Cache Hit Rate',
        value: '94.2%',
      },
      {
        label: 'Uptime',
        value: '99.98%',
      },
    ],
    nextProjectTitle: 'Real-Time Analytics Platform',
    nextProjectHref: '/projects/analytics',
    nextProjectSubtitle: 'Processing billions of events with Kafka and ClickHouse',
  },
}

export const metadata = {
  title: 'Building a Real-Time Content Detection System',
  description: 'A deep dive into architecting scalable ML pipelines with TypeScript and Next.js',
}

export default function ProjectShowcasePage() {
  return <ProjectPage data={sampleProjectData} />
}
