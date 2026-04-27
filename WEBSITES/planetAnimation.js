/* ================================================================
   planetAnimation.js — Earth View (Planet Section)
   Registers with AnimationManager under id: 'planet'

   LAYERS:
     .star-canvas           twinkling stars    → rAF particle loop
     .planet-sphere__inner  Earth sphere       → CSS rotation (already in styles)
     .planet-sphere__clouds cloud ring         → GSAP slower counter-rotation
     .planet-sphere__glow   atmospheric glow   → GSAP opacity breathe
     .reveal-up / .reveal-fade               → entrance
     .planet-cta            final CTA          → entrance + subtle scale pulse

   CONFLICT AVOIDANCE:
     - Earth rotation is CSS-driven (transform: rotate in @keyframes).
       GSAP never touches .planet-sphere__inner's transform.
     - Cloud layer (.planet-sphere__clouds) has its own transform scope —
       GSAP rotates it independently. No collision with the CSS sphere.
     - Star canvas rAF and all GSAP timelines target different elements.
     - The glow breathe GSAP loop only animates opacity on __glow.
       CSS planetGlow keyframe is removed/unused — only one system owns it.

   PERFORMANCE:
     - Stars: HIGH=200, MID=80, LOW=0 (canvas hidden via CSS).
     - Cloud rotation disabled in LOW.
     - Glow breathe disabled in LOW.
     - Final zoom-out transition skipped in LOW.
================================================================ */

;(function (global) {
  'use strict';

  /* ── Star Canvas System (rAF) ───────────────────────────────── */
  function StarSystem(canvas, count) {
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

    /* Pool — all stars twinkle at their own phase and rate */
    const stars = Array.from({ length: count }, function () {
      return {
        x:     Math.random(),
        y:     Math.random(),
        r:     Math.random() * 1.1 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0009 + 0.0003,
        base:  Math.random() * 0.5 + 0.2,   // base alpha
      };
    });

    let last = performance.now();

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#ffffff';

      stars.forEach(function (s) {
        s.phase += s.speed * dt;
        /* Twinkle: sine wave around base alpha — never fully invisible */
        const a = s.base + Math.sin(s.phase) * (s.base * 0.5);
        ctx.globalAlpha = Math.min(a, 1);
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
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
  const PlanetAnimation = {

    _el:         null,
    _perf:       null,
    _entranceTl: null,
    _cloudTl:    null,   // cloud counter-rotation (GSAP, repeat:-1)
    _glowTl:     null,   // glow opacity breathe (GSAP, repeat:-1)
    _stars:      null,   // rAF star system
    _cloudAngle: 0,      // persists rotation across pause/resume

    init: function (el, perf) {
      this._el   = el;
      this._perf = perf;

      this._buildEntrance();

      if (!perf.isLow()) {
        this._buildCloudRotation();
        this._buildGlowBreath();
      }

      /* Stars */
      if (!perf.isLow()) {
        const canvas = el.querySelector('.star-canvas');
        if (canvas) {
          const count = perf.isHigh() ? 200 : 80;
          this._stars = StarSystem(canvas, count);
        }
      }

      /* Parallax — stars canvas subtle parallax shift on scroll */
      if (perf.isHigh()) {
        const canvas = el.querySelector('.star-canvas');
        if (canvas) {
          gsap.to(canvas, {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end:   'bottom top',
              scrub: 3,
            }
          });
        }
      }
    },

    _buildEntrance: function () {
      const el   = this._el;
      const perf = this._perf;

      const revs   = Array.from(el.querySelectorAll('.reveal-up, .reveal-fade'));
      const sphere = el.querySelector('.planet-sphere');
      const cta    = el.querySelector('.planet-cta');

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

      /* Sphere — fades in and slides up slightly from below */
      if (sphere && !perf.isLow()) {
        tl.fromTo(sphere,
          { opacity: 0, y: 30, scale: 0.92 },
          { opacity: 1, y: 0,  scale: 1, duration: 1.2, ease: 'power3.out' },
          0
        );
      }

      /* Text content */
      if (revs.length) {
        tl.fromTo(revs,
          { opacity: 0, y: perf.isLow() ? 12 : 35 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 },
          perf.isLow() ? 0 : 0.35
        );
      }

      /* CTA — subtle scale pulse after entering
         (one pulse only — not a loop, to avoid visual spam) */
      if (cta && !perf.isLow()) {
        tl.fromTo(cta,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)' },
          '-=0.2'
        );
      }

      this._entranceTl = tl;
    },

    /* Cloud counter-rotation — GSAP animates transform:rotate on
       the cloud layer. CSS handles Earth rotation (@keyframes).
       They never touch the same element so there's no conflict.  */
    _buildCloudRotation: function () {
      const el     = this._el;
      const clouds = el.querySelector('.planet-sphere__clouds');
      if (!clouds) return;

      /* gsap.to with modifiers keeps rotation continuous even after pause/resume.
         We use a proxy object so GSAP's internal state stays consistent.         */
      const proxy = { angle: 0 };
      this._cloudTl = gsap.to(proxy, {
        angle: -360,           // counter-clockwise
        duration: 80,          // very slow — cinematic
        ease: 'none',
        repeat: -1,
        paused: true,
        onUpdate: function () {
          clouds.style.transform = 'rotate(' + proxy.angle + 'deg)';
        },
      });
    },

    _buildGlowBreath: function () {
      const el   = this._el;
      const glow = el.querySelector('.planet-sphere__glow');
      if (!glow) return;

      /* Override CSS planetGlow animation — JS owns this element's opacity.
         CSS animation is removed by setting animation: none on enter.       */
      this._glowTl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
      this._glowTl
        .to(glow, { opacity: 1,    duration: 4, ease: 'sine.inOut' })
        .to(glow, { opacity: 0.38, duration: 3, ease: 'sine.inOut' });
    },

    enter: function () {
      if (this._entranceTl) this._entranceTl.play();
      if (this._cloudTl)    this._cloudTl.play();
      if (this._glowTl)     this._glowTl.play();
      if (this._stars)      this._stars.start();

      /* Disable CSS glow animation — GSAP now owns it */
      const glow = this._el.querySelector('.planet-sphere__glow');
      if (glow && this._glowTl) glow.style.animation = 'none';
    },

    leave: function () {
      if (this._entranceTl) this._entranceTl.pause();
      if (this._cloudTl)    this._cloudTl.pause();
      if (this._glowTl)     this._glowTl.pause();
      if (this._stars)      this._stars.stop();
    },

    onPerfChange: function (mode) {
      if (mode === 'low') {
        if (this._stars)   { this._stars.destroy();  this._stars = null; }
        if (this._cloudTl) { this._cloudTl.kill();   this._cloudTl = null; }
        if (this._glowTl)  { this._glowTl.kill();    this._glowTl = null; }
      }
    },

    destroy: function () {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      if (this._cloudTl)    { this._cloudTl.kill();    this._cloudTl = null; }
      if (this._glowTl)     { this._glowTl.kill();     this._glowTl = null; }
      if (this._stars)      { this._stars.destroy();    this._stars = null; }
    },
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) {
      global.AnimationManager.register('planet', PlanetAnimation);
    }
  });

  global.PlanetAnimation = PlanetAnimation;

})(window);
