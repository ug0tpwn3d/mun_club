# SKIT MUN CLUB — Requirements Document

## 1. Project Overview

A modern web platform for the SKIT Model United Nations Club (Jaipur).

The website serves two purposes:

1. The official digital presence of the SKIT MUN CLUB and its flagship conference, ARAMBH MUN.
2. A broader MUN information platform containing delegate resources, educational guides, conference listings, and location-based MUN discovery.

The platform should maintain a premium diplomatic/editorial aesthetic while remaining fast, accessible, responsive, SEO-friendly, and easy to maintain.

---

# 2. Site Architecture

## 2.1 Primary Navigation

The global navigation should provide access to:

- **Home** (`/` or `#hero`)
- **About** (with dropdown):
  - Overview / Manifesto (`#about` or `/about`)
  - Secretariat (`#secretariat` or `/secretariat`)
  - Executive Board (`/executive-board`)
- **Guides** (with dropdown):
  - Delegate Resources (`/resources`)
  - Rules of Procedure (`/resources/procedure`)
  - Position Paper Guide (`/resources/writing`)
  - Committee Guides (`/resources/committee-guides`)
- **Media** (with dropdown):
  - Gallery (`/media/gallery`)
  - Videos (`/media/videos`)
  - Press Releases (`/media/press`)
- **FAQ** (`#faq` or `/faq`)
- **Contact** (`#contact` or `/contact`)
- **Register** (Action CTA button)

The exact visible navigation may collapse into a mobile menu on smaller screens.

---

## 2.2 URL Structure

### Core Pages

- `/`
- `/about`
- `/conference`
- `/committees`
- `/secretariat`
- `/schedule`
- `/venue`
- `/registration`
- `/contact`

### Conference Pages

- `/conference/arambh-mun-2026`
- `/conference/arambh-mun-2026/committees`
- `/conference/arambh-mun-2026/schedule`
- `/conference/arambh-mun-2026/venue`
- `/conference/arambh-mun-2026/registration`

### Delegate Resources

- `/resources`
- `/resources/beginner`
- `/resources/advanced`
- `/resources/procedure`
- `/resources/research`
- `/resources/writing`
- `/resources/committee-guides`

Individual resources should use:

- `/resources/[article-slug]`

### MUN Directory

- `/directory`
- `/directory/[conference-slug]`
- `/directory/city/[city]`
- `/directory/state/[state]`

Optional locality-level pages:

- `/directory/city/[city]/[locality]`

### Editorial / Blog

- `/blog`
- `/blog/[article-slug]`

### Media

- `/media`
- `/media/gallery`
- `/media/videos`
- `/media/press`
- `/media/press/[article-slug]`

### Legal

- `/privacy-policy`
- `/terms-of-service`
- `/refund-policy`

---

# 3. Core Functional & UI Requirements

## 3.1 Navigation & Announcement Ticker

- **Ticker Bar**: Sticky announcement banner at the very top (`top: 0`) showing conference updates such as:
  `ARAMBH MUN 2026 · Registrations Open...`
- Ticker content should support configurable announcements.
- Continuous horizontal marquee animation.
- Ticker must not interfere with keyboard navigation or screen readers.
- **Separation Line**: A crisp white separation line (`border-bottom: 1px solid var(--white)`) between the bottom of the ticker and the top of the navbar.
- **Navbar Offset & Stacking**: Navbar sits directly beneath the ticker (`top: 1.85rem`) with zero whitespace gaps.
- **Scroll Visibility**:
  - At page load, navbar may use a transparent appearance.
  - After scrolling more than 50px, transition to a dark frosted-glass appearance.
  - Use:
    - `color-mix(in srgb, var(--black) 85%, transparent)`
    - `backdrop-filter: blur(12px)`
    - bottom border
- **Navbar Logo**:
  - Octagon-chamfered geometric badge.
  - Displays `/assets/images/logo/club_logo.jpeg`.
  - Positioned beside `SKIT MUN CLUB.` text.
  - Interactive micro-hover effects.
- **Action Button**:
  - Bordered registration CTA.
  - Solid orange fill.
  - Rounded corners.
  - Hover lift animation.
- Include a commented fallback implementation for:
  - `Registrations Closed`
  - Lock icon.

---

# 4. Preloader

- Displays the society club emblem:
  - `/assets/images/logo/club_logo.jpeg`
- Circular orange border using `var(--orange)`.
- Uppercase subtext:
  - `SKIT MUN CLUB · Est. 2020`
- Smooth entry animation.
- Upward reveal transition.
- GSAP timeline controls the transition before revealing the hero section.
- Preloader must not unnecessarily delay page interaction.
- Respect `prefers-reduced-motion`.

---

# 5. Home / Hero Section

## 5.1 Hero

- Clean diplomatic headline:

  `Order. Order. The delegate may speak.`

- Supporting subtitle.
- Continuous gradient shimmer animation:
  - `hero-shimmer 4s linear infinite`
- Redacted organization badge concealing:
  - `Model United Nations Club`
- Solid orange block treatment.
- Clean composition.
- No unnecessary floating elements.
- No visual overlap between headline, badge, navigation, and CTA.
- Hero should establish the site's visual language immediately.

---

# 6. About

## 6.1 Club Overview

Include:

- SKIT MUN CLUB introduction.
- Mission.
- Vision.
- History.
- Establishment information.
- Club activities.
- MUN education and delegate development.
- Connection to SKIT Jaipur.

## 6.2 Leadership Message

Support:

- Faculty message.
- Secretary-General message.
- Club leadership message.

Content should be editable without modifying page structure.

---

# 7. Committees / Chambers

## 7.1 Chambers Landing Section

- Horizontal pinned-scroll section.
- Highlight the five primary committee chambers.
- Each committee should have:
  - Committee name.
  - Abbreviation.
  - Icon or visual identifier.
  - Short description.
  - Conference relevance.
  - Link to detailed committee page.

## 7.2 Responsive Behaviour

- Standard horizontal container alignment.
- Use `8vw` horizontal padding.
- Consistent alignment between:
  - Section heading.
  - Committee cards.
  - Supporting text.
- Horizontal scrolling interaction on desktop.
- Normal stacked layout on smaller screens.

## 7.3 Committee Detail Pages

Each committee may contain:

- Committee overview.
- Mandate.
- Agenda.
- Rules of procedure.
- Background guide.
- Study resources.
- Executive Board.
- Chairperson / Vice-Chairperson information.
- Delegate preparation material.

---

# 8. Flagship Conference — ARAMBH MUN

## 8.1 Conference Landing Page

The conference should have a dedicated landing page containing:

- Conference identity.
- Edition/year.
- Theme.
- Dates.
- Venue.
- Registration CTA.
- Committees.
- Schedule.
- Secretariat.
- Executive Board.
- Delegate information.
- Contact information.

## 8.2 Conference Visual Section

- Two-column split layout.
- Sticky date title.
- Conference itinerary.
- Outlined date typography:

  `ARAMBH MUN '26`

- Typography must be clamped and bounded:
  - `max-width: 100%`
  - `word-break: break-word`
- Prevent horizontal overflow.

## 8.3 Conference Information

Support structured fields for:

- Conference name.
- Edition.
- Start date.
- End date.
- Registration deadline.
- Venue.
- City.
- Registration status.
- Registration fee.
- Contact email.
- Registration URL.

---

# 9. Schedule

Dedicated conference schedule page.

Support:

- Day 1.
- Day 2.
- Opening ceremony.
- Committee sessions.
- Breaks.
- Lunch.
- Closing ceremony.
- Awards ceremony.
- Registration/check-in.

Schedule items should be represented as structured data rather than hardcoded visual blocks wherever practical.

---

# 10. Venue

Conference venue page should include:

- Venue name.
- Address.
- City.
- Venue description.
- Venue photographs.
- Map/embed placeholder.
- Transportation information.
- Nearby accommodation information.
- Important arrival instructions.

---

# 11. Registration

## 11.1 Registration Landing Page

Provide:

- Registration status.
- Delegate registration CTA.
- School/college delegation information.
- Individual delegate information.
- Payment information.
- Important dates.
- Terms and conditions.

## 11.2 Registration States

Support:

- Registration Open
- Registration Closing Soon
- Registration Closed
- Registration Coming Soon

The CTA must dynamically reflect the current state.

---

# 12. Secretariat

## 12.1 Section

Title:

`Minds behind the motion.`

Centered heading.

## 12.2 Faculty Co-ordinators

- Centered section title.
- Centered grid.
- Faculty mentor cards.

## 12.3 Student Co-ordinators

- Four-column desktop layout:

```css
grid-template-columns: repeat(4, minmax(0, 1fr));
```

Collapse responsively on smaller screens.

## 12.4 Secretariat Card Anatomy

Each card contains:

- Top orange flag indicator.
- 1:1 image frame.
- Safe placeholder support for `src="#"` without displaying a broken-image icon.
- Role subtitle.
- Member name.
- Bold department/semester position:
  `.sec-pos`
- Italic quote:
  `.sec-quote`

Data should be structured so new secretariat members can be added without changing the card component.

---

# 13. Executive Board

Dedicated page/section for conference authorities.

Each member can contain:

- Name.
- Position.
- Committee.
- Photograph.
- Academic information.
- Short biography.
- Quote.

Possible roles:

- Chairperson
- Vice-Chairperson
- Director
- Rapporteur
- Crisis Director
- Other conference-specific roles

---

# 14. Delegate Resources

Create a dedicated educational resource hub for MUN delegates.

## 14.1 Beginner Resources

Include guides such as:

- What is Model United Nations?
- First MUN Guide.
- How an MUN Works.
- Rules of Procedure.
- How to Prepare for an MUN.
- Country Research.
- MUN Dress Code.
- Conference Checklist.

## 14.2 Delegate Skills

Include:

- Position Paper Writing.
- Resolution Writing.
- Public Speaking.
- Moderated Caucus.
- Unmoderated Caucus.
- Negotiation.
- Lobbying.
- Research.
- Diplomacy.
- Advanced Delegate Strategies.

## 14.3 Committee-Specific Resources

Include guides for:

- UNSC.
- UNGA.
- UNHRC.
- UNICEF.
- CSW.
- AIPPM.
- Lok Sabha.
- International Press.
- Crisis Committees.
- Other committees added later.

## 14.4 Resource Content Structure

Each article should support:

- Title.
- Category.
- Author.
- Publication date.
- Last updated date.
- Reading time.
- Featured image.
- Table of contents.
- Main content.
- Related resources.
- Related conferences.

---

# 15. MUN Directory

The website should contain a searchable directory of MUN conferences.

## 15.1 Directory Landing Page

Provide:

- Search.
- City filter.
- State filter.
- Date filter.
- Conference status.
- Committee filter.
- Online/offline filter.
- Pagination.
- Conference cards.

## 15.2 Conference Listing Card

Each conference card may display:

- Conference name.
- Organizer.
- Date.
- City.
- Venue.
- Registration status.
- Committees.
- Registration CTA.
- Conference page link.

## 15.3 Individual Conference Pages

URL:

`/directory/[conference-slug]`

Each page should support:

- Conference name.
- Organizer.
- Date.
- Location.
- Venue.
- Description.
- Committees.
- Agenda.
- Registration information.
- Contact details.
- Official website.
- Social links.
- Last updated date.

## 15.4 Location Pages

Generate location-based pages:

`/directory/city/[city]`

Examples:

- `/directory/city/jaipur`
- `/directory/city/delhi`
- `/directory/city/noida`
- `/directory/city/gurgaon`

State-level pages:

`/directory/state/[state]`

Examples:

- `/directory/state/rajasthan`
- `/directory/state/delhi`
- `/directory/state/uttar-pradesh`

Optional locality pages:

`/directory/city/jaipur/[locality]`

These pages should automatically list relevant conferences.

---

# 16. Search

Global search should support:

- Conferences.
- Resources.
- Committees.
- Blog articles.
- Cities.
- States.

Search results should display:

- Result title.
- Content type.
- Short description.
- Location where relevant.
- Date where relevant.
- Link.

Search should be responsive and keyboard accessible.

---

# 17. Blog / Editorial Content

Create an editorial section for original MUN-related content.

Possible categories:

- MUN Guides.
- Delegate Advice.
- Conference News.
- MUN in India.
- MUN in Jaipur.
- MUN in Delhi.
- Committee Guides.
- Club News.

URL:

`/blog/[article-slug]`

Articles should support:

- SEO title.
- Meta description.
- Canonical URL.
- Open Graph image.
- Author.
- Date.
- Updated date.
- Related articles.

All editorial content must be original or appropriately licensed.

---

# 18. Media

## 18.1 Gallery

- Conference photographs.
- Secretariat photographs.
- Committee photographs.
- Event highlights.
- Responsive image grid.
- Lightbox viewer.

## 18.2 Videos

Support:

- Aftermovie.
- Conference highlights.
- Interviews.
- Promotional videos.

## 18.3 Press

Press section should contain:

- Official announcements.
- Conference press releases.
- Club announcements.
- Media coverage links.

---

# 19. Footer

Footer should contain:

- Club emblem.
- SKIT MUN CLUB. branding.
- Copyright.
- Navigation links.
- Conference links.
- Resource links.
- Social links.

Current social/contact placeholders:

- Instagram → `#`
- Source → `#`
- Gmail compose:
  `https://mail.google.com/mail/?view=cm&fs=1&to=skitmg.mun.club@gmail.com`

Left-aligned circular club emblem adjacent to copyright label.

---

# 20. SEO Requirements

Every public page must support:

- Unique `<title>`.
- Unique meta description.
- Canonical URL.
- Open Graph metadata.
- Twitter/X card metadata.
- Semantic heading hierarchy.
- Descriptive image alt attributes.
- Clean human-readable URLs.
- XML sitemap.
- robots.txt.
- Breadcrumbs where appropriate.

## 20.1 Structured Data

Where applicable, support Schema.org structured data for:

- Organization.
- Event.
- Article.
- BreadcrumbList.
- Educational content.
- Local/venue information.

Conference pages should expose structured event information where appropriate.

---

# 21. Performance Requirements

- Fast initial page load.
- Optimized images.
- Lazy-load below-the-fold images.
- Avoid unnecessary JavaScript.
- Minimize DOM complexity.
- Avoid layout shifts.
- Use modern image formats where supported.
- Animations must not block interaction.
- GSAP should only be loaded/used where animation requires it.
- Respect `prefers-reduced-motion`.

---

# 22. Accessibility

- Semantic HTML.
- Keyboard navigable menus.
- Visible focus states.
- Sufficient color contrast.
- Proper heading hierarchy.
- Accessible buttons and links.
- Meaningful image alt text.
- ARIA only where necessary.
- Marquee/ticker content must not create accessibility issues.
- Animations should be reduced when `prefers-reduced-motion` is enabled.

---

# 23. Responsive Design

The entire website must work across:

- Large desktop.
- Desktop.
- Tablet.
- Mobile.
- Small mobile screens.

Specific requirements:

- Navigation collapses into mobile menu.
- Secretariat grid collapses responsively.
- Committee horizontal scroll becomes a stacked layout where appropriate.
- Conference two-column layout becomes a single column.
- Typography must scale without overflow.
- No horizontal page scrolling.
- Images maintain aspect ratio.
- Buttons remain usable on touch screens.

---

# 24. Content Management / Data Architecture

The application should avoid hardcoding repeatable content directly into HTML templates.

The following should be data-driven:

- Conferences.
- Committees.
- Secretariat members.
- Executive Board.
- Schedule entries.
- Resources.
- Blog articles.
- Locations.
- Media.
- Registration state.

Each content type should have a reusable component/template.

Example conference object:

```json
{
  "name": "ARAMBH MUN 2026",
  "slug": "arambh-mun-2026",
  "startDate": "",
  "endDate": "",
  "city": "Jaipur",
  "venue": "",
  "status": "open",
  "registrationUrl": "",
  "committees": [],
  "description": ""
}
```

---

# 25. Data Relationships

The directory architecture should support relationships between entities.

Example:

```
Conference
├── Organizer
├── Location
│   ├── City
│   └── State
├── Venue
├── Committees
├── Executive Board
├── Schedule
└── Registration

Resource
├── Category
├── Committee
├── Related Resources
└── Related Conferences
```

This allows conference pages, city pages, committee pages, and resource pages to cross-link automatically.

---

# 26. Internal Linking

Relevant pages should link to each other.

Examples:

```
Conference
    ↓
Committee
    ↓
Committee Guide
    ↓
Delegate Resource
    ↓
Related Conferences
```

- Location pages should link to conference pages.
- Conference pages should link to:
  - Registration.
  - Venue.
  - Schedule.
  - Committees.
  - Secretariat.
  - Relevant resources.
- Resource pages should link to relevant:
  - Committees.
  - Conferences.
  - Other resources.

---

# 27. Visual Design System

## 27.1 Design Language

Visual identity should communicate:

- Diplomacy.
- Formality.
- Academic credibility.
- Modern editorial design.
- Youthful student leadership.

Avoid excessive:

- Glassmorphism.
- Floating decorative elements.
- Gradient-heavy backgrounds.
- Unnecessary animation.
- Generic SaaS-style layouts.

## 27.2 Colors

All colors must be defined through CSS custom properties.

Example:

```css
:root {
  --black: #0a0a0b;
  --orange: #ff6a1a;
  --white: #ffffff;
  --cream: #f4ede1;
}
```

Components must consume variables rather than hardcoded color values.

---

# 28. Animation

Use GSAP for deliberate interface motion.

Animations may include:

- Preloader.
- Hero reveal.
- Text reveal.
- Committee horizontal scroll.
- Hover interactions.
- Navbar transition.
- Section reveals.

Animations must:

- Be performant.
- Not prevent interaction.
- Not cause layout shifts.
- Respect `prefers-reduced-motion`.

---

# 29. Strict Technical Constraints

## 29.1 Zero Inline Styles

All styling must remain in external stylesheets.

Do not use:

`style="..."`

All styling must be maintained in:

`style.css`

or the project's designated stylesheet architecture.

## 29.2 No Hardcoded Hex Codes

Hex color values may exist only inside `:root` CSS custom properties.

Example:

```css
:root {
  --orange: #ff6a1a;
  --black: #0a0a0b;
}
```

Components must use:

```css
color: var(--orange);
background: var(--black);
```

Do not introduce component-level hardcoded hex values.

## 29.3 Lean Code

- Minimal DOM.
- No redundant wrappers.
- No duplicate CSS.
- Reusable components.
- Reusable data structures.
- Avoid unnecessary dependencies.
- Avoid duplicated page templates.
- Prefer CSS and semantic HTML over JavaScript where possible.

---

# 30. Security & External Content

- External links should use appropriate `rel` attributes where required.
- User-submitted content must be sanitized.
- Registration/payment integrations must never expose private credentials.
- API keys and secrets must never be committed to the frontend.
- Third-party embeds should be reviewed before inclusion.
- Directory content should support moderation/verification status.

---

# 31. Content Integrity

The website may take inspiration from established MUN directory and resource-site information architecture, but must not copy:

- Another organization's branding.
- Logos.
- Original written content.
- Photography.
- Graphics.
- Proprietary source code.
- Page copy.
- Distinctive creative assets.

All SKIT MUN CLUB content should use its own:

- Branding.
- Typography.
- Photography.
- Copy.
- Illustrations.
- Conference data.

---

# 32. Future Extensibility

The architecture should allow the website to eventually support:

- Multiple SKIT MUN conference editions.
- Multiple annual conferences.
- Delegate accounts.
- Organizer accounts.
- Conference submissions.
- Organizer portals.

---

*Inspiration website reference: [delhimun.in](https://delhimun.in)*

---

# 33. SKIT MUN WEBSITE — COMPLETE CONTENT + ARCHITECTURE IMPLEMENTATION SPECIFICATION

## 33.1 Core Objective
Build a complete, scalable SKIT MUN website with:
- official SKIT MUN CLUB presence
- ARAMBH MUN conference platform
- delegate education/resource hub
- committee information
- secretariat and executive board
- schedule and venue
- registration architecture
- FAQ
- media, press, blog
- future MUN directory architecture

The website expands from one conference into a long-term academic MUN platform.

## 33.2 Reference Website & Taxonomy Scope
Use Delhi MUN (`delhimun.in`) as a reference for informational scope and taxonomy only.
Ensure SKIT MUN covers comparable educational topics:
- delegate resource hub categorization
- beginner resources
- MUN procedure topics
- writing and research resources
- specialized committee guides
- conference expectations

## 33.3 Absolute Content Integrity Rule
DO NOT copy or reproduce Delhi MUN or external content:
- Zero copying of paragraphs, slogans, biographies, or graphic assets.
- Independent research of underlying diplomatic concepts.
- 100% original SKIT MUN copy, examples, and educational presentation.
- Never invent people, dates, fees, awards, or sponsors. Use `[ADD OFFICIAL INFORMATION]` where data is pending.

## 33.4 HTML / CSS / JS / Data Separation
- **HTML**: Owns structure, headings, editorial paragraphs, educational guides, FAQ content, semantic forms. No editorial content inside JS.
- **CSS**: Owns layout, typography, colors, responsiveness, visual effects, and animations. Zero inline styles.
- **JavaScript**: Owns UI state, dropdowns, modal windows, search, filtering, and animation controls. No giant `innerHTML` injections of pages.
- **Data files**: Own structured metadata that changes (`site.js`, `conference.js`, `committees.js`, `team.js`, `schedule.js`, `resources.js`, `faq.js`, `directory.js`, `blog.js`, `locations.js`, `media.js`).

## 33.5 Educational Resource Taxonomy
The platform encompasses the complete taxonomy:
- **Category A (Fundamentals)**: What Is MUN, How MUN Works, Your First MUN, Preparing for a Conference, Conference Checklist, Dress Code.
- **Category B (Research)**: Country Research, Topic Research, Reliable Sources, Research Brief, National Positions, UN Action History.
- **Category C (Rules of Procedure)**: Roll Call, GSL, Points & Motions, Moderated & Unmoderated Caucuses, Working Papers, Draft Resolutions, Amendments, Voting, Yields.
- **Category D (Position Papers)**: Purpose, Research, Country Stance, Structure, Sample Analysis, Practical Examples, Final Checklist.
- **Category E (Resolution Writing)**: Preambulatory Clauses, Operative Clauses, Sponsors & Signatories, Friendly/Unfriendly Amendments, Voting Bloc.
- **Category F (Speaking & Rhetoric)**: Opening Speeches, Public Speaking, Rhetorical Structure, POIs, Rebuttals, Speaking Under Pressure.
- **Category G (Negotiation & Lobbying)**: Coalition Building, Bloc Formation, Unmoderated Strategy, Diplomatic Compromise.
- **Category H (Advanced Strategy)**: Committee Dynamics, Crisis Tactics, Strategic Voting, Agenda Setting.
- **Specialized Committee Guides**: UNSC, UNGA, UNHRC, UNICEF, CSW, AIPPM / Lok Sabha, International Press, Crisis Committees.

## 33.6 Implementation Status Classification
- **COMPLETE**: Original substantive content ready and integrated.
- **NEEDS SKIT DATA**: Structure ready; awaiting official SKIT confirmation (tagged `[ADD OFFICIAL INFORMATION]`).
- **PLACEHOLDER**: Intentional design placeholder.
- **INCOMPLETE**: Requires further expansion.
