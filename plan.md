# ClawSeatbelt Plan

## Objective

Make ClawSeatbelt the default trust plugin for OpenClaw: the first install people recommend, the one cautious operators keep, and the baseline every competitor is forced to answer.

## The Real Win Condition

We do not become number one by matching every feature headline from MoltGuard, SecureClaw, PolicyShield, SafeFence, and Berry Shield. That path ends in sprawl.

We become number one by winning the rubrics users actually use to choose:

1. Fastest path to trust.
2. Lowest operational burden.
3. Clearest explanation of risk and remediation.
4. Strongest local baseline.
5. Best supply-chain hygiene before runtime damage begins.
6. Tightest composition with OpenClaw’s built-in controls.

If ClawSeatbelt owns those six, it becomes the default choice even when heavier systems still exist upstream.

## Current Position

### What Is Already True

- Core local plugin runtime exists.
- Inbound scoring, tool-result redaction, skill scanning, posture reporting, and runtime modes exist.
- Architecture docs, release docs, package metadata, tests, and a competitor artifact benchmark exist.
- The product already has a credible local-first thesis with no account requirement and no hot-path cloud dependency.

### What Is Still Missing

- live runtime proof inside a disposable OpenClaw instance
- side-by-side competitor benchmark evidence
- deeper skill supply-chain inspection and install-time UX
- first-class posture orchestration around `openclaw security audit --json`, tool policy, exec approvals, pairing, and allowlists
- stronger provenance and release trust signals
- distribution proof: npm publication, community listing, and operator adoption loop

## Rubrics We Must Win

| Rubric | Current Position | Number One Standard |
|---|---|---|
| Local-first trust | Strong thesis, implemented baseline | No account, no server, no telemetry by default, no cloud in hot path, clear offline value on day one |
| Install friction | Good docs, package ready | One install, one command, one useful posture report within minutes |
| Operator comprehension | Good posture primitives | Findings read like a sharp operator brief, not scanner noise |
| Supply-chain safety | Early skill scanning exists | Best pre-install skill inspector in the ecosystem, with version pin, provenance, permission, and `curl \| bash` style risk detection |
| OpenClaw-native composition | Partial | Seamless posture view over `security audit`, tool policy, exec approvals, pairing, plugin allowlists, and transcript hygiene |
| Runtime guardrails | Baseline exists | Fast, deterministic, explainable hooks with strong audit and enforce semantics |
| Benchmark proof | Artifact benchmark only | Reproducible live corpus benchmark against top competitors in the same OpenClaw lab |
| Packaging and provenance | Ready but thin | Signed releases, provenance notes, reproducible pack checks, minimal footprint, transparent dependency story |
| Interoperability | Minimal | Optional export and bridge paths into PolicyShield style rules and hosted detectors without giving up the local baseline |
| Distribution and trust capture | Docs ready, not yet proven | Published package, community listing, benchmark write-up, memorable quickstart, and a demo corpus that makes the value obvious |

## Competitive Response Map

### MoltGuard

Beat it on privacy, simplicity, and no-account operation. Do not try to out-market its hosted detection story. Later, offer an optional provider bridge if that helps adoption.

### SecureClaw

Beat it on clarity, composability, and day-one operator experience. Avoid script sprawl, installer drama, and "suite" bloat.

### PolicyShield

Beat it on zero-server baseline and time-to-value. Interoperate later by exporting policy packs or findings, not by copying its control plane.

### SafeFence And Berry Shield

Beat them on polish, documentation, verification rigor, and shareable posture UX. Early competitors often cover hooks. Few make the system feel inevitable.

### OpenClaw Built-Ins

Do not compete with first-party controls. Wrap them, explain them, and make them visible. If a user can get the same answer from `openclaw security audit --fix`, ClawSeatbelt must add explanation, sequencing, and continuous posture value.

## Product Pillars

### 1. Universal Local Baseline

ClawSeatbelt must remain genuinely useful without accounts, dashboards, or remote services. This is the wedge. Protect it.

### 2. Posture As A Product

The single most persuasive surface should be a compact, shareable posture report that turns scattered OpenClaw controls into one calm, legible view.

### 3. Skill Supply-Chain Defense

The market talks about runtime safety. The ecosystem’s real wound is unsafe trust expansion. Skill inspection must become a first-class moat.

### 4. Deterministic Guardrails

Hot-path behavior must stay cheap, typed, explainable, and predictable under audit and enforce modes.

### 5. Proof Over Claims

Every meaningful claim should be backed by a reproducible benchmark, a test corpus, or a live operator walkthrough.

## Strategic Workstreams

### Workstream A. Benchmark Truth

Status: `in_progress`

- [ ] Build a disposable OpenClaw benchmark harness with scripted install, config, and teardown.
- [ ] Create a shared adversarial corpus covering prompt injection, dangerous tool requests, secret-like outputs, and malicious skill bundles.
- [ ] Run ClawSeatbelt, MoltGuard, SecureClaw, and PolicyShield against the same corpus where practical.
- [ ] Publish methodology, caveats, and raw result artifacts in `docs/benchmarks/`.
- [ ] Use results to tune product behavior before using them in external positioning.

### Workstream B. Unified Posture Engine

Status: `completed`

- [x] Ingest `openclaw security audit --json` into the posture report.
- [x] Model tool policy, exec approvals, pairing, plugin allowlists, and redaction settings as one posture graph.
- [x] Generate operator-facing remediation plans with clear priority and rationale.
- [x] Add a concise chat-native posture card and a machine-readable JSON export.
- [x] Support diff views so users can see posture changes over time.

### Workstream C. Skill Supply-Chain Moat

Status: `pending`

- [ ] Expand the scanner to score version pinning, script provenance, suspicious permission expansion, remote installer patterns, and hidden execution paths.
- [ ] Add install-time and continuous-watch workflows so scanning happens before trust silently expands.
- [ ] Produce concrete remediation language, not only raw findings.
- [ ] Build a richer malicious and borderline corpus grounded in real ecosystem abuse patterns.
- [ ] Document what ClawSeatbelt can and cannot prove about a skill bundle.

### Workstream D. Runtime Guardrail Depth

Status: `pending`

- [ ] Deepen `before_prompt_build`, `before_tool_call`, `tool_result_persist`, and outbound message controls against real sample traffic.
- [ ] Add richer evidence objects and remediation metadata to every finding.
- [ ] Tighten enforce-mode policy around destructive tools and secret exfiltration paths.
- [ ] Preserve strict hot-path performance budgets with explicit tests.
- [ ] Add soak tests inside a live OpenClaw runtime.

### Workstream E. Trust, Packaging, And Provenance

Status: `pending`

- [ ] Publish the package and verify the install path from a clean machine.
- [ ] Add signed release and provenance automation where the toolchain supports it.
- [ ] Ship a tiny, inspectable artifact with an explicit dependency story.
- [ ] Add release verification steps that operators can run in minutes.
- [ ] Make the trust posture obvious in `README.md` and the community listing.

### Workstream F. Distribution And Adoption

Status: `pending`

- [ ] Publish the npm package and submit the OpenClaw community plugin listing.
- [ ] Ship a benchmark-backed quickstart that shows value in under five minutes.
- [ ] Prepare a minimal demo corpus so users can see redaction, posture, and skill scanning immediately.
- [ ] Create release notes that explain why to upgrade, not only what changed.
- [ ] Establish a release cadence that signals reliability without churn.

### Workstream G. Interoperability Without Surrender

Status: `pending`

- [ ] Export baseline findings or policy packs that server-backed systems can ingest.
- [ ] Explore an optional hosted-detector bridge that remains off by default and off the hot path.
- [ ] Keep the local baseline complete even when interop grows.

## Execution Sequence

### Phase 0. Base Product

Status: `completed`

- [x] Foundation, architecture, runtime core, hardening pass, release docs, and artifact benchmark.

### Phase 1. Category Proof

Status: `in_progress`

- [ ] Live OpenClaw soak test.
- [ ] Competitor benchmark harness.
- [ ] Shared corpus and documented methodology.

### Phase 2. Default-Install Experience

Status: `in_progress`

- [x] Unified posture engine over first-party OpenClaw controls.
- [x] Better status surfaces and remediation plans.
- [ ] Install-time trust report that demonstrates value instantly.

### Phase 3. Supply-Chain Leadership

Status: `pending`

- [ ] Best-in-class skill inspection.
- [ ] Provenance and version trust checks.
- [ ] Continuous watch and richer corpus coverage.

### Phase 4. Trust Capture

Status: `pending`

- [ ] npm publication.
- [ ] Community listing.
- [ ] Benchmark-backed public launch material.

### Phase 5. Upmarket Interop

Status: `pending`

- [ ] Optional policy export and provider bridges.
- [ ] Team-ready integrations without bloating the baseline.

## Immediate Sprint

1. Publish `clawseatbelt` and verify fresh-install behavior.
2. Run ClawSeatbelt end to end in a disposable OpenClaw instance.
3. Build the first live benchmark harness and corpus.
4. Use the new posture snapshot and diff surface to drive install-time trust reporting.
5. Expand the skill scanner around provenance, remote installer, and permission-risk heuristics.
6. Submit the community plugin listing once the install path is proven.

## Anti-Goals

- Do not require accounts or hosted services for baseline protection.
- Do not drift into a vague "AI firewall" product story.
- Do not replace OpenClaw controls that already exist unless ClawSeatbelt adds clearer operator value.
- Do not add opaque magic that users cannot inspect or reason about.
- Do not let dashboards or control planes become prerequisites for trust.

## Definition Of Number One

ClawSeatbelt is number one when:

- a careful OpenClaw user can install it and get a useful posture report within minutes
- the local baseline is clearly stronger and easier to trust than hosted or server-bound alternatives
- skill supply-chain inspection is the best operator experience in the ecosystem
- live benchmark evidence shows ClawSeatbelt is competitive on the attacks users actually face
- the plugin is the easiest serious recommendation to make in docs, threads, and community support
