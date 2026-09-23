/* ============================================================
   Media Gallery JS — /js/pages/media.js

   CIRCULAR INFINITE CAROUSEL
   ─ Each card gets a "slot" relative to currentIndex
   ─ Slot 0 = centre (full brightness, scale 1.08)
   ─ Slot ±1 = neighbours, ±2 = far cards, beyond ±3 = hidden
   ─ Looping: next on last card → first card (and vice-versa)
   ─ Scroll drive: section height set by JS, sticky inner,
     window scroll progress maps to card index
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   CARD DEFINITIONS
   • To HIDE a card: change  enabled: true  →  enabled: false
   • To REMOVE a card permanently: delete its entire block
   ──────────────────────────────────────────────────────────*/
const ALL_CARDS = [
    /* ── CARD 01 ─ Committee Sessions ───────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i1.jpg',  tag: 'Committee Sessions', title: 'Moderated Caucus',               sub: 'Delegates in full deliberation · ARAMBH MUN' },
    /* ── CARD 02 ─ Oratory ──────────────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i2.jpg',  tag: 'Oratory',            title: 'Delegate Address',               sub: 'Plenary speech at the General Assembly' },
    /* ── CARD 03 ─ Opening Ceremony ─────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i3.jpg',  tag: 'Opening Ceremony',   title: 'ARAMBH MUN 2026 Inauguration',   sub: 'Lamp lighting · Kautaliya Seminar Hall' },
    /* ── CARD 04 ─ Valedictory ──────────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i4.jpg',  tag: 'Valedictory',        title: 'Best Delegate Award',            sub: 'Gavel trophy presentation on stage' },
    /* ── CARD 05 ─ Diplomacy ────────────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i5.jpg',  tag: 'Diplomacy',          title: 'Unmoderated Caucus',             sub: 'Coalition lobbying in the conference corridor' },
    /* ── CARD 06 ─ Leadership ───────────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i6.jpg',  tag: 'Leadership',         title: 'Secretariat Portrait',           sub: 'Core team behind ARAMBH MUN 2026' },
    /* ── CARD 07 ─ Crisis Committee ─────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i7.jpg',  tag: 'Crisis Committee',   title: 'Crisis Directive Review',        sub: 'Emergency session — high-stakes deliberations' },
    /* ── CARD 08 ─ Day 1 ────────────────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i8.jpg',  tag: 'Day 1',              title: 'Delegate Registration',          sub: 'Sign-in & placard distribution desk' },
    /* ── CARD 09 ─ International Press ─────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i9.jpg',  tag: 'International Press',title: 'IP Committee at Work',           sub: 'Live reporting from the conference floor' },
    /* ── CARD 10 ─ Grand Finale ─────────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i10.jpg', tag: 'Grand Finale',       title: 'Conference Closing Photo',       sub: 'All delegates · Grand Hall staircase' },
    /* ── CARD 11 ─ Chairperson ──────────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i11.jpg', tag: 'Chairperson',        title: 'Chair at the Dais',              sub: 'Presiding over the General Assembly' },
    /* ── CARD 12 ─ Networking ───────────────────────────── */
    { enabled: true,  img: '/assets/images/gallery/i12.jpg', tag: 'Networking',         title: 'MUN Networking Dinner',          sub: 'Delegates connect over the closing gala' },
];

/* Only active cards are rendered */
const CARDS = ALL_CARDS.filter(c => c.enabled);
const N     = CARDS.length;

/* ── Carousel config ── */
const SLOT_PX   = 290;   // horizontal distance between card centres (px)
const MAX_SLOT  = 3;     // slots ±3 are visible; beyond that = hidden

/* ── State ── */
let currentIndex = 0;
let cardEls      = [];
let dotEls       = [];
let prevBtn, nextBtn;
let isAnimating  = false;
let manualNavTimer = 0;

/* ════════════════════════════════════════════════════════
   BUILD
════════════════════════════════════════════════════════ */

function buildGallery() {
    const viewport = document.getElementById('galleryViewport');
    if (!viewport) return;

    /* Stage: all cards sit here, centred via position:absolute */
    const stage = document.createElement('div');
    stage.className = 'gallery-stage';
    stage.id        = 'galleryStage';

    CARDS.forEach((c, i) => {
        const card = document.createElement('div');
        card.className   = 'gallery-card' + (i === 0 ? ' is-active' : '');
        card.dataset.idx = i;
        card.innerHTML   = `
            <img src="${c.img}" alt="${c.title}" loading="${i < 2 ? 'eager' : 'lazy'}">
            <div class="gallery-card-overlay"></div>
            <div class="gallery-card-content">
                <div class="gallery-card-tag">${c.tag}</div>
                <div class="gallery-card-title">${c.title}</div>
                <div class="gallery-card-sub">${c.sub}</div>
                <button class="gallery-card-btn" aria-label="See details for ${c.title}">
                    <i class="ri-search-eye-line"></i> See Details
                </button>
            </div>`;

        /* Clicking the card navigates to it */
        card.addEventListener('click', () => goTo(i));
        /* Clicking the button opens lightbox only */
        card.querySelector('.gallery-card-btn').addEventListener('click', e => {
            e.stopPropagation();
            openLightbox(i);
        });

        stage.appendChild(card);
    });

    viewport.innerHTML = '';
    viewport.appendChild(stage);
    cardEls = Array.from(stage.querySelectorAll('.gallery-card'));
}

function buildControls() {
    const viewport = document.getElementById('galleryViewport');
    if (!viewport) return;

    const controls = document.createElement('div');
    controls.className = 'gallery-controls';
    controls.innerHTML = `
        <button class="gallery-nav-btn" id="galleryPrev" aria-label="Previous">
            <i class="ri-arrow-left-s-line"></i>
        </button>
        <div class="gallery-dots" id="galleryDots"></div>
        <button class="gallery-nav-btn" id="galleryNext" aria-label="Next">
            <i class="ri-arrow-right-s-line"></i>
        </button>`;
    viewport.appendChild(controls);

    prevBtn = document.getElementById('galleryPrev');
    nextBtn = document.getElementById('galleryNext');

    const dotsWrap = document.getElementById('galleryDots');
    CARDS.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `Image ${i + 1}`);
        dot.addEventListener('click', () => {
            manualNavTimer = Date.now() + 600;
            goTo(i);
        });
        dotsWrap.appendChild(dot);
    });
    dotEls = Array.from(dotsWrap.querySelectorAll('.gallery-dot'));

    /* Buttons loop: next on last → first, prev on first → last */
    prevBtn.addEventListener('click', () => {
        manualNavTimer = Date.now() + 600;
        goTo(currentIndex - 1);
    });
    nextBtn.addEventListener('click', () => {
        manualNavTimer = Date.now() + 600;
        goTo(currentIndex + 1);
    });
}

/* ════════════════════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════════════════════ */

/* Modular slot: how many steps card i is from currentIndex
   Returns a value in range (-N/2, N/2] so shortest circular path is used */
function getSlot(i) {
    let slot = ((i - currentIndex) % N + N) % N;
    if (slot > N / 2) slot -= N;
    return slot;
}

/* Apply GSAP transform to every card based on its slot */
function updateCarousel(animated = true) {
    cardEls.forEach((card, i) => {
        const slot    = getSlot(i);
        const absSlot = Math.abs(slot);
        const visible = absSlot <= MAX_SLOT;

        /* Position along X axis, with slight curve (y offset) */
        const x       = slot * SLOT_PX;
        const y       = absSlot === 0 ? 0 : absSlot === 1 ? 14 : absSlot === 2 ? 26 : 34;
        const scale   = absSlot === 0 ? 1.06 : absSlot === 1 ? 0.88 : absSlot === 2 ? 0.76 : 0.66;
        const bright  = absSlot === 0 ? 1    : absSlot === 1 ? 0.75 : absSlot === 2 ? 0.55 : 0.4;
        const opacity = visible ? 1 : 0;
        const zIndex  = MAX_SLOT + 2 - absSlot;

        gsap.to(card, {
            x, y, scale, opacity,
            filter:          `brightness(${bright})`,
            zIndex,
            duration:        animated ? 0.55 : 0,
            ease:            'power3.out',
            transformOrigin: 'center center',
        });
    });
}

function goTo(rawIdx) {
    /* Circular wrap */
    const idx = ((rawIdx % N) + N) % N;
    if (idx === currentIndex && !isAnimating) return;

    /* Update is-active class */
    cardEls[currentIndex].classList.remove('is-active');
    dotEls[currentIndex].classList.remove('is-active');

    currentIndex = idx;

    cardEls[currentIndex].classList.add('is-active');
    dotEls[currentIndex].classList.add('is-active');

    updateCarousel(true);
}

/* ════════════════════════════════════════════════════════
   SCROLL DRIVE (sticky section)
   Section height = 100vh + (N-1)*STEP_PX scroll travel.
   .gallery-sticky-inner sticks to top: 0.
   window scroll progress 0→1 maps to card 0→N-1.
════════════════════════════════════════════════════════ */

function initScrollDrive() {
    const section = document.querySelector('.curved-gallery-section');
    if (!section) return;

    const STEP_PX = 180;
    const scrollTravel = (N - 1) * STEP_PX;
    const END_BUFFER = 400;
    section.style.height = `calc(100vh + ${scrollTravel + END_BUFFER}px)`;

    let lastIdx = -1;

    function onScroll() {
        if (Date.now() < manualNavTimer) return;
        const rect     = section.getBoundingClientRect();
        const scrolled = -rect.top;
        if (scrolled < 0) return;
        const progress = Math.max(0, Math.min(1, scrolled / scrollTravel));
        const idx      = Math.round(progress * (N - 1));
        if (idx !== lastIdx) {
            lastIdx = idx;
            goTo(idx);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ════════════════════════════════════════════════════════
   LIGHTBOX
════════════════════════════════════════════════════════ */

function buildLightbox() {
    const lb = document.createElement('div');
    lb.className = 'gallery-lightbox';
    lb.id        = 'galleryLightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = `
        <div class="gallery-lightbox-backdrop" id="lbBackdrop"></div>
        <div class="gallery-lightbox-frame" id="lbFrame">
            <img id="lbImg" src="" alt="">
            <button class="gallery-lightbox-close" id="lbClose" aria-label="Close">
                <i class="ri-close-line"></i>
            </button>
            <div class="gallery-lightbox-caption">
                <div class="gallery-lightbox-title" id="lbTitle"></div>
                <div class="gallery-lightbox-sub"   id="lbSub"></div>
            </div>
        </div>`;
    document.body.appendChild(lb);

    document.getElementById('lbClose').addEventListener('click',    closeLightbox);
    document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function openLightbox(i) {
    const c = CARDS[i];
    document.getElementById('lbImg').src           = c.img;
    document.getElementById('lbImg').alt           = c.title;
    document.getElementById('lbTitle').textContent = c.title;
    document.getElementById('lbSub').textContent   = c.sub;

    const lb = document.getElementById('galleryLightbox');
    lb.classList.add('is-open');
    gsap.fromTo(lb,      { opacity: 0 },           { opacity: 1, duration: .28, ease: 'power2.out' });
    gsap.fromTo('#lbFrame', { scale: .88, y: 24 }, { scale: 1,   y: 0,  duration: .38, ease: 'back.out(1.6)' });
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('galleryLightbox');
    gsap.to(lb,         { opacity: 0, duration: .22, ease: 'power2.in',
        onComplete: () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; } });
    gsap.to('#lbFrame', { scale: .9, y: 16, duration: .22, ease: 'power2.in' });
}

/* ════════════════════════════════════════════════════════
   KEYBOARD
════════════════════════════════════════════════════════ */
function initKeyboard() {
    document.addEventListener('keydown', e => {
        if (document.getElementById('galleryLightbox')?.classList.contains('is-open')) return;
        if (e.key === 'ArrowRight') goTo(currentIndex + 1);
        if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
    });
}

/* ════════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
    buildControls();
    buildLightbox();
    initKeyboard();

    /* Set all card positions instantly (no animation on load) */
    updateCarousel(false);

    /* Set up scroll drive immediately */
    initScrollDrive();

    /* Entrance: cards fade + drift up */
    gsap.from(cardEls, {
        opacity:  0,
        y:        30,
        stagger:  0.04,
        duration: 0.6,
        ease:     'power3.out',
    });

    /* Back-to-top */
    const backTop = document.getElementById('footerBackTop');
    if (backTop) backTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
