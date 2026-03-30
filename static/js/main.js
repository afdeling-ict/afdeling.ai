/* afdeling.ai — Main JavaScript */

'use strict';

// ── Nav scroll behavior ────────────────────────────────────
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Mobile nav toggle ──────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal animations ───────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid children
      const delay = entry.target.closest('.product-grid, .steps-grid, .blog-grid, .faq-grid, .pricing-grid')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── FAQ accordion ──────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const btn    = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!btn || !answer) return;

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', `faq-answer-${Math.random().toString(36).slice(2)}`);
});

// ── Smooth scroll for anchor links ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Active nav highlighting ────────────────────────────────
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
  const linkPath = new URL(link.href, window.location.origin).pathname;
  if (currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
    link.style.color = 'var(--text)';
    link.style.fontWeight = '700';
  }
});

// ── Page load fade-in for first .fade-up elements ─────────
document.addEventListener('DOMContentLoaded', () => {
  // Immediately reveal above-the-fold elements
  const heroFadeUps = document.querySelectorAll('.hero .fade-up');
  heroFadeUps.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 100 + 100);
  });
});
