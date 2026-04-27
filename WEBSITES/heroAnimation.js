/* ================================================================
   heroAnimation.js — Introduction & Background Planet Sequence
   Registers with AnimationManager under id: 'hero'
================================================================ */
;(function (global) {
  'use strict';

  /* ── Meteor Particle System (rAF) ───────────────────────────── */
  function HeroParticles(canvas, count) {
    const ctx = canvas.getContext('2d');
    let W, H, rafId, running = false;
    const raf = requestAnimationFrame.bind(window);
    const caf = cancelAnimationFrame.bind(window);

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const meteors = Array.from({ length: Math.floor(count / 3) }, () => spawnMeteor());

    function spawnMeteor() {
      return {
        x: Math.random() * W * 1.5,
        y: Math.random() * H * -1,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        thickness: Math.random() * 1.5 + 0.5
      };
    }

    let last = performance.now();

    function loop(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      ctx.clearRect(0, 0, W, H);
      
      const angle = Math.PI / 4; 
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      meteors.forEach((m, index) => {
        m.x -= m.speed * dt * cosA;
        m.y += m.speed * dt * sinA;

        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          m.x, m.y, 
          m.x + m.length * cosA, m.y - m.length * sinA
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = 'round';
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.length * cosA, m.y - m.length * sinA);
        ctx.stroke();

        if (m.x < -m.length || m.y > H + m.length) {
          meteors[index] = spawnMeteor();
        }
      });

      rafId = raf(loop);
    }

    return {
      start: function () {
        if (!running) {
          running = true;
          last = performance.now();
          rafId = raf(loop);
        }
      },
      stop: function () {
        running = false;
        caf(rafId);
      },
      destroy: function () {
        this.stop();
        window.removeEventListener('resize', resize);
      }
    };
  }
  
  /* ── Three.js Moon System (Cinematic Bloom Pipeline) ────────── */
  function MoonSystem(canvas, perf) {
    let W, H, rafId;
    let running = false;

    const scene = new THREE.Scene();
    
    // Core Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvas, 
      alpha: true, 
      antialias: perf.isHigh()
    });
    // Critical for realistic glow scaling
    renderer.toneMapping = THREE.ReinhardToneMapping;
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;

    // --- 1. The Moon ---
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg');
    
    const material = new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture, 
      bumpScale: 0.015,     
      roughness: 1.0,       
      metalness: 0.0
    });
    
    const moon = new THREE.Mesh(geometry, material);
    moon.rotation.x = 0.2; 
    scene.add(moon);
    
    // ==========================================
    // INJECT THIS HALO CODE RIGHT HERE
    // ==========================================
    const haloGeo = new THREE.SphereGeometry(1.08, 64, 64); // Slightly larger than the moon
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xaa88ff, // Romantic violet tint to match the nebula
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending, // Forces light to compound and glow
      side: THREE.BackSide, // Renders on the inside for a soft atmospheric edge
      depthWrite: false // Prevents weird clipping with the satellite
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);
    // ==========================================

    // --- 2. The Satellite ---
    const orbitPivot = new THREE.Group();
    scene.add(orbitPivot);

    const satellite = new THREE.Group();
    
    const coreGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 8);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 });
    const satCore = new THREE.Mesh(coreGeo, coreMat);
    satellite.add(satCore);

    const panelGeo = new THREE.BoxGeometry(0.12, 0.03, 0.002);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x113388, metalness: 0.9, roughness: 0.1 });
    
    const panelRight = new THREE.Mesh(panelGeo, panelMat);
    panelRight.position.x = 0.08;
    satellite.add(panelRight);
    
    const panelLeft = new THREE.Mesh(panelGeo, panelMat);
    panelLeft.position.x = -0.08;
    satellite.add(panelLeft);

    // Beacon Light (Will glow brightly due to the Bloom Pass)
    const beacon = new THREE.PointLight(0xff3333, 1, 1.5);
    beacon.position.set(0, 0.04, 0);
    satellite.add(beacon);

    satellite.position.set(1.4, 0, 0); 
    satellite.rotation.x = Math.PI / 4;
    satellite.rotation.z = Math.PI / 6;

    orbitPivot.add(satellite);
    orbitPivot.rotation.z = 0.2;
    orbitPivot.rotation.x = 0.1;

    // --- 3. Lighting ---
    const directionalLight = new THREE.DirectionalLight(0xffe6f2, 1.6); 
    directionalLight.position.set(-5, 1, 3); 
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x1a1129, 0.6);
    scene.add(ambientLight);

    // --- 4. Post-Processing Pipeline (The Halo Glow) ---
    // Only apply heavy post-processing on high-end devices to save frames
    let composer;
    if (perf.isHigh() && typeof THREE.EffectComposer !== 'undefined') {
      composer = new THREE.EffectComposer(renderer);
      
      const renderPass = new THREE.RenderPass(scene, camera);
      composer.addPass(renderPass);
      
      const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.2,  // Bloom Strength
        0.5,  // Bloom Radius 
        0.65  // Bloom Threshold (Only brightest spots glow)
      );
      composer.addPass(bloomPass);
    }

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      if (composer) composer.setSize(W, H);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastTime = performance.now();

    function loop(now) {
      if (!running) return;
      
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      moon.rotation.y += 0.00005 * dt;
      orbitPivot.rotation.y += 0.001 * dt;
      beacon.intensity = (Math.sin(now * 0.003) * 0.5) + 0.5;

      // Use composer if available, fallback to standard renderer
      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
      
      rafId = requestAnimationFrame(loop);
    }

    return {
      start: function () {
        if (!running) {
          running = true;
          lastTime = performance.now();
          rafId = requestAnimationFrame(loop);
        }
      },
      stop: function () {
        running = false;
        cancelAnimationFrame(rafId);
      },
      destroy: function () {
        this.stop();
        window.removeEventListener('resize', resize);
        geometry.dispose();
        material.dispose();
        moonTexture.dispose();
        renderer.dispose();
      }
    };
  }

  /* ── Module ─────────────────────────────────────────────────── */
  const HeroAnimation = {
    _el: null,
    _entranceTl: null,
    _particles: null,
    _moon: null,

    init: function (el, perf) {
      this._el = el;
      this._buildEntrance();

      if (!perf.isLow()) {
        const bg = el.querySelector('.parallax-bg');
        if (bg) {
          gsap.to(bg, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: el, start: 'top top', end: 'bottom top', scrub: true,
            }
          });
        }
      }

      const moonCanvas = el.querySelector('#moon-canvas');
      if (moonCanvas && typeof THREE !== 'undefined') {
        this._moon = MoonSystem(moonCanvas, perf);
      }

      if (perf.isHigh()) {
        const pCanvas = el.querySelector('#hero-particles');
        if (pCanvas) {
          this._particles = HeroParticles(pCanvas, 80);
        }
      }
    },

    _buildEntrance: function () {
      const el = this._el;
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      const eyebrow = el.querySelector('.hero__eyebrow');
      const lines = el.querySelectorAll('.hero__title-line');
      const sub = el.querySelector('.hero__subtitle');
      const cue = el.querySelector('.hero__scroll-cue');
      const moonCanvas = el.querySelector('#moon-canvas');

      if (moonCanvas) tl.fromTo(moonCanvas, { opacity: 0 }, { opacity: 1, duration: 2.5, ease: 'power2.out' }, 0);
      
      if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0);
      if (lines.length) tl.fromTo(lines, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.2);
      if (sub) tl.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.6);
      if (cue) tl.fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.8);

      this._entranceTl = tl;
    },

    enter: function () {
      if (this._entranceTl) this._entranceTl.play();
      if (this._particles) this._particles.start();
      if (this._moon) this._moon.start();
    },

    leave: function () {
      if (this._particles) this._particles.stop();
      if (this._moon) this._moon.stop();
    },

    onPerfChange: function (mode) {
      if (mode !== 'high' && this._particles) {
        this._particles.destroy();
        this._particles = null;
      }
    },

    destroy: function () {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      if (this._particles) { this._particles.destroy(); this._particles = null; }
      if (this._moon) { this._moon.destroy(); this._moon = null; }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) {
      global.AnimationManager.register('hero', HeroAnimation);
    }
  });

})(window);