/* ================================================================
   oceanAnimation.js — Ocean Depths (Cinematic WebGL Edition)
   Registers with AnimationManager under id: 'ocean'
================================================================ */

;(function (global) {
  'use strict';

  /* ── Three.js Ocean System ───────────────────────────────────── */
  function OceanSystem(canvas, perf) {
    let W, H, rafId;
    let running = false;

    // Core Setup
    const scene = new THREE.Scene();
    // Soft, deep blue fog to blend the back of the trench into the darkness
    scene.fog = new THREE.FogExp2(0x020813, 0.06);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvas, 
      alpha: true, 
      antialias: perf.isHigh() 
    });
    renderer.toneMapping = THREE.ReinhardToneMapping;

    // Push the camera forward slightly so we are "inside" the water
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    /* ── 1. The Abyssal Trench (Procedural Seabed) ── */
    const trenchGroup = new THREE.Group();
    scene.add(trenchGroup);

    const seabedGeo = new THREE.PlaneGeometry(40, 40, 64, 64);
    
    // Mathematically deform the plane into a rigid, rocky rift
    const pos = seabedGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      
      // Perlin-style sine wave distortion for natural rock ridges
      let z = (Math.sin(x * 0.8) * Math.cos(y * 0.8)) * 1.5;
      
      // Carve a massive trench down the middle
      let distFromCenter = Math.abs(x);
      let trenchDepth = Math.max(0, 4 - distFromCenter) * 1.5;
      z -= trenchDepth; 
      
      pos.setZ(i, z);
    }
    seabedGeo.computeVertexNormals();

    // Dual-Material: Physical rock base + Glowing wireframe edges
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x011125,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true // Gives it that sharp, low-poly physical look
    });
    
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0055ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15, // Faint, bioluminescent outline on the rocks
      blending: THREE.AdditiveBlending
    });

    const seabedMesh = new THREE.Mesh(seabedGeo, rockMat);
    const seabedWire = new THREE.Mesh(seabedGeo, wireMat);
    
    // Rotate the plane so it lays flat at the bottom of the ocean
    seabedMesh.rotation.x = -Math.PI / 2;
    seabedMesh.position.y = -4;
    seabedWire.rotation.x = -Math.PI / 2;
    seabedWire.position.y = -3.98; // Slightly above to avoid z-fighting

    trenchGroup.add(seabedMesh);
    trenchGroup.add(seabedWire);

    /* ── 2. Volumetric God-Rays ── */
    const rayGroup = new THREE.Group();
    scene.add(rayGroup);

    // Creates translucent cones of light slicing through the water
    const rayGeo = new THREE.CylinderGeometry(0.1, 4, 20, 32, 1, true);
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.03, // Extremely faint, let the Bloom pass handle the glow
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    // Spawn multiple overlapping rays at dramatic angles
    for (let i = 0; i < 5; i++) {
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set((Math.random() - 0.5) * 15, 5, (Math.random() - 0.5) * 10);
      ray.rotation.z = Math.PI / 6 + (Math.random() * 0.2); // Angle them down-right
      ray.rotation.x = (Math.random() - 0.5) * 0.5;
      rayGroup.add(ray);
    }

    /* ── 3. Bioluminescent Plankton Swarm ── */
    const swarmCount = perf.isHigh() ? 1500 : 500;
    const swarmGeo = new THREE.BufferGeometry();
    const swarmPos = new Float32Array(swarmCount * 3);
    const swarmPhase = new Float32Array(swarmCount);

    for (let i = 0; i < swarmCount; i++) {
      swarmPos[i * 3] = (Math.random() - 0.5) * 30;     // x
      swarmPos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      swarmPos[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
      swarmPhase[i] = Math.random() * Math.PI * 2;
    }

    swarmGeo.setAttribute('position', new THREE.BufferAttribute(swarmPos, 3));
    swarmGeo.setAttribute('phase', new THREE.BufferAttribute(swarmPhase, 1));

    const swarmMat = new THREE.PointsMaterial({
      color: 0x00ffcc, // Cyan bioluminescence
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const swarm = new THREE.Points(swarmGeo, swarmMat);
    scene.add(swarm);

    /* ── Lighting ── */
    const ambientLight = new THREE.AmbientLight(0x021533, 2.0);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x4fc3f7, 3.0);
    directionalLight.position.set(-10, 15, 5);
    scene.add(directionalLight);

    /* ── Post-Processing Pipeline (The Halo Glow) ── */
    let composer;
    if (perf.isHigh() && typeof THREE.EffectComposer !== 'undefined') {
      composer = new THREE.EffectComposer(renderer);
      
      const renderPass = new THREE.RenderPass(scene, camera);
      composer.addPass(renderPass);
      
      const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,  // Bloom Strength
        0.4,  // Bloom Radius 
        0.8   // Bloom Threshold
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

      // 1. Move the camera slowly over the trench
      trenchGroup.position.z += 0.002 * dt;
      if (trenchGroup.position.z > 10) trenchGroup.position.z = 0;

      // 2. Pulse and shift the God-Rays
      rayGroup.children.forEach((ray, index) => {
        ray.rotation.y += 0.0001 * dt * (index % 2 === 0 ? 1 : -1);
      });

      // 3. Animate the Plankton Swarm
      const positions = swarmGeo.attributes.position.array;
      for (let i = 0; i < swarmCount; i++) {
        positions[i * 3 + 1] += 0.001 * dt;
        swarmPhase[i] += 0.002 * dt;
        positions[i * 3] += Math.sin(swarmPhase[i]) * 0.002 * dt;

        if (positions[i * 3 + 1] > 10) {
          positions[i * 3 + 1] = -10;
        }
      }
      swarmGeo.attributes.position.needsUpdate = true;

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
        seabedGeo.dispose();
        rockMat.dispose();
        wireMat.dispose();
        rayGeo.dispose();
        rayMat.dispose();
        swarmGeo.dispose();
        swarmMat.dispose();
        renderer.dispose();
      }
    };
  }

  /* ── Module ─────────────────────────────────────────────────── */
  const OceanAnimation = {
    _el: null,
    _entranceTl: null,
    _oceanSys: null,

    init: function (el, perf) {
      this._el = el;
      this._buildEntrance();

      if (!perf.isLow()) {
        const bg = el.querySelector('.parallax-bg');
        if (bg) {
          gsap.to(bg, {
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            }
          });
        }
      }

      const canvas = el.querySelector('#ocean-canvas');
      if (canvas && typeof THREE !== 'undefined') {
        this._oceanSys = OceanSystem(canvas, perf);
      }
    },

    _buildEntrance: function () {
      const el = this._el;
      const perf = global.PERF;
      const revs = Array.from(el.querySelectorAll('.reveal-up, .reveal-fade'));

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

      if (revs.length) {
        tl.fromTo(revs,
          { opacity: 0, y: perf.isLow() ? 10 : 35 },
          { opacity: 1, y: 0, duration: perf.isLow() ? 0.5 : 0.75, stagger: 0.12 },
          0
        );
      }

      this._entranceTl = tl;
    },

    enter: function () {
      if (this._entranceTl) this._entranceTl.play();
      if (this._oceanSys) this._oceanSys.start();
    },

    leave: function () {
      if (this._entranceTl) this._entranceTl.pause();
      if (this._oceanSys) this._oceanSys.stop();
    },

    onPerfChange: function (mode) {
      if (mode === 'low' && this._oceanSys) {
        this._oceanSys.destroy();
        this._oceanSys = null;
      }
    },

    destroy: function () {
      if (this._entranceTl) { this._entranceTl.kill(); this._entranceTl = null; }
      if (this._oceanSys) { this._oceanSys.destroy(); this._oceanSys = null; }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (global.AnimationManager) {
      global.AnimationManager.register('ocean', OceanAnimation);
    }
  });

})(window);