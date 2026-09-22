# MUN Website --- Architecture & Development Plan

## 1. Purpose

This document defines the technical structure, file organization,
design-system approach, reusable components, content architecture, and
scalability plan for the MUN website.

This document is separate from `Requirements.md`.

-   `Requirements.md` defines **what the website must do**.
-   `Design.md` defines **how the website should look and feel**.
-   This document defines **how the project should be organized and
    built**.

------------------------------------------------------------------------

# 2. Recommended Project Structure

``` text
mun/
│
├── index.html
├── 404.html
│
├── pages/
│   ├── about.html
│   ├── committees.html
│   ├── secretariat.html
│   ├── schedule.html
│   ├── resources.html
│   ├── registration.html
│   ├── faq.html
│   ├── media.html
│   └── contact.html
│
├── conference/
│   └── arambh-mun-2026/
│       └── index.html
│
├── resources/
│   ├── rules.html
│   ├── position-paper.html
│   ├── resolution-writing.html
│   └── articles/
│       ├── what-is-mun.html
│       ├── first-mun.html
│       ├── public-speaking.html
│       ├── crisis-committee.html
│       └── aippm.html
│
├── directory/
│   └── index.html
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── committees/
│   │   ├── team/
│   │   └── gallery/
│   │
│   ├── icons/
│   │   └── club_logo.jpeg
│   └── documents/
│       ├── brochures/
│       ├── background-guides/
│       └── policies/
│
├── css/
│   ├── variables.css
│   └── pages/
│
├── js/
│   └── pages/
│
├── data/
│   ├── site.js
│   ├── conference.js
│   ├── committees.js
│   ├── team.js
│   ├── schedule.js
│   ├── faq.js
│   ├── resources.js
│   └── directory.js
│
├── Design.md
├── Requirements.md
├── Architecture.md
└── README.md
```

The structure should grow only when the project needs the additional
separation. Do not create empty files or folders simply for the sake of
having a large architecture.

------------------------------------------------------------------------

# 3. Core Architecture Principle

The project should be organized around **responsibility**, not simply
around the number of pages.

Use the following separation:

  Responsibility             Location
  -------------------------- ----------------------------------------
  HTML pages                 `pages/` and root
  Global CSS                 `css/`
  Page-specific CSS          `css/pages/`
  Global JavaScript          `js/`
  Page-specific JavaScript   `js/pages/`
  Reusable UI styles         `css/components.css` and related files
  Changing conference data   `data/`
  Images                     `assets/images/`
  Documents                  `assets/documents/`
  Requirements               `Requirements.md`
  Visual/design rules        `Design.md`
  Technical architecture     `Architecture.md`

------------------------------------------------------------------------

# 4. HTML Page Strategy

The website should have a clear separation between the homepage and
secondary pages.

## Root

``` text
index.html
```

The homepage should contain the primary conference presentation and
major calls to action.

## Secondary pages

``` text
pages/
├── about.html
├── committees.html
├── secretariat.html
├── schedule.html
├── resources.html
├── registration.html
└── contact.html
```

Only create a separate page when the content is substantial enough to
justify one.

Do not create separate pages for every small section.

------------------------------------------------------------------------

# 5. CSS Architecture

## 5.1 `variables.css`

This file contains the design system's reusable variables.

Example:

``` css
:root {
    --color-primary: #0b0b0b;
    --color-secondary: #f5f5f5;
    --color-accent: #c9a227;

    --font-heading: "Inter", sans-serif;
    --font-body: "Inter", sans-serif;

    --container-width: 1280px;

    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;

    --spacing-xs: 8px;
    --spacing-sm: 16px;
    --spacing-md: 24px;
    --spacing-lg: 48px;
    --spacing-xl: 96px;
}
```

The actual values should be determined by `Design.md`.

The purpose is to avoid repeating the same values throughout the
project.

------------------------------------------------------------------------

## 5.2 `main.css`

`main.css` is the main CSS entry point.

It should load or contain the global styling layers.

Example:

``` css
@import url("./variables.css");
@import url("./components.css");
@import url("./navbar.css");
@import url("./footer.css");
```

If performance becomes a concern later, the project can move away from
CSS imports and use build tooling.

For the current plain HTML/CSS/JS implementation, this approach is
acceptable.

------------------------------------------------------------------------

## 5.3 Component CSS

Reusable interface elements should have reusable styles.

Examples:

``` text
buttons.css
cards.css
forms.css
modal.css
gallery.css
```

A component should look and behave consistently wherever it appears.

For example, a committee card used on the homepage and committees page
should use the same base component.

Avoid creating separate versions such as:

``` text
home-committee-card
committee-page-card
resource-committee-card
```

unless the visual behavior genuinely differs.

------------------------------------------------------------------------

## 5.4 Page-specific CSS

Page-specific CSS belongs inside:

``` text
css/pages/
```

Example:

``` text
css/pages/committees.css
```

Only create page-specific CSS when a page contains styling that is not
useful elsewhere.

Do not create one CSS file per page by default.

------------------------------------------------------------------------

# 6. JavaScript Architecture

JavaScript should follow the same responsibility-based structure.

## Global JavaScript

``` text
js/
├── main.js
├── navbar.js
├── animations.js
├── modal.js
└── forms.js
```

### `main.js`

Responsible for global initialization.

Example:

``` javascript
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initAnimations();
});
```

### `navbar.js`

Responsible for:

-   Mobile navigation
-   Dropdown behavior
-   Sticky navigation
-   Navigation scroll state

### `animations.js`

Responsible for reusable visual interactions.

Examples:

-   Scroll reveal
-   Intersection Observer animations
-   Page transitions where appropriate

### `modal.js`

Responsible for reusable modal behavior.

Examples:

-   Committee information
-   Image viewer
-   Confirmation dialogs

### `forms.js`

Responsible for:

-   Client-side validation
-   Error states
-   Form interaction
-   Submission states

------------------------------------------------------------------------

# 7. Page-Specific JavaScript

Only create page-specific JavaScript when the page contains unique
functionality.

Example:

``` text
js/pages/committees.js
```

Possible responsibilities:

-   Committee filtering
-   Committee modal interaction
-   Dynamic committee rendering

Example:

``` text
js/pages/registration.js
```

Possible responsibilities:

-   Registration form logic
-   Dynamic form fields
-   Fee calculation
-   Validation specific to registration

Avoid creating files such as `about.js` or `contact.js` when those pages
do not actually require JavaScript.

------------------------------------------------------------------------

# 8. Data-Driven Content

Changing conference information should eventually be separated from
presentation code.

Use:

``` text
data/
├── conference.js
├── committees.js
├── team.js
└── schedule.js
```

Example:

``` javascript
const conference = {
    name: "SKIT MUN",
    year: 2026,
    edition: "3rd",
    venue: "SKIT Jaipur"
};
```

Example committee data:

``` javascript
const committees = [
    {
        name: "United Nations Security Council",
        abbreviation: "UNSC",
        type: "United Nations",
        agenda: "The Question of ...",
        image: "/assets/images/committees/unsc.jpg"
    },
    {
        name: "All India Political Parties Meet",
        abbreviation: "AIPPM",
        type: "Indian Parliamentary",
        agenda: "The Question of ...",
        image: "/assets/images/committees/aippm.jpg"
    }
];
```

The UI can then generate committee cards from this data.

This prevents the same information from being duplicated across multiple
HTML files.

------------------------------------------------------------------------

# 9. Do Not Hard-Code Conference Information Everywhere

Avoid writing the conference year, edition, dates, venue, and other
recurring information independently across dozens of files.

Bad:

``` html
<h1>SKIT MUN 2026</h1>
```

repeated throughout the project.

Better:

``` javascript
const conference = {
    name: "SKIT MUN",
    year: 2026
};
```

The exact implementation can evolve later.

The objective is to make annual updates easy.

When the next edition arrives, changing the central conference data
should update most of the website.

------------------------------------------------------------------------

# 10. Assets Architecture

Use a dedicated `assets/` directory.

``` text
assets/
├── images/
│   ├── logo/
│   ├── hero/
│   ├── committees/
│   ├── team/
│   └── gallery/
│
├── icons/
└── documents/
    ├── brochures/
    ├── background-guides/
    └── policies/
```

Do not place images, PDFs, logos, and random files directly in the
project root.

Use descriptive filenames.

Good:

``` text
assets/images/committees/unsc.jpg
assets/images/team/secretary-general.jpg
assets/documents/background-guides/unsc-2026.pdf
```

Avoid:

``` text
img1.jpg
final2.png
newlogo-final-final.png
document123.pdf
```

------------------------------------------------------------------------

# 11. Reusable UI Components

The website should be built from reusable components wherever possible.

Important components include:

-   Navbar
-   Footer
-   Button
-   Section heading
-   Committee card
-   Executive Board card
-   Team member card
-   Event/schedule item
-   Resource card
-   FAQ item
-   Modal
-   Form field
-   Announcement banner
-   Gallery item
-   CTA section

The same component should not be independently rebuilt on every page.

------------------------------------------------------------------------

# 12. Conference Content Architecture

The website should eventually support the following information
hierarchy:

``` text
MUN
│
├── About
│   ├── Conference
│   ├── Secretary General
│   └── Secretariat
│
├── Conference
│   ├── Committees
│   ├── Executive Board
│   ├── Agendas
│   ├── Schedule
│   └── Venue
│
├── Delegates
│   ├── Registration
│   ├── Delegate Guide
│   ├── Fees
│   ├── Accommodation
│   └── FAQs
│
├── Resources
│   ├── First MUN Guide
│   ├── Rules of Procedure
│   ├── Position Paper Guide
│   ├── Resolution Writing
│   └── Background Guides
│
├── Media
│   ├── Gallery
│   ├── Aftermovie
│   └── Press
│
└── Contact
```

This is an information architecture model, not a requirement that every
section must exist in the first release.

------------------------------------------------------------------------

# 13. Responsive Architecture

The website must be designed for:

1.  Desktop
2.  Laptop
3.  Tablet
4.  Mobile

Do not build desktop first and treat mobile as an afterthought.

Responsive behavior should be considered when designing:

-   Navigation
-   Hero sections
-   Cards
-   Grids
-   Tables
-   Forms
-   Images
-   Typography
-   Buttons
-   Spacing

Avoid fixed widths wherever possible.

Use:

``` css
max-width
width: 100%
min()
max()
clamp()
flex
grid
```

where appropriate.

------------------------------------------------------------------------

# 14. Accessibility

The website should follow basic accessibility practices from the
beginning.

Requirements include:

-   Semantic HTML
-   Proper heading hierarchy
-   `alt` text for meaningful images
-   Keyboard-accessible interactive elements
-   Visible focus states
-   Sufficient color contrast
-   Proper `<label>` elements for forms
-   Buttons used for actions
-   Links used for navigation
-   Avoiding text embedded in images where possible

Do not use a `<div>` as a substitute for every interactive element.

------------------------------------------------------------------------

# 15. SEO Architecture

Each major page should have its own metadata.

Example:

``` html
<title>Committees | SKIT MUN 2026</title>

<meta
    name="description"
    content="Explore the committees, agendas and executive board of SKIT MUN 2026."
>
```

Important pages should eventually have:

-   Unique `<title>`
-   Unique meta description
-   Open Graph metadata
-   Proper canonical URLs
-   Descriptive headings
-   Meaningful image `alt` attributes

------------------------------------------------------------------------

# 16. 404 Page

The 404 page can remain separate:

``` text
404.html
```

If it requires unique styling:

``` text
css/pages/404.css
```

If it requires unique JavaScript:

``` text
js/pages/404.js
```

The 404 page should provide:

-   Clear error message
-   Link back to homepage
-   Main navigation if appropriate
-   Useful alternative destinations

------------------------------------------------------------------------

# 17. Future Backend Architecture

The first version can remain a static HTML/CSS/JS website.

However, the architecture should leave room for a future backend.

Possible future functionality:

``` text
Delegate Registration
        |
        v
      API
        |
   ┌────┴────┐
   |         |
Database   Payment Gateway
   |
   ├── Delegates
   ├── Institutions
   ├── Committees
   ├── Registrations
   ├── Executive Board
   ├── Attendance
   ├── Results
   └── Certificates
```

Eventually, the system could also include:

-   Admin dashboard
-   Delegate login
-   Registration status
-   Committee allocation
-   Payment verification
-   Email confirmations
-   Certificate generation
-   Attendance management
-   Results publication

These features should not be implemented until they are actually
required.

------------------------------------------------------------------------

# 18. Frontend-to-Backend Transition

When the website begins requiring authentication, persistent data,
payments, or an admin dashboard, consider moving from a purely static
architecture to a proper application architecture.

Potential future architecture:

``` text
Frontend
    |
    | HTTPS / API
    v
Backend
    |
    ├── Authentication
    ├── Registration
    ├── Payments
    ├── Admin
    └── Email
    |
    v
Database
```

The current HTML/CSS/JS implementation should remain clean enough that
the visual design can be reused when this transition occurs.

------------------------------------------------------------------------

# 19. Development Rules

Follow these rules throughout development.

### Rule 1 --- Do not create duplicate code unnecessarily

If two components behave the same way, create one reusable
implementation.

### Rule 2 --- Do not create files without a reason

A larger file tree does not automatically mean better architecture.

### Rule 3 --- Separate content from presentation

HTML should define structure.

CSS should define presentation.

JavaScript should define behavior.

Data files should contain changing conference information where
practical.

### Rule 4 --- Keep global styles global

Do not put navbar, footer, button, and typography rules into random page
CSS files.

### Rule 5 --- Keep page-specific code isolated

If a feature belongs only to the committees page, its unique code should
not pollute global JavaScript.

### Rule 6 --- Avoid hard-coded repetition

Conference name, year, dates, committee data, and similar recurring
information should be centralized when practical.

### Rule 7 --- Build mobile support from the beginning

Do not postpone responsive design until the end.

------------------------------------------------------------------------

# 20. Recommended Development Order

Build the website in this order:

``` text
1. Design system
       ↓
2. Global CSS variables
       ↓
3. Global typography
       ↓
4. Navbar
       ↓
5. Footer
       ↓
6. Reusable buttons/cards
       ↓
7. Homepage
       ↓
8. Committees
       ↓
9. Secretariat / Executive Board
       ↓
10. Schedule
       ↓
11. Resources
       ↓
12. Registration
       ↓
13. Contact
       ↓
14. 404
       ↓
15. Responsive refinement
       ↓
16. Accessibility
       ↓
17. SEO
       ↓
18. Performance optimization
```

Do not start by building every page independently.

Build the reusable foundation first.

------------------------------------------------------------------------

# 21. Scalability Target

The architecture should comfortably support growth from:

``` text
1 conference
5 committees
20–50 delegates
```

to:

``` text
Multiple annual editions
10+ committees
Hundreds of delegates
Multiple executive boards
Large resource libraries
Registration and payment systems
Admin dashboard
```

without requiring the entire frontend to be rewritten.

------------------------------------------------------------------------

# 22. Current Recommended Scope

For the first release, keep the implementation relatively simple:

``` text
HTML
CSS
JavaScript
Static data
```

Do not introduce a framework merely because the website may become large
later.

Introduce additional infrastructure only when the requirements justify
it.

The immediate objective is:

``` text
Clean structure
+
Reusable components
+
Centralized design system
+
Data separation
+
Responsive UI
+
Easy future expansion
```

That provides a strong foundation for turning the MUN website into a
larger conference platform later.
