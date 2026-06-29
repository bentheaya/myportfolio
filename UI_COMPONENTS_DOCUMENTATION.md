# UI Components Library

Complete reference for all 9 reusable UI components, section builders, and project hero variants.

## Core UI Components (9)

### 1. DomainBadge
**File:** `components/ui/domain-badge.tsx`

Pill-style tag component for project domain/category display.

```tsx
<DomainBadge 
  label="AI / Detection" 
  subtitle="Real-time"
  accentHue={0}
/>
```

**Props:**
- `label` (string): Main label text
- `subtitle` (string, optional): Secondary label with separator
- `accentHue` (number, optional): Custom accent hue (0-360)
- `className` (string, optional): Extra CSS classes

**Features:**
- Dynamic accent color with pulsing dot
- Compact pill format
- Responsive padding

---

### 2. StackPill
**File:** `components/ui/stack-pill.tsx`

Technology/skill tag with optional hover tooltip.

```tsx
<StackPill 
  name="React" 
  tooltip="UI Library"
  variant="accent"
/>
```

**Props:**
- `name` (string): Skill/tech name
- `tooltip` (string, optional): Hover tooltip text
- `variant` ('default' | 'accent' | 'subtle'): Visual style
- `className` (string, optional): Extra CSS classes

**Variants:**
- `default`: Canvas card style
- `accent`: Accent color highlight
- `subtle`: Muted background

---

### 3. ProjectCard
**File:** `components/ui/project-card.tsx`

Large interactive project card with magnetic hover and glow effects.

```tsx
<ProjectCard
  title="AI Detection System"
  description="Real-time content analysis"
  domain="AI / Detection"
  href="/projects/detection"
  accentHue={0}
  image="/project-image.jpg"
/>
```

**Props:**
- `title` (string): Project title
- `description` (string): Short description
- `domain` (string): Domain/category
- `href` (string): Project link
- `image` (string, optional): Background image URL
- `accentHue` (number, optional): Custom accent hue
- `className` (string, optional): Extra CSS classes

**Features:**
- Magnetic hover scale effect
- Dynamic accent glow
- Domain badge integration
- Image gradient overlay
- Arrow indicator on hover

---

### 4. PullQuote
**File:** `components/ui/pull-quote.tsx`

Large italic quote for asymmetric layouts.

```tsx
<PullQuote
  text="Technology should amplify human judgment."
  author="—Design Philosophy"
  accentHue={164}
/>
```

**Props:**
- `text` (string): Quote text
- `author` (string, optional): Author attribution
- `accentHue` (number, optional): Custom accent hue
- `className` (string, optional): Extra CSS classes

**Features:**
- Large, readable italic typography
- Quote mark indicator
- Accent bar on left
- Semantic `<blockquote>` element

---

### 5. TextReveal
**File:** `components/ui/text-reveal.tsx`

Character-by-character stagger animation component.

```tsx
<TextReveal
  text="Reveal this text"
  staggerMs={50}
  delay={0}
  className="text-3xl font-bold"
/>
```

**Props:**
- `text` (string): Text to animate
- `as` ('h1'|'h2'|'h3'|'h4'|'p'|'span'): HTML element type
- `staggerMs` (number): Milliseconds between character reveals (default: 30)
- `delay` (number): Initial delay before animation starts (default: 0)
- `className` (string, optional): Extra CSS classes

**Features:**
- Intersection Observer (animates when in view)
- Smooth reveal with stagger
- Fully customizable timing
- No external animation library needed

---

### 6. MetricsBanner
**File:** `components/ui/metrics-banner.tsx`

Horizontal or grid stats display component.

```tsx
<MetricsBanner
  layout="grid"
  metrics={[
    { label: 'Accuracy', value: 98.7, unit: '%' },
    { label: 'Latency', value: 45, unit: 'ms' }
  ]}
/>
```

**Props:**
- `metrics` (MetricItem[]): Array of metric objects
- `layout` ('horizontal' | 'grid'): Layout mode (default: 'horizontal')
- `className` (string, optional): Extra CSS classes

**MetricItem:**
- `label` (string): Metric label
- `value` (string | number): Metric value
- `unit` (string, optional): Unit (e.g., '%', 'ms')
- `accentHue` (number, optional): Custom accent hue per metric

---

### 7. NextProjectTeaser
**File:** `components/ui/next-project-teaser.tsx`

Large interactive card for bottom-of-page project navigation.

```tsx
<NextProjectTeaser
  title="Next: Spatial UI System"
  description="Building AR experiences"
  domain="AR / Spatial"
  href="/projects/spatial"
  accentHue={180}
/>
```

**Props:**
- `title` (string): Next project title
- `description` (string): Project description
- `domain` (string): Domain/category
- `href` (string): Project link
- `accentHue` (number, optional): Custom accent hue
- `className` (string, optional): Extra CSS classes

**Features:**
- Full-width card with gradient
- Grid background pattern
- Arrow and direction indicators
- Smooth scale and glow on hover
- "Next Project" eyebrow label

---

### 8. HueControl
**File:** `components/ui/hue-control.tsx`

Interactive circular hue picker (desktop-only).

```tsx
<HueControl 
  initialHue={164}
  onChange={(hue) => console.log(hue)}
/>
```

**Props:**
- `initialHue` (number): Starting hue value (default: 164)
- `onChange` ((hue: number) => void, optional): Callback on hue change
- `className` (string, optional): Extra CSS classes

**Features:**
- Draggable hue ring with conic-gradient
- Real-time CSS variable update (`--accent-h`)
- Positioned bottom-right (desktop only)
- Visual indicator with current hue value
- Smooth pointer interactions

---

### 9. CodeBlock
**File:** `components/ui/code-block.tsx`

Syntax-highlight ready code display.

```tsx
<CodeBlock
  filename="detection.ts"
  language="typescript"
  code={`export async function detect(input) {\n  return analyzer.scan(input);\n}`}
  highlightLines={[1]}
/>
```

**Props:**
- `code` (string): Code content
- `filename` (string, optional): Display filename
- `language` (string): Language identifier (default: 'javascript')
- `highlightLines` (number[], optional): Line numbers to highlight
- `className` (string, optional): Extra CSS classes

**Features:**
- Line numbers with monospace formatting
- Filename header with language indicator
- Customizable line highlighting
- Horizontal scroll for long lines
- Perfect for technical content

---

## Section Components

### HomeHero
**File:** `components/sections/home-hero.tsx`

Full-viewport hero section with name, tagline, and status.

```tsx
<HomeHero
  name="Alex Chen"
  tagline="Creative technologist"
  location="San Francisco"
  status="Available for Projects"
/>
```

### AboutSection
**File:** `components/sections/about-section.tsx`

Asymmetric about section with highlights.

```tsx
<AboutSection
  title="About"
  paragraphs={["Bio paragraph 1", "Bio paragraph 2"]}
  highlights={["React", "Three.js", "TypeScript"]}
/>
```

### FeaturedProjectsSection
**File:** `components/sections/featured-projects-section.tsx`

2-column grid of featured project cards.

```tsx
<FeaturedProjectsSection
  title="Featured Work"
  projects={projectsData}
  showViewAll
  viewAllHref="/work"
/>
```

### ContactSection
**File:** `components/sections/contact-section.tsx`

Footer contact section with email and social links.

```tsx
<ContactSection
  title="Let's connect"
  email="hello@example.com"
  links={contactLinks}
/>
```

---

## Project Hero Variants

### ProjectHeroBase
**File:** `components/project-heroes/project-hero-base.tsx`

Base hero section for all projects. Includes back link, domain badge, fluid title, corner brackets, scroll cue.

```tsx
<ProjectHeroBase
  title="AI Detection System"
  domain="AI / Detection"
  subtitle="Real-time analysis"
  accentHue={164}
>
  {/* Optional custom content */}
</ProjectHeroBase>
```

---

### SurveillanceHero
**File:** `components/project-heroes/surveillance-hero.tsx`

Tech surveillance aesthetic with scan lines and red accents.

```tsx
<SurveillanceHero
  title="AI Detection System"
  domain="AI / Detection"
  accentHue={0} // Red
/>
```

**Visual Features:**
- Animated scan lines (CSS keyframes)
- Grid overlay pattern
- Corner markers
- High-tech aesthetic
- Ready for overlay animations

---

### ARSpatialHero
**File:** `components/project-heroes/ar-spatial-hero.tsx`

AR/spatial aesthetic with 3D perspective and pin placeholders.

```tsx
<ARSpatialHero
  title="Spatial UI System"
  domain="AR / Spatial"
  accentHue={180} // Cyan
/>
```

**Visual Features:**
- CSS 3D perspective transform
- 3x3 grid of perspective cards
- Interactive pin markers
- Hover effects on cells
- Spatial positioning aesthetic

---

### ParticleHero
**File:** `components/project-heroes/particle-hero.tsx`

Educational/particle aesthetic with canvas container.

```tsx
<ParticleHero
  title="Learning Platform"
  domain="Education / Interactive"
  accentHue={270} // Purple
/>
```

**Visual Features:**
- 8x6 particle grid
- Pulsing animation (CSS)
- SVG connection lines
- Canvas-ready for custom animation
- Educational aesthetic

---

### MathematicalHero
**File:** `components/project-heroes/mathematical-hero.tsx`

Mathematical/3D aesthetic with geometric shapes.

```tsx
<MathematicalHero
  title="3D Rendering Engine"
  domain="3D / Mathematics"
  accentHue={45} // Orange
/>
```

**Visual Features:**
- Rotating wireframe cube (CSS 3D)
- Formula placeholder
- Axis labels
- Scientific aesthetic
- Ready for Three.js mesh integration

---

## Global Utilities

### Fluid Typography (globals.css)
```css
.text-fluid-hero    /* Massive hero text with clamp() */
.text-fluid-lg      /* Large section titles */
.text-fluid-md      /* Medium headings */
.text-fluid-sm      /* Small text blocks */
```

### Glassmorphism
```css
.glass-light        /* Light frosted glass effect */
.glass-hard         /* Darker, more opaque glass */
.glass-accent       /* Glass with accent color */
```

### Dynamic Accent Utilities
```css
.text-accent            /* Text color */
.bg-accent              /* Background color */
.border-accent          /* Border color */
.text-accent-dim        /* Dimmed accent text */
.bg-accent-dim          /* Dimmed accent background */
.bg-accent-faint        /* Very faint accent background */
```

### Interactive Effects
```css
.magnetic               /* Hover scale effect */
.glow-accent           /* Soft accent glow */
.glow-accent-lg        /* Large accent glow */
.pulse-accent          /* Pulsing animation */
.underline-accent      /* Animated underline on hover */
```

### Responsive Spacing
```css
.gap-fluid             /* Responsive gap (1-2rem) */
.px-fluid              /* Responsive horizontal padding */
.py-fluid              /* Responsive vertical padding */
```

---

## Integration Examples

### Using Canvas Container
```tsx
// In your project page
<div id="signature-canvas-stage" className="relative w-full h-[500px]">
  {/* Mount Three.js, D3, Canvas API, or Web Components here */}
</div>

// In a useEffect or mounted script
const canvas = document.getElementById('signature-canvas-stage');
const scene = new THREE.Scene(); // Example: Three.js
```

### Custom Accent Hue per Project
```tsx
// Each project can have its own accent color
const project1 = { accentHue: 0 };    // Red
const project2 = { accentHue: 164 };  // Teal
const project3 = { accentHue: 270 };  // Purple

// Use HueControl to change globally
<HueControl initialHue={164} />
```

### Combining Components
```tsx
export default function ProjectPage() {
  return (
    <main>
      <SurveillanceHero
        title="Detection System"
        domain="AI / Detection"
        accentHue={0}
      />
      <section>
        <PullQuote text="AI at scale requires care" />
        <StackPill name="TensorFlow" variant="accent" />
      </section>
      <CodeBlock filename="model.py" code={...} />
      <MetricsBanner metrics={[...]} />
      <NextProjectTeaser href="/projects/next" />
    </main>
  );
}
```

---

## Responsive Behavior

All components use:
- **Mobile-first design** with `md:` and `lg:` breakpoints
- **Fluid typography** with `clamp()` for smooth scaling
- **Flexible spacing** with responsive gap/padding utilities
- **Touch-friendly** 44×44px minimum tap targets
- **Semantic HTML** for accessibility

---

## Performance Notes

- **Zero external UI libraries** (pure Tailwind CSS)
- **Optimized animations** using CSS keyframes
- **Lazy-loaded components** via Next.js code splitting
- **Minimal JavaScript** (only TextReveal and HueControl use JS)
- **Canvas stub** ready for your custom optimization

---

## Browser Support

✓ Chrome/Edge 90+  
✓ Firefox 88+  
✓ Safari 14+  
✓ iOS Safari 14+  
✓ Chrome Android 90+  

---

## Next Steps

1. **Customize colors** by adjusting `--accent-h` in `globals.css`
2. **Add content** to ProjectHeroBase child slots
3. **Mount visualizations** in `#signature-canvas-stage`
4. **Update TypeScript types** as needed
5. **Deploy** to Vercel for instant production

All components are production-ready and fully typed with TypeScript.
