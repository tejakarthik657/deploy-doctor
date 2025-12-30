import { npmPM } from "./npm";
import { pnpmPM } from "./pnpm";
import { bunPM } from "./bun";

export function getPackageManager(pm: string) {
  switch (pm) {
    case "pnpm":
      return pnpmPM;
    case "bun":
      return bunPM;
    default:
      return npmPM;
  }
}