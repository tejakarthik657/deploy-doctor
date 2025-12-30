import { normalizeLog, NormalizedError } from "./analyze/normalizeLog";
import { detectPlatform } from "./context/detectPlatform";
import { detectPackageManager } from "./context/detectPackageManager";
import { detectLanguage } from "./context/detectLanguage";
import { detectOS } from "./context/osInspector";
import { loadProfile } from "./profiles";
import { getRepoContext, RepoContext } from "./context/repoScanner";
import { rules } from "./rules";
import { applyFix } from "./fix/patchApplier";
import { rollbackFix } from "./fix/rollback";
import { runBuild } from "./verify/runBuild";
import { generateDiff } from "./fix/diffGenerator";
import { getPackageManager } from "./context/packageManager";

export interface EngineContext {
  platform: "vercel" | "render" | "unknown";
  packageManager: "npm" | "pnpm" | "bun";
  language: "javascript" | "typescript";
  os: "windows" | "linux" | "mac";
  profile: any;
  error: NormalizedError | null;
  repo: RepoContext;
  pm: any;
}

export class DeployDoctorEngine {
  private ctx: EngineContext;

  constructor() {
    this.ctx = {} as EngineContext;
  }

  private async buildContext() {
    this.ctx.platform = detectPlatform();
    this.ctx.packageManager = detectPackageManager();
    this.ctx.language = detectLanguage();
    this.ctx.os = detectOS();
    this.ctx.profile = loadProfile(this.ctx.platform);
    this.ctx.repo = await getRepoContext();
    this.ctx.pm = getPackageManager(this.ctx.packageManager);
  }

  private analyzeFailure(rawLog: string) {
    const error = normalizeLog(rawLog);
    this.ctx.error = error;
  }

  private findApplicableRule() {
    if (!this.ctx.error) return null;

    for (const rule of rules) {
      if (rule.match(this.ctx)) {
        return rule;
      }
    }
    return null;
  }

  private async applyAndVerify(rule: any) {
    const fix = rule.generateFix(this.ctx);

    try {
      applyFix(fix);

      const success = await runBuild(this.ctx.profile);

      if (!success) {
        rollbackFix(fix);
        return {
          status: "failed",
          reason: "Verification failed"
        };
      }

      return {
        status: "fixed",
        fix
      };

    } catch (err) {
      rollbackFix(fix);
      return {
        status: "error",
        error: err
      };
    }
  }

  async run(rawLog: string, options = { verify: true, dryRun: false }) {
    await this.buildContext();
    this.analyzeFailure(rawLog);

    if (!this.ctx.error) {
      return {
        status: "unknown",
        message: "Could not identify failure"
      };
    }

    const rule = this.findApplicableRule();

    if (!rule) {
      return {
        status: "unresolved",
        error: this.ctx.error
      };
    }

    const fix = rule.generateFix(this.ctx);

    if (options.dryRun) {
      const diff = generateDiff(fix);
      return { status: "analyzed", fix, diff };
    }

    applyFix(fix, this.ctx.repo ? process.cwd() : process.cwd()); // pass project root

    if (options.verify) {
      const ok = await runBuild(this.ctx.profile);
      if (!ok) {
        rollbackFix(fix, process.cwd());
        return { status: "failed" };
      }
    }

    return { status: "fixed", fix };
  }

  async verifyOnly() {
    return runBuild(this.ctx.profile);
  }
}