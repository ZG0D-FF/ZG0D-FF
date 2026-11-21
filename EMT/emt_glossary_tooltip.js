/**
 * ═══════════════════════════════════════════════════════════════════
 * Apple-Calmness Global EMT Glossary & Hover Tooltip Engine
 * Supports automatic term recognition, MathJax compatibility,
 * mobile touch tap-to-inspect, and desktop hover with canonical links.
 * ═══════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  const EMT_GLOSSARY = {
    'R': {
      symbol: 'R',
      name: 'Resistance / Series AC Resistance',
      unit: 'Ω/m',
      category: 'Primary Distributed Parameter',
      meaning: 'Ohmic resistance per unit length of both forward and return conductors. Due to the skin effect at high frequencies, current is squeezed into a thin surface layer δ, causing R to rise proportionally to √f.',
      why: 'Dissipates signal power as resistive I²R heat, contributing directly to line attenuation constant α.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'L': {
      symbol: 'L',
      name: 'Inductance / Series Loop Inductance',
      unit: 'H/m',
      category: 'Primary Distributed Parameter',
      meaning: 'Total external magnetic flux linkage per unit length set up by currents flowing through the conductor loop.',
      why: 'Stores energy in the transverse magnetic field. Combined with C, it fixes the characteristic impedance Z₀ = √(L/C) and phase velocity u = 1/√(LC).',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'G': {
      symbol: 'G',
      name: 'Conductance / Shunt Leakage Conductance',
      unit: 'S/m',
      category: 'Primary Distributed Parameter',
      meaning: 'Transverse dielectric conduction per unit length between the two conductors. G is NOT 1/R; it measures leakage current through imperfect dielectric (σ > 0).',
      why: 'Causes dielectric power loss (V²G) along the line, especially noticeable at gigahertz frequencies where dielectric tan δ rises.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'C': {
      symbol: 'C',
      name: 'Capacitance / Shunt Capacitance',
      unit: 'F/m',
      category: 'Primary Distributed Parameter',
      meaning: 'Electrostatic charge storage per unit length between conductors separated by dielectric permittivity ε.',
      why: 'Supplies transverse displacement current (∂V/∂t). Higher capacitance slows down wave velocity (u = 1/√(LC)) and lowers impedance Z₀.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'KVL': {
      symbol: 'KVL',
      name: "Kirchhoff's Voltage Law",
      unit: 'Conservation of Energy (V)',
      category: 'Circuit Fundamental',
      meaning: 'The directed sum of electrical potential differences around any closed circuit loop is zero (Σ V = 0). On a transmission line of differential length Δz, KVL yields the First Telegrapher Equation: -∂V/∂z = R I + L ∂I/∂t.',
      why: 'Valid locally when loop dimension Δz << λ, enabling the uncoupling of wave equations into one-dimensional Helmholtz equations.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'KCL': {
      symbol: 'KCL',
      name: "Kirchhoff's Current Law",
      unit: 'Conservation of Charge (A)',
      category: 'Circuit Fundamental',
      meaning: 'The algebraic sum of currents entering and leaving any circuit node is zero (Σ I = 0). Applied to the differential shunt node across Δz, KCL yields the Second Telegrapher Equation: -∂I/∂z = G V + C ∂V/∂t.',
      why: 'Accounts for transverse leakage and displacement current, governing spatial rate of current variation.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'Z0': {
      symbol: 'Z₀',
      name: 'Characteristic Impedance',
      unit: 'Ω',
      category: 'Wave Constant',
      meaning: 'The intrinsic voltage-to-current ratio (V⁺/I⁺) of a single forward traveling wave. It is independent of line length and load termination!',
      why: 'The benchmark for impedance matching. Terminating a line with Z_L = Z₀ absorbs 100% of wave energy with zero reflected echo.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'gamma': {
      symbol: 'γ',
      name: 'Complex Propagation Constant',
      unit: 'm⁻¹',
      category: 'Wave Constant',
      meaning: 'γ = α + jβ = √((R + jωL)(G + jωC)). The complex parameter that governs both exponential decay (α) and phase progression (β) along the transmission axis.',
      why: 'Allows solving all wave equations via e^(-γz) without cumbersome trigonometric systems.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'alpha': {
      symbol: 'α',
      name: 'Attenuation Constant',
      unit: 'Np/m (or dB/m)',
      category: 'Loss Parameter',
      meaning: 'The spatial rate at which wave amplitude decays exponentially: V(z) ∝ e^(-αz). 1 Np/m ≈ 8.686 dB/m.',
      why: 'Determines the maximum link distance of cables before repeaters or amplifiers become strictly mandatory.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-lossless-distort'
    },
    'beta': {
      symbol: 'β',
      name: 'Phase Constant (Spatial Frequency)',
      unit: 'rad/m',
      category: 'Propagation Parameter',
      meaning: 'Spatial phase shift per meter: β = 2π/λ = ω/u. Quantifies how rapidly the sinusoid oscillates along the length of the line.',
      why: 'Directly dictates electrical length βℓ. When βℓ ≥ 18° (ℓ ≥ λ/20), ordinary lumped circuit theory collapses.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-telegrapher'
    },
    'Gamma_L': {
      symbol: 'Γ_L',
      name: 'Voltage Reflection Coefficient',
      unit: 'Dimensionless (Complex)',
      category: 'Boundary Parameter',
      meaning: 'Γ_L = (Z_L - Z₀) / (Z_L + Z₀). Ratio of reflected voltage amplitude to incident voltage amplitude at the load terminal.',
      why: 'Measures degree of mismatch. |Γ_L| = 0 means perfect transmission; |Γ_L| = 1 means 100% total reflection (short/open/reactive).',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-input-impedance'
    },
    'VSWR': {
      symbol: 's (VSWR)',
      name: 'Voltage Standing Wave Ratio',
      unit: 'Ratio (:1)',
      category: 'Metrology Metric',
      meaning: 's = V_max / V_min = (1 + |Γ_L|) / (1 - |Γ_L|). The ratio of maximum standing wave envelope peak to minimum trough.',
      why: 'Easily measured with slotted lines or directional couplers. Critical RF safety metric: VSWR > 2.0 risks frying RF power transistors due to reflected voltage stress.',
      canonical: 'sadiku_chapter11_transmission_lines_smith_chart_master.html#section-input-impedance'
    },
    'delta': {
      symbol: 'δ',
      name: 'Skin Depth',
      unit: 'm (or μm)',
      category: 'Electrodynamics',
      meaning: 'δ = 1 / √(π f μ σ). Depth beneath the conductor surface at which high-frequency current density drops to 1/e ≈ 36.8% of its surface intensity.',
      why: 'Explains why hollow tubes conduct RF as efficiently as solid metal rods, saving tons of antenna weight and material.',
      canonical: 'emt_assignment_master_notes.html#mod1-problem7-eddy'
    },
    'fc': {
      symbol: 'f_c',
      name: 'Cutoff Frequency',
      unit: 'Hz (GHz)',
      category: 'Waveguide Physics',
      meaning: 'The critical frequency threshold f_c = (c/2)√((m/a)² + (n/b)²). Frequencies below f_c cannot propagate and decay evanescently as pure reactive attenuators.',
      why: 'Acts as a natural high-pass spatial filter, setting the operating bandwidth of rectangular and circular waveguides.',
      canonical: 'sadiku_chapter12_waveguides_master.html#section-cutoff-frequencies'
    },
    'TEM': {
      symbol: 'TEM',
      name: 'Transverse Electromagnetic Mode',
      unit: 'Mode Family',
      category: 'Modal Electromagnetics',
      meaning: 'Both electric and magnetic fields are strictly perpendicular to direction of wave propagation (E_z = 0, H_z = 0).',
      why: 'Standard mode for two-conductor lines (coax, twin-lead). Physically forbidden in hollow single-conductor pipes because walls form a single closed equipotential contour.',
      canonical: 'sadiku_chapter12_waveguides_master.html#section-te-modes'
    },
    'TE10': {
      symbol: 'TE₁₀',
      name: 'Dominant Waveguide Mode',
      unit: 'Mode Designation',
      category: 'Modal Electromagnetics',
      meaning: 'Lowest cutoff frequency mode in rectangular guide (f_c = c/2a). E-field is pure vertical transverse across broad wall a with zero longitudinal component (E_z = 0).',
      why: 'Single-mode propagation standard: operating between f_c(TE₁₀) and the next higher mode prevents inter-modal dispersion.',
      canonical: 'sadiku_chapter12_waveguides_master.html#section-te-modes'
    },
    'up': {
      symbol: 'u_p',
      name: 'Phase Velocity',
      unit: 'm/s',
      category: 'Kinematics',
      meaning: 'u_p = ω/β = c / √(1 - (f_c/f)²). The speed at which constant phase crests advance along the guide.',
      why: 'In waveguides, u_p > c (superluminal), but this carries zero information, perfectly respecting Special Relativity because u_p · u_g = c².',
      canonical: 'sadiku_chapter12_waveguides_master.html#section-dispersion-velocities'
    },
    'ug': {
      symbol: 'u_g',
      name: 'Group Velocity',
      unit: 'm/s',
      category: 'Kinematics',
      meaning: 'u_g = dω/dβ = c √(1 - (f_c/f)²). The physical speed at which electromagnetic energy and modulation information propagate down the structure.',
      why: 'Always subluminal (u_g < c), dropping to zero at cutoff frequency where wave bounces purely normal to walls.',
      canonical: 'sadiku_chapter12_waveguides_master.html#section-dispersion-velocities'
    },
    'eta': {
      symbol: 'η',
      name: 'Wave Impedance',
      unit: 'Ω',
      category: 'Field Ratio',
      meaning: 'Ratio of transverse electric field to transverse magnetic field (E_t / H_t). In free space, η₀ = √(μ₀/ε₀) ≈ 120π ≈ 377 Ω.',
      why: 'Governs reflection and transmission when waves transition across dielectric boundaries or into waveguide apertures.',
      canonical: 'sadiku_chapter12_waveguides_master.html#section-power-transmission'
    },
    'lambda_g': {
      symbol: 'λ_g',
      name: 'Guide Wavelength',
      unit: 'm (or cm)',
      category: 'Waveguide Parameter',
      meaning: 'λ_g = 2π / β = λ₀ / √(1 - (f_c/f)²). The longitudinal distance between two successive equal-phase wavefronts inside the metallic waveguide.',
      why: 'Always longer than free-space wavelength (λ_g > λ₀) because transverse boundary walls consume part of the total wavenumber (k² = k_c² + β²).',
      canonical: 'sadiku_chapter12_waveguides_master.html#section-dispersion-velocities'
    },
    'kc': {
      symbol: 'k_c',
      name: 'Transverse Cutoff Wavenumber',
      unit: 'rad/m',
      category: 'Modal Parameter',
      meaning: 'k_c² = (mπ/a)² + (nπ/b)². The spatial variation wavenumber required across the transverse cross-section to satisfy conducting wall boundaries.',
      why: 'Acts as the wavenumber tax: propagation only occurs when medium wavenumber k = ω√(με) exceeds k_c, leaving real β = √(k² - k_c²).',
      canonical: 'sadiku_chapter12_waveguides_master.html#section-cutoff-frequencies'
    },
    'D': {
      symbol: 'D',
      name: 'Electric Flux Density',
      unit: 'C/m²',
      category: 'Maxwell Field',
      meaning: 'D = ε E. Represents the density of electric flux originating from free charges, independent of dielectric polarization.',
      why: 'Gauss\'s Law ∇·D = ρ_v directly determines electric fields in materials with arbitrary permittivity ε.',
      canonical: 'emt_assignment_master_notes.html#q1'
    },
    'B': {
      symbol: 'B',
      name: 'Magnetic Flux Density',
      unit: 'T (Tesla)',
      category: 'Maxwell Field',
      meaning: 'B = μ H. The fundamental field governing Lorentz magnetic force F = q(v × B).',
      why: 'Gauss\'s Magnetic Law ∇·B = 0 proves magnetic flux lines form unbroken closed loops with no magnetic monopoles.',
      canonical: 'emt_assignment_master_notes.html#q1'
    },
    'Jd': {
      symbol: 'J_d',
      name: 'Displacement Current Density',
      unit: 'A/m²',
      category: 'Maxwell Discovery',
      meaning: 'J_d = ∂D/∂t = jωε E. Current density arising from time-varying electric flux density without physical charge drift.',
      why: 'Maxwell\'s master contribution completing Ampère\'s law (∇×H = J_c + ∂D/∂t), allowing EM waves to travel across vacuum.',
      canonical: 'emt_assignment_master_notes.html#q3'
    },
    'phasor': {
      symbol: 'F_s',
      name: 'Electromagnetic Phasor',
      unit: 'Complex Vector',
      category: 'Mathematical Tool',
      meaning: 'F(t) = Re[F_s e^(jωt)]. Complex quantity encapsulating amplitude and spatial phase of steady-state sinusoidal fields.',
      why: 'Replaces time derivatives ∂/∂t with multiplication by jω, converting calculus differential equations into simple algebra.',
      canonical: 'emt_assignment_master_notes.html#q1'
    }
  };

  // Comprehensive Key Alias Map for Robust Matching
  const ALIAS_MAP = {
    'resistance': 'R',
    'resistance (r)': 'R',
    'r': 'R',
    'inductance': 'L',
    'inductance (l)': 'L',
    'l': 'L',
    'capacitance': 'C',
    'capacitance (c)': 'C',
    'c': 'C',
    'conductance': 'G',
    'conductance (g)': 'G',
    'g': 'G',
    'kvl': 'KVL',
    "kirchhoff's voltage law": 'KVL',
    "kirchhoff's voltage law (kvl)": 'KVL',
    'kcl': 'KCL',
    "kirchhoff's current law": 'KCL',
    "kirchhoff's current law (kcl)": 'KCL',
    'z0': 'Z0',
    'z_0': 'Z0',
    'characteristic impedance': 'Z0',
    'vswr': 'VSWR',
    'standing wave ratio': 'VSWR',
    'voltage standing wave ratio': 'VSWR',
    'gamma': 'gamma',
    'propagation constant': 'gamma',
    'alpha': 'alpha',
    'attenuation constant': 'alpha',
    'beta': 'beta',
    'phase constant': 'beta',
    'gamma_l': 'Gamma_L',
    'reflection coefficient': 'Gamma_L',
    'voltage reflection coefficient': 'Gamma_L',
    'delta': 'delta',
    'skin depth': 'delta',
    'fc': 'fc',
    'cutoff frequency': 'fc',
    'tem': 'TEM',
    'transverse electromagnetic': 'TEM',
    'te10': 'TE10',
    'dominant mode': 'TE10',
    'up': 'up',
    'phase velocity': 'up',
    'ug': 'ug',
    'group velocity': 'ug',
    'eta': 'eta',
    'wave impedance': 'eta',
    'lambda_g': 'lambda_g',
    'guide wavelength': 'lambda_g',
    'kc': 'kc',
    'cutoff wavenumber': 'kc',
    'd': 'D',
    'electric flux density': 'D',
    'b': 'B',
    'magnetic flux density': 'B',
    'jd': 'Jd',
    'displacement current': 'Jd',
    'displacement current density': 'Jd',
    'phasor': 'phasor',
    'phasors': 'phasor'
  };

  function resolveTerm(rawKey) {
    if (!rawKey) return null;
    const clean = rawKey.trim().toLowerCase();
    const canonKey = ALIAS_MAP[clean] || (EMT_GLOSSARY[rawKey] ? rawKey : null);
    return canonKey && EMT_GLOSSARY[canonKey] ? canonKey : null;
  }

  // Create Global Floating Tooltip Element
  let tooltipEl = null;
  let hideTimer = null;

  function initTooltipDOM() {
    if (document.getElementById('emt-global-tooltip')) {
      tooltipEl = document.getElementById('emt-global-tooltip');
      return;
    }

    tooltipEl = document.createElement('div');
    tooltipEl.id = 'emt-global-tooltip';
    tooltipEl.innerHTML = `
      <div class="tooltip-header">
        <div class="tooltip-title-wrap">
          <span class="tooltip-symbol" id="ttSymbol">Z₀</span>
          <span class="tooltip-name" id="ttName">Characteristic Impedance</span>
        </div>
        <span class="tooltip-badge" id="ttCategory">Wave Constant</span>
      </div>
      <div class="tooltip-unit" id="ttUnit">SI Unit: Ω</div>
      <div class="tooltip-section">
        <div class="tooltip-label">💡 What it means</div>
        <div class="tooltip-meaning" id="ttMeaning">Loading definition...</div>
      </div>
      <div class="tooltip-section">
        <div class="tooltip-label">🎯 Why we use it</div>
        <div class="tooltip-why" id="ttWhy">Loading application...</div>
      </div>
      <div class="tooltip-canonical" id="ttCanonicalWrap">
        <span>📖 Canonical Authority:</span>
        <span id="ttCanonicalLink" style="text-decoration:underline;">Sadiku Master Guide ↗</span>
      </div>
    `;
    document.body.appendChild(tooltipEl);

    // Keep tooltip visible when hovering directly over it
    tooltipEl.addEventListener('mouseenter', () => {
      if (hideTimer) clearTimeout(hideTimer);
    });

    tooltipEl.addEventListener('mouseleave', () => {
      hideTooltip();
    });

    // Close on click outside for mobile/touch
    document.addEventListener('touchstart', (e) => {
      if (tooltipEl && !tooltipEl.contains(e.target) && !e.target.closest('.emt-term')) {
        hideTooltip();
      }
    }, { passive: true });
  }

  function showTooltip(termKey, targetEl) {
    if (hideTimer) clearTimeout(hideTimer);
    const data = EMT_GLOSSARY[termKey];
    if (!data || !tooltipEl) return;

    document.getElementById('ttSymbol').textContent = data.symbol;
    document.getElementById('ttName').textContent = data.name;
    document.getElementById('ttCategory').textContent = data.category;
    document.getElementById('ttUnit').textContent = 'SI Unit: ' + data.unit;
    document.getElementById('ttMeaning').textContent = data.meaning;
    document.getElementById('ttWhy').textContent = data.why;

    const canonWrap = document.getElementById('ttCanonicalWrap');
    if (data.canonical) {
      canonWrap.style.display = 'flex';
      canonWrap.onclick = (e) => {
        e.stopPropagation();
        window.open(data.canonical, '_blank');
      };
    } else {
      canonWrap.style.display = 'none';
    }

    const rect = targetEl.getBoundingClientRect();
    const ttWidth = Math.min(360, window.innerWidth - 32);
    tooltipEl.style.width = ttWidth + 'px';
    tooltipEl.style.maxWidth = ttWidth + 'px';

    // Position calculation
    let left = rect.left + rect.width / 2 - ttWidth / 2;
    if (left < 16) left = 16;
    if (left + ttWidth > window.innerWidth - 16) {
      left = window.innerWidth - ttWidth - 16;
    }

    // Estimate height
    const estHeight = 240;
    let top = rect.top - estHeight - 12;
    if (top < 16) {
      // Place below element
      top = rect.bottom + 12;
    }
    if (top + estHeight > window.innerHeight - 16) {
      top = Math.max(16, window.innerHeight - estHeight - 16);
    }

    tooltipEl.style.left = Math.round(left) + 'px';
    tooltipEl.style.top = Math.round(top) + 'px';
    tooltipEl.classList.add('active');
  }

  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove('active');
  }

  function scheduleHide() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(hideTooltip, 180);
  }

  // Automatic Text Scanner: Scans paragraphs and list items to auto-tag key glossary terms
  function autoTagContent() {
    const targets = document.querySelectorAll('.chapter-card, .scene-box, .scene-container, .module-card, .main-content, .content-area');
    if (!targets.length) return;

    // Ordered terms to check (longer phrases first)
    const scanTerms = [
      { pattern: /Kirchhoff's Voltage Law \(KVL\)/gi, key: 'KVL', label: "Kirchhoff's Voltage Law (KVL)" },
      { pattern: /Kirchhoff's Current Law \(KCL\)/gi, key: 'KCL', label: "Kirchhoff's Current Law (KCL)" },
      { pattern: /Voltage Standing Wave Ratio \(VSWR\)/gi, key: 'VSWR', label: 'Voltage Standing Wave Ratio (VSWR)' },
      { pattern: /Voltage Standing Wave Ratio/gi, key: 'VSWR', label: 'Voltage Standing Wave Ratio' },
      { pattern: /Voltage Reflection Coefficient/gi, key: 'Gamma_L', label: 'Voltage Reflection Coefficient' },
      { pattern: /Characteristic Impedance/gi, key: 'Z0', label: 'Characteristic Impedance' },
      { pattern: /Resistance \(\$R\$\)/gi, key: 'R', label: 'Resistance ($R$)' },
      { pattern: /Inductance \(\$L\$\)/gi, key: 'L', label: 'Inductance ($L$)' },
      { pattern: /Capacitance \(\$C\$\)/gi, key: 'C', label: 'Capacitance ($C$)' },
      { pattern: /Conductance \(\$G\$\)/gi, key: 'G', label: 'Conductance ($G$)' },
      { pattern: /Resistance \(R\)/gi, key: 'R', label: 'Resistance (R)' },
      { pattern: /Inductance \(L\)/gi, key: 'L', label: 'Inductance (L)' },
      { pattern: /Capacitance \(C\)/gi, key: 'C', label: 'Capacitance (C)' },
      { pattern: /Conductance \(G\)/gi, key: 'G', label: 'Conductance (G)' },
      { pattern: /\bVSWR\b/g, key: 'VSWR', label: 'VSWR' },
      { pattern: /\bSkin Depth\b/gi, key: 'delta', label: 'Skin Depth' },
      { pattern: /\bCutoff Frequency\b/gi, key: 'fc', label: 'Cutoff Frequency' }
    ];

    targets.forEach(container => {
      // Look at li items and paragraphs
      container.querySelectorAll('li, p.scene-lead').forEach(node => {
        if (node.classList.contains('emt-scanned') || node.closest('.checkpoint-widget')) return;

        let html = node.innerHTML;
        let modified = false;

        scanTerms.forEach(item => {
          if (item.pattern.test(html) && !html.includes(`data-term="${item.key}"`)) {
            html = html.replace(item.pattern, `<span class="emt-term" data-term="${item.key}">$&</span>`);
            modified = true;
          }
        });

        if (modified) {
          node.innerHTML = html;
        }
        node.classList.add('emt-scanned');
      });
    });
  }

  // Global Event Delegation for 100% Reliable Triggering on Mouse and Touch
  function initEventDelegation() {
    document.addEventListener('mouseover', (e) => {
      const termEl = e.target.closest('.emt-term') || (e.target.hasAttribute && e.target.hasAttribute('data-term') ? e.target : null);
      if (termEl) {
        if (hideTimer) clearTimeout(hideTimer);
        const rawKey = termEl.getAttribute('data-term') || termEl.textContent.trim();
        const canonKey = resolveTerm(rawKey);
        if (canonKey) {
          showTooltip(canonKey, termEl);
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const termEl = e.target.closest('.emt-term') || (e.target.hasAttribute && e.target.hasAttribute('data-term') ? e.target : null);
      if (termEl) {
        scheduleHide();
      }
    });

    // Touch Support for Mobile / Mac Trackpad Tap
    document.addEventListener('click', (e) => {
      const termEl = e.target.closest('.emt-term') || (e.target.hasAttribute && e.target.hasAttribute('data-term') ? e.target : null);
      if (termEl) {
        if (hideTimer) clearTimeout(hideTimer);
        const rawKey = termEl.getAttribute('data-term') || termEl.textContent.trim();
        const canonKey = resolveTerm(rawKey);
        if (canonKey) {
          showTooltip(canonKey, termEl);
          e.preventDefault();
        }
      }
    });
  }

  function bindAll() {
    initTooltipDOM();
    autoTagContent();
    initEventDelegation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAll);
  } else {
    bindAll();
  }

  // Re-run autoTag after MathJax finishes rendering
  if (window.MathJax && window.MathJax.startup) {
    window.MathJax.startup.promise.then(() => {
      setTimeout(autoTagContent, 400);
    }).catch(() => {});
  }

  window.EMTGlossary = {
    terms: EMT_GLOSSARY,
    show: showTooltip,
    hide: hideTooltip,
    refresh: autoTagContent
  };
})();
