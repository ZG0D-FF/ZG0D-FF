/* ================================================================
   savannaAnimation.js — Savanna Plains (Day/Night Hybrid Edition)
   Registers with AnimationManager under id: 'savanna'
================================================================ */

;(function (global) {
  'use strict';

  /* ── 1. Canvas 2D: Boids (Birds) & Golden Dust ──────────────── */
  function BoidsAndDustSystem(canvas, perf) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    let lastTime = performance.now();

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Golden Bokeh Dust
    const dustCount = perf.isHigh() ? 40 : 15;
    const dust = Array.from({ length: dustCount }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 12 + 4,
      speed: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2
    }));

    // Boids (Flocking Birds)
    const boidsCount = perf.isHigh() ? 45 : 20;
    const boids = Array.from({ length: boidsCount }, () => ({
      x: Math.random() * W, 
      y: Math.random() * (H * 0.4), // Keep birds in the sky
      vx: Math.random() * 2, 
      vy: (Math.random() - 0.5)
    }));

    // Draw tiny bird silhouette
    function drawBird(x, y, vx, vy) {
      const angle = Math.atan2(vy, vx);
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.beginPath();
      ctx.moveTo(4, 0);   // Beak
      ctx.lineTo(-3, 3);  // Wing
      ctx.lineTo(-1, 0);  // Tail
      ctx.lineTo(-3, -3); // Wing
      ctx.closePath();
      ctx.fill();
      ctx.rotate(-angle);
      ctx.translate(-x, -y);
    }

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      ctx.clearRect(0, 0, W, H);

      // --- Draw Dust (Screen Blending) ---
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = '#ffb300';
      dust.forEach(d => {
        d.x += d.speed * dt * 0.05;
        d.phase += 0.001 * dt;
        d.y += Math.sin(d.phase) * 0.2;
        if (d.x > W + 50) d.x = -50;
        
        ctx.globalAlpha = Math.max(0, Math.sin(d.phase) * 0.25); 
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      });

      // --- Draw Boids (Source Over Blending) ---
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      
      // Highly optimized separation/cohesion algorithm
      for (let i = 0; i < boidsCount; i++) {
        let b1 = boids[i];
        let sepX = 0, sepY = 0, cohX = 0, cohY = 0, count = 0;

        for (let j = 0; j < boidsCount; j++) {
          if (i === j) continue;
          let b2 = boids[j];
          let dx = b1.x - b2.x;
          let dy = b1.y - b2.y;
          if (dx*dx + dy*dy < 2500) { // Detection radius
            sepX += dx; sepY += dy;
            cohX += b2.x; cohY += b2.y;
            count++;
          }
        }

        if (count > 0) {
          b1.vx += (sepX * 0.001) + ((cohX/count - b1.x) * 0.0005);
          b1.vy += (sepY * 0.001) + ((cohY/count - b1.y) * 0.0005);
        }

        b1.vx += 0.03; // Wind pushing right
        
        // Speed limits
        const speed = Math.sqrt(b1.vx*b1.vx + b1.vy*b1.vy);
        if (speed > 1.8) { b1.vx = (b1.vx/speed)*1.8; b1.vy = (b1.vy/speed)*1.8; }
        
        b1.x += b1.vx; 
        b1.y += b1.vy;
        if (b1.x > W + 50) { b1.x = -50; b1.y = Math.random() * (H * 0.4); }

        drawBird(b1.x, b1.y, b1.vx, b1.vy);
      }

      rafId = requestAnimationFrame(loop);
    }

    return {
      start: () => { if (!running) { running = true; lastTime = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop: () => { running = false; cancelAnimationFrame(rafId); },
      destroy: () => { running = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); }
    };
  }

  /* ── 2. WebGL: Fireflies (Unreal Bloom) ─────────────────────── */
  function FireflySystem(canvas, perf) {
    let W, H, rafId, running = false;
    let lastTime = performance.now();

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 10;

    const count = perf.isHigh() ? 150 : 60;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i*3] = (Math.random() - 0.5) * 25; // x
      pos[i*3+1] = (Math.random() - 0.5) * 10 - 2; // y (Start low in grass)
      pos[i*3+2] = (Math.random() - 0.5) * 5; // z
      phase[i] = Math.random() * Math.PI * 2;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('phase', new THREE.BufferAttribute(phase, 1));

    const mat = new THREE.PointsMaterial({
      color: 0xffaa00, // Golden/Orange firefly core
      size: 0.15,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const fireflies = new THREE.Points(geo, mat);
    scene.add(fireflies);

    // AAA Bloom Pass
    let composer;
    if (perf.isHigh() && typeof THREE.EffectComposer !== 'undefined') {
      composer = new THREE.EffectComposer(renderer);
      composer.addPass(new THREE.RenderPass(scene, camera));
      composer.addPass(new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2.0, 0.4, 0.5));
    }

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H; camera.updateProjectionMatrix();
      if (composer) composer.setSize(W, H);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      const positions = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        phase[i] += 0.001 * dt;
        positions[i*3] += Math.sin(phase[i]) * 0.005 * dt; // Sway X
        positions[i*3+1] += Math.cos(phase[i] * 0.8) * 0.003 * dt; // Sway Y
      }
      geo.attributes.position.needsUpdate = true;

      if (composer) composer.render();
      else renderer.render(scene, camera);
      
      rafId = requestAnimationFrame(loop);
    }

    return {
      start: () => { if (!running) { running = true; lastTime = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop: () => { running = false; cancelAnimationFrame(rafId); },
      destroy: () => { running = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); }
    };
  }

  /* ── 3. Module Integration ──────────────────────────────────── */
  const SavannaAnimation = {
    _el: null,
    _entranceTl: null,
    _boids: null,
    _fireflies: null,
    _isNight: false,
    _toggleTimer: null,

    init: function (el, perf) {
      this._el = el;
      this._buildEntrance();

      if (!perf.isLow()) {
        const bg = el.querySelector('.parallax-bg');
        if (bg) gsap.to(bg, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2 } });
      }

      // Initialize Engines
      const canvas2d = el.querySelector('#savanna-2d');
      if (canvas2d && !perf.isLow()) this._boids = BoidsAndDustSystem(canvas2d, perf);

      const canvasWebGL = el.querySelector('#savanna-webgl');
      if (canvasWebGL && typeof THREE !== 'undefined' && !perf.isLow()) this._fireflies = FireflySystem(canvasWebGL, perf);

      // Night Mode Button Logic
      const nightBtn = el.querySelector('#btn-night-mode');
      if (nightBtn) {
        nightBtn.addEventListener('click', () => {
          this._isNight = !this._isNight;
          el.classList.toggle('is-night', this._isNight);
          
          nightBtn.innerHTML = this._isNight 
            ? '<span class="icon">☀️</span> Day Mode' 
            : '<span class="icon">🌙</span> Night Mode';

          clearTimeout(this._toggleTimer);

          if (this._isNight) {
            // Turn ON Fireflies immediately, stop Birds after fade out to save CPU
            if (this._fireflies) this._fireflies.start();
            this._toggleTimer = setTimeout(() => { if (this._boids) this._boids.stop(); }, 1500);
          } else {
            // Turn ON Birds immediately, stop Fireflies after fade out
            if (this._boids) this._boids.start();
            this._toggleTimer = setTimeout(() => { if (this._fireflies) this._fireflies.stop(); }, 1500);
          }
        });
      }
    },

    _buildEntrance: function () {
      const revs = Array.from(this._el.querySelectorAll('.reveal-up, .reveal-fade, .animal-chip, .fact-item'));
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      if (revs.length) tl.fromTo(revs, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0);
      this._entranceTl = tl;
    },

    enter: function () {
      if (this._entranceTl) this._entranceTl.play();
      if (this._isNight && this._fireflies) this._fireflies.start();
      if (!this._isNight && this._boids) this._boids.start();
    },

    leave: function () {
      if (this._entranceTl) this._entranceTl.pause();
      if (this._boids) this._boids.stop();
      if (this._fireflies) this._fireflies.stop();
    },

    onPerfChange: function (mode) {
      if (mode === 'low') {
        if (this._boids) { this._boids.destroy(); this._boids = null; }
        if (this._fireflies) { this._fireflies.destroy(); this._fireflies = null; }
      }
    },

    destroy: function () {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      if (this._boids) { this._boids.destroy(); this._boids = null; }
      if (this._fireflies) { this._fireflies.destroy(); this._fireflies = null; }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) global.AnimationManager.register('savanna', SavannaAnimation);
  });

})(window);