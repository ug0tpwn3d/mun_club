// Register GSAP plugins safely (only if loaded in page)
if (typeof gsap !== 'undefined') {
  if (typeof ScrollToPlugin !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  } else if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
}

// Smooth scrolling via Lenis
let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({ lerp: 0.09 });
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}

// Home check: only the homepage hero has a transparent nav
const isHome = document.body.classList.contains('page-home') || window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/mun_club/') || window.location.pathname.endsWith('/mun_club/index.html');
const nav = document.querySelector('.nav');
if (!isHome && nav) {
  nav.classList.add('nav--scrolled');
}

// Inject hamburger toggle into nav (avoids editing every HTML file)
(function () {
  const nav = document.querySelector('.nav');
  if (!nav || nav.querySelector('.nav-toggle')) return;
  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Toggle navigation');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);
  const links = nav.querySelector('.nav-links');
  if (links) links.setAttribute('data-lenis-prevent', '');

  function setNavOpen(isOpen) {
    btn.classList.toggle('open', isOpen);
    if (links) links.classList.toggle('mobile-open', isOpen);
    nav.classList.toggle('nav--mobile-open', isOpen);
    document.documentElement.classList.toggle('nav-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (typeof lenis !== 'undefined' && lenis) {
      isOpen ? lenis.stop() : lenis.start();
    }
  }

  btn.addEventListener('click', () => {
    setNavOpen(!btn.classList.contains('open'));
  });
  // Close on nav link click
  if (links) {
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setNavOpen(false));
    });
  }
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.classList.contains('open')) {
      setNavOpen(false);
    }
  });
})();

// Smooth anchor navigation
document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || href === '/#') return;
    const selector = href.startsWith('/#') ? href.slice(1) : href;
    try {
      const target = document.querySelector(selector);
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (_) {}
  });
});

// Custom cursor (desktop only)
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring && typeof gsap !== 'undefined') {
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
    gsap.set(dot, { x: mx - 4, y: my - 4 });
    gsap.set(ring, { x: rx - 18, y: ry - 18 });
  });
}

// Preloader then hero intro (homepage only)
const preloader = document.getElementById('preloader');
if (preloader && typeof gsap !== 'undefined') {
  gsap.timeline()
    .to('.preloader-logo', { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' })
    .to('.preloader-tag', { opacity: 1, duration: 0.5 }, '-=.2')
    .to('#preloader', { yPercent: -100, duration: 0.75, ease: 'power4.inOut', delay: 0.5 })
    .set('#preloader', { display: 'none' })
    .from('.hero-title .line > span', { yPercent: 110, duration: 0.8, stagger: 0.1, ease: 'power4.out' }, '-=.4')
    .fromTo('.hero-action-group', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=.3')
    .from('.piece', { scale: 0, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'back.out(1.5)' }, '-=.5');
} else if (typeof gsap !== 'undefined' && document.querySelector('.hero-title')) {
  gsap.timeline()
    .from('.hero-title .line > span', { yPercent: 110, duration: 0.8, stagger: 0.1, ease: 'power4.out' })
    .fromTo('.hero-action-group', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=.3')
    .from('.piece', { scale: 0, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'back.out(1.5)' }, '-=.5');
}

// Exploded view: pieces scatter out of the hero on scroll
const pieces = document.querySelectorAll('.piece');
if (pieces.length && document.querySelector('.hero') && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  pieces.forEach((p) => {
    gsap.to(p, {
      x: () => gsap.utils.random(-500, 500),
      y: () => gsap.utils.random(-420, -120),
      rotation: () => gsap.utils.random(-40, 40),
      opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  });
}

// Hero section scroll: content floats upwards on the very least scrolling
const heroContent = document.querySelector('.hero-center') || document.querySelector('.hero-title');
if (heroContent && document.querySelector('.hero') && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.to(heroContent, {
    scale: 0.86,
    opacity: 0,
    y: -130,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '65% top',
      scrub: true,
    },
  });
}

// Infinite loops for marquee
const marqueeTrack = document.getElementById('marqueeTrack');
if (marqueeTrack && typeof gsap !== 'undefined') {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML + marqueeTrack.innerHTML;
  gsap.to(marqueeTrack, { xPercent: -33.333, duration: 22, repeat: -1, ease: 'none' });
}

// Manifesto: word-by-word scrub reveal
const mt = document.getElementById('manifestoText');
if (mt && document.querySelector('.about') && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  mt.innerHTML = mt.innerHTML.replace(/(<[^>]+>)|(\S+)/g, (m, tag, word) => (tag ? tag : `<span class="word">${word}</span>`));
  gsap.to('.manifesto-text .word', {
    opacity: 1, stagger: 0.04, ease: 'none',
    scrollTrigger: { trigger: '.about', start: 'top 70%', end: 'top 15%', scrub: true },
  });
}

// Stats count-up on enter
const statEls = document.querySelectorAll('[data-count]');
if (statEls.length && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  statEls.forEach((el) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.fromTo(el, { innerText: 0 },
        { innerText: +el.dataset.count, duration: 1.8, snap: { innerText: 1 }, ease: 'power2.out' }),
    });
  });
}

// Committees: pinned horizontal scroll (desktop only, when cards overflow viewport)
const track = document.getElementById('committeeTrack');
if (track && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  ScrollTrigger.matchMedia({
    '(min-width: 769px)': function () {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);
      if (track.scrollWidth > window.innerWidth + 20) {
        const tween = gsap.to(track, {
          x: () => -getScroll(),
          ease: 'none',
          scrollTrigger: {
            id: 'commTrackPin',
            trigger: '.committees',
            start: 'top top',
            end: () => '+=' + getScroll(),
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          if (tween.scrollTrigger) tween.scrollTrigger.kill();
          tween.kill();
          gsap.set(track, { clearProps: 'transform' });
        };
      } else {
        gsap.set(track, { clearProps: 'transform' });
      }
    },
    '(max-width: 768px)': function () {
      gsap.set(track, { clearProps: 'transform' });
    },
  });
}

// Committee cards: subtle 3D tilt on hover
const commCards = document.querySelectorAll('.comm-card');
if (commCards.length && typeof gsap !== 'undefined') {
  commCards.forEach((card) => {
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
}

// Conference: ARAMBH MUN text fills orange when Outreach section enters view
const outreachEl = document.getElementById('confOutreach');
const conferenceDateEl = document.querySelector('.conference-date');
if (outreachEl && conferenceDateEl && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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

// Navbar scroll-toggle — home only (inner pages are styled opaque in CSS)
if (isHome && typeof ScrollTrigger !== 'undefined') {
  ScrollTrigger.create({
    start: 'top -50',
    onUpdate: (self) => {
      const navEl = document.querySelector('.nav');
      if (navEl) navEl.classList.toggle('nav--scrolled', self.scroll() > 50);
    },
  });
}

// Secretariat: seamless subtle reveal
const secCards = document.querySelectorAll('.sec-card');
if (secCards.length && document.querySelector('.secretariat') && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.from(secCards, {
    y: 30, opacity: 0,
    duration: 0.6, stagger: 0.08, ease: 'power2.out',
    clearProps: 'transform',
    scrollTrigger: { trigger: '.secretariat', start: 'top 80%', once: true },
  });
}

// Registration / Communique section entrance
const communiqueEls = document.querySelectorAll('.communique-left, .talk-form-card, .register-giant, .register-form');
if (communiqueEls.length && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.from(communiqueEls, {
    y: 50, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '.communique-section, .register', start: 'top 78%', once: true },
  });
}

// Registration form: submit with success note
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    if (note) {
      note.textContent = 'Message sent successfully — our team will reach out shortly!';
      note.style.color = '#20cf6b';
      note.style.fontWeight = '700';
    }
    e.target.reset();
  });
}

// Back to top link in footer
const footerBackTop = document.getElementById('footerBackTop');
if (footerBackTop) {
  footerBackTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Section labels fade in
const sectionLabels = document.querySelectorAll('.section-label');
if (sectionLabels.length && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  sectionLabels.forEach((l) => {
    gsap.from(l, {
      opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: l, start: 'top 90%', once: true },
    });
  });
}

// Recalculate triggers on resize and load
if (typeof ScrollTrigger !== 'undefined') {
  addEventListener('resize', () => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
}
// Handle direct arrival with hash (e.g. index.html#communicate from another page)
if (window.location.hash) {
  const hash = window.location.hash;
  window.addEventListener('load', () => {
    setTimeout(() => {
      try {
        const target = document.querySelector(hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } catch (_) {}
    }, document.getElementById('preloader') ? 1800 : 100);
  });
}
