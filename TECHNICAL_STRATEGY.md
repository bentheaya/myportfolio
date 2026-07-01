# Benaih Shaback Galavu — Technical Implementation Strategy

> **Document purpose:** This is the master engineering reference that picks up exactly where v0 left off. Read this before writing a single line of complex code.

---

## 1. What v0 Delivered — Honest Assessment

### ✅ What exists and is usable

| Asset | Location | Quality | Notes |
|---|---|---|---|
| Design token CSS | `app/globals.css` | ✅ Solid | HSL accent system, canvas colors, typography vars, fluid text, glassmorphism utils — all aligned with master plan |
| Root layout | `app/layout.tsx` | ⚠️ Skeleton | Fonts correct (Space Grotesk + JetBrains Mono), but metadata says "v0 App", no Lenis, no cursor, no page transition wrapper |
| Home page | `app/page.tsx` | ⚠️ Placeholder | Has the right sections assembled, but data is generic/placeholder (wrong name, wrong projects, wrong links) |
| `HomeHero` | `components/sections/home-hero.tsx` | ⚠️ Partial | Good layout shell, but no 3D scene, no character animation, centered layout not left-aligned as specced |
| `HueControl` | `components/ui/hue-control.tsx` | ✅ Solid | Canvas-drawn color wheel, localStorage not wired yet but the drag logic is correct |
| `ProjectPage` + sections | `components/project/` | ✅ Good shell | `HeroSection`, `OriginSection`, `InteractionShell`, `CodeSection`, `MetricsSection` all present |
| Project hero variants | `components/project-heroes/` | ✅ Good | `SurveillanceHero`, `ARSpatialHero`, `MathematicalHero`, `ParticleHero`, `ProjectHeroBase` — CSS-only starters |
| Layout chrome | `components/layout/` | ⚠️ Basic | `header.tsx`, `mobile-nav.tsx`, `shell.tsx` exist but are generic |
| UI primitives | `components/ui/` | ✅ Good | `ProjectCard`, `DomainBadge`, `StackPill`, `TextReveal`, `PullQuote`, `NextProjectTeaser`, `MetricsBanner`, `CodeBlock` |

### ❌ What does NOT exist (our entire workload)

- Custom cursor system (zero implementation)
- Lenis smooth scroll (zero implementation)
- GSAP + ScrollTrigger integration (zero)
- Page transition system (zero)
- R3F Hero scene (3D node graph) (zero)
- Any project page with real data (all placeholder)
- `/about` page (missing)
- `/contact` page (missing)
- All 15 signature interactions (zero)
- Hue control wired to localStorage (missing)
- `lib/projects.ts` central data file (missing — only `lib/utils.ts`)
- SEO metadata (placeholder)
- Netlify deployment config (missing)

### ⚠️ Critical routing discrepancy

The master plan specifies `/work/[slug]`. v0 created `/projects/[slug]` AND a separate `/work/page.tsx`. **We must migrate to the master plan's routing before going further.**

---

## 2. Architecture Decisions

### 2.1 Target Folder Structure

```
/app
  layout.tsx                ← UPDATE: add Lenis, cursor, hue, transition wrapper
  page.tsx                  ← UPDATE: real data, real layout
  /work
    page.tsx                ← Work index (filterable grid)
    /[slug]
      page.tsx              ← Dynamic project page
  /about
    page.tsx                ← NEW
  /contact
    page.tsx                ← NEW

/components
  /cursor
    CustomCursor.tsx        ← NEW (pure JS, RAF-based)
  /transitions
    PageTransition.tsx      ← NEW (GSAP wipe)
    TransitionLink.tsx      ← NEW (wrapper for next/link)
    TransitionContext.tsx   ← NEW (React context)
  /three
    HeroScene.tsx           ← NEW (R3F node graph, ssr:false)
    ManifoldScene.tsx       ← NEW (DiffGeo Three.js, ssr:false)
    ConstellationScene.tsx  ← NEW (interactive work graph, ssr:false)
  /animations
    TextReveal.tsx          ← EXISTS (upgrade with GSAP char split)
    MagneticWrapper.tsx     ← NEW (GSAP magnetic effect)
    ScrollReveal.tsx        ← NEW (GSAP ScrollTrigger wrapper)
  /layout
    header.tsx              ← UPDATE (real nav, accent indicator)
    mobile-nav.tsx          ← UPDATE (bottom tab bar)
    shell.tsx               ← UPDATE (include cursor + transition)
    LenisProvider.tsx       ← NEW
  /sections
    home-hero.tsx           ← UPDATE (real name, 3D slot, char animation)
    about-section.tsx       ← UPDATE (real copy)
    featured-projects-section.tsx  ← UPDATE (real 4 projects)
    contact-section.tsx     ← UPDATE (real links)
  /project
    hero-section.tsx        ← UPDATE (domain accent override)
    origin-section.tsx      ← UPDATE (real layout)
    interaction-shell.tsx   ← UPDATE (passive demo loop timer)
    code-section.tsx        ← KEEP
    metrics-section.tsx     ← UPDATE (thematic next-project routing)
    project-page.tsx        ← KEEP + extend
  /project-heroes
    surveillance-hero.tsx   ← UPDATE (scanline, grid, corner brackets)
    ar-spatial-hero.tsx     ← UPDATE (CSS 3D grid, pin drop)
    mathematical-hero.tsx   ← UPDATE (Three.js mesh)
    particle-hero.tsx       ← UPDATE (canvas orbital physics)
    project-hero-base.tsx   ← KEEP
    civic-hero.tsx          ← NEW (UKWELI)
    systems-hero.tsx        ← NEW (Spiks campus map SVG)
    nlp-hero.tsx            ← NEW (word storm canvas)
    microservice-hero.tsx   ← NEW (D3 force graph)
    heritage-hero.tsx       ← NEW (paper aesthetic)
    data-hero.tsx           ← NEW (African landscape SVG)
    choropleth-hero.tsx     ← NEW (D3 map)
    routing-hero.tsx        ← NEW (signal routing)
    game-hero.tsx           ← NEW (playable snake game)
    collab-hero.tsx         ← NEW (force org graph)
  /ui
    (existing components)   ← KEEP + fix data
    HueControl.tsx          ← UPDATE (wire localStorage)
  /hue
    HueProvider.tsx         ← NEW (React context for hue state)

/content
  /projects                 ← NEW (contains long-form copy JSON or markdown view models)

/lib
  projects.ts               ← NEW (lightweight structural definitions, slugs, tags, colors, summary links)
  lenis.ts                  ← NEW (Lenis singleton + ScrollTrigger proxy)
  cursor.ts                 ← NEW (cursor state management)
  animations.ts             ← NEW (shared GSAP utility functions)
  utils.ts                  ← EXISTS (keep)
```

### 2.2 State & Copy Management

| Layer | Solution | Why |
|---|---|---|
| Project Metadata | Static TypeScript config (`lib/projects.ts`) | Keep it lightweight. Contains structural properties, slugs, colors, and links. No large strings. |
| Project Copy | On-demand dynamic imports (`/content/projects/*.json` or `.md`) | Houses the long-form narrative copy. Lazy-loaded on client shell components to avoid bloating main bundle. |
| Hue value | React Context (`HueProvider`) + localStorage | Simple, no library overhead |
| Cursor position | `useRef` + `requestAnimationFrame` | No re-renders on mousemove — performance critical |
| Page transition | GSAP timeline + context | Orchestrates overlay animation |
| Lenis instance | Module-level singleton (`lib/lenis.ts`) | Single instance across all components |
| 3D scene state | R3F internal state | Scoped to R3F canvas |

### 2.3 Technology Additions Required

```bash
# Core animation / scroll
pnpm add gsap @gsap/react lenis

# 3D / WebGL
pnpm add three @react-three/fiber @react-three/drei

# Component transitions
pnpm add framer-motion

# Data visualization (specific project pages)
pnpm add d3

# Type definitions
pnpm add -D @types/three @types/d3
```

> **⚠️ GSAP Note:** Free GSAP from npm includes ScrollTrigger. `@gsap/react` provides `useGSAP` hook for safe React integration. No paid plugins needed.

### 2.4 Next.js Version Note

The project uses **Next.js 16.2.6** with **React 19**. Keep all animation code in `'use client'` components to avoid hydration issues.

### 2.5 Curated Project Tracks & System Integration Guidelines

#### A. Curated Project Tracks & Thematic Bridges
Rather than chronological order, project navigation leverages thematic next-project routing (the "Thematic Bridge") structured across four distinct conceptual tracks:

| Track | Origin Node (`/work/...`) | Intermediate Node (`/work/...`) | Sequel Node (`/work/...`) |
|---|---|---|---|
| **AI & Models** | `slopslayer` | `opinionminer` | `nutrilogic` |
| **Spatial & Geometry** | `dira` | `diffgeo` | `musicgame` |
| **Architectures & Backends** | `spiks` | `legacy-core` | `miniecommerce` |
| **Civic Data & Archives** | `ukweli` | `nyaraka` | `veld` → `digital-economy` |

#### B. Dynamic HSL-Tintable Layout Design
- **Guideline:** Build all section diagrams and layout schemas using styled **inline SVG fragments** or modular Tailwind structures instead of raw static images (`.png`, `.svg` file references).
- **Why:** Inline markup allows the CSS variable `--accent-h` to propagate directly into the XML structure, dynamically driving colors, borders, and glows (`stroke="hsl(var(--accent-h) ...)"`) as the user rotates the hue control wheel.

#### C. DiffGeo Geodesic Mathematical Formulation
- **Guideline:** Verify that the numerical canvas manifold calculations track true intrinsic curves on curved surfaces rather than arbitrary bezier approximations.
- **Formulation:** Implement the classic vanishing acceleration profile governed by the Christoffel symbols of the second kind:
  $$\frac{d^2 x^\mu}{d\tau^2} + \Gamma^\mu_{\nu\lambda} \frac{dx^\nu}{d\tau} \frac{dx^\lambda}{d\tau} = 0$$
- **UI Presentation:** Render this formula clearly inside the mathematical view block (Section 03) as a stylized vector component overlay.

#### D. MusicPlayerGame Performance Isolation
- **Guideline:** Separate the game loop from the main Next.js page state lifecycle.
- **Mechanism:** Embed the game inside an **isolated, canvas-driven component block** or run it via a **sandboxed iframe module**.
- **Why:** Prevents high-frequency keyboard/mouse inputs from bottlenecking the global GSAP timelines, custom cursor ticks, or page transitions.

#### E. Nyaraka Repository Privacy Protocol
- **Guideline:** Frame the Maseno University digital archive project purely as an architectural case study.
- **Execution:** Rely on detailed interface mocks, workflow diagrams, and database schemas. Do not expose any raw codebase files, configs, or proprietary institutional setups.

---

## 3. Complex Systems Breakdown

### 3.1 Custom Cursor System

**Risk Level: Medium**

```tsx
// components/cursor/CustomCursor.tsx
'use client';
import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on desktop (pointer: fine)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.style.cursor = 'none';

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    let rafId: number;
    const tick = () => {
      dotRef.current!.style.transform =
        `translate(${pos.current.x}px, ${pos.current.y}px)`;

      // Ring: lerp (~80ms lag)
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      ringRef.current!.style.transform =
        `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', move, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, []);
}
```

**Cursor states:** Managed via `data-cursor-state` attribute on interactive elements. CSS selectors handle appearance changes.

**Pitfalls:**
- `cursor: none` must be applied globally in CSS (not just body — some elements override it)
- Mobile: detect `pointer: coarse` and bail out completely
- Per-page cursor swap: `document.documentElement.dataset.cursor = 'crosshair'` + CSS selectors

---

### 3.2 Lenis + GSAP ScrollTrigger Integration

**Risk Level: High — If misconfigured, scroll-driven animations will be completely out of sync.**

```ts
// lib/lenis.ts
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: 0.075,         // Master plan spec
    smoothWheel: true,
    syncTouch: false,    // Native scroll on touch
  });

  // CRITICAL: Proxy Lenis scroll events to ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Use GSAP ticker as Lenis RAF (prevents double RAF)
  gsap.ticker.add((time) => {
    lenisInstance!.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}
```

**Pitfalls:**
- NEVER call `new Lenis()` more than once — module singleton prevents this
- During page transitions: `lenis.stop()` before, `lenis.start()` after
- `prefers-reduced-motion`: set `lerp: 1` (native) when true

---

### 3.3 GSAP Page Transition System

**Risk Level: High — Interacts with Next.js App Router navigation.**

**Sequence (600ms total):**
1. `t=0ms`: Colored overlay `scaleX: 0 → 1` (300ms, `power2.in`), origin = cursor X
2. `t=250ms`: `router.push(href)` (new page loads behind overlay)
3. `t=300ms`: Overlay `scaleX: 1 → 0` from right (300ms, `power2.out`)
4. `t=600ms`: New page content fades/slides up

**Strategy:** Intercept `<a>` clicks via `TransitionLink` component that calls `startTransition(href, color, cursorX)` from context instead of navigating directly.

**Pitfalls:**
- App Router pre-fetches aggressively — page will often be in cache already (timing works)
- Mobile: bypass wipe entirely, use `opacity: 0 → 1` (200ms)
- Overlay z-index must be above cursor (z-50+)

---

### 3.4 React Three Fiber Hero Scene

**Risk Level: High — Performance-sensitive, SSR-unsafe.**

```tsx
// ALWAYS use dynamic import for R3F
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-canvas-bg" />,
});
```

**Node graph setup:**
- 15 nodes (one per key project), pre-computed 3D positions
- `THREE.SphereGeometry` with `THREE.AdditiveBlending` for glow
- `THREE.Line` for edges
- Ambient camera drift via `useFrame` (no OrbitControls in hero)
- Mouse parallax: pass mouse coords via `useRef` from parent HTML into scene

**Fake bloom (no post-processing pass — too expensive):**
- Large transparent sphere behind each node (same color, opacity 0.15)

**Scroll-driven pullback (hero → constellation at ~300vh):**
```tsx
gsap.to(camera.position, {
  z: 15,
  scrollTrigger: {
    trigger: '#constellation-section',
    start: 'top bottom',
    end: 'center center',
    scrub: 1,
  }
});
```

**Pitfalls:**
- `Html` from drei (node labels) are DOM elements, not 3D — use `occlude` prop
- Dispose geometries on unmount to prevent memory leaks
- Mobile: skip R3F entirely, use CSS-only fallback background

---

### 3.5 Signature Interactions — Risk Register

| Interaction | Complexity | Risk | Mitigation |
|---|---|---|---|
| SlopSlayer split-screen divider | Medium | Low | Pure CSS/JS mouse tracking |
| Dira AR overlay assembly | Medium | Low | CSS animation + scroll trigger |
| IntuiLab lesson simulation | Medium | Low | Scroll-triggered content reveal |
| NutriLogic logic/neural merge | Medium | Medium | GSAP timeline |
| DiffGeo geodesic drawer | High | **High** | Three.js + draggable points + real math |
| Spiks campus SVG map | High | Medium | Custom SVG + GSAP path animation |
| UKWELI verification beam | Medium | Low | CSS viewport-width line + mouse Y |
| OpinionMiner live input | Low | Low | Pre-built response map (no API) |
| MiniEcommerce chaos button | Medium | Low | D3 force graph + GSAP |
| Digital Economy choropleth | High | Medium | D3 + year slider |
| Veld continental zoom | High | Medium | SVG + scroll-driven zoom |
| Collab force graph | Medium | Low | D3 force-directed |
| Nyaraka horizontal timeline | Medium | Low | CSS scroll snap |
| MusicPlayerGame embedded | High | **High** | Canvas game + Web Audio API |
| Legacy Core routing demo | Low | Low | CSS animation |

**Passive Loop Mode (applies to ALL interactions):**

If user doesn't interact within 5 seconds of section entering viewport → trigger autonomous demo loop.

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      const timer = setTimeout(triggerAutoDemo, 5000);
      return () => clearTimeout(timer);
    }
  });
  observer.observe(sectionRef.current!);
}, []);
```

---

### 3.6 Text Animation System

```ts
// lib/animations.ts
export function splitTextToChars(el: HTMLElement) {
  const text = el.textContent || '';
  el.innerHTML = '';

  return [...text].map((char, i) => {
    const outer = document.createElement('span');
    outer.style.cssText = 'display:inline-block;overflow:hidden';

    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.textContent = char === ' ' ? '\u00A0' : char;

    // Micro-random Y offset (persistent after animation)
    if (i % 3 === 0) {
      inner.style.marginTop = `${(Math.random() * 4) - 2}px`;
    }

    outer.appendChild(inner);
    el.appendChild(outer);
    return inner;
  });
}

export function animateTextIn(el: HTMLElement, delay = 0) {
  const chars = splitTextToChars(el);
  gsap.from(chars, {
    y: '100%',
    rotation: 8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.025,
    ease: 'power3.out',
    delay,
  });
}
```

---

### 3.7 Hue Control — Missing Pieces

The existing `HueControl.tsx` needs:
1. **localStorage read on mount** — restore persisted hue
2. **localStorage write on change** — persist each drag
3. **Custom event dispatch** — so footer "state token" (`// system.hue: 164°`) can update live

```tsx
// On mount:
const saved = localStorage.getItem('portfolio-accent-hue');
if (saved) {
  currentHueRef.current = Number(saved);
  document.documentElement.style.setProperty('--accent-h', saved);
}

// On drag:
localStorage.setItem('portfolio-accent-hue', hue.toString());
window.dispatchEvent(new CustomEvent('huechange', { detail: hue }));
```

---

## 4. Phased Execution Plan

### Phase 0 — Foundation Repair ⚡
**Goal:** Correct codebase before building on it.
**Effort:** ~1 day

1. Fix `layout.tsx` metadata (real name, real SEO)
2. Migrate routing: delete `/app/projects/`, confirm `/work/[slug]` is canonical
3. Install all required packages (gsap, lenis, three, r3f, framer-motion, d3)
4. Create `lib/projects.ts` with all 15 project entries
5. Wire `HueControl` to localStorage + dispatch custom events
6. Add `HueProvider` context
7. Fix `app/page.tsx` with real data (name: "Benaih Shaback.", tagline, real links)
8. Update `ContactSection` (github.com/bentheaya, bentheaya@gmail.com)

---

### Phase 1 — Core Systems 🏗️
**Goal:** Cursor, scroll, transitions working site-wide.
**Effort:** ~2–3 days

1. `CustomCursor.tsx` — dot + ring, lerp, hover states, click state, per-page swap
2. `LenisProvider.tsx` — Lenis singleton, GSAP proxy, cleanup on unmount
3. `PageTransition.tsx` + `TransitionLink.tsx` + `TransitionContext.tsx` — GSAP wipe overlay
4. Update `shell.tsx` — include cursor + transition wrapper
5. `TextReveal.tsx` upgrade — GSAP char split + ScrollTrigger trigger
6. `MagneticWrapper.tsx` — GSAP magnetic hover for cards + CTAs
7. Update `header.tsx` — real nav, accent indicator, back button
8. Update `mobile-nav.tsx` — bottom tab bar (Home / Work / About / Contact)
9. Global `prefers-reduced-motion` guard

**Definition of Done:** Cursor lerps, scroll has weight, page transition wipes work end-to-end.

---

### Phase 2 — Home Page 🏠
**Goal:** Complete, cinematic home page.
**Effort:** ~3–4 days

1. `HeroScene.tsx` (R3F) — node graph, ambient drift, mouse parallax, node glow, labels, click routing
2. `HomeHero` update — left-aligned, real name "Benaih / Shaback.", pulsing status, char animation, scroll cue
3. `AboutSection` update — real copy
4. `FeaturedProjectsSection` update — SlopSlayer, Dira, IntuiLab, UKWELI + `TransitionLink`
5. `ConstellationSection` (new) — browseable 3D graph, filter pills, scroll-driven camera pullback
6. `ContactSection` update — real data
7. Full responsive pass

**Definition of Done:** Home page cinematic top to bottom. Node graph 60fps. Mobile degrades gracefully.

---

### Phase 3 — Project Template + 3 Flagship Pages 📄
**Goal:** Universal template production-ready. SlopSlayer, IntuiLab, UKWELI complete.
**Effort:** ~4–5 days

1. Update `ProjectPage` with all 6 sections (World/Origin/Intriguing/Architecture/HardPart/Outcome)
2. `HeroSection` — domain accent CSS var override on mount, back link, GitHub link
3. `OriginSection` — pull quote left, prose right, two-column
4. `InteractionShell` — passive loop mode (5s auto-demo via IntersectionObserver)
5. `MetricsSection` — thematic next-project routing, darkened preview teaser
6. `/work/page.tsx` — filterable grid, all 15 projects, domain filter pills
7. SlopSlayer page — surveillance hero, split-screen divider, crosshair cursor, pipeline diagram
8. IntuiLab page — particle canvas hero, gravity-well cursor, 3-act lesson simulation
9. UKWELI page — verification beam cursor, fact-check journey animation

**Definition of Done:** Three project pages complete, all 6 sections, interactions working + passive demo loop.

---

### Phase 4 — Remaining Project Pages ⚙️
**Goal:** All 15 project pages live.
**Effort:** ~7–10 days

| Page | Key Challenge |
|---|---|
| Dira `/work/dira` | AR overlay split, pin-drop cursor |
| DiffGeo `/work/diffgeo` | Three.js manifold, geodesic drawer + math |
| NutriLogic `/work/nutrilogic` | Voronoi SVG, logic/neural merge GSAP |
| Spiks `/work/spiks` | Campus SVG map, GSAP route animation |
| OpinionMiner `/work/opinionminer` | Word storm canvas, sentiment input |
| MiniEcommerce `/work/miniecommerce` | D3 force graph, chaos button |
| Nyaraka `/work/nyaraka` | Light bg (breaks dark theme), horizontal timeline |
| Veld `/work/veld` | African SVG landscape, scroll zoom |
| Digital Economy `/work/digital-economy` | D3 choropleth, year slider |
| Legacy Core `/work/legacy-core` | Signal routing hero, routing demo |
| MusicPlayerGame `/work/musicgame` | Embedded canvas game + Web Audio |
| Collab `/work/collab` | D3 force org graph |

**Definition of Done:** All pages complete. All have passive demo loop. Mobile degradations implemented per master plan spec.

---

### Phase 5 — Secondary Pages + Polish 🪄
**Goal:** Everything deployable.
**Effort:** ~3–4 days

1. `/about` page — editorial layout, 5 sections, strong philosophy statements
2. `/contact` page — minimal, correct tone
3. SEO pass — page titles, meta descriptions, OG images
4. Performance audit — bundle analysis, lazy loading verified
5. Mobile QA — all pages, real device sizes
6. Accessibility — focus states, skip nav, ARIA, reduced-motion
7. Netlify config — `netlify.toml` + `@netlify/plugin-nextjs`
8. Final content pass — zero placeholder content
9. Lighthouse audit — target: Performance ≥85, Accessibility ≥90, SEO ≥95

**Definition of Done:** Deployable. No placeholders. Lighthouse passes.

---

## 5. Testing Strategy

### Unit Tests
- `lib/projects.ts` — every project has required fields
- `lib/animations.ts` — `splitTextToChars` correct DOM structure
- `HueControl` — hue clamping, localStorage round-trip

### Integration Tests
- Navigation: project card → correct `/work/[slug]`
- Hue: reload restores from localStorage
- Transitions: no FOUC between pages

### Manual Visual Regression Protocol
Before each phase is marked Done:
- Desktop Chrome 1440px
- Mobile Chrome 390px (iPhone 14)
- Tablet 768px
- Firefox
- `prefers-reduced-motion: reduce` enabled

### Animation / 3D QA Checklist
- [ ] Node graph: 60fps in DevTools Performance
- [ ] Cursor: smooth lerp, no jank on fast movement
- [ ] Page transition: 600ms total, no flicker
- [ ] ScrollTrigger: sync with Lenis (test with fast scrolling)
- [ ] Mobile: no R3F crashes, CSS fallbacks render
- [ ] Passive demo loop: auto-fires after 5s idle

### Performance Budget Monitoring
```bash
pnpm build && pnpm analyze
# Target: vendor.js < 200KB gzipped (ex-Three.js)
# Target: three.js chunk only loads on pages that use it
```

---

## 6. Success Metrics

| Area | Target | How to Measure |
|---|---|---|
| Lighthouse Performance (mobile) | ≥ 85 | `lighthouse --form-factor=mobile` |
| LCP | < 2.5s (3G sim) | Chrome DevTools throttling |
| INP | < 100ms | Chrome DevTools |
| Hero 3D FPS | 60fps desktop / 30fps mobile | stats.js overlay |
| JS bundle (gzipped, ex-Three) | < 200KB | Bundle analyzer |
| Three.js chunk | < 140KB gzipped | Bundle analyzer |
| All 15 project pages | 100% with real content | Manual check |
| All 15 signature interactions | 100% + passive demo loop | Manual QA |
| Mobile nav | Bottom tab bar functional | Device testing |
| Cursor system | Smooth Chrome + Firefox + Safari | Cross-browser |
| Hue control | Persists, updates all accents | Manual test |
| SEO | title + meta on every page | Manual / Screaming Frog |
| Zero placeholders | No "v0 App", "hello@example.com" | `grep` check |

## 7. Open Questions & Alignment (Status: Partially Resolved)

### Resolved Questions (Phase 0 & 1 Ready)
- **LinkedIn URL:** `https://linkedin.com/in/bentheaya` (resolved)
- **About Strip Stats:** (resolved)
  - `15` — Connected environment nodes
  - `1` — Institutional award for leveraging technology in education
  - `2026` — B.Sc. Mathematics & Computer Science pipeline checkpoint
- **Curation Index:** Yes, curated (resolved)
- **Thematic Bridges:** Exact track mapping sequence defined (resolved)
- **Tagline:** Use generic tagline for now: "Mathematics × Computer Science" or "Building at the intersection of mathematics, systems, and learning" (resolved)
- **Architecture Diagrams:** Inline SVG/Tailwind structures (resolved)
- **DiffGeo Math:** Geodesic trajectory verification via Christoffel symbols differential equation (resolved)
- **Nyaraka Privacy:** Architectural case study and mocks only, no source files (resolved)
- **MusicPlayerGame:** Isolated canvas block or sandboxed iframe (resolved)

### Remaining Questions (Before Phase 4)
- [ ] **Remaining 5 Projects Data:** Detailed copy and signature interaction details for the final 5 projects (Nyaraka, Veld, Digital Economy, Legacy Core, Collab) to be supplied by the user.
- [ ] **MusicPlayerGame Code:** Details of the game implementation codebase to determine if we embed it via a sandboxed iframe or rebuild it locally in canvas.

---

## 8. Risk Register

| ID | Risk | Likelihood | Impact | Status | Mitigation |
|---|---|---|---|---|---|
| R01 | R3F + Lenis scroll sync breaks | Medium | High | Open | Spike the proxy setup in isolation first |
| R02 | Three.js bundle exceeds budget | Medium | High | Open | Dynamic import + mobile skip; measure after install |
| R03 | DiffGeo manifold math complexity | High | Medium | Open | Use Christoffel symbol formula as vector overlay; implement simplified geodesic pathing in canvas/WebGL |
| R04 | MusicPlayerGame loop bottlenecks | High | Medium | Open | Sandbox the game loop in an iframe or separate canvas thread to isolate inputs from main animation loop |
| R05 | Remaining copy not ready before Phase 4 | High | High | Open | We have copy for the first 10 projects. User will supply the other 5 before Phase 4 starts. |
| R06 | Mobile 3D crashes | Medium | High | Open | Always load pre-rendered video fallback on mobile |
| R07 | GSAP ScrollTrigger out-of-sync | Medium | High | Open | Follow exact proxy pattern — no native scroll |
| R08 | App Router transition flash | Medium | Medium | Open | Overlay covers 100vw/vh instantly |
| R09 | Nyaraka light-bg breaks dark theme | Medium | Medium | Open | Scope light theme strictly to the Nyaraka route |
| R10 | Netlify App Router compat | Low | High | Open | Use `@netlify/plugin-nextjs` |

