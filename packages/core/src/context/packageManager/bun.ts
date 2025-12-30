import { PackageManager } from "./types";

export const bunPM: PackageManager = {
  name: "bun",
  lockfile: "bun.lockb",

  capabilities: {
    canInstall: true,
    canRunScripts: true,
    canBeRuntime: false
  },

  commands: {
    install: "bun install",
    build: "bun run build",
    start: "node index.js"
  }
};