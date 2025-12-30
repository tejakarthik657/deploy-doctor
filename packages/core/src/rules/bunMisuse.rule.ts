import { Rule } from "./types";

export const bunMisuseRule: Rule = {
  id: "BUN_RUNTIME_MISUSE",
  description: "Prevent Bun runtime usage",

  match(ctx) {
    return (
      ctx.packageManager === "bun" &&
      ctx.pm.capabilities.canBeRuntime === false
    );
  },

  generateFix(ctx) {
    return {
      description: "Use Bun for install, Node for runtime",
      patch: {
        file: "package.json",
        apply(pkg) {
          pkg.scripts ||= {};
          if (pkg.scripts.start?.includes("bun")) {
            pkg.scripts.start = "node index.js";
          }
          return pkg;
        }
      }
    };
  }
};