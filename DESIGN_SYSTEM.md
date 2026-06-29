# Design System Documentation

## Overview

This is a **production-ready design system** built for modern developer portfolios using Next.js 16, Tailwind CSS v4, and custom design tokens. It features a sophisticated dark theme with dynamic accent colors, glass morphism effects, and ultra-clean typography.

---

## Quick Start

### Installation

The design system is already configured in your project. To use it:

1. **Start the dev server:**
   ```bash
   pnpm dev
   ```

2. **View the demo:**
   Visit `http://localhost:3000` to see the design system in action.

### Key Files

- **`app/globals.css`** — All design tokens, utilities, and base styles
- **`app/layout.tsx`** — Root layout with custom fonts (Space Grotesk, JetBrains Mono)
- **`components/layout/shell.tsx`** — Main layout wrapper with header and mobile nav
- **`components/layout/header.tsx`** — Sticky desktop header with glass morphism
- **`components/layout/mobile-nav.tsx`** — Bottom tab bar for mobile devices
- **`app/page.tsx`** — Comprehensive demo showcasing all components and utilities

---

## Color System

### Canvas Colors (Darkest to Lightest)

```css
--color-canvas-bg: rgb(8 8 8);              /* #080808 - Main background */
--color-canvas-elevated: rgb(13 13 13);     /* #0d0d0d - Elevated surfaces */
--color-canvas-card: rgb(20 20 20);         /* #141414 - Cards & panels */
--color-canvas-border: rgb(26 26 26);       /* #1a1a1a - Subtle borders */
```

### Typography Colors

```css
--color-canvas-text: rgb(240 237 232);      /* #f0ede8 - Primary text */
--color-canvas-text-secondary: rgb(160 155 148);  /* Muted text */
--color-canvas-text-tertiary: rgb(120 115 108);   /* Faint text */
```

### Dynamic Accent System (HSL-based)

The accent color is fully dynamic using CSS variables. Change just one hue to update the entire app!

```css
/* Root CSS variables */
--accent-h: 164;        /* Hue (0-360) */
--accent-s: 68%;        /* Saturation */
--accent-l: 55%;        /* Lightness */

/* Generated colors */
--color-accent-bright: hsl(var(--accent-h) var(--accent-s) var(--accent-l));
--color-accent-dim: hsl(var(--accent-h) calc(var(--accent-s) * 0.6) calc(var(--accent-l) * 0.4));
--color-accent-faint: hsl(var(--accent-h) calc(var(--accent-s) * 0.5) calc(var(--accent-l) * 0.15));
```

#### Changing the Accent Color

To change the accent color globally, update the CSS variables in `globals.css`:

```css
:root {
  --accent-h: 264;  /* Change from teal (164) to purple (264) */
  --accent-s: 68%;
  --accent-l: 55%;
}
```

Or dynamically via JavaScript:

```javascript
document.documentElement.style.setProperty('--accent-h', '264');
// The entire app updates instantly!
```

### Suggested Accent Hues

- **Teal/Cyan** (current): `164`
- **Blue**: `224`
- **Purple**: `264`
- **Pink**: `324`
- **Red**: `0`
- **Orange**: `30`
- **Yellow**: `60`
- **Green**: `120`

---

## Typography

### Fonts

- **Space Grotesk** — All headings and display text (weights: 300–700)
- **JetBrains Mono** — Code blocks, metrics, labels, slug text (weights: 300–700)

### Font Sizes & Scales

| Element | Classes | Usage |
|---------|---------|-------|
| h1 | `text-5xl md:text-7xl lg:text-8xl` | Page title, hero |
| h2 | `text-3xl md:text-5xl lg:text-5xl` | Section heading |
| h3 | `text-2xl md:text-3xl` | Subsection heading |
| h4 | `text-xl md:text-2xl` | Small heading |
| h5 | `text-lg md:text-xl` | Tiny heading |
| p | `text-base leading-relaxed` | Body text |
| small | `text-sm text-canvas-text-secondary` | Secondary text |
| code | `font-mono text-sm` | Inline code |

#### Classes Applied to Headings

All `<h1>` through `<h6>` elements automatically include:

```css
@apply font-heading font-bold tracking-tight;
```

---

## Utility Classes

### Surface Variants

```html
<!-- Elevated surface with subtle borders -->
<div class="surface-elevated"></div>

<!-- Card surface -->
<div class="surface-card"></div>

<!-- Accent surface (background + border) -->
<div class="surface-accent"></div>
```

### Glass Morphism

```html
<!-- Full glass effect: blurred elevated surface -->
<div class="glass"></div>

<!-- Light glass: more subtle blur -->
<div class="glass-light"></div>
```

### Text Utilities

```html
<!-- Muted text -->
<p class="text-secondary"></p>

<!-- Faint text -->
<p class="text-tertiary"></p>

<!-- Accent color text -->
<p class="accent-text"></p>
```

### Dynamic Accent Utilities

```html
<!-- Accent colored text -->
<p class="accent-text">Dynamic color!</p>

<!-- Accent background -->
<div class="accent-bg"></div>

<!-- Accent border -->
<div class="accent-border"></div>
```

### Layout Helpers

```html
<!-- Tight container (max-width: 2xl) -->
<div class="container-tight"></div>

<!-- Wide container (max-width: 7xl) -->
<div class="container-wide"></div>

<!-- Responsive padding -->
<div class="responsive-padding"></div>

<!-- Responsive gap -->
<div class="responsive-gap"></div>
```

### Focus States

```html
<button class="focus-ring">
  Click me
</button>
```

### Animations

```html
<!-- Fade in -->
<div class="animate-fadeIn"></div>

<!-- Slide up -->
<div class="animate-slideInUp"></div>

<!-- Slide down -->
<div class="animate-slideInDown"></div>
```

---

## Components

### Shell (Main Layout)

Wraps your entire page with header, mobile nav, and content area.

```tsx
import { Shell } from '@/components/layout/shell'

export default function Page() {
  return (
    <Shell>
      <h1>Welcome</h1>
      <p>Your content here</p>
    </Shell>
  )
}
```

### Header

Sticky desktop header with glass morphism and navigation links.

```tsx
import { Header } from '@/components/layout/header'

<Header />
```

**Features:**
- Fixed positioning (sticky top)
- Glass morphism effect
- Responsive navigation
- Mobile menu with hamburger icon
- Accent colored logo

### Mobile Navigation

Bottom tab bar for mobile devices with icon navigation.

```tsx
import { MobileNav } from '@/components/layout/mobile-nav'

<MobileNav />
```

**Features:**
- Fixed at bottom on mobile only
- Hidden on desktop
- Icon-based navigation
- Active state indication
- Glass morphism effect

---

## Design Tokens Reference

### Spacing Scale

```css
--spacing-xs: 2px;
--spacing-sm: 4px;
--spacing-md: 8px;
--spacing-lg: 12px;
--spacing-xl: 16px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
--spacing-4xl: 48px;
--spacing-5xl: 64px;
```

### Radius Scale

```css
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Shadow Scale

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

---

## Responsive Design

### Breakpoints (Tailwind v4)

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile-First Approach

All components are built mobile-first, then enhanced for larger screens:

```html
<!-- Responsive text size -->
<h1 class="text-3xl md:text-5xl lg:text-6xl">Responsive Heading</h1>

<!-- Responsive layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

---

## Accessibility Features

✓ Semantic HTML structure  
✓ ARIA labels on interactive elements  
✓ Proper heading hierarchy  
✓ Focus states on all interactive elements  
✓ Color contrast meeting WCAG AA standards  
✓ Screen reader support  

### Focus Ring Utility

All interactive elements have accessible focus states:

```css
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-accent-bright/50 focus:ring-offset-2 focus:ring-offset-canvas-bg;
}
```

---

## Form Elements

All form inputs are styled with the design system:

```html
<input type="text" placeholder="Your name" />
<textarea placeholder="Message..."></textarea>
<select>
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

**Auto-applied styles:**
- Canvas-colored background
- Subtle borders
- Focus states with accent color ring
- Disabled states
- Smooth transitions

---

## Customization Guide

### Changing Canvas Colors

Edit the color definitions in `app/globals.css` under `@theme inline`:

```css
@theme inline {
  /* Change these RGB values */
  --color-canvas-bg: rgb(8 8 8);
  --color-canvas-elevated: rgb(13 13 13);
  --color-canvas-card: rgb(20 20 20);
  --color-canvas-border: rgb(26 26 26);
  --color-canvas-text: rgb(240 237 232);
}
```

### Adding New Utilities

All utilities are defined in the `@layer utilities` section of `globals.css`:

```css
@layer utilities {
  .my-custom-utility {
    @apply bg-canvas-elevated rounded-lg p-4;
  }
}
```

### Extending the Typography

Space Grotesk and JetBrains Mono are loaded in `app/layout.tsx`. To add more fonts:

```tsx
import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  variable: '--font-your-font',
  subsets: ['latin'],
})
```

Then add to `@theme inline`:

```css
--font-your-font: var(--font-your-font), 'Fallback';
```

---

## Performance

✓ **Optimized fonts** — Google Fonts with `font-display: swap`  
✓ **CSS-in-JS free** — Pure Tailwind v4  
✓ **Zero JavaScript overhead** — Component styles are pure CSS  
✓ **Fast paint** — Minimal layout shifts, hardware-accelerated animations  
✓ **Mobile optimized** — Bottom navigation avoids viewport jank  

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

---

## Deployment

### Vercel

Deploy with zero configuration:

```bash
vercel deploy
```

### Environment Variables

No environment variables required. All styles are static.

---

## Troubleshooting

### Fonts Not Loading

Ensure `globals.css` is imported in `app/layout.tsx` and font variables are used:

```tsx
<html className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
```

### Accent Color Not Changing

Make sure you're updating the CSS variables in the correct scope:

```javascript
// Global scope
document.documentElement.style.setProperty('--accent-h', '264');

// Or via stylesheet
const style = document.createElement('style');
style.textContent = ':root { --accent-h: 264; }';
document.head.appendChild(style);
```

### Glass Effect Blurry on Mobile

The glass effect uses `backdrop-blur-md`. If it's too intense, use `glass-light` instead:

```html
<div class="glass-light"></div>
```

---

## Best Practices

1. **Use semantic HTML** — Always use `<h1>`, `<p>`, `<button>` instead of divs
2. **Leverage canvas colors** — Use `text-canvas-text`, `bg-canvas-elevated`, etc.
3. **Keep animations subtle** — Use fade and slide-in for micro-interactions
4. **Responsive by default** — Start with mobile, add larger breakpoints
5. **Glass sparingly** — Use glass for headers and key surfaces only
6. **Text hierarchy** — Use heading levels consistently (h1 → h2 → h3)
7. **Focus states** — Never remove focus rings; use `.focus-ring` utility

---

## File Structure

```
app/
├── globals.css              # All design tokens & utilities
├── layout.tsx               # Root layout with fonts
└── page.tsx                 # Demo page

components/
└── layout/
    ├── shell.tsx            # Main layout wrapper
    ├── header.tsx           # Sticky desktop header
    └── mobile-nav.tsx       # Bottom mobile navigation
```

---

## Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Next.js 16 App Router](https://nextjs.org/docs)
- [Space Grotesk Font](https://fonts.google.com/specimen/Space+Grotesk)
- [JetBrains Mono Font](https://fonts.google.com/specimen/JetBrains+Mono)

---

## License

This design system is part of your project and can be used freely.

---

## Support

For issues or improvements, check the component files or customize `globals.css` directly.

---

**Built with ❤️ using Next.js 16, Tailwind CSS v4, and custom design tokens.**
