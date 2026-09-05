/* CtrlCap motion — GSAP scroll choreography, split headline, cursor light,
   magnetic buttons. Everything here is progressive: if GSAP failed to load
   or the visitor prefers reduced motion, the page simply shows static. */
(function () {
  'use strict';
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);
  var desktop = window.matchMedia('(min-width: 961px)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  document.documentElement.classList.add('has-motion');

  /* ---- Split the headline into words for a staggered reveal ---- */
  function splitWords(el) {
    var out = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { el.insertBefore(document.createTextNode(' '), node); return; }
          var w = document.createElement('span'); w.className = 'w';
          var inner = document.createElement('span'); inner.textContent = part;
          w.appendChild(inner); el.insertBefore(w, node); out.push(inner);
        });
        el.removeChild(node);
      } else if (node.nodeType === 1) {
        var isGrad = node.classList.contains('grad');
        splitWords(node).forEach(function (inner) { if (isGrad) inner.classList.add('grad'); out.push(inner); });
        if (isGrad) node.classList.remove('grad');
      }
    });
    return out;
  }

  var h1 = document.querySelector('.hero h1');
  if (h1) {
    var words = splitWords(h1);
    gsap.from(words, { yPercent: 110, rotate: 4, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.07, delay: 0.15 });
  }
  gsap.from('.hero .kicker', { y: 12, opacity: 0, duration: 0.7, delay: 0.05 });
  gsap.from(['.hero .lede', '.hero .btn-row', '.hero-note'], { y: 26, opacity: 0, duration: 0.9, stagger: 0.12, delay: 0.55, ease: 'power3.out' });
  gsap.from('.hero-visual', { x: desktop ? 70 : 0, y: desktop ? 0 : 30, opacity: 0, duration: 1.3, delay: 0.45, ease: 'power3.out' });
  gsap.from('.board-row', { opacity: 0, x: 24, duration: 0.6, stagger: 0.09, delay: 1.0, ease: 'power2.out' });
  gsap.from('.scene-label', { opacity: 0, duration: 1.2, delay: 1.4, stagger: 0.1 });

  /* ---- Hero drifts slower than the page (parallax) ---- */
  if (desktop) {
    gsap.to('.hero-visual', { scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }, y: 90, ease: 'none' });
    gsap.to('.hero-copy', { scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }, y: 40, opacity: 0.4, ease: 'none' });
  }

  /* ---- Section reveals ---- */
  function rise(targets, trigger, opts) {
    var o = Object.assign({ y: 40, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out' }, opts || {});
    o.scrollTrigger = { trigger: trigger, start: 'top 80%', once: true };
    gsap.from(targets, o);
  }

  gsap.utils.toArray('.sec-head').forEach(function (el) { rise(el.children, el, { y: 28 }); });
  rise('.stat', '.stats', { stagger: 0.1, y: 50 });
  rise('#demo .media-feature', '#demo', { y: 60, scale: 0.96, duration: 1 });
  rise('.problem', '.problems', { stagger: 0.12, y: 56 });
  gsap.utils.toArray('.pull').forEach(function (el) { rise(el, el, { x: -30, y: 0 }); });

  gsap.utils.toArray('.service').forEach(function (s) {
    var flip = s.classList.contains('service--flip');
    var media = s.querySelector('.service-media');
    var body = s.querySelector('.service-body');
    gsap.from(media, { scrollTrigger: { trigger: s, start: 'top 75%', once: true }, x: flip ? -90 : 90, opacity: 0, scale: 0.92, rotateY: flip ? 8 : -8, duration: 1.1, ease: 'power3.out' });
    gsap.from(body.children, { scrollTrigger: { trigger: s, start: 'top 75%', once: true }, y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' });
  });

  rise('.int-tile', '.int-grid', { stagger: 0.07, scale: 0.96 });

  var rail = document.querySelector('.phases-rail');
  if (rail) gsap.from(rail, { scrollTrigger: { trigger: '.phases', start: 'top 85%', end: 'top 45%', scrub: true }, scaleX: 0, transformOrigin: 'left center', ease: 'none' });
  rise('.phase', '.phases', { stagger: 0.14, y: 44 });

  gsap.from('.price-panel', { scrollTrigger: { trigger: '#pricing', start: 'top 75%', once: true }, y: 50, opacity: 0, scale: 0.97, duration: 1, ease: 'power3.out' });
  gsap.from('.price-figure', { scrollTrigger: { trigger: '#pricing', start: 'top 70%', once: true }, scale: 0.6, opacity: 0, duration: 1, delay: 0.2, ease: 'back.out(1.5)' });
  rise('#proof .prose > *', '#proof', { stagger: 0.12, y: 30 });
  rise('.faq-item', '.faq', { stagger: 0.06, y: 24 });
  rise(['.lead-panel', '.contact-direct'], '#contact', { stagger: 0.15, y: 44, duration: 1 });
  rise('.foot-col', 'footer.site', { stagger: 0.1, y: 20 });

  /* ---- Cursor light ---- */
  if (desktop && fine) {
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    var gx = window.innerWidth / 2, gy = window.innerHeight / 2, tx = gx, ty = gy, shown = false;
    window.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; if (!shown) { shown = true; glow.classList.add('on'); } }, { passive: true });
    document.addEventListener('mouseleave', function () { glow.classList.remove('on'); shown = false; });
    (function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = 'translate(' + gx.toFixed(1) + 'px,' + gy.toFixed(1) + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();

    /* ---- Magnetic primary buttons ---- */
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(function (btn) {
      var strength = 0.35, radius = 90;
      function onMove(e) {
        var r = btn.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = e.clientX - cx, dy = e.clientY - cy;
        var d = Math.hypot(dx, dy);
        if (d < radius) gsap.to(btn, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power3.out' });
        else gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      }
      window.addEventListener('pointermove', onMove, { passive: true });
    });
  }

  /* ---- Refresh triggers once fonts/images settle ---- */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
