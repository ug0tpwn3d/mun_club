/**
 * SKIT MUN CLUB — Global JavaScript (js/global.js)
 * Unified platform scripts: navigation toggle, accordion, back-to-top, form handlers.
 */

// Site metadata
const siteData = {
    name: "SKIT MUN CLUB",
    institute: "Swami Keshvanand Institute of Technology, Management & Gramothan, Jaipur",
    email: "skitmg.mun.club@gmail.com",
    instagram: "https://www.instagram.com/skit.mun.club",
    phone: "9999999999",
    established: 2020,
    flagshipConference: "ARAMBH MUN 2026",
    location: "Jaipur, Rajasthan, India"
};

// 1. Mobile Navigation Toggle
function initNavToggle() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.nav-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    const links = nav.querySelector('.nav-links');
    if (links) links.setAttribute('data-lenis-prevent', '');

    function setNavOpen(isOpen) {
        btn.classList.toggle('open', isOpen);
        if (links) links.classList.toggle('mobile-open', isOpen);
        nav.classList.toggle('nav--mobile-open', isOpen);
        document.documentElement.classList.toggle('nav-open', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (typeof lenis !== 'undefined' && lenis) {
            isOpen ? lenis.stop() : lenis.start();
        }
    }

    btn.addEventListener('click', () => {
        setNavOpen(!btn.classList.contains('open'));
    });

    if (links) {
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => setNavOpen(false));
        });
    }
}

// 2. FAQ Accordion Handler
function initFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');
    if (!triggers.length) return;

    triggers.forEach((btn) => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const body = btn.nextElementSibling;

            // Close other items
            triggers.forEach((other) => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    if (other.nextElementSibling) other.nextElementSibling.style.maxHeight = '0';
                }
            });

            // Toggle active item
            btn.setAttribute('aria-expanded', String(!expanded));
            if (body) body.style.maxHeight = expanded ? '0' : body.scrollHeight + 'px';
        });
    });
}

// 3. Back to Top Smooth Scroll
function initBackToTop() {
    const backToTopBtn = document.getElementById('footerBackTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// 4. Form Handlers (Registration & Communique)
function initForms() {
    const regForm = document.getElementById('registerForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const note = document.getElementById('formNote');
            if (note) {
                note.textContent = 'Message sent successfully — our team will reach out shortly!';
                note.style.color = 'var(--orange)';
                note.style.fontWeight = '700';
            }
            e.target.reset();
        });
    }
}

// Initialize on DOM Ready
function initGlobal() {
    initNavToggle();
    initFaqAccordion();
    initBackToTop();
    initForms();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobal);
} else {
    initGlobal();
}
