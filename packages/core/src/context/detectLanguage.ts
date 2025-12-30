import fs from "fs";

export function detectLanguage(): "javascript" | "typescript" {
  if (fs.existsSync("tsconfig.json")) return "typescript";
  return "javascript";
}