/* ================================================================
   desertAnimation.js — Desert Expanse
   C: Heat Shimmer Mirages (WebGL)
   D: Dune Ripple Wave (Canvas 2D)
   E: Dust Devil Vortex (Canvas 2D)
================================================================ */

;(function (global) {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     D + E — Dune Ripple Wave & Dust Devil Vortex (single Canvas 2D)
  ══════════════════════════════════════════════════════════════ */
  function DuneAndDevilSystem(canvas, perf) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    let last = performance.now();

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* ── D: Dune ridges ── */
    const duneCount = perf.isHigh() ? 6 : 3;
    const dunes = Array.from({ length: duneCount }, (_, i) => ({
  yBase:  0.62 + (i / duneCount) * 0.36,
  phase:  (i / duneCount) * Math.PI * 2,
  speed:  0.00012 + i * 0.00004,
  amp:    14 + i * 6,
  freq:   0.008 - i * 0.001,
  colorTop:    `rgba(${190 + i*6}, ${145 + i*5}, ${80 + i*4}, 0.28)`,
  colorBottom: `rgba(${155 + i*5}, ${110 + i*4}, ${45 + i*3}, 0.45)`,
}));

    /* ── E: Dust devils ── */
    const MAX_DEVILS = perf.isHigh() ? 3 : 1;

    function spawnDevil() {
      return {
        x:       Math.random() * W,
        y:       H,                       // starts at ground
        life:    0,
        maxLife: 180 + Math.random() * 120,
        speed:   0.3 + Math.random() * 0.4,
        twist:   (Math.random() > 0.5 ? 1 : -1),
        baseR:   8  + Math.random() * 10,
        height:  120 + Math.random() * 100,
        drift:   (Math.random() - 0.5) * 0.4,
      };
    }

    let devils = [spawnDevil()];

    function drawDevil(d, dt) {
      d.life += 1;
      d.x    += d.drift * dt * 0.05;
      d.y     = H - (d.life / d.maxLife) * d.height * 0.3; // rises slightly

      const progress  = d.life / d.maxLife;
      const alpha     = progress < 0.15
        ? progress / 0.15                  // fade in
        : progress > 0.75
          ? 1 - (progress - 0.75) / 0.25  // fade out
          : 1;

      const segments = perf.isHigh() ? 30 : 15;

      for (let s = 0; s < segments; s++) {
        const t      = s / segments;
        const ySeg   = d.y - t * d.height;
        const radius = d.baseR * (1 - t * 0.7) * (1 + Math.sin(t * Math.PI));
        const angle  = (performance.now() * 0.003 * d.twist) + t * Math.PI * 4;
        const xOff   = Math.cos(angle) * radius;

        const segAlpha = alpha * (1 - t) * 0.18;
        ctx.strokeStyle = `rgba(210, 170, 100, ${segAlpha})`;
        ctx.lineWidth   = radius * 0.6;
        ctx.beginPath();
        ctx.moveTo(d.x + xOff,  ySeg);
        ctx.lineTo(d.x - xOff,  ySeg - d.height / segments);
        ctx.stroke();
      }

      return d.life < d.maxLife;
    }

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, W, H);

      /* ── Draw dune ridges ── */
      dunes.forEach(function (d) {
        d.phase += d.speed * dt;
        const yPx = d.yBase * H;

        ctx.beginPath();
        ctx.moveTo(0, H);

        for (let x = 0; x <= W; x += 4) {
          const y = yPx + Math.sin(x * d.freq + d.phase) * d.amp
                        + Math.sin(x * d.freq * 2.3 - d.phase * 0.7) * (d.amp * 0.4);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(W, H);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yPx - d.amp, 0, H);
        grad.addColorStop(0, d.colorTop);
        grad.addColorStop(1, d.colorBottom);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      /* ── Draw dust devils ── */
      ctx.lineCap = 'round';
      devils = devils.filter(d => drawDevil(d, dt));

      /* Spawn new devils randomly */
      if (devils.length < MAX_DEVILS && Math.random() < 0.004) {
        devils.push(spawnDevil());
      }
      if (devils.length === 0) devils.push(spawnDevil());

      rafId = requestAnimationFrame(loop);
    }

    return {
      start:   () => { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    () => { running = false; cancelAnimationFrame(rafId); },
      destroy: () => { running = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); },
    };
  }

  /* ══════════════════════════════════════════════════════════════
     C — Heat Shimmer Mirages (Three.js)
     Ghostly camel + snake silhouettes shimmer and dissolve
  ══════════════════════════════════════════════════════════════ */
  function MirageSystem(canvas, perf) {
    let W, H, rafId, running = false;
    let last = performance.now();
    let enterTime = null;   // set on start() — mirages fade in after 3s

    const scene    = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.LinearToneMapping;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.2, 10);
    camera.lookAt(0, 0.5, 0);

    /* Shared mirage material — ShaderMaterial for displacement wobble */
    const mirageMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite:  false,
      blending:    THREE.NormalBlending,
      uniforms: {
        uTime:    { value: 0 },
        uAlpha:   { value: 0 },
        uColor:   { value: new THREE.Color(0xe8c97a) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2  vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          /* Heat shimmer — horizontal wobble that increases toward the top */
          float heat = sin(pos.y * 4.0 + uTime * 3.0) * 0.04 * pos.y;
          pos.x += heat;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uAlpha;
        uniform vec3  uColor;
        varying vec2  vUv;
        void main() {
          /* Silhouette: fully opaque center, soft edge fade */
          float edge  = smoothstep(0.0, 0.12, vUv.x)
                      * smoothstep(1.0, 0.88, vUv.x)
                      * smoothstep(0.0, 0.08, vUv.y)
                      * smoothstep(1.0, 0.92, vUv.y);
          /* Dissolve noise — vertical bands that flicker */
          float flicker = sin(vUv.y * 18.0 + uAlpha * 6.0) * 0.5 + 0.5;
          float a = edge * uAlpha * mix(0.55, 1.0, flicker);
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });

    /* ── Camel silhouette (simple low-poly shape from boxes) ── */
    function buildCamel() {
  const shape = new THREE.Shape();
  // Body
  shape.moveTo(-0.7, 0);
  shape.bezierCurveTo(-0.7, 0.4, 0.7, 0.4, 0.7, 0);
  // Hump
  shape.bezierCurveTo(0.7, 0.35, 0.15, 0.35, 0.1, 0.7);
  shape.bezierCurveTo(0.05, 0.95, -0.05, 0.95, -0.1, 0.7);
  shape.bezierCurveTo(-0.15, 0.35, -0.7, 0.35, -0.7, 0);
  // Legs
  shape.moveTo(-0.5, 0);   shape.lineTo(-0.5, -0.5);
  shape.moveTo(-0.25, 0);  shape.lineTo(-0.25, -0.5);
  shape.moveTo(0.25, 0);   shape.lineTo(0.25, -0.5);
  shape.moveTo(0.5, 0);    shape.lineTo(0.5, -0.5);
  // Neck + head
  shape.moveTo(-0.7, 0.3);
  shape.bezierCurveTo(-0.9, 0.5, -1.0, 0.8, -0.95, 1.0);
  shape.bezierCurveTo(-0.9, 1.2, -0.75, 1.2, -0.7, 1.0);
  shape.bezierCurveTo(-0.65, 0.8, -0.6, 0.5, -0.7, 0.3);

  const geo  = new THREE.ShapeGeometry(shape);
  const mesh = new THREE.Mesh(geo, mirageMat.clone());
  return mesh;
}
function buildSnake() {
  const shape = new THREE.Shape();
  const pts   = 40;
  // Draw snake as a thick sine-wave ribbon using Shape
  shape.moveTo(-1.4, -0.06);
  for (let i = 0; i <= pts; i++) {
    const t = i / pts;
    const x = -1.4 + t * 2.8;
    const y = Math.sin(t * Math.PI * 2.5) * 0.22 + 0.06;
    if (i === 0) shape.moveTo(x, y - 0.06);
    else shape.lineTo(x, y - 0.06);
  }
  for (let i = pts; i >= 0; i--) {
    const t = i / pts;
    const x = -1.4 + t * 2.8;
    const y = Math.sin(t * Math.PI * 2.5) * 0.22 - 0.06;
    shape.lineTo(x, y - 0.06);
  }
  shape.closePath();

  // Head
  const head = new THREE.Shape();
  head.absellipse(1.4, Math.sin(Math.PI * 2.5) * 0.22, 0.12, 0.08, 0, Math.PI * 2);

  const geo  = new THREE.ShapeGeometry([shape, head]);
  const mesh = new THREE.Mesh(geo, mirageMat.clone());
  return mesh;
}

    const camel = buildCamel();
    camel.position.set(-3, 0, 0);
    camel.scale.setScalar(0.55);
    scene.add(camel);

    const snake = buildSnake();
    snake.position.set(3.5, 0.1, 1);
    snake.scale.setScalar(0.7);
    scene.add(snake);

    /* Ambient only — silhouettes don't need directional light */
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
      const dt      = Math.min(now - last, 50);
      last = now;

      const elapsed = (now - enterTime) / 1000;   // seconds since enter()

      /* Fade in after 3 s, full alpha by 5 s, then pulse */
      const fadeIn  = Math.min(Math.max((elapsed - 3) / 2, 0), 1);
      /* Slow pulse: bob between 0.3 and 1.0 */
      const pulse   = fadeIn * (0.65 + Math.sin(now * 0.0008) * 0.35);

      /* Update all mirage material uniforms */
      scene.traverse(obj => {
        if (obj.isMesh && obj.material.uniforms) {
          obj.material.uniforms.uTime.value  = now * 0.001;
          obj.material.uniforms.uAlpha.value = pulse;
        }
      });

      /* Slow camel drift right — wraps */
      camel.position.x += 0.0003 * dt;
      if (camel.position.x > 6) camel.position.x = -6;

      /* Snake subtle slither oscillation */
      snake.position.y = 0.1 + Math.sin(now * 0.0005) * 0.08;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    }

    return {
      start: () => {
        if (!running) {
          running   = true;
          enterTime = performance.now();
          last      = enterTime;
          rafId     = requestAnimationFrame(loop);
        }
      },
      stop:    () => { running = false; cancelAnimationFrame(rafId); },
      destroy: () => {
        running = false;
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        renderer.dispose();
      },
    };
  }

  /* ══════════════════════════════════════════════════════════════
     Original Sand System (keep as-is)
  ══════════════════════════════════════════════════════════════ */
  function SandSystem(canvas, count) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const grains = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.0 + 0.4,
      speed: Math.random() * 0.00025 + 0.00008,
      alpha: Math.random() * 0.22 + 0.04,
      phase: Math.random() * Math.PI * 2,
    }));
    let last = performance.now();
    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50); last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#c8a96e';
      grains.forEach(g => {
        g.x += g.speed * dt; if (g.x > 1.02) g.x = -0.02;
        g.phase += 0.0005 * dt;
        ctx.globalAlpha = g.alpha;
        ctx.beginPath(); ctx.arc(g.x * W, (g.y + Math.sin(g.phase) * 0.008) * H, g.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(loop);
    }
    return {
      start:   () => { if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); } },
      stop:    () => { running = false; cancelAnimationFrame(rafId); },
      destroy: () => { running = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); },
    };
  }

  /* ══════════════════════════════════════════════════════════════
     Module
  ══════════════════════════════════════════════════════════════ */
  const DesertAnimation = {
    _el: null, _perf: null,
    _entranceTl: null,
    _sand: null, _dune: null, _mirage: null,

    init: function (el, perf) {
      this._el = el; this._perf = perf;
      this._buildEntrance();

      /* Sand */
      if (!perf.isLow()) {
        const sc = el.querySelector('.sand-canvas');
        if (sc) this._sand = SandSystem(sc, perf.isHigh() ? 120 : 50);
      }

      /* Dune + Dust Devils */
      if (!perf.isLow()) {
        const c2d = el.querySelector('#desert-2d');
        if (c2d) this._dune = DuneAndDevilSystem(c2d, perf);
      }

      /* Heat Mirages — WebGL */
      if (perf.isHigh()) {
        const cgl = el.querySelector('#desert-webgl');
        if (cgl && typeof THREE !== 'undefined') this._mirage = MirageSystem(cgl, perf);
      }

      /* Parallax */
      if (!perf.isLow()) {
        const bg = el.querySelector('.parallax-bg');
        if (bg) gsap.to(bg, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.8 } });
      }
    },

    _buildEntrance: function () {
      const el = this._el, perf = this._perf;
      const revs  = Array.from(el.querySelectorAll('.reveal-up, .reveal-fade'));
      const chips = Array.from(el.querySelectorAll('.animal-chip'));
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
      if (revs.length)  tl.fromTo(revs,  { opacity: 0, y: perf.isLow() ? 10 : 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0);
      if (chips.length && !perf.isLow()) tl.fromTo(chips, { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: 'back.out(1.4)' }, 0.25);
      this._entranceTl = tl;
    },

    enter: function () {
      if (this._entranceTl) this._entranceTl.play();
      if (this._sand)       this._sand.start();
      if (this._dune)       this._dune.start();
      if (this._mirage)     this._mirage.start();   // 3s delay is internal
    },

    leave: function () {
      if (this._entranceTl) this._entranceTl.pause();
      if (this._sand)       this._sand.stop();
      if (this._dune)       this._dune.stop();
      if (this._mirage)     this._mirage.stop();
    },

    onPerfChange: function (mode) {
      if (mode === 'low') {
        if (this._sand)   { this._sand.destroy();   this._sand   = null; }
        if (this._dune)   { this._dune.destroy();   this._dune   = null; }
        if (this._mirage) { this._mirage.destroy(); this._mirage = null; }
      }
    },

    destroy: function () {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      if (this._sand)       { this._sand.destroy();    this._sand   = null; }
      if (this._dune)       { this._dune.destroy();    this._dune   = null; }
      if (this._mirage)     { this._mirage.destroy();  this._mirage = null; }
    },
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) global.AnimationManager.register('desert', DesertAnimation);
  });

  global.DesertAnimation = DesertAnimation;

})(window);
