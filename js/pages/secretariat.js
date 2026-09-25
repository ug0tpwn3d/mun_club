const teamData = {
    faculty: [
        {
            role: "Faculty Co-ordinator",
            name: "Dr. Shiv Priya",
            position: "Assistant Professor , English Department",
            quote: "A good delegate changes the debate. A great one changes the room.",
            image: "#"
        },
        {
            role: "Faculty Co-ordinator",
            name: "Mrs. Sanju Chaudhary",
            position: "Associate Professor , Information Technology Department",
            quote: "Procedure is not a cage. It is the arena.",
            image: "#"
        }
    ],
    students: [
        /*
{
            role: "Student Co-ordinator",
            name: "Nishant Kumar",
            position: "V th Sem , CSE Department",
            quote: "Every portfolio is a passport. Use it well.",
            image: "#"
        },
*/
        {
            role: "Student Co-ordinator",
            name: "Keshav Saini",
            position: "V th Sem , IT Department",
            quote: "History doesn't repeat, but it does rhyme — and I write the rhymes.",
            image: "#"
        },
        {
            role: "Student Co-ordinator",
            name: "Shivansh Dwivedi",
            position: "III rd Sem , IT Department",
            quote: "Never doubt that you are valuable and capable of changing the world.",
            image: "#"
        },
        {
            role: "Student Co-ordinator",
            name: "Ronak Dev",
            position: "III rd Sem , Mech Department",
            quote: "The ink may be imaginary, but the words change the world.",
            image: "#"
        }
    ]
};


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
