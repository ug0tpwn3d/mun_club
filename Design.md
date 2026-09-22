# SKIT MUN CLUB — Design System & Language (Design.md)

## 1. Design Philosophy
The design language is rooted in **diplomatic editorial elegance**: high-contrast dark mode, restrained color highlights, sharp typography pairing, and geometric accents reminiscent of official treaties, placards, and parliamentary documents.

## 2. Design Tokens

All colors are strictly derived from `:root` variables without inline CSS or scattered hex codes:

```css
:root {
    --black: #0a0a0b;
    --black-2: #131316;
    --orange: #ff6a1a;
    --orange-soft: #ff8c42;
    --cream: #f4ede1;
    --cream-dim: #b8b0a1;
    --saffron: #ff9933;
    --green: #138808;
    --line-soft: color-mix(in srgb, var(--cream) 12%, transparent);
    --line-orange: color-mix(in srgb, var(--orange) 45%, transparent);
    --font-serif: 'Fraunces', serif;
    --font-sans: 'Space Grotesk', sans-serif;
    --ease-out: cubic-bezier(.6, 0, .2, 1);
}
```

### Color Usage
- **Primary Background**: `var(--black)` / `var(--black-2)` for depth and contrast.
- **Accents & Highlights**: `var(--orange)` for brand identity, borders, indicators, and buttons.
- **Text & Surfaces**: `var(--cream)` for primary headlines and light chambers, `var(--cream-dim)` for secondary descriptions and micro-labels.
- **Tonal Mixes**: `color-mix(in srgb, ...)` for subtle glassmorphism and frosted transparencies without hardcoded opacity hexes.

## 3. Typography
- **Headings & Display**: `Fraunces` (Serif, variable weights 300–900). Conveys authority, parliamentary procedure, and historic diplomacy.
- **Body & Metadata**: `Space Grotesk` (Sans-serif, monospace-adjacent feel). Used for uppercase subheaders, dates, tracker texts, and badges.

## 4. UI Patterns & Components

### 4.1 Navigation & Brand Emblem
- Octagonal chamfered emblem (`clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)`) framed in subtle orange.
- Micro-interaction: `scale(1.08) rotate(3deg)` on hover.
- Glassmorphic backdrop blur (`12px`) engaged smoothly upon scrolling past 50px.

### 4.2 Buttons
- **Active CTA**: Solid `var(--orange)` background with 2px `var(--cream)` border, uppercase bold typography, and elevation hover.
- **Closed State (Reference)**: Muted transparent surface (`color-mix(in srgb, var(--cream) 18%, transparent)`), disabled cursor, and lock icon indicator.

### 4.3 Secretariat Leadership Cards
- **Faculty Section**: Centered layout with balanced dividing lines and centered card alignment.
- **Student Section**: 4-column single row on desktop (`repeat(4, minmax(0, 1fr))`) ensuring symmetrical side-by-side presentation.
- **Card Structure**:
  - Indicator flag bar (`height: 6px; background: var(--orange)`).
  - Square photo canvas (`aspect-ratio: 1/1`) with dashed standby border when unoccupied.
  - Category tag in uppercase letter-spaced orange text.
  - Serif candidate name (`font-family: var(--font-serif)`).
  - Bold department and semester designation (`.sec-pos`).
  - Editorial italicized quote (`font-style: italic !important`).

### 4.4 Motion & Micro-interactions
- **Lenis Smooth Scroll**: Inertial scrolling coupled with GSAP ScrollTrigger.
- **Text Shimmer**: Linear gradient text clip animation on the hero subtext (`hero-shimmer 4s linear infinite`).
- **Elevations**: Hover lifts (`translateY(-4px)`) and subtle dark ambient box shadows for clickable elements.

## 5. Implementation Rules
1. **No Inline Styles**: Never use `style="..."` in HTML templates.
2. **No Scattered Hex Codes**: Hex values must remain exclusively within `:root`.
3. **Responsive Degradation**: All horizontal rows and multi-column grids collapse progressively from desktop down to mobile viewports.
