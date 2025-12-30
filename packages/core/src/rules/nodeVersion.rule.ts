import { Rule } from "./types";

export const nodeVersionRule: Rule = {
  id: "NODE_VERSION_MISMATCH",
  description: "Fix Node.js version mismatch",

  match(ctx) {
    return (
      ctx.error?.type === "NODE_VERSION_MISMATCH" ||
      ctx.error?.message?.includes("Unsupported engine")
    );
  },

  generateFix(ctx) {
    return {
      description: "Pin Node.js version to 18.x",
      patch: {
        file: "package.json",
        apply(pkg) {
          pkg.engines ||= {};
          pkg.engines.node = "18.x";
          return pkg;
        }
      }
    };
  }
};