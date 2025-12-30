import { PackageManager } from "./types";

export const npmPM: PackageManager = {
  name: "npm",
  lockfile: "package-lock.json",

  capabilities: {
    canInstall: true,
    canRunScripts: true,
    canBeRuntime: true
  },

  commands: {
    install: "npm install",
    build: "npm run build",
    start: "npm start"
  }
};