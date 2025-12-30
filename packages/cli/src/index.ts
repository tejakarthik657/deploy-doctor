#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { DeployDoctorEngine } from "../../core/src/engine";
import { rollbackAll } from "../../core/src/fix/rollback";

const [, , command, logPath] = process.argv;

if (!command) {
  console.error("Usage: deploy-doctor <analyze|fix|verify|doctor|rollback> <log-file>");
  process.exit(1);
}

const engine = new DeployDoctorEngine();

function readLog(file?: string): string {
  if (!file) {
    console.error("Log file required");
    process.exit(1);
  }

  const fullPath = path.resolve(process.cwd(), file);

  if (!fs.existsSync(fullPath)) {
    console.error("Log file not found:", fullPath);
    process.exit(1);
  }

  return fs.readFileSync(fullPath, "utf-8");
}

async function main() {
  if (command === "analyze") {
    const log = readLog(logPath);
    const result = await engine.run(log, { verify: true, dryRun: true });

    console.log("🔍 Analysis Result:");
    console.log(JSON.stringify(result, null, 2));

    process.exit(result.status === "unknown" ? 2 : 0);
  }

  if (command === "fix") {
    const log = readLog(logPath);
    const result = await engine.run(log, { verify: false, dryRun: false });

    if (result.status === "fixed" && result.fix) {
      console.log("🛠 Fix applied:");
      console.log(result.fix.description);
      process.exit(0);
    }

    console.error("❌ Fix failed or unavailable");
    process.exit(3);
  }

  if (command === "verify") {
    const success = await engine.verifyOnly();

    if (success) {
      console.log("✅ Build verified");
      process.exit(0);
    } else {
      console.error("❌ Verification failed");
      process.exit(4);
    }
  }

  if (command === "doctor") {
    const log = readLog(logPath);
    const result = await engine.run(log, { verify: true, dryRun: false });

    if (result.status === "fixed") {
      console.log("✅ Deployment fixed and verified");
      process.exit(0);
    }

    if (result.status === "unresolved") {
      console.error("⚠️ No automatic fix available");
      process.exit(5);
    }

    console.error("❌ Deployment could not be fixed");
    process.exit(6);
  }

  if (command === "rollback") {
    rollbackAll();
    console.log("✅ All changes rolled back");
    process.exit(0);
  }
}

main();