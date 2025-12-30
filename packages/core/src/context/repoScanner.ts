import fs from "fs";
import path from "path";

export interface RepoContext {
  packageManager: string;
  isMonorepo: boolean;
  hasNativeModules: string[];
  nodeVersion: string;
  platform: string;
  configFiles: string[];
  hasDocker: boolean;
  hasEnvExample: boolean;
  expectedEnvVars: string[];
}

export class RepoScanner {
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  async scan(): Promise<RepoContext> {
    const pkgPath = path.join(this.projectRoot, "package.json");
    let pkg = {};
    if (fs.existsSync(pkgPath)) {
      pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    }

    return {
      packageManager: await this.detectPM(),
      isMonorepo: this.isMonorepo(pkg),
      hasNativeModules: this.checkNativeDeps(pkg),
      nodeVersion: process.version,
      platform: this.detectPlatform(),
      configFiles: this.locateConfigs(),
      hasDocker: fs.existsSync(path.join(this.projectRoot, "Dockerfile")),
      hasEnvExample: fs.existsSync(path.join(this.projectRoot, ".env.example")),
      expectedEnvVars: this.parseEnvExample()
    };
  }

  private async detectPM(): Promise<string> {
    const checks = [
      { file: "pnpm-lock.yaml", pm: "pnpm" },
      { file: "bun.lockb", pm: "bun" },
      { file: "package-lock.json", pm: "npm" }
    ];

    for (const check of checks) {
      if (fs.existsSync(path.join(this.projectRoot, check.file))) {
        return check.pm;
      }
    }
    return "npm";
  }

  private isMonorepo(pkg: any): boolean {
    return fs.existsSync(path.join(this.projectRoot, "pnpm-workspace.yaml")) ||
           !!pkg.workspaces;
  }

  private checkNativeDeps(pkg: any): string[] {
    const native = ['bcrypt', 'sharp', 'sqlite3', 'canvas', 'node-gyp'];
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    return native.filter(n => deps[n]);
  }

  private detectPlatform(): string {
    const configs = ["vercel.json", "render.yaml", "netlify.toml"];
    for (const config of configs) {
      if (fs.existsSync(path.join(this.projectRoot, config))) {
        return config.split('.')[0];
      }
    }
    return "unknown";
  }

  private locateConfigs(): string[] {
    const possible = ["vercel.json", "render.yaml", "netlify.toml", ".env", "Dockerfile"];
    return possible.filter(f => fs.existsSync(path.join(this.projectRoot, f)));
  }

  private parseEnvExample(): string[] {
    const envPath = path.join(this.projectRoot, ".env.example");
    if (!fs.existsSync(envPath)) return [];

    const content = fs.readFileSync(envPath, "utf-8");
    return content.split('\n')
      .map(line => line.split('=')[0].trim())
      .filter(key => key && !key.startsWith('#'));
  }
}

export function getRepoContext(projectRoot: string = process.cwd()): Promise<RepoContext> {
  const scanner = new RepoScanner(projectRoot);
  return scanner.scan();
}