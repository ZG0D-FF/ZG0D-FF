/*================================================================
   animations.js — Animal Kingdom & Planet Ecosystems
   Runs after performance.js. All animation uses:
   - GSAP + ScrollTrigger (GPU: transform + opacity only)
   - Canvas-based lightweight particle systems
   - requestAnimationFrame with delta-time for smooth motion
   - Scroll-viewport culling (only animate what's visible)

   RULE: NEVER animate width/height/top/left/margin/padding.
         ONLY transform and opacity — zero layout thrashing.
================================================================ */

;(function () {
  'use strict';

  /* ── Wait for GSAP + DOM ────────────────────────────────────── */
  function waitForGSAP(cb) {
    if (window.gsap && window.ScrollTrigger) {
      cb();
    } else {
      // Retry up to 50 times (5s)
      let attempts = 0;
      const iv = setInterval(function () {
        attempts++;
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(iv);
          cb();
        } else if (attempts > 50) {
          clearInterval(iv);
          console.warn('[ANIM] GSAP failed to load — falling back to CSS transitions.');
          fallbackReveal();
        }
      }, 100);
    }
  }

  /* ── Utility ────────────────────────────────────────────────── */
  const raf = window.requestAnimationFrame.bind(window);
  const caf = window.cancelAnimationFrame.bind(window);
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ── Loader sequence ────────────────────────────────────────── */
  function runLoader() {
    const loader = $('#loader');
    const fill   = loader && loader.querySelector('.loader__fill');
    const body   = document.body;

    // Animate fill bar
    let progress = 0;
    const fillInterval = setInterval(function () {
      progress = Math.min(progress + (Math.random() * 15 + 5), 90);
      if (fill) fill.style.width = progress + '%';
    }, 120);

    window.addEventListener('load', function () {
      clearInterval(fillInterval);
      if (fill) fill.style.width = '100%';
      setTimeout(function () {
        if (loader) loader.classList.add('hidden');
        body.classList.add('ready');
        // Show nav
        const nav = $('#site-nav');
        if (nav) nav.classList.add('visible');
        // Init hero animations
        initHeroAnimations();
      }, 600);
    });

    // Safety: if load takes too long
    setTimeout(function () {
      clearInterval(fillInterval);
      if (!body.classList.contains('ready')) {
        if (fill) fill.style.width = '100%';
        setTimeout(function () {
          if (loader) loader.classList.add('hidden');
          body.classList.add('ready');
          const nav = $('#site-nav');
          if (nav) nav.classList.add('visible');
          initHeroAnimations();
        }, 400);
      }
    }, 5000);
  }

  /* ── Hero entrance animations ───────────────────────────────── */
  function initHeroAnimations() {
    if (!window.gsap) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero__eyebrow',   { opacity: 0, y: 20, duration: 0.6 })
      .from('.hero__title-line', { opacity: 0, y: 60, duration: 0.8, stagger: 0.15 }, '-=0.2')
      .from('.hero__subtitle',   { opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero__scroll-cue', { opacity: 0, duration: 0.5 }, '-=0.1');

    // Hero particles (high mode only)
    if (window.PERF.isHigh()) {
      initHeroParticles();
    }
  }

  /* ── GSAP ScrollTrigger — Section reveals ───────────────────── */
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    /* ── Parallax backgrounds ──────────────────────────────────── */
    // Each .parallax-bg moves at its data-parallax-speed fraction
    $$('.parallax-bg').forEach(function (bg) {
      const speed = parseFloat(bg.dataset.parallaxSpeed) || 0.25;
      const section = bg.closest('.section');
      if (!section) return;

      // Only run parallax in HIGH mode (too costly for low-end)
      if (window.PERF.isLow()) return;

      gsap.to(bg, {
        yPercent: speed * 30,   // Translate: keeps inside inset: -20% boundaries
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end:   'bottom top',
          scrub: true,  // Scrub = sync to scroll = no animation frame overhead
        }
      });
    });

    /* ── Reveal animations: .reveal-up elements ─────────────────── */
    $$('.reveal-up').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    /* ── Reveal animations: .reveal-fade elements ─────────────────── */
    $$('.reveal-fade').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    /* ── Fact items stagger reveal ──────────────────────────────── */
    $$('.facts-list').forEach(function (list) {
      const items = $$('.fact-item', list);
      gsap.from(items, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: list,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    /* ── Animal chips stagger ───────────────────────────────────── */
    $$('.animals-row').forEach(function (row) {
      const chips = $$('.animal-chip', row);
      gsap.from(chips, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: row,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    /* ── Active nav link sync ───────────────────────────────────── */
    $$('.section--biome').forEach(function (section) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end:   'bottom 50%',
        onEnter:     function () { setActiveNav(section.id); },
        onEnterBack: function () { setActiveNav(section.id); },
      });
    });
  }

  function setActiveNav(id) {
    $$('.nav__link').forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === id);
    });
  }

  /* ── Canvas particle systems ────────────────────────────────── */

  // Particle pool — reuse objects to avoid GC pressure
  function createParticlePool(count, factory) {
    const pool = [];
    for (let i = 0; i < count; i++) pool.push(factory(i));
    return pool;
  }

  /* ─── Hero Particles (stars/fireflies) ────────────────────── */
  function initHeroParticles() {
    const canvas = $('#hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles, rafId;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COUNT = 80;
    particles = createParticlePool(COUNT, function () {
      return {
        x: Math.random() * 1, y: Math.random(), // normalized
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
        speed: Math.random() * 0.0002 + 0.0001,
        phase: Math.random() * Math.PI * 2,
      };
    });

    let last = performance.now();
    function loop(now) {
      const dt = Math.min(now - last, 50);  // Cap delta to prevent spiral of death
      last = now;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#f0ece4';
      particles.forEach(function (p) {
        p.phase += p.speed * dt;
        const alpha = (Math.sin(p.phase) * 0.5 + 0.5) * 0.7 + 0.1;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      rafId = raf(loop);
    }

    // Only run while hero is visible (IntersectionObserver = efficient)
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          last = performance.now();
          rafId = raf(loop);
        } else {
          caf(rafId);
        }
      });
    }, { threshold: 0.1 });
    io.observe(canvas.closest('.section'));
  }

  /* ─── Ocean Bubbles ────────────────────────────────────────── */
  function initOceanBubbles() {
    if (window.PERF.isLow()) return;
    const canvas = document.querySelector('#ocean .bubble-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, rafId;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COUNT = 25;
    const bubbles = createParticlePool(COUNT, function () {
      return {
        x: Math.random(),
        y: 1 + Math.random() * 0.2,  // start below screen
        r: Math.random() * 8 + 3,
        speed: (Math.random() * 0.00008 + 0.00005),
        drift: (Math.random() - 0.5) * 0.0002,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.3 + 0.05,
      };
    });

    let last = performance.now();
    function loop(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, W, H);

      bubbles.forEach(function (b) {
        b.y     -= b.speed * dt;
        b.phase += 0.001 * dt;
        b.x     += Math.sin(b.phase) * b.drift;

        if (b.y < -0.05) {
          // Recycle bubble
          b.y = 1.05;
          b.x = Math.random();
        }

        ctx.globalAlpha = b.alpha;
        ctx.strokeStyle = 'rgba(79,195,247,0.8)';
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.arc(b.x * W, b.y * H, b.r, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      rafId = raf(loop);
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { last = performance.now(); rafId = raf(loop); }
        else                  { caf(rafId); }
      });
    }, { threshold: 0.05 });
    io.observe(canvas.closest('.section'));
  }

  /* ─── Desert Sand Drift ────────────────────────────────────── */
  function initDesertSand() {
    if (window.PERF.isLow()) return;
    const canvas = document.querySelector('#desert .sand-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, rafId;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COUNT = 120;
    const grains = createParticlePool(COUNT, function () {
      return {
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2 + 0.4,
        speed: Math.random() * 0.0003 + 0.0001,
        alpha: Math.random() * 0.25 + 0.05,
      };
    });

    let last = performance.now();
    function loop(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#c8a96e';

      grains.forEach(function (g) {
        g.x += g.speed * dt;
        if (g.x > 1.02) g.x = -0.02;

        ctx.globalAlpha = g.alpha;
        ctx.beginPath();
        ctx.arc(g.x * W, g.y * H, g.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      rafId = raf(loop);
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { last = performance.now(); rafId = raf(loop); }
        else                  { caf(rafId); }
      });
    }, { threshold: 0.05 });
    io.observe(canvas.closest('.section'));
  }

  /* ─── Arctic Snow ──────────────────────────────────────────── */
  function initArcticSnow() {
    if (window.PERF.isLow()) return;
    const canvas = document.querySelector('#arctic .snow-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, rafId;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COUNT = 60;
    const flakes = createParticlePool(COUNT, function () {
      return {
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.0002 + 0.0001,
        drift: (Math.random() - 0.5) * 0.0001,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.2,
      };
    });

    let last = performance.now();
    function loop(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#e8f4ff';

      flakes.forEach(function (f) {
        f.y     += f.speed * dt;
        f.phase += 0.001 * dt;
        f.x     += Math.sin(f.phase) * f.drift;

        if (f.y > 1.02) { f.y = -0.02; f.x = Math.random(); }

        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x * W, f.y * H, f.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      rafId = raf(loop);
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { last = performance.now(); rafId = raf(loop); }
        else                  { caf(rafId); }
      });
    }, { threshold: 0.05 });
    io.observe(canvas.closest('.section'));
  }

  /* ─── Planet Stars ─────────────────────────────────────────── */
  function initPlanetStars() {
    const canvas = document.querySelector('#planet .star-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, rafId;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COUNT = window.PERF.isHigh() ? 200 : 80;
    const stars = createParticlePool(COUNT, function () {
      return {
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.001 + 0.0003,
        alpha: Math.random() * 0.6 + 0.2,
      };
    });

    let last = performance.now();
    function loop(now) {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#ffffff';

      stars.forEach(function (s) {
        s.phase += s.speed * dt;
        const a = (Math.sin(s.phase) * 0.3 + 0.7) * s.alpha;
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      rafId = raf(loop);
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { last = performance.now(); rafId = raf(loop); }
        else                  { caf(rafId); }
      });
    }, { threshold: 0.05 });
    io.observe(canvas.closest('.section'));
  }

  /* ── FPS Counter ────────────────────────────────────────────── */
  function initFPSCounter() {
    const counter = $('#fps-counter');
    const display = $('#fps-value');
    const btn     = $('#btn-fps');
    if (!counter || !display || !btn) return;

    let visible = false;
    let frames  = 0;
    let last    = performance.now();
    let rafId;

    function loop(now) {
      frames++;
      const delta = now - last;
      if (delta >= 500) {
        const fps = Math.round((frames / delta) * 1000);
        display.textContent = fps;
        // Color-code by performance
        display.style.color = fps >= 55 ? '#4caf50' : fps >= 30 ? '#ffc107' : '#f44336';
        frames = 0;
        last   = now;
      }
      rafId = raf(loop);
    }

    btn.addEventListener('click', function () {
      visible = !visible;
      counter.classList.toggle('visible', visible);
      btn.classList.toggle('active', visible);
      if (visible) {
        frames = 0; last = performance.now();
        rafId = raf(loop);
      } else {
        caf(rafId);
      }
    });
  }

  /* ── Sound system ───────────────────────────────────────────── */
  function initSound() {
    const btn = $('#btn-sound');
    if (!btn) return;

    let soundOn = false;
    let currentAudio = null;
    let currentSection = null;

    // Lazy-load audio only when user enables sound
    btn.addEventListener('click', function () {
      soundOn = !soundOn;
      btn.classList.toggle('active', soundOn);
      document.body.dataset.sound = soundOn ? 'on' : 'off';

      if (!soundOn && currentAudio) {
        currentAudio.pause();
      } else if (soundOn && currentSection) {
        playAudioForSection(currentSection);
      }
    });

    // Update ambient sound as sections enter viewport
    if (!window.IntersectionObserver) return;
    $$('.section--biome').forEach(function (section) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            currentSection = section;
            if (soundOn) playAudioForSection(section);
          }
        });
      }, { threshold: 0.4 });
      io.observe(section);
    });

    function playAudioForSection(section) {
      const src = section.dataset.soundSrc;
      if (!src) return;
      if (currentAudio && currentAudio.dataset.src === src) return;

      // Fade out current
      if (currentAudio) {
        fadeOutAudio(currentAudio, function () { currentAudio = null; });
      }

      // Create and play new (lazy-loaded)
      const audio = new Audio();
      audio.src  = src;
      audio.loop = true;
      audio.volume = 0;
      audio.dataset.src = src;
      audio.play().then(function () {
        currentAudio = audio;
        fadeInAudio(audio, 0.25);
      }).catch(function () {
        // Autoplay blocked — silently ignore
      });
    }

    function fadeInAudio(audio, targetVol) {
      let vol = 0;
      const step = targetVol / 30;
      const iv = setInterval(function () {
        vol = Math.min(vol + step, targetVol);
        audio.volume = vol;
        if (vol >= targetVol) clearInterval(iv);
      }, 50);
    }

    function fadeOutAudio(audio, cb) {
      let vol = audio.volume;
      const step = vol / 20;
      const iv = setInterval(function () {
        vol = Math.max(vol - step, 0);
        audio.volume = vol;
        if (vol <= 0) {
          clearInterval(iv);
          audio.pause();
          if (cb) cb();
        }
      }, 50);
    }
  }

  /* ── Performance mode change handler ─────────────────────────── */
  window.addEventListener('perfModeChange', function (e) {
    const mode = e.detail.mode;
    // Reinitialise ScrollTrigger with new mode constraints
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    console.info('[ANIM] Performance mode changed to:', mode.toUpperCase());
  });

  /* ── Fallback reveal (no GSAP) ──────────────────────────────── */
  function fallbackReveal() {
    $$('.reveal-up, .reveal-fade').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ── Boot sequence ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    // Loader runs immediately (no GSAP needed)
    runLoader();
    initFPSCounter();
    initSound();

    // Wait for GSAP before scroll-based animations
    waitForGSAP(function () {
      initScrollAnimations();
    });

    // Canvas systems initialise after DOM is ready
    // Deferred to avoid blocking the first paint
    setTimeout(function () {
      initOceanBubbles();
      initDesertSand();
      initArcticSnow();
      initPlanetStars();
    }, 200);
  });

  // When performance benchmark finishes, refresh ScrollTrigger
  window.PERF.onBenchmarkDone = function (mode) {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  };

})();
