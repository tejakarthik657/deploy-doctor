import fs from "fs";

export function detectPackageManager(): "npm" | "pnpm" | "bun" {
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("bun.lockb")) return "bun";
  return "npm";
}