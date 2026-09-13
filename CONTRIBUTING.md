# Contributing to ZG0D-FF

First off, thank you for considering contributing! This repository spans systems architecture, edge AI deployments, IoT/hardware integration, web dashboards, and technical notes.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to **ZGODMR@gmail.com**.

---

## Target Branch & Workflow

All development and pull requests must target the active development branch: **`main2`**.

We follow the standard GitHub Flow:
1. **Fork** the repository to your own GitHub account.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/ZG0D-FF.git
   cd ZG0D-FF
   git checkout main2
   ```
3. **Create a topic branch** from `main2`:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
4. **Implement your changes** and test thoroughly.
5. **Commit** your changes following our commit conventions (see below).
6. **Push** your branch to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
7. **Open a Pull Request** against `main2` on `ZG0D-FF/ZG0D-FF`.

---

## Contribution Areas

We welcome contributions across several focus areas:

### 1. Embedded Systems & Hardware Circuits
- 8051 / 8085 assembly routines, experiments, and timing diagrams.
- Arduino / ESP32 / Raspberry Pi IoT sensor pipelines and schematics.
- TinyML model quantizations, C++ inference engines, and low-latency edge scripts.
- **Requirement:** Include circuit pinouts, board revisions, or simulation output (Proteus, Keil, Wokwi, etc.) in your PR.

### 2. Web, Dashboard & Cloud Architecture
- Real-time telemetry interfaces, HUD visualization improvements, and responsive styles.
- Edge workers (Cloudflare Workers, Supabase functions, Vercel deployments).
- Performance optimizations and asset compression.

### 3. Academic & Technical Notes
- Clarifications, corrections, and additions to ECE curriculum notes (8085, 8051, VLSI, DBMS, Digital Logic, ITC).
- Mathematical derivations and signal processing explanations.
- **Requirement:** Cite textbook references or official datasheets when correcting technical specifications.

### 4. Bug Fixes & Code Hardening
- AST-level security fixes, memory leak resolution, and cross-platform path handling.

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types:
- `feat`: A new feature, circuit implementation, or dashboard component.
- `fix`: A bug fix.
- `docs`: Documentation, README, or study notes changes.
- `style`: Formatting, whitespace, or cosmetic UI adjustments.
- `refactor`: Code restructuring without changing functionality.
- `perf`: Latency reduction, model quantization, or memory optimization.
- `chore`: Build tasks, repository maintenance, or GitHub Actions.

**Examples:**
```bash
feat(tinyml): add int8 tflite quantization script for avian distress model
fix(dashboard): correct sensor gauge clipping on mobile viewports
docs(8085): add timing diagram explanation for lxi instruction
```

---

## Security & Secrets Protocol

- **Never** commit API keys, database credentials, authentication tokens, or `.env` files.
- If your contribution introduces environment variables, document them in an `.env.example` file with placeholder values.
- Vulnerabilities should be reported responsibly per our [Security Policy](SECURITY.md).

---

## Pull Request Guidelines

Before submitting your PR, ensure:
- [ ] Your PR targets the **`main2`** branch.
- [ ] Code has been tested locally or verified on physical hardware/simulators.
- [ ] No extraneous build artifacts, temporary logs, or node_modules are included.
- [ ] Commit history is clean and follows conventional commit format.
- [ ] The PR template is completely filled out with adequate context.
