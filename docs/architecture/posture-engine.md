# Posture Engine

The posture engine is where ClawSeatbelt turns scattered signals into one operator decision surface. It ingests ClawSeatbelt findings, normalized OpenClaw security audit JSON, and current configuration posture, then emits three things:

- a chat-native posture card
- a machine-readable snapshot
- a diff against a prior snapshot

## State Machine

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> CollectingInputs: status requested
  CollectingInputs --> NormalizingAudit: audit file supplied
  CollectingInputs --> BuildingSnapshot: local posture only
  NormalizingAudit --> BuildingSnapshot: audit findings normalized
  BuildingSnapshot --> DiffingSnapshot: previous snapshot supplied
  BuildingSnapshot --> EmittingCard: no diff requested
  DiffingSnapshot --> EmittingCard: card requested
  DiffingSnapshot --> ExportingJson: json requested
  EmittingCard --> [*]
  ExportingJson --> [*]
```

## Sequence

```mermaid
sequenceDiagram
  participant Operator as Operator
  participant Adapter as Plugin Adapter
  participant Config as Config Audit
  participant Audit as Audit Ingestor
  participant Posture as Posture Engine
  participant Disk as Snapshot Store

  Operator->>Adapter: /clawseatbelt-status --audit-file --diff-file --json
  Adapter->>Config: assess current OpenClaw config
  Adapter->>Audit: normalize audit JSON
  Audit-->>Adapter: audit findings
  Adapter->>Disk: read prior snapshot
  Disk-->>Adapter: prior posture snapshot
  Adapter->>Posture: build summary + diff
  Posture-->>Adapter: card, snapshot, diff
  Adapter->>Disk: write new snapshot (optional)
  Adapter-->>Operator: posture json or shareable card
```

## Data Flow

```mermaid
flowchart LR
  A[OpenClaw config] --> B[Config Audit]
  C[ClawSeatbelt runtime findings] --> E[Posture Engine]
  D[OpenClaw security audit JSON] --> F[Audit Ingestor]
  B --> E
  F --> E
  G[Previous posture snapshot] --> H[Diff Engine]
  E --> H
  E --> I[Chat-native posture card]
  E --> J[Machine-readable snapshot]
  H --> K[Diff summary]
```

## Design Notes

- The hot path stays local and cheap. Audit ingestion and diffing happen only on demand.
- Imported OpenClaw audit findings are normalized into ClawSeatbelt findings so one remediation model can drive the output.
- Snapshot format is versioned so later releases can evolve the structure without silent breakage.
