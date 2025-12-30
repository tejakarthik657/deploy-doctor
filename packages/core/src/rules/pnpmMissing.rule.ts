import { Rule } from "./types";

export const pnpmMissingRule: Rule = {
  id: "PNPM_MISSING",
  description: "Install pnpm before build",

  match(ctx) {
    return (
      ctx.error?.type === "PNPM_MISSING" &&
      ctx.platform === "render" &&
      ctx.packageManager === "pnpm"
    );
  },

  generateFix(ctx) {
    return {
      description: "Install pnpm in build command",
      patch: {
        file: "render.yaml",
        apply(cfg) {
          cfg.buildCommand =
            "npm install -g pnpm && pnpm install && pnpm build";
          return cfg;
        }
      }
    };
  }
};