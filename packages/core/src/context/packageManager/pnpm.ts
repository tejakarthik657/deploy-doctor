import { PackageManager } from "./types";

export const pnpmPM: PackageManager = {
  name: "pnpm",
  lockfile: "pnpm-lock.yaml",

  capabilities: {
    canInstall: true,
    canRunScripts: true,
    canBeRuntime: true
  },

  commands: {
    install: "pnpm install",
    build: "pnpm build",
    start: "pnpm start"
  }
};