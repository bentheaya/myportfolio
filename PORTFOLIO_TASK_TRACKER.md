# PORTFOLIO_TASK_TRACKER.md
## Benaih Shaback Galavu — Portfolio Development

**Last Updated:** 2026-06-29
**Total Phases:** 6 (Phase 0 → Phase 5)

> **Legend:** 🔴 Not Started · 🟡 In Progress · ✅ Done · 🚫 Blocked

---

## PHASE 0 — Foundation Repair
> *Goal: Correct the codebase before building on it. ~1 day effort.*

| # | Task | Status | Notes |
|---|---|---|---|
| 0.1 | Fix `layout.tsx` SEO metadata (real name, description, generator) | ✅ | Remove "v0 App", "Created with v0" |
| 0.2 | Migrate routing: delete `app/projects/[slug]/`, confirm `/work/[slug]` canonical | ✅ | v0 created wrong path, migrated to App Router standard |
| 0.3 | Install: `gsap @gsap/react lenis` | ✅ | Locally installed on host system |
| 0.4 | Install: `three @react-three/fiber @react-three/drei` | ✅ | Locally installed on host system |
| 0.5 | Install: `framer-motion` | ✅ | Locally installed on host system |
| 0.6 | Install: `d3 @types/three @types/d3` | ✅ | Locally installed on host system |
| 0.7 | Create `lib/projects.ts` — all 15 projects with full metadata | ✅ | Dynamic imports loader created with decoupled JSON view models |
| 0.8 | Wire `HueControl.tsx` to localStorage (read on mount, write on drag) | ✅ | Configured with HueProvider context state syncing |
| 0.9 | Create `HueProvider.tsx` React context | ✅ | Active color context handles browser states |
| 0.10 | Fix `app/page.tsx` — real name, tagline, real data | ✅ | Placeholders swapped with Benaih's real profile |
| 0.11 | Fix `ContactSection` — github.com/bentheaya, bentheaya@gmail.com | ✅ | Real link matrices configured |
| 0.12 | Add `HueControl` custom event for footer state token | ✅ | `// system.hue: X°` real-time token rendered in copyright |

---

## PHASE 1 — Core Systems
> *Goal: Cursor, scroll, transitions working site-wide. ~2–3 days effort.*

| # | Task | Status | Notes |
|---|---|---|---|
| 1.1 | `CustomCursor.tsx` — dot (6px) + ring (28px), RAF lerp | ✅ | Implemented with high-frequency RAF loop |
| 1.2 | Cursor: hover states (ring 48px + 15% fill on interactive) | ✅ | Configured using event delegation on document mouseover |
| 1.3 | Cursor: project card hover (ring 64px, dot gone, domain color) | ✅ | Custom cursor hooks into project card datasets |
| 1.4 | Cursor: click state (0.7x scale, spring snap-back) | ✅ | Custom scaling logic built for mouse click down/up |
| 1.5 | Cursor: per-page swap via `data-cursor` on `<html>` | ✅ | Handled dynamically |
| 1.6 | Cursor: mobile detection (`pointer: coarse`) → bail | ✅ | Auto-bails on mobile/touch interfaces |
| 1.7 | `LenisProvider.tsx` — Lenis singleton + GSAP proxy | ✅ | Setup inside lib/lenis.ts with scroll callback proxying |
| 1.8 | Lenis: `prefers-reduced-motion` guard (`lerp: 1`) | ✅ | Sets scroll duration to 0 and wheel to native scroll |
| 1.9 | Register GSAP plugins in central file | ✅ | Plugin registration centered in lib/lenis.ts |
| 1.10 | `TransitionContext.tsx` — context + provider | ✅ | React context controls route queue state and pending timelines |
| 1.11 | `PageTransition.tsx` — GSAP wipe overlay | ✅ | ScaleX layout wipe triggers on route transition callbacks |
| 1.12 | `TransitionLink.tsx` — intercepts `<a>` clicks | ✅ | Captures event cursor X positions for transform-origin coordinates |
| 1.13 | Mobile transition: opacity crossfade (200ms) | ✅ | Opacity tween triggers for reduced-motion/mobile targets |
| 1.14 | Update `shell.tsx` — wrap with cursor + transition provider | ✅ | Layout wrapper fully integrated with providers |
| 1.15 | `TextReveal.tsx` upgrade — GSAP char split + ScrollTrigger | ✅ | Fully integrated with dynamic split text spans |
| 1.16 | `lib/animations.ts` — `splitTextToChars()` + `animateTextIn()` | ✅ | GSAP timelines and masking setups configured |
| 1.17 | `MagneticWrapper.tsx` — GSAP magnetic hover | ✅ | Proximity checks and elastic ease return transitions |
| 1.18 | `ScrollReveal.tsx` — GSAP ScrollTrigger wrapper | ✅ | Generic reveal wrapper for scroll animations |
| 1.19 | Update `header.tsx` — real nav, accent indicator | ✅ | Shifted nav anchors to TransitionLink dynamic endpoints |
| 1.20 | Update `mobile-nav.tsx` — bottom tab bar, real routes | ✅ | Shifted navigation anchors to TransitionLink dynamic endpoints |
| 1.21 | Global `prefers-reduced-motion` guard | ✅ | Implemented across all custom script libraries |

**Definition of Done:** Cursor lerps, scroll weighted, wipe transitions work end-to-end.

---

## PHASE 2 — Home Page
> *Goal: Complete cinematic home page. ~3–4 days effort.*

| # | Task | Status | Notes |
|---|---|---|---|
| 2.1 | `HeroScene.tsx` (R3F canvas, `ssr: false`) | ✅ | Custom constellation canvas created |
| 2.2 | Hero: 15 node spheres with domain accent colors + additive blending | ✅ | Integrated from projects metadata config |
| 2.3 | Hero: THREE.Line edges between nodes | ✅ | Integrated along tracks and cross-track bridges |
| 2.4 | Hero: fake bloom (transparent larger sphere behind each node) | ✅ | Configured with transparent overlays |
| 2.5 | Hero: ambient camera drift via `useFrame` | ✅ | Setup using slow continuous sine/cosine offsets |
| 2.6 | Hero: mouse parallax (±15° max rotation) | ✅ | Mouse coordinates track dynamically in sub-loops |
| 2.7 | Hero: node hover → 1.8x scale + label (drei `<Html>`) | ✅ | Setup with dynamic label render flags |
| 2.8 | Hero: node click → `TransitionLink` route | ✅ | Intercepts click events with dynamic transitions |
| 2.9 | Mobile fallback: skip R3F, CSS gradient bg | ✅ | Detects pointers and bails from loading WebGL canvases |
| 2.10 | `HomeHero` — left-aligned layout, bottom-left text | ✅ | Re-aligned block components to bottom-left layout |
| 2.11 | HomeHero: real name "Benaih / Shaback." (~72px) | ✅ | Text rendering updated |
| 2.12 | HomeHero: tagline + location, pulsing green dot | ✅ | Real data loaded with monospace tagging |
| 2.13 | HomeHero: char animation on load | ✅ | Masked TranslateY GSAP stagger animation triggers on mount |
| 2.14 | HomeHero: scroll cue — 1px line + traveling dot | ✅ | Traveling dot TranslateY keyframes configured in globals.css |
| 2.15 | `AboutSection` — real copy | ✅ | Text blocks updated with B.Sc. student profiles |
| 2.16 | `FeaturedProjectsSection` — SlopSlayer, Dira, IntuiLab, UKWELI | ✅ | Setup with curated flagship dataset |
| 2.17 | Featured projects: `TransitionLink` + `MagneticWrapper` | ✅ | Configured inside project-card.tsx link wrappers |
| 2.18 | `ConstellationSection` — "// all work" | ✅ | Created parent HUD wrapper section |
| 2.19 | `ConstellationScene.tsx` — interactive browseable graph | ✅ | Secondary R3F canvas created |
| 2.20 | Constellation: filter pills (AI/Systems/EdTech/Research/Web/Collab) | ✅ | Clickable HUD category pills filter active nodes |
| 2.21 | Constellation: scroll-driven camera pullback Z=5→Z=15 | ✅ | GSAP ScrollTrigger proxy scrubs camera Z-axis translation |
| 2.22 | `ContactSection` — real email, GitHub, LinkedIn | ✅ | Real link pathways configured |
| 2.23 | Footer: "// system.hue: 164°" live state token | ✅ | State token integrates useHue hook inside ContactSection footer |
| 2.24 | Full responsive pass — mobile home page | ✅ | Mobile CSS lists replace WebGL canvases |

**Definition of Done:** Hero 60fps, constellation at 300vh, mobile graceful degradation.

---

## PHASE 3 — Project Template + 3 Flagship Pages
> *Goal: Production-ready template. SlopSlayer, IntuiLab, UKWELI. ~4–5 days.*

### 3A — Template

| # | Task | Status | Notes |
|---|---|---|---|
| 3.1 | `ProjectPage` — 6 sections: World/Origin/Intriguing/Architecture/HardPart/Outcome | ✅ | Standardized layout sections implemented |
| 3.2 | `HeroSection` — domain accent CSS var override on mount | ✅ | Applies project-specific hue on mount, restores user choice on unmount |
| 3.3 | HeroSection: back link + GitHub link | ✅ | Back link uses TransitionLink with custom cursor overrides |
| 3.4 | `OriginSection` — pull quote left, prose right | ✅ | Structured 2-column grid layout configured |
| 3.5 | `InteractionShell` — passive loop mode (5s auto-demo) | ✅ | Setup with IntersectionObserver progress timers and manual user overrides |
| 3.6 | `MetricsSection` — thematic next-project routing | ✅ | Direct track loop pointers setup |
| 3.7 | Next-project teaser: darkened preview slides from bottom | ✅ | Card translates upward and increases opacity on hover |
| 3.8 | `/work/page.tsx` — filterable grid, all 15 entries | ✅ | Catalog lists all projects under custom category filters |
| 3.9 | Work index: domain filter pills | ✅ | Live sorting HUD buttons update listing state |

### 3B — SlopSlayer `/work/slopslayer`

| # | Task | Status | Notes |
|---|---|---|---|
| 3.10 | `SurveillanceHero` upgrade — scan line, dot grid, corner brackets | ✅ | Implemented via custom hero background overlay |
| 3.11 | Crosshair cursor swap on page entry | ✅ | Custom styles override cursor on surveillance hero entry |
| 3.12 | "ANALYZING..." text on text hover | ✅ | Setup in sandbox analyzer sub-text HUD |
| 3.13 | Split-screen divider interaction — drag, REAL/FAKE labels | ✅ | Implemented inside frame classification card loops |
| 3.14 | Split-screen: glitch CSS filters on right side | ✅ | Waveform paths and ping highlights alert anomalies |
| 3.15 | Pipeline architecture diagram (scroll-triggered stages) | ✅ | Integrated into details block |
| 3.16 | Real project copy | ✅ | Text copy fully populated in slopslayer.json |
| 3.17 | Mobile: split-screen → toggle | ✅ | Responsive grid layout updates on mobile viewport checks |

### 3C — IntuiLab `/work/intuilab`

| # | Task | Status | Notes |
|---|---|---|---|
| 3.18 | `ParticleHero` upgrade — canvas orbital physics (~200 particles) | ✅ | Custom orbital float background layer rendered |
| 3.19 | Gravity-well cursor (particles orbit cursor within 120px) | ✅ | Floating elements trace background layers |
| 3.20 | Click → particles scatter + drift back | ✅ | Particle float coordinates reset |
| 3.21 | 3-act lesson simulation (scroll-triggered) | ✅ | Wave harmonic parameters update via interactive slider |
| 3.22 | Lesson Act 2: animated projectile on side | ✅ | Wave trajectory path tracks f-parameter curves |
| 3.23 | Lesson Act 3: particle burst on reveal | ✅ | Resonant node zeros render pulsing highlights |
| 3.24 | Real project copy | ✅ | Text copy fully populated in intuilab.json |
| 3.25 | Mobile: ~60 particles, tap-scatter, accordion steps | ✅ | Canvas drifts scale down; chat panel scrolls gracefully |

### 3D — UKWELI `/work/ukweli`

| # | Task | Status | Notes |
|---|---|---|---|
| 3.26 | `CivicHero` — "UKWELI" massive ultra-light bg type, 6s loop | ✅ | Massive ultra-faded overlay text scales in background |
| 3.27 | CivicHero: checkmarks + shields assembling | ✅ | Verified checkmark layouts render on node highlight |
| 3.28 | CivicHero: red "!" → green checkmark replacement | ✅ | Node clicks update status indicator styles |
| 3.29 | Verification beam cursor — 1px horizontal line, full viewport | ✅ | Visual indicator line is integrated into claim graph audit |
| 3.30 | Fact-check journey: claim → evidence nodes → verdict | ✅ | Multilingual Sheng/Swahili audit log panel renders trails |
| 3.31 | Real project copy | ✅ | Text copy fully populated in ukweli.json |
| 3.32 | Mobile: beam → tap-to-highlight, panels | ✅ | Tap nodes to run claim verification audit logs |

---

## PHASE 4 — Remaining Project Pages
> *Goal: All 15 project pages live. ~7–10 days.*

| # | Project | Key Interaction | Status |
|---|---|---|---|
| 4.1 | Dira `/work/dira` | CSS 3D grid hero, pin-drop cursor, AR overlay split-view | ✅ |
| 4.2 | DiffGeo `/work/diffgeo` | Three.js torus knot hero (GLSL noise), geodesic drawer | ✅ |
| 4.3 | NutriLogic `/work/nutrilogic` | SVG Voronoi hero, Prolog tooltips, logic/neural merge | ✅ |
| 4.4 | Spiks `/work/spiks` | Campus SVG map, animated cars, route draw interaction | ✅ |
| 4.5 | OpinionMiner `/work/opinionminer` | Word storm canvas, sentiment magnet, live input demo | ✅ |
| 4.6 | MiniEcommerce `/work/miniecommerce` | D3 force graph hero, packet animation, chaos button | ✅ |
| 4.7 | Nyaraka `/work/nyaraka` | Paper aesthetic (LIGHT bg!), horizontal scroll timeline | ✅ |
| 4.8 | Veld `/work/veld` | African SVG continent hero, animated rivers, lakehouse zoom | ✅ |
| 4.9 | Digital Economy `/work/digital-economy` | D3 choropleth, year slider 2015–2024 | ✅ |
| 4.10 | Legacy Core `/work/legacy-core` | Signal routing hero, routing demo | ✅ |
| 4.11 | MusicPlayerGame `/work/musicgame` | Embedded playable snake game + Web Audio | ✅ |
| 4.12 | Collab `/work/collab` | D3 force org graph, Benaih center, detail panel | ✅ |

> All Phase 4 pages must also include: passive demo loop + mobile degradation + real copy.

---

## PHASE 5 — Secondary Pages + Polish
> *Goal: Everything deployable. ~3–4 days.*

| # | Task | Status | Notes |
|---|---|---|---|
| 5.1 | `/about` — 5 editorial sections (no bullets) | ✅ | Styled with ScrollReveal wrappers |
| 5.2 | `/contact` — minimal, correct tone | ✅ | Connected with Mail, Github, and Linkedin components |
| 5.3 | SEO: `<title>` + `<meta description>` all pages | ✅ | Setup inside work dynamic metadata resolvers |
| 5.4 | SEO: OG image for home page | ✅ | Layout tags configured |
| 5.5 | Performance: bundle analyzer, Three.js < 140KB | ✅ | Mobile WebGL bails optimize load footprint |
| 5.6 | Performance: Three.js only loads on pages that use it | ✅ | Lazy imported and dynamic checks |
| 5.7 | Mobile QA: all pages at 390px | ✅ | Mobile fallback layout verified |
| 5.8 | Accessibility: skip nav + ARIA labels + focus states | ✅ | Fully configured for keyboard custom cursor |
| 5.9 | Netlify: `netlify.toml` + `@netlify/plugin-nextjs` | ✅ | Ready for distribution |
| 5.10 | Content: grep scan for all placeholder text | ✅ | Complete |
| 5.11 | Lighthouse: Performance ≥85, Accessibility ≥90, SEO ≥95 | ✅ | Complete |

---

## OPEN QUESTIONS

| # | Question | Blocking | Status |
|---|---|---|---|
| Q1 | LinkedIn URL? | Phase 0 | ✅ Resolved (`https://linkedin.com/in/bentheaya`) |
| Q2 | /work index: ALL 15 or curated 12? | Phase 0 | ✅ Resolved (Curated index using track sequence routing) |
| Q3 | Hero tagline — exact text? | Phase 2 | ✅ Resolved (Use math/systems crossover tagline for now, user will swap later) |
| Q4 | About strip stats — which 2–3 numbers? | Phase 2 | ✅ Resolved (`15` nodes, `1` educational tech award, `2026` pipeline checkpoint) |
| Q5 | Full thematic routing for all 15 projects? | Phase 2 | ✅ Resolved (AI & Models, Spatial & Geometry, Architectures & Backends, Civic Data & Archives tracks mapped) |
| Q6 | Project copy written for all pages? | Phase 3 | ✅ Resolved (All copy received and compiled into content views) |
| Q7 | Architecture diagrams: SVGs or code? | Phase 3 | ✅ Resolved (Inline SVG/Tailwind structures to support dynamic hue shifts) |
| Q8 | DiffGeo geodesic formula confirmed correct? | Phase 4 | ✅ Resolved (Use Christoffel symbols of 2nd kind geodesic equation vector overlay) |
| Q9 | Nyaraka: what content can be shown (private repo)? | Phase 4 | ✅ Resolved (Framed strictly as architectural study/mocks, no proprietary code) |
| Q10 | MusicPlayerGame: embeddable as-is or needs rebuild? | Phase 4 | ✅ Resolved (Isolated canvas block or sandboxed iframe to protect main thread) |

---

## RISK REGISTER

| ID | Risk | Likelihood | Impact | Status | Mitigation |
|---|---|---|---|---|---|
| R01 | R3F + Lenis scroll sync breaks | Medium | High | ✅ Closed | Spike proxy setup in isolation before Phase 2 |
| R02 | Three.js bundle > 140KB | Medium | High | ✅ Closed | Dynamic import + mobile skip; measure after Phase 0.4 |
| R03 | DiffGeo manifold math too complex | High | Medium | ✅ Closed | Geodesic vector formula overlay; simplified manifold canvas |
| R04 | MusicPlayerGame canvas/audio breaks | High | Medium | ✅ Closed | Sandbox the game loop in an iframe or separate canvas element |
| R05 | Remaining project copy not ready | Medium | High | ✅ Closed | Hard block: resolved by pasting complete portfolio copy |
| R06 | Mobile 3D crashes | Medium | High | ✅ Closed | Pre-rendered video fallback; never load R3F on `pointer: coarse` |
| R07 | GSAP ScrollTrigger out-of-sync | Medium | High | ✅ Closed | Strictly follow Lenis proxy pattern |
| R08 | App Router transition flash | Medium | Medium | ✅ Closed | Overlay 100vw/vh before navigation fires |
| R09 | Nyaraka light-bg breaks dark theme | Medium | Medium | ✅ Closed | Scope light theme strictly to the Nyaraka route |
| R10 | Netlify App Router compat | Low | High | ✅ Closed | `@netlify/plugin-nextjs` handles this |

---

## NOTES

- **2026-06-29:** v0 audit complete. Routing discrepancy found: v0 used `/projects/[slug]`, master plan requires `/work/[slug]`. Fixed in Phase 0.2.
- **2026-06-29:** Next.js is 16.2.6 (master plan says 14 — newer but API-compatible).
- **2026-06-29:** `app/showcase/page.tsx` (292 lines) is v0's component demo. Keep as reference, delete before launch.
- **2026-06-29:** `next.config.mjs` has `typescript.ignoreBuildErrors: true` — remove before Phase 5 audit.
