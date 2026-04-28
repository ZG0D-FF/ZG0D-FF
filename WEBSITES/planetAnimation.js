/* ================================================================
   planetAnimation.js — Planet Section (Cinematic Overhaul)
   Registers with AnimationManager under id: 'planet'

   LAYERS (bottom → top):
     1. NebulaCanvas        — procedural deep-space nebula (Canvas 2D)
     2. CosmicWebCanvas     — particle neural-net / cosmic web (Canvas 2D)
     3. TerminatorCanvas    — day/night sweep + city lights (Canvas 2D)
     4. WormholeWebGL       — spinning light-ring tunnel (Three.js)
     5. BlackHoleWebGL      — accretion disk + distortion (Three.js)
     6. CrystalBallCanvas   — glowing crystal orb with deer (Canvas 2D)
     7. .star-canvas        — existing twinkling stars (rAF, kept)
     8. .reveal-up/.reveal-fade → GSAP entrance (kept)
     9. .planet-cta         → GSAP entrance (kept)

   REMOVED:
     - .planet-sphere (the old CSS Earth ball) — strip from HTML too
     - _buildCloudRotation (no more cloud ring)
     - _buildGlowBreath (no more CSS glow)

   PERFORMANCE:
     HIGH  → all 6 layers active
     MID   → Nebula + CosmicWeb + CrystalBall + Stars
     LOW   → Stars only (CSS fallback)
================================================================ */

;(function (global) {
  'use strict';

  /* ════════════════════════════════════════════════════════════════
     1. NEBULA BACKGROUND  (Canvas 2D)
     Layered radial gradients in purples/blues/deep reds that drift
     and breathe. Feels like a Hubble photograph coming alive.
  ════════════════════════════════════════════════════════════════ */
  function NebulaSystem(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    let last = performance.now();

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Each nebula cloud: position (normalized), color, radius, drift phase
    const clouds = [
      { cx:0.15, cy:0.25, r:0.55, color:'rgba(60,0,120,',   phase:0,    speed:0.00018 },
      { cx:0.75, cy:0.60, r:0.50, color:'rgba(0,20,100,',   phase:1.2,  speed:0.00013 },
      { cx:0.50, cy:0.80, r:0.45, color:'rgba(100,0,50,',   phase:2.4,  speed:0.00021 },
      { cx:0.85, cy:0.20, r:0.40, color:'rgba(10,50,120,',  phase:3.6,  speed:0.00016 },
      { cx:0.30, cy:0.70, r:0.35, color:'rgba(80,10,90,',   phase:0.8,  speed:0.00019 },
      { cx:0.60, cy:0.35, r:0.30, color:'rgba(0,80,100,',   phase:4.1,  speed:0.00014 },
    ];

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, W, H);

      clouds.forEach(function(c) {
        c.phase += c.speed * dt;
        // Drift position gently
        const driftX = Math.sin(c.phase) * 0.03;
        const driftY = Math.cos(c.phase * 0.7) * 0.025;
        const px = (c.cx + driftX) * W;
        const py = (c.cy + driftY) * H;
        const r  = c.r * Math.min(W, H);
        // Breathe opacity
        const alpha = 0.18 + Math.sin(c.phase * 0.6) * 0.07;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, r);
        grad.addColorStop(0,   c.color + (alpha * 1.4).toFixed(3) + ')');
        grad.addColorStop(0.5, c.color + (alpha * 0.7).toFixed(3) + ')');
        grad.addColorStop(1,   c.color + '0)');

        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      rafId = requestAnimationFrame(loop);
    }

    return {
      start:   function() { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    function() { running = false; cancelAnimationFrame(rafId); },
      destroy: function() { this.stop(); window.removeEventListener('resize', resize); },
    };
  }

  /* ════════════════════════════════════════════════════════════════
     2. COSMIC WEB  (Canvas 2D)
     ~120 particles drifting in 3D-ish space, connected by faint
     gold lines when near. Represents "every ecosystem is connected".
  ════════════════════════════════════════════════════════════════ */
  function CosmicWebSystem(canvas, perf) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    let last = performance.now();

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COUNT = perf.isHigh() ? 110 : 55;
    const MAX_DIST = 160;

    const nodes = Array.from({ length: COUNT }, function() {
      return {
        x:  Math.random(),
        y:  Math.random(),
        vx: (Math.random() - 0.5) * 0.00008,
        vy: (Math.random() - 0.5) * 0.00006,
        r:  Math.random() * 1.4 + 0.5,
        alpha: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.001 + 0.0004,
      };
    });

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, W, H);

      // Update positions
      nodes.forEach(function(n) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.phase += n.speed * dt;
        if (n.x < -0.02) n.x = 1.02;
        if (n.x >  1.02) n.x = -0.02;
        if (n.y < -0.02) n.y = 1.02;
        if (n.y >  1.02) n.y = -0.02;
      });

      // Draw connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < COUNT; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < COUNT; j++) {
          const b = nodes[j];
          const dx = (a.x - b.x) * W;
          const dy = (a.y - b.y) * H;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            ctx.strokeStyle = `rgba(200, 170, 90, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(function(n) {
        const pulse = n.alpha * (0.7 + Math.sin(n.phase) * 0.3);
        ctx.globalAlpha = pulse;
        ctx.fillStyle = '#d4af6a';
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(loop);
    }

    return {
      start:   function() { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    function() { running = false; cancelAnimationFrame(rafId); },
      destroy: function() { this.stop(); window.removeEventListener('resize', resize); },
    };
  }

  /* ════════════════════════════════════════════════════════════════
     3. TERMINATOR LINE  (Canvas 2D)
     A slow sweeping day/night boundary across the section.
     Dark half has twinkling "city lights" clusters.
  ════════════════════════════════════════════════════════════════ */
  function TerminatorSystem(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    let last = performance.now();
    let terminatorX = 0.6; // normalized 0-1, starts slightly right of center

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // City light clusters (in the dark half)
    const cities = Array.from({ length: 38 }, function() {
      return {
        x: Math.random() * 0.5,     // left half (dark side)
        y: Math.random(),
        count: Math.floor(Math.random() * 6) + 2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.002 + 0.001,
      };
    });

    let phase = 0;

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;
      phase += 0.00004 * dt;

      // Terminator sweeps very slowly across
      terminatorX = 0.5 + Math.sin(phase) * 0.18;

      ctx.clearRect(0, 0, W, H);

      // Day/night gradient
      const tx = terminatorX * W;
      const grad = ctx.createLinearGradient(tx - 120, 0, tx + 60, 0);
      grad.addColorStop(0,   'rgba(0,5,20, 0.55)');      // deep night
      grad.addColorStop(0.5, 'rgba(10,30,70, 0.25)');    // terminator
      grad.addColorStop(0.8, 'rgba(30,80,140, 0.08)');   // dawn glow
      grad.addColorStop(1,   'rgba(0,0,0,0)');           // day (transparent)

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // City lights on the dark side
      cities.forEach(function(city) {
        city.phase += city.speed * dt;
        const cx = city.x * tx; // only render in dark portion
        const cy = city.y * H;

        for (let k = 0; k < city.count; k++) {
          const lx = cx + (k % 3) * 4 - 4;
          const ly = cy + Math.floor(k / 3) * 4;
          const flicker = 0.4 + Math.sin(city.phase + k * 0.8) * 0.3;
          ctx.globalAlpha = Math.max(0, flicker) * 0.7;
          ctx.fillStyle = k % 3 === 0 ? '#fffbe0' : '#ffd580';
          ctx.beginPath();
          ctx.arc(lx, ly, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(loop);
    }

    return {
      start:   function() { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    function() { running = false; cancelAnimationFrame(rafId); },
      destroy: function() { this.stop(); window.removeEventListener('resize', resize); },
    };
  }

  /* ════════════════════════════════════════════════════════════════
     4. WORMHOLE TUNNEL  (Three.js)
     Concentric light rings that scale inward giving a tunnel illusion.
     Rings pulse and spin, additive bloom on high-end devices.
  ════════════════════════════════════════════════════════════════ */
  function WormholeSystem(canvas, perf) {
    if (typeof THREE === 'undefined') return null;

    let W, H, rafId, running = false;
    let last = performance.now();

    const scene    = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ReinhardToneMapping;

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 5;

    // Build rings — each a torus, spaced along Z
    const RING_COUNT = perf.isHigh() ? 22 : 10;
    const rings = [];

    for (let i = 0; i < RING_COUNT; i++) {
      const t = i / RING_COUNT;
      const radius = 1.2 + t * 2.8;
      const geo = new THREE.TorusGeometry(radius, 0.025 + t * 0.012, 8, 80);
      const hue = 0.62 + t * 0.12;   // blue → cyan
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 1.0, 0.65),
        transparent: true,
        opacity: 0.55 - t * 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.position.z = -i * 1.4;
      ring.userData = {
        baseZ:     -i * 1.4,
        spinSpeed: (i % 2 === 0 ? 1 : -1) * (0.0003 + i * 0.00004),
        pulsePhase: Math.random() * Math.PI * 2,
      };
      scene.add(ring);
      rings.push(ring);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // Bloom post-processing
    let composer;
    if (perf.isHigh() && typeof THREE.EffectComposer !== 'undefined') {
      composer = new THREE.EffectComposer(renderer);
      composer.addPass(new THREE.RenderPass(scene, camera));
      composer.addPass(new THREE.UnrealBloomPass(
        new THREE.Vector2(512, 512), 1.8, 0.6, 0.4
      ));
    }

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      if (composer) composer.setSize(W, H);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      rings.forEach(function(r) {
        // Spin
        r.rotation.z += r.userData.spinSpeed * dt;
        // Pulse scale
        r.userData.pulsePhase += 0.0008 * dt;
        const pulse = 1 + Math.sin(r.userData.pulsePhase) * 0.04;
        r.scale.set(pulse, pulse, 1);
        // Scroll forward — "falling into the tunnel"
        r.position.z += 0.006 * dt;
        if (r.position.z > 5) r.position.z = r.userData.baseZ - RING_COUNT * 1.4 + 5;
      });

      if (composer) composer.render();
      else renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    }

    return {
      start:   function() { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    function() { running = false; cancelAnimationFrame(rafId); },
      destroy: function() { this.stop(); window.removeEventListener('resize', resize); renderer.dispose(); },
    };
  }

  /* ════════════════════════════════════════════════════════════════
     5. BLACK HOLE + ACCRETION DISK  (Three.js)
     Dark void at center. Glowing orange/gold disk orbits it.
     Star field distorts around the singularity using a simple
     screen-space radial displacement trick on the disk material.
  ════════════════════════════════════════════════════════════════ */
  function BlackHoleSystem(canvas, perf) {
    if (typeof THREE === 'undefined') return null;

    let W, H, rafId, running = false;
    let last = performance.now();

    const scene    = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: perf.isHigh() });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ReinhardToneMapping;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 2.5, 7);
    camera.lookAt(0, 0, 0);

    // --- Event Horizon (dark sphere) ---
    const bhGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    scene.add(new THREE.Mesh(bhGeo, bhMat));

    // --- Gravitational Lensing Halo (just inside the disk) ---
    const haloGeo = new THREE.RingGeometry(0.86, 1.1, 80);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true, opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide, depthWrite: false,
    });
    scene.add(new THREE.Mesh(haloGeo, haloMat));

    // --- Accretion Disk (many stacked rings, different colors/speeds) ---
    const diskGroup = new THREE.Group();
    scene.add(diskGroup);

    const DISK_RINGS = perf.isHigh() ? 28 : 14;
    for (let i = 0; i < DISK_RINGS; i++) {
      const t = i / DISK_RINGS;
      const inner = 1.0 + t * 1.8;
      const outer = inner + 0.11;
      const rGeo  = new THREE.RingGeometry(inner, outer, 80);

      // Color transitions: deep red → orange → gold → pale yellow
      const hue = 0.04 - t * 0.04;          // 0.04 (red) → 0 (orange-red)
      const sat = 0.95;
      const lit = 0.35 + t * 0.35;          // darker inside, brighter outside
      const rMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, sat, lit),
        transparent: true,
        opacity: 0.6 - t * 0.35,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide, depthWrite: false,
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.userData.spinSpeed = (0.0008 - t * 0.0004) * (i % 2 === 0 ? 1 : -0.3);
      diskGroup.add(rMesh);
    }

    diskGroup.rotation.x = Math.PI / 6;  // tilt disk toward camera

    // Ambient only
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // Bloom
    let composer;
    if (perf.isHigh() && typeof THREE.EffectComposer !== 'undefined') {
      composer = new THREE.EffectComposer(renderer);
      composer.addPass(new THREE.RenderPass(scene, camera));
      composer.addPass(new THREE.UnrealBloomPass(
        new THREE.Vector2(512, 512), 2.2, 0.8, 0.3
      ));
    }

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      if (composer) composer.setSize(W, H);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      diskGroup.children.forEach(function(r) {
        r.rotation.z += r.userData.spinSpeed * dt;
      });
      // Slow whole disk wobble
      diskGroup.rotation.y += 0.00015 * dt;

      if (composer) composer.render();
      else renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    }

    return {
      start:   function() { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    function() { running = false; cancelAnimationFrame(rafId); },
      destroy: function() { this.stop(); window.removeEventListener('resize', resize); renderer.dispose(); },
    };
  }

  /* ════════════════════════════════════════════════════════════════
     7. STAR SYSTEM  (kept from original)
  ════════════════════════════════════════════════════════════════ */
  function StarSystem(canvas, count) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    const raf = requestAnimationFrame.bind(window);
    const caf = cancelAnimationFrame.bind(window);

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const stars = Array.from({ length: count }, function() {
      return {
        x:     Math.random(),
        y:     Math.random(),
        r:     Math.random() * 1.1 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0009 + 0.0003,
        base:  Math.random() * 0.5 + 0.2,
      };
    });

    let last = performance.now();

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#ffffff';
      stars.forEach(function(s) {
        s.phase += s.speed * dt;
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
      start:   function() { if (running) return; running = true; last = performance.now(); rafId = raf(loop); },
      stop:    function() { running = false; caf(rafId); },
      destroy: function() { this.stop(); window.removeEventListener('resize', resize); },
    };
  }

  /* ════════════════════════════════════════════════════════════════
     MODULE — PlanetAnimation
     Wires all systems together, registers with AnimationManager
  ════════════════════════════════════════════════════════════════ */
  const PlanetAnimation = {
    _el:          null,
    _perf:        null,
    _entranceTl:  null,
    // Systems
    _stars:       null,
    _nebula:      null,
    _cosmicWeb:   null,
    _terminator:  null,
    _wormhole:    null,
    _blackHole:   null,
    

    init: function(el, perf) {
      this._el   = el;
      this._perf = perf;

      this._injectCanvases();
      this._buildEntrance();

      // ── Stars (MID + HIGH) ──
      if (!perf.isLow()) {
        const sc = el.querySelector('.star-canvas');
        if (sc) this._stars = StarSystem(sc, perf.isHigh() ? 200 : 80);
      }

      // ── Nebula (MID + HIGH) ──
      if (!perf.isLow()) {
        const nc = el.querySelector('#planet-nebula');
        if (nc) this._nebula = NebulaSystem(nc);
      }

      // ── Cosmic Web (MID + HIGH) ──
      if (!perf.isLow()) {
        const wc = el.querySelector('#planet-web');
        if (wc) this._cosmicWeb = CosmicWebSystem(wc, perf);
      }

      

      // ── Terminator (HIGH only) ──
      if (perf.isHigh()) {
        const tc = el.querySelector('#planet-terminator');
        if (tc) this._terminator = TerminatorSystem(tc);
      }

      // ── Wormhole WebGL (HIGH only) ──
      if (perf.isHigh()) {
        const wgl = el.querySelector('#planet-wormhole');
        if (wgl) this._wormhole = WormholeSystem(wgl, perf);
      }

      // ── Black Hole WebGL (HIGH only) ──
      if (perf.isHigh()) {
        const bgl = el.querySelector('#planet-blackhole');
        if (bgl) this._blackHole = BlackHoleSystem(bgl, perf);
      }

      // Stars canvas parallax
      if (perf.isHigh()) {
        const sc = el.querySelector('.star-canvas');
        if (sc) gsap.to(sc, {
          yPercent: -6, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 3 }
        });
      }
    },

    /* Inject canvas elements into the section DOM */
    _injectCanvases: function() {
      const el = this._el;
      const perf = this._perf;

      // Helper: insert canvas before first child (lowest z-index)
      function addCanvas(id, zIndex, extra) {
        if (el.querySelector('#' + id)) return;
        const c = document.createElement('canvas');
        c.id = id;
        c.setAttribute('aria-hidden', 'true');
        c.style.cssText = `position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:${zIndex};${extra||''}`;
        el.insertBefore(c, el.firstChild);
      }

      addCanvas('planet-nebula',      0);
      addCanvas('planet-web',         1);
      if (!perf.isLow()) addCanvas('planet-terminator', 2);
      if (perf.isHigh()) addCanvas('planet-wormhole',   3, 'opacity:0.55;');
      if (perf.isHigh()) addCanvas('planet-blackhole',  4, 'opacity:0.8;');
      
    },

    _buildEntrance: function() {
      const el   = this._el;
      const perf = this._perf;
      const revs = Array.from(el.querySelectorAll('.reveal-up, .reveal-fade'));
      const cta  = el.querySelector('.planet-cta');

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

      if (revs.length) {
        tl.fromTo(revs,
          { opacity: 0, y: perf.isLow() ? 12 : 35 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 },
          perf.isLow() ? 0 : 0.35
        );
      }

      if (cta && !perf.isLow()) {
        tl.fromTo(cta,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)' },
          '-=0.2'
        );
      }

      this._entranceTl = tl;
    },

    enter: function() {
      if (this._entranceTl) this._entranceTl.play();
      if (this._stars)      this._stars.start();
      if (this._nebula)     this._nebula.start();
      if (this._cosmicWeb)  this._cosmicWeb.start();
      if (this._terminator) this._terminator.start();
      if (this._wormhole)   this._wormhole.start();
      if (this._blackHole)  this._blackHole.start();
      
    },

    leave: function() {
      if (this._entranceTl) this._entranceTl.pause();
      if (this._stars)      this._stars.stop();
      if (this._nebula)     this._nebula.stop();
      if (this._cosmicWeb)  this._cosmicWeb.stop();
      if (this._terminator) this._terminator.stop();
      if (this._wormhole)   this._wormhole.stop();
      if (this._blackHole)  this._blackHole.stop();
      
    },

    onPerfChange: function(mode) {
      if (mode === 'low') {
        ['_stars','_nebula','_cosmicWeb','_terminator','_wormhole','_blackHole'].forEach(k => {
          if (this[k]) { this[k].destroy(); this[k] = null; }
        });
      }
    },

    destroy: function() {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      ['_stars','_nebula','_cosmicWeb','_terminator','_wormhole','_blackHole'].forEach(k => {
        if (this[k]) { this[k].destroy(); this[k] = null; }
      });
    },
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (global.AnimationManager) global.AnimationManager.register('planet', PlanetAnimation);
  });

  global.PlanetAnimation = PlanetAnimation;

})(window);
