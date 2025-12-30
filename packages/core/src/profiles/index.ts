import { vercelProfile } from "./vercel";
import { renderProfile } from "./render";

export function loadProfile(platform: string) {
  if (platform === "vercel") return vercelProfile;
  if (platform === "render") return renderProfile;
  return null;
}