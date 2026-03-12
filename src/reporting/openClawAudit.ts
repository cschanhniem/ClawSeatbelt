import { severityFromScore } from "../core/severity.js";
import type { Finding, OpenClawAuditMetadata, OpenClawAuditReport, Severity } from "../types/domain.js";

const CANDIDATE_ARRAY_PATHS = [
  "findings",
  "issues",
  "checks",
  "results",
  "items",
  "audit.findings",
  "audit.checks",
  "report.findings",
  "report.checks"
] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readPath(source: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (!isObject(current)) {
      return undefined;
    }
    return current[key];
  }, source);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function normalizeSeverity(value: unknown): Severity | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.toLowerCase();
  if (normalized === "critical") {
    return "critical";
  }
  if (normalized === "high" || normalized === "error" || normalized === "fail" || normalized === "failed") {
    return "high";
  }
  if (normalized === "medium" || normalized === "warning" || normalized === "warn") {
    return "medium";
  }
  if (normalized === "low" || normalized === "info") {
    return "low";
  }
  return undefined;
}

function scoreFromSeverity(severity: Severity): number {
  switch (severity) {
    case "critical":
      return 34;
    case "high":
      return 24;
    case "medium":
      return 16;
    case "low":
      return 8;
  }
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function normalizeEvidence(entry: Record<string, unknown>): string[] {
  const evidence: string[] = [];
  const explicit = entry.evidence;

  if (Array.isArray(explicit)) {
    for (const item of explicit) {
      if (typeof item === "string" && item.trim().length > 0) {
        evidence.push(item.trim());
      } else if (isObject(item)) {
        const rendered = [item.path, item.key, item.value, item.message]
          .map((value) => (typeof value === "string" ? value.trim() : ""))
          .filter(Boolean)
          .join(": ");
        if (rendered) {
          evidence.push(rendered);
        }
      }
    }
  }

  const fallback = [
    stringValue(entry.path),
    stringValue(entry.setting),
    stringValue(entry.status),
    stringValue(entry.message)
  ].filter((value): value is string => Boolean(value));

  for (const item of fallback) {
    if (!evidence.includes(item)) {
      evidence.push(item);
    }
  }

  return evidence;
}

function isPassingStatus(value: unknown): boolean {
  if (value === true) {
    return true;
  }
  if (typeof value !== "string") {
    return false;
  }
  return ["ok", "pass", "passed", "healthy", "success", "skipped"].includes(value.toLowerCase());
}

function findAuditEntries(input: Record<string, unknown>): Record<string, unknown>[] {
  for (const path of CANDIDATE_ARRAY_PATHS) {
    const value = readPath(input, path);
    if (Array.isArray(value) && value.every((entry) => isObject(entry))) {
      return value as Record<string, unknown>[];
    }
  }
  return [];
}

function buildAuditFinding(entry: Record<string, unknown>, index: number): Finding | undefined {
  if (entry.ok === true || entry.passed === true || isPassingStatus(entry.status)) {
    return undefined;
  }

  const title =
    stringValue(entry.title) ??
    stringValue(entry.name) ??
    stringValue(entry.message) ??
    stringValue(entry.summary) ??
    stringValue(entry.id);

  if (!title) {
    return undefined;
  }

  const severity =
    normalizeSeverity(entry.severity) ??
    normalizeSeverity(entry.level) ??
    normalizeSeverity(entry.status) ??
    severityFromScore(typeof entry.score === "number" ? entry.score : 16);
  const score = typeof entry.score === "number" && Number.isFinite(entry.score) ? entry.score : scoreFromSeverity(severity);

  const remediationSummary =
    stringValue(readPath(entry, "remediation.summary")) ??
    stringValue(entry.remediation) ??
    stringValue(entry.fix) ??
    stringValue(entry.recommendation) ??
    stringValue(entry.action) ??
    "Review the OpenClaw audit finding and apply the recommended fix.";

  const rationale =
    stringValue(entry.rationale) ??
    stringValue(entry.description) ??
    stringValue(entry.reason) ??
    stringValue(entry.message) ??
    title;
  const normalizedId =
    stringValue(entry.id) ??
    stringValue(entry.code) ??
    slugify(title) ??
    `finding-${index + 1}`;

  return {
    id: `audit-${normalizedId}`,
    title,
    severity,
    category: "configuration",
    score,
    evidence: normalizeEvidence(entry),
    rationale,
    remediation: {
      summary: remediationSummary,
      action: stringValue(entry.action) ?? stringValue(entry.fix)
    },
    source: "openclaw-security-audit",
    metadata: {
      status: stringValue(entry.status),
      path: stringValue(entry.path),
      originalId: stringValue(entry.id)
    }
  };
}

function summarizeAuditReport(input: Record<string, unknown>, findings: Finding[]): string | undefined {
  const summary = stringValue(readPath(input, "summary.message")) ?? stringValue(input.summary);
  if (summary) {
    return summary;
  }
  if (findings.length === 0) {
    return "OpenClaw audit report contained no active findings.";
  }
  return `OpenClaw audit contributed ${findings.length} active finding(s).`;
}

export function normalizeOpenClawAuditReport(
  input: unknown,
  options?: { sourcePath?: string }
): OpenClawAuditReport {
  if (!isObject(input)) {
    throw new Error("OpenClaw audit payload must be a JSON object.");
  }

  const entries = findAuditEntries(input);
  const findings = entries
    .map((entry, index) => buildAuditFinding(entry, index))
    .filter((finding): finding is Finding => Boolean(finding));
  const metadata: OpenClawAuditMetadata = {
    sourcePath: options?.sourcePath,
    generatedAt:
      stringValue(readPath(input, "generatedAt")) ??
      stringValue(readPath(input, "summary.generatedAt")) ??
      stringValue(input.timestamp),
    findingCount: findings.length,
    rawSummary: summarizeAuditReport(input, findings)
  };

  return {
    findings,
    metadata
  };
}
