/* ================================================================
   performance.js — Animal Kingdom & Planet Ecosystems
   Runs FIRST (before animations.js) to determine device capability
   and configure global performance mode before anything animates.

   Strategy:
   - Detect RAM (navigator.deviceMemory) and hardware concurrency
   - Use a quick rAF-based benchmark to detect slow frame times
   - Expose window.PERF global for animations.js to read
   - Allow user override via the HIGH/LOW button
================================================================ */

;(function () {
  'use strict';

  /* ── 1. Initial capability detection (synchronous, immediate) ── */
  const ram         = navigator.deviceMemory || 4;      // GB, undefined = assume 4
  const cores       = navigator.hardwareConcurrency || 4;
  const isLowRAM    = ram <= 2;
  const isFewCores  = cores <= 2;
  const isMobile    = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const prefersLow  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Start assumed mode
  let perfMode = (isLowRAM || isFewCores || prefersLow) ? 'low' : 'high';

  /* ── 2. Runtime frame-time benchmark (async, runs after load) ── */
  // Measures real rAF loop performance. If average frame >20ms → LOW.
  function runFrameBenchmark(callback) {
    const SAMPLES = 30;
    const times   = [];
    let   last    = performance.now();
    let   count   = 0;
    let   rafId;

    function tick(now) {
      times.push(now - last);
      last = now;
      count++;
      if (count < SAMPLES) {
        rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
        // Average frame time (excluding first 5 warm-up frames)
        const trimmed = times.slice(5);
        const avg     = trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
        callback(avg);
      }
    }
    rafId = requestAnimationFrame(tick);
  }

  /* ── 3. Apply performance mode to DOM ──────────────────────── */
  function applyMode(mode) {
    const body = document.body;
    body.classList.remove('perf-high', 'perf-low');
    body.classList.add(mode === 'low' ? 'perf-low' : 'perf-high');
    window.PERF.mode = mode;
    // Update button label
    const lbl = document.getElementById('perf-label');
    if (lbl) lbl.textContent = mode.toUpperCase();
  }

  /* ── 4. Expose global PERF object ──────────────────────────── */
  window.PERF = {
    mode:       perfMode,
    isLowRAM:   isLowRAM,
    isMobile:   isMobile,
    // Called by animations.js if it wants to check mode
    isHigh:     function () { return window.PERF.mode === 'high'; },
    isLow:      function () { return window.PERF.mode === 'low';  },
    applyMode:  applyMode,
  };

  // Apply initial detection immediately
  applyMode(perfMode);

  /* ── 5. Post-load benchmark refinement ─────────────────────── */
  window.addEventListener('load', function () {
    // Allow a moment for page paint to settle before benchmarking
    setTimeout(function () {
      runFrameBenchmark(function (avgFrameMs) {
        // >20ms avg (~<50fps) = struggling — downgrade if not already low
        if (avgFrameMs > 20 && window.PERF.mode === 'high') {
          applyMode('low');
          console.info('[PERF] Auto-downgraded to LOW mode (avg frame:', avgFrameMs.toFixed(1), 'ms)');
        } else {
          console.info('[PERF] Running in', window.PERF.mode.toUpperCase(), 'mode (avg frame:', avgFrameMs.toFixed(1), 'ms)');
        }
        // Notify animations.js if it registered a callback
        if (typeof window.PERF.onBenchmarkDone === 'function') {
          window.PERF.onBenchmarkDone(window.PERF.mode);
        }
      });
    }, 800);
  });

  /* ── 6. Manual toggle (wired up in animations.js) ──────────── */
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn-perf');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const next = window.PERF.mode === 'high' ? 'low' : 'high';
      applyMode(next);
      // Signal animations.js to reconfigure
      window.dispatchEvent(new CustomEvent('perfModeChange', { detail: { mode: next } }));
    });
  });

})();
