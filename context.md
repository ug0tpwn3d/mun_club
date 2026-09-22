# SKIT MUN CLUB — Project Context
> Last updated: 2026-09-23 · Git HEAD: `b8a79f5`  
> For: future AI sessions, new developers, or continuation after a long break.

---

## 1. Project Identity

| Key | Value |
|-----|-------|
| **Organization** | SKIT MUN CLUB |
| **Full name** | Swami Keshvanand Institute of Technology, M&G, Jaipur |
| **Flagship conference** | ARAMBH MUN 2026 |
| **Conference date** | October 23rd, 2026 |
| **Venue** | Kautaliya Seminar Hall, MBA Block, SKIT, Jaipur |
| **Email** | skit.mun.club@gmail.com |
| **Club est.** | 2020 |
| **Website type** | Static HTML/CSS/JS — no build step, no framework |

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | Vanilla HTML5 |
| Styling | Vanilla CSS (`style.css` global + `404.css` for content pages) |
| Animation | GSAP 3.12.5 (ScrollTrigger, ScrollToPlugin) via CDN |
| Smooth scroll | Lenis 1.0.42 via CDN |
| Fonts | Fraunces (serif display) + Space Grotesk (sans body) + Covered By Your Grace (logo) via Google Fonts |
| Hosting targets | Apache (`.htaccess`), Netlify (`_redirects`), Vercel (`vercel.json`) |
| Version control | Git — branch `update_v1` |

**There is no package.json, no bundler, no Node.js.** Open `index.html` directly in a browser or serve with any static server (e.g. `npx serve .`).

---

## 3. File Tree

```
mun_club/
├── index.html                    # Homepage (hero, manifesto, committees, conference, secretariat, register)
├── 404.html                      # Custom 404 error page
├── 404.css                       # Styles for 404 + shared content page utilities (error-body, content-wrapper, etc.)
├── 404.js                        # 404 parallax mouse interaction
├── style.css                     # Global design system (all pages share this)
├── script.js                     # Global JS (GSAP, Lenis, mobile nav, interactions)
├── .htaccess                     # Apache: 404 → /404.html
├── _redirects                    # Netlify: 404 routing
├── vercel.json                   # Vercel: clean URLs + 404 routing
│
├── pages/
│   ├── about.html                # Manifesto & Mission (uses error-body scaffold + 404.css)
│   ├── committees.html           # Chambers matrix detail page
│   ├── contact.html              # Contact form / info
│   ├── faq.html                  # FAQ accordion
│   ├── leadership.html           # ★ Leadership Message (standalone, full-content, 3 sections)
│   ├── media.html                # Gallery + Highlights + Press (3 sections, IDs: #gallery #videos #press)
│   ├── registration.html         # Registration form page
│   ├── resources.html            # Resources hub (links to /resources/ articles)
│   ├── schedule.html             # Conference day schedule
│   └── secretariat.html         # ★ Secretariat team page (rebuilt with page-hero + CTA strip)
│
├── resources/
│   ├── rules.html                # Rules of Procedure guide
│   ├── position-paper.html       # Position Paper guide
│   ├── resolution-writing.html   # Resolution Writing guide
│   └── articles/
│       ├── what-is-mun.html
│       ├── first-mun.html
│       ├── country-research.html
│       ├── public-speaking.html
│       ├── negotiation.html
│       ├── lobbying.html
│       ├── dress-code.html
│       ├── conference-checklist.html
│       ├── crisis-committee.html
│       ├── advanced-strategies.html
│       ├── international-press.html
│       ├── aippm.html
│       ├── unga.html
│       ├── unhrc.html
│       └── unsc.html
│
├── conference/
│   └── arambh-mun-2026/
│       └── index.html            # Dedicated conference page (for archival/expanded info)
│
├── directory/
│   └── index.html                # Future MUN directory listing
│
├── blog/                         # Placeholder — no posts yet
├── media/                        # Placeholder for uploaded media files
│
├── assets/
│   ├── icons/
│   │   └── club_logo.jpeg        # ★ Canonical logo path — used everywhere
│   ├── images/logo/club_logo.jpeg # Duplicate (legacy) — do not add new references here
│   └── documents/                # Placeholder for PDFs (study guides, etc.)
│
├── data/                         # Structured JS data files (not yet wired to HTML)
│   ├── site.js                   # Site metadata
│   ├── committees.js             # Committee data
│   ├── conference.js             # Conference info
│   ├── team.js                   # Secretariat team data
│   ├── schedule.js               # Day schedule
│   ├── faq.js                    # FAQ entries
│   ├── resources.js              # Resource links
│   └── directory.js             # MUN directory data
│
├── css/
│   └── variables.css             # Partial CSS variables file (not imported — legacy)
│
├── Design.md                     # Design system spec
├── Requirements.md               # Full project requirements
├── architecture.md               # Architectural decisions
├── README.md                     # Repo overview
└── context.md                    # ← This file
```

---

## 4. Design System

### 4.1 CSS Variables (`:root` in `style.css`)

```css
--black: #0a0a0b          /* Page background */
--black-2: #131316        /* Cards, elevated surfaces */
--orange: #ff6a1a         /* Brand accent — buttons, borders, highlights */
--orange-soft: #ff8c42    /* Hover state for orange elements */
--cream: #f4ede1          /* Primary text on dark bg */
--cream-dim: #b8b0a1      /* Secondary text, labels, meta */
--saffron: #ff9933        /* Indian flag reference (reserved) */
--green: #138808          /* Indian flag reference (reserved) */
--line-soft:              /* color-mix(cream 12%, transparent) — dividers */
--line-orange:            /* color-mix(orange 45%, transparent) — orange borders */
--font-serif: 'Fraunces'
--font-sans: 'Space Grotesk'
--font-logo: 'Covered By Your Grace'  /* Active logo font (comment in style.css to switch) */
--ease-out: cubic-bezier(.6, 0, .2, 1)
```

**Rule:** No hex codes anywhere except inside `:root`. Use `var()` everywhere else.

### 4.2 Typography

| Use | Font | Weight |
|-----|------|--------|
| Display headings | Fraunces | 900 |
| Body serif | Fraunces | 300–700 |
| Body sans / labels / nav | Space Grotesk | 300–700 |
| Logo | Covered By Your Grace | 400 |

### 4.3 Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.nav` | Global sticky navbar (top: 1.85rem to sit below ticker) |
| `.nav--scrolled` | Glassmorphic backdrop triggered by JS scroll |
| `.ticker` | Fixed orange announcement bar (z-index: 101) |
| `.section-label` | Uppercase small orange label with horizontal rule |
| `.sec-card` | Secretariat person card |
| `.sec-grid--row` | 4-column student card row (desktop) |
| `.secretariat--standalone` | Extra padding for standalone secretariat page |
| `.error-body` | Body class for all content pages using 404.css scaffold |
| `.content-wrapper` | Max-width 860px centered text container |
| `.error-btn-primary` | Solid orange CTA button |
| `.error-btn-secondary` | Outlined ghost button |
| `.comm-card` | Committee card (horizontal scroll on desktop) |
| `.nav-toggle` | Hamburger button (injected by script.js) |
| `.mobile-open` | Added to `.nav-links` when mobile menu is open |
| `.page-hero` | Page hero used on secretariat.html |
| `.lm-hero`, `.lm-body`, `.lm-sidebar`, `.lm-prose` | Leadership page layout classes |

---

## 5. Navigation Structure

All pages share an identical `<nav>` block. The structure is:

```
Home
About ▾
  ├─ Manifesto & Mission       → /pages/about.html
  ├─ Secretariat               → /pages/secretariat.html
  └─ Leadership Message        → /pages/leadership.html
Guides ▾
  ├─ Chambers Matrix           → /pages/committees.html
  ├─ Rules of Procedure        → /resources/rules.html
  ├─ Position Papers           → /resources/position-paper.html
  └─ Resolution Writing        → /resources/resolution-writing.html
Media ▾
  ├─ Gallery                   → /pages/media.html#gallery
  ├─ Highlights                → /pages/media.html#videos
  └─ Press                     → /pages/media.html#press
FAQ                            → /pages/faq.html
Schedule                       → /pages/schedule.html
Contact                        → /pages/contact.html
[Register]                     → /pages/registration.html  ← CTA button
```

**Registrations Closed state:** In `index.html` nav, there is a commented-out `nav-cta--closed` button. Uncomment it and comment out the active Register button to switch to "Registrations Closed" state.

---

## 6. script.js — What It Does

All JS lives in one file (`script.js`) loaded globally. Key sections:

| Section | Details |
|---------|---------|
| GSAP setup | Registers ScrollTrigger + ScrollToPlugin |
| Lenis | Smooth scroll with `lerp: 0.09`, feeds into ScrollTrigger |
| Hamburger nav | IIFE — injects `.nav-toggle` button into `.nav`; toggles `.mobile-open` on `.nav-links`; locks body scroll when open |
| Anchor scroll | Lenis smooth-scroll for `href="#..."` links |
| Custom cursor | Orange dot + lagging ring (hidden on touch devices via CSS `@media (hover: none)`) |
| Preloader | GSAP timeline: logo fade → tag fade → wipe up → hero title reveal |
| Committees pin | GSAP horizontal scroll with pin — **desktop only** (`window.innerWidth > 768`) |
| Committee tilt | 3D tilt on `.comm-card` mousemove |
| Conference date fill | `.conference-date` fills orange when `#confOutreach` enters view (trigger: `top 65%`, end: `bottom 30%`) |
| Manifesto reveal | Word-by-word scrub opacity reveal on `#manifestoText` |
| Stats count-up | `data-count` attribute drives animated counter |
| Secretariat reveal | `.sec-card` slide-up — guarded with `if (secCards.length)` |
| Register entrance | `.register-giant` + `.register-form` slide-up — guarded |
| Register submit | Fake submit → inline success message — guarded with `if (regForm)` |
| Section labels | Fade-in-left on `.section-label` elements |
| Resize | `ScrollTrigger.refresh()` on resize |

---

## 7. Commentable Blocks (content on/off switches)

### Committee Cards (`index.html` ~line 155)
Each card is wrapped:
```html
<!-- CARD: UNGA DISEC (Beginner) -->
<article class="comm-card" ...> ... </article>
<!-- /CARD: UNGA DISEC -->
```
Comment out any card to remove it from the home page carousel. The same cards must be updated manually in `/pages/committees.html`.

### Student Co-ordinators (`index.html` + `secretariat.html`)
The entire student team block is wrapped:
```html
<!-- STUDENT CO-ORDINATORS — comment out this entire block when not displaying student team -->
<div class="sec-group"> ... </div>
<!-- /STUDENT CO-ORDINATORS -->
```
Each student is individually wrapped inside with `<!-- STUDENT: Name -->`.

### Registration CTA (`index.html` nav)
```html
<!-- Registrations Closed state (uncomment when closed):
<a class="nav-cta nav-cta--closed" ...>Registrations Closed</a>
-->
```

---

## 8. 404 Handling

For all three common hosting environments:

| Host | File | Rule |
|------|------|------|
| Apache | `.htaccess` | `ErrorDocument 404 /404.html` |
| Netlify | `_redirects` | catch-all → `/404.html 404` |
| Vercel | `vercel.json` | filesystem-first, then `/(.*) → /404.html (404)` |

The `404.html` page uses its own `404.js` (mouse parallax on the `404` number text) and does **not** load `script.js` (no GSAP/Lenis needed).

---

## 9. Logo / Media

- **Canonical logo path:** `/assets/icons/club_logo.jpeg`
- Used in: preloader, nav badge, footer, and meta
- All `src="#"` photo placeholders on sec-cards hide themselves via `img[src="#"] { display: none }` in style.css
- `assets/images/logo/club_logo.jpeg` is a legacy duplicate — do not create new references to it

---

## 10. Content Pages Pattern (about.html scaffold)

Pages like `about.html`, `faq.html`, `schedule.html`, etc. use a shared scaffold from `404.css`:

```html
<body class="error-body">
  ...ticker...
  ...nav...
  <main class="error-container">
    <div class="content-wrapper">
      <!-- content here -->
      <div class="error-actions actions-left">
        <a href="..." class="error-btn-primary">...</a>
        <a href="..." class="error-btn-secondary">...</a>
      </div>
    </div>
  </main>
  <footer class="footer">...</footer>
</body>
```

`secretariat.html` and `leadership.html` use their own bespoke page layouts (`.page-hero`, `.lm-hero`, etc.) defined in inline `<style>` blocks within those pages.

---

## 11. Mobile Responsiveness

Breakpoints in `style.css`:

| Breakpoint | Scope |
|-----------|-------|
| `≤768px` | Nav (hamburger), hero, manifesto, committees (stacked), conference (1-col), secretariat, register, page heroes |
| `≤900px` | Conference grid, sec-grid--row (2-col) |
| `≤1024px` | sec-grid--row (2-col tablet) |
| `≤640px` | Form rows (1-col) |
| `≤600px` | Footer (stacked), marquee font |
| `≤480px` | sec-grid--row (1-col) |

The GSAP committee horizontal pin is disabled on `window.innerWidth <= 768` — cards stack vertically via CSS instead.

---

## 12. Data Layer (`/data/`)

Structured JS files exist but are **not yet wired to the HTML pages**. They contain static arrays/objects for committees, team, schedule, FAQ, etc. Future work: either wire them via `<script>` imports with DOM injection, or migrate to a build step.

| File | Content |
|------|---------|
| `data/committees.js` | Committee objects (name, difficulty, description) |
| `data/team.js` | Secretariat members |
| `data/schedule.js` | Day-of schedule items |
| `data/faq.js` | FAQ question/answer pairs |
| `data/conference.js` | Conference metadata |
| `data/resources.js` | Resource article links |
| `data/directory.js` | Future MUN directory entries |
| `data/site.js` | Global site metadata |

---

## 13. Known TODOs / Deferred Work

| Item | Notes |
|------|-------|
| Real photos for sec-cards | All `src="#"` — upload photos to `assets/images/` and update src |
| Wire `data/` files to pages | Currently static HTML only |
| `blog/` directory | No blog posts yet — placeholder exists |
| `media/` directory | No media files yet |
| Instagram link | Footer `href="#"` — update when handle confirmed |
| Source link | Footer `href="#"` — update with GitHub repo URL |
| Registration form | Currently fake submit — wire to backend/Formspree/Google Forms |
| `assets/images/logo/club_logo.jpeg` | Legacy duplicate — can be deleted once confirmed safe |
| `conference/arambh-mun-2026/index.html` | Expanded conference page — partially built |
| `directory/index.html` | MUN directory — stub exists, no real data |
| Mobile nav close on outside click | Currently only closes on link click, not backdrop tap |

---

## 14. Git History

```
b8a79f5  feat: mobile responsive nav, 404 routing, cross-links, leadership page
41b4a98  Implement complete educational taxonomy guides, expand documentation and update resources hub
594d2c3  feat: complete website architecture, original content pages, and structured data
b8b0784  refactor: move club_logo.jpeg to assets/icons and update all image references
2bbbd62  feat: construct complete page architecture, unlinked nav routes, resources guides, and data layer
f879b1d  feat: update nav with dropdowns, faq, contact, and updated requirements
0b77a44  chore: save working state before update_v1
```

---

## 15. Rules & Constraints (enforced through the project)

1. **No copying Delhi MUN content** — all copy is original SKIT MUN / ARAMBH MUN content
2. **HTML owns structure** — content lives in HTML, not JS or CSS
3. **CSS owns layout/color** — no inline styles on content elements
4. **JS owns interactions** — scroll animations, toggles, counters
5. **All hex codes only in `:root`** — use `var()` everywhere else
6. **Media src="#" is intentional** — photos pending; `img[src="#"]` hides itself via CSS
7. **No framework, no build step** — keep it plain HTML/CSS/JS
