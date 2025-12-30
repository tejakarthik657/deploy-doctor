import { Rule } from "./types";

export const pathCaseRule: Rule = {
  id: "PATH_CASE_MISMATCH",
  description: "Fix case-sensitive import paths",

  match(ctx) {
    return (
      ctx.os === "windows" &&
      ctx.error?.message?.includes("Cannot find module")
    );
  },

  generateFix(ctx) {
    return {
      description: "Normalize import paths (manual review required)",
      patch: {
        file: null,
        apply() {
          throw new Error("Manual intervention required");
        }
      }
    };
  }
};