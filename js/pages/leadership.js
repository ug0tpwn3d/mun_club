// Student co-ordinator cards — popup animation when section enters view
function initLeadershipAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const studentMiniCards = document.querySelectorAll('#lmStudentCards .lm-student-mini');
        if (studentMiniCards.length) {
            gsap.to(studentMiniCards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.55,
                stagger: 0.13,
                ease: 'back.out(1.6)',
                scrollTrigger: {
                    trigger: '#student-sidebar',
                    start: 'top 75%',
                    once: true
                }
            });
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeadershipAnimations);
} else {
    initLeadershipAnimations();
}
