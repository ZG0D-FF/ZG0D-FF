/* ================================================================
   desertAnimation.js — Desert Expanse
   Registers with AnimationManager under id: 'desert'

   LAYERS:
     .parallax-bg          dune background    → scroll-scrub yPercent
     .sand-canvas          grain particles    → rAF horizontal drift
     .biome-layer--haze    CSS heat shimmer   → JS toggles class for HIGH mode
     .reveal-up / .reveal-fade               → entrance

   CONFLICT AVOIDANCE:
     - Sand canvas loop runs entirely in rAF; GSAP never touches canvas.
     - Heat haze is a CSS animation toggled via class — JS adds/removes
       the class once, no ongoing style conflicts.
     - The parallax and entrance timelines are separate GSAP instances.

   PERFORMANCE:
     - Sand particles: HIGH=120, MID=50, LOW=0 (canvas hidden via CSS).
     - Heat haze (CSS SVG filter) only active in HIGH mode.
     - Parallax disabled in LOW mode.
     - Dune layer gets a subtle scroll-depth yPercent in MID+.
================================================================ */

;(function (global) {
  'use strict';

  /* ── Sand Particle System (rAF) ─────────────────────────────── */
  function SandSystem(canvas, count) {
    const ctx    = canvas.getContext('2d');
    let W, H, rafId, running = false;
    const raf = requestAnimationFrame.bind(window);
    const caf = cancelAnimationFrame.bind(window);

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* Particle pool */
    const grains = Array.from({ length: count }, function () {
      return {
        x:     Math.random(),
        y:     Math.random(),
        r:     Math.random() * 1.0 + 0.4,
        speed: Math.random() * 0.00025 + 0.00008,
        alpha: Math.random() * 0.22 + 0.04,
        /* y-drift: grains roll slightly up/down over time */
        ydrift: (Math.random() - 0.5) * 0.000015,
        phase:  Math.random() * Math.PI * 2,
      };
    });

    let last = performance.now();

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#c8a96e';   // sand colour (matches CSS var --clr-desert accent)

      grains.forEach(function (g) {
        /* Horizontal drift — wraps around */
        g.x     += g.speed * dt;
        if (g.x > 1.02) g.x = -0.02;

        /* Subtle vertical oscillation — transform equivalent in 2D space */
        g.phase += 0.0005 * dt;
        const yOffset = Math.sin(g.phase) * 0.008;

        ctx.globalAlpha = g.alpha;
        ctx.beginPath();
        ctx.arc(g.x * W, (g.y + yOffset) * H, g.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      rafId = raf(loop);
    }

    return {
      start: function () {
        if (running) return;
        running = true;
        last = performance.now();
        rafId = raf(loop);
      },
      stop: function () {
        running = false;
        caf(rafId);
      },
      destroy: function () {
        this.stop();
        window.removeEventListener('resize', resize);
      },
    };
  }

  /* ── Module ─────────────────────────────────────────────────── */
  const DesertAnimation = {

    _el:         null,
    _perf:       null,
    _entranceTl: null,
    _sand:       null,
    _hazeEl:     null,

    init: function (el, perf) {
      this._el   = el;
      this._perf = perf;

      /* Entrance timeline */
      this._buildEntrance();

      /* Sand — HIGH: 120 grains, MID: 50, LOW: 0 */
      if (!perf.isLow()) {
        const canvas = el.querySelector('.sand-canvas');
        if (canvas) {
          const count = perf.isHigh() ? 120 : 50;
          this._sand = SandSystem(canvas, count);
        }
      }

      /* Heat haze: CSS filter animation — enable only on HIGH.
         LOW/MID get no filter (SVG turbulence is GPU-intensive).
         We simply add a class that the CSS uses.               */
      const haze = el.querySelector('.biome-layer--haze');
      if (haze) {
        this._hazeEl = haze;
        /* perf-high class already on <html>, CSS rule picks it up.
           Nothing needed here unless we want JS-controlled toggle. */
      }

      /* Parallax dune depth (scroll-scrub) */
      if (!perf.isLow()) {
        const bg = el.querySelector('.parallax-bg');
        if (bg) {
          gsap.to(bg, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end:   'bottom top',
              scrub: 1.8,
            }
          });
        }
      }
    },

    _buildEntrance: function () {
      const el   = this._el;
      const perf = this._perf;
      const revs = Array.from(el.querySelectorAll('.reveal-up, .reveal-fade'));
      const chips = Array.from(el.querySelectorAll('.animal-chip'));

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

      /* Content reveal */
      if (revs.length) {
        tl.fromTo(revs,
          { opacity: 0, y: perf.isLow() ? 10 : 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0
        );
      }

      /* Animal chips scale-in */
      if (chips.length && !perf.isLow()) {
        tl.fromTo(chips,
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07,
            ease: 'back.out(1.4)' },
          0.25
        );
      }

      this._entranceTl = tl;
    },

    enter: function () {
      if (this._entranceTl) this._entranceTl.play();
      if (this._sand)       this._sand.start();
    },

    leave: function () {
      if (this._entranceTl) this._entranceTl.pause();
      if (this._sand)       this._sand.stop();
    },

    onPerfChange: function (mode) {
      if (mode === 'low' && this._sand) {
        this._sand.destroy();
        this._sand = null;
      }
    },

    destroy: function () {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      if (this._sand)       { this._sand.destroy();    this._sand = null; }
    },
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) {
      global.AnimationManager.register('desert', DesertAnimation);
    }
  });

  global.DesertAnimation = DesertAnimation;

})(window);
