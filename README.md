# SKIT MUN CLUB — Web Platform

The official digital presence and delegate resource ecosystem for **SKIT Model United Nations Club**, hosted at **Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT), Jaipur**, featuring **ARAMBH MUN** as its flagship annual conference.

---

## 1. Project Philosophy & Core Rule

* **HTML is responsible for Structure & Editorial Content:** All article guides, manifesto, committees, FAQs, and conference details are written directly into semantic HTML.
* **CSS is responsible for Presentation & Design Tokens:** Styled via pure CSS tokens (`variables.css`, `style.css`, `404.css`), adhering strictly to zero hardcoded hex codes outside `:root` and zero inline styles.
* **JavaScript is responsible for Interactive Behavior:** Scroll smoothers (Lenis), animations (GSAP), dropdowns, form validation, and data utilities. HTML is **never fused or rendered as big string templates in JavaScript**.
* **Data Layer (`data/`):** Contains structured changing metadata (conference dates, committees matrix, team coordinators, FAQ data, directory listings).

---

## 2. Directory Architecture

```text
mun_club/
├── index.html                            # Exploded hero, manifesto, chambers, conference highlight, registration
├── 404.html                              # Dedicated 404 Point of Order page
├── style.css                             # Global typography, brand design tokens, preloader, ticker, navbar, cards
├── 404.css                               # Layout containers, prose utilities, and error styles
├── script.js                             # Interactive GSAP animations, Lenis smooth scroll, marquee
├── 404.js                                # Micro-animations for 404 page
│
├── pages/
│   ├── about.html                        # Society overview, mission, and faculty leadership letter
│   ├── committees.html                   # Complete 5-chamber matrix with difficulty and agenda descriptions
│   ├── secretariat.html                  # Faculty coordinators & Student coordinators
│   ├── schedule.html                     # Official October 23, 2026 conference itinerary
│   ├── resources.html                    # Categorized delegate educational resource hub
│   ├── registration.html                 # Delegate registration form & pricing
│   ├── faq.html                          # Authentic Model UN and conference FAQ
│   ├── media.html                        # Photographic archives, video highlights, and press communiques
│   └── contact.html                      # Official campus and email contact desk
│
├── conference/
│   └── arambh-mun-2026/
│       └── index.html                    # Dedicated flagship conference edition portal
│
├── resources/
│   ├── rules.html                        # Comprehensive Rules of Procedure (ROP) manual
│   ├── position-paper.html               # Position paper drafting guide and structure
│   ├── resolution-writing.html           # Draft resolution writing and operative clauses manual
│   └── articles/
│       ├── what-is-mun.html              # Academic foundations of Model United Nations
│       ├── first-mun.html                # Field guide for first-time delegates
│       ├── country-research.html         # Researching national policy, treaties & UN data
│       ├── conference-checklist.html     # 7-day preparation schedule & physical binder kit
│       ├── dress-code.html               # Western Business Formal vs. Indian Traditional attire
│       ├── public-speaking.html          # Speechcraft, rhetoric, and GSL mastery
│       ├── negotiation.html              # Principled negotiation, red lines & consensus building
│       ├── lobbying.html                 # Unmoderated caucuses & bloc formation dynamics
│       ├── advanced-strategies.html      # Procedural tactics, motion precedence & amendment battles
│       ├── unsc.html                     # UN Security Council: Chapter VII & P5 veto mechanics
│       ├── unga.html                     # UN General Assembly: Sovereign equality & Main Committees
│       ├── unhrc.html                    # UN Human Rights Council: UPR & Special Rapporteurs
│       ├── international-press.html      # Press Corps: Investigative reporting & press conferences
│       ├── crisis-committee.html         # Continuous crisis committee tactics and backroom directives
│       └── aippm.html                    # Indian parliamentary procedure (Lok Sabha / AIPPM)
│
├── directory/
│   └── index.html                        # Verified conference discovery and circuit calendar
│
├── data/
│   ├── site.js                           # Institutional metadata
│   ├── conference.js                     # ARAMBH MUN 2026 details, dates, and fees
│   ├── committees.js                     # 5 committee agendas and metadata
│   ├── team.js                           # Secretariat faculty and student coordinator records
│   ├── schedule.js                       # Session timing data
│   ├── faq.js                            # FAQ question and answer items
│   ├── resources.js                      # Categorized resource taxonomy
│   └── directory.js                      # Verified conference calendar records
│
├── assets/
│   ├── icons/
│   │   └── club_logo.jpeg                # Official SKIT MUN CLUB emblem
│   └── images/
│       └── logo/
│           └── club_logo.jpeg            # Master emblem archive
│
├── Requirements.md                       # Functional, content, and design requirements
├── Architecture.md                       # Structural and technical organization specifications
├── Design.md                             # Design aesthetics, color palette, typography guidelines
└── README.md                             # Project documentation
```

---

## 3. Brand Tokens

* **Primary Orange:** `#ff6a1a`
* **Orange Soft:** `#ff8c42`
* **Saffron:** `#ff9933`
* **Dark Background:** `#0a0a0b`
* **Secondary Dark:** `#131316`
* **Cream:** `#f4ede1`
* **Cream Dim:** `#b8b0a1`
* **Typography:**
  * **Logo Font:** `Covered By Your Grace`, cursive
  * **Display Serif:** `Fraunces`, serif
  * **Sans-Serif:** `Space Grotesk`, sans-serif
