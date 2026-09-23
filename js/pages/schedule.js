export const scheduleData = [
    { time: "08:30 - 09:30", event: "Delegate Registration & Kit Distribution" },
    { time: "10:00 - 11:00", event: "Opening Ceremony & Executive Board Introduction" },
    { time: "11:30 - 13:30", event: "Committee Session I (Agenda Discussion & GSL)" },
    { time: "13:30 - 14:30", event: "Lunch & Informal Diplomatic Consultations" },
    { time: "14:30 - 17:00", event: "Committee Session II (Crisis Directives & Resolution Voting)" },
    { time: "17:30 - 18:30", event: "Valedictory Ceremony & Best Delegation Awards" }
];


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
