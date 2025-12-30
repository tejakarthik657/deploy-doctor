export interface PackageManager {
  name: "npm" | "pnpm" | "bun";
  lockfile: string | null;

  capabilities: {
    canInstall: boolean;
    canRunScripts: boolean;
    canBeRuntime: boolean;
  };

  commands: {
    install: string;
    build: string;
    start: string;
  };
}