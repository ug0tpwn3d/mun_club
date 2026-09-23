// Delegate registration form handler
function initRegistrationForm() {
    const form = document.getElementById('registerForm');
    const note = document.getElementById('formNote');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (note) {
                note.textContent = 'Portfolio request received — check your inbox for confirmation.';
            }
            form.reset();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegistrationForm);
} else {
    initRegistrationForm();
}


// Mobile navigation toggle
(function () {
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
            links.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => {
                    btn.classList.remove('open');
                    links.classList.remove('mobile-open');
                    nav.classList.remove('nav--mobile-open');
                    document.body.style.overflow = '';
                });
            });
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavToggle);
    } else {
        initNavToggle();
    }
})();
