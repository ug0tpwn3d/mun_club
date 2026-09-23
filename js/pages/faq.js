// ============================================================
// FAQ Page JavaScript — /js/pages/faq.js
// ============================================================

const faqData = [
    {
        q: "What is Model United Nations (MUN)?",
        a: "Model United Nations is an academic simulation of the United Nations where students step into the shoes of diplomats, representing different countries or portfolios to debate, lobby, and formulate draft resolutions on pressing global issues."
    },
    {
        q: "Is MUN only for experienced delegates?",
        a: "Not at all. We host committees suited for beginners alongside advanced crisis simulations. Furthermore, SKIT MUN conducts preparatory mentorship sessions for first-time delegates."
    },
    {
        q: "What is the dress code for ARAMBH MUN?",
        a: "Western Formal attire (business suits, blazers, formal shirts and trousers/skirts) or Indian Formals (such as Kurta-Pajama with Nehru jacket or formal Sarees for Indian committees)."
    },
    {
        q: "What is a Position Paper and is it mandatory?",
        a: "A Position Paper is a concise policy document explaining your assigned country's stance on the committee agenda. While mandatory for award consideration, it also serves as your research blueprint during the conference."
    },
    {
        q: "How does portfolio allocation work?",
        a: "Portfolios (countries/portfolios) are allocated on a first-come, first-served basis matching your committee preference and past MUN experience indicated in your registration form."
    }
];

// FAQ accordion — click to open/close, one open at a time
function initFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');
    if (!triggers.length) return;

    triggers.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            const body = btn.nextElementSibling;

            // Close all other open accordions
            triggers.forEach((other) => {
                if (other !== btn && other.getAttribute('aria-expanded') === 'true') {
                    other.setAttribute('aria-expanded', 'false');
                    const otherBody = other.nextElementSibling;
                    if (otherBody) {
                        otherBody.style.maxHeight = '0px';
                    }
                }
            });

            // Toggle clicked accordion
            if (isExpanded) {
                btn.setAttribute('aria-expanded', 'false');
                if (body) {
                    body.style.maxHeight = '0px';
                }
            } else {
                btn.setAttribute('aria-expanded', 'true');
                if (body) {
                    body.style.maxHeight = body.scrollHeight + 'px';
                }
            }
        });
    });

    // Handle window resize so open accordion doesn't clip if text wraps
    window.addEventListener('resize', () => {
        const openTrigger = document.querySelector('.faq-trigger[aria-expanded="true"]');
        if (openTrigger && openTrigger.nextElementSibling) {
            openTrigger.nextElementSibling.style.maxHeight = openTrigger.nextElementSibling.scrollHeight + 'px';
        }
    });
}

// Mobile navigation toggle
function initNavToggle() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.nav-toggle')) return;

    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    const links = nav.querySelector('.nav-links');
    btn.addEventListener('click', () => {
        const isOpen = btn.classList.toggle('open');
        if (links) {
            links.classList.toggle('mobile-open', isOpen);
            nav.classList.toggle('nav--mobile-open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    });

    if (links) {
        links.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                btn.classList.remove('open');
                links.classList.remove('mobile-open');
                nav.classList.remove('nav--mobile-open');
                document.body.style.overflow = '';
            });
        });
    }
}

// Back to top smooth scroll
function initBackToTop() {
    const backTop = document.getElementById('footerBackTop');
    if (backTop) {
        backTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initFaqAccordion();
        initNavToggle();
        initBackToTop();
    });
} else {
    initFaqAccordion();
    initNavToggle();
    initBackToTop();
}
