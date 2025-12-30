import os from "os";

export function detectOS(): "windows" | "linux" | "mac" {
  const platform = os.platform();
  if (platform === "win32") return "windows";
  if (platform === "linux") return "linux";
  if (platform === "darwin") return "mac";
  return "linux"; // default
}