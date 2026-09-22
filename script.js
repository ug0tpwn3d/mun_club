// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Smooth scrolling via Lenis
const lenis = new Lenis({ lerp: 0.09 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// On all pages except home, nav is always visible
const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
if (!isHome) {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.add('nav--scrolled');
}

// Inject hamburger toggle into nav (avoids editing every HTML file)
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Toggle navigation');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);
  const links = nav.querySelector('.nav-links');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('mobile-open');
    document.body.style.overflow = links.classList.contains('mobile-open') ? 'hidden' : '';
  });
  // Close on nav link click
  links && links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
})();

// Smooth anchor navigation
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); lenis.scrollTo(target); }
  });
});

// Custom cursor (desktop only)
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
gsap.ticker.add(() => {
  rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
  gsap.set(dot, { x: mx - 4, y: my - 4 });
  gsap.set(ring, { x: rx - 18, y: ry - 18 });
});

// Preloader then hero intro
gsap.timeline()
  .to('.preloader-logo', { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' })
  .to('.preloader-tag', { opacity: 1, duration: 0.5 }, '-=.2')
  .to('#preloader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut', delay: 0.4 })
  .set('#preloader', { display: 'none' })
  .from('.hero-title .line > span', { yPercent: 110, duration: 1, stagger: 0.12, ease: 'power4.out' }, '-=.5')
  .from('.piece', { scale: 0, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(1.6)' }, '-=.6');

// Exploded view: pieces scatter out of the hero on scroll
document.querySelectorAll('.piece').forEach((p) => {
  gsap.to(p, {
    x: () => gsap.utils.random(-500, 500),
    y: () => gsap.utils.random(-420, -120),
    rotation: () => gsap.utils.random(-40, 40),
    opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
});
gsap.to('.hero-title', {
  scale: 0.85, opacity: 0, y: -120, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: '70% top', scrub: true },
});



// Infinite loops for marquee
const marqueeTrack = document.getElementById('marqueeTrack');
if (marqueeTrack) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML + marqueeTrack.innerHTML;
  gsap.to(marqueeTrack, { xPercent: -33.333, duration: 22, repeat: -1, ease: 'none' });
}

// Manifesto: word-by-word scrub reveal
const mt = document.getElementById('manifestoText');
mt.innerHTML = mt.innerHTML.replace(/(<[^>]+>)|(\S+)/g, (m, tag, word) => (tag ? tag : `<span class="word">${word}</span>`));
gsap.to('.manifesto-text .word', {
  opacity: 1, stagger: 0.04, ease: 'none',
  scrollTrigger: { trigger: '.about', start: 'top 70%', end: 'top 15%', scrub: true },
});

// Stats count-up on enter
document.querySelectorAll('[data-count]').forEach((el) => {
  ScrollTrigger.create({
    trigger: el, start: 'top 85%', once: true,
    onEnter: () => gsap.fromTo(el, { innerText: 0 },
      { innerText: +el.dataset.count, duration: 1.8, snap: { innerText: 1 }, ease: 'power2.out' }),
  });
});

// Committees: pinned horizontal scroll (desktop only)
const track = document.getElementById('committeeTrack');
if (track && window.innerWidth > 768) {
  const getScroll = () => track.scrollWidth - innerWidth;
  gsap.to(track, {
    x: () => -getScroll(), ease: 'none',
    scrollTrigger: {
      trigger: '.committees', start: 'top top',
      end: () => '+=' + getScroll(),
      pin: true, scrub: 1, invalidateOnRefresh: true,
    },
  });
}

// Committee cards: subtle 3D tilt on hover
document.querySelectorAll('.comm-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    gsap.to(card, {
      rotationY: ((e.clientX - r.left) / r.width - 0.5) * 10,
      rotationX: -((e.clientY - r.top) / r.height - 0.5) * 10,
      transformPerspective: 800, duration: 0.4,
    });
  });
  card.addEventListener('mouseleave', () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6 }));
});

// Conference: ARAMBH MUN text fills orange when Outreach section enters view
const outreachEl = document.getElementById('confOutreach');
const conferenceDateEl = document.querySelector('.conference-date');
if (outreachEl && conferenceDateEl) {
  gsap.fromTo(conferenceDateEl,
    { color: 'transparent' },
    {
      color: 'var(--orange)', ease: 'none',
      scrollTrigger: {
        trigger: outreachEl,
        start: 'top 65%',
        end: 'bottom 30%',
        scrub: true,
      },
    });
}

// Navbar background on scroll
// Navbar scroll-toggle — home only (inner pages are always scrolled)
if (isHome) {
  ScrollTrigger.create({
    start: 'top -50',
    onUpdate: (self) => {
      document.querySelector('.nav').classList.toggle('nav--scrolled', self.scroll() > 50);
    },
  });
}

// Secretariat: seamless subtle reveal
const secCards = document.querySelectorAll('.sec-card');
if (secCards.length) {
  gsap.from(secCards, {
    y: 30, opacity: 0,
    duration: 0.6, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: '.secretariat', start: 'top 80%', once: true },
  });
}

// Registration section entrance
const registerEls = document.querySelectorAll('.register-giant, .register-form');
if (registerEls.length) {
  gsap.from(registerEls, {
    y: 90, opacity: 0, stagger: 0.15, duration: 1, ease: 'power4.out',
    scrollTrigger: { trigger: '.register', start: 'top 75%', once: true },
  });
}

// Registration form: fake submit with success note
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    note.textContent = 'Portfolio request received — check your inbox for confirmation.';
    e.target.reset();
  });
}

// Section labels fade in
document.querySelectorAll('.section-label').forEach((l) => {
  gsap.from(l, {
    opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: l, start: 'top 90%', once: true },
  });
});

// Recalculate triggers on resize
addEventListener('resize', () => ScrollTrigger.refresh());