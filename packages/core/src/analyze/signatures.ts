export interface ErrorSignature {
  id: string;
  pattern: RegExp;
  severity: "critical" | "medium" | "low";
  type: "dependency_manager" | "runtime" | "config" | "build" | "native_module";
  platforms: string[];
}

export const ERROR_SIGNATURES: ErrorSignature[] = [
  {
    id: "PNPM_NOT_FOUND",
    pattern: /pnpm: command not found|pnpm: not found/i,
    severity: "critical",
    type: "dependency_manager",
    platforms: ["render"]
  },
  {
    id: "NODE_VERSION_MISMATCH",
    pattern: /Unsupported engine: node|The engine "node" is incompatible/i,
    severity: "medium",
    type: "runtime",
    platforms: ["vercel", "render"]
  },
  {
    id: "BUN_RUNTIME_ERROR",
    pattern: /bun: command not found|cannot find module 'bun'/i,
    severity: "critical",
    type: "runtime",
    platforms: ["vercel", "render"]
  },
  {
    id: "BUILD_COMMAND_NOT_FOUND",
    pattern: /build command not found|command not found/i,
    severity: "critical",
    type: "build",
    platforms: ["vercel", "render"]
  },
  {
    id: "NATIVE_MODULE_BUILD_FAIL",
    pattern: /bcrypt|sharp|sqlite3|canvas.*rebuild|node-gyp/i,
    severity: "medium",
    type: "native_module",
    platforms: ["vercel", "render"]
  },
  {
    id: "MISSING_ENV_VAR",
    pattern: /process\.env\..*is not defined|undefined.*environment/i,
    severity: "medium",
    type: "config",
    platforms: ["vercel", "render"]
  }
];