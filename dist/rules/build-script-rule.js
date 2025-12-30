"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildScriptRule = void 0;
class BuildScriptRule {
    constructor() {
        this.name = 'build-script';
        this.description = 'Checks if a build script is defined in package.json';
    }
    async check(projectPath, packageManager) {
        const scripts = await packageManager.getScripts(projectPath);
        if (!scripts.build) {
            return [{
                    rule: this.name,
                    message: 'No build script found. Consider adding a build script to package.json.',
                    severity: 'warning',
                }];
        }
        return [];
    }
}
exports.BuildScriptRule = BuildScriptRule;
//# sourceMappingURL=build-script-rule.js.map