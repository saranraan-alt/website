/* ============================================================
   DHANVIN ASSOCIATES — www.dhanvinassociates.com
   Slider, mobile navigation, scroll reveals, form handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      mainNav.classList.toggle('open');
    });
  }

  /* ---------- Hero slider ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotsWrap = document.querySelector('.slider-dots');
  var prevBtn = document.querySelector('.slider-btn.prev');
  var nextBtn = document.querySelector('.slider-btn.next');
  var current = 0;
  var timer = null;

  function goTo(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === current);
    });
    if (dotsWrap) {
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }
  }

  function startAuto() {
    stopAuto();
    timer = window.setInterval(function () { goTo(current + 1); }, 5500);
  }

  function stopAuto() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }

  if (slides.length) {
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); startAuto(); });
        dotsWrap.appendChild(dot);
      });
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); startAuto(); });

    var sliderEl = document.querySelector('.slider');
    if (sliderEl) {
      sliderEl.addEventListener('mouseenter', stopAuto);
      sliderEl.addEventListener('mouseleave', startAuto);
    }
    goTo(0);
    startAuto();
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Contact form (demo handler) ---------- */
  var form = document.querySelector('#enquiry-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var success = document.querySelector('.form-success');
      if (success) {
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector('#year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});
