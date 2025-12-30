"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartScriptRule = void 0;
class StartScriptRule {
    constructor() {
        this.name = 'start-script';
        this.description = 'Checks if a start script is defined in package.json';
    }
    async check(projectPath, packageManager) {
        const scripts = await packageManager.getScripts(projectPath);
        if (!scripts.start) {
            return [{
                    rule: this.name,
                    message: 'No start script found. Consider adding a start script to package.json.',
                    severity: 'info',
                }];
        }
        return [];
    }
}
exports.StartScriptRule = StartScriptRule;
//# sourceMappingURL=start-script-rule.js.map