/* ================================================================
   forestAnimation.js — Rainforest Realm
   Registers with AnimationManager under id: 'forest'

   LAYERS (z-order, low → high):
     .parallax-bg          background image   → slow scale
     .biome-layer--fog     fog overlay        → horizontal drift (CSS loop)
     .forest-trees         CSS tree silhouettes → sway (CSS loop)
     .reveal-up elements   animals / text     → fade + translateY on enter

   CONFLICT AVOIDANCE:
     - GSAP timeline is created once in init(), not on every enter().
     - enter() only plays / resumes — it never re-creates the tl.
     - leave() pauses mid-play, preserving progress.
     - CSS animations (fog, sway) run independently in stylesheet —
       JS never touches those properties, so no fight possible.

   PERFORMANCE:
     - Parallax scale only runs in MID / HIGH mode.
     - All GSAP targets use transform / opacity only.
     - ScrollTrigger scrub:true syncs to scroll scroll thread
       (no extra RAF needed for the background scale).
================================================================ */

;(function (global) {
  'use strict';

  const ForestAnimation = {

    /* Internal state */
    _el:    null,
    _perf:  null,
    _tl:    null,      // GSAP entrance timeline
    _stBg:  null,      // ScrollTrigger for parallax bg

    /* ── init ──────────────────────────────────────────────────
       Called once by AnimationManager after DOM ready + GSAP loaded.
       Sets up timelines in paused state — nothing animates yet.
    ────────────────────────────────────────────────────────────── */
    init: function (el, perf) {
      this._el   = el;
      this._perf = perf;

      /* Build entrance timeline (paused) */
      this._buildTimeline();

      /* Parallax background scale (scroll-linked, not entrance) */
      if (!perf.isLow()) {
        this._buildParallax();
      }
    },

    _buildTimeline: function () {
      const el   = this._el;
      const perf = this._perf;

      /* Targets inside this section only — scoped to el */
      const bgEl    = el.querySelector('.parallax-bg');
      const revEls  = Array.from(el.querySelectorAll('.reveal-up, .reveal-fade'));

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
      });

      /* 1. Background subtle brightening (opacity only — no layout) */
      if (bgEl) {
        tl.fromTo(bgEl,
          { opacity: 0.6 },
          { opacity: 1, duration: 1.2 },
          0
        );
      }

      /* 2. Reveal text / animal elements — stagger */
      if (revEls.length) {
        tl.fromTo(revEls,
          { opacity: 0, y: perf.isLow() ? 15 : 40 },
          { opacity: 1, y: 0, duration: perf.isLow() ? 0.5 : 0.8,
            stagger: perf.isLow() ? 0.08 : 0.13 },
          0.2
        );
      }

      this._tl = tl;
    },

    _buildParallax: function () {
      const el  = this._el;
      const bg  = el.querySelector('.parallax-bg');
      if (!bg) return;

      /* Slow scale as you scroll past — scrub syncs to scroll,
         no RAF needed. Max scale kept at 1.08 to stay subtle. */
      this._stBg = gsap.to(bg, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end:   'bottom top',
          scrub: 1.5,
        }
      });
    },

    /* ── enter ─────────────────────────────────────────────────
       Section enters viewport — play or resume the timeline.
    ────────────────────────────────────────────────────────────── */
    enter: function () {
      if (this._tl) this._tl.play();
    },

    /* ── leave ─────────────────────────────────────────────────
       Section leaves viewport — pause (preserves progress).
       We intentionally do NOT reverse so returning doesn't
       re-animate content the user has already seen.
    ────────────────────────────────────────────────────────────── */
    leave: function () {
      if (this._tl) this._tl.pause();
    },

    /* ── onPerfChange ──────────────────────────────────────────
       If device is downgraded to LOW mid-session, kill parallax.
    ────────────────────────────────────────────────────────────── */
    onPerfChange: function (mode) {
      if (mode === 'low' && this._stBg) {
        this._stBg.scrollTrigger && this._stBg.scrollTrigger.kill();
        this._stBg.kill();
        this._stBg = null;
      }
    },

    /* ── destroy ───────────────────────────────────────────────
       Full teardown — called on SPA navigation or cleanup.
    ────────────────────────────────────────────────────────────── */
    destroy: function () {
      if (this._tl)  { this._tl.kill();  this._tl  = null; }
      if (this._stBg){ this._stBg.kill(); this._stBg = null; }
    },
  };

  /* Register with the manager after DOM is ready */
  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) {
      global.AnimationManager.register('forest', ForestAnimation);
    }
  });

  global.ForestAnimation = ForestAnimation;

})(window);
