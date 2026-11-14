# AWS Cloud & Python Code Visualizer — Master Backlog

## Target Artifacts
- **Master Lab Manual:** `AWS_Experiments/index.html`
- **Python 100-Q & AWS Revision Dashboard:** `AWS_Experiments/aws_python_exam_notes.html`

---

## Python Algorithm 3D WebGL Roadmap

### [COMPLETED] Batch 1: Memory & Pointer Mutation Traps
- [x] **Q10 (Set 1): Matrix Comprehension vs Multiplier Aliasing Trap**
  - Interactive 3D 3×3 memory grid (`gl_matrix`)
  - Mode toggle: List Comprehension (3 independent heap rows) vs `[[0]*3]*3` (3 pointers sharing 1 physical row)
  - Interactive mutation button `matrix[0][0] = 9` showing single-cell update vs whole-matrix aliased corruption
  - Verified against CPython `id(row0) == id(row1)` pointer behavior
- [x] **Q22 (Set 2): Pass-by-Object-Reference & In-Place Mutation vs Rebinding**
  - Interactive 3D heap container engine (`gl_ref_mutation`)
  - 5-step walkthrough: Caller `a` points to `0xA0` → `f(l=a)` attaches → `l.append(1)` mutates `0xA0` in-place → `l = [9]` allocates new heap box `0xB9` and rebinds local `l` without altering `a`
  - Calibrated studio matte finish with live step telemetry

### [COMPLETED] Batch 2: Recursion & Call Stacks
- [x] **Q23 (Set 2): Recursive Factorial Call Stack Push & Pop Unwinding**
  - 3D call stack vertical column showing `f(5)` descending to `f(1)` base case and resolving multiplications back up
- [x] **Q17 (Set 2): Mathematical Integer Digit Peeler & Reverser**
  - 3D digit accumulator demonstrating `n % 10` peeling and `s * 10 + d` shifting (1234 → 4321)

### [COMPLETED] Batch 3: OOP Memory & MRO Diamond Hierarchy
- [x] **Q14 (Set 1): Method Resolution Order (C3 Linearization across Class D(B, C))**
  - 3D inheritance tree with active search probe
- [x] **Q6 (Set 1): Class Variable vs Instance Variable Ticket Dispenser**
  - Master class counter pillar stamping individual instance ticket blocks
