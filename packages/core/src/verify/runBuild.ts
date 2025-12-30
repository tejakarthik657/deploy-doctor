import { execSync } from "child_process";

export function runBuild(profile: any): boolean {
  try {
    // Simple build command - in real implementation, use profile constraints
    execSync("npm run build", { stdio: "inherit" });
    return true;
  } catch {
    return false;
  }
}