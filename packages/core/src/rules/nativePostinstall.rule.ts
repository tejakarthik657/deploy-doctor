import { Rule } from "./types";

export const nativePostinstallRule: Rule = {
  id: "NATIVE_POSTINSTALL_MISSING",
  description: "Add postinstall rebuild for native modules",

  match(ctx) {
    return (
      ctx.error?.message?.includes("bcrypt") ||
      ctx.error?.message?.includes("sharp") ||
      ctx.error?.message?.includes("node-gyp")
    );
  },

  generateFix(ctx) {
    return {
      description: "Add postinstall script to rebuild native modules",
      patch: {
        file: "package.json",
        apply(pkg) {
          pkg.scripts ||= {};
          if (!pkg.scripts.postinstall) {
            pkg.scripts.postinstall = `${ctx.pm.commands.install} && npm rebuild`;
          }
          return pkg;
        }
      }
    };
  }
};