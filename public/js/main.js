/**
 * Black Plumbing Heating & Air - Main Client Script
 * Sticky Nav, Mobile Drawer, Theme Toggle, Review Carousel, Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initThemeToggle();
  initReviewCarousel();
});

// 1. Sticky Navigation Scroll Effect
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// 2. Mobile Drawer Navigation & Accordions
function initMobileDrawer() {
  const hamburgerBtn = document.querySelector('.mobile-hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');

  if (!hamburgerBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Accordion submenus inside drawer
  const accordionLinks = drawer.querySelectorAll('.has-submenu');
  accordionLinks.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const subnav = item.nextElementSibling;
      if (subnav && subnav.classList.contains('drawer-subnav')) {
        const isOpen = subnav.classList.contains('active');
        // Close others
        drawer.querySelectorAll('.drawer-subnav').forEach(s => s.classList.remove('active'));
        if (!isOpen) {
          subnav.classList.add('active');
        }
      }
    });
  });
}

// 3. Theme Toggle (Midnight Obsidian / Architectural Light)
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('bp_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('bp_theme', next);
      updateThemeIcons(next);
      showToast(`Switched to ${next === 'dark' ? 'Midnight Obsidian' : 'Studio Clean'} mode`, 'info');
    });
  });
}

function updateThemeIcons(theme) {
  const logos = document.querySelectorAll('.header-logo img, .header-logo object');
  logos.forEach(logo => {
    if (theme === 'light') {
      logo.src = 'assets/images/logo-light.svg';
    } else {
      logo.src = 'assets/images/logo.svg';
    }
  });
}

// 4. Customer Reviews Carousel
function initReviewCarousel() {
  const carousel = document.querySelector('.reviews-carousel-wrapper');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.review-slide-card');
  const prevBtn = carousel.querySelector('.carousel-nav-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-nav-btn.next');

  if (slides.length <= 1) return;

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((s, idx) => {
      s.style.display = idx === index ? 'block' : 'none';
    });
    currentIndex = index;
  }

  showSlide(0);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(nextIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    });
  }

  // Auto advance every 8 seconds
  setInterval(() => {
    if (!document.hidden) {
      const nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }
  }, 8000);
}

// 5. Toast Notification System
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span style="font-size: 1.25rem;">${type === 'success' ? '✓' : 'ℹ'}</span>
    <div>
      <strong style="display:block; font-size: 0.9rem;">${type === 'success' ? 'Success' : 'Notice'}</strong>
      <span style="font-size: 0.85rem; color: var(--text-muted);">${message}</span>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

window.showToast = showToast;

