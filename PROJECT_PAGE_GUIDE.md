# Project Showcase Page Components

A production-ready, fully responsive universal project showcase page system built with Next.js 16 and Tailwind CSS. The system is designed for technical portfolio sites with a focus on asymmetric layouts, code showcase, and storytelling.

## Overview

The project showcase system consists of 6 modular, reusable sections that can be combined to create compelling case study pages. Each section is semantic HTML-first, accessible, and fully responsive without external UI libraries.

### Architecture

```
components/project/
├── hero-section.tsx         # Full-viewport hero with back link, domain chip, title
├── origin-section.tsx       # Asymmetric 2-col: italic pull quote + paragraphs
├── interaction-shell.tsx    # Dashboard wrapper with canvas container stub
├── code-section.tsx         # Code blocks + narrative breakdown
├── metrics-section.tsx      # Project stats + "Next Project" navigation
└── project-page.tsx         # Main compositor component

app/
├── projects/[slug]/page.tsx # Example implementation
└── work/page.tsx            # Gallery/index page for projects
```

---

## Components Reference

### 1. HeroSection

Full-viewport hero section with visual hierarchy and navigation affordances.

**Props:**
```typescript
interface HeroSectionProps {
  backHref?: string        // Back link destination (default: '/work')
  domain: string           // Domain chip (e.g., 'AI / Detection')
  title: string            // Massive fluid title using clamp()
  subtitle?: string        // Optional subtitle below title
}
```

**Features:**
- Layout brackets (`[` and `]`) at top-left and bottom-right corners
- Back navigation link with chevron icon
- Domain/category chip with accent color and dot indicator
- Responsive fluid title using `text-fluid-hero` (clamp: 2.5rem–7rem)
- Animated scroll indicator at bottom
- Full viewport height with centered content

**Usage:**
```tsx
<HeroSection
  domain="AI / Detection"
  title="Building a Real-Time Content Detection System"
  subtitle="A deep dive into scalable ML pipelines"
/>
```

**Responsive Behavior:**
- Mobile: Brackets and icons scale down, padding adjusts
- Desktop: Full layout bracket visibility, larger typography
- Touch-friendly link tap targets (min 44×44px)

---

### 2. OriginSection

Asymmetric two-column layout showcasing a prominent pull quote opposite technical narrative.

**Props:**
```typescript
interface OriginSectionProps {
  pullQuote: string        // Large italic quote
  paragraphs: string[]     // Array of paragraph strings
}
```

**Features:**
- Left column: Large italic pull quote in accent color (4–6rem fluid size)
- Right column: 2–3 paragraphs of supporting narrative
- Asymmetric grid: 5-col layout with left=2cols, right=3cols (md+)
- Stacks vertically on mobile, maintains hierarchy
- `text-pretty` wrapping for natural line breaks

**Usage:**
```tsx
<OriginSection
  pullQuote="The hardest problems are not technical"
  paragraphs={[
    "First paragraph explaining context...",
    "Second paragraph diving deeper...",
  ]}
/>
```

**Responsive Behavior:**
- Mobile: Single column, full width
- md+: 5-column asymmetric grid (2+3)
- Quote scales with viewport using rem/clamp()

---

### 3. InteractionShell

Dashboard-like wrapper component with a clearly marked, empty canvas container ready for custom element injection.

**Props:**
```typescript
interface InteractionShellProps {
  title?: string           // Section title
  description?: string     // Sub-header description
  children?: React.ReactNode  // Optional custom children
}
```

**Features:**
- Optional title and description header
- Signature canvas container: `<div id="signature-canvas-stage">`
- Container dimensions: w-full, h-[300px] mobile / h-[500px] desktop
- Border and subtle styling applied (no complex math inside)
- Placeholder text and cursor hints
- Responsive height scaling

**Default Canvas Container:**
```tsx
<div
  id="signature-canvas-stage"
  className="relative w-full h-[300px] md:h-[500px] bg-canvas-card border border-canvas-border rounded-xl"
>
  {/* Drop your custom web elements here */}
</div>
```

**Usage - Default Stub:**
```tsx
<InteractionShell
  title="Live Interaction"
  description="Below is your canvas container..."
/>
```

**Usage - Custom Children:**
```tsx
<InteractionShell title="Custom Canvas">
  <YourCustomComponent />
</InteractionShell>
```

**JavaScript Injection Example:**
```javascript
// Access the canvas container and inject custom elements
const canvas = document.getElementById('signature-canvas-stage')
canvas.innerHTML = '' // Clear placeholder
const customElement = document.createElement('canvas')
// ... initialize Three.js, D3, or any other library
canvas.appendChild(customElement)
```

**Responsive Behavior:**
- Mobile: 300px height, full width
- Desktop: 500px height, padding and max-width constraints
- Smooth resize handling with CSS

---

### 4. CodeSection

Code block showcase with monospace file headers, optional narrative commentary, and styled key insights.

**Props:**
```typescript
interface CodeBlock {
  filename: string         // File path/name
  language?: string        // Language hint (for styling future)
  code: string            // Code content (raw string)
}

interface CodeSectionProps {
  title: string           // Section title
  description?: string    // Descriptive text
  codeBlocks: CodeBlock[] // Array of code blocks
  narrative?: string      // Long-form commentary
  reverseLayout?: boolean // Swap code/narrative order
}
```

**Features:**
- Section title and description header
- Multiple code blocks with file headers (monospace filename)
- Dark background styling (bg-canvas-card)
- Left column: Code blocks (md+)
- Right column: Narrative + key insights list
- Optional layout reversal with `reverseLayout`
- Pre-formatted code with monospace font and syntax highlighting ready
- Auto-generated key insights section

**Code Block Structure:**
```tsx
{
  filename: 'services/detection/orchestrator.ts',
  language: 'typescript',
  code: `interface DetectionRequest {
  content: string
  // ...
}`
}
```

**Usage:**
```tsx
<CodeSection
  title="System Architecture"
  description="How we decomposed the problem..."
  codeBlocks={[
    {
      filename: 'orchestrator.ts',
      code: 'export class Orchestrator { ... }'
    }
  ]}
  narrative="The architecture separates concerns..."
/>
```

**Responsive Behavior:**
- Mobile: Stacked layout (narrative below code)
- md+: Side-by-side grid (2 columns)
- Reverse layout: Swaps order for visual variety
- Code block scrolls horizontally on overflow

---

### 5. MetricsSection

Footer banner displaying project statistics and high-impact "Next Project" navigation card.

**Props:**
```typescript
interface Metric {
  label: string            // Stat label (e.g., 'Queries/sec')
  value: string           // Stat value (e.g., '2.4M')
}

interface MetricsSectionProps {
  metrics: Metric[]       // Array of stat objects
  nextProjectTitle: string   // Title of next project
  nextProjectHref: string    // Link destination
  nextProjectSubtitle?: string  // Optional subtitle
}
```

**Features:**
- 4-column metric grid (2 cols mobile, 4 desktop)
- Large accent-colored values
- Interactive "Next Project" card with:
  - Hover gradient overlay
  - Dynamic accent color border on hover
  - Chevron icon with translate animation
  - Responsive padding and sizing
- Footer note about the portfolio
- Full-width footer styling

**Usage:**
```tsx
<MetricsSection
  metrics={[
    { label: 'Queries/sec', value: '2.4M' },
    { label: 'P99 Latency', value: '87ms' },
  ]}
  nextProjectTitle="Real-Time Analytics Platform"
  nextProjectHref="/projects/analytics"
  nextProjectSubtitle="Processing billions of events"
/>
```

**Responsive Behavior:**
- Mobile: 2-column metric grid, card text-only
- Desktop: 4-column grid, large chevron icon visible
- Next Project card stacks on mobile, responsive sizing
- Touch-friendly link tap targets

---

### 6. ProjectPage (Compositor)

Main component that orchestrates all sections into a cohesive article. Accepts a data object with complete project information.

**Props:**
```typescript
interface ProjectPageData {
  hero: { /* HeroSection props */ }
  origin: { /* OriginSection props */ }
  architecture: { /* CodeSection props */ }
  hardParts: { /* CodeSection props */ }
  metrics: { /* MetricsSection props */ }
}

interface ProjectPageProps {
  data: ProjectPageData
  children?: React.ReactNode  // Optional custom sections
}
```

**Usage:**
```tsx
<ProjectPage data={projectData}>
  {/* Optional custom sections */}
</ProjectPage>
```

---

## Responsive Design Strategy

### Breakpoints
```css
/* Mobile-first approach */
/* (default - small screens) */
md: 640px+   /* Tablet and up */
lg: 1024px+  /* Desktop and up */
```

### Fluid Typography

All headers use CSS `clamp()` for smooth scaling without media queries:

```css
.text-fluid-hero {
  font-size: clamp(2.5rem, 8vw + 0.5rem, 7rem);
}
```

### Layout Transitions

- **Mobile**: Full-width, single column, stacked sections
- **md+**: Two-column asymmetric grids, enhanced spacing
- **lg+**: Wider max-widths, increased gap sizes
- **All**: Consistent padding scale (4 → 6 → 8 → responsive)

### Touch & Interaction

- All interactive elements: 44×44px minimum tap target
- Hover states on desktop only (no hover on touch devices)
- Smooth transitions (duration: 200–300ms)
- Focus ring support for keyboard navigation

---

## Semantic HTML Structure

All components use proper semantic HTML:

```html
<article>           <!-- Main project page -->
  <section>         <!-- Each major section -->
    <h2>           <!-- Section heading -->
    <p>            <!-- Paragraphs -->
    <blockquote>   <!-- Pull quotes -->
    <pre><code>    <!-- Code blocks -->
    <footer>       <!-- Metrics and footer -->
  </section>
</article>
```

### Accessibility Features

- ✅ Proper heading hierarchy (h1, h2, h3)
- ✅ Semantic HTML5 elements (`<article>`, `<section>`, `<blockquote>`, `<footer>`)
- ✅ Focus rings on interactive elements
- ✅ Color contrast: WCAG AA on all text
- ✅ Responsive design: readable at all sizes
- ✅ Skip navigation patterns with back link

---

## Design Tokens Integration

Components leverage the custom design system tokens:

```css
/* Colors */
bg-canvas-bg         /* Near-black background */
bg-canvas-card       /* Elevated surface for code */
text-canvas-text     /* Primary text */
text-canvas-text-secondary  /* Muted text */
accent-bright        /* Dynamic accent (HSL-based) */
accent-dim          /* Dimmer accent variant */
accent-faint        /* Subtle accent background */

/* Typography */
font-heading         /* Space Grotesk */
font-mono           /* JetBrains Mono */

/* Spacing */
px-4, py-6, gap-8, etc.  /* Tailwind scale */

/* Borders */
border-canvas-border     /* Subtle divider */
border-accent-bright     /* Accent borders on hover */
```

---

## Example: Complete Project Page

See `/app/projects/[slug]/page.tsx` for a fully implemented example with:
- Sample project data structure
- All 6 sections connected
- Code blocks with realistic content
- Metrics and next project navigation

Visit `http://localhost:3000/projects/detection-system` to see it live.

---

## Canvas Container Integration Guide

### Method 1: Access via JavaScript

```javascript
// In your client component or script
const canvas = document.getElementById('signature-canvas-stage')
const ctx = canvas.getContext('2d')

// Initialize your custom content
function initializeCanvas() {
  // ... your custom logic
}

initializeCanvas()
```

### Method 2: Pass Custom Children

```tsx
import { InteractionShell } from '@/components/project/interaction-shell'
import { CustomVisualization } from '@/components/custom/visualization'

export function ProjectPage() {
  return (
    <InteractionShell title="My Visualization">
      <CustomVisualization />
    </InteractionShell>
  )
}
```

### Method 3: Web Components

```jsx
<InteractionShell>
  <three-js-scene id="scene" />
</InteractionShell>
```

---

## Performance Notes

- No external UI libraries (shadcn, etc.) in project page components
- Pure Tailwind CSS for styling
- CSS clamp() for responsive typography (no JavaScript calculation)
- Semantic HTML for SEO
- Optimized font loading (Space Grotesk, JetBrains Mono)

---

## Customization

### Changing Colors

Modify the `--accent-h` CSS variable in `globals.css` to instantly update all accent colors across the project page:

```css
:root {
  --accent-h: 264; /* Change from 164 (teal) to 264 (purple) */
}
```

### Extending Sections

Create new sections by following the existing component pattern:

```tsx
// components/project/custom-section.tsx
export function CustomSection({ /* props */ }) {
  return (
    <section className="border-t border-canvas-border/20">
      {/* Your content */}
    </section>
  )
}
```

### Adding New Pages

Use the `ProjectPage` compositor with different data:

```tsx
// app/projects/my-project/page.tsx
export default function MyProject() {
  return <ProjectPage data={myProjectData} />
}
```

---

## Files

- **Components**: `/components/project/*.tsx` (5 reusable sections + compositor)
- **Example Page**: `/app/projects/[slug]/page.tsx`
- **Gallery**: `/app/work/page.tsx`
- **Styles**: `/app/globals.css` (includes `text-fluid-*` utilities)

---

## Quick Start

1. **View the demo**: `http://localhost:3000/projects/detection-system`
2. **Edit data**: Modify `app/projects/[slug]/page.tsx` sample data
3. **Create new project**: Copy the structure to a new route
4. **Customize canvas**: Update `InteractionShell` with your interactive content
5. **Deploy**: Built with Next.js 16 and Vercel-ready

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

All components tested and verified on desktop, tablet, and mobile viewports.
