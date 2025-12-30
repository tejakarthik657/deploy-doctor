import fs from "fs";

export function generateDiff(fix: any): string {
  if (!fix.patch.file) return "Manual intervention required";

  const file = fix.patch.file;
  const original = fs.readFileSync(file, "utf-8");
  const obj = JSON.parse(original);
  const newObj = fix.patch.apply(obj);
  const modified = JSON.stringify(newObj, null, 2);

  // Simple diff - in real implementation, use a proper diff library
  return `--- ${file}\n+++ ${file}\n${simpleDiff(original, modified)}`;
}

function simpleDiff(original: string, modified: string): string {
  const origLines = original.split('\n');
  const modLines = modified.split('\n');
  let diff = '';

  for (let i = 0; i < Math.max(origLines.length, modLines.length); i++) {
    if (origLines[i] !== modLines[i]) {
      if (origLines[i]) diff += `- ${origLines[i]}\n`;
      if (modLines[i]) diff += `+ ${modLines[i]}\n`;
    }
  }

  return diff;
}