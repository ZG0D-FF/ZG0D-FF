/* ================================================================
   globalUI.js — Global Chrome & Boot Sequence
   Handles the loader, sound toggles, and FPS counter.
================================================================ */

;(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  /* ── 1. Boot Sequence (Loader) ────────────────────────────── */
  function boot() {
    const loader = $('#loader');
    const fill   = $('.loader__fill');
    
    // Simulate load progress
    let progress = 0;
    const iv = setInterval(() => {
      progress = Math.min(progress + 15, 90);
      if (fill) fill.style.width = progress + '%';
    }, 120);

    window.addEventListener('load', () => {
      clearInterval(iv);
      if (fill) fill.style.width = '100%';
      
      setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        document.body.classList.add('ready');
        
        const nav = $('#site-nav');
        if (nav) nav.classList.add('visible');
      }, 600);
    });

    // Fallback if load hangs
    setTimeout(() => {
      clearInterval(iv);
      if (!document.body.classList.contains('ready')) {
        if (loader) loader.classList.add('hidden');
        document.body.classList.add('ready');
        const nav = $('#site-nav');
        if (nav) nav.classList.add('visible');
      }
    }, 5000);
  }

  /* ── 2. FPS Counter ───────────────────────────────────────── */
  function initFPS() {
    const counter = $('#fps-counter');
    const display = $('#fps-value');
    const btn     = $('#btn-fps');
    if (!counter || !display || !btn) return;

    let visible = false;
    let frames = 0, last = performance.now(), rafId;

    const loop = (now) => {
      frames++;
      const delta = now - last;
      if (delta >= 500) {
        const fps = Math.round((frames / delta) * 1000);
        display.textContent = fps;
        display.style.color = fps >= 55 ? '#4caf50' : fps >= 30 ? '#ffc107' : '#f44336';
        frames = 0; last = now;
      }
      rafId = requestAnimationFrame(loop);
    };

    btn.addEventListener('click', () => {
      visible = !visible;
      counter.classList.toggle('visible', visible);
      btn.classList.toggle('active', visible);
      if (visible) { frames = 0; last = performance.now(); rafId = requestAnimationFrame(loop); }
      else { cancelAnimationFrame(rafId); }
    });
  }

  /* ── 3. Sound System ──────────────────────────────────────── */
  function initSound() {
    const btn = $('#btn-sound');
    if (!btn) return;

    let soundOn = false;
    let currentAudio = null;

    btn.addEventListener('click', () => {
      soundOn = !soundOn;
      btn.classList.toggle('active', soundOn);
      document.body.dataset.sound = soundOn ? 'on' : 'off';

      if (!soundOn && currentAudio) {
        currentAudio.pause();
      }
    });

    // Simple observer to swap audio sources based on active section
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && soundOn) {
            const src = e.target.dataset.soundSrc;
            if (src) swapAudio(src);
          }
        });
      }, { threshold: 0.4 });

      document.querySelectorAll('.section--biome').forEach(sec => observer.observe(sec));
    }

    function swapAudio(src) {
      if (currentAudio && currentAudio.dataset.src === src) return;
      if (currentAudio) currentAudio.pause();
      
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.25; // Hard set to avoid complex fading logic blocking the main thread
      audio.dataset.src = src;
      audio.play().catch(() => {});
      currentAudio = audio;
    }
  }

  /* ── Initialize ───────────────────────────────────────────── */
  boot();
  initFPS();
  initSound();

})();