// ===================================================================
// SINTAYEHU DESALEGN — PORTFOLIO (vanilla JS)
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initThemeToggle();
  initMobileNav();
  initNavbarScroll();
  initTypingEffect();
  initSmoothScrollClose();
});

/* ---------- Footer year ---------- */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Dark / light theme toggle ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const iconMoon = document.getElementById('iconMoon');
  const iconSun = document.getElementById('iconSun');

  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initial);
  updateIcons(initial);

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcons(next);
  });

  function updateIcons(theme) {
    if (theme === 'dark') {
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
      toggleBtn.title = 'Switch to day shift';
    } else {
      iconMoon.style.display = 'none';
      iconSun.style.display = 'block';
      toggleBtn.title = 'Switch to night shift';
    }
  }
}

/* ---------- Mobile hamburger nav ---------- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger--open');
    links.classList.toggle('navbar__links--open');
  });
}

/* Close mobile menu after clicking a nav link */
function initSmoothScrollClose() {
  const hamburger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  document.querySelectorAll('.navbar__links a').forEach((a) => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('hamburger--open');
      links.classList.remove('navbar__links--open');
    });
  });
}

/* ---------- Navbar background on scroll ---------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 12) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* ---------- Typing / role rotator in hero ---------- */
function initTypingEffect() {
  const ROLES = [
    'Cyber Threat Intelligence Analyst',
    'Full-Stack Developer',
    'OSINT Researcher',
  ];

  const el = document.getElementById('typedRole');
  if (!el) return;

  // Respect reduced-motion users: just show the first role, static.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = ROLES[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 35;
  const PAUSE = 1400;

  function tick() {
    const current = ROLES[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        setTimeout(tick, TYPE_SPEED);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}
