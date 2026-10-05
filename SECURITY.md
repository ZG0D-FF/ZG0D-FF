# 🔐 Security Policy & Intellectual Property

**Project:** ZG0D-FF Architecture & Systems  
**Author:** Dibyajyotee Ghosh (ZG0D-FF)  
**Affiliation:** Institute of Engineering & Management (IEM), Kolkata  
**Profile:** [github.com/ZG0D-FF](https://github.com/ZG0D-FF) · [LinkedIn](https://www.linkedin.com/in/dibyajyotee-ghosh-06a24631a/)  
**Last Updated:** September 2026  

---

## 🛡️ Supported Versions

We actively maintain and provide security patches for the following project components:

| Component / System | Branch / Scope | Supported | Notes |
| :--- | :--- | :---: | :--- |
| **Active R&D Codebase** | `main2` | :white_check_mark: | Primary development and hardened branch |
| **PoultryHealth-AI** | `aidata/`, `notes/` | :white_check_mark: | Edge bioacoustic ML inference & TFLite pipelines |
| **Edge-Olfaction Logistics** | `ADC/`, `RAIN/` | :white_check_mark: | Dual-processor sensor telemetry & Haar DWT filters |
| **Serverless Edge APIs** | `workers/` | :white_check_mark: | Cloudflare Workers, Redis caching, Supabase keep-alive |
| **Interactive Dashboard & Web** | Root web clients | :white_check_mark: | Sanitized DOM, SRI verified CDN scripts, zero inline secrets |
| **Legacy Archives** | `main` | :x: | Archived baseline; migrated to `main2` |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, credential exposure, or exploit within this repository, please report it responsibly:

1. **Email:** Send full technical details to **[ZGODMR@gmail.com](mailto:ZGODMR@gmail.com)** with the subject line `[SECURITY VULNERABILITY] - <Component Name>`.
2. **GitHub Security Advisory:** Submit a private vulnerability report via the [Security Advisories](https://github.com/ZG0D-FF/ZG0D-FF/security/advisories/new) tab.
3. **DO NOT** open public GitHub issues for undisclosed vulnerabilities or zero-day exploits.

### Disclosure Timeline & SLA
- **Initial Response:** Within 24–48 hours confirming receipt.
- **Triage & Assessment:** Within 72 hours with an initial severity rating.
- **Fix & Deployment:** Critical vulnerabilities patched within 7–14 days.
- **Public Disclosure:** Coordinated after patch deployment to `main2`.

---

## 🔒 Security Architecture & Hardening Measures

This repository enforces strict defensive practices across its hardware-AI surface:

1. **Edge Node & Sensor Telemetry Security**:
   - Hardware sensor buffers validate frame bounds before passing to signal processing pipelines (Haar DWT / Fuzzy Logic).
   - Microcontroller UART communication enforces structured packet framing to prevent buffer overflows.

2. **Serverless APIs & Cloud Security**:
   - Zero hardcoded API keys, JWT secrets, or administrative tokens in client-facing bundles.
   - Cloudflare Worker edge endpoints enforce strict parameter validation, type-checking, and rate limiting.

3. **DOM Security & XSS Mitigation**:
   - Zero dynamic HTML interpolation via `innerHTML` without explicit sanitization.
   - Text rendering utilizes safe `textContent` / `replaceChildren` DOM APIs.
   - Remote script imports enforce Subresource Integrity (SRI) cryptographic SHA-384 hashes.

4. **Automated Continuous Security**:
   - GitHub Actions automated CodeQL semantic code analysis.
   - Semgrep static application security testing (SAST) on worker logic.
   - OSV vulnerability scanning on package lockfiles.

---

## ⚖️ Intellectual Property & Plagiarism Policy

**Copyright © 2026 Dibyajyotee Ghosh (ZG0D-FF). All rights reserved.**

### What Is Permitted :white_check_mark:
- Studying, forking, and reviewing the architecture for educational and research purposes.
- Utilizing code under the terms of the [MIT License](./LICENSE) with explicit attribution.
- Submitting pull requests to harden security, optimize DSP algorithms, or improve inference latency.

### What Is Strictly Prohibited :x:
- Plagiarizing architecture, research pipelines, or code without prominent attribution.
- Stripping copyright notices, author banners, or license headers from any file.
- Commercial redistribution of proprietary edge models or telemetry logic without written consent.

### Proper Attribution Template
```markdown
Architecture derived from: ZG0D-FF (Dibyajyotee Ghosh)
Repository: https://github.com/ZG0D-FF/ZG0D-FF
License: MIT License (Copyright (c) 2026 Dibyajyotee Ghosh)
```

---

*For security inquiries, licensing questions, or collaboration: [ZGODMR@gmail.com](mailto:ZGODMR@gmail.com)*
