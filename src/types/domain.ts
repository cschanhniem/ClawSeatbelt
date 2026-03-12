export type Severity = "low" | "medium" | "high" | "critical";
export type RiskCategory =
  | "prompt-injection"
  | "shell-execution"
  | "obfuscation"
  | "credential-harvest"
  | "suspicious-url"
  | "secret-exposure"
  | "skill-supply-chain"
  | "configuration";

export interface Remediation {
  summary: string;
  action?: string;
}

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  category: RiskCategory;
  score: number;
  evidence: string[];
  rationale: string;
  remediation: Remediation;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface RiskEvaluation {
  score: number;
  severity: Severity;
  findings: Finding[];
  recommendedMode: "allow" | "warn" | "hold";
}

export interface RedactionResult {
  original: string;
  sanitized: string;
  findings: Finding[];
}

export interface SkillFileReport {
  path: string;
  findings: Finding[];
}

export interface SkillScanReport {
  root: string;
  score: number;
  severity: Severity;
  files: SkillFileReport[];
  findings: Finding[];
}

export interface OpenClawAuditMetadata {
  sourcePath?: string;
  generatedAt?: string;
  findingCount: number;
  rawSummary?: string;
}

export interface OpenClawAuditReport {
  findings: Finding[];
  metadata: OpenClawAuditMetadata;
}

export type PostureFacetStatus = "stable" | "watch" | "action" | "critical";

export interface PostureFacet {
  id: string;
  label: string;
  score: number;
  severity: Severity;
  status: PostureFacetStatus;
  findingIds: string[];
  summary: string;
}

export interface PostureInput {
  inbound?: RiskEvaluation;
  redaction?: RedactionResult;
  skillScan?: SkillScanReport;
  configurationFindings?: Finding[];
  openClawAudit?: OpenClawAuditReport;
  generatedAt?: string;
}

export interface PostureSnapshot {
  formatVersion: 1;
  generatedAt: string;
  headline: string;
  score: number;
  severity: Severity;
  findings: Finding[];
  remediationSteps: string[];
  shareMessage: string;
  facets: PostureFacet[];
  sources: string[];
  audit?: OpenClawAuditMetadata;
}

export interface PostureDiff {
  headline: string;
  previousScore: number;
  currentScore: number;
  scoreDelta: number;
  introducedFindingIds: string[];
  resolvedFindingIds: string[];
  unchangedFindingIds: string[];
}

export interface PostureSummary extends PostureSnapshot {
  card: string;
  diff?: PostureDiff;
}
