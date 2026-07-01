# Benaih Shaback Galavu — Portfolio Master Plan
**Developer:** Benaih Shaback Galavu  
**Email:** bentheaya@gmail.com  
**Education:** B.Sc. Mathematics and Computer Science, Maseno University (graduating 2026)  
**Location:** Nairobi, Kenya  
**GitHub:** github.com/bentheaya  
**Framework:** Next.js 14 (App Router) — hosted on Netlify free tier  

---

## 1. Design Philosophy

### The Core Concept: "The Terminal as Canvas"
The portfolio is not a resume with hover effects. It is an *environment* — a system Benaih has built and invited you into. The aesthetic draws from the command-line interface tradition but elevates it: monospace meets minimalism meets motion. It should feel like a world with its own gravity.

### The Single Guiding Principle
Every screen should feel like it was built *specifically for that project*. The home page establishes a world. Each project page breaks out of it and creates its own universe. A visitor landing on the SlopSlayer page should feel like they've left the portfolio and entered a surveillance room. A visitor landing on the DiffGeo page should feel like they've stepped into a mathematics textbook that came alive. The portfolio is a portal system — one entrance, many worlds.

### Voice & Tone
Personal. Direct. Technically fluent without being inaccessible. Never resume-speak. The copy should sound like Benaih explaining a project to a brilliant friend over coffee — enthusiastic, specific, honest about what was hard.

---

## 2. Global Design System

### Color System
**Base palette (dark canvas):**
- `--bg-primary`: `#080808` — near-black canvas (never pure #000000)
- `--bg-secondary`: `#0d0d0d` — elevated surfaces
- `--bg-tertiary`: `#141414` — cards, panels
- `--border-subtle`: `#1a1a1a` — hairline borders
- `--border-default`: `#222222` — default borders
- `--text-primary`: `#f0ede8` — warm off-white headings
- `--text-secondary`: `#c8c4bc` — body text
- `--text-muted`: `#666660` — supporting text
- `--text-dim`: `#333330` — very muted labels

**Global accent (user-manipulable hue):**
- `--accent-h`: `164` — hue in HSL (default: teal-green)
- `--accent-s`: `68%` — saturation
- `--accent-l`: `55%` — lightness
- `--accent`: `hsl(var(--accent-h), var(--accent-s), var(--accent-l))` — computed accent
- `--accent-dim`: `hsl(var(--accent-h), var(--accent-s), var(--accent-l), 0.08)` — bg tint
- `--accent-border`: `hsl(var(--accent-h), var(--accent-s), var(--accent-l), 0.25)` — border tint

The global hue control (see Section 6) shifts `--accent-h` from 0–360, rotating the accent color across the whole site simultaneously. This is the user-manipulable color system.

**Domain accent colors (per project — these do NOT respond to global hue shift):**
These are hardcoded per project page and override the global accent only within that project's route.
- AI/Detection: `#ef4444` (red-alarm)
- Spatial/AR: `#6393ff` (electric blue)
- EdTech: `#fbbf24` (amber-warm)
- Neuro-Symbolic: `#22c55e` (organic green)
- Mathematics: `#c084fc` (violet)
- Mobility/Systems: `#38bdf8` (sky blue)
- NLP/Sentiment: `#f97316` (orange)
- Microservices: `#fb7185` (coral-pink)
- Creative/Game: `#a78bfa` (soft purple)
- Civic/Platform: `#2dd4a0` (teal — matches home accent default)
- Archive/Heritage: `#94a3b8` (slate)
- Data/Africa: `#f59e0b` (amber-earth)

### Typography
**Display / Headings:** Space Grotesk (Google Fonts)
- Hero names: 56–80px, weight 600, letter-spacing -0.03em
- Section headings: 32–40px, weight 500
- Card titles: 16–20px, weight 500

**Monospace / Labels / Code:** JetBrains Mono (Google Fonts)
- Domain labels, route slugs, terminal text, badges: 10–12px, weight 300–400
- Code blocks: 13px, weight 400

**Body / Editorial:** Space Grotesk (same family, lighter weight)
- Body copy: 16px, weight 400, line-height 1.75
- Pull quotes: 20–24px, weight 400, italic style via `font-style: italic`

### Spacing System
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
--space-12: 48px
--space-16: 64px
--space-24: 96px
--space-32: 128px
```

### Border Radius
- Chips / pills: `4px`
- Cards: `8px`
- Panels: `12px`
- Large containers: `16px`

---

## 3. Global Animation System

### Library Stack
```
react-three-fiber (R3F)     — 3D hero node graph
@react-three/drei           — R3F helpers (OrbitControls, Points, Line, etc.)
three                       — Three.js underlying
gsap + @gsap/react          — scroll orchestration + timeline animations
@gsap/scrolltrigger         — scroll-driven section reveals
lenis                       — smooth inertia scroll
framer-motion               — component-level React transitions
```

### Custom Cursor System (desktop only)
Two-layer cursor that replaces the default `cursor: none` site-wide on desktop:

**Layer 1 — Dot:** 6px circle, `var(--accent)` fill, follows mouse at 1:1 with no lag.  
**Layer 2 — Ring:** 28px circle outline, `var(--accent)` stroke at 40% opacity, follows mouse with ~80ms lerp lag (smooth trailing).

**States:**
- Default: dot + ring both visible
- Hover interactive element: ring expands to 48px + fills to 15% opacity (magnetic feel)
- Hover project card: ring expands to 64px, dot disappears, ring fills with project's domain color at 20% opacity
- Hover link/button: dot scales to 8px, ring scales to 36px
- Clicking: both layers scale down 0.7x with spring snap-back
- Per-page swap: each project page defines a `data-cursor` attribute on the body that overrides the cursor SVG entirely

**Implementation:** Pure JS, `mousemove` listener with `requestAnimationFrame`, CSS custom properties for the lerp position. No library needed.

### Scroll System
Lenis initializes globally in the root layout. All GSAP ScrollTrigger instances use Lenis scroll proxy. Scroll speed: `lerp: 0.075` (slightly slower than default, more weight).

### Page Transition System
**Trigger:** User clicks a project card or navigation link.  
**Sequence (total ~600ms):**
1. A colored overlay div (project's domain color) scales from `scaleX(0)` to `scaleX(1)` from the cursor's X position, using `transform-origin` set dynamically. Duration: 300ms, ease: `power2.in`.
2. As the overlay reaches full width (at ~250ms), the new page's content starts loading behind it.
3. Overlay then scales out from right to left: `scaleX(1)` to `scaleX(0)`, `transform-origin: right`. Duration: 300ms, ease: `power2.out`.
4. New page content fades/slides up during the overlay exit.

**Implementation:** GSAP + `useLayoutEffect` in a shared `<PageTransition>` component that wraps every page.

**Mobile:** On touch devices, transition is a simple opacity crossfade (200ms) — no wipe.

### Text Animation System
Used on headings that animate in on page load or scroll-enter:

1. Text is split to individual characters using a utility (`splitText(el)`)
2. Each character wrapped in `<span style="display: inline-block; overflow: hidden">`
3. Inner span starts at `translateY(100%) rotate(8deg)` and `opacity: 0`
4. GSAP `stagger` animates them in: duration 0.6s, stagger 0.025s per char, ease `power3.out`
5. Characters with index % 3 === 0 get a micro-random -2 to +2px Y offset that persists after animation (subtle organic feel)

### Hover Magnetic Effect (desktop)
For project cards and primary CTA buttons:
```js
// On mouseenter the card's proximity zone (~80px)
const bounds = el.getBoundingClientRect();
const x = (e.clientX - bounds.left - bounds.width/2) * 0.3;
const y = (e.clientY - bounds.top - bounds.height/2) * 0.3;
gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' });

// On mouseleave
gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
```

---

## 4. Site Structure & Routing

```
/                          — Home (the session)
/work                      — All projects index (filterable)
/work/slopslayer           — SlopSlayer page
/work/dira                 — Dira AR Pathfinder page
/work/intuilab             — IntuiLab page
/work/nutrilogic           — NutriLogic page
/work/diffgeo              — Differential-Geometric Metric page
/work/spiks                — Spiks page (featured collaboration)
/work/opinionminer         — OpinionMiner page
/work/miniecommerce        — MiniEcommerce page
/work/ukweli               — UKWELI Digital Literacy Platform page
/work/musicgame            — MusicPlayerGame (fun/experimental)
/work/nyaraka              — Nyaraka Digital Archive page
/work/veld                 — Veld Data Lakehouse page
/work/legacy-core          — Legacy Core suite (API Gateway + Market Backend combined)
/work/digital-economy      — Digital Economy Growth Tracker
/work/collab               — Contributions overview (quickfood, learn_io, NEXUS, UTAVU, AI Course Rec)
/about                     — About Benaih
/contact                   — Contact
```

### Home Page Scroll Sections
1. **Hero** — 100vh, 3D node graph, name + tagline
2. **About strip** — brief identity paragraph + stats (no separate about page link here — just enough context)
3. **Featured projects** — 4 "hero" projects with large cards (SlopSlayer, Dira, IntuiLab, UKWELI)
4. **Project constellation** — interactive 3D graph of all projects (the actual browseable node graph)
5. **Collaborations** — lighter treatment of contributed projects
6. **Contact** — email, GitHub, LinkedIn

---

## 5. Home Page — Detailed Specification

### Hero Section (100vh)
**Background:** React Three Fiber scene. Near-black canvas. A graph of ~15 nodes (one per key project) connected by thin edges. Nodes are small glowing spheres (size proportional to project "weight" — subjectively: IntuiLab, Spiks, UKWELI, Dira are largest). Camera drifts on `mousemove` — subtle parallax, max ±15° rotation. No orbit controls for the user; the camera has its own slow, ambient drift animation using `useFrame`.

**Nodes:** Each node has the domain accent color of its project, a slight bloom glow (achieved via additive blending), and a `userData.slug` for click-routing. On hover: node scales 1.8x, a label appears next to it (HTML overlay using R3F's `Html` component from drei).

**Click behavior:** Clicking a node triggers the page transition to that project's route.

**Hero text (HTML overlay, not in 3D scene):**
```
[bottom-left, above the fold line]
<mono>open to work · nairobi, ke</mono>  ← pulsing green dot beside this
<h1>Benaih<br>Shaback.</h1>             ← massive, ~72px, weight 600
<p>Mathematics × Computer Science</p>   ← monospace, muted
<p>Maseno University, 2026</p>
```

**Scroll cue:** Thin vertical line (1px, `var(--accent)`) at bottom-right, with a small animated dot traveling down it in a loop.

### Project Constellation (the browseable graph section)
At approximately 300vh scroll depth, the 3D hero "zooms out" (GSAP ScrollTrigger controls camera Z position). The graph transitions from the ambient hero animation to an interactive browseable state:
- Camera pullback reveals all nodes with labels visible
- Section heading appears: `// all work`
- Nodes become fully clickable with cursor feedback
- Filter pills appear (AI / Systems / EdTech / Research / Web / Collab) — clicking a filter dims non-matching nodes and brightens matching ones
- The graph settles into a stable spatial layout (no more drift)

---

## 6. Global Hue Control System

### UI
A small persistent control lives in the bottom-right corner of every page (desktop) or in the hamburger menu (mobile). It appears as:
- A thin circular hue ring (CSS conic-gradient in a 36px circle)
- Dragging around the ring rotates `--accent-h` from 0–360
- The change propagates immediately across all global accent colors via CSS custom property

### Implementation
```js
// On root layout, set CSS var
document.documentElement.style.setProperty('--accent-h', String(hue));

// Persisted in localStorage
localStorage.setItem('portfolio-accent-hue', String(hue));
```

### Behavior
- The hue shift affects: cursor color, border highlights, active nav indicators, scroll cue lines, hero node glow colors (global nodes only — project-specific nodes keep their domain color)
- Project pages: the global hue control is still present but the page-specific accent dominates. The global hue affects only the back-navigation button and page chrome.
- Default hue: 164 (teal-green, matching the initial design direction)

### Micro-Interaction Nod
- **The State Token:** The active `localStorage` hue value should be quietly rendered as a functional string in the site footer or terminal sub-text (e.g., `// system.hue: 164°`). It updates live as the user rotates the control wheel, serving as a subtle proof-of-state for technical eyes.

---

## 7. Universal Project Page Template

Every project page follows this anatomy. The visual implementation of each section differs per project, but the structural purpose is identical.

### Section 01 — The World (100vh hero)
**Purpose:** Establish the project's universe. The user should immediately feel the *domain* of this project.
- Full-bleed animated background (project-specific — see Section 8)
- Project name in massive type (60–80px)
- One-line description beneath (monospace, muted)
- Domain badge (e.g., `● AI / Detection`)
- Year + status
- Back link top-left: `← all work` (ghost style, always visible)
- GitHub link top-right (if public repo)
- Scroll cue at bottom

### Section 02 — The Origin Story
**Purpose:** Why this existed. Personal voice, not bullet points.
- Left: a pull quote (the single most interesting thing about this project, 15–30 words, large type)
- Right: 2–3 paragraphs of prose (why this problem? what was the context? personal motivation?)
- Background: transitions from project's hero bg to `--bg-secondary` on scroll

### Section 03 — The Intriguing Part
**Purpose:** The one technically fascinating or unexpected insight. What changed how Benaih thought about the problem.
- This section contains the page's *signature interactive element* (see Section 8 per project)
- Heading: "what made this interesting"
- Subsection for the interactive/animated element
- 1–2 paragraphs of technical prose explaining the insight
- **The Passive Loop Mode:** If a visitor fails to interact with a signature element (sliders, tabs, dividers) within 5 seconds of it scrolling into view, trigger a subtle, automated "Autonomous Demo" loop. This ensures fast-scrolling recruiters still witness the technical capabilities without requiring immediate manual clicks.

### Section 04 — How It Was Built
**Purpose:** Architecture and stack with narrative rationale. Not a bulleted list.
- An animated architecture diagram (project-specific SVG or canvas animation)
- Stack pills: each technology with a brief rationale tooltip on hover
- 2–3 paragraphs of architectural narrative

### Section 05 — The Hard Part
**Purpose:** Authenticity. What broke, what took time, what the actual solution was.
- Heading: "what was hard"
- Concrete and specific — name the bug, the algorithm, the tradeoff
- Code snippet (if relevant) in JetBrains Mono with syntax highlighting
- This is the section that makes Benaih real to a technical reader

### Section 06 — Outcome + Next
**Purpose:** Where it landed and where it's going.
- Outcome metrics (if any — users, performance, academic grade, hackathon result)
- Current status
- What would be done differently
- CTAs: GitHub, live demo (if applicable)
- "Next project" teaser: a darkened preview of the next project page slides in from the bottom. Clicking it triggers the page transition.
- **The Thematic Bridge:** The "Next Project" teaser must ignore chronological order. It will route users based on thematic transitions:
  - SlopSlayer (AI/Detection) → OpinionMiner (AI/NLP)
  - Dira (AR/Spatial AI) → DiffGeo (Mathematics/Research)
  - Spiks (Systems/Mobility) → Legacy Core Suite (Systems/API Architecture)
---

## 8. Individual Project Pages — Complete Specifications
### Engineering Ownership Clause (For Collaborative Works: Spiks, Nyaraka, Veld, Digital Economy)
- Do not merely list the combined stack. Section 04 must isolate Benaih's explicit structural contributions. Use a dedicated `### Engine Room Focus` subsection detailing specific system optimizations (e.g., "My Focus: Architecting the PostGIS query radius limits and tuning the Redis cache layers to drop request overhead").

### P01 — SlopSlayer `/work/slopslayer`
**Domain:** AI / Detection  
**Accent:** `#ef4444` (alarm red)  
**GitHub:** github.com/bentheaya/SlopSlayer (public, Python)

**The story:** Built a real-time deepfake and AI-generated content detection engine. The "slop" in the name is deliberate — the proliferation of AI-generated garbage content is a real problem. The project's job is to bust it.

**Hero background:** Near-black with a subtle horizontal scan line sweeping top-to-bottom on a ~3s loop (CSS `@keyframes`, 1px red line, opacity 0.4). A grid of faint red dots in the background (CSS `radial-gradient` repeating pattern). Corner brackets at all four viewport corners that slowly pulse. The aesthetic: surveillance room.

**Cursor:** A four-point crosshair SVG. On hover over any text block: cursor turns red + the word `ANALYZING...` appears 12px to the right of it in monospace, with a blinking caret. This animates in and out on enter/leave.

**Signature interaction (Section 03):** A split-screen reveal. Left half of the screen shows a "clean" version (a styled text/image block). Right half shows the same content with glitch distortion applied (CSS filter: `hue-rotate`, `skewX`, noise SVG filter). A vertical divider line sits at the center. Dragging the divider left/right (or following the mouse X position) reveals more of one side vs the other. Label: `← REAL / FAKE →`. This is the deepfake reveal moment made tactile.

**Architecture diagram:** A Python pipeline visualization — Input Stream → Frame Extractor → Feature Detector (CV model) → Temporal Analyzer → Classification Head → Output. Each stage lights up in sequence on scroll.

**Mobile degradation:** Split-screen becomes a toggle (tap to switch between real/fake views). Scan line animation persists (it's CSS-only). Crosshair cursor replaced with a red dot highlight on touch targets.

---

### P02 — Dira AR Pathfinder `/work/dira`
**Domain:** AR / Spatial AI  
**Accent:** `#6393ff` (electric blue)  
**GitHub:** github.com/bentheaya/AR_Pathfinder (public, TypeScript, MIT)

**The story:** Uses Gemini 3's agentic vision to recognize landmarks and generate AR navigation guides. The key innovation: offline-ready, human-centric. Navigation that doesn't require you to be staring at a phone — it meets you where you are.

**Hero background:** Deep midnight blue (`#020510`). A perspective-foreshortened CSS 3D grid plane (using `perspective: 600px` and `rotateX(60deg)` on a CSS grid div) extends from the bottom to the horizon. Grid lines at 1px, `#6393ff` at 8% opacity. Above the horizon: scattered stars (absolutely positioned tiny white dots, some with CSS pulse animations). As you scroll into the hero, location pins (SVG) drop into the grid plane with a spring animation — one at a time, each with a ripple ring.

**Cursor:** A location pin SVG (the classic teardrop shape). When clicking anywhere in the hero: a new pin drops at that position with spring physics (GSAP) and a ripple ring emanates. The trail of pins left by the user's clicks accumulates on screen, fading over ~8 seconds.

**Signature interaction (Section 03):** A vertical split: left panel labeled "CAMERA VIEW" (a dark grey rectangle with a subtle vignette suggesting a phone camera). Right panel: same rectangle but with AR overlay annotations assembling — a floating label assembles character-by-character ("Maseno University Library | 234m"), a distance ring pulsing around a point on the "image", a route arrow animating in. This shows the Gemini vision pipeline's output made visual. A scroll-driven timeline below walks through: landmark detected → Gemini query → response parsed → AR overlay rendered.

**Architecture diagram:** Gemini API → Vision Parser → Landmark DB lookup → AR Renderer → Offline Cache. Bidirectional arrows on the cache node (it both reads and writes).

**Mobile degradation:** CSS 3D grid becomes a flat 2D grid (no perspective transform — too janky on mobile). Pin-drop interaction works with tap. AR split-view becomes a simple swipe between two panels.

---

### P03 — IntuiLab `/work/intuilab`
**Domain:** EdTech / Learning Platform  
**Accent:** `#fbbf24` (warm amber)  
**GitHub:** github.com/bentheaya/intuilab (public, TypeScript)

**The story:** IntuiLab is the project closest to Benaih's core belief about education: that the best learning happens when you *rediscover* something, not when it's handed to you. Built for the Kenyan curriculum (KCSE/CBC) but designed to scale. The "rediscovery" pedagogy is the product, not just the marketing.

**Hero background:** Canvas particle system (~200 particles) with orbital physics. Particles are small circles (~3px) colored in warm amber and off-white. They orbit slowly around 4–5 "nuclei" scattered across the canvas. The nuclei are invisible — only the orbiting particles make them inferrable. On cursor proximity (~120px): particles within range shift their orbital center to the cursor, creating a gravity-well effect. The cursor IS a nucleus.

**Cursor:** No special cursor shape (the gravity-well effect is the cursor interaction). However: clicking scatters nearby particles outward in a burst (GSAP stagger on their positions), then they slowly drift back to orbiting. The click = the "a-ha moment" visual metaphor.

**Signature interaction (Section 03):** A simulated IntuiLab lesson in 3 acts, each triggered by scroll:
1. **Act 1 — The Question:** A physics problem appears in the center (styled like the actual platform UI): "A ball rolls off a 1.2m table at 3 m/s. Where does it land?"
2. **Act 2 — The Scaffold:** Guided inquiry prompts appear one by one (not the answer — questions that lead to the answer): "What forces act on the ball after it leaves the table?" "How long does it take to fall 1.2m?" A small animated projectile plays on the side.
3. **Act 3 — You figured it out:** The answer assembles from the user's "derived" steps with a satisfying particle burst. Tagline: "That's IntuiLab. The answer means more when you found it."

**Mobile degradation:** Particle system reduced to ~60 particles. Gravity-well replaced by a tap-anywhere burst (particles scatter on tap). Lesson simulation becomes a vertical step-by-step accordion.

---

### P04 — NutriLogic Expert System `/work/nutrilogic`
**Domain:** AI / Neuro-Symbolic  
**Accent:** `#22c55e` (organic green)  
**GitHub:** github.com/bentheaya/NutriLogic-Expert-System (public, Python, MIT)

**The story:** A hybrid system — Prolog's symbolic logic for the rule base, Django for the shell, React for the frontend. The interesting part is the *integration*: making a logic programming language talk to a modern web stack, and doing it for a nutritionally and culturally specific context (Kenya, local foods, local fitness patterns).

**Hero background:** An SVG Voronoi tessellation covering the full viewport. Each cell is slightly different in size and filled with organic greens/earth tones (procedurally generated, no two cells identical). Cells slowly "breathe" — a subtle CSS `transform: scale()` oscillation on each cell (randomized phase per cell using `animation-delay`). On scroll: cells reorganize (new Voronoi layout transitions in with morphing).

**Cursor:** Default cursor. But: hovering over any Voronoi cell highlights it (CSS hover) with a warmer fill. Clicking a cell shows a tooltip-style popover with a sample Prolog fact from the system: `nutrient(ugali, carbohydrate, high, ['Rift Valley']).` or `advice(bmi_range(25, 30), reduce_carb_intake, 3).` This makes the rule engine feel tangible.

**Signature interaction (Section 03):** A two-panel animated comparison:
- Left panel: "Symbolic" — Prolog rules cascade in from the top, line by line, each rule finding its conclusion in a chain (logic tree visualization). Color: green.
- Right panel: "Neural" — A simplified neural activation diagram, nodes lighting up with forward propagation. Color: blue-purple.
- A central divider has a MERGE button. Clicking it: the two panels slide together, the rules and activations interleave, and a combined "hybrid output" node appears at the bottom — the system's personalized nutrition recommendation. Animation: ~1.5s, GSAP timeline.

**Mobile degradation:** Voronoi bg becomes a static image (pre-rendered PNG). Prolog tooltips become a swipe-able fact-card stack. Merge animation plays automatically on scroll (no button tap needed).

---

### P05 — Differential-Geometric Similarity Metric `/work/diffgeo`
**Domain:** Mathematics / Research  
**Accent:** `#c084fc` (violet)  
**GitHub:** github.com/bentheaya/Differential-Geometric-Similarity-Metric (public, Jupyter)

**The story:** The most mathematically ambitious project in the portfolio. Combines two distance measures — geodesic distance (how far two points are on a curved surface) and KL divergence (how different two probability distributions are) — into a single unified similarity metric. The application: measuring similarity between things that live on curved manifolds, not flat spaces.

**Hero background:** A Three.js mesh — a torus knot or saddle surface (`THREE.ParametricGeometry` with a mathematical surface equation) rotating slowly on `useFrame`. Wireframe style: very thin edges (0.5px), violet at 40% opacity on near-black. The surface distorts slowly using a GLSL vertex shader that adds a time-based noise displacement. This is the most technically beautiful page on the entire site.

**Cursor:** Default cursor in this page (the 3D interaction is the focus). However: when in Section 03, the cursor changes to a crosshair for the geodesic interaction.

**Signature interaction (Section 03):** A Three.js canvas shows a simplified 2D-projected manifold surface. Two draggable points sit on the surface. Between them:
- A straight line (Euclidean distance in embedding space) — always visible, grey
- A curved line that follows the surface (geodesic) — violet, animated with a traveling dot

A slider below labeled "Surface Curvature" morphs the surface from flat (Euclidean = geodesic) to highly curved (geodesic much longer than Euclidean). Two distribution plots appear beside it (styled like matplotlib but built in canvas) showing P and Q, with the KL divergence value updating live as the user moves the points. Label: "When the world is curved, straight lines lie."

**Mobile degradation:** Three.js hero replaced with a pre-rendered video loop (MP4 of the surface rotating, exported during build). Interactive geodesic becomes a scroll-triggered animation (path draws itself as you scroll). Slider still works.

---

### P06 — Spiks `/work/spiks`
**Domain:** Systems / Mobility Platform  
**Accent:** `#38bdf8` (sky blue)  
**GitHub:** github.com/PiusShadrack/spiks (private — note collaboration)  
**Role:** Backend & Infrastructure Lead + Project Manager

**The story:** Spiks is a ride-hailing platform built specifically for the Maseno University campus community — solving a real problem for students and staff navigating a campus where informal boda-boda transport is the norm but lacks coordination. Benaih designed and built the entire backend: PostGIS proximity queries, Redis pub/sub for real-time location, M-Pesa Daraja for payments, Africa's Talking for SMS, PostgreSQL for persistence.

**Hero background:** A stylized top-down campus road map rendered in SVG (not a real map — a simplified schematic with named landmarks). Background: midnight blue (`#020814`). Road lines: `#38bdf8` at 15% opacity. On the map: 3–4 animated "cars" (small rectangles) travel along predefined bezier paths on infinite loops, leaving a brief glowing trail that fades over 2s. GPS ping circles emanate from a "pickup request" point every ~4s.

**Cursor:** A small car/arrow icon. Clicking anywhere on the hero map places a "pickup" pin (spring animation). A second click places a "destination" pin. An animated route line draws between them (SVG `stroke-dasharray` animation). A "car" then travels the route. This is the most satisfying interaction on the page.

**Signature interaction (Section 03):** An animated system architecture walkthrough — a "ride request" event travels through the entire stack. Scroll-triggered stages:
1. Passenger app sends request → API Gateway
2. API Gateway → PostGIS query (nearest drivers, radius search)
3. Redis pub/sub → pushes matched driver
4. Driver app receives push notification
5. M-Pesa Daraja → payment on completion
6. Africa's Talking → SMS receipt

Each stage: the corresponding service node lights up in the architecture diagram, a data packet animates between them, and a small annotation appears describing what's happening technically. Real stack names, real latency expectations called out.

**Collaboration callout:** A styled "Team" section acknowledging the partnership — Benaih (Backend + PM), Pius Shadrack (Frontend Lead). Honest and generous.

**Mobile degradation:** Campus map SVG scales and simplifies to fewer roads. Car animations reduced to 1 car. Route interaction becomes tap-to-place, then auto-draws. Architecture walkthrough becomes a vertical timeline.

---

### P07 — UKWELI `/work/ukweli`
**Domain:** Civic Tech / Digital Literacy  
**Accent:** `#2dd4a0` (teal — connects to home accent)  
**GitHub:** github.com/bentheaya/UKWELI (public, TypeScript)

**The story:** UKWELI means "truth" in Swahili. The platform was built to combat a specific 21st-century problem in Kenya and across Africa: the flood of misinformation, AI-generated content, scams, propaganda, and fake news that reaches people — particularly those newer to the internet — through WhatsApp, Facebook, and other platforms. UKWELI gave communities a place to share, flag, discuss, and learn to identify these threats. A community forum + digital literacy hub + content authenticity toolkit.

**Hero background:** Deep teal-black (`#020f0a`). The word "UKWELI" rendered in massive, ultra-light type fills the entire background — so large it bleeds off the edges — slowly fading in and out on a 6s loop. Over it: a constellation of small checkmarks and shield icons (SVG, animated) assembling from random positions on page load. One or two red "!" icons appear and are slowly replaced by green checkmarks — the content verification metaphor.

**Cursor:** A "verification beam" — a horizontal 1px line extends from the cursor the full width of the viewport. Where it passes over text: text becomes fully crisp and bright. Above/below the beam: text is slightly dimmed (CSS `color-mix(in srgb, var(--text-secondary) 60%, transparent)`). The beam IS the fact-checking action.

**Signature interaction (Section 03):** An animated "fact-check journey":
- A claim appears center-screen (something realistic: "Government increases fuel prices by 30%")
- Evidence nodes animate in and connect to the claim (source links, fact-checker verdicts, related community discussions)
- A verdict renders: "PARTIALLY VERIFIED" with a breakdown
- Tagline: "Most people don't fact-check because it's too hard. UKWELI makes it a conversation."

This section should make the visitor feel the *importance* of what was built, not just the technical complexity.

**Mobile degradation:** Verification beam disabled (becomes a tap-to-highlight interaction). UKWELI background text at reduced opacity. Fact-check animation becomes scroll-triggered panels.

---

### P08 — OpinionMiner `/work/opinionminer`
**Domain:** AI / NLP  
**Accent:** `#f97316` (orange)  
**GitHub:** github.com/bentheaya/opinionminer (public, Python)

**The story:** A sentiment analysis engine designed not for academic benchmarks but for real-world problem solving. Adjusted for the messy, multilingual, context-dependent nature of African social media text. The engine had to work when people mix Sheng, Kiswahili, and English in the same sentence — which they always do.

**Hero background:** 60–80 words and short phrases floating and slowly drifting across a dark canvas (canvas 2D). Words drawn from realistic social media opinion domains: "prices", "hospital services", "government", "matatu", "fuel", "MCAs", "diaspora", "unga". Each word colored warm (positive: orange/amber) or cool (negative: blue/slate) based on its average sentiment polarity. Constant gentle Brownian motion drift.

**Cursor:** Within 150px of the cursor: positive words drift toward it (attraction), negative words drift away (repulsion). The cursor is a sentiment magnet. On click: all nearby words freeze for 300ms, then scatter slightly and return to drift.

**Signature interaction (Section 03):** A live text input (or large textarea). User types any sentence (placeholder suggestions: "The new road was a complete disaster", "Mama mboga biashara imepanda sana"). On submit (Enter or button): each word in the sentence highlights with a sentiment color + score badge. An overall sentiment meter animates at the top. This uses a pre-built response map for common phrases (no live API call needed for the portfolio demo) but feels live.

**Mobile degradation:** Word storm reduced to ~30 words. Sentiment magnet becomes a tap-to-scatter interaction. Demo input works identically.

---

### P09 — MiniEcommerce `/work/miniecommerce`
**Domain:** Systems / Microservices  
**Accent:** `#fb7185` (coral pink)  
**GitHub:** github.com/bentheaya/miniecomerce (public, Python) — 1 fork, meaning someone found it useful

**The story:** An ecommerce system built as an exploration of microservice architecture — what it actually means to decompose a monolith, how services communicate, what breaks, and what the tradeoffs are. Built in Python. The learning was as much architectural as it was technical.

**Hero background:** A D3.js (or canvas) force-directed graph of the microservice nodes. Nodes: User Service, Product Service, Cart Service, Order Service, Payment Service, Notification Service, API Gateway. Edges: animated dots travel along edges representing "request traffic". Each node has its domain color. On idle: low traffic. On hover of a node: traffic to/from that node surges (faster, more packets).

**Cursor:** Normal cursor but clicking a service node "injects a request" — a packet spawns at the node and travels through the call chain in sequence (auth → product → cart → order → payment → notification). The chain lights up step by step. Each step has a ~200ms delay between hops. Satisfying, technical, shows understanding.

**Signature interaction (Section 03):** A "chaos engineering" moment. A button labeled "TAKE DOWN A SERVICE" randomly selects a non-critical service node, turns it red, and shows the traffic rerouting around it. Other nodes remain healthy. After 3s, the service "recovers" and traffic resumes. This demonstrates the resilience property visually.

**Mobile degradation:** Force graph rendered as a static SVG (pre-computed layout). Packet animations simplified to opacity pulses along edges. Chaos button works (just opacity-based).

---

### P10 — Nyaraka Digital Archive `/work/nyaraka`
**Domain:** Heritage / Full-Stack  
**Accent:** `#94a3b8` (slate)  
**GitHub:** github.com/Nyaraka-Digital-Archive/* (private — final year project)  
**Role:** Contributor (Backend + Frontend)

**The story:** A digital archive for preserving Kenyan documents, records, and cultural heritage materials. Built as a final year project. The technical challenge was building an archive that was both searchable and preservationist — documents needed to be OCR'd, indexed, and stored in ways that survived format changes over time.

**Hero background:** CSS-only aged paper aesthetic. Off-white background (`#f5f0e8`) — this is one of the few pages that breaks from the dark canvas, because the subject demands it. A subtle CSS grain texture (SVG `feTurbulence` filter applied globally). Library card catalogue illustrated in SVG along the right edge of the hero — wooden drawers with small index labels. This page is slower, warmer, more contemplative than any other.

**Type treatment:** Uses a serif fallback for the pull quote section — `Georgia, 'Times New Roman', serif` — the one place on the entire site where a serif appears. It fits the archival subject.

**Cursor:** Default cursor restyled to a library stamp/seal shape. Hovering over the catalogue drawers causes them to slide open (CSS 3D `rotateX`) revealing indexed content. A satisfying micro-interaction — drawers react to hover individually.

**Signature interaction (Section 03):** A horizontal scroll timeline of Kenyan historical events (1963 independence → 1982 coup attempt → 1990 multiparty push → 2007 election crisis → 2010 Constitution → present). At each point: an archival "document" slides into a display frame — styled like a scanned government document or newspaper clipping. The timeline contextualizes why *preserving these documents* is not an academic exercise but a civic one.

**Mobile degradation:** Paper bg preserved (CSS is cheap). Catalogue drawer interaction becomes a tap-to-open. Horizontal timeline becomes vertical.

---

### P11 — Veld `/work/veld`
**Domain:** Data / African Cloud Infrastructure  
**Accent:** `#f59e0b` (amber earth)  
**GitHub:** github.com/Veld-AI/Veld (private — 1 star, active contribution)

**The story:** A distributed data lakehouse and crowdsourced expert talent ecosystem for the African cloud landscape. Veld bridges the gap between data being generated at scale across Africa and the infrastructure to make it useful. The "African cloud" framing is intentional — not just another cloud product, but one designed for the specific constraints and opportunities of African data infrastructure.

**Hero background:** A stylized SVG landscape of the African continent (simplified, schematic — not a geopolitical map). Rivers (data flows) rendered as animated flowing lines in amber/gold, converging toward a central "lake" area. The rivers have animated dots traveling along them (the data flow). Deep amber and earth tones on near-black. The continent outline is subtle — a dotted or dashed boundary.

**Cursor:** Where the cursor intersects a "river" line: a new tributary branch extends from cursor to the nearest river (dotted line, following the cursor). On click: the tributary becomes solid and a data packet starts flowing along it into the main river. Metaphor: contributing data to the ecosystem.

**Signature interaction (Section 03):** A scroll-driven architectural zoom. Start: the full continental overview. Scroll: zooms into East Africa region. Continue: zooms to a single "data center" location. Continue: reveals the lakehouse architecture layers — Bronze (raw ingestion), Silver (cleaned, indexed), Gold (analytics-ready). Each layer is a literal visual stratum (like rock layers), with data flowing between them. The lake depth metaphor makes the bronze/silver/gold naming tangible.

**Mobile degradation:** SVG landscape scales (it's vector). River animations persist (they're SVG `animateMotion`). Zoom sequence becomes a step-through with tap navigation.

---

### P12 — Digital Economy Growth Tracker `/work/digital-economy`
**Domain:** Data Science / Research  
**Accent:** `#10b981` (emerald)  
**GitHub:** github.com/csaafrica/Digital-Economy-Growth-Tracker (public, Jupyter, MIT)  
**Role:** Contributor (csaafrica org)

**The story:** Tracks and predicts digital transformation success across African countries. The interesting data science challenge: digital economy development is uneven, multi-dimensional, and poorly captured by single metrics. The project built composite indicators and predictive models to surface where digital growth is accelerating and where it's stalling.

**Hero background:** A simplified African choropleth map (D3.js or hand-crafted SVG) where countries pulse with a "signal" animation — countries with higher digital development glow brighter. The signal animation is a radial pulse from the country centroid, like a heartbeat. Data journalism aesthetic: clean, informative, slightly editorial.

**Signature interaction (Section 03):** An interactive mini-dashboard. A year slider (2015–2024) updates the choropleth — countries change color as digital economy scores shift. Below: 3 key metric sparklines update simultaneously (internet penetration, mobile money adoption, tech startup density). This shows the analytical work directly.

**Mobile degradation:** Map becomes a simplified schematic (fewer countries labeled). Slider still works. Sparklines stack vertically.

---

### P13 — Legacy Core Suite `/work/legacy-core`
**Domain:** Systems / API Architecture  
**Accent:** `#e879f9` (neon pink)  
**GitHub:** github.com/Legacy-Core/API-GateWay + github.com/Legacy-Core/Online_Market_Backend (public)

**The story:** A centralized API gateway and the backend for a marketplace connecting vendors and service providers (mama fua, hair dressers, etc.) to potential customers. Two repos, one system. The gateway manages routing to multiple backend services. Built in Django (backend) and JavaScript (gateway).

**Hero background:** Signal routing visualization — a constellation of endpoint nodes with animated routing paths between them. Neon pink signal pulses travel along the routes. Deep black bg. The aesthetic: network infrastructure visualized as something beautiful.

**Signature interaction:** An interactive routing demo — select an incoming request type from a dropdown, and watch the gateway route it through the correct service chain.

---

### P14 — MusicPlayerGame `/work/musicgame`
**Domain:** Creative / Experimental  
**Accent:** `#a78bfa` (soft purple)  
**GitHub:** github.com/bentheaya/MusicPlayerGame (public, TypeScript)

**The story:** Built for fun — a browser-based music player integrated with a snake game. Two things that shouldn't obviously go together, but produce something strangely delightful when they do. The snake's speed responds to the beat. The music track advances when the snake eats food. It's whimsical and intentional about being whimsical.

**Hero background:** An actual playable version embedded in the hero section. This is the first thing you see — the game, running. No explanation needed; you play it first, read about it second. Audio waveform bars animate in the background behind the game canvas.

**Cursor:** Snake trail cursor — the last 12 cursor positions connect as a snake body that follows with a slight lag. Green segments. The cursor IS the snake on the hero section.

**Treatment:** This page is lighter and shorter than the others. It doesn't need a full 6-section case study. The format: hero (playable demo) → a few paragraphs about why building something for fun matters → technical notes (canvas 2D, Web Audio API) → GitHub link. Tone: playful, self-aware.

---

### P15 — Collaborative Work `/work/collab`
**Domain:** Contributions  
**Accent:** `#94a3b8` (slate)

**The story:** A single page that houses contributions to external projects — presented as a graph of organizations and their projects, with Benaih's specific contribution described for each.

**Projects covered:**
- QuickFood Frontend (j1ere) — JavaScript, food delivery UI
- learn_io frontend + backend — fork contribution (32 forks on the frontend)
- NEXUS (NEXUS-NXS) — TypeScript platform
- UTAVU UI (UTAVU-FOUNDATION) — TypeScript UI
- AI Course Recommender (proacted) — Python, ML
- Online Market Backend (Legacy-Core) — already has its own page, linked

**Hero:** A force-directed organization graph. Benaih's node at center. Org nodes orbit around. Project nodes orbit around orgs. Edges labeled with contribution type (PR, feature, infrastructure). Clicking any node shows a detail panel.

**Per contribution:** Name, what Benaih specifically contributed, tech stack, org context.

---

## 9. About Page `/about`

### Structure
**Hero:** No animation — a strong editorial opening. The page background is `--bg-secondary`. Name large, then:

> "I build at the intersection of mathematics, systems, and learning. I'm finishing a degree in Mathematics and Computer Science at Maseno University, and I've spent the last three years shipping things that matter to me — a ride-hailing platform for my university campus, a digital literacy tool for communities navigating misinformation, a learning platform based on how humans actually learn science."

**Sections:**
1. **The work** — brief philosophy paragraph (not a bulleted skills list)
2. **Education** — B.Sc. Mathematics and Computer Science, Maseno University. Expected: 2026. Brief note on what the Math+CS combination means for how Benaih thinks about problems.
3. **How it started** — Brief origin story covering the early projects (Church Registration site, Django CRM) as the foundation. Honest about the learning curve.
4. **What I believe about software** — 3–4 short, strong statements about engineering philosophy. Not generic ("I love clean code") but specific.
5. **Beyond the screen** — brief, human. 2–3 sentences.
6. **Contact** — `bentheaya@gmail.com` + GitHub + LinkedIn (if applicable)

---

## 10. Responsive Strategy

### Breakpoints
```
mobile-sm:  < 480px   (small phones)
mobile:     480–767px
tablet:     768–1023px
desktop:    1024–1439px
wide:       > 1440px
```

### Feature Flags by Device
| Feature | Mobile | Tablet | Desktop |
|---|---|---|---|
| Custom cursor | Disabled | Simplified (no magnetic) | Full |
| Three.js hero | Canvas 2D particles | R3F at 50% complexity | Full R3F |
| Parallax scroll | Disabled | 50% depth | Full |
| Magnetic hover | Disabled | Disabled | Full |
| GLSL shaders | Disabled | Simplified | Full |
| Page transition | Opacity crossfade | Wipe at 50% speed | Full dramatic wipe |
| Particle counts | ≤40 | ≤100 | Full |
| 3D surfaces (DiffGeo) | Pre-rendered video | Simplified mesh | Full interactive |
| Cursor trail effects | Disabled | Disabled | Full |
| Hue control UI | In hamburger menu | In hamburger menu | Bottom-right persistent |

### Mobile-First Decisions
- Navigation: Bottom tab bar (Home, Work, About, Contact) instead of top nav
- Hero text: Always left-aligned, never centered (safer at small sizes)
- Project pages: Vertical scroll only — no horizontal parallax
- Animations: `prefers-reduced-motion` media query respected globally — all animations disabled
- Touch interactions replace cursor interactions (tap-to-trigger vs hover-to-trigger)
- Font sizes: All display sizes (72px hero) scale down with `clamp()`: `clamp(36px, 8vw, 72px)`

### Performance Budget
- Total JS (gzipped): < 200KB (excluding Three.js)
- Three.js (gzipped): < 140KB — loaded dynamically with `next/dynamic`, only on pages that use it
- LCP (Largest Contentful Paint): < 2.5s on mobile 3G
- FID / INP: All animations on `requestAnimationFrame`, never blocking main thread
- Images: All via `next/image`, WebP, lazy-loaded below the fold
- Fonts: Self-hosted via `next/font/google` (no FOUT)

---

## 11. Next.js Implementation Notes

### Project Structure
```
/app
  layout.tsx              — root layout: Lenis, cursor, hue control, page transition wrapper
  page.tsx                — home
  /work
    page.tsx              — work index
    /[slug]
      page.tsx            — dynamic project page (reads from projects config)
  /about
    page.tsx
  /contact
    page.tsx

/components
  /cursor                 — CustomCursor.tsx
  /transitions            — PageTransition.tsx
  /three                  — HeroScene.tsx, ManifoldScene.tsx, etc. (all dynamic imported)
  /animations             — TextReveal.tsx, MagneticWrapper.tsx
  /ui                     — ProjectCard.tsx, DomainBadge.tsx, StackPill.tsx
  /hue                    — HueControl.tsx

/lib
  projects.ts             — project metadata + slug mapping
  lenis.ts                — Lenis singleton
  cursor.ts               — cursor state management

/public
  /fonts                  — self-hosted Space Grotesk + JetBrains Mono
```

### Key Implementation Decisions
- **App Router:** Use `layout.tsx` for all persistent UI (cursor, hue control, nav). Project pages use dynamic routes.
- **Three.js:** Always `next/dynamic({ ssr: false })` — Three.js cannot run server-side.
- **GSAP ScrollTrigger:** Initialize inside `useLayoutEffect` with Lenis proxy. Clean up on unmount.
- **Project data:** Single TypeScript config file (`/lib/projects.ts`) with all project metadata — slug, title, accent color, domain, GitHub URL, status, stack. All project pages derive their data from here.
- **Netlify:** `netlify.toml` with `[build] command = "npm run build"` and `[build] publish = ".next"`. Use `@netlify/plugin-nextjs` for App Router support.

---

## 12. Content Priorities (Phase 2)

The following sections are where content (the words) will be written next:
1. Hero tagline — the one sentence that defines Benaih
2. Each project's origin story paragraph (the personal "why")
3. The "intriguing part" for each project — the insight sentence
4. The "hard part" for each project — specific and technical
5. About page philosophy statements
6. Contact page (minimal, but the tone matters)

The copywriting session should treat each project page as its own editorial brief — the voice stays consistent but the *register* shifts per project (SlopSlayer is urgent, DiffGeo is precise and curious, IntuiLab is optimistic, UKWELI is civic and grounded).

---

## 13. Build Sequence (Recommended)

1. **Phase 1 — Foundation (Week 1–2)**
   - Next.js scaffold with App Router
   - Design tokens (CSS custom properties)
   - Fonts (Space Grotesk + JetBrains Mono via `next/font`)
   - Custom cursor system
   - Lenis scroll setup
   - Hue control system
   - Basic page transition (opacity crossfade first, then upgrade to wipe)
   - Mobile nav

2. **Phase 2 — Home Page (Week 2–3)**
   - Three.js hero scene (node graph)
   - Hero text with character animation
   - About strip
   - Featured project cards (4)
   - Contact section
   - Full responsive implementation

3. **Phase 3 — Project Pages Core Template (Week 3–4)**
   - Universal project page template (all 6 sections)
   - Content filled for 3 flagship projects: SlopSlayer, IntuiLab, UKWELI
   - Page transition (full wipe)
   - Work index page with filtering

4. **Phase 4 — Signature Interactions (Week 4–6)**
   - SlopSlayer: split-screen deepfake reveal
   - Dira: pin-drop + AR overlay split
   - DiffGeo: Three.js manifold + geodesic drawer
   - Spiks: campus map + route animation
   - OpinionMiner: live demo input
   - IntuiLab: lesson simulation
   - NutriLogic: logic/neural merge animation

5. **Phase 5 — Remaining Pages + Polish (Week 6–8)**
   - All remaining project pages
   - About page
   - Collaboration graph page
   - Performance optimization
   - Mobile QA pass
   - Netlify deployment + domain

---

*Document version: 1.0 — planning phase complete. Next session: copywriting for all project pages.*
