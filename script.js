/* ============================================================
   PORTFOLIO JAVASCRIPT
   Piyush Kumar Singh
   ============================================================ */

'use strict';

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen.toString());
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== TYPEWRITER =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Full Stack Developer',
  'TypeScript Enthusiast',
  'AI App Builder',
  'Real-time Systems Dev',
  'Open Source Explorer',
];

let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
const TYPING_SPEED   = 80;
const DELETING_SPEED = 45;
const PAUSE          = 1800;

function typeLoop() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typewriterEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, PAUSE);
      return;
    }
    setTimeout(typeLoop, TYPING_SPEED);
  } else {
    typewriterEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
    setTimeout(typeLoop, DELETING_SPEED);
  }
}
typeLoop();

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1200) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Observer for counters
const counterEls = document.querySelectorAll('.stat-number[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ===== REVEAL ON SCROLL =====
function addRevealClasses() {
  const selectors = [
    '.about-text',
    '.about-cards',
    '.skill-category',
    '.project-card',
    '.contact-card',
    '.section-header',
  ];
  document.querySelectorAll(selectors.join(', ')).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });
}
addRevealClasses();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PROJECT FILTER =====
const filterBtns    = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const categories = card.dataset.category || '';
        if (categories.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      }
    });
  });
});

// ===== SMOOTH ACTIVE NAV LINK =====
const sections  = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(link => {
        link.classList.toggle(
          'active-link',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== SKILL PILL HOVER RIPPLE =====
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 16px rgba(99,102,241,0.4)';
  });
  pill.addEventListener('mouseleave', function() {
    this.style.boxShadow = '';
  });
});
