/* ================================================================
   arcticAnimation.js — Arctic Frontier (Cinematic 3D + Blizzard)
   Registers with AnimationManager under id: 'arctic'
================================================================ */

;(function (global) {
  'use strict';

  /* ── 1. WebGL: 3D Aurora & Ice Floes ────────────────────────── */
  function ArcticWebGLSystem(canvas, perf) {
    let W, H, rafId, running = false;
    let lastTime = performance.now();

    const scene = new THREE.Scene();
    
    // Transparent renderer so the Unsplash image shines through perfectly
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: perf.isHigh() });
    renderer.setClearColor(0x000000, 0); 
    renderer.toneMapping = THREE.ReinhardToneMapping;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 2, 12);

    /* --- The Aurora Ribbon --- */
    const auroraGeo = new THREE.PlaneGeometry(35, 6, 128, 8);
    const auroraMat = new THREE.MeshBasicMaterial({
      color: 0x00ffcc, // Neon cyan/green
      transparent: true,
      opacity: 0.35, // Bumped up for daytime visibility
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const aurora = new THREE.Mesh(auroraGeo, auroraMat);
    aurora.position.set(0, 6, -5); // High in the sky
    aurora.rotation.x = Math.PI / 6;
    scene.add(aurora);

    /* --- The Drifting Ice Floes --- */
    const iceGroup = new THREE.Group();
    scene.add(iceGroup);
    
    const iceCount = perf.isHigh() ? 8 : 3;
    const floes = [];
    
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0xe0f7fa,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
      flatShading: true // Low-poly iceberg look
    });

    for (let i = 0; i < iceCount; i++) {
      const size = Math.random() * 0.8 + 0.3;
      const iceGeo = new THREE.IcosahedronGeometry(size, 0); 
      const ice = new THREE.Mesh(iceGeo, iceMat);
      
      ice.position.set((Math.random() - 0.5) * 30, -3 + (Math.random() * 1), (Math.random() - 0.5) * 8);
      ice.userData = {
        rotSpeed: (Math.random() - 0.5) * 0.001,
        driftSpeed: Math.random() * 0.001 + 0.0005
      };
      iceGroup.add(ice);
      floes.push(ice);
    }

    /* --- Lighting --- */
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5); 
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0); // Harsh glacial sun
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    /* --- Bloom Post-Processing --- */
    let composer;
    if (perf.isHigh() && typeof THREE.EffectComposer !== 'undefined') {
      composer = new THREE.EffectComposer(renderer);
      const renderPass = new THREE.RenderPass(scene, camera);
      renderPass.clearColor = new THREE.Color(0,0,0);
      renderPass.clearAlpha = 0; 
      composer.addPass(renderPass);
      
      // Intense bloom for the Aurora
      composer.addPass(new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2.0, 0.5, 0.7));
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

      // Aurora Undulation
      const positions = auroraGeo.attributes.position;
      const time = now * 0.001;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.2 + time) * 1.5 + Math.cos(y * 0.5 - time * 0.5) * 1.0;
        positions.setZ(i, z);
      }
      auroraGeo.computeVertexNormals();
      auroraGeo.attributes.position.needsUpdate = true;
      auroraMat.color.setHSL((Math.sin(time * 0.2) * 0.1) + 0.45, 1.0, 0.6);

      // Ice Floes
      floes.forEach(ice => {
        ice.position.x -= ice.userData.driftSpeed * dt;
        ice.rotation.y += ice.userData.rotSpeed * dt;
        ice.rotation.z += ice.userData.rotSpeed * dt * 0.5;
        if (ice.position.x < -15) {
          ice.position.x = 15;
          ice.position.z = (Math.random() - 0.5) * 8;
        }
      });

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

  /* ── 2. Canvas 2D: Blizzard & Rolling Fog ─────────────────────── */
  function BlizzardSystem(canvas, perf) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    let lastTime = performance.now();

    let isBlizzard = false;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const count = perf.isHigh() ? 150 : 50;
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      baseSpeedY: Math.random() * 0.1 + 0.05,
      baseSpeedX: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.6 + 0.2
    }));

    const fogCount = 5;
    const fogs = Array.from({ length: fogCount }, (v, i) => ({
      x: (i / fogCount) * W,
      y: H - 100,
      r: 300 + Math.random() * 200,
      phase: Math.random() * Math.PI * 2
    }));

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      ctx.clearRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'screen';
      fogs.forEach(fog => {
        fog.phase += 0.001 * dt;
        fog.x += (isBlizzard ? 0.8 : 0.1) * dt; 
        if (fog.x > W + fog.r) fog.x = -fog.r;

        const targetOpacity = isBlizzard ? 0.15 : 0.03;
        const alpha = (Math.sin(fog.phase) * 0.02 + targetOpacity);

        const grad = ctx.createRadialGradient(fog.x, fog.y, 0, fog.x, fog.y, fog.r);
        grad.addColorStop(0, `rgba(200, 230, 255, ${alpha})`);
        grad.addColorStop(1, 'rgba(200, 230, 255, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(fog.x, fog.y, fog.r, 0, Math.PI*2); ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffffff';

      const targetShear = isBlizzard ? 1.8 : 0; 
      const targetGrav = isBlizzard ? 0.8 : 1;
      
      flakes.forEach(f => {
        f.currentShear = f.currentShear || 0;
        f.currentShear += (targetShear - f.currentShear) * 0.05;
        
        const vx = f.baseSpeedX + f.currentShear;
        const vy = f.baseSpeedY * targetGrav + (isBlizzard ? 0.2 : 0);

        f.x += vx * dt;
        f.y += vy * dt;

        if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W * 1.5 - W*0.25; }
        if (f.x > W + 10) { f.x = -10; f.y = Math.random() * H; }

        ctx.globalAlpha = f.opacity;

        if (isBlizzard) {
          ctx.lineWidth = f.r * 0.8;
          ctx.beginPath();
          ctx.moveTo(f.x, f.y);
          ctx.lineTo(f.x - vx * 15, f.y - vy * 15);
          ctx.stroke();
        } else {
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
        }
      });

      rafId = requestAnimationFrame(loop);
    }

    return {
      start: () => { if (!running) { running = true; lastTime = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop: () => { running = false; cancelAnimationFrame(rafId); },
      setBlizzard: (state) => { isBlizzard = state; },
      destroy: () => { running = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); }
    };
  }

  /* ── 3. Module Integration ──────────────────────────────────── */
  const ArcticAnimation = {
    _el: null,
    _entranceTl: null,
    _webgl: null,
    _blizzard: null,
    _isBlizzardActive: false,

    init: function (el, perf) {
      this._el = el;
      this._buildEntrance();

      if (!perf.isLow()) {
        const bg = el.querySelector('.parallax-bg');
        if (bg) gsap.to(bg, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      }

      const canvasWebGL = el.querySelector('#arctic-webgl');
      if (canvasWebGL && typeof THREE !== 'undefined' && !perf.isLow()) this._webgl = ArcticWebGLSystem(canvasWebGL, perf);

      const canvas2D = el.querySelector('#arctic-2d');
      if (canvas2D && !perf.isLow()) this._blizzard = BlizzardSystem(canvas2D, perf);

      const blizzBtn = el.querySelector('#btn-blizzard');
      if (blizzBtn && this._blizzard) {
        blizzBtn.addEventListener('click', () => {
          this._isBlizzardActive = !this._isBlizzardActive;
          blizzBtn.classList.toggle('active', this._isBlizzardActive);
          blizzBtn.innerHTML = this._isBlizzardActive 
            ? '<span class="icon">⚠️</span> Calm the Storm' 
            : '<span class="icon">❄️</span> Activate Blizzard';
          
          this._blizzard.setBlizzard(this._isBlizzardActive);
        });
      }
    },

    _buildEntrance: function () {
      const revs = Array.from(this._el.querySelectorAll('.reveal-up, .reveal-fade, .animal-chip, .fact-item'));
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      if (revs.length) tl.fromTo(revs, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0);
      this._entranceTl = tl;
    },

    enter: function () {
      if (this._entranceTl) this._entranceTl.play();
      if (this._webgl) this._webgl.start();
      if (this._blizzard) this._blizzard.start();
    },

    leave: function () {
      if (this._entranceTl) this._entranceTl.pause();
      if (this._webgl) this._webgl.stop();
      if (this._blizzard) this._blizzard.stop();
    },

    onPerfChange: function (mode) {
      if (mode === 'low') {
        if (this._webgl) { this._webgl.destroy(); this._webgl = null; }
        if (this._blizzard) { this._blizzard.destroy(); this._blizzard = null; }
      }
    },

    destroy: function () {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      if (this._webgl) { this._webgl.destroy(); this._webgl = null; }
      if (this._blizzard) { this._blizzard.destroy(); this._blizzard = null; }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) global.AnimationManager.register('arctic', ArcticAnimation);
  });

})(window);