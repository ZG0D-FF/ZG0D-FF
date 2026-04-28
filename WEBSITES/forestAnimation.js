/* ================================================================
   forestAnimation.js — Rainforest Realm
   B: Rainfall / Monsoon Mode (Canvas 2D)
   C: Falling Leaves (Canvas 2D)
   D: Volumetric God-Rays (WebGL)
   E: Butterfly Flutter (Canvas 2D)
   F: Canopy Breathe (GSAP)
================================================================ */

;(function (global) {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     B + C + E — Rain, Leaves, Butterflies (single Canvas 2D)
  ══════════════════════════════════════════════════════════════ */
  function ForestCanvas2D(canvas, perf) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    let last = performance.now();
    let monsoon = false;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* ── B: Rain drops ── */
    const rainCount = perf.isHigh() ? 180 : 80;
    const drops = Array.from({ length: rainCount }, () => spawnDrop());

    function spawnDrop() {
      return {
        x:       Math.random(),
        y:       Math.random() * -0.2,
        len:     Math.random() * 18 + 8,
        speed:   Math.random() * 0.0008 + 0.0006,
        alpha:   Math.random() * 0.25 + 0.08,
        width:   Math.random() * 0.6 + 0.3,
      };
    }

    /* ── C: Leaves ── */
    const leafCount = perf.isHigh() ? 18 : 8;
    const leafColors = ['#2d5a27','#3a7a30','#4a9a3a','#8b6914','#6b4f10','#5a8a20'];

    const leaves = Array.from({ length: leafCount }, (_, i) => ({
      x:      Math.random(),
      y:      Math.random() * -0.3 - 0.05,
      size:   (i < leafCount / 2) ? Math.random() * 10 + 6 : Math.random() * 6 + 3,
      speed:  (i < leafCount / 2) ? Math.random() * 0.00015 + 0.00008 : Math.random() * 0.00025 + 0.00018,
      phase:  Math.random() * Math.PI * 2,
      rot:    Math.random() * Math.PI * 2,
      rotSpd: (Math.random() - 0.5) * 0.002,
      swing:  Math.random() * 0.003 + 0.001,
      color:  leafColors[Math.floor(Math.random() * leafColors.length)],
      alpha:  Math.random() * 0.5 + 0.5,
    }));

    function drawLeaf(l) {
      ctx.save();
      ctx.translate(l.x * W, l.y * H);
      ctx.rotate(l.rot);
      ctx.globalAlpha = l.alpha;
      ctx.fillStyle   = l.color;
      ctx.beginPath();
      // Simple leaf shape using bezier
      ctx.moveTo(0, -l.size);
      ctx.bezierCurveTo( l.size * 0.8, -l.size * 0.5,  l.size * 0.8,  l.size * 0.5, 0,  l.size);
      ctx.bezierCurveTo(-l.size * 0.8,  l.size * 0.5, -l.size * 0.8, -l.size * 0.5, 0, -l.size);
      ctx.fill();
      // Midrib
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth   = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -l.size); ctx.lineTo(0, l.size);
      ctx.stroke();
      ctx.restore();
    }

    /* ── E: Butterflies ── */
    const bflyCount = perf.isHigh() ? 5 : 2;
    const bflyColors = ['#1565c0','#e65100','#6a1b9a','#2e7d32'];

    const butterflies = Array.from({ length: bflyCount }, (_, i) => ({
      cx:     0.2 + Math.random() * 0.6,   // figure-8 center x
      cy:     0.2 + Math.random() * 0.5,   // figure-8 center y
      phase:  Math.random() * Math.PI * 2,
      speed:  Math.random() * 0.0004 + 0.0002,
      rx:     0.06 + Math.random() * 0.08, // orbit x radius
      ry:     0.04 + Math.random() * 0.05,
      wingP:  Math.random() * Math.PI * 2, // wing flap phase
      wingSpd:0.008 + Math.random() * 0.006,
      color:  bflyColors[i % bflyColors.length],
      alpha:  0,
      targetAlpha: Math.random() * 0.7 + 0.3,
      fadeDir: 1,
      fadeTimer: Math.random() * 300,
    }));

    function drawButterfly(b, dt) {
      // Figure-8 Lissajous path
      const x = (b.cx + Math.sin(b.phase) * b.rx) * W;
      const y = (b.cy + Math.sin(b.phase * 2) * b.ry) * H;

      b.phase   += b.speed * dt;
      b.wingP   += b.wingSpd * dt;
      b.fadeTimer -= dt;

      // Fade in/out cycle
      if (b.fadeTimer <= 0) {
        b.fadeDir    = b.alpha > 0.1 ? -1 : 1;
        b.fadeTimer  = 200 + Math.random() * 400;
      }
      b.alpha = Math.max(0, Math.min(b.targetAlpha, b.alpha + b.fadeDir * 0.001 * dt));

      if (b.alpha < 0.01) return;

      const wingOpen = Math.abs(Math.sin(b.wingP));
      const ws = 8 + wingOpen * 7;  // wing spread

      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = b.alpha;
      ctx.fillStyle   = b.color;

      // Left wings
      ctx.beginPath();
      ctx.ellipse(-ws * 0.5, -2, ws * 0.55, ws * 0.38, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-ws * 0.4,  3, ws * 0.38, ws * 0.22,  0.3, 0, Math.PI * 2);
      ctx.fill();

      // Right wings
      ctx.beginPath();
      ctx.ellipse( ws * 0.5, -2, ws * 0.55, ws * 0.38,  0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse( ws * 0.4,  3, ws * 0.38, ws * 0.22, -0.3, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.ellipse(0, 0, 1.5, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function loop(now) {
      if (!running) return;
      const dt  = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, W, H);

      /* Rain */
      const speedMult = monsoon ? 2.2 : 1;
      const alphaMult = monsoon ? 1.6 : 1;

      ctx.strokeStyle = 'rgba(180, 210, 255, 1)';
      drops.forEach(d => {
        d.y += d.speed * speedMult * dt;
        if (d.y > 1.05) { Object.assign(d, spawnDrop()); }

        ctx.globalAlpha = Math.min(d.alpha * alphaMult, 0.55);
        ctx.lineWidth   = d.width * (monsoon ? 1.4 : 1);
        ctx.beginPath();
        ctx.moveTo(d.x * W, d.y * H);
        ctx.lineTo(d.x * W - (monsoon ? 3 : 1), d.y * H + d.len * speedMult);
        ctx.stroke();
      });

      /* Leaves */
      ctx.globalAlpha = 1;
      leaves.forEach(l => {
        l.phase += 0.0008 * dt;
        l.rot   += l.rotSpd * dt;
        l.x     += Math.sin(l.phase) * l.swing * dt * 0.1;
        l.y     += l.speed * dt;
        if (l.y > 1.1) { l.y = -0.1; l.x = Math.random(); }
        drawLeaf(l);
      });

      /* Butterflies */
      ctx.globalAlpha = 1;
      butterflies.forEach(b => drawButterfly(b, dt));

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(loop);
    }

    return {
      setMonsoon: (state) => { monsoon = state; },
      start:   () => { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    () => { running = false; cancelAnimationFrame(rafId); },
      destroy: () => { running = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); },
    };
  }

  /* ══════════════════════════════════════════════════════════════
     D — Volumetric God-Rays (Three.js)
  ══════════════════════════════════════════════════════════════ */
  function GodRaySystem(canvas, perf) {
    let W, H, rafId, running = false;
    let last = performance.now();

    const scene    = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setClearColor(0x000000, 0);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 8;

    /* Each ray: a tall thin cone, additive blending, very low opacity */
    const rayCount = perf.isHigh() ? 7 : 3;
    const rays = [];

    for (let i = 0; i < rayCount; i++) {
      const height = 14 + Math.random() * 6;
      const geo    = new THREE.CylinderGeometry(0.05, 2.5 + Math.random() * 1.5, height, 8, 1, true);
      const mat    = new THREE.MeshBasicMaterial({
        color:       0x90c060,
        transparent: true,
        opacity:     0.04 + Math.random() * 0.03,
        blending:    THREE.AdditiveBlending,
        side:        THREE.DoubleSide,
        depthWrite:  false,
      });
      const ray = new THREE.Mesh(geo, mat);

      // Spread rays from top-right corner
      ray.position.set(
        2 + (Math.random() - 0.3) * 6,   // right-biased x
        4 + Math.random() * 2,            // above screen top
        -1 + Math.random() * 2
      );
      ray.rotation.z = -0.3 - Math.random() * 0.4;  // angle down-left
      ray.rotation.x =  (Math.random() - 0.5) * 0.2;

      ray.userData = {
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.0003 + Math.random() * 0.0002,
        baseOpacity: mat.opacity,
      };

      scene.add(ray);
      rays.push(ray);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      rays.forEach(r => {
        r.userData.pulsePhase += r.userData.pulseSpeed * dt;
        // Opacity breathes gently
        r.material.opacity = r.userData.baseOpacity
          * (0.7 + Math.sin(r.userData.pulsePhase) * 0.3);
        // Very slow drift
        r.position.x += Math.sin(r.userData.pulsePhase * 0.3) * 0.0003 * dt;
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    }

    return {
      start:   () => { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    () => { running = false; cancelAnimationFrame(rafId); },
      destroy: () => { running = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); renderer.dispose(); },
    };
  }

  /* ══════════════════════════════════════════════════════════════
     Module
  ══════════════════════════════════════════════════════════════ */
  const ForestAnimation = {
    _el: null, _perf: null,
    _entranceTl: null, _breatheTl: null,
    _stBg: null,
    _canvas2d: null, _godRays: null,
    _isMonsoon: false,

    init: function (el, perf) {
      this._el = el; this._perf = perf;

      this._buildEntrance();

      /* F: Canopy Breathe — trees + fog swell slowly */
      if (!perf.isLow()) {
        this._buildCanopyBreathe();
        this._buildParallax();
      }

      /* B+C+E: Rain, Leaves, Butterflies */
      if (!perf.isLow()) {
        const c2d = el.querySelector('#forest-2d');
        if (c2d) this._canvas2d = ForestCanvas2D(c2d, perf);
      }

      /* D: God-Rays */
      if (perf.isHigh()) {
        const cgl = el.querySelector('#forest-webgl');
        if (cgl && typeof THREE !== 'undefined') this._godRays = GodRaySystem(cgl, perf);
      }

      /* Monsoon button */
      const btn = el.querySelector('#btn-monsoon');
      if (btn && this._canvas2d) {
        btn.addEventListener('click', () => {
          this._isMonsoon = !this._isMonsoon;
          this._canvas2d.setMonsoon(this._isMonsoon);
          btn.classList.toggle('active', this._isMonsoon);
          btn.innerHTML = this._isMonsoon
            ? '<span class="icon">☀️</span> Clear Skies'
            : '<span class="icon">🌧️</span> Monsoon Mode';
        });
      }
    },

    _buildEntrance: function () {
      const el = this._el, perf = this._perf;
      const bg    = el.querySelector('.parallax-bg');
      const revs  = Array.from(el.querySelectorAll('.reveal-up, .reveal-fade'));
      const tl    = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

      if (bg)         tl.fromTo(bg,   { opacity: 0.6 }, { opacity: 1, duration: 1.2 }, 0);
      if (revs.length) tl.fromTo(revs, { opacity: 0, y: perf.isLow() ? 15 : 40 }, { opacity: 1, y: 0, duration: perf.isLow() ? 0.5 : 0.8, stagger: perf.isLow() ? 0.08 : 0.13 }, 0.2);

      this._entranceTl = tl;
    },

    /* F: Canopy Breathe */
    _buildCanopyBreathe: function () {
      const el   = this._el;
      const fog  = el.querySelector('.biome-layer--fog');
      const trees = Array.from(el.querySelectorAll('.tree'));

      const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: true, defaults: { ease: 'sine.inOut' } });

      if (fog) {
        tl.to(fog,   { opacity: 0.85, scaleX: 1.04, duration: 4 }, 0);
        tl.to(fog,   { opacity: 0.4,  scaleX: 0.98, duration: 4 }, 4);
      }
      if (trees.length) {
        tl.to(trees, { scaleY: 1.015, transformOrigin: 'bottom center', duration: 4, stagger: 0.3 }, 0);
      }

      this._breatheTl = tl;
    },

    _buildParallax: function () {
      const bg = this._el.querySelector('.parallax-bg');
      if (!bg) return;
      this._stBg = gsap.to(bg, {
        scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: this._el, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    },

    enter: function () {
      if (this._entranceTl) this._entranceTl.play();
      if (this._breatheTl)  this._breatheTl.play();
      if (this._canvas2d)   this._canvas2d.start();
      if (this._godRays)    this._godRays.start();
    },

    leave: function () {
      if (this._entranceTl) this._entranceTl.pause();
      if (this._breatheTl)  this._breatheTl.pause();
      if (this._canvas2d)   this._canvas2d.stop();
      if (this._godRays)    this._godRays.stop();
    },

    onPerfChange: function (mode) {
      if (mode === 'low') {
        if (this._canvas2d) { this._canvas2d.destroy(); this._canvas2d = null; }
        if (this._godRays)  { this._godRays.destroy();  this._godRays  = null; }
        if (this._breatheTl){ this._breatheTl.kill();   this._breatheTl = null; }
        if (this._stBg)     { this._stBg.kill();        this._stBg = null; }
      }
    },

    destroy: function () {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      if (this._breatheTl)  { this._breatheTl.kill();  this._breatheTl  = null; }
      if (this._stBg)       { this._stBg.kill();       this._stBg = null; }
      if (this._canvas2d)   { this._canvas2d.destroy(); this._canvas2d = null; }
      if (this._godRays)    { this._godRays.destroy();  this._godRays  = null; }
    },
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) global.AnimationManager.register('forest', ForestAnimation);
  });

  global.ForestAnimation = ForestAnimation;

})(window);
