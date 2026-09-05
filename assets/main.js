/* CtrlCap site behaviour.  No chatbot, no external dependencies. */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- Footer year ---- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---- FAQ accordion ---- */
    document.querySelectorAll('.faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var panel = item.querySelector('.faq-a');
        var open = item.classList.contains('open');

        item.classList.toggle('open', !open);
        btn.setAttribute('aria-expanded', String(!open));
        panel.style.maxHeight = open ? null : panel.scrollHeight + 'px';
      });
    });

    /* ---- Motion: reveal on scroll + stat counters ---- */
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && 'IntersectionObserver' in window) {
      /* tag reveal targets, stagger siblings within their group */
      ['.sec-head', '.problem', '.service', '.pull', '.price-panel', '.card',
       '.phase', '.int-tile', '.stat', '.media-feature', '.faq-item'].forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          el.classList.add('reveal');
          var sibs = el.parentElement ? el.parentElement.children : [];
          var idx = Array.prototype.indexOf.call(sibs, el);
          el.style.transitionDelay = Math.min(Math.max(idx, 0) * 70, 350) + 'ms';
        });
      });

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

      /* counters: wrap digit runs inside .stat-num text nodes, count up on reveal */
      document.querySelectorAll('.stat-num').forEach(function (num) {
        Array.prototype.slice.call(num.childNodes).forEach(function (node) {
          if (node.nodeType !== 3 || !/\d/.test(node.textContent)) return;
          var frag = document.createDocumentFragment();
          node.textContent.split(/(\d+\.?\d*)/).forEach(function (part) {
            if (/^\d+\.?\d*$/.test(part)) {
              var sp = document.createElement('span');
              sp.className = 'cnt';
              sp.setAttribute('data-t', part);
              sp.textContent = part.indexOf('.') > -1 ? '0.00' : '0';
              frag.appendChild(sp);
            } else if (part) {
              frag.appendChild(document.createTextNode(part));
            }
          });
          num.replaceChild(frag, node);
        });
      });

      function runCounter(sp) {
        var target = parseFloat(sp.getAttribute('data-t'));
        var decimals = (sp.getAttribute('data-t').split('.')[1] || '').length;
        var t0 = null, DUR = 1300;
        function step(ts) {
          if (!t0) t0 = ts;
          var x = Math.min((ts - t0) / DUR, 1);
          var eased = 1 - Math.pow(1 - x, 3);
          sp.textContent = (target * eased).toFixed(decimals);
          if (x < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }

      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll('.cnt').forEach(runCounter);
          cio.unobserve(e.target);
        });
      }, { threshold: 0.35 });
      document.querySelectorAll('.stats').forEach(function (el) { cio.observe(el); });
    }

    /* ---- Before/after rotator ---- */
    document.querySelectorAll('.rotator').forEach(function (rot) {
      var imgs = rot.querySelectorAll('img');
      var tags = rot.querySelectorAll('.tag');
      if (imgs.length < 2) return;
      var idx = 0;
      setInterval(function () {
        idx = (idx + 1) % imgs.length;
        imgs.forEach(function (im, i) { im.classList.toggle('active', i === idx); });
        tags.forEach(function (t, i) { t.classList.toggle('active', i === idx); });
      }, 6000);
    });

    /* ---- Video modal ---- */
    var modal = document.getElementById('video-modal');
    var video = document.getElementById('automation-video');
    var closeBtn = document.getElementById('video-close');

    function openVideo() {
      if (!modal) return;
      modal.classList.add('open');
      if (closeBtn) closeBtn.focus();
    }
    function closeVideo() {
      if (!modal) return;
      modal.classList.remove('open');
      if (video) { video.pause(); video.currentTime = 0; }
    }

    document.querySelectorAll('.video-open').forEach(function (el) {
      el.addEventListener('click', openVideo);
    });
    if (closeBtn) closeBtn.addEventListener('click', closeVideo);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeVideo();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeVideo();
    });

    /* ---- Contact form ----
       Posts to the endpoint in the form's action attribute.
       On any failure it falls back to a mailto so a lead is never lost. */
    var form = document.getElementById('lead-form');
    var status = document.getElementById('form-status');

    function setStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status' + (kind ? ' ' + kind : '');
    }

    function mailtoFallback(data) {
      var subject = encodeURIComponent('CtrlCap enquiry from ' + (data.name || 'the website'));
      var body = encodeURIComponent(
        'Name: ' + (data.name || '') + '\n' +
        'Email: ' + (data.email || '') + '\n' +
        'Company: ' + (data.company || '') + '\n\n' +
        (data.message || '')
      );
      return 'mailto:sm@ctrlcap.co?subject=' + subject + '&body=' + body;
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var fd = new FormData(form);
        var data = {
          name: (fd.get('name') || '').toString().trim(),
          email: (fd.get('email') || '').toString().trim(),
          company: (fd.get('company') || '').toString().trim(),
          message: (fd.get('message') || '').toString().trim()
        };

        /* Honeypot: silently accept and discard bot submissions. */
        if ((fd.get('_gotcha') || '').toString().length) {
          setStatus('Thanks, I will be in touch.', 'ok');
          form.reset();
          return;
        }

        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
        setStatus('Sending...');

        fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: fd
        })
          .then(function (res) {
            if (!res.ok) throw new Error('bad status ' + res.status);
            form.reset();
            setStatus('Thanks.  I read every one of these and will get back to you shortly.', 'ok');
          })
          .catch(function () {
            var link = mailtoFallback(data);
            if (status) {
              status.className = 'form-status err';
              status.innerHTML = 'That did not send.  <a href="' + link +
                '" style="color:#f59f0b;">Click here to email it to me directly</a> instead.';
            }
          })
          .finally(function () {
            if (btn) { btn.disabled = false; btn.textContent = 'Send'; }
          });
      });
    }
  });
})();
