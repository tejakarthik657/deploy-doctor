import fs from "fs";

export function detectPlatform(): "vercel" | "render" | "unknown" {
  if (fs.existsSync("vercel.json")) return "vercel";
  if (fs.existsSync("render.yaml")) return "render";
  return "unknown";
}