// FAQ accordion — click to open/close, one open at a time
function initFaqAccordion() {
    document.querySelectorAll('.faq-trigger').forEach((btn) => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const body = btn.nextElementSibling;

            // Close all others
            document.querySelectorAll('.faq-trigger[aria-expanded="true"]').forEach((other) => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    if (other.nextElementSibling) other.nextElementSibling.style.maxHeight = '0';
                }
            });

            // Toggle this one
            btn.setAttribute('aria-expanded', String(!expanded));
            if (body) body.style.maxHeight = expanded ? '0' : body.scrollHeight + 'px';
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqAccordion);
} else {
    initFaqAccordion();
}
