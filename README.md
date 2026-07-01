# Benaih Shaback Galavu — Personal Portfolio

A cinematic, premium personal portfolio and research showcase designed and developed for **Benaih Shaback Galavu** (B.Sc. Mathematics & Computer Science student at Maseno University). 

This platform bridges pure mathematical logic, neuro-symbolic workflows, and distributed backend systems with highly tactile interactive visual environments.

---

## 🛠️ Technology Stack

*   **Framework:** Next.js 14+ (App Router, TypeScript-first)
*   **Styling:** Tailwind CSS (Vanilla design system tokens)
*   **3D Graphics:** Three.js / React Three Fiber (R3F) / React Three Drei
*   **Animations:** GSAP (GreenSock) / ScrollTrigger / `@gsap/react`
*   **Smooth Scroll:** Lenis (Synchronized GSAP proxy engine)
*   **Icons:** Lucide React

---

## 🌟 Core Systems & Features

### 1. Interactive 3D Constellation Nodes
*   Renders an interactive 18-node constellation graph ([HeroScene.tsx](components/three/HeroScene.tsx) & [ConstellationScene.tsx](components/three/ConstellationScene.tsx)) mapping projects along their specific tracks.
*   Category filter pills highlight matching nodes while gracefully dimming the rest.
*   Scroll-driven camera pullback sweeps camera Z-coordinates dynamically from `Z=5` to `Z=12` based on viewport scroll progress.
*   **Touchscreen Fallback:** Touch devices automatically bypass WebGL elements to load responsive CSS listing cards and grid structures, preventing rendering crashes.

### 2. Custom HSL Accent System
*   Central [HueProvider](components/hue/HueProvider.tsx) React context links document custom variables (`--accent-h`) to `localStorage`.
*   Interactive color wheel ([HueControl.tsx](components/ui/hue-control.tsx)) allows users to drag or use arrow keys to shift the site-wide color hue dynamically.
*   Individual project pages override the global accent variable on mount to lock in project-specific theme highlights (e.g. Red for SlopSlayer, Emerald for UKWELI), and restore user preferences on unmount.
*   Dynamic footer displays a live state token (`// system.hue: X°`).

### 3. Decoupled View Models & Compositor
*   Long-form narrative copy resides inside isolated, lazy-loaded JSON files under `content/projects/`.
*   A dynamic dynamic route compositor ([app/work/[slug]/page.tsx](app/work/%5Bslug%5D/page.tsx)) reads from a single source of metadata ([lib/projects.ts](lib/projects.ts)) to pre-generate routes, merge copy parameters, and compose custom layouts.

### 4. Custom Cursor & Page Transitions
*   **Dual-Element Cursor:** dot (6px) and lagging outer ring (28px) lerp smoothly using `requestAnimationFrame`, changing styles (scaling up, filling backgrounds, disappearing) on link hover and clicking states.
*   **ScaleX Wipe Overlay:** Transition wipes intercept link clicks, using the cursor X click position as the transform-origin point to sweep pages away, performing routing operations behind the veil.
*   **Mobile / Reduced-Motion:** Gracefully falls back to simple opacity crossfades.

### 5. Interactive Flagship Demos
*   **SlopSlayer:** An interactive frame-by-frame deepfake classifier sweeping frames with a laser line scan, highlighting synthetic anomalies.
*   **IntuiLab:** A physics resonant wave simulator mapping sinusoidal nodes to a Socratic tutoring chat panel that nudges learners with hints instead of equations.
*   **UKWELI:** A Swahili claim verification audit tracer showing propagation node links and fact-check verdict trails.

---

## 📐 Mathematical Formulation

The portfolio highlights curved manifolds and differential-geometric trajectories. Vector curves in spatial metrics are governed by the geodesic equation of vanishing acceleration under Christoffel symbols of the second kind:

$$\frac{d^2 x^\mu}{d\tau^2} + \Gamma^\mu_{\nu\lambda} \frac{dx^\nu}{d\tau} \frac{dx^\lambda}{d\tau} = 0$$

This geodesic vector formula is overlaid inside the Differential-Geometric Similarity Metric case study.

---

## 📂 Project Directory Structure

```bash
├── app/                      # Next.js App Router Pages
│   ├── about/                # Editorial profile page
│   ├── contact/              # Contact ingress page with system hue indicator
│   ├── work/                 # Work index page & dynamic slug case study routes
│   ├── globals.css           # Vanilla CSS custom variables and animations
│   ├── layout.tsx            # Global SEO configuration and providers wrapper
│   └── page.tsx              # Asymmetric layout landing page
├── components/
│   ├── animations/           # GSAP Magnetic and ScrollReveal wrappers
│   ├── cursor/               # CustomCursor desktop rendering loop
│   ├── hue/                  # HSL color provider and storage listeners
│   ├── layout/               # Shell, Header, MobileNav, and Lenis providers
│   ├── project/              # Case study templates and SVG sandbox demos
│   ├── sections/             # Home page featured blocks & constellation grids
│   ├── three/                # Three.js / React Three Fiber scene orchestrators
│   └── ui/                   # Reusable typography and HueControl color wheel
├── content/projects/         # Decoupled project copy JSON view models
├── lib/
│   ├── animations.ts         # GSAP SplitText character reveals
│   ├── lenis.ts              # Lenis smooth scroll ticker proxy
│   └── projects.ts           # Lightweight metadata configuration & loader
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   pnpm, npm, or yarn

### Installation
1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the local development server:
   ```bash
   pnpm dev
   ```

3. Build the production package:
   ```bash
   pnpm build
   ```

---

## 📜 License
MIT License. Created by Benaih Shaback Galavu.
