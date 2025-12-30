import { ERROR_SIGNATURES, ErrorSignature } from "./signatures";

export interface NormalizedError {
  id: string;
  type: string;
  message: string;
  severity: "critical" | "medium" | "low";
  platforms: string[];
  details?: any;
}

export function normalizeLog(rawLog: string): NormalizedError | null {
  for (const sig of ERROR_SIGNATURES) {
    if (sig.pattern.test(rawLog)) {
      return {
        id: sig.id,
        type: sig.type,
        message: rawLog.match(sig.pattern)?.[0] || "Pattern matched",
        severity: sig.severity,
        platforms: sig.platforms
      };
    }
  }
  return null;
}