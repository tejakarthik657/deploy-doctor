"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployDoctorEngine = void 0;
const package_managers_1 = require("../package-managers");
class DeployDoctorEngine {
    constructor(rules) {
        this.rules = rules;
    }
    async run(projectPath) {
        const packageManager = (0, package_managers_1.detectPackageManager)(projectPath);
        if (!packageManager) {
            return [{
                    rule: 'package-manager',
                    message: 'No supported package manager detected',
                    severity: 'error',
                }];
        }
        const issues = [];
        for (const rule of this.rules) {
            try {
                const ruleIssues = await rule.check(projectPath, packageManager);
                issues.push(...ruleIssues);
            }
            catch (error) {
                issues.push({
                    rule: rule.name,
                    message: `Error running rule: ${error.message}`,
                    severity: 'error',
                });
            }
        }
        return issues;
    }
}
exports.DeployDoctorEngine = DeployDoctorEngine;
//# sourceMappingURL=engine.js.map