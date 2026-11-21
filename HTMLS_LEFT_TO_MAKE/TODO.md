# Staging Backlog: Study Snaps HTML Conversion Engine

Total Unprocessed Batches: 9 Batches (5–6 items each, 49 total targeted resources)

---

## 📌 Batch 1: Semiconductor Physics & Band Diagrams (`First/`) — [COMPLETED ✅]
- [x] Item 1.1: `1_Intrinsic_Semiconductor.png` — Band gap $E_g$, intrinsic carrier concentration $n_i$, Fermi level $E_F$ derivation, conduction & valence band density of states.
- [x] Item 1.2: `2_N_Type_Semiconductor.png` — Donor energy level $E_d$, ionization, majority electrons $n_n \approx N_D$, Fermi level upward shift toward $E_c$.
- [x] Item 1.3: `3_P_Type_Semiconductor.png` — Acceptor level $E_a$, majority holes $p_p \approx N_A$, Fermi level downward shift toward $E_v$.
- [x] Item 1.4: `4_PN_Junction_Equilibrium.png` — Thermal equilibrium, Fermi level alignment, built-in potential $V_{bi}$, depletion region space charge $W$.
- [x] Item 1.5: `5_PN_Junction_Forward.png` & `6_PN_Junction_Reverse.png` — Barrier height modulation ($V_{bi}-V_F$ vs. $V_{bi}+V_R$), diffusion vs. drift current components.
- [x] Item 1.6: `7_Metal_Band.png`, `8_Oxide_Band.png`, `9_MOS_Band_Diagram.png` — Energy band alignment of MOS capacitor, work function difference $\Phi_{ms}$, accumulation, depletion, and strong inversion ($2\phi_F$).
- **Output HTML:** `STUDY SNAPS/First/index.html` (62.0 KB, verified, MathJax + Chart.js + Lightbox + Interactive $V_T$ Solver).

---

## 📌 Batch 2: Thermal Oxidation, Epitaxy & BJT Fabrication (`VLSI/`) — [COMPLETED ✅]
- [x] Item 2.1: `Oxidation Process 01 Class Notes.pdf` — Deal-Grove model, reaction-controlled linear regime ($B/A$), diffusion-controlled parabolic regime ($B$).
- [x] Item 2.2: `Oxidation Process 02 Class Notes.pdf` & `ESE Sheet 01` — Dry vs wet oxidation kinetics, masking properties against dopants, numerical calculations.
- [x] Item 2.3: `Epitaxy Class Notes.pdf` — Vapor phase epitaxy (VPE), chloride & silane processes, growth rate kinetics, autodoping.
- [x] Item 2.4: `Introduction Of ICs Class Notes.pdf` — IC evolution, crystal growth, Czochralski method, wafer slicing, defect density.
- [x] Item 2.5: `BJT Fabrication and Methods of Isolation Class Notes.pdf` — Buried layer, planar processing, junction isolation vs LOCOS.
- [x] Item 2.6: `Epitaxy & BJT ESE Practice Sheet 01.pdf` — Exam questions and numerical drills.
- **Output HTML:** `STUDY SNAPS/VLSI/oxidation_epitaxy_bjt.html` (76.1 KB, verified, MathJax + Chart.js + Deal-Grove Solver + 7 Embedded SVGs + ESE Drills).

---

## 📌 Batch 3: Doping Processes (Diffusion & Ion Implantation) (`VLSI/`) — [COMPLETED ✅]
- [x] Item 3.1: `Doping Process 01 Class Notes.pdf` — Fick’s 1st and 2nd laws, constant-source pre-deposition condition ($\text{erfc}$ profile).
- [x] Item 3.2: `Doping Process 02 Class Notes.pdf` — Limited-source drive-in diffusion (Gaussian profile), junction depth $x_j$, sheet resistance $R_s$, Arrhenius kinetics ($E_A=3-4\text{ eV}$ vs $0.6-1\text{ eV}$).
- [x] Item 3.3: `Doping Process 03 Class Notes.pdf` — Ion Implantation: kinetic energy, projected range $R_p$, projected straggle $\Delta R_p$, dose calculations, nuclear ($S_n$) vs electronic ($S_e$) stopping.
- [x] Item 3.4: `Doping Process 04 Class Notes.pdf` — Crystal lattice damage, ion channeling effect, tilt angle ($7^\circ-10^\circ$), screen $\text{SiO}_2$, furnace vs RTA annealing.
- [x] Item 3.5: `Doping Process ESE Practice Sheet 01.pdf` — Complete 12 numerical drills with step-by-step algebra and verification.
- **Output HTML:** `STUDY SNAPS/VLSI/doping_diffusion_implant.html` (114.4 KB, verified, MathJax + Chart.js + Dual Interactive Solvers + 11 Embedded SVGs + Full Numerical Vault).

---

## 📌 Batch 4: Lithography, Etching, CMOS Flow & Packaging (`VLSI/`) — [COMPLETED ✅]
- [x] Item 4.1: `Photolithography Process & Alignment` — Contact, proximity ($x = \sqrt{\lambda g}$), projection optics ($R = k_1 \lambda/\text{NA}, \text{DOF} = k_2 \lambda/\text{NA}^2$), electron beam, X-ray lithography.
- [x] Item 4.2: `Photoresist & Etching Chemistries` — Positive (+ve PR) scission vs negative (-ve PR) polymerization, wet isotropic vs RIE anisotropic vertical profiles, canonical step sequence.
- [x] Item 4.3: `PMOS NMOS CMOS Fabrication 01 Class Notes.pdf` — Legacy metal gate misalignment trap vs self-aligned refractory polysilicon gate ($T_m > 1414^\circ\text{C}$ vs Al $660^\circ\text{C}$), Ohmic contact formation.
- [x] Item 4.4: `PMOS NMOS CMOS Fabrication 02 Class Notes.pdf` — N-well, P-well, Twin-tub, and SOI flows; parasitic SCR $pnpn$ cross-coupled latch-up loop gain $\beta_{npn} \beta_{pnp} \ge 1$; $n^+/p^+$ guard rings.
- [x] Item 4.5: `IC Capacitors and Resistors Class Notes.pdf` — Diffused junction (polarized, $V$-dependent) vs MOS thin-film (non-polarized, constant $C_{ox}$); diffused, epitaxial, pinched ($\text{M}\Omega$), and thin-film resistors.
- [x] Item 4.6: `Dennard Scaling, Packaging & VLSI Design` — Constant Field ($E \propto 1$, power density const) vs Constant Voltage ($t \to t/4$ for $S=2$, power density $S^3$ hazard); SMT (BGA/QFP) vs THT (DIP/SIP); passivation layer; Full Custom vs Semi-Custom (Standard Cell, Gate Array, PLDs).
- [x] Item 4.7: `Dual ESE Practice Sheets 01 (20 Master Drills)` — Full analytical step-by-step solutions for all 10 questions of Lithography/Packaging/Passives DPP + all 10 questions of CMOS/BJT/Epitaxy DPP.
- **Output HTML:** `STUDY SNAPS/VLSI/litho_etch_cmos_packaging.html` (125.5 KB, verified, MathJax + Chart.js Scaling Simulator + Dual Calculators + 5 High-Res Layout Embeds + 20 Solved Drills).

---

## 📌 Batch 5: MOS Transistors, Inverters & VLSI Testing (`VLSI/`) — [ACTIVE / NEXT]
- [x] Item 5.1: `MOS Transistor Operation Class Notes.pdf` — Drain current equations, threshold voltage $V_t$, body effect, channel length modulation.
- [x] Item 5.2: `NMOS and CMOS Inverter and Pass Transistor Class Notes.pdf` — CMOS inverter VTC, noise margins, pass transistor threshold drop ($V_{dd}-V_t$).
- [x] Item 5.3: `Master_Unit_II_Inverters.mp4` & Class Notes — Inverter propagation delays ($\tau_r, \tau_f, \tau_d$), $\beta_n/\beta_p$ sizing for symmetric switching.
- [x] Item 5.4: `VLSI Testing 01 Class Notes.pdf` — Fault models, stuck-at-0/1, ATPG basics, test vector coverage.
- [x] Item 5.5: `VLSI Testing 02 Class Notes.pdf` & ESE Sheet — Scan chain design, JTAG boundary scan architecture (IEEE 1149.1), BIST.
- [x] Item 5.6: `Basic_VLSI_Design_Exam_Prep.mp4` / `VLSI Design Class Notes.pdf` — Final exam blueprint and derivation summary.

---

## 📌 Batch 6: SQL Problem-Solving Mastery (HACKERRANK/) — [COMPLETED ✅]
- [x] Item 6.1: `african-cities-English.pdf` & `japanese-cities-name-English.pdf` — Multi-table relational JOINs and country code filtering.
- [x] Item 6.2: `revising-the-select-query-English.pdf`, `select-all-sql.pdf`, `select-by-id.pdf` — SELECT projections, numeric and string predicates.
- [x] Item 6.3: `revising-aggregations-the-count-function-English.pdf` — Aggregation functions (COUNT, SUM, AVG) with HAVING filters.
- [x] Item 6.4: `weather-observation-station-1.pdf` & `station-3.pdf` — Modulo operations, DISTINCT duplicate suppression.
- [x] Item 6.5: `more-than-75-marks-English.pdf` & `name-of-employees-English.pdf` — String slicing (`RIGHT()`), composite primary/secondary key sorting.
- **Output HTML:** STUDY SNAPS/HACKERRANK/index.html (119.7 KB, verified, MathJax + Live Relational VM + 10 Drills + ER Visualizer + Lightbox + Quiz).

---

## 📌 Batch 7: Virtuoso CAD Experiments (VLSI_Design/) — [COMPLETED ✅]
- [x] Item 7.1: `VLSIMANUAL1TO17.pdf` Experiments 1–4 — CMOS Inverter DC and transient analysis, VTC extraction.
- [x] Item 7.2: `VLSIMANUAL1TO17.pdf` Experiments 5–8 — 2-input NAND and NOR gate schematic design, delay simulation.
- [x] Item 7.3: `VLSIMANUAL1TO17.pdf` Experiments 9–12 — XOR, XNOR, and Transmission Gate multiplexer circuits.
- [x] Item 7.4: `VLSIMANUAL1TO17.pdf` Experiments 13–17 — D-Latch, Master-Slave Flip-Flop, Full Adder layout vs schematic (LVS).
- [x] Item 7.5: Cadence Database Review — Netlists and symbol maps in `ECE3A_T2_17` and `ECE_A_17`.
- **Output HTML:** STUDY SNAPS/VLSI_Design/cadence_virtuoso_lab.html (88.6 KB, verified, MathJax + Chart.js Waveform/VTC Sim + 17 Exps + Layout XL + DRC/LVS + Lightbox + Viva Quiz).

---

## 📌 Batch 8: Information Theory & Coding Slides (ITC/) — [COMPLETED ✅]
- [x] Item 8.1: `Huffman_Coding_with_Examples (1).pptx` — Huffman algorithm execution, code trees, average length, coding efficiency.
- [x] Item 8.2: `VLC_Prefix_Codes_Lecture_Slides.pptx` — Variable-length prefix codes, Kraft-McMillan inequality.
- [x] Item 8.3: `lec5_slides.pptx` — Discrete memoryless channels (DMC), transition probabilities, mutual information.
- [x] Item 8.4: `lec9_slides_only.pptx` — Channel capacity $C$, symmetric channels, BSC and BEC.
- [x] Item 8.5: `Lecture 1.pptx` — Foundations of entropy $H(X)$ and information measure.
- **Output HTML:** STUDY SNAPS/ITC/itc_master_lecture_decks.html (77.5 KB, verified, MathJax + Live Huffman Builder + BSC/BEC Capacity Chart + (7,4) Hamming Corrector + Formula Vault + Quiz).

---

## 📌 Batch 9: Handwritten Study Snaps & Network Scanning — [COMPLETED ✅]
- [x] Item 9.1: Snaps Set A (1781704434931.jpg – 1783085834632.jpg) — RAG vs MAG, CPU/GPU/NPU/LPU, VLSI Moore's Law, Serial Protocols.
- [x] Item 9.2: Snaps Set B (1783436068007.jpg – 1784092530440.jpg) — Arduino Uno R3 ATmega328P, Embedded Roadmap, Pull-up/down, 32-bit vs 64-bit OS.
- [x] Item 9.3: Snaps Set C (1784251539430.jpg – 1785085207628.jpg) — 8 Op-Amp circuits, 7 Embedded Data Structures, GPU Memory & HBM, printf race conditions, 10 Capacitor types, PCB structure, 13 DC-DC converters.
- [x] Item 9.4: Snaps Set D (1785864144285.jpg – 1787123693497.jpg) — 3nm GAAFET nodes, ARM Cortex-M Vector table startup, Chip types, IC manufacturing flow.
- [x] Item 9.5: Snaps Set E (1789124814534.gif – 1792814077293.jpg) — MOSFET Miller Plateau switching loss, HBM TSVs, SLAM robotics, Glitch hazards, 5 Inverter circuits, Op-Amps, SCR/DIAC/TRIAC, Edge Olfaction DSP & ResGAT.
- [x] Item 9.6: Idle Scan Diagrams (idle-scan-*.png) — TCP IP ID prediction scanning mechanism (Open, Closed, Filtered).
- **Output HTML:** STUDY SNAPS/study_snaps_master_archive.html (190.4 KB, verified, MathJax + 4 Live Simulators + 42 Gallery Cards + Lightbox + Quiz).

---

## 📌 Phase 2: Curriculum FTS5 SQL Knowledge Vault (`STUDY SNAPS/curriculum_fts.sql`)

### Section A: Easily Parsable Master Extractions — [COMPLETED ✅]
- [x] **VLSI & CMOS Kinetics**: Deal-Grove ($0.44 t_{ox}$), Dry vs Wet, Epitaxy, Planar BJT sub-collector, Isolation (LOCOS/STI), Lithography Rayleigh, PR/RIE, Self-aligned poly-gate, SCR Latch-up, 5-region VTC, Power dissipation, SSAF/IDDQ, Fick's laws, Ion implantation.
- [x] **DBMS Architecture**: ACID WAL & ARIES recovery, Normalization 1NF-BCNF, Conflict serializability & DAGs, Strict 2PL.
- [x] **Microprocessors & Controllers**: 8085 Interrupts & SIM/RIM, 8086 BIU/EU & 20-bit addressing, 8051 Memory map & SFRs, 8051 Timers & UART baud generation.
- [x] **Signals & Systems**: Nyquist sampling & aliasing, LTI convolution & BIBO stability, Laplace ROC properties.
- [x] **Transistors & Analog Circuits**: BJT operating modes & Early effect, CE/CB/CC topologies, Small-signal h-parameters, 555 astable/monostable timer derivations.
- [x] **Electromagnetics**: Maxwell's equations & Helmholtz wave equation, Polarization, Skin depth $\delta$, Poynting vector power density.
- [x] **Engineering Economics**: Time value of money ($F/P, P/A$), Net Present Worth (NPW), Internal Rate of Return (IRR).

### Section B: Scanned & Multi-Page PDF Ingestions

- [x] **Batch 1 (Transistor Biasing & h-Parameters)**: `h parameters transistor Note.pdf` & `TRANSISTOR BIASING .pdf` (Desktop/NOTES/TRANSISTOR/ — 18 modules, verified).
- [x] **Batch 2 (Transmission Lines & Waves)**: `Transmission Lines.pdf` & `PCCECE501 Electromagnetic Waves Assignment and Study Notes.pdf` (Desktop/CV - Copy/ — 8 modules, verified). Total DB count: 56 modules.
- [x] **Batch 3 (Network Theorems & Two-Port Scans)**: `Transformer_page1.pdf` through `Transformer_page12.pdf`, Network Theorems (1-4), Star-Delta, Circuit Elements & `CamScanner 09-22-2025...` series (Desktop/NOTES/network/ — 32 modules, verified). Total DB count: 88 modules.
- [x] **Batch 4 (Douglas Pucknell VLSI Design)**: `Basic VLSI Design (Dougas A_ (z-library.sk, 1lib.sk, z-lib.sk).pdf` (STUDY SNAPS/ — 12 modules, verified Chapters 1–4). Total DB count: 100 modules.
- [x] **Batch 5 (Anand Kumar Signals & Systems)**: `Signals and System by Anand Kumar.pdf` & `Properties of Transforms.pdf` (Desktop/NOTES/SIGNAL/ — 12 modules, verified Chapters 1–7 + Transform Properties). Total DB count: 112 modules.

### Section C: Visual Tool Recovery & Context Repair
- [x] **SQL & Relational Algebra Ingestion**: `Assignment.pdf` (p. 1–3) & 10 HackerRank scanned problem PDFs (`african-cities`, `more-than-75-marks`, `revising-aggregations`, etc.). Recovered full schemas, DDL primary/foreign keys, relational algebra, and subquery modules. Injected 3 verified modules (`dbms`: 3 -> 6 modules). Total DB count: 115 modules.


---

## 📌 Batch 10: Digital Electronics Master Notes (`Digital_Electronics/`) — [COMPLETED ✅]
- [x] Item 10.1: Chapter 1 — Logic Gates & Universal Synthesis (NAND/NOR complete minimum proofs, electrical truth tables, non-associativity of universal gates).
- [x] Item 10.2: Chapter 2 — Boolean Algebra, Canonical Forms & K-Maps (Consensus theorem proof, Shannon's expansion, Gray-code adjacency, Prime Implicants, Essential PIs, Don't Care hazards).
- [x] Item 10.3: Chapter 3 — Combinational Logic Circuits (Half/Full adders, Ripple Carry worst-case delay, Subtractor circuits, MUX function generation, 74138 Decoders, Priority Encoders).
- [x] Item 10.4: Chapter 4 — Sequential Logic Fundamentals & Flip-Flops (SR, JK, D, T excitation tables, Master-Slave JK architecture, Race-Around physical dynamics & elimination, Setup & Hold times).
- [x] Item 10.5: Chapter 5 — Sequential Machines (Ripple counters $f_{max}$ degradation, Synchronous counter synthesis, Ring vs Johnson counters, SISO/SIPO/PISO/PIPO shift registers, 74194 modes).
- [x] Item 10.6: Chapter 6 — Number Systems, Signed Representation & Converters (Sign-magnitude, 1's/2's complement single-zero advantages, overflow $V=C_{in}\oplus C_{out}$, Binary Weighted vs R-2R ladder DAC, Flash vs SAR vs Dual-Slope ADC).
- **Output HTML:** `STUDY SNAPS/Digital_Electronics/index.html` (Apple Calmness UI, MathJax LaTeX, Collapsible Drawers, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` under Core ECE (`href: 'Digital_Electronics/index.html'`).


---

## 📌 Batch 11: Signals & Systems and Spectral Transforms (`Signals_Systems/`) — [COMPLETED ✅]
- [x] Item 11.1: Chapter 1 — Signal & System Classifications (Impulse, step, ramp, energy vs power signals, linearity affine tests, causality, BIBO stability).
- [x] Item 11.2: Chapter 2 — LTI Systems & Convolution (Continuous & Discrete convolution, 4 graphical steps, cascade/parallel properties, causal stability bounds).
- [x] Item 11.3: Chapter 3 — Continuous-Time Fourier Series (Trigonometric & Exponential, Even/Odd/Half-Wave spectral elimination, Parseval power theorem).
- [x] Item 11.4: Chapter 4 — Continuous-Time Fourier Transform (Synthesis/Analysis pairs, duality, time-differentiation, step function DC impulse $\pi\delta(\omega)$, Parseval energy).
- [x] Item 11.5: Chapter 5 — The Sampling Theorem & Reconstruction (Ideal Dirac impulse sampling, spectrum replication, Nyquist rate combinations, Whittaker-Shannon sinc interpolation).
- [x] Item 11.6: Chapter 6 — Laplace, Z-Transform & ROC Dynamics (Bilateral formulations, complex mapping $z=e^{sT}$, ROC pole boundary theorems, IVT/FVT strict validity conditions).
- **Output HTML:** `STUDY SNAPS/Signals_Systems/index.html` (Apple Calmness UI, MathJax LaTeX, Collapsible Drawers, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` under Core ECE (`href: 'Signals_Systems/index.html'`).

---

## 📌 Batch 12: Electromagnetic Waves Assignment & Wave Propagation (`EMT/`) — [COMPLETED ✅]
- [x] Item 12.1: `EMT Assignment.pdf` Q1 & Q2 — Maxwell's four equations in phasor form (differential + integral), purpose of phasors, and spatial TEM field structures across Free Space, Lossy Dielectric, and Lossless Dielectric.
- [x] Item 12.2: `EMT Assignment.pdf` Q3 & Q4 — Instantaneous electric field $\mathbf{E} = 30\sin(\omega t - 2x)\hat{a}_y$, displacement current density $\mathbf{J}_d = \frac{1}{2\pi}\cos(6\times 10^8 t - 2x)\hat{a}_y$, angular frequency $\omega = 6\times 10^8\text{ rad/s}$, and magnetic field $\mathbf{H} = \frac{1}{4\pi}\sin(6\times 10^8 t - 2x)\hat{a}_z$.
- [x] Item 12.3: `EMT Assignment.pdf` Q5 & Q6 — Medium classification at 2 MHz with ferromagnetic $\mu_r=205$ ($\tan \delta_c = 25,165 \gg 100 \implies$ Good Conductor, $\eta_c = 21.505\angle 45^\circ\ \Omega$), and d'Alembert phase invariance $-\hat{a}_x$ propagation with $\beta = \frac{1}{3}\times 10^{-3}\text{ rad/m}$.
- [x] Item 12.4: `EMT Assignment.pdf` Q7 & Q8 — Solid conductor eddy current crowding mechanism (Ampère + Faraday-Lenz cancellation at core vs reinforcement at surface), cylindrical Bessel diffusion equation, and physical significance of real ($\varepsilon'$, stored energy) and imaginary ($\varepsilon''$, dissipated power) complex permittivity.
- [x] Item 12.5: `EMT Assignment.pdf` Q9 & Q10 — UHF signal at 400 MHz ($\varepsilon_r=50, \sigma=5\text{ S/m}$): Order-of-unity exam trap ($\tan \delta_c = 4.5$), exact Helmholtz solutions $\alpha = 79.585\text{ Np/m}$, $\beta = 99.211\text{ rad/m}$, compressed wavelength $\lambda = 6.333\text{ cm}$, skin depth $\delta = 1.257\text{ cm}$, and physical identification as human muscle / saline biological phantom.
- [x] Item 12.6: WebGL 3D Simulation Engine — Real-time Babylon.js 7.30 electrodynamics laboratory with interactive TEM wave propagation, lossy attenuation decay, skin effect concentric current ring simulation, live telemetry HUD, and calm Apple aesthetic controls.
- **Output HTML:** `STUDY SNAPS/EMT/emt_assignment_master_notes.html` (Apple Calmness UI, MathJax LaTeX, Babylon.js 7.30 WebGL, Collapsible Drawers, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` under Core ECE and in `STUDY SNAPS/EMT/index.html` navigation sidebar.

---

## 📌 Batch 13 / EMT Batch 1B: Transmission Lines & Waveguides (`EMT/`) — [COMPLETED ✅]
- [x] Item 13.1: Page 1 — Telegrapher's distributed equations ($R, L, G, C$), characteristic impedance $Z_0 = \sqrt{\frac{R+j\omega L}{G+j\omega C}}$, lossless line condition ($\sigma_c \to \infty, \sigma \to 0 \implies \alpha=0, Z_0 = \sqrt{L/C}$).
- [x] Item 13.2: Page 2 — Distortionless line Heaviside condition ($RC = GL$), frequency-independent attenuation $\alpha = \sqrt{RG}$, linear phase $\beta = \omega\sqrt{LC}$, dispersion-free velocity $u_p = 1/\sqrt{LC}$, and complete comparison matrix.
- [x] Item 13.3: Page 3 — Voltage reflection coefficient $\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}$, VSWR $s = \frac{1+|\Gamma_L|}{1-|\Gamma_L|}$, matched load criteria ($\Gamma_L=0, s=1$), and finite transit time delay $t_{transit} = l/v_p$ with the $\lambda/20$ distributed boundary.
- [x] Item 13.4: Page 4 — Rectangular waveguide physics (why single-conductor pipes cannot support TEM mode), general cutoff frequency formula $f_c = \frac{c}{2}\sqrt{(m/a)^2 + (n/b)^2}$, dominant $\text{TE}_{10}$ mode ($f_c = c/2a, \lambda_c = 2a$), evanescent decaying stopband, degenerate modes, and conducting wall boundary conditions ($E_t = 0, B_n = 0$).
- [x] Item 13.5: Page 5 — Guide wavelength $\lambda_g = \lambda_0/\sqrt{1 - (f_c/f)^2} > \lambda_0$, superluminal phase velocity $v_p = c/\sqrt{1-(f_c/f)^2} > c$, subluminal energy group velocity $v_g = c\sqrt{1-(f_c/f)^2} < c$, and relativistic identity $v_p \cdot v_g = c^2$.
- [x] Item 13.6: Page 5 Formal Proofs — All 6 mandatory academic derivations solved step-by-step with explicit limits and boundary substitutions.
- [x] Item 13.7: WebGL 3D Simulation Engine — Dual-mode Babylon.js 7.30 laboratory: Transmission line standing wave interference with adjustable load reflection $|\Gamma_L|$, and 3D rectangular waveguide $\text{TE}_{10}$ mode electric field vector distribution with live telemetry HUD.
- **Output HTML:** `STUDY SNAPS/EMT/module3_transmission_lines_waveguides_master.html` (Apple Calmness UI, MathJax LaTeX, Babylon.js 7.30 WebGL, Collapsible Drawers, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` under Core ECE and in `STUDY SNAPS/EMT/index.html` navigation sidebar.

---

## 📌 Batch 14 / EMT Batch 2A: Transmission Lines High-Frequency Foundations (`EMT/`) — [COMPLETED ✅]
- [x] Item 14.1: Pages 2–4 — High-frequency electrodynamics: Why lumped circuit models fail ($l \ge \lambda/20$), guided TEM wave nature, and engineering applications across RF/Microwave, digital signal integrity, medical MRI coils, and instrumentation.
- [x] Item 14.2: Page 5 — Comprehensive 6-point contrast matrix between Lumped Element Model (KVL/KCL, discrete $R, L, C$) and Distributed Parameter Model (Telegrapher's PDEs, per-unit-length $R, L, G, C$, finite transit delay).
- [x] Item 14.3: Page 6 — Table 11.1 Complete Analytical Formula Suite for high-frequency parameters ($R, L, G, C$) across Coaxial Line ($\frac{\mu}{2\pi}\ln\frac{b}{a}$), Two-Wire Line ($\frac{\mu}{\pi}\cosh^{-1}\frac{d}{2a}$), and Planar Line ($\frac{\mu d}{w}$), including high-frequency skin depth surface resistance ($\delta = 1/\sqrt{\pi f \mu \sigma_c}$).
- [x] Item 14.4: Pages 7–12 — Complete Telegrapher's wave derivations: KVL outer mesh and KCL shunt node limits as $\Delta z \to 0$, time-harmonic phasor representation, uncoupling to Helmholtz wave equations ($\frac{d^2 V_s}{dz^2} - \gamma^2 V_s = 0$), forward/backward traveling wave solutions, and characteristic impedance $Z_0 = \sqrt{\frac{R+j\omega L}{G+j\omega C}}$.
- [x] Item 14.5: Pages 13–16 — Lossless Line ($R=G=0 \implies \alpha=0, u_p = 1/\sqrt{LC}, Z_0 = \sqrt{L/C}$) and Oliver Heaviside Distortionless Line ($RC=GL \implies \alpha = \sqrt{RG}, \beta = \omega\sqrt{LC}$): Mathematical proof of zero frequency dispersion and Table 11.2 master characteristics matrix.
- [x] Item 14.6: Pages 17–19 Solved Numerical Vault — Full step-by-step solutions with independent cross-checks:
  - Example 11.1 (Air Line): $Z_0 = 70\ \Omega, \beta = 3\text{ rad/m at } 100\text{ MHz} \implies C = 68.2\text{ pF/m}, L = 334.2\text{ nH/m}$.
  - Example 11.2 (Distortionless Line): $Z_0 = 60\ \Omega, \alpha = 20\text{ mNp/m}, u = 0.6c \implies R = 1.20\ \Omega/\text{m}, L = 333.3\text{ nH/m}, C = 92.59\text{ pF/m}, G = 333.3\ \mu\text{S/m}, \lambda = 1.80\text{ m}$.
  - Practice Exercise 11.2 (Telephone Line at 1 kHz): $R = 30\ \Omega/\text{km}, L = 100\text{ mH/km}, G = 0, C = 20\ \mu\text{F/km} \implies Z_0 = 70.75\angle -1.367^\circ\ \Omega, \gamma = (2.121\times 10^{-4} + j8.888\times 10^{-3})\text{ m}^{-1}, u_p = 7.069\times 10^5\text{ m/s}$.
- [x] Item 14.7: WebGL 3D Simulation Engine — Multi-geometry Babylon.js 7.30 laboratory: Real-time 3D models of Coaxial Line, Two-Wire Line, and Planar Microstrip with dynamic radial E-field and circular B-field vector visualization, interactive geometric ratio sliders, and live parameter telemetry HUD.
- **Output HTML:** `STUDY SNAPS/EMT/transmission_lines_master_guide.html` (Apple Calmness UI, MathJax LaTeX, Babylon.js 7.30 WebGL, Collapsible Drawers, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` under Core ECE and in `STUDY SNAPS/EMT/index.html` navigation sidebar.

---

## 📌 Batch 15 / EMT Batch 2B: Electromagnetic Waves Practice Questions (`EMT/`) — [COMPLETED ✅]
- [x] Item 15.1: Q1 & Q2 — TEM wave nomenclature ($\vec{E} \cdot \hat{k} = 0, \vec{H} \cdot \hat{k} = 0$) vs Uniform Plane Wave (planar equiphase wavefronts, constant transverse amplitude); TV antenna hollow tubular conductor skin effect physics ($\delta \ll t$, zero interior RF current, structural mass reduction).
- [x] Item 15.2: Q3 & Q4 — Poynting's theorem rigorous derivation from Maxwell-Ampère and Faraday-Maxwell curl equations, vector identity $\nabla \cdot (\vec{E} \times \vec{H}) = \vec{H} \cdot (\nabla \times \vec{E}) - \vec{E} \cdot (\nabla \times \vec{H})$, volume integral formulation and conservation of energy balance; charge relaxation time differential equation ($\frac{\partial \rho_v}{\partial t} + \frac{\sigma}{\varepsilon}\rho_v = 0 \implies \tau_r = \frac{\varepsilon}{\sigma} = 0.487\text{ s}$ drill).
- [x] Item 15.3: Q5 & Q6 — Loss tangent parameter definition ($\tan \delta = \frac{\sigma}{\omega \varepsilon} = 748.97 \gg 100 \implies$ Good Conductor at 10 MHz), 4-tier medium classification master matrix; directional vs omni-directional radiation patterns, HPBW, FBR, and toroidal dipole field distribution.
- [x] Item 15.4: Q7 & Q8 — Rectangular waveguide cavity resonator resonant frequency analytical derivation ($f_{r,mnp} = \frac{u'}{2}\sqrt{(m/a)^2 + (n/b)^2 + (p/d)^2}$), mode degeneracies; conduction ($J_c$) vs displacement current ($J_d$) ratio drill ($|J_c/J_d| = 6.66 \times 10^{-8} \implies$ lossless dielectric behavior).
- [x] Item 15.5: Q9 & Q10 — Free space plane wave intrinsic parameters ($\eta_0 = 120\pi \approx 377\ \Omega, c = 3 \times 10^8\text{ m/s}$), phase constant $\beta$, wavelength $\lambda$; opposing traveling waves transmission line drill ($x=0.5\text{ m}, t=2\text{ ns}$ net voltage, maximum amplitude positions at $x=1\text{ m}$).
- [x] Item 15.6: WebGL 3D Simulation Engine — Real-time dual-mode Babylon.js 7.30 laboratory: Interactive Poynting vector energy flux visualizer ($\vec{S} = \vec{E} \times \vec{H}$) and 3D charge relaxation dynamics on a conducting sphere ($\rho_v(t) = \rho_0 e^{-t/\tau_r}$) with live telemetry HUD.
- **Output HTML:** `STUDY SNAPS/EMT/electromagnetic_waves_practice_questions_master.html` (Apple Calmness UI, MathJax LaTeX, Babylon.js 7.30 WebGL, Collapsible Drawers, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` under Core ECE and in `STUDY SNAPS/EMT/index.html` navigation sidebar.

---

## 📌 Batch 16 / EMT Batch 3A: Sadiku Chapter 11 Master Guide (`EMT/`) — [COMPLETED ✅]
- [x] Item 16.1: Sections 11.2 & 11.3 — Table 11.1 Analytical Distributed Parameter Suite (Coaxial, Two-Wire, Planar), complete limit derivation of Telegrapher's equations ($\lim_{\Delta z \to 0}$ KVL/KCL), time-harmonic phasor representation, and uncoupling to Helmholtz wave equations ($\frac{d^2 V_s}{dz^2} - \gamma^2 V_s = 0, \frac{d^2 I_s}{dz^2} - \gamma^2 I_s = 0$).
- [x] Item 16.2: Section 11.3 Special Cases — Lossless Line ($R=0=G \implies \alpha=0, u = 1/\sqrt{LC}, Z_0 = \sqrt{L/C}$) and Oliver Heaviside Distortionless Line ($RC=GL \implies \alpha = \sqrt{RG}, \beta = \omega\sqrt{LC}$): Mathematical proof of frequency-invariant velocity and zero dispersion.
- [x] Item 16.3: Section 11.4 — Generalized input impedance $Z_{in}(\ell) = Z_0 \left[\frac{Z_L + Z_0 \tanh \gamma \ell}{Z_0 + Z_L \tanh \gamma \ell}\right]$, terminal reflection coefficient $\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}$, standing wave ratio $s = \frac{1+|\Gamma_L|}{1-|\Gamma_L|}$, $|Z_{in}|_{\max} = s Z_0, |Z_{in}|_{\min} = Z_0/s$, and critical boundary terminations (Short, Open, Matched, $\lambda/4$ inverter, $\lambda/2$ repeater).
- [x] Item 16.4: Section 11.5 — The Smith Chart complete mathematical theory: Conformal bilinear transformation $\Gamma = \frac{z_L - 1}{z_L + 1}$, algebraic proof of constant resistance $r$-circles $(\Gamma_r - \frac{r}{1+r})^2 + \Gamma_i^2 = (\frac{1}{1+r})^2$ and reactance $x$-circles $(\Gamma_r - 1)^2 + (\Gamma_i - \frac{1}{x})^2 = (\frac{1}{x})^2$, common concurrence point $(1,0)$, angular wavelength scaling ($\lambda \leftrightarrow 720^\circ, \lambda/2 \leftrightarrow 360^\circ$), and admittance dual transformation.
- [x] Item 16.5: Section 11.6 — High-frequency applications: Analytical quarter-wave transformer matching ($Z_0' = \sqrt{Z_0 Z_L}$), single-stub shunt tuner design algorithm ($y = 1 + jb \implies y_s = -jb$), and 4-step slotted line metrology algorithm for recovering unknown load $Z_L$.
- [x] Item 16.6: Section 11.7 — Time-domain transient dynamics: Step response on transmission line with finite transit time delay $t_1 = \ell/u$, initial voltage launch $V_0 = \frac{Z_0}{Z_g + Z_0}V_g$, reflection coefficients $\Gamma_L, \Gamma_G$, and step-by-step lattice bounce diagram construction with steady-state asymptotic verification ($V_\infty = \frac{Z_L}{Z_L + Z_g}V_g$).
- [x] Item 16.7: Master Solved Problem Vault — Full step-by-step solutions with independent cross-checks for Sadiku Examples 11.3 (lossy line input impedance and currents), 11.4 (lossless line analytical vs Smith chart), 11.6 (slotted line wavelength and $Z_L$ extraction), 11.7 (antenna single-stub matching with dual solutions), and 11.8 (DC step transient bounce diagram).
- [x] Item 16.8: WebGL 3D Simulation Engine — Real-time multi-mode Babylon.js 7.30 laboratory: Interactive 3D Smith Chart with dynamic $r$-circles, $x$-arcs, $s$-circles, and rotatable $\Gamma$ phasor; 3D standing wave voltage interference envelope with live node/antinode markers; and 3D transient wave packet bounce simulator with live telemetry HUD.
- **Output HTML:** `STUDY SNAPS/EMT/sadiku_chapter11_transmission_lines_smith_chart_master.html` (Apple Calmness UI, MathJax LaTeX, Babylon.js 7.30 WebGL, Collapsible Drawers, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` and `STUDY SNAPS/notes1.html` under Core ECE and in `STUDY SNAPS/EMT/index.html` navigation sidebar.

---

## 📌 Batch 17 / EMT Batch 2CA: The Journey of Electromagnetic Waves (`EMT/`) — [COMPLETED ✅]
- [x] Item 17.1: Chapter 1 — The Day an Ordinary Wire Stopped Being Ordinary: Short wire approximation ($\ell \ll \lambda$), frequency transition ($v = f\lambda$), $\ell \ge \lambda/20$ criterion, low vs high frequency regimes, and core line geometries (Coaxial, Twisted Pair, Parallel Plate, Microstrip).
- [x] Item 17.2: Chapter 2 — The Cable Has a Hidden Internal Architecture: Infinitesimal line section $\Delta z$, physical origins of series loop $R\Delta z, L\Delta z$ and shunt transverse $G\Delta z, C\Delta z$, per-unit-length scaling, and space-time notation $V(z,t), I(z,t)$.
- [x] Item 17.3: Chapter 3 — Two Laws That Reveal a Travelling Wave: KVL closed loop balance, limit $\Delta z \to 0 \implies -\partial V/\partial z = RI + L\partial I/\partial t$, KCL nodal dielectric branch current split $-\partial I/\partial z = GV + C\partial V/\partial t$, coupled PDEs, and dimensional consistency proof.
- [x] Item 17.4: Chapter 4 — Making Time Disappear from Our Equations: Phasor steady-state transformation $\partial/\partial t \to j\omega$, uncoupling through spatial differentiation into Helmholtz wave equation $d^2V_s/dz^2 - \gamma^2V_s = 0$, and complex propagation constant $\gamma = \alpha + j\beta$.
- [x] Item 17.5: Chapter 5 — The Cable Has Two Travellers: Second-order exponential trial solution $V_s(z) = V_0^+ e^{-\gamma z} + V_0^- e^{+\gamma z}$, forward ($+z$) vs backward ($-z$) travelling waves, amplitude envelope $e^{-\alpha z}$ vs phase oscillation $\cos(\omega t \mp \beta z)$, characteristic impedance $Z_0 = \sqrt{\frac{R+j\omega L}{G+j\omega C}}$, and reverse current sign $V_0^- / I_0^- = -Z_0$.
- [x] Item 17.6: Chapter 6 — Two Lines, Two Different Promises: Signal harmonics (Fourier components), amplitude distortion vs phase delay dispersion; lossless line ($R=0, G=0, \alpha=0, u_p = 1/\sqrt{LC}$); distortionless line via Heaviside condition ($RC = GL \implies \alpha = \sqrt{RG}, u_p = 1/\sqrt{LC}$); exam rule: "Every lossless line is distortionless, but every distortionless line is not lossless".
- [x] Item 17.7: Chapter 7 — The Load Decides the Fate of the Wave: Load boundary mismatch $Z_L \ne Z_0$, full algebraic derivation of reflection coefficient $\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}$, matched ($\Gamma_L=0$), short ($\Gamma_L=-1$, voltage node), open ($\Gamma_L=+1$, voltage antinode), interference standing waves, VSWR $s = \frac{1+|\Gamma_L|}{1-|\Gamma_L|}$, impedance extrema $Z_{\text{in},\max}=sZ_0, Z_{\text{in},\min}=Z_0/s$, and geometric mean identity $\sqrt{Z_{\max}Z_{\min}} = Z_0$.
- [x] Item 17.8: Chapter 8 — The Hollow Pipe That Can Carry Electromagnetic Waves: Microwave waveguide transition, modes definition, TEM ($E_z=0, H_z=0$), TE ($E_z=0, H_z \ne 0$), and TM ($H_z=0, E_z \ne 0$); rigorous potential-theory proof via Laplace equation $\nabla_t^2\Phi=0$ explaining why hollow single-conductor pipes cannot support TEM; surviving TE/TM boundary conditions ($E_t=0, B_n=0$).
- [x] Item 17.9: Interactive Checkpoints: Built-in DOM self-evaluators for Concept Checks 01, 02, 03, 04, 05, 06, 07, and 08 with real-time feedback.
- [x] Item 17.10: Staged Assets & Lightbox: 18 high-resolution diagram figures staged to `assets/` and embedded with zoom lightboxes.
- [x] Item 17.11: WebGL 3D Simulation Engine: Real-time Babylon.js 7.30 laboratory: Coaxial TEM field vector visualizer and Low vs High Frequency traveling voltage waveform simulator with live telemetry HUD.
- **Output HTML:** `STUDY SNAPS/EMT/emt_journey_electromagnetic_waves.html` (Apple Calmness UI, MathJax LaTeX, Babylon.js 7.30 WebGL, Staged Assets, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` and `STUDY SNAPS/notes1.html` under Core ECE and in `STUDY SNAPS/EMT/index.html` navigation sidebar.

---

## 📌 Batch 18 / EMT Batch 3B: Sadiku Chapter 12 Waveguides Master Guide (`EMT/`) — [COMPLETED ✅]
- [x] Item 18.1: Section 12.1 & 12.2 — High-frequency pipe physics: Why single-conductor waveguides supersede two-conductor lines at microwave frequencies ($3 - 300\text{ GHz}$), proof of non-existence of TEM mode in hollow conductors, Maxwell Helmholtz wave PDEs, and separation-of-variables solutions for longitudinal fields $E_{zs}$ and $H_{zs}$.
- [x] Item 18.2: Section 12.3 — Transverse Magnetic ($\text{TM}_{mn}$) modes: Conducting wall Dirichlet boundary conditions, $k_x = m\pi/a, k_y = n\pi/b$, proof that $m,n \ge 1$ (why $\text{TM}_{10}$ and $\text{TM}_{01}$ cannot exist), and $\text{TM}_{11}$ lowest-order mode.
- [x] Item 18.3: Section 12.4 — Transverse Electric ($\text{TE}_{mn}$) modes: Conducting wall Neumann boundary conditions, complete field solutions, dominant $\text{TE}_{10}$ mode equations ($f_{c,10} = u'/2a, \lambda_{c,10} = 2a$), and conducting wall surface current density $\vec{K} = \hat{a}_n \times \vec{H}$.
- [x] Item 18.4: Section 12.5 — Waveguide dispersion and velocity hierarchy: Geometric plane wave zigzag decomposition at incidence angle $\theta$, superluminal phase velocity $u_p = u'/\sqrt{1-(f_c/f)^2} > c$, subluminal group velocity $u_g = u'\sqrt{1-(f_c/f)^2} < c$, relativistic product identity $u_p \cdot u_g = {u'}^2$, and guide wavelength $\lambda_g > \lambda_0$.
- [x] Item 18.5: Section 12.6 — Power transmission and wall attenuation: Time-average Poynting vector integral, wave impedances duality $\eta_{TE} \cdot \eta_{TM} = {\eta'}^2$, and conductor wall attenuation $\alpha_c$ analytical formula.
- [x] Item 18.6: Section 12.8 & 12.9 — Resonant cavities and optical fibers: Rectangular cavity standing wave modes ($f_{r,mnp} = \frac{u'}{2}\sqrt{(m/a)^2 + (n/b)^2 + (p/c)^2}$), dominant $\text{TE}_{101}$ mode quality factor $Q = \frac{(a^2+c^2)abc}{\delta[2b(a^3+c^3)+ac(a^2+c^2)]}$ (and $Q = a/3\delta$ for cubical cavity); optical fiber total internal reflection, numerical aperture $\text{NA} = \sqrt{n_1^2 - n_2^2}$, $V$-number, and mode volume $N \approx V^2/2$.
- [x] Item 18.7: Master Solved Problem Vault — Full step-by-step solutions for Sadiku Examples 12.1 (counting 15 modes below $15.1\text{ GHz}$), 12.4 (WR-340 guide $u_p$ and $u_g$), 12.8 (resonant cavity modes and $Q=14,358$), and 12.9 (step-index optical fiber $\text{NA}=0.21, N=2,176\text{ modes}$).
- [x] Item 18.8: WebGL 3D Simulation Engine — Real-time multi-mode Babylon.js 7.30 laboratory: Interactive 3D rectangular waveguide $\text{TE}_{10}$ electric field vector simulator, 3D zigzag reflection ray visualizer, and 3D closed cavity resonator standing wave simulator with live telemetry HUD.
- **Output HTML:** `STUDY SNAPS/EMT/sadiku_chapter12_waveguides_master.html` (Apple Calmness UI, MathJax LaTeX, Babylon.js 7.30 WebGL, Collapsible Drawers, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html` and `STUDY SNAPS/notes1.html` under Core ECE and in `STUDY SNAPS/EMT/index.html` navigation sidebar.

---

## 📌 Batch 19 / EMT Batch 4: Transmission Lines & Waveguide Handbook (`EMT/`) — [COMPLETED ✅]
- [x] Item 19.1: Module 1 — Physical Foundations: Transit time $t_r = \ell/v$ vs signal period $T$, four line configurations (Fig 2.1), distributed primary constants ($R, L, G, C$), infinitesimal equivalent sections (Fig 2.3), and Telegrapher's differential equations derivation.
- [x] Item 19.2: Module 2 — Helmholtz Wave Solutions & Line Parameters: Second-order wave equations, complex propagation constant $\gamma = \sqrt{(R+j\omega L)(G+j\omega C)} = \alpha + j\beta$, characteristic impedance $Z_0 = \sqrt{\frac{R+j\omega L}{G+j\omega C}}$, and forward/backward traveling wave voltage/current distributions.
- [x] Item 19.3: Module 3 — Finite Lines, Standing Waves & Impedance Transformation: Stationary standing waves (Fig 2.7), generalized reflection coefficient $\Gamma(l) = \Gamma_L e^{-2\gamma l}$, load reflection coefficient $\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}$, generalized input impedance $Z(l)$, quarter-wave inverter ($Z_{\text{in}} = Z_0^2/Z_L$), half-wave repeat ($Z(l+\lambda/2) = Z(l)$), and power transfer $P_L = \frac{|V^+|^2}{2Z_0}(1 - |\Gamma_L|^2)$.
- [x] Item 19.4: Module 4 — Lossless vs Low-Loss Lines: Lossless conditions ($R=0, G=0, \alpha=0, \beta=\omega\sqrt{LC}, Z_0=\sqrt{L/C}$) and low-loss binomial expansions ($\alpha \approx \frac{R}{2Z_0} + \frac{G Z_0}{2}, \beta \approx \omega\sqrt{LC}$).
- [x] Item 19.5: Module 5 — Waveguide Physics & Boundary Value Solutions: Modal plane wave reflection model (Fig 6.1, $\cos\theta = \frac{m\lambda}{2d}$), rigorous Ampere-Maxwell proof of the non-existence of TEM modes in hollow single-conductor guides, rectangular boundary conditions, cutoff frequencies $f_{c,mn}$, and dominant $TE_{10}$ mode ($\lambda_{c,10} = 2a$).
- [x] Item 19.6: Direct Reference Worked Numerical Problems: Examples 2.1 (transit time delay), 2.2 ($\gamma$ at 1 MHz and 1 GHz), 2.6 ($Z_0$ at 2 GHz), 2.8 (reflection coefficient and distance), and 6.7 ($4\text{ cm} \times 3\text{ cm}$ guide at 6 GHz, $TE_{10}$ field formulas, $1.55\text{ mW}$ transmitted power).
- [x] Item 19.7: Embedded Reference Figures & Lightbox: Staged high-resolution diagrams (`pdf_fig2_1_configurations.png`, `pdf_fig2_3_lumped_sections.png`, `pdf_fig2_7_standing_waves.png`, `pdf_fig6_1_waveguide_reflection.png`) with interactive zoom lightboxes.
- [x] Item 19.8: WebGL 3D Simulation Engine: Dual-mode Babylon.js 7.30 laboratory featuring (1) 3D Transmission Line standing wave and voltage envelope visualizer, and (2) 3D Rectangular Waveguide $TE_{10}$ transverse electric field vector simulation with live telemetry HUD.
- [x] Item 19.9: Interactive Checkpoints: 4 comprehensive interactive quiz widgets (Transit Time Regimes, Quarter-Wave Transformation, TEM Non-existence, and Dominant Cutoff Frequency) with real-time feedback.
- **Output HTML:** `STUDY SNAPS/EMT/transmission_lines_waveguide_handbook.html` (Apple Calmness UI, MathJax LaTeX, Babylon.js 7.30 WebGL, Zero Gimmicks).
- **Mounted in Hub:** Wired to `notes1.html`, `STUDY SNAPS/notes1.html`, and `STUDY SNAPS/EMT/index.html`.
