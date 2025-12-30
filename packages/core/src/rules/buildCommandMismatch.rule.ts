import { Rule } from "./types";

export const buildCommandMismatchRule: Rule = {
  id: "BUILD_COMMAND_MISMATCH",
  description: "Fix incorrect or missing build command",

  match(ctx) {
    return (
      ctx.error?.message?.includes("build command") ||
      ctx.error?.message?.includes("command not found")
    );
  },

  generateFix(ctx) {
    const buildCmd = ctx.pm.commands.build;

    return {
      description: `Set correct build command (${buildCmd})`,
      patch: {
        file: ctx.platform === "vercel" ? "vercel.json" : "render.yaml",
        apply(cfg) {
          if (ctx.platform === "vercel") {
            cfg.buildCommand = buildCmd;
          } else {
            cfg.buildCommand = buildCmd;
          }
          return cfg;
        }
      }
    };
  }
};