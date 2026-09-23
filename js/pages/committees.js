export const committeesData = [
    {
        num: "01",
        agency: "United Nations · Beginner",
        name: "UNGA — DISEC",
        description: "Disarmament & international security. Conventional arms, non-proliferation, and the endless question of peace in a nuclear age.",
        difficulty: 1
    },
    {
        num: "02",
        agency: "United Nations · Intermediate",
        name: "UNHRC",
        description: "Human rights crises, real-time. Kashmir to Gaza, freedom of expression to custodial justice — no topic is off the table.",
        difficulty: 3
    },
    {
        num: "03",
        agency: "Crisis Committee · Advanced",
        name: "UNSC — 1971",
        description: "A continuous crisis simulation set during the Bangladesh Liberation War. Cabinet directives, press conferences, and backchannels.",
        difficulty: 4
    },
    {
        num: "04",
        agency: "Indian Context · All Levels",
        name: "Lok Sabha — Special Session",
        description: "Simulate the Indian Parliament itself. The Women's Reservation Bill, delimitation, and parliamentary procedure — desi style.",
        difficulty: 2
    },
    {
        num: "05",
        agency: "Futuristic · Expert",
        name: "Intergalactic Senate — 2187",
        description: "Our signature fantasy committee. Martian water rights, AI personhood, and trade routes across the asteroid belt.",
        difficulty: 5
    }
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
