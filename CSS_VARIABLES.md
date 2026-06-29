# CSS Variables Quick Reference

## Dynamic Accent System

Change the hue to instantly update the entire application's accent color.

```css
/* Located in: app/globals.css > :root */
--accent-h: 164;    /* Hue: 0-360 (currently teal) */
--accent-s: 68%;    /* Saturation */
--accent-l: 55%;    /* Lightness */
```

### Change Accent Via CSS

Edit `app/globals.css`:

```css
:root {
  --accent-h: 264;  /* Change to purple */
  --accent-s: 68%;
  --accent-l: 55%;
}
```

### Change Accent Via JavaScript

```javascript
// Set to purple (264°)
document.documentElement.style.setProperty('--accent-h', '264');

// Set to blue (224°)
document.documentElement.style.setProperty('--accent-h', '224');

// Set to pink (324°)
document.documentElement.style.setProperty('--accent-h', '324');
```

### Accent Hue Palette

| Color | Hue | Example |
|-------|-----|---------|
| Teal (current) | 164 | `hsl(164 68% 55%)` |
| Cyan | 180 | `hsl(180 68% 55%)` |
| Blue | 224 | `hsl(224 68% 55%)` |
| Purple | 264 | `hsl(264 68% 55%)` |
| Magenta | 290 | `hsl(290 68% 55%)` |
| Pink | 324 | `hsl(324 68% 55%)` |
| Red | 0 | `hsl(0 68% 55%)` |
| Orange | 30 | `hsl(30 68% 55%)` |
| Yellow | 60 | `hsl(60 68% 55%)` |
| Lime | 90 | `hsl(90 68% 55%)` |
| Green | 120 | `hsl(120 68% 55%)` |

---

## Canvas Colors

Core dark theme palette. Located in `app/globals.css` > `:root` section.

```css
--color-canvas-bg: rgb(8 8 8);                    /* #080808 */
--color-canvas-elevated: rgb(13 13 13);           /* #0d0d0d */
--color-canvas-card: rgb(20 20 20);               /* #141414 */
--color-canvas-border: rgb(26 26 26);             /* #1a1a1a */
--color-canvas-text: rgb(240 237 232);            /* #f0ede8 */
--color-canvas-text-secondary: rgb(160 155 148);  /* Muted */
--color-canvas-text-tertiary: rgb(120 115 108);   /* Faint */
```

### Using Canvas Colors in Tailwind

```html
<!-- Background -->
<div class="bg-canvas-bg">Background</div>
<div class="bg-canvas-elevated">Elevated</div>
<div class="bg-canvas-card">Card</div>

<!-- Text -->
<p class="text-canvas-text">Primary text</p>
<p class="text-canvas-text-secondary">Secondary text</p>
<p class="text-canvas-text-tertiary">Faint text</p>

<!-- Borders -->
<div class="border border-canvas-border">Bordered</div>
```

---

## Typography Colors

Used for text emphasis and hierarchy.

```css
--color-canvas-text: rgb(240 237 232);            /* Primary text */
--color-canvas-text-secondary: rgb(160 155 148);  /* ~60% opacity feel */
--color-canvas-text-tertiary: rgb(120 115 108);   /* ~40% opacity feel */
```

### Text Utility Classes

```html
<!-- Primary (default) -->
<p class="text-canvas-text">Primary text</p>

<!-- Secondary (muted) -->
<p class="text-canvas-text-secondary">Secondary</p>

<!-- Tertiary (faint) -->
<p class="text-canvas-text-tertiary">Tertiary</p>

<!-- Via utility aliases -->
<p class="text-secondary">Secondary</p>
<p class="text-tertiary">Tertiary</p>
```

---

## Accent Colors (Generated)

Automatically derived from `--accent-h`, `--accent-s`, `--accent-l`. Located in `@theme inline`.

```css
--color-accent-bright: hsl(var(--accent-h) var(--accent-s) var(--accent-l));
--color-accent-dim: hsl(var(--accent-h) calc(var(--accent-s) * 0.6) calc(var(--accent-l) * 0.4));
--color-accent-faint: hsl(var(--accent-h) calc(var(--accent-s) * 0.5) calc(var(--accent-l) * 0.15));
```

### Using Accent Colors

```html
<!-- Bright accent -->
<button class="bg-accent-bright text-canvas-bg">Button</button>
<p class="text-accent-bright">Accent text</p>

<!-- Dim accent (hover state) -->
<a class="text-accent-dim">Link</a>

<!-- Faint accent (background) -->
<div class="bg-accent-faint">Subtle background</div>

<!-- Via dynamic utility classes -->
<p class="accent-text">Dynamic accent color</p>
<div class="accent-bg">Dynamic accent background</div>
<div class="accent-border">Dynamic accent border</div>
```

---

## Spacing Scale

Located in `app/globals.css` > `:root` section.

```css
--spacing-xs: 2px;      /* 0.125rem */
--spacing-sm: 4px;      /* 0.25rem */
--spacing-md: 8px;      /* 0.5rem */
--spacing-lg: 12px;     /* 0.75rem */
--spacing-xl: 16px;     /* 1rem */
--spacing-2xl: 24px;    /* 1.5rem */
--spacing-3xl: 32px;    /* 2rem */
--spacing-4xl: 48px;    /* 3rem */
--spacing-5xl: 64px;    /* 4rem */
```

### Using Spacing

Use standard Tailwind spacing utilities (automatically scaled):

```html
<!-- Padding -->
<div class="p-4">Padding (16px)</div>
<div class="px-6 py-4">Horizontal 24px, Vertical 16px</div>

<!-- Margin -->
<div class="mb-8 mt-4">Margin bottom 32px, top 16px</div>

<!-- Gap -->
<div class="flex gap-4">Gap 16px</div>
<div class="grid gap-6">Gap 24px</div>
```

---

## Radius Scale

Located in `app/globals.css` > `@theme inline` section.

```css
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Using Radius

```html
<!-- Radius classes -->
<div class="rounded-sm">2px radius</div>
<div class="rounded">8px radius (default)</div>
<div class="rounded-lg">12px radius</div>
<div class="rounded-xl">16px radius</div>
<div class="rounded-full">Fully rounded (circle)</div>
```

---

## Shadow Scale

Located in `app/globals.css` > `:root` section.

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Using Shadows

```html
<div class="shadow-sm">Subtle shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
```

---

## Font Variables

Located in `app/globals.css` > `@theme inline` section.

```css
--font-heading: var(--font-space-grotesk), 'Space Grotesk Fallback';
--font-sans: var(--font-space-grotesk), 'Space Grotesk Fallback';
--font-mono: var(--font-jetbrains-mono), 'JetBrains Mono Fallback';
```

### Font Family Classes

```html
<!-- Heading (Space Grotesk) -->
<h1 class="font-heading">Heading</h1>

<!-- Sans (Space Grotesk) -->
<p class="font-sans">Default sans-serif</p>

<!-- Mono (JetBrains Mono) -->
<code class="font-mono">Code</code>
```

---

## Line Height & Leading

Tailwind's line height scale (used for optimal readability):

```html
<p class="leading-none">1 (tight)</p>
<p class="leading-tight">1.25</p>
<p class="leading-snug">1.375</p>
<p class="leading-relaxed">1.625 (body text)</p>
<p class="leading-loose">2</p>
```

**Recommended:**
- Headings: `leading-tight` or `leading-none`
- Body text: `leading-relaxed`
- Small text: `leading-snug`

---

## Box Shadows & Glass Effects

Special utility classes for visual depth.

```html
<!-- Glass morphism (frosted glass) -->
<div class="glass">Full glass effect</div>
<div class="glass-light">Subtle glass effect</div>

<!-- Surface variants -->
<div class="surface-elevated">Elevated surface</div>
<div class="surface-card">Card surface</div>
<div class="surface-accent">Accent surface</div>
```

---

## Animation Variables

Located in `app/globals.css` > `@layer utilities` section.

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Animation Classes

```html
<div class="animate-fadeIn">Fades in</div>
<div class="animate-slideInUp">Slides up</div>
<div class="animate-slideInDown">Slides down</div>
```

**Duration:** 0.3s ease-out (can be extended with Tailwind animation utilities)

---

## Scrollbar Styling

Automatically styled for the design system. Located in `app/globals.css` > scrollbar styling section.

**Desktop (Chrome, Safari, Edge):**
- Track: `rgb(13 13 13)` (canvas-elevated)
- Thumb: `hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.5)`
- Hover: `hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.8)`

**Firefox:**
- Color: `hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.5)`
- Track: `rgb(13 13 13)`

No additional configuration needed!

---

## Selection Styling

Text selection automatically uses the accent color.

```css
::selection {
  background-color: hsl(var(--accent-h) var(--accent-s) var(--accent-l) / 0.25);
  color: rgb(240 237 232);
}
```

No additional configuration needed!

---

## Sidebar Colors (shadcn/ui Compat)

Automatically mapped to the design system:

```css
--color-sidebar: var(--canvas-elevated);
--color-sidebar-foreground: var(--canvas-text);
--color-sidebar-primary: var(--accent-bright);
--color-sidebar-accent: var(--accent-bright);
--color-sidebar-border: var(--canvas-border);
```

---

## Chart Colors (shadcn/ui Compat)

Used for data visualization:

```css
--color-chart-1: var(--accent-bright);          /* Primary */
--color-chart-2: var(--accent-dim);             /* Secondary */
--color-chart-3: var(--canvas-text-secondary);  /* Tertiary */
--color-chart-4: var(--canvas-text-tertiary);   /* Quaternary */
--color-chart-5: var(--canvas-border);          /* Quinary */
```

---

## Complete Variable Override Example

To customize all colors globally, update `:root` in `app/globals.css`:

```css
:root {
  /* Accent system */
  --accent-h: 224;        /* Blue */
  --accent-s: 75%;
  --accent-l: 50%;

  /* Canvas colors */
  --color-canvas-bg: rgb(10 10 10);
  --color-canvas-elevated: rgb(15 15 15);
  --color-canvas-card: rgb(22 22 22);
  --color-canvas-border: rgb(28 28 28);
  --color-canvas-text: rgb(245 245 240);
  --color-canvas-text-secondary: rgb(165 160 153);
  --color-canvas-text-tertiary: rgb(125 120 113);

  /* Spacing */
  --spacing-md: 10px;  /* Adjust from 8px */
  --spacing-lg: 14px;  /* Adjust from 12px */
}
```

All Tailwind utilities will automatically use the new values!

---

## Performance Notes

✓ All variables use native CSS (zero runtime overhead)  
✓ Dynamic accent system uses HSL color space (hardware accelerated)  
✓ No CSS-in-JS or JavaScript processing  
✓ Variables are applied at compile time and runtime  
✓ Scrollbar and selection styling use `::-webkit` and standard selectors  

---

**For detailed usage examples, see `DESIGN_SYSTEM.md`**
