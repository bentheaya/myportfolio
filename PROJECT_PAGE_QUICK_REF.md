# Project Page Components - Quick Reference

## Import & Use

```typescript
import { ProjectPage } from '@/components/project/project-page'
import { HeroSection } from '@/components/project/hero-section'
import { OriginSection } from '@/components/project/origin-section'
import { InteractionShell } from '@/components/project/interaction-shell'
import { CodeSection } from '@/components/project/code-section'
import { MetricsSection } from '@/components/project/metrics-section'
```

---

## 1. Hero Section

```typescript
<HeroSection
  backHref="/work"
  domain="AI / Detection"
  title="Your Massive Title"
  subtitle="Optional subtitle"
/>
```

**Props:**
- `backHref?: string` → Link destination
- `domain: string` → Category chip (e.g., "AI / Detection")
- `title: string` → Main title (use clamp() via CSS)
- `subtitle?: string` → Optional description

**Features:** Layout brackets, back link, domain chip, animated scroll indicator

---

## 2. Origin Section

```typescript
<OriginSection
  pullQuote="The hardest problems are not technical"
  paragraphs={[
    "First paragraph text...",
    "Second paragraph text...",
  ]}
/>
```

**Props:**
- `pullQuote: string` → Large italic quote
- `paragraphs: string[]` → Array of paragraph texts

**Layout:** Asymmetric 2-col (md+): 2 cols pull quote | 3 cols paragraphs

---

## 3. Interaction Shell

```typescript
// Default canvas stub
<InteractionShell
  title="Live Interaction"
  description="Canvas container below"
/>

// Custom children
<InteractionShell title="Custom Content">
  <YourComponent />
</InteractionShell>
```

**Props:**
- `title?: string` → Section heading
- `description?: string` → Sub-header
- `children?: React.ReactNode` → Custom content (optional)

**Canvas Container ID:** `signature-canvas-stage`  
**Default Dimensions:** 300px mobile / 500px desktop

---

## 4. Code Section

```typescript
<CodeSection
  title="04. System Architecture"
  description="How we built it..."
  codeBlocks={[
    {
      filename: 'orchestrator.ts',
      language: 'typescript',
      code: 'export class X { ... }'
    },
    {
      filename: 'pipeline.ts',
      language: 'typescript',
      code: 'export async function Y() { ... }'
    }
  ]}
  narrative={`First paragraph.

Second paragraph.

Third paragraph.`}
  reverseLayout={false}
/>
```

**Props:**
- `title: string` → Section heading
- `description?: string` → Description
- `codeBlocks: CodeBlock[]` → Array of {filename, language?, code}
- `narrative?: string` → Long-form text (paragraphs separated by \n\n)
- `reverseLayout?: boolean` → Swap code/narrative order

**Layout:** 2-col (md+): code | narrative + insights

---

## 5. Metrics Section

```typescript
<MetricsSection
  metrics={[
    { label: 'Queries/sec', value: '2.4M' },
    { label: 'P99 Latency', value: '87ms' },
    { label: 'Cache Hit Rate', value: '94.2%' },
    { label: 'Uptime', value: '99.98%' }
  ]}
  nextProjectTitle="Real-Time Analytics Platform"
  nextProjectHref="/projects/analytics"
  nextProjectSubtitle="Processing billions of events"
/>
```

**Props:**
- `metrics: Metric[]` → Array of {label, value}
- `nextProjectTitle: string` → Next project title
- `nextProjectHref: string` → Next project link
- `nextProjectSubtitle?: string` → Optional subtitle

**Features:** 4-col metric grid, interactive next project card, hover effects

---

## 6. ProjectPage Compositor

```typescript
interface ProjectPageData {
  hero: {
    backHref?: string
    domain: string
    title: string
    subtitle?: string
  }
  origin: {
    pullQuote: string
    paragraphs: string[]
  }
  architecture: {
    title: string
    description: string
    codeBlocks: CodeBlock[]
    narrative: string
  }
  hardParts: {
    title: string
    description: string
    codeBlocks: CodeBlock[]
    narrative: string
    reverseLayout?: boolean
  }
  metrics: {
    metrics: Metric[]
    nextProjectTitle: string
    nextProjectHref: string
    nextProjectSubtitle?: string
  }
}

export default function ProjectShowcasePage() {
  const projectData: ProjectPageData = { /* ... */ }
  return <ProjectPage data={projectData} />
}
```

---

## Responsive Classes

### Spacing
```html
p-4 md:p-6 lg:p-8          <!-- Padding responsive -->
px-4 md:px-8               <!-- Horizontal padding -->
py-6 md:py-12 lg:py-16     <!-- Vertical padding -->
gap-6 md:gap-12 lg:gap-16  <!-- Gap between items -->
mb-6 md:mb-8 lg:mb-12      <!-- Margin bottom -->
```

### Typography
```html
text-3xl md:text-4xl lg:text-5xl          <!-- Heading size -->
text-lg md:text-xl                        <!-- Body size -->
text-xs md:text-sm                        <!-- Small text -->
text-fluid-hero                           <!-- Clamp hero title -->
text-fluid-lg                             <!-- Clamp large title -->
font-heading                              <!-- Space Grotesk -->
font-mono                                 <!-- JetBrains Mono -->
```

### Layout
```html
grid md:grid-cols-2 lg:grid-cols-3        <!-- Column grid -->
grid md:grid-cols-5                       <!-- 5-col asymmetric -->
flex flex-col md:flex-row                 <!-- Stack/row -->
w-full h-[300px] md:h-[500px]            <!-- Responsive height -->
```

### Colors
```html
bg-canvas-bg                              <!-- Background -->
bg-canvas-card                            <!-- Card background -->
bg-canvas-elevated                        <!-- Elevated surface -->
text-canvas-text                          <!-- Primary text -->
text-canvas-text-secondary                <!-- Muted text -->
text-accent-bright                        <!-- Accent color -->
border-canvas-border                      <!-- Border color -->
```

---

## Canvas Container Integration

### Get Reference
```javascript
const canvas = document.getElementById('signature-canvas-stage')
```

### Clear Placeholder
```javascript
canvas.innerHTML = ''
```

### Add Custom Element
```javascript
const myCanvas = document.createElement('canvas')
canvas.appendChild(myCanvas)
```

### Three.js Example
```javascript
import * as THREE from 'three'

const canvas = document.getElementById('signature-canvas-stage')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
canvas.appendChild(renderer.domElement)
```

### D3 Example
```javascript
import * as d3 from 'd3'

const container = document.getElementById('signature-canvas-stage')
d3.select(container)
  .append('svg')
  .attr('width', container.clientWidth)
  .attr('height', container.clientHeight)
```

---

## Live Examples

- **Example Page**: `/app/projects/[slug]/page.tsx`
- **Work Gallery**: `/app/work/page.tsx`
- **View Live**: `http://localhost:3000/projects/detection-system`

---

## Quick Tweaks

### Change Accent Color
Edit `app/globals.css`:
```css
:root {
  --accent-h: 264; /* 164=teal, 264=purple, 25=orange, etc */
}
```

### Adjust Canvas Height
Edit `interaction-shell.tsx`:
```html
<!-- Was: -->
h-[300px] md:h-[500px]

<!-- Change to: -->
h-[400px] md:h-[600px]
```

### Add New Project
1. Create `/app/projects/my-project/page.tsx`
2. Copy structure from `[slug]/page.tsx`
3. Update project data
4. Link from `/work/page.tsx`

---

## Performance Tips

- Use `next/image` for project images (not in example, but recommended)
- Leverage Server Components by default
- Keep code blocks under 30 lines for readability
- Use CSS clamp() instead of media queries when possible
- Test responsive design at: 375px (mobile), 640px (tablet), 1920px (desktop)

---

## Accessibility Checklist

- ✅ Semantic HTML: `<article>`, `<section>`, `<h1>`, etc.
- ✅ Heading hierarchy: h1 → h2 → h3
- ✅ Color contrast: WCAG AA minimum
- ✅ Focus rings: Visible on interactive elements
- ✅ Alt text: Add to project images
- ✅ Skip links: Back link at top
- ✅ Touch targets: 44×44px minimum

---

**For full documentation, see `PROJECT_PAGE_GUIDE.md`**
