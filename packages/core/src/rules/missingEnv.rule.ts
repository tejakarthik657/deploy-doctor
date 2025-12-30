import { Rule } from "./types";

export const missingEnvRule: Rule = {
  id: "MISSING_ENV",
  description: "Add missing env placeholders",

  match(ctx) {
    return ctx.error?.type === "MISSING_ENV" &&
           ctx.repo.hasEnvExample;
  },

  generateFix(ctx) {
    return {
      description: "Add env placeholders to config",
      patch: {
        file: ctx.platform === "vercel" ? "vercel.json" : "render.yaml",
        apply(cfg) {
          cfg.env ||= {};
          ctx.repo.expectedEnvVars.forEach((v: string) => {
            if (!(v in cfg.env)) cfg.env[v] = "";
          });
          return cfg;
        }
      }
    };
  }
};