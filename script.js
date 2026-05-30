// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => navObserver.observe(s));

// Scroll fade-in
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.project-card, .exp-item, .skill-group-label, .skills-intro, .section-header, .stat, .availability, .contact-intro, .contact-email, .social-link'
).forEach((el) => fadeObserver.observe(el));

// Hero name reveal
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.querySelectorAll('span, br').forEach((node) => {
    if (node.tagName === 'BR') return;
  });
  heroName.style.opacity = '1';
  heroName.classList.add('hero-reveal');
}

// Stat counter
function animateCount(el, target, suffix) {
  const duration = 1200;
  const start = performance.now();
  const update = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (t < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/^(\d+)(\+|×|x)?$/);
      if (match) animateCount(el, parseInt(match[1]), match[2] || '');
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-num').forEach((el) => {
  if (/^\d/.test(el.textContent.trim())) statObserver.observe(el);
});
