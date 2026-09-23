const resourcesData = [
    {
        category: "Category A: Foundations & Prep",
        items: [
            { title: "What Is MUN?", slug: "what-is-mun", path: "/resources/articles/what-is-mun.html", desc: "A comprehensive introduction to Model United Nations, debate culture, and diplomatic decorum." },
            { title: "First MUN Guide", slug: "first-mun", path: "/resources/articles/first-mun.html", desc: "Step-by-step checklist for navigating your maiden conference with confidence." },
            { title: "Conference Checklist & Prep", slug: "conference-checklist", path: "/resources/articles/conference-checklist.html", desc: "7-day countdown, physical binder contents, and emergency stationeries." },
            { title: "MUN Dress Code & Poise", slug: "dress-code", path: "/resources/articles/dress-code.html", desc: "Western Business Formal vs. Indian Traditional Attire and chamber decorum." }
        ]
    },
    {
        category: "Category B & C: Research & Procedure",
        items: [
            { title: "Country Research Dossier", slug: "country-research", path: "/resources/articles/country-research.html", desc: "Investigating national interests, citing UN databases, and creating modular 1-page briefs." },
            { title: "Rules of Procedure", slug: "rules", path: "/resources/rules.html", desc: "Points, motions, moderated caucuses, voting procedure, and parliamentary flow." },
            { title: "Position Paper Guide", slug: "position-paper", path: "/resources/position-paper.html", desc: "Drafting diplomatic policy briefs, country mandates, and actionable proposals." },
            { title: "Resolution Writing", slug: "resolution-writing", path: "/resources/resolution-writing.html", desc: "Mastering preambulatory clauses, operative mandates, sponsors, and amendments." }
        ]
    },
    {
        category: "Category F, G & H: Rhetoric, Diplomacy & Strategy",
        items: [
            { title: "Public Speaking & GSL", slug: "public-speaking", path: "/resources/articles/public-speaking.html", desc: "Hook-point-action speech structure, rhetorical impact, and yielding." },
            { title: "Negotiation & Consensus", slug: "negotiation", path: "/resources/articles/negotiation.html", desc: "Principled negotiation, red lines, bargaining chips, and deadlock breakthroughs." },
            { title: "Lobbying & Bloc Formation", slug: "lobbying", path: "/resources/articles/lobbying.html", desc: "Unmoderated caucuses, dividing working groups, and sponsor-signatory dynamics." },
            { title: "Advanced Strategy & Tactics", slug: "advanced-strategies", path: "/resources/articles/advanced-strategies.html", desc: "Motion precedence, amendment warfare, and division of the question maneuvers." }
        ]
    },
    {
        category: "Specialized Chamber Guides",
        items: [
            { title: "UN Security Council (UNSC)", slug: "unsc", path: "/resources/articles/unsc.html", desc: "Chapter VII enforcement mandates, P5 veto dynamics, and E10 leverage." },
            { title: "UN General Assembly (UNGA)", slug: "unga", path: "/resources/articles/unga.html", desc: "Sovereign equality, Main Committees (DISEC, ECOFIN, SOCHUM), and broad coalitions." },
            { title: "UN Human Rights Council (UNHRC)", slug: "unhrc", path: "/resources/articles/unhrc.html", desc: "Universal Periodic Review (UPR), Special Rapporteurs, and defending state dossiers." },
            { title: "International Press Corps (IP)", slug: "international-press", path: "/resources/articles/international-press.html", desc: "Journalistic ethics, live reporting, press conferences, and op-ed drafting." },
            { title: "Crisis Committee Strategy", slug: "crisis-committee", path: "/resources/articles/crisis-committee.html", desc: "Continuous crisis mechanics, portfolio directives, and backchannels." },
            { title: "AIPPM & Parliamentary Procedures", slug: "aippm", path: "/resources/articles/aippm.html", desc: "Indian committee protocols, calling attention motions, Zero Hour, and legislation." }
        ]
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
