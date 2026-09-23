// ============================================================
// Registration Page JavaScript — /js/pages/registration.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initRegistrationForm();
    initNavToggle();
    initBackToTop();
});

// Delegate registration form handler
function initRegistrationForm() {
    const form = document.getElementById('registerForm');
    const note = document.getElementById('formNote');
    const formCard = document.getElementById('regFormCard');
    const successCard = document.getElementById('regSuccessCard');
    const resetBtn = document.getElementById('regResetBtn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name') || 'Delegate';
        const committee = formData.get('committee') || 'All India Political Party Meet (AIPPM)';
        const pref1 = formData.get('pref1') || 'Allocated by Secretariat';
        const email = formData.get('email') || '';

        // Populate success card
        const nameEl = document.getElementById('successDelegateName');
        const commEl = document.getElementById('successCommittee');
        const prefEl = document.getElementById('successPref');
        const emailEl = document.getElementById('successEmail');

        if (nameEl) nameEl.textContent = name;
        if (commEl) commEl.textContent = committee;
        if (prefEl) prefEl.textContent = pref1;
        if (emailEl) emailEl.textContent = email;

        if (formCard && successCard) {
            formCard.style.display = 'none';
            successCard.style.display = 'block';
            successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (note) {
            note.textContent = 'Application received! Check your inbox for confirmation.';
        }

        form.reset();
    });

    if (resetBtn && formCard && successCard) {
        resetBtn.addEventListener('click', () => {
            successCard.style.display = 'none';
            formCard.style.display = 'block';
            formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
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

// Smooth back to top
function initBackToTop() {
    const backTop = document.getElementById('footerBackTop');
    if (backTop) {
        backTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
