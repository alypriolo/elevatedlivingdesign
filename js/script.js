document.addEventListener('DOMContentLoaded', function () {

  // ── Mobile Hamburger Menu ──────────────────────────────────────────────────
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  var overlay   = document.querySelector('.nav-overlay');

  if (hamburger && mobileNav) {
    function openMenu() {
      mobileNav.classList.add('active');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      if (overlay) overlay.classList.add('active');
    }
    function closeMenu() {
      mobileNav.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.classList.remove('active');
    }
    hamburger.addEventListener('click', function () {
      mobileNav.classList.contains('active') ? closeMenu() : openMenu();
    });
    if (overlay) overlay.addEventListener('click', closeMenu);
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // ── Active Nav Link ────────────────────────────────────────────────────────
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ── Scroll Fade-in Animations ─────────────────────────────────────────────
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ── Gallery Lightbox ──────────────────────────────────────────────────────
  var galleryImgs = document.querySelectorAll('.gallery-grid img');
  if (galleryImgs.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<div class="lightbox__backdrop"></div>' +
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__prev" aria-label="Previous">&#8249;</button>' +
      '<button class="lightbox__next" aria-label="Next">&#8250;</button>' +
      '<img class="lightbox__img" src="" alt="" />';
    document.body.appendChild(lb);

    var lbImg      = lb.querySelector('.lightbox__img');
    var imgs       = Array.from(galleryImgs);
    var currentIdx = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      lbImg.src = imgs[idx].src;
      lbImg.alt = imgs[idx].alt;
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lb.classList.remove('active');
      document.body.style.overflow = '';
    }
    function showPrev() { openLightbox((currentIdx - 1 + imgs.length) % imgs.length); }
    function showNext() { openLightbox((currentIdx + 1) % imgs.length); }

    imgs.forEach(function (img, idx) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () { openLightbox(idx); });
    });
    lb.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__prev').addEventListener('click', showPrev);
    lb.querySelector('.lightbox__next').addEventListener('click', showNext);
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  // ── Back-to-top Button ────────────────────────────────────────────────────
  var btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = '&#8679;';
  document.body.appendChild(btt);

  window.addEventListener('scroll', function () {
    btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Contact Form Validation ───────────────────────────────────────────────
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name     = contactForm.querySelector('#name').value.trim();
      var email    = contactForm.querySelector('#email').value.trim();
      var message  = contactForm.querySelector('#message').value.trim();
      var feedback = contactForm.querySelector('.form-feedback');

      if (!name || !email || !message) {
        feedback.textContent = 'Please fill in all fields.';
        feedback.className = 'form-feedback error';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'form-feedback error';
        return;
      }
      feedback.textContent = "Thank you! We'll be in touch soon.";
      feedback.className = 'form-feedback success';
      contactForm.reset();
    });
  }

});
