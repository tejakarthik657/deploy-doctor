import { exec } from "child_process";
import { getOutput } from "./output";

export function runDeployDoctor(logFile: string): Promise<string> {
  const output = getOutput();
  output.appendLine(`Running deploy-doctor on ${logFile}...\n`);

  return new Promise((resolve, reject) => {
    exec(`deploy-doctor doctor "${logFile}"`, (err, stdout, stderr) => {
      if (err) {
        output.appendLine(stderr);
        reject(stderr);
        return;
      }

      output.appendLine(stdout);
      resolve(stdout);
    });
  });
}