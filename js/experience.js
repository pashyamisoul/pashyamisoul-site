/* Animated experience timeline ("Meridian")
   - Spine draws itself as the section scrolls through the viewport
   - Each role's marker pops, card + bullets rise and stagger in
   - Headline metrics count up on first view
   - Fully degrades: with reduced-motion or if GSAP fails to load, everything
     is shown immediately (content is visible by default — never hidden by CSS) */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    var target = parseFloat(el.dataset.target);
    var suffix = el.dataset.suffix || '';
    var fmt = function (n) { return (n >= 1000 ? n.toLocaleString('en-US') : n) + suffix; };
    if (reduce || typeof gsap === 'undefined') { el.textContent = fmt(target); return; }
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.3, ease: 'power2.out',
      onUpdate: function () { el.textContent = fmt(Math.round(obj.v)); }
    });
  }

  // The spine should run from the first marker's centre to the last marker's
  // centre — never past the last dot. Card heights vary, so measure in JS.
  function sizeSpine() {
    var timeline = document.getElementById('experience-timeline');
    var spine = timeline && timeline.querySelector('.tl-spine');
    var markers = timeline && timeline.querySelectorAll('.tl-marker');
    if (!spine || !markers || markers.length < 2) return;
    var tTop = timeline.getBoundingClientRect().top;
    var first = markers[0].getBoundingClientRect();
    var last = markers[markers.length - 1].getBoundingClientRect();
    var firstCenter = (first.top + first.height / 2) - tTop;
    var lastCenter = (last.top + last.height / 2) - tTop;
    spine.style.top = firstCenter + 'px';
    spine.style.bottom = 'auto';
    spine.style.height = Math.max(0, lastCenter - firstCenter) + 'px';
  }

  function init() {
    var progress = document.getElementById('tlProgress');
    var counts = document.querySelectorAll('.tl-metric-num.count');

    sizeSpine();
    window.addEventListener('load', sizeSpine);
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        sizeSpine();
        if (typeof ScrollTrigger !== 'undefined') { ScrollTrigger.refresh(); }
      }, 150);
    });

    if (reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      if (progress) progress.style.transform = 'scaleY(1)';
      counts.forEach ? counts.forEach(function (el) { countUp(el); })
                     : Array.prototype.forEach.call(counts, countUp);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1) Spine draws itself, tied to scroll position
    if (progress) {
      gsap.set(progress, { scaleY: 0 });
      gsap.to(progress, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '#experience-timeline', start: 'top 55%', end: 'bottom 75%', scrub: 1 }
      });
    }

    // 2) Each role: marker pops, card + bullets rise and stagger in
    gsap.utils.toArray('.tl-item').forEach(function (item) {
      var marker = item.querySelector('.tl-marker');
      var card = item.querySelector('.tl-card');
      var bullets = item.querySelectorAll('.tl-bullets li');
      var itemCounts = item.querySelectorAll('.count');

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: item, start: 'top 82%', toggleActions: 'play none none none',
          onEnter: function () { Array.prototype.forEach.call(itemCounts, countUp); }
        }
      });
      tl.from(marker, { scale: 0, opacity: 0, duration: 0.45, ease: 'back.out(1.7)' })
        .from(card, { opacity: 0, y: 26, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from(bullets, { opacity: 0, y: 12, duration: 0.35, stagger: 0.07, ease: 'power2.out' }, '-=0.25');
    });

    // Recalc once logos have loaded so triggers line up precisely
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
