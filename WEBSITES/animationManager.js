/* ================================================================
   animationManager.js — Central Animation Manager
   Animal Kingdom & Planet Ecosystems

   ARCHITECTURE:
   - Single source of truth for all section animation modules
   - Each module registers itself and is activated/deactivated by
     IntersectionObserver — only the visible section runs its RAF loop
   - FPS monitor downgrades to LOW mode automatically if < 40 FPS
   - All timelines are GSAP (preferred) or rAF with delta-time
   - RULE: Only transform + opacity ever touched. Zero layout thrashing.
================================================================ */

;(function (global) {
  'use strict';

  /* ─── Performance Profiler ─────────────────────────────────────
     Benchmarks device on load. Exposes:
       PERF.mode        → 'low' | 'mid' | 'high'
       PERF.isLow()
       PERF.isMid()
       PERF.isHigh()
       PERF.onModeChange(fn)  → subscribe to mode transitions
  ──────────────────────────────────────────────────────────────── */
  const PERF = (function () {
    const subscribers = [];
    let mode = 'high'; // default — will be refined after benchmark

    /* Static device hints (cheap, instant) */
    const mem    = navigator.deviceMemory     || 4;   // GB, may be 0.25–8
    const cores  = navigator.hardwareConcurrency || 4;
    const mobile = /Mobi|Android/i.test(navigator.userAgent);

    /* Initial coarse classification */
    if (mem <= 1 || cores <= 2)       mode = 'low';
    else if (mem <= 2 || cores <= 4)  mode = 'mid';
    else                              mode = 'high';

    /* Apply class to <html> immediately so CSS can react */
    document.documentElement.classList.add('perf-' + mode);

    /* FPS monitor — runs a short window every 2 s after page ready */
    let frames = 0, lastFPS = performance.now(), rafFPS;
    function measureFPS(now) {
      frames++;
      if (now - lastFPS >= 2000) {
        const fps = Math.round((frames / (now - lastFPS)) * 1000);
        frames = 0; lastFPS = now;

        /* Auto-downgrade if sustained low FPS — never upgrade
           (we don't want to re-enable heavy animations mid-session) */
        const prev = mode;
        if      (fps < 25 && mode !== 'low')  setMode('low');
        else if (fps < 40 && mode === 'high') setMode('mid');
      }
      rafFPS = requestAnimationFrame(measureFPS);
    }
    window.addEventListener('load', function () {
      rafFPS = requestAnimationFrame(measureFPS);
    });

    function setMode(m) {
      if (m === mode) return;
      const prev = mode;
      mode = m;
      document.documentElement.classList.remove('perf-low', 'perf-mid', 'perf-high');
      document.documentElement.classList.add('perf-' + mode);
      console.info('[ANIM] Performance mode →', mode.toUpperCase(), '(was', prev + ')');
      subscribers.forEach(function (fn) { try { fn(mode, prev); } catch (e) {} });
      /* Notify global handler (animations.js compat) */
      window.dispatchEvent(new CustomEvent('perfModeChange', { detail: { mode: mode } }));
    }

    return {
      get mode() { return mode; },
      isLow:  function () { return mode === 'low'; },
      isMid:  function () { return mode === 'mid'; },
      isHigh: function () { return mode === 'high'; },
      onModeChange: function (fn) { subscribers.push(fn); },
      /* Benchmarking hook (called after load) */
      onBenchmarkDone: null,
    };
  })();

  /* ─── Animation Manager ────────────────────────────────────────
     Modules register via AnimationManager.register(id, module).
     module must implement:
       .init(el, perf)   → sets up timelines, no animations started
       .enter()          → play / resume
       .leave()          → pause / reverse
       .destroy()        → kill timelines, remove listeners
  ──────────────────────────────────────────────────────────────── */
  const AnimationManager = (function () {
    const registry = {};   // id → { module, el, io, active }
    let gsapReady = false;

    /* Wait for GSAP (loaded async) */
    function whenGSAP(cb) {
      if (window.gsap && window.ScrollTrigger) { cb(); return; }
      let tries = 0;
      const iv = setInterval(function () {
        tries++;
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(iv);
          gsap.registerPlugin(ScrollTrigger);
          gsapReady = true;
          cb();
        } else if (tries > 60) {
          clearInterval(iv);
          console.warn('[ANIM] GSAP not found — modules disabled.');
        }
      }, 100);
    }

    /* Register a section animation module */
    function register(id, module) {
      const el = document.getElementById(id);
      if (!el) {
        console.warn('[ANIM] Section #' + id + ' not found in DOM.');
        return;
      }

      registry[id] = { module: module, el: el, io: null, active: false };

      /* Init module (no animations running yet) */
      module.init(el, PERF);

      /* IntersectionObserver — trigger enter/leave per section
         Threshold at 0.15 so animation starts just as section
         enters viewport (≈ 15% visible), pauses when fully gone.
         This avoids running RAF loops for off-screen sections.    */
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const rec = registry[id];
          if (!rec) return;
          if (entry.isIntersecting && !rec.active) {
            rec.active = true;
            rec.module.enter();
          } else if (!entry.isIntersecting && rec.active) {
            rec.active = false;
            rec.module.leave();
          }
        });
      }, { threshold: [0.05, 0.15] });

      io.observe(el);
      registry[id].io = io;
    }

    /* Boot: wait for DOM + GSAP, then init all registered modules */
    function boot() {
      document.addEventListener('DOMContentLoaded', function () {
        whenGSAP(function () {
          /* ScrollTrigger global refresh after all modules are registered */
          ScrollTrigger.refresh();
        });
      });
    }

    /* Tear down everything (SPA navigation, testing, etc.) */
    function destroyAll() {
      Object.keys(registry).forEach(function (id) {
        const rec = registry[id];
        if (rec.io) rec.io.disconnect();
        try { rec.module.destroy(); } catch (e) {}
      });
    }

    /* Performance mode change — allow each module to adapt */
    PERF.onModeChange(function (mode) {
      Object.keys(registry).forEach(function (id) {
        const rec = registry[id];
        if (rec.module.onPerfChange) {
          try { rec.module.onPerfChange(mode, PERF); } catch (e) {}
        }
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });

    boot();

    return {
      register: register,
      destroy:  destroyAll,
      perf:     PERF,
    };
  })();

  /* ─── Expose globals ───────────────────────────────────────────
     window.PERF           → performance profiler
     window.AnimationManager → register / destroy
  ──────────────────────────────────────────────────────────────── */
  global.PERF             = PERF;
  global.AnimationManager = AnimationManager;

})(window);
